
import React, { useEffect, useRef, useState } from 'react';
import { CountryData } from '@/data/types';
import { loadAmChartsScripts, initializeAmChart, AmChartsInstance } from '@/utils/amCharts';
import useCountryData from '@/hooks/useCountryData';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Radio, RadioGroup } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface AmChartsMapWithFiltersProps {
  onSelectCountry: (country: CountryData) => void;
}

const AmChartsMapWithFilters: React.FC<AmChartsMapWithFiltersProps> = ({ onSelectCountry }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstanceRef = useRef<AmChartsInstance | undefined>();
  const { countryData, loading: isLoading, error } = useCountryData();
  // Set G20 as the default filter
  const [regionFilter, setRegionFilter] = useState<string | null>("G20");
  // Add tariff visualization type with reciprocal tariff as default
  const [tariffVisualization, setTariffVisualization] = useState<'reciprocalTariff' | 'tariffsToUS'>('reciprocalTariff');

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
          
          // Create new chart instance with filtered countries
          chartInstanceRef.current = initializeAmChart(
            chartRef.current,
            countryData,
            onSelectCountry,
            regionFilter,
            tariffVisualization
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
  }, [countryData, onSelectCountry, regionFilter, tariffVisualization]);

  const handleRegionFilterChange = (value: string) => {
    setRegionFilter(value);
  };

  const handleTariffVisualizationChange = (value: 'reciprocalTariff' | 'tariffsToUS') => {
    setTariffVisualization(value);
  };

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
        <div className="mb-4">
          <Tabs defaultValue="G20" onValueChange={handleRegionFilterChange}>
            <TabsList className="bg-muted">
              <TabsTrigger 
                value="G20" 
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-700"
              >
                G20 Countries
              </TabsTrigger>
              <TabsTrigger 
                value="Non-G20" 
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-700"
              >
                Non-G20 Countries
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <div className="mb-4 mt-4">
          <RadioGroup 
            defaultValue="reciprocalTariff" 
            onValueChange={(value) => handleTariffVisualizationChange(value as 'reciprocalTariff' | 'tariffsToUS')}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroup.RadioGroupItem value="reciprocalTariff" id="reciprocalTariff" />
              <Label htmlFor="reciprocalTariff">Reciprocal Tariffs (US to Countries)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroup.RadioGroupItem value="tariffsToUS" id="tariffsToUS" />
              <Label htmlFor="tariffsToUS">Tariffs to US (Countries to US)</Label>
            </div>
          </RadioGroup>
        </div>
        
        <p className="text-sm text-muted-foreground mt-1">
          View GDP and trade data by country. Click on a country for details.
        </p>
      </div>
      <div id="chartdiv" ref={chartRef} className="w-full h-[650px]"></div>
    </div>
  );
};

export default AmChartsMapWithFilters;
