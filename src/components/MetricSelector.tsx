
import React from 'react';
import { MetricOption, MetricType } from '../data/types';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface MetricSelectorProps {
  metrics: MetricOption[];
  selectedMetric: MetricType;
  onSelectMetric: (metricId: MetricType) => void;
}

const MetricSelector: React.FC<MetricSelectorProps> = ({ 
  metrics, 
  selectedMetric, 
  onSelectMetric 
}) => {
  return (
    <div className="rounded-lg border bg-card p-4 shadow-sm w-full">
      <h2 className="text-lg font-semibold mb-2">Data Metrics</h2>
      <p className="text-sm text-muted-foreground mb-4">
        Select a metric to view on the map
      </p>
      <Tabs
        defaultValue={selectedMetric}
        value={selectedMetric}
        onValueChange={(value) => onSelectMetric(value as MetricType)}
        className="w-full"
      >
        <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mb-2 h-auto bg-gray-100 p-1">
          {metrics.map((metric) => (
            <TabsTrigger
              key={metric.id}
              value={metric.id}
              className={`px-3 py-1.5 text-xs md:text-sm whitespace-normal text-center h-auto transition-colors ${
                selectedMetric === metric.id 
                ? "bg-infomineo-blue text-white font-medium shadow-md" 
                : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              {metric.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      <div className="mt-2 p-2 bg-gray-50 rounded-md border border-gray-100">
        <p className="text-xs text-muted-foreground">
          {metrics.find(m => m.id === selectedMetric)?.description || 'Select a metric'}
        </p>
      </div>
    </div>
  );
};

export default MetricSelector;
