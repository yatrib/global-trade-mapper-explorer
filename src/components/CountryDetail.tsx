
import React from 'react';
import { CountryData } from '../data/types';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import StatCard from './StatCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Globe, Flag, ExternalLink, TrendingUp, TrendingDown } from 'lucide-react';

interface CountryDetailProps {
  country: CountryData | null;
}

const CountryDetail: React.FC<CountryDetailProps> = ({ country }) => {
  if (!country) {
    return (
      <div className="h-full flex items-center justify-center p-6 text-center">
        <div>
          <Globe className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">Select a Country</h3>
          <p className="text-sm text-muted-foreground">
            Click on a country on the map to view detailed information
          </p>
        </div>
      </div>
    );
  }

  const gdpGrowth = ((country.gdp.estimate2024 - country.gdp.actual2023) / country.gdp.actual2023) * 100;
  const gdpTrend = gdpGrowth >= 0 ? 'up' : 'down';
  const gdpHelp = `${gdpGrowth.toFixed(1)}% from 2023`;

  return (
    <div className="overflow-y-auto h-full">
      <div className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <Flag className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-bold">{country.name}</h2>
        </div>
        
        <div className="flex gap-1 mb-4">
          <Badge variant="outline" className="bg-muted">
            {country.region}
          </Badge>
          <Badge variant="outline" className="bg-muted">
            Area: {country.area.toLocaleString()} km²
          </Badge>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
          <StatCard 
            title="GDP 2023 (Actual)" 
            value={country.gdp.actual2023} 
            formatter={(val) => `$${val.toLocaleString()} Bn`}
          />
          <StatCard 
            title="GDP 2024 (Estimate)" 
            value={country.gdp.estimate2024}
            trend={gdpTrend}
            helpText={gdpHelp}
            formatter={(val) => `$${val.toLocaleString()} Bn`}
          />
          <StatCard 
            title="US Trade Balance" 
            value={country.usTradeBalance} 
            trend={country.usTradeBalance >= 0 ? 'up' : 'down'}
            helpText="Annual 2024"
            formatter={(val) => `$${(val / 1000).toFixed(1)} Bn`}
            className="md:col-span-2"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
          <StatCard 
            title="Share of US Imports" 
            value={country.shareOfUsImports} 
            formatter={(val) => `${val.toFixed(1)}%`}
          />
          <StatCard 
            title="Share of US Exports" 
            value={country.shareOfUsExports} 
            formatter={(val) => `${val.toFixed(1)}%`}
          />
          <StatCard 
            title="US Reciprocal Tariff" 
            value={country.reciprocalTariff} 
            formatter={(val) => `${val.toFixed(1)}%`}
          />
          <StatCard 
            title="Tariffs to US" 
            value={country.tariffsToUS} 
            formatter={(val) => `${val.toFixed(1)}%`}
          />
        </div>
        
        <Separator className="my-4" />
        
        <div className="grid grid-cols-1 gap-4 mb-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Most Impacted Sectors
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {country.impactedSectors.map((sector, idx) => (
                  <Badge key={idx} variant="secondary">
                    {sector}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <ExternalLink className="h-4 w-4" />
                Key Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                {country.keyInsights.map((insight, idx) => (
                  <li key={idx}>{insight}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">National Reaction</CardTitle>
          </CardHeader>
          <CardContent>
            {country.nationalReaction.retaliatory.length > 0 && (
              <div className="mb-3">
                <h4 className="text-xs font-semibold mb-1 text-destructive">
                  Retaliatory Measures
                </h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  {country.nationalReaction.retaliatory.map((measure, idx) => (
                    <li key={idx}>{measure}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {country.nationalReaction.domesticSupport.length > 0 && (
              <div>
                <h4 className="text-xs font-semibold mb-1 text-primary">
                  Domestic Support
                </h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  {country.nationalReaction.domesticSupport.map((support, idx) => (
                    <li key={idx}>{support}</li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CountryDetail;
