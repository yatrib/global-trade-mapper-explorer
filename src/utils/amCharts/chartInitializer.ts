
import { CountryData } from '@/data/types';
import { AmChartsInstance, WindowWithAmCharts } from './types';
import { mapCountryDataForChart } from './dataMappers';
import { formatCurrency, formatPercentage } from './formatters';

// Initialize the chart
export const initializeAmChart = (
  container: HTMLElement, 
  countryData: CountryData[],
  onSelectCountry: (country: CountryData) => void,
  regionFilter: string | null = null,
  tariffVisualization: 'reciprocalTariff' | 'tariffsToUS' = 'reciprocalTariff'
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
  
  // Filter countries based on region if filter is active
  const filteredCountryData = regionFilter 
    ? countryData.filter(country => {
        // Match G20 or non-G20 based on the Type field
        const isG20 = country.region === "G20";
        return regionFilter === "G20" ? isG20 : !isG20;
      })
    : countryData;
    
  console.log(`Filtered ${filteredCountryData.length} countries for ${regionFilter || 'all regions'}`);
  
  // Map filtered country data to the format expected by amCharts
  const mapData = mapCountryDataForChart(filteredCountryData, tariffVisualization);
  
  // Create a map of country IDs for quick lookup
  const countryIds = new Set(filteredCountryData.map(country => country.id));
  console.log("Countries available in database:", Array.from(countryIds));

  // Clear previous chart if it exists
  container.innerHTML = '';

  let root: any; // Store root for disposal
  
  am5.ready(function() {
    // Create root element
    root = am5.Root.new(container);

    // Set themes with Infomineo colors
    const myTheme = am5.Theme.new(root);
    myTheme.rule("InterfaceColors").setAll({
      primaryButton: am5.color(0x2C469D),  // Infomineo Royal Blue
      primaryButtonHover: am5.Color.lighten(am5.color(0x2C469D), 0.2),
      primaryButtonDown: am5.Color.lighten(am5.color(0x2C469D), -0.2),
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

    // Define tooltip text based on visualization type and only show if data exists
    const createTooltipText = (dataContext: any) => {
      let tooltipText = `{name}`;
      
      if (tariffVisualization === 'reciprocalTariff' && dataContext.reciprocalTariff) {
        tooltipText += `\n[bold]US Reciprocal Tariff:[/] ${dataContext.reciprocalTariff}`;
      } else if (tariffVisualization === 'tariffsToUS' && dataContext.tariffsToUS) {
        tooltipText += `\n[bold]Tariffs to US:[/] ${dataContext.tariffsToUS}`;
      }
      
      return tooltipText;
    };

    // Configure polygon styling and tooltips
    polygonSeries.mapPolygons.template.setAll({
      tooltipText: "{name}", // Default tooltip with just the name
      stroke: am5.color(0xffffff),
      strokeWidth: 0.5,
      interactive: true,
      cursorOverStyle: "pointer",
      // Default color for countries not in our database
      fill: am5.color(0xCCCCCC) // Light gray for countries not in our database
    });
    
    // Add tooltip adapter to dynamically generate tooltip content based on available data
    polygonSeries.mapPolygons.template.adapters.add("tooltipText", function(text, target) {
      const dataItem = target.dataItem;
      if (dataItem && dataItem.dataContext) {
        return createTooltipText(dataItem.dataContext);
      }
      return text;
    });

    // Create a color scale for the selected tariff values using the new color shades
    // Use the same new color shades for both tariff visualization types
    const startColor = am5.color(0x9EB5FA); // Lightest blue (#9eb5fa)
    const midColor = am5.color(0x6D90F8);   // Medium blue (#6d90f8)
    const endColor = am5.color(0x0F47F2);   // Darkest blue (#0f47f2)

    const heatLegend = chart.children.push(
      am5.HeatLegend.new(root, {
        orientation: "vertical",
        startColor: startColor,
        endColor: endColor,
        startText: "Low",
        endText: "High",
        stepCount: 5,
        width: am5.percent(20),
        height: am5.percent(40),
        startValue: 0,
        endValue: 100,
        y: am5.percent(50),
        x: am5.percent(95),
      })
    );

    // Find the maximum tariff value for the scale
    const maxValue = Math.max(...mapData.filter(item => item.value !== undefined).map(item => item.value || 0));
    heatLegend.set("startValue", 0);
    heatLegend.set("endValue", maxValue > 0 ? maxValue : 100);
    
    // Add gradient coloring based on the selected tariff values
    polygonSeries.mapPolygons.template.adapters.add("fill", function(fill, target) {
      const dataItem = target.dataItem;
      if (dataItem) {
        const dataContext = dataItem.dataContext as any;
        if (dataContext && dataContext.id && countryIds.has(dataContext.id)) {
          // Country is in our database - use gradient based on selected tariff value
          const value = dataContext.value || 0;
          const maxValue = heatLegend.get("endValue") || 100;
          
          if (value > 0) {
            // Calculate position in the gradient (0-1)
            const normalizedValue = Math.min(value / maxValue, 1);
            
            // Use three-point gradient for better differentiation
            if (normalizedValue < 0.5) {
              // Blend between startColor and midColor for lower half of values
              return am5.Color.interpolate(normalizedValue * 2, startColor, midColor);
            } else {
              // Blend between midColor and endColor for upper half of values
              return am5.Color.interpolate((normalizedValue - 0.5) * 2, midColor, endColor);
            }
          }
          // Default color for countries with zero value
          return startColor; // Lightest blue for zero values
        }
      }
      return am5.color(0xCCCCCC); // Default light gray for countries not in our database
    });
    
    // Add click handler to navigate to country details
    polygonSeries.mapPolygons.template.events.on("click", function(ev: any) {
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
        const dataContext = dataItem.dataContext as any;
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
        const feature = am5geodata_worldLow.features.find((f: any) => f.id === country.id);
        const coordinates = feature?.geometry?.coordinates?.[0]?.[0] || [0, 0];
        return {
          id: country.id,
          name: country.name,
          geometry: { type: "Point", coordinates: coordinates }
        };
      });

    labelSeries.data.setAll(labelData);
    
    // Add a legend title based on the visualization type
    const legendTitle = chart.children.push(am5.Label.new(root, {
      text: tariffVisualization === 'reciprocalTariff' ? "Reciprocal Tariff %" : "Tariffs to US %",
      fontSize: 14,
      fontWeight: "500",
      x: am5.percent(95),
      centerX: am5.percent(50),
      y: am5.percent(30),
      textAlign: "center"
    }));
    
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
