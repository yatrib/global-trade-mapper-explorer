
import React from 'react';
import { CountryData } from '../data/types';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import StatCard from './StatCard';
import { Globe, Flag, ExternalLink, TrendingUp } from 'lucide-react';

interface CountryDetailProps {
  country: CountryData | null;
}

const CountryDetail: React.FC<CountryDetailProps> = ({ country }) => {
  if (!country) {
    return (
      <div className="h-full flex items-center justify-center p-6 text-center">
        <div>
          <Globe className="h-12 w-12 mx-auto mb-3 text-gray-400" strokeWidth={1.5} />
          <h3 className="text-lg font-semibold mb-2">Select a Country</h3>
          <p className="text-sm text-gray-500">
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
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <Flag className="h-5 w-5 text-infomineo-blue" strokeWidth={1.5} />
          <h2 className="text-2xl font-bold">{country.name}</h2>
        </div>
        
        <div className="flex gap-2 mb-5">
          <Badge variant="outline" className="bg-gray-50 border-transparent text-gray-600">
            {country.region}
          </Badge>
          <Badge variant="outline" className="bg-gray-50 border-transparent text-gray-600">
            Area: {country.area.toLocaleString()} km²
          </Badge>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
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
        
        <Separator className="my-6 bg-gray-100" />
        
        <div className="space-y-5">
          <div className="bg-gray-50 p-5 rounded-xl">
            <h3 className="text-base font-semibold flex items-center gap-2 mb-3 text-gray-800">
              <TrendingUp className="h-4 w-4 text-infomineo-light" strokeWidth={1.5} />
              Most Impacted Sectors
            </h3>
            <div className="flex flex-wrap gap-2">
              {country.impactedSectors.map((sector, idx) => (
                <Badge key={idx} variant="outline" className="bg-white border-gray-100 text-gray-700">
                  {sector}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="bg-gray-50 p-5 rounded-xl">
            <h3 className="text-base font-semibold flex items-center gap-2 mb-3 text-gray-800">
              <ExternalLink className="h-4 w-4 text-infomineo-light" strokeWidth={1.5} />
              Key Insights
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              {country.keyInsights.map((insight, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-infomineo-blue font-bold mt-1">•</span>
                  <span>{insight}</span>
                </li>
              ))}
            </ul>
          </div>
        
          <div className="bg-gray-50 p-5 rounded-xl">
            <h3 className="text-base font-semibold mb-3 text-gray-800">National Reaction</h3>
            {country.nationalReaction.retaliatory.length > 0 && (
              <div className="mb-4">
                <h4 className="text-xs font-medium mb-2 text-infomineo-red">
                  Retaliatory Measures
                </h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  {country.nationalReaction.retaliatory.map((measure, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-infomineo-red font-bold mt-1">•</span>
                      <span>{measure}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {country.nationalReaction.domesticSupport.length > 0 && (
              <div>
                <h4 className="text-xs font-medium mb-2 text-infomineo-blue">
                  Domestic Support
                </h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  {country.nationalReaction.domesticSupport.map((support, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-infomineo-blue font-bold mt-1">•</span>
                      <span>{support}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetail;
