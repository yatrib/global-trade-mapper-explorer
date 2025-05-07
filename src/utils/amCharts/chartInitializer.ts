
import { CountryData } from '@/data/types';
import { AmChartsInstance, WindowWithAmCharts } from './types';
import { mapCountryDataForChart } from './dataMappers';

// Initialize the chart
export const initializeAmChart = (
  container: HTMLElement, 
  countryData: CountryData[],
  onSelectCountry: (country: CountryData) => void
): AmChartsInstance | undefined => {
  const win = window as unknown as WindowWithAmCharts;
  
  // Make sure the amCharts library is available
  if (!win.am5) {
    console.error('amCharts library not loaded');
    return undefined;
  }

  const am5 = win.am5;
  const am5map = win.am5map;
  const am5themes_Animated = win.am5themes_Animated;
  const am5geodata_worldLow = win.am5geodata_worldLow;
  
  // Map country data to the format expected by amCharts
  const mapData = mapCountryDataForChart(countryData);
  
  // Create a map of country IDs for quick lookup
  const countryIds = new Set(countryData.map(country => country.id));
  console.log("Countries available in database:", Array.from(countryIds));

  // Clear previous chart if it exists
  container.innerHTML = '';

  let root; // Store root for disposal
  
  am5.ready(function() {
    // Create root element
    root = am5.Root.new(container);

    // Set themes with Infomineo colors
    const myTheme = am5.Theme.new(root);
    myTheme.rule("InterfaceColors").setAll({
      primaryButton: am5.color(0x2C469D),  // Infomineo Royal Blue
      primaryButtonHover: am5.color(0x2C469D),  // Fixed: removed lighten
      primaryButtonDown: am5.color(0x2C469D),   // Fixed: removed lighten
      primaryButtonActive: am5.color(0x41B3E6),  // Infomineo Light Blue
    });
    myTheme.rule("Label").setAll({
      fontSize: "0.85em",
      fill: am5.color(0x333333)
    });
    root.setThemes([am5themes_Animated.new(root), myTheme]);

    // Create map chart with zoomed out view
    const chart = root.container.children.push(
      am5map.MapChart.new(root, {
        projection: am5map.geoMercator(),
        panX: "none",  // Disable panning
        panY: "none",  // Disable panning
        wheelX: "none", // Disable zooming
        wheelY: "none", // Disable zooming
        // Set initial zoom level to be more zoomed out
        zoomLevel: 0.85  // Adjust this value to zoom out more
      })
    );

    // Add graticule series (grid lines) - more subtle
    const graticuleSeries = chart.series.unshift(
      am5map.GraticuleSeries.new(root, { step: 10 })
    );
    graticuleSeries.mapLines.template.set("strokeOpacity", 0.03);

    // Create polygon series for countries
    const polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_worldLow,
        calculateAggregates: true,
        exclude: ["AQ"] // Exclude Antarctica
      })
    );

    // Find max reciprocal tariff value for creating gradient
    const maxTariff = Math.max(
      ...countryData
        .filter(country => country.reciprocalTariff !== null && country.reciprocalTariff !== undefined)
        .map(country => country.reciprocalTariff || 0)
    );
    
    console.log("Max tariff value for gradient:", maxTariff);
    
    // Create a color scale for reciprocal tariffs
    const colorScale = am5.ColorScale.new(root, {
      startColor: am5.color(0xD3E4FD), // Light blue
      endColor: am5.color(0x0EA5E9),   // Ocean Blue
      range: [0, maxTariff || 10]      // Set a default max if no data
    });

    // Configure polygon styling and tooltips
    polygonSeries.mapPolygons.template.setAll({
      tooltipText: "{name}\n[bold]Tariff Data:[/]\nTariffs to US: {tariffsToUS}\nReciprocal Tariff: {reciprocalTariff}",
      stroke: am5.color(0xffffff),
      strokeWidth: 0.5,
      interactive: true,
      cursorOverStyle: "pointer",
      // Default color for countries not in our database
      fill: am5.color(0xCCCCCC) // Light gray for countries not in our database
    });

    // Use a gradient based on reciprocal tariff values
    polygonSeries.mapPolygons.template.adapters.add("fill", function(fill, target) {
      const dataItem = target.dataItem;
      if (dataItem) {
        const dataContext = dataItem.dataContext;
        if (dataContext && dataContext.id && countryIds.has(dataContext.id)) {
          // Get the country's reciprocal tariff value
          const tariffValue = dataContext.value || 0;
          
          // Use the color scale to get a color based on the tariff value
          if (tariffValue > 0) {
            return colorScale.getColor(tariffValue);
          }
          // If no tariff data but country is in our database, use a light blue
          return am5.color(0xD3E4FD); 
        }
      }
      return am5.color(0xCCCCCC); // Default light gray for countries not in our database
    });

    // Add click handler to navigate to country details
    polygonSeries.mapPolygons.template.events.on("click", function(ev) {
      const clickedCountry = ev.target.dataItem.dataContext;
      console.log("Country clicked:", clickedCountry);
      if (clickedCountry && clickedCountry.countryObject) {
        onSelectCountry(clickedCountry.countryObject);
      }
    });

    // Set the data for the polygons
    polygonSeries.data.setAll(mapData);

    // Only add interactivity to countries in our database
    polygonSeries.mapPolygons.template.adapters.add("interactive", function(interactive, target) {
      const dataItem = target.dataItem;
      if (dataItem) {
        const dataContext = dataItem.dataContext;
        if (dataContext && dataContext.id && countryIds.has(dataContext.id)) {
          return true; // Make interactive only if in our database
        }
      }
      return false; // Non-interactive for countries not in our database
    });

    // Add labels for country names (only for countries in our database)
    const labelSeries = chart.series.push(
      am5map.MapPointSeries.new(root, {})
    );

    labelSeries.bullets.push(function() {
      return am5.Bullet.new(root, {
        sprite: am5.Label.new(root, {
          text: "{name}",
          fill: am5.color(0x333333),
          strokeOpacity: 0,
          centerX: am5.p50,
          centerY: am5.p50,
          fontSize: "0.7em",
          fontWeight: "400",
          populateText: true,
          oversizedBehavior: "hide"
        })
      });
    });

    // Add labels only for countries that exist in the database
    const labelData = mapData
      .filter(country => country.id && country.name)
      .map(country => {
        const feature = am5geodata_worldLow.features.find((f) => f.id === country.id);
        const coordinates = feature?.geometry?.coordinates?.[0]?.[0] || [0, 0];
        return {
          id: country.id,
          name: country.name,
          geometry: { type: "Point", coordinates: coordinates }
        };
      });

    labelSeries.data.setAll(labelData);
    
    // Add a legend for the reciprocal tariff color gradient
    const legend = chart.children.push(
      am5.Legend.new(root, {
        nameField: "name",
        fillField: "color",
        x: am5.p50,
        centerX: am5.p50,
        y: am5.p95,
        layout: root.horizontalLayout,
        background: am5.RoundedRectangle.new(root, {
          fill: am5.color(0xffffff),
          fillOpacity: 0.8,
        })
      })
    );
    
    // Create legend items
    legend.data.setAll([
      {
        name: "Low Tariff",
        color: am5.color(0xD3E4FD)
      },
      {
        name: "Medium Tariff",
        color: am5.color(0x85C1F5)
      },
      {
        name: "High Tariff",
        color: am5.color(0x0EA5E9)
      }
    ]);
    
    // Log the data that's being set to the polygons for debugging
    console.log("Final polygon data for map:", mapData);
  });

  // Return a cleanup function
  return {
    dispose: () => {
      if (root) {
        root.dispose();
      }
    }
  };
};
