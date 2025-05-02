
import React, { useEffect, useRef, useState } from 'react';
import useCountryData from '@/hooks/useCountryData';
import { initializeAmChart } from '@/utils/amCharts/chartInitializer';
import { AmChartsInstance } from '@/utils/amCharts/types';
import CountryTypeFilter from './CountryTypeFilter';

interface AmChartsMapProps {
  onSelectCountry: (country: any) => void;
}

const AmChartsMap: React.FC<AmChartsMapProps> = ({ onSelectCountry }) => {
  const { countryData, loading, error } = useCountryData();
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<AmChartsInstance | undefined>();
  const [selectedType, setSelectedType] = useState<string | null>(null);

  // Load the chart when component mounts or when countryData changes
  useEffect(() => {
    if (!chartRef.current || loading || error || !countryData?.length) return;

    // Clean up previous chart instance if it exists
    if (chartInstance.current) {
      chartInstance.current.dispose();
    }

    // Initialize a new chart
    chartInstance.current = initializeAmChart(
      chartRef.current,
      countryData,
      onSelectCountry,
      selectedType || undefined
    );

    // Clean up when component unmounts
    return () => {
      if (chartInstance.current) {
        chartInstance.current.dispose();
      }
    };
  }, [countryData, loading, error, onSelectCountry, selectedType]);

  if (loading) {
    return <div className="h-[600px] flex items-center justify-center">Loading map data...</div>;
  }

  if (error) {
    return <div className="h-[600px] flex items-center justify-center text-red-500">Error loading map: {error.toString()}</div>;
  }

  if (!countryData || countryData.length === 0) {
    return <div className="h-[600px] flex items-center justify-center">No country data available</div>;
  }

  // Calculate filtered countries count
  const filteredCountriesCount = selectedType 
    ? countryData.filter(c => c.region === selectedType).length 
    : countryData.length;

  return (
    <div className="bg-white rounded-lg overflow-hidden">
      <div className="p-4 border-b flex justify-between items-center">
        <CountryTypeFilter 
          countryData={countryData}
          selectedType={selectedType}
          onSelectType={setSelectedType}
        />
        
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>Showing {filteredCountriesCount} {filteredCountriesCount === 1 ? 'country' : 'countries'}</span>
        </div>
      </div>
      <div className="h-[600px]" ref={chartRef}></div>
    </div>
  );
};

export default AmChartsMap;
