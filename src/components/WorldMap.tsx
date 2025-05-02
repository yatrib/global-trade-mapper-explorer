import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { CountryData } from '../data/types';
import { getCountryColor } from '../data/countries';
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useMapboxToken } from '@/hooks/useMapboxToken';
import CountryPopup from './CountryPopup';
import { createRoot } from 'react-dom/client';

interface WorldMapProps {
  selectedCountry: CountryData | null;
  onSelectCountry: (country: CountryData) => void;
  countryData: CountryData[];
  onShowFullAccess: () => void;
  removeRestrictions?: boolean;
}

const WorldMap: React.FC<WorldMapProps> = ({ 
  selectedCountry, 
  onSelectCountry,
  countryData,
  onShowFullAccess,
  removeRestrictions = false
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCountries, setFilteredCountries] = useState<CountryData[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const { data: mapboxToken, isLoading } = useMapboxToken();

  const popupRef = useRef<mapboxgl.Popup | null>(null);
  const popupRootRef = useRef<{ root: any, container: HTMLDivElement } | null>(null);

  const cleanupPopup = () => {
    try {
      // First unmount any React component using createRoot (React 18 way)
      if (popupRootRef.current) {
        popupRootRef.current.root.unmount();
        popupRootRef.current = null;
      }

      // Then remove the mapbox popup
      if (popupRef.current) {
        popupRef.current.remove();
        popupRef.current = null;
      }
    } catch (error) {
      console.error("Error cleaning up popup:", error);
    }
  };

  // Create a clear function that we'll expose to the CountryPopup component
  const closePopup = () => {
    cleanupPopup();
  };

  useEffect(() => {
    if (!mapContainer.current || !mapboxToken || isLoading || !countryData.length) return;

    mapboxgl.accessToken = mapboxToken;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      projection: 'mercator',
      zoom: 1.5,
      center: [0, 20],
      minZoom: 1.5,
      maxZoom: 1.5,
      renderWorldCopies: false,
      dragPan: false,
      scrollZoom: false,
      doubleClickZoom: false,
      touchZoomRotate: false
    });

    // Extract country codes for visualization
    const countryCodes = countryData.map(country => country.id);
    console.log("Countries loaded from database:", countryCodes);

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

      // Layer for highlighting countries in the database with a consistent blue color
      map.current.addLayer({
        id: 'database-countries',
        type: 'fill',
        source: 'countries',
        'source-layer': 'country_boundaries',
        paint: {
          'fill-color': '#0EA5E9',  // Ocean Blue - consistent color for all countries in our database
          'fill-opacity': 0.8,
        },
        filter: ['in', 'iso_3166_1'].concat(countryCodes as any[]),
      });

      // Add layer for highlighted database countries outlines
      map.current.addLayer({
        id: 'database-countries-outline',
        type: 'line',
        source: 'countries',
        'source-layer': 'country_boundaries',
        paint: {
          'line-color': '#000000',
          'line-width': 1,
          'line-opacity': 0.8,
        },
        filter: ['in', 'iso_3166_1'].concat(countryCodes as any[]),
      });

      // Borders layer
      map.current.addLayer({
        id: 'country-borders',
        type: 'line',
        source: 'countries',
        'source-layer': 'country_boundaries',
        paint: {
          'line-color': '#ffffff',
          'line-width': 0.5,
        },
      });

      // Add country labels but only for countries in our database (SINGLE LAYER)
      map.current.addLayer({
        id: 'country-labels',
        type: 'symbol',
        source: 'countries',
        'source-layer': 'country_boundaries',
        layout: {
          'text-field': ['get', 'name_en'],
          'text-font': ['DIN Pro Medium', 'Arial Unicode MS Bold'],
          'text-size': 12,
          'text-transform': 'uppercase',
          'text-offset': [0, 0],
          'text-anchor': 'center',
          'text-allow-overlap': false, // Prevent label overlap
          'text-ignore-placement': false, // Respect other placements
        },
        paint: {
          'text-color': '#000000',
          'text-halo-color': '#ffffff',
          'text-halo-width': 1.5,
        },
        filter: ['in', 'iso_3166_1'].concat(countryCodes as any[]),
      });

      // Only allow clicking and hovering on countries that exist in our database
      map.current.on('click', ['database-countries'], (e) => {
        if (e.features && e.features[0].properties) {
          const countryCode = e.features[0].properties.iso_3166_1;
          const country = countryData.find(c => c.id === countryCode);
          
          if (!country) return;
          
          // Clean up existing popup first
          cleanupPopup();

          // Create new container for this popup
          const container = document.createElement('div');
          
          // Calculate popup position based on viewport
          const lngLat = e.lngLat;
          const screenPoint = map.current!.project(lngLat);
          
          // Adjust position if near edges
          const mapBounds = map.current!.getContainer().getBoundingClientRect();
          // Fix: Properly type the offset as a tuple [number, number] instead of number[]
          const offset: [number, number] = [0, -10];
          
          // Create and set new popup
          const newPopup = new mapboxgl.Popup({
            closeButton: false,
            closeOnClick: false,
            maxWidth: '300px',
            offset: offset,
            className: 'country-popup'
          })
            .setLngLat(lngLat)
            .setDOMContent(container)
            .addTo(map.current!);
            
          // Store reference to popup
          popupRef.current = newPopup;

          // Create a React root for this container (React 18 way)
          const root = createRoot(container);
          popupRootRef.current = { root, container };

          // Render CountryPopup component using the root
          root.render(
            <CountryPopup 
              country={country} 
              onShowAllData={() => {
                cleanupPopup();
                onSelectCountry(country);
              }}
              onClose={closePopup}
              isRestricted={false}
            />
          );
        }
      });

      // Only show pointer cursor for countries in our database
      map.current.on('mouseenter', ['database-countries'], () => {
        if (map.current) map.current.getCanvas().style.cursor = 'pointer';
      });

      map.current.on('mouseleave', ['database-countries'], () => {
        if (map.current) map.current.getCanvas().style.cursor = '';
      });
    });

    return () => {
      cleanupPopup();
      if (map.current) {
        map.current.remove();
      }
    };
  }, [mapboxToken, isLoading, countryData, onSelectCountry, onShowFullAccess, removeRestrictions]);

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
    return <div className="w-full h-full flex items-center justify-center">Loading map...</div>;
  }

  return (
    <div className="w-full h-full bg-white rounded-lg overflow-hidden shadow-lg border">
      <div className="p-3 border-b">
        <div className="flex flex-col gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="text"
              placeholder="Search countries..."
              className="pl-9 h-9 text-gray-800"
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
                    className="p-2 hover:bg-muted cursor-pointer text-gray-700"
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
        </div>
      </div>
      
      <div className="relative h-full w-full">
        <div ref={mapContainer} className="absolute inset-0" />
        
        <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm p-2 rounded-md border shadow-sm">
          <div className="text-xs text-muted-foreground mb-1">Legend</div>
          <div className="flex gap-2 items-center">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-[#0EA5E9] opacity-80 rounded-sm"></div>
                <span className="text-xs">Countries with data</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-gray-200 rounded-sm"></div>
                <span className="text-xs">No data</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorldMap;
