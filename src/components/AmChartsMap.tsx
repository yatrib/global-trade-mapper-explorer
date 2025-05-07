
import React, { useEffect, useRef, useState } from 'react';
import { CountryData } from '@/data/types';
import { loadAmChartsScripts, initializeAmChart, AmChartsInstance } from '@/utils/amCharts';
import useCountryData from '@/hooks/useCountryData';
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';

interface AmChartsMapProps {
  onSelectCountry: (country: CountryData) => void;
}

type CountryFilter = 'g20' | 'non-g20';

const AmChartsMap: React.FC<AmChartsMapProps> = ({ onSelectCountry }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstanceRef = useRef<AmChartsInstance | undefined>();
  const { countryData, loading: isLoading, error } = useCountryData();
  const [filter, setFilter] = useState<CountryFilter>('g20'); // Default to G20

  useEffect(() => {
    if (!chartRef.current || !countryData) return;

    // Filter countries based on selected filter
    const filteredData = countryData.filter(country => {
      // Debug logs to check what data we're getting
      console.log(`Country ${country.name}, region: ${country.region}, Type: ${country.region === 'G20' ? 'G20' : 'Not G20'}`);
      
      if (filter === 'g20' && country.region === 'G20') return true;
      if (filter === 'non-g20' && country.region !== 'G20') return true;
      return false;
    });

    // Log how many countries we have with data
    console.log(`Initializing map with ${filteredData.length} countries (filter: ${filter})`);
    console.log("Filtered countries:", filteredData.map(c => `${c.name} (${c.region})`));
    
    // Debug - check if Canada exists in filtered data
    const canada = filteredData.find(c => c.id === "CA");
    if (canada) {
      console.log("Canada found in filtered data:", canada);
    } else {
      console.warn("Canada NOT found in filtered data!");
      // Let's check if it's in the raw data
      const rawCanada = countryData.find(c => c.id === "CA");
      if (rawCanada) {
        console.log("Canada found in raw data:", rawCanada);
      }
    }
    
    // Load AmCharts scripts and initialize the chart
    const initChart = async () => {
      try {
        await loadAmChartsScripts();
        
        // Initialize chart with container and data
        if (chartRef.current) {
          // Clean up previous instance if it exists
          if (chartInstanceRef.current) {
            chartInstanceRef.current.dispose();
          }
          
          // Create new chart instance with filtered countries
          chartInstanceRef.current = initializeAmChart(
            chartRef.current,
            filteredData,
            onSelectCountry
          );
        }
      } catch (error) {
        console.error('Failed to initialize AmCharts map:', error);
      }
    };

    initChart();

    // Clean up on unmount
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.dispose();
      }
    };
  }, [countryData, onSelectCountry, filter]);

  if (isLoading) {
    return (
      <div className="w-full bg-white rounded-lg overflow-hidden shadow-lg border p-4">
        <div className="animate-pulse flex flex-col space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/4"></div>
          <div className="h-[500px] bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full bg-white rounded-lg overflow-hidden shadow-lg border p-4">
        <div className="text-red-500">
          Error loading map data: {typeof error === 'object' && error !== null ? (error as Error).message : String(error)}
        </div>
      </div>
    );
  }

  // Show map as long as we have any country data, even if some countries have null metrics
  return (
    <div className="w-full bg-white rounded-lg overflow-hidden shadow-lg border">
      <div className="p-3 border-b">
        <div className="flex flex-col space-y-2">
          <div className="flex items-center gap-2 mb-1">
            <Filter size={16} className="text-muted-foreground" />
            <div className="flex gap-2">
              <Button 
                variant={filter === 'g20' ? "default" : "outline"} 
                size="sm"
                onClick={() => setFilter('g20')}
                className="h-8"
              >
                G20 Countries
              </Button>
              <Button 
                variant={filter === 'non-g20' ? "default" : "outline"} 
                size="sm"
                onClick={() => setFilter('non-g20')}
                className="h-8"
              >
                Non-G20 Countries
              </Button>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            View GDP and trade data by country. Click on a country for details.
          </p>
        </div>
      </div>
      <div id="chartdiv" ref={chartRef} className="w-full h-[650px]"></div>
    </div>
  );
};

export default AmChartsMap;
