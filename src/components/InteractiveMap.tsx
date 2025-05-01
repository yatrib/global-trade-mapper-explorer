
import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import { CountryData } from '@/data/types';
import { ChevronDown, Info } from 'lucide-react';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface InteractiveMapProps {
  countryData: CountryData[];
  onSelectCountry: (country: CountryData) => void;
}

type MetricDisplayType = 'tariffsToUS' | 'reciprocalTariff' | 'usTradeBalance' | 'gdp';

const InteractiveMap: React.FC<InteractiveMapProps> = ({ countryData, onSelectCountry }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [selectedMetric, setSelectedMetric] = useState<MetricDisplayType>('tariffsToUS');
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  
  // Group countries by region
  const regions = React.useMemo(() => {
    const regionMap: Record<string, CountryData[]> = {};
    countryData.forEach(country => {
      if (!regionMap[country.region]) {
        regionMap[country.region] = [];
      }
      regionMap[country.region].push(country);
    });
    return regionMap;
  }, [countryData]);
  
  const getMetricValue = (country: CountryData, metric: MetricDisplayType): number | null => {
    switch (metric) {
      case 'tariffsToUS':
        return country.tariffsToUS;
      case 'reciprocalTariff':
        return country.reciprocalTariff;
      case 'usTradeBalance':
        return country.usTradeBalance;
      case 'gdp':
        return country.gdp.actual2023;
      default:
        return null;
    }
  };
  
  const getMetricLabel = (metric: MetricDisplayType): string => {
    switch (metric) {
      case 'tariffsToUS':
        return 'Tariffs to US (%)';
      case 'reciprocalTariff':
        return 'Reciprocal Tariff (%)';
      case 'usTradeBalance':
        return 'US Trade Balance ($M)';
      case 'gdp':
        return 'GDP 2023 ($B)';
      default:
        return '';
    }
  };
  
  const formatMetricValue = (value: number | null, metric: MetricDisplayType): string => {
    if (value === null) return 'N/A';
    
    switch (metric) {
      case 'tariffsToUS':
      case 'reciprocalTariff':
        return `${value.toFixed(1)}%`;
      case 'usTradeBalance':
        return `$${(value / 1000).toFixed(1)}B`;
      case 'gdp':
        return `$${value.toFixed(1)}B`;
      default:
        return String(value);
    }
  };
  
  useEffect(() => {
    if (!svgRef.current || !countryData.length) return;
    
    const svg = d3.select(svgRef.current);
    const width = 1000;
    const height = 600;
    
    // Clear previous content
    svg.selectAll("*").remove();
    
    // Set dimensions
    svg.attr("viewBox", `0 0 ${width} ${height}`);
    
    // Create tooltip
    const tooltip = d3.select(tooltipRef.current)
      .style("position", "absolute")
      .style("visibility", "hidden")
      .style("background", "white")
      .style("border", "1px solid #ddd")
      .style("border-radius", "4px")
      .style("padding", "10px")
      .style("box-shadow", "0 2px 10px rgba(0,0,0,0.1)")
      .style("pointer-events", "none")
      .style("z-index", "10");
    
    // Create a projection
    const projection = d3.geoMercator()
      .scale(150 * zoom)
      .translate([width / 2, height / 2]);
    
    // Create a path generator
    const path = d3.geoPath().projection(projection);
    
    // Create a map of country codes for quick lookup
    const countryMap = new Map(countryData.map(country => [country.id, country]));
    
    // Create a zoom behavior
    const zoomBehavior = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([1, 8])
      .on("zoom", (event) => {
        const transform = event.transform;
        g.attr("transform", transform.toString());
        setZoom(transform.k);
      });
    
    // Apply zoom behavior to SVG
    svg.call(zoomBehavior);
    
    // Create a group for all map content
    const g = svg.append("g");
    
    // Load world map data
    d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json").then((data: any) => {
      if (!data) {
        console.error('Failed to load map data');
        return;
      }
      
      const countries = topojson.feature(data, data.objects.countries).features;
      
      // Filter countries if a region is selected
      const filteredCountries = selectedRegion 
        ? countries.filter((d: any) => {
            const code = d.properties.iso_a3;
            const country = countryMap.get(code);
            return country && country.region === selectedRegion;
          })
        : countries;
      
      // Background for all countries
      g.selectAll("path.country-base")
        .data(filteredCountries)
        .enter()
        .append("path")
        .attr("class", "country-base")
        .attr("d", path)
        .attr("fill", "#e0e0e0")
        .attr("stroke", "#ffffff")
        .attr("stroke-width", 0.5);
      
      // Get color scale based on selected metric
      const getColorScale = () => {
        const metricValues = countryData
          .map(c => getMetricValue(c, selectedMetric))
          .filter((v): v is number => v !== null);
        
        const max = Math.max(...metricValues);
        const min = Math.min(...metricValues);
        
        // Use different color scales based on metric
        if (selectedMetric === 'tariffsToUS' || selectedMetric === 'reciprocalTariff') {
          return d3.scaleSequential()
            .domain([0, max])
            .interpolator(d3.interpolateBlues);
        } else if (selectedMetric === 'usTradeBalance') {
          return d3.scaleSequential()
            .domain([min, max])
            .interpolator(d3.interpolateRdBu);
        } else {
          return d3.scaleSequential()
            .domain([0, max])
            .interpolator(d3.interpolateGreens);
        }
      };
      
      const colorScale = getColorScale();
      
      // Colored overlay for countries in our database with improved click handling
      const countriesWithData = filteredCountries.filter((d: any) => {
        const code = d.properties.iso_a3;
        return countryMap.has(code);
      });

      // Create separate layers for interaction to ensure click events work
      
      // First layer - colored countries (visible)
      g.selectAll("path.country-data")
        .data(countriesWithData)
        .enter()
        .append("path")
        .attr("class", "country-data")
        .attr("d", path)
        .attr("fill", (d: any) => {
          const code = d.properties.iso_a3;
          const country = countryMap.get(code);
          if (!country) return "transparent";
          
          const value = getMetricValue(country, selectedMetric);
          return value !== null ? colorScale(value) : "#ccc";
        })
        .attr("stroke", "#000000")
        .attr("stroke-width", 0.8);
      
      // Second layer - transparent clickable overlay with larger hit area
      g.selectAll("path.country-interaction")
        .data(countriesWithData)
        .enter()
        .append("path")
        .attr("class", "country-interaction")
        .attr("d", path)
        .attr("fill", "transparent")
        .attr("stroke", "transparent")
        .attr("stroke-width", 2)
        .attr("cursor", "pointer")
        .attr("pointer-events", "all") // Ensure clicks register
        .on("mouseover", function(event: any, d: any) {
          const code = d.properties.iso_a3;
          const country = countryMap.get(code);
          
          if (country) {
            // Highlight the country
            d3.select(this.parentNode)
              .select(`path.country-data[d="${d3.select(this).attr("d")}"]`)
              .attr("fill-opacity", 0.8);
            
            tooltip
              .style("visibility", "visible")
              .html(`
                <div class="font-medium">${country.name}</div>
                <div>${getMetricLabel(selectedMetric)}: ${formatMetricValue(getMetricValue(country, selectedMetric), selectedMetric)}</div>
                <div class="text-xs text-blue-600">Click for details</div>
              `);
          }
        })
        .on("mousemove", function(event: any) {
          tooltip
            .style("top", (event.pageY - 10) + "px")
            .style("left", (event.pageX + 10) + "px");
        })
        .on("mouseout", function() {
          // Reset highlight
          d3.select(this.parentNode)
            .selectAll("path.country-data")
            .attr("fill-opacity", 1);
          
          tooltip.style("visibility", "hidden");
        })
        .on("click", function(event: any, d: any) {
          event.stopPropagation(); // Prevent zoom behavior from triggering
          const code = d.properties.iso_a3;
          const country = countryMap.get(code);
          if (country) {
            console.log(`Country clicked: ${country.name} (${country.id})`);
            onSelectCountry(country);
          }
        });
      
      // Add labels for countries in our database
      g.selectAll("text.country-label")
        .data(countriesWithData)
        .enter()
        .append("text")
        .attr("class", "country-label")
        .attr("transform", (d: any) => {
          const centroid = path.centroid(d);
          return centroid[0] && centroid[1] ? `translate(${centroid[0]},${centroid[1]})` : null;
        })
        .attr("text-anchor", "middle")
        .attr("font-size", "8px")
        .attr("font-weight", "500")
        .attr("fill", "#000")
        .attr("pointer-events", "none") // Don't interfere with clicks
        .text((d: any) => {
          const code = d.properties.iso_a3;
          const country = countryMap.get(code);
          return country ? country.name : "";
        });
      
      // Add a legend
      const createLegend = () => {
        const legend = svg.append("g")
          .attr("transform", `translate(${width - 130}, ${height - 140})`);
        
        legend.append("rect")
          .attr("x", 0)
          .attr("y", 0)
          .attr("width", 120)
          .attr("height", 130)
          .attr("fill", "white")
          .attr("fill-opacity", 0.9)
          .attr("stroke", "#ccc");
        
        legend.append("text")
          .attr("x", 10)
          .attr("y", 20)
          .text(getMetricLabel(selectedMetric))
          .attr("font-size", "12px")
          .attr("font-weight", "500");
        
        // Create gradient legend
        const metricValues = countryData
          .map(c => getMetricValue(c, selectedMetric))
          .filter((v): v is number => v !== null);
        
        const max = Math.max(...metricValues);
        const min = Math.min(...metricValues);
        
        const legendHeight = 80;
        const legendScale = d3.scaleLinear()
          .domain([max, min])
          .range([0, legendHeight]);
        
        // Create gradient
        const gradient = legend.append("defs")
          .append("linearGradient")
          .attr("id", "legend-gradient")
          .attr("x1", "0%")
          .attr("x2", "0%")
          .attr("y1", "0%")
          .attr("y2", "100%");
        
        // Add color stops based on metric
        if (selectedMetric === 'usTradeBalance') {
          gradient.append("stop")
            .attr("offset", "0%")
            .attr("stop-color", d3.interpolateRdBu(1));
          
          gradient.append("stop")
            .attr("offset", "50%")
            .attr("stop-color", d3.interpolateRdBu(0.5));
          
          gradient.append("stop")
            .attr("offset", "100%")
            .attr("stop-color", d3.interpolateRdBu(0));
        } else if (selectedMetric === 'tariffsToUS' || selectedMetric === 'reciprocalTariff') {
          gradient.append("stop")
            .attr("offset", "0%")
            .attr("stop-color", d3.interpolateBlues(1));
          
          gradient.append("stop")
            .attr("offset", "100%")
            .attr("stop-color", d3.interpolateBlues(0.1));
        } else {
          gradient.append("stop")
            .attr("offset", "0%")
            .attr("stop-color", d3.interpolateGreens(1));
          
          gradient.append("stop")
            .attr("offset", "100%")
            .attr("stop-color", d3.interpolateGreens(0.1));
        }
        
        // Draw gradient rectangle
        legend.append("rect")
          .attr("x", 10)
          .attr("y", 30)
          .attr("width", 20)
          .attr("height", legendHeight)
          .style("fill", "url(#legend-gradient)");
        
        // Add axis to the legend
        const legendAxis = d3.axisRight(legendScale)
          .ticks(5)
          .tickFormat(d => {
            const value = Number(d);
            return formatMetricValue(value, selectedMetric);
          });
        
        legend.append("g")
          .attr("transform", `translate(30, 30)`)
          .call(legendAxis);
      };
      
      createLegend();
    });
    
    return () => {
      // Cleanup
    };
  }, [countryData, selectedMetric, selectedRegion, zoom, onSelectCountry]);

  return (
    <div className="w-full h-full bg-white rounded-lg overflow-hidden shadow-lg border">
      <div className="p-3 border-b">
        <div className="flex flex-col space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Interactive Country Map</h3>
            
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Info className="h-4 w-4" />
                </Button>
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold">How to use this map</h4>
                  <p className="text-sm text-muted-foreground">
                    Zoom and pan to explore. Click on a country to view detailed 
                    information. Filter by region or switch metrics using the controls.
                  </p>
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex flex-col space-y-1">
              <label className="text-sm font-medium">Show metric:</label>
              <select 
                className="rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm"
                value={selectedMetric}
                onChange={(e) => setSelectedMetric(e.target.value as MetricDisplayType)}
              >
                <option value="tariffsToUS">Tariffs to US (%)</option>
                <option value="reciprocalTariff">Reciprocal Tariff (%)</option>
                <option value="usTradeBalance">US Trade Balance ($M)</option>
                <option value="gdp">GDP 2023 ($B)</option>
              </select>
            </div>
            
            <div className="flex flex-col space-y-1">
              <label className="text-sm font-medium">Filter by region:</label>
              <select 
                className="rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm"
                value={selectedRegion || ""}
                onChange={(e) => setSelectedRegion(e.target.value || null)}
              >
                <option value="">All Regions</option>
                {Object.keys(regions).map(region => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="flex gap-1 flex-wrap">
            {selectedRegion && (
              <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 cursor-pointer" onClick={() => setSelectedRegion(null)}>
                {selectedRegion} <ChevronDown className="ml-1 h-3 w-3" />
              </Badge>
            )}
          </div>
        </div>
      </div>
      
      <div className="relative" style={{ height: "500px" }}>
        <svg ref={svgRef} className="w-full h-full" />
        <div ref={tooltipRef} />
        
        <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-sm p-2 rounded-md border shadow-sm">
          <div className="text-xs text-muted-foreground">
            Zoom: {zoom.toFixed(1)}x
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            Scroll to zoom, drag to pan
          </div>
        </div>
        
        <Card className="absolute top-4 right-4 w-56 opacity-75 hover:opacity-100 transition-opacity">
          <CardContent className="p-3 text-xs">
            <p className="font-medium mb-1">Country Stats</p>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span>Available:</span>
                <span className="font-medium">{countryData.length} countries</span>
              </div>
              {selectedRegion && (
                <div className="flex justify-between">
                  <span>Current region:</span>
                  <span className="font-medium">{regions[selectedRegion]?.length || 0} countries</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InteractiveMap;
