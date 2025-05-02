
import React, { useEffect, useRef } from 'react';
import { CountryData } from '@/data/types';
import { loadAmChartsScripts, initializeAmChart, AmChartsInstance } from '@/utils/amCharts';
import useCountryData from '@/hooks/useCountryData';

interface AmChartsMapProps {
  onSelectCountry: (country: CountryData) => void;
}

const AmChartsMap: React.FC<AmChartsMapProps> = ({ onSelectCountry }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstanceRef = useRef<AmChartsInstance | undefined>();
  const { countryData, loading: isLoading, error } = useCountryData();

  useEffect(() => {
    if (!chartRef.current || !countryData) return;

    // Log how many countries we have with data
    console.log(`Initializing map with ${countryData.length} countries`);
    
    // Debug - check if Canada exists in countryData
    const canada = countryData.find(c => c.id === "CA");
    if (canada) {
      console.log("Canada found in country data:", canada);
    } else {
      console.warn("Canada NOT found in country data!");
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
          
          // Create new chart instance with all countries from the database
          chartInstanceRef.current = initializeAmChart(
            chartRef.current,
            countryData,
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
  }, [countryData, onSelectCountry]);

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
          Error loading map data: {error instanceof Error ? error.message : 'Unknown error'}
        </div>
      </div>
    );
  }

  // Show map as long as we have any country data, even if some countries have null metrics
  return (
    <div className="w-full bg-white rounded-lg overflow-hidden shadow-lg border">
      <div className="p-3 border-b">
        <h3 className="text-lg font-medium text-infomineo-blue">Global Economic Map</h3>
        <p className="text-sm text-muted-foreground mt-1">
          View GDP and trade data by country. Click on a country for details.
        </p>
      </div>
      <div id="chartdiv" ref={chartRef} className="w-full h-[650px]"></div>
    </div>
  );
};

export default AmChartsMap;
