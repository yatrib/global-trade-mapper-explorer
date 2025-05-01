
import React, { useEffect, useRef } from 'react';
import { CountryData } from '@/data/types';
import { loadAmChartsScripts, initializeAmChart, AmChartsInstance } from '@/utils/amChartsUtils';

interface AmChartsMapProps {
  countryData: CountryData[];
  onSelectCountry: (country: CountryData) => void;
}

const AmChartsMap: React.FC<AmChartsMapProps> = ({ countryData, onSelectCountry }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstanceRef = useRef<AmChartsInstance | undefined>();

  useEffect(() => {
    if (!chartRef.current || !countryData.length) return;

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
          
          // Create new chart instance
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
