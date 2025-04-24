
import React, { useState } from 'react';
import { CountryData, MetricType } from '@/data/types';
import WorldMap from '@/components/WorldMap';
import CountryDetail from '@/components/CountryDetail';
import MetricSelector from '@/components/MetricSelector';
import { Badge } from '@/components/ui/badge';
import { Globe, Info } from 'lucide-react';
import { useCountryData } from '@/hooks/useCountryData';
import { metricOptions } from '@/data/countries';

const Index: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(null);
  const [selectedMetric, setSelectedMetric] = useState<MetricType>('gdp2023');
  const { data: countryData, isLoading, error } = useCountryData();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-lg text-muted-foreground">Loading data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-lg text-red-500">Error loading data: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-y-2">
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <Globe className="h-6 w-6 text-cyan-700" /> 
                Global Trade Mapper Explorer
              </h1>
              <p className="text-sm text-muted-foreground">
                Interactive visualization of global trade data and economic indicators
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs px-2 py-0.5 bg-amber-50 text-amber-700 hover:bg-amber-50">
                Data updated: Feb 2025
              </Badge>
              
              <div className="flex items-center text-xs text-muted-foreground">
                <Info className="h-3.5 w-3.5 mr-1" />
                All data shown is for demonstration purposes
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 gap-6">
          <MetricSelector
            metrics={metricOptions}
            selectedMetric={selectedMetric}
            onSelectMetric={setSelectedMetric}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <WorldMap
                selectedCountry={selectedCountry}
                selectedMetric={selectedMetric}
                onSelectCountry={setSelectedCountry}
                countryData={countryData || []}
              />
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden h-[500px]">
              <CountryDetail country={selectedCountry} />
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 border shadow-sm text-sm">
            <h3 className="font-medium mb-2">About this tool</h3>
            <p className="text-muted-foreground">
              The Global Trade Mapper Explorer provides interactive visualization of international trade data, 
              economic indicators, and trade policy information. Select different metrics to view on the map, 
              and click on countries to see detailed information. Data shown is for demonstration purposes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
