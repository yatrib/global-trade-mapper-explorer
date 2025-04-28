
import React, { useState } from 'react';
import { CountryData, MetricType } from '@/data/types';
import WorldMap from '@/components/WorldMap';
import { Badge } from '@/components/ui/badge';
import { Globe, Info, BarChart2, LineChart } from 'lucide-react';
import { useCountryData } from '@/hooks/useCountryData';
import { metricOptions } from '@/data/countries';
import { DownloadReportForm } from '@/components/DownloadReportForm';
import { Card, CardContent } from '@/components/ui/card';

const FREE_COUNTRY_LIMIT = 5;

const Index: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = useState<MetricType>('gdp2023');
  const { data: countryData, isLoading, error } = useCountryData();

  // Limit countries shown to first 5 for free users
  const visibleCountries = countryData?.slice(0, FREE_COUNTRY_LIMIT) || [];
  const hiddenCountries = countryData?.slice(FREE_COUNTRY_LIMIT) || [];

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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <header className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Globe className="h-6 w-6 text-cyan-700" />
              <h1 className="text-xl font-bold">Global Trade Mapper</h1>
            </div>
            <Badge variant="outline" className="text-xs px-2 py-0.5 bg-amber-50 text-amber-700">
              Latest Data: Feb 2025
            </Badge>
          </div>
        </div>
      </header>

      <main>
        {/* Full-width map section */}
        <section className="relative w-full">
          <div className="h-[70vh] w-full">
            <WorldMap
              selectedCountry={null}
              selectedMetric={selectedMetric}
              onSelectCountry={() => {}}
              countryData={visibleCountries}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent flex items-end justify-center pb-8">
            <div className="text-center max-w-md mx-auto p-4 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg">
              <p className="text-sm font-medium text-muted-foreground mb-2">
                {FREE_COUNTRY_LIMIT} countries available in free version. Unlock {hiddenCountries.length} more countries with full access.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section below map */}
        <section className="py-16 bg-white border-t">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">
                  Get Full Access to Global Trade Data
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Download our comprehensive report to access detailed trade analysis for all countries, 
                  including economic indicators and policy insights.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 items-start">
                <div className="space-y-6">
                  <div className="flex items-start gap-3">
                    <BarChart2 className="h-6 w-6 text-cyan-700 mt-1" />
                    <div>
                      <h3 className="font-semibold">Complete Dataset</h3>
                      <p className="text-muted-foreground">Access data for all {countryData?.length} countries</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <LineChart className="h-6 w-6 text-cyan-700 mt-1" />
                    <div>
                      <h3 className="font-semibold">Detailed Analytics</h3>
                      <p className="text-muted-foreground">In-depth trade balance and sector analysis</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Info className="h-6 w-6 text-cyan-700 mt-1" />
                    <div>
                      <h3 className="font-semibold">Expert Insights</h3>
                      <p className="text-muted-foreground">Policy implications and future predictions</p>
                    </div>
                  </div>
                </div>

                <Card>
                  <CardContent className="p-6">
                    <DownloadReportForm />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
