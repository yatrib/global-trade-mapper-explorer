
import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { CountryData, MetricType } from '../data/types';
import { getCountryColor, metricOptions } from '../data/countries';
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useMapboxToken } from '@/hooks/useMapboxToken';
import CountryPopup from './CountryPopup';
import ReactDOM from 'react-dom';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

interface WorldMapProps {
  selectedCountry: CountryData | null;
  selectedMetric: MetricType;
  onSelectMetric: (metric: MetricType) => void;
  onSelectCountry: (country: CountryData) => void;
  countryData: CountryData[];
  onShowFullAccess: () => void;
}

const WorldMap: React.FC<WorldMapProps> = ({ 
  selectedCountry, 
  selectedMetric,
  onSelectMetric,
  onSelectCountry,
  countryData,
  onShowFullAccess
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCountries, setFilteredCountries] = useState<CountryData[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const { data: mapboxToken, isLoading } = useMapboxToken();

  const [popup, setPopup] = useState<mapboxgl.Popup | null>(null);

  useEffect(() => {
    if (!mapContainer.current || !mapboxToken || isLoading) return;

    mapboxgl.accessToken = mapboxToken;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      projection: 'equalEarth',
      zoom: 1,
      center: [0, 0],
      minZoom: 1,
      maxZoom: 8,
      renderWorldCopies: false
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    map.current.on('load', () => {
      if (!map.current) return;

      // Add source
      map.current.addSource('countries', {
        type: 'vector',
        url: 'mapbox://mapbox.country-boundaries-v1',
      });

      // Base layer for all countries (gray)
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

      // Layer for restricted countries (darker gray)
      map.current.addLayer({
        id: 'restricted-countries',
        type: 'fill',
        source: 'countries',
        'source-layer': 'country_boundaries',
        paint: {
          'fill-color': '#9CA3AF',
          'fill-opacity': 0.7,
        },
        filter: ['in', 'iso_3166_1'].concat(countryData.slice(5).map(c => c.id)),
      });

      // Layer for visible countries (colored)
      map.current.addLayer({
        id: 'visible-countries',
        type: 'fill',
        source: 'countries',
        'source-layer': 'country_boundaries',
        paint: {
          'fill-color': [
            'match',
            ['get', 'iso_3166_1'],
            countryData.slice(0, 5).map(c => c.id),
            getCountryColor(countryData[0], selectedMetric),
            'transparent'
          ],
          'fill-opacity': 0.8,
        },
        filter: ['in', 'iso_3166_1'].concat(countryData.slice(0, 5).map(c => c.id)),
      });

      // Borders layer
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

      // Click handlers
      map.current.on('click', ['visible-countries', 'restricted-countries'], (e) => {
        if (e.features && e.features[0].properties) {
          const countryCode = e.features[0].properties.iso_3166_1;
          const country = countryData.find(c => c.id === countryCode);
          
          if (!country) return;
          
          const isRestricted = countryData.indexOf(country) >= 5;
          
          if (popup) {
            popup.remove();
          }

          // Create popup container
          const popupContent = document.createElement('div');
          
          // Render CountryPopup component into the container
          ReactDOM.render(
            <CountryPopup 
              country={country} 
              onShowAllData={() => {
                if (popup) popup.remove();
                if (isRestricted) {
                  onShowFullAccess();
                } else {
                  onSelectCountry(country);
                }
              }}
              isRestricted={isRestricted}
            />,
            popupContent
          );

          // Create and set new popup
          const newPopup = new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setDOMContent(popupContent)
            .addTo(map.current!);

          setPopup(newPopup);
        }
      });

      map.current.on('mouseenter', ['visible-countries', 'restricted-countries'], () => {
        if (map.current) map.current.getCanvas().style.cursor = 'pointer';
      });

      map.current.on('mouseleave', ['visible-countries', 'restricted-countries'], () => {
        if (map.current) map.current.getCanvas().style.cursor = '';
      });
    });

    return () => {
      if (popup) {
        popup.remove();
      }
      if (map.current) {
        map.current.remove();
      }
    };
  }, [mapboxToken, isLoading, countryData, selectedMetric, onSelectCountry, onShowFullAccess]);

  useEffect(() => {
    if (!map.current || !map.current.isStyleLoaded()) return;

    map.current.setPaintProperty('visible-countries', 'fill-color', [
      'match',
      ['get', 'iso_3166_1'],
      ...countryData.slice(0, 5).flatMap(country => [
        country.id,
        getCountryColor(country, selectedMetric)
      ]),
      'transparent'
    ]);
  }, [selectedMetric, countryData]);

  useEffect(() => {
    if (searchTerm) {
      const filtered = countryData.filter(country => 
        country.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCountries(filtered);
    } else {
      setFilteredCountries([]);
    }
  }, [searchTerm, countryData]);

  if (isLoading) {
    return <div className="w-full h-[400px] flex items-center justify-center">Loading map...</div>;
  }

  return (
    <div className="w-full h-full bg-white rounded-lg overflow-hidden shadow-sm border">
      <div className="p-3 border-b">
        <div className="flex flex-col gap-2">
          <div className="relative">
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
          
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground min-w-fit">Selected metric:</span>
            <span className="text-xs font-medium text-foreground mr-2">
              {selectedMetric ? metricOptions.find(m => m.id === selectedMetric)?.label : 'None'}
            </span>
            
            <ToggleGroup type="single" value={selectedMetric} onValueChange={(value) => value && onSelectMetric(value as MetricType)} className="flex flex-wrap gap-1">
              {metricOptions.slice(0, 4).map((metric) => (
                <ToggleGroupItem 
                  key={metric.id} 
                  value={metric.id} 
                  size="sm"
                  className="text-xs px-2 py-1 h-auto"
                  aria-label={metric.label}
                >
                  {metric.label.split(' ')[0]}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
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
