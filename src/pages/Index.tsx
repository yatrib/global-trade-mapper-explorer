
import React, { useState } from 'react';
import { CountryData, MetricType } from '@/data/types';
import WorldMap from '@/components/WorldMap';
import { Badge } from '@/components/ui/badge';
import { Globe, Info, BarChart2, LineChart, Lock } from 'lucide-react';
import { useCountryData } from '@/hooks/useCountryData';
import { metricOptions } from '@/data/countries';
import { DownloadReportForm } from '@/components/DownloadReportForm';
import { Card, CardContent } from '@/components/ui/card';

const Index: React.FC = () => {
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
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-6">
                  Understand Global Trade Dynamics
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Access comprehensive analysis of international trade relationships, 
                  economic indicators, and policy impacts across major economies.
                </p>
                <div className="flex gap-4 mb-8">
                  <div className="flex items-center gap-2">
                    <BarChart2 className="h-5 w-5 text-cyan-700" />
                    <span>200+ Economic Indicators</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <LineChart className="h-5 w-5 text-cyan-700" />
                    <span>Real-time Updates</span>
                  </div>
                </div>
                <Card className="bg-white/50 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Get the Full Report</h3>
                    <DownloadReportForm />
                  </CardContent>
                </Card>
              </div>

              <div className="relative">
                <div className="aspect-[4/3] rounded-lg overflow-hidden border shadow-lg">
                  <WorldMap
                    selectedCountry={null}
                    selectedMetric={selectedMetric}
                    onSelectCountry={() => {}}
                    countryData={countryData || []}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent flex items-end justify-center pb-8">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                      <Lock className="h-4 w-4" />
                      <span>Full access with report download</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white border-t">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-12">What's Included in the Report</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Trade Analysis",
                  description: "Comprehensive analysis of bilateral trade relationships and trends"
                },
                {
                  title: "Economic Indicators",
                  description: "Key metrics including GDP, trade balance, and sector performance"
                },
                {
                  title: "Policy Insights",
                  description: "Expert analysis of trade policies and their economic impact"
                }
              ].map((feature, index) => (
                <Card key={index} className="text-center p-6">
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
