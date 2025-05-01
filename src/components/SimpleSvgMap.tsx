
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import { CountryData } from '@/data/types';
import { getCountryColor } from '@/data/countries';

interface SimpleSvgMapProps {
  countryData: CountryData[];
  onSelectCountry: (country: CountryData) => void;
}

const SimpleSvgMap: React.FC<SimpleSvgMapProps> = ({ countryData, onSelectCountry }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!svgRef.current || !countryData.length) return;
    
    const svg = d3.select(svgRef.current);
    const width = 960;
    const height = 500;
    
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
    const projection = d3.geoNaturalEarth1()
      .scale(170)
      .translate([width / 2, height / 2]);
    
    // Create a path generator
    const path = d3.geoPath().projection(projection);
    
    // Country codes in our database for quick lookup
    const countryCodesInDb = new Set(countryData.map(country => country.id));
    
    // Load world map data
    d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json").then((data: any) => {
      const countries = topojson.feature(data, data.objects.countries).features;
      
      // Background for all countries
      svg.selectAll("path.country-base")
        .data(countries)
        .enter()
        .append("path")
        .attr("class", "country-base")
        .attr("d", path)
        .attr("fill", "#e0e0e0")
        .attr("stroke", "#ffffff")
        .attr("stroke-width", 0.5);
      
      // Colored overlay for countries in our database
      svg.selectAll("path.country-data")
        .data(countries.filter((d: any) => {
          const code = d.properties.iso_a3;
          return countryCodesInDb.has(code);
        }))
        .enter()
        .append("path")
        .attr("class", "country-data")
        .attr("d", path)
        .attr("fill", (d: any) => {
          const code = d.properties.iso_a3;
          const country = countryData.find(c => c.id === code);
          return country ? getCountryColor(country, 'tariffsToUS') : "transparent";
        })
        .attr("stroke", "#000000")
        .attr("stroke-width", 0.8)
        .attr("cursor", "pointer")
        .on("mouseover", function(event: any, d: any) {
          const code = d.properties.iso_a3;
          const country = countryData.find(c => c.id === code);
          
          if (country) {
            d3.select(this).attr("fill-opacity", 0.8);
            
            tooltip
              .style("visibility", "visible")
              .html(`
                <div class="font-medium">${country.name}</div>
                <div>Tariff rate: ${country.tariffsToUS || 'N/A'}%</div>
              `);
          }
        })
        .on("mousemove", function(event: any) {
          tooltip
            .style("top", (event.pageY - 10) + "px")
            .style("left", (event.pageX + 10) + "px");
        })
        .on("mouseout", function() {
          d3.select(this).attr("fill-opacity", 1);
          tooltip.style("visibility", "hidden");
        })
        .on("click", function(event: any, d: any) {
          const code = d.properties.iso_a3;
          const country = countryData.find(c => c.id === code);
          if (country) {
            onSelectCountry(country);
          }
        });
      
      // Add labels for countries in our database
      svg.selectAll("text")
        .data(countries.filter((d: any) => {
          const code = d.properties.iso_a3;
          return countryCodesInDb.has(code);
        }))
        .enter()
        .append("text")
        .attr("transform", (d: any) => {
          const centroid = path.centroid(d);
          return `translate(${centroid[0]},${centroid[1]})`;
        })
        .attr("text-anchor", "middle")
        .attr("font-size", "8px")
        .attr("font-weight", "500")
        .attr("fill", "#000")
        .text((d: any) => {
          const code = d.properties.iso_a3;
          const country = countryData.find(c => c.id === code);
          return country ? country.name : "";
        });
    });
    
    // Add legend
    const legend = svg.append("g")
      .attr("transform", `translate(${width - 120}, ${height - 80})`);
    
    legend.append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", 100)
      .attr("height", 70)
      .attr("fill", "white")
      .attr("fill-opacity", 0.8)
      .attr("stroke", "#ccc");
    
    legend.append("text")
      .attr("x", 10)
      .attr("y", 15)
      .text("Legend")
      .attr("font-size", "12px")
      .attr("font-weight", "500");
    
    // High tariffs
    legend.append("rect")
      .attr("x", 10)
      .attr("y", 25)
      .attr("width", 10)
      .attr("height", 10)
      .attr("fill", "#0e7490")
      .attr("fill-opacity", 0.8);
    
    legend.append("text")
      .attr("x", 25)
      .attr("y", 35)
      .text("High tariffs")
      .attr("font-size", "10px");
    
    // Low tariffs
    legend.append("rect")
      .attr("x", 10)
      .attr("y", 45)
      .attr("width", 10)
      .attr("height", 10)
      .attr("fill", "#0e7490")
      .attr("fill-opacity", 0.3);
    
    legend.append("text")
      .attr("x", 25)
      .attr("y", 55)
      .text("Low tariffs")
      .attr("font-size", "10px");
    
    return () => {
      // Cleanup on unmount
    };
  }, [countryData, onSelectCountry]);

  return (
    <div className="w-full h-full bg-white rounded-lg overflow-hidden shadow-lg border">
      <div className="p-3 border-b">
        <h3 className="text-lg font-medium">SVG World Map</h3>
        <p className="text-sm text-muted-foreground">Alternative visualization using D3.js</p>
      </div>
      <div className="relative">
        <svg ref={svgRef} className="w-full h-auto" style={{ minHeight: "400px" }} />
        <div ref={tooltipRef} />
      </div>
    </div>
  );
};

export default SimpleSvgMap;
