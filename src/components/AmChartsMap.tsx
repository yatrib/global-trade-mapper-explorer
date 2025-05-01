
import React, { useEffect, useRef } from 'react';
import { CountryData } from '@/data/types';

interface AmChartsMapProps {
  countryData: CountryData[];
  onSelectCountry: (country: CountryData) => void;
}

const AmChartsMap: React.FC<AmChartsMapProps> = ({ countryData, onSelectCountry }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current || !countryData.length) return;

    // Load amCharts scripts dynamically
    const loadAmCharts = async () => {
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

        // Initialize amCharts after scripts are loaded
        initializeChart();
      } catch (error) {
        console.error('Failed to load amCharts:', error);
      }
    };

    // Initialize the chart
    const initializeChart = () => {
      // Make sure the amCharts library is available
      if (!(window as any).am5) {
        console.error('amCharts library not loaded');
        return;
      }

      const am5 = (window as any).am5;
      const am5map = (window as any).am5map;
      const am5themes_Animated = (window as any).am5themes_Animated;
      const am5geodata_worldLow = (window as any).am5geodata_worldLow;

      // Map country data to the format expected by amCharts
      const mapData = countryData.map(country => ({
        id: country.id,
        name: country.name,
        threatened: country.tariffsToUS || 0,
        updated: country.reciprocalTariff || 0,
        // Add all the country data for hovering
        gdp2023: country.gdp?.actual2023 || 0,
        gdp2024: country.gdp?.estimate2024 || 0,
        usTradeBalance: country.usTradeBalance || 0,
        shareOfUsImports: country.shareOfUsImports || 0,
        shareOfUsExports: country.shareOfUsExports || 0,
        countryObject: country // Store the entire country object for reference
      }));

      // Clear previous chart if it exists
      if (chartRef.current) {
        chartRef.current.innerHTML = '';
      }

      am5.ready(function() {
        // Create root element
        const root = am5.Root.new(chartRef.current);

        // Set themes with Infomineo colors
        const myTheme = am5.Theme.new(root);
        myTheme.rule("InterfaceColors").setAll({
          primaryButton: am5.color(0xc83830),  // Infomineo red
          primaryButtonHover: am5.Color.lighten(am5.color(0xc83830), 0.2),
          primaryButtonDown: am5.Color.lighten(am5.color(0xc83830), -0.2),
          primaryButtonActive: am5.color(0x2C469D),  // Infomineo blue
        });
        myTheme.rule("Label").setAll({
          fontSize: "0.85em",
          fill: am5.color(0x333333)
        });
        root.setThemes([am5themes_Animated.new(root), myTheme]);

        // Create map chart
        const chart = root.container.children.push(
          am5map.MapChart.new(root, {
            projection: am5map.geoMercator(),
            panX: "none",  // Disable panning
            panY: "none",  // Disable panning
            wheelX: "none", // Disable zooming
            wheelY: "none"  // Disable zooming
          })
        );

        // Add graticule series (grid lines) - more subtle
        const graticuleSeries = chart.series.unshift(
          am5map.GraticuleSeries.new(root, { step: 10 })
        );
        graticuleSeries.mapLines.template.set("strokeOpacity", 0.03);

        // Control elements for data view
        const cont2 = chart.children.push(
          am5.Container.new(root, {
            layout: root.horizontalLayout,
            x: am5.percent(85),
            centerX: am5.p100,
            y: am5.percent(100),
            dy: -40
          })
        );
        cont2.children.push(am5.Label.new(root, { centerY: am5.p50, text: "Tariffs to US" }));
        
        const switchButton2 = cont2.children.push(
          am5.Button.new(root, {
            themeTags: ["switch"],
            centerY: am5.p50,
            icon: am5.Circle.new(root, { themeTags: ["icon"] })
          })
        );
        
        switchButton2.on("active", function() {
          if (!switchButton2.get("active")) {
            polygonSeries.set("valueField", "threatened");
            polygonSeries.data.setAll(mapData);
          } else {
            polygonSeries.set("valueField", "updated");
            polygonSeries.data.setAll(mapData);
          }
        });
        cont2.children.push(am5.Label.new(root, { centerY: am5.p50, text: "Reciprocal Tariff" }));

        // Create polygon series for countries
        const polygonSeries = chart.series.push(
          am5map.MapPolygonSeries.new(root, {
            geoJSON: am5geodata_worldLow,
            valueField: "threatened",
            calculateAggregates: true,
            exclude: ["AQ"] // Exclude Antarctica
          })
        );

        // Configure polygon styling and tooltips
        polygonSeries.mapPolygons.template.events.on("pointerover", function(ev) {
          heatLegend.showValue(ev.target.dataItem.get("value"));
        });

        // Use Infomineo colors for the heatmap
        polygonSeries.set("heatRules", [{
          target: polygonSeries.mapPolygons.template,
          dataField: "value",
          min: am5.color(0x41B3E6),  // Infomineo light blue
          max: am5.color(0xC83830),  // Infomineo red
          key: "fill"
        }]);

        // Enhanced tooltip with more data
        polygonSeries.mapPolygons.template.setAll({
          tooltipText: "{name}\n[bold]Tariff Data:[/]\nTariffs to US: {threatened}%\nReciprocal Tariff: {updated}%\n[bold]Economic Data:[/]\nGDP 2023: ${gdp2023}B\nTrade Balance: ${usTradeBalance}B",
          stroke: am5.color(0xffffff),
          strokeWidth: 0.5,
          interactive: true,
          cursorOverStyle: "pointer"
        });

        // Add click handler to navigate to country details
        polygonSeries.mapPolygons.template.events.on("click", function(ev) {
          const clickedCountry = ev.target.dataItem.dataContext;
          if (clickedCountry && clickedCountry.countryObject) {
            onSelectCountry(clickedCountry.countryObject);
          }
        });

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

        // Add major country labels only for readability
        const labelData = mapData
          .filter(country => {
            const majorCountries = ["US", "CN", "RU", "BR", "IN", "CA", "AU", "FR", "DE", "JP", "GB", "MX", "ZA", "SA"];
            return majorCountries.includes(country.id);
          })
          .map(country => ({
            id: country.id,
            name: country.name,
            geometry: { type: "Point", coordinates: am5geodata_worldLow.features.find(f => f.id === country.id)?.geometry?.coordinates?.[0]?.[0] || [0, 0] }
          }));

        labelSeries.data.setAll(labelData);

        // Create heat legend
        const heatLegend = chart.children.push(
          am5.HeatLegend.new(root, {
            orientation: "vertical",
            startColor: am5.color(0x41B3E6),  // Infomineo light blue
            endColor: am5.color(0xC83830),    // Infomineo red
            startText: "Lowest",
            endText: "Highest",
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
          fill: am5.color(0x41B3E6)  // Infomineo light blue
        });

        heatLegend.endLabel.setAll({
          fontSize: 12,
          fill: am5.color(0xC83830)  // Infomineo red
        });

        polygonSeries.events.on("datavalidated", function() {
          heatLegend.set("startValue", polygonSeries.getPrivate("valueLow"));
          heatLegend.set("endValue", polygonSeries.getPrivate("valueHigh"));
        });

        // Add title
        const title = chart.children.push(
          am5.Label.new(root, {
            text: "Global Tariff Impact Analysis",
            fontSize: 20,
            fontWeight: "500",
            x: am5.percent(50),
            centerX: am5.p50,
            y: 30,
            fill: am5.color(0x2C469D)  // Infomineo blue
          })
        );

        // Return a cleanup function
        return () => {
          root.dispose();
        };
      });
    };

    loadAmCharts();

    // Clean up
    return () => {
      if (chartRef.current) {
        chartRef.current.innerHTML = '';
      }
    };
  }, [countryData, onSelectCountry]);

  return (
    <div className="w-full bg-white rounded-lg overflow-hidden shadow-lg border">
      <div className="p-3 border-b">
        <h3 className="text-lg font-medium text-infomineo-blue">Global Tariff Map</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Toggle between different tariff metrics. Click on a country for details.
        </p>
      </div>
      <div id="chartdiv" ref={chartRef} className="w-full h-[650px]"></div>
    </div>
  );
};

export default AmChartsMap;
