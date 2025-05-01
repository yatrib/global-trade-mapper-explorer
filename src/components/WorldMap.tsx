
import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { CountryData } from '../data/types';
import { getCountryColor } from '../data/countries';
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useMapboxToken } from '@/hooks/useMapboxToken';
import CountryPopup from './CountryPopup';
import ReactDOM from 'react-dom';

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
  const popupContainerRef = useRef<HTMLDivElement | null>(null);

  const cleanupPopup = () => {
    try {
      // First unmount any React component
      if (popupContainerRef.current) {
        ReactDOM.unmountComponentAtNode(popupContainerRef.current);
        popupContainerRef.current = null;
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
    if (!mapContainer.current || !mapboxToken || isLoading) return;

    mapboxgl.accessToken = mapboxToken;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      projection: 'mercator',
      zoom: 1.5,
      center: [0, 20],
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

      // When restrictions removed, all countries are colored based on tariff data
      map.current.addLayer({
        id: 'all-countries',
        type: 'fill',
        source: 'countries',
        'source-layer': 'country_boundaries',
        paint: {
          'fill-color': [
            'match',
            ['get', 'iso_3166_1'],
            ...countryData.flatMap(country => [
              country.id,
              getCountryColor(country, 'tariffsToUS')
            ]),
            '#e0e0e0' // Default color for countries not in our data
          ],
          'fill-opacity': 0.8,
        },
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

      // Click handler
      map.current.on('click', ['all-countries'], (e) => {
        if (e.features && e.features[0].properties) {
          const countryCode = e.features[0].properties.iso_3166_1;
          const country = countryData.find(c => c.id === countryCode);
          
          if (!country) return;
          
          // Clean up existing popup first
          cleanupPopup();

          // Create new container for this popup
          const container = document.createElement('div');
          popupContainerRef.current = container;
          
          // Create and set new popup
          const newPopup = new mapboxgl.Popup({
            closeButton: false,
            closeOnClick: false,
            maxWidth: '300px'
          })
            .setLngLat(e.lngLat)
            .setDOMContent(container)
            .addTo(map.current!);
            
          // Store reference to popup
          popupRef.current = newPopup;

          // Render CountryPopup component into the container
          ReactDOM.render(
            <CountryPopup 
              country={country} 
              onShowAllData={() => {
                cleanupPopup();
                onSelectCountry(country);
              }}
              onClose={closePopup}
              isRestricted={false}
            />,
            container
          );
        }
      });

      map.current.on('mouseenter', ['all-countries'], () => {
        if (map.current) map.current.getCanvas().style.cursor = 'pointer';
      });

      map.current.on('mouseleave', ['all-countries'], () => {
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
    return <div className="w-full h-[400px] flex items-center justify-center">Loading map...</div>;
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
      
      <div className="relative h-[600px] w-full overflow-hidden">
        <div ref={mapContainer} className="absolute inset-0" />
        
        <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm p-2 rounded-md border shadow-sm">
          <div className="text-xs text-muted-foreground mb-1">Legend</div>
          <div className="flex gap-2 items-center">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-cyan-700 opacity-80 rounded-sm"></div>
                <span className="text-xs">High tariffs</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-cyan-700 opacity-30 rounded-sm"></div>
                <span className="text-xs">Low tariffs</span>
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
