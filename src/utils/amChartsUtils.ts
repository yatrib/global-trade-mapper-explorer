import { CountryData } from '@/data/types';

// Type definition for the chart initialization function
export interface AmChartsInstance {
  dispose: () => void;
}

// Type for window with amCharts globals
interface WindowWithAmCharts extends Window {
  am5?: any;
  am5map?: any;
  am5themes_Animated?: any;
  am5geodata_worldLow?: any;
}

// Load amCharts scripts dynamically
export const loadAmChartsScripts = async (): Promise<void> => {
  try {
    // Define the scripts to load
    const scripts = [
      "https://cdn.amcharts.com/lib/5/index.js",
      "https://cdn.amcharts.com/lib/5/map.js",
      "https://cdn.amcharts.com/lib/5/geodata/worldLow.js",
      "https://cdn.amcharts.com/lib/5/themes/Animated.js"
    ];

    // Load each script sequentially
    for (const src of scripts) {
      await new Promise<void>((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) {
          resolve();
          return;
        }

        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.onload = () => resolve();
        script.onerror = (e) => reject(new Error(`Failed to load script: ${src}`));
        document.head.appendChild(script);
      });
    }
  } catch (error) {
    console.error('Failed to load amCharts:', error);
    throw error;
  }
};

// Format numeric values for display
const formatNumeric = (value: number | null | undefined): string => {
  if (value === null || value === undefined) return 'N/A';
  return value.toFixed(1);
};

// Format currency values
const formatCurrency = (value: number | null | undefined): string => {
  if (value === null || value === undefined) return 'N/A';
  return `$${value.toFixed(1)}B`;
};

// Map country data to the format expected by amCharts
export const mapCountryDataForChart = (countryData: CountryData[]) => {
  return countryData.map(country => {
    console.log(`Mapping for chart: ${country.name}, tariffs: ${country.tariffsToUS}`);
    return {
      id: country.id,
      name: country.name,
      gdp2023: country.gdp?.actual2023 || 0,
      gdp2024: country.gdp?.estimate2024 || 0,
      usTradeBalance: country.usTradeBalance || 0,
      shareOfUsImports: country.shareOfUsImports || 0,
      shareOfUsExports: country.shareOfUsExports || 0,
      tariffsToUS: country.tariffsToUS || 0,
      reciprocalTariff: country.reciprocalTariff || 0,
      countryObject: country // Store the entire country object for reference
    };
  });
};

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
  console.log('Map data for chart:', mapData);

  // Create a map of country IDs for quick lookup
  const countryIds = new Set(countryData.map(country => country.id));
  console.log("Countries available in database:", countryIds);

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
        valueField: "tariffsToUS", // Use tariffs as the default value field
        calculateAggregates: true,
        exclude: ["AQ"] // Exclude Antarctica
      })
    );

    // Configure polygon styling and tooltips
    polygonSeries.mapPolygons.template.events.on("pointerover", function(ev: any) {
      heatLegend.showValue(ev.target.dataItem.get("value"));
    });

    // Use Infomineo colors for the heatmap
    polygonSeries.set("heatRules", [{
      target: polygonSeries.mapPolygons.template,
      dataField: "value",
      min: am5.color(0x41B3E6),  // Infomineo Light Blue
      max: am5.color(0x2C469D),  // Infomineo Royal Blue
      key: "fill"
    }]);

    // Enhanced tooltip with tariff data - Improved formatting
    polygonSeries.mapPolygons.template.setAll({
      tooltipText: "{name}\n[bold]Tariff Data:[/]\nTariffs to US: {tariffsToUS}%\nReciprocal Tariff: {reciprocalTariff}%\n[bold]Trade:[/]\nTrade Balance: ${usTradeBalance}B",
      stroke: am5.color(0xffffff),
      strokeWidth: 0.5,
      interactive: true,
      cursorOverStyle: "pointer",
      // Updated color for countries without data to #bdbdbd
      fill: am5.color(0xbdbdbd) // #bdbdbd for countries not in our database
    });

    // Add click handler to navigate to country details
    polygonSeries.mapPolygons.template.events.on("click", function(ev: any) {
      const clickedCountry = ev.target.dataItem.dataContext;
      if (clickedCountry && clickedCountry.countryObject) {
        onSelectCountry(clickedCountry.countryObject);
      }
    });

    // Set the data for the polygons
    polygonSeries.data.setAll(mapData);

    // Add labels for country names
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
    const labelData = mapData.map(country => ({
      id: country.id,
      name: country.name,
      geometry: { type: "Point", coordinates: am5geodata_worldLow.features.find((f: any) => f.id === country.id)?.geometry?.coordinates?.[0]?.[0] || [0, 0] }
    }));

    labelSeries.data.setAll(labelData);

    // Create heat legend with Infomineo colors
    const heatLegend = chart.children.push(
      am5.HeatLegend.new(root, {
        orientation: "vertical",
        startColor: am5.color(0x41B3E6),  // Infomineo Light Blue
        endColor: am5.color(0x2C469D),    // Infomineo Royal Blue
        startText: "Low Tariffs",
        endText: "High Tariffs",
        stepCount: 6,
        x: am5.p100,
        centerX: am5.p100,
        paddingRight: 20,
        paddingTop: 20,
        paddingBottom: 20
      })
    );

    heatLegend.startLabel.setAll({
      fontSize: 12,
      fill: am5.color(0x41B3E6)  // Infomineo Light Blue
    });

    heatLegend.endLabel.setAll({
      fontSize: 12,
      fill: am5.color(0x2C469D)  // Infomineo Royal Blue
    });

    polygonSeries.events.on("datavalidated", function() {
      heatLegend.set("startValue", polygonSeries.getPrivate("valueLow"));
      heatLegend.set("endValue", polygonSeries.getPrivate("valueHigh"));
    });
    
    // Log the data that's being set to the polygons
    console.log("Polygon data before setting:", mapData);
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
