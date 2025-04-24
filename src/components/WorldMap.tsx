
import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { CountryData, MetricType } from '../data/types';
import { countryData, getCountryColor, metricOptions } from '../data/countries';
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

// Temporary public token for demo purposes
mapboxgl.accessToken = 'pk.eyJ1IjoibG92YWJsZSIsImEiOiJjbHQ3ZnYyY2wwMXlqMmlxczdpcGlvZ2d4In0.a-KHB3kiE4h8nKi9boVEVw';

interface WorldMapProps {
  selectedCountry: CountryData | null;
  selectedMetric: MetricType;
  onSelectCountry: (country: CountryData) => void;
}

const WorldMap: React.FC<WorldMapProps> = ({ selectedCountry, selectedMetric, onSelectCountry }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCountries, setFilteredCountries] = useState<CountryData[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  useEffect(() => {
    if (!mapContainer.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      projection: 'mercator',
      zoom: 1.5,
      center: [0, 20],
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    map.current.on('load', () => {
      if (!map.current) return;

      // Add source for country boundaries
      map.current.addSource('countries', {
        type: 'vector',
        url: 'mapbox://mapbox.country-boundaries-v1',
      });

      // Add fill layer for all countries (gray background)
      map.current.addLayer({
        id: 'country-fills',
        type: 'fill',
        source: 'countries',
        'source-layer': 'country_boundaries',
        paint: {
          'fill-color': '#e0e0e0',
          'fill-opacity': 0.5,
        },
      });

      // Add highlighted countries layer
      map.current.addLayer({
        id: 'highlighted-countries',
        type: 'fill',
        source: 'countries',
        'source-layer': 'country_boundaries',
        paint: {
          'fill-color': [
            'match',
            ['get', 'iso_3166_1'],
            countryData.map(c => c.id),
            getCountryColor(countryData[0], selectedMetric),
            'transparent'
          ],
          'fill-opacity': 0.8,
        },
        filter: ['in', 'iso_3166_1'].concat(countryData.map(c => c.id)),
      });

      // Add borders
      map.current.addLayer({
        id: 'country-borders',
        type: 'line',
        source: 'countries',
        'source-layer': 'country_boundaries',
        paint: {
          'line-color': '#ffffff',
          'line-width': 1,
        },
      });

      // Add click handler
      map.current.on('click', 'highlighted-countries', (e) => {
        if (e.features && e.features[0].properties) {
          const countryCode = e.features[0].properties.iso_3166_1;
          const country = countryData.find(c => c.id === countryCode);
          if (country) {
            onSelectCountry(country);
          }
        }
      });

      // Change cursor on hover
      map.current.on('mouseenter', 'highlighted-countries', () => {
        if (map.current) map.current.getCanvas().style.cursor = 'pointer';
      });

      map.current.on('mouseleave', 'highlighted-countries', () => {
        if (map.current) map.current.getCanvas().style.cursor = '';
      });
    });

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, []);

  // Update colors when metric changes
  useEffect(() => {
    if (!map.current || !map.current.isStyleLoaded()) return;

    map.current.setPaintProperty('highlighted-countries', 'fill-color', [
      'match',
      ['get', 'iso_3166_1'],
      ...countryData.flatMap(country => [
        country.id,
        getCountryColor(country, selectedMetric)
      ]),
      'transparent'
    ]);
  }, [selectedMetric]);

  // Handle search functionality
  useEffect(() => {
    if (searchTerm) {
      const filtered = countryData.filter(country => 
        country.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCountries(filtered);
    } else {
      setFilteredCountries([]);
    }
  }, [searchTerm]);

  return (
    <div className="w-full h-full bg-white rounded-lg overflow-hidden shadow-sm border">
      <div className="p-3 border-b">
        <div className="relative mb-2">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search countries..."
            className="pl-9 h-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setTimeout(() => setIsSearchFocused(false), 100)}
          />
          
          {isSearchFocused && filteredCountries.length > 0 && (
            <div className="absolute z-10 w-full bg-white border rounded-md shadow-md mt-1 max-h-60 overflow-y-auto">
              {filteredCountries.map((country) => (
                <div
                  key={country.id}
                  className="p-2 hover:bg-muted cursor-pointer"
                  onClick={() => {
                    onSelectCountry(country);
                    setSearchTerm('');
                  }}
                >
                  {country.name}
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="flex flex-wrap gap-1 items-center text-xs text-muted-foreground">
          <span>Selected metric:</span>
          <span className="font-medium text-foreground">
            {selectedMetric ? metricOptions.find(m => m.id === selectedMetric)?.label : 'None'}
          </span>
        </div>
      </div>
      
      <div className="relative h-[400px] w-full overflow-hidden">
        <div ref={mapContainer} className="absolute inset-0" />
        
        <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm p-2 rounded-md border shadow-sm">
          <div className="text-xs text-muted-foreground mb-1">Legend</div>
          <div className="flex gap-2 items-center">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-cyan-700 opacity-80 rounded-sm"></div>
                <span className="text-xs">High value</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-cyan-700 opacity-30 rounded-sm"></div>
                <span className="text-xs">Low value</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-gray-200 rounded-sm"></div>
                <span className="text-xs">No data</span>
              </div>
            </div>
            
            {(selectedMetric === 'usTradeBalance') && (
              <div className="flex flex-col gap-1 ml-4 border-l pl-4">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-red-500 opacity-80 rounded-sm"></div>
                  <span className="text-xs">Trade deficit</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-blue-500 opacity-80 rounded-sm"></div>
                  <span className="text-xs">Trade surplus</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorldMap;
