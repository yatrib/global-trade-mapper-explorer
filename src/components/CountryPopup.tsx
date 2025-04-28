
import React from 'react';
import { CountryData } from '@/data/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Lock } from 'lucide-react';
import { formatValue } from '@/lib/utils';

interface CountryPopupProps {
  country: CountryData;
  onShowAllData: () => void;
  isRestricted?: boolean;
}

const CountryPopup: React.FC<CountryPopupProps> = ({ country, onShowAllData, isRestricted }) => {
  if (isRestricted) {
    return (
      <Card className="w-64">
        <CardContent className="p-4">
          <div className="text-center space-y-3">
            <Lock className="h-8 w-8 mx-auto text-muted-foreground" />
            <h3 className="font-semibold">{country.name}</h3>
            <p className="text-sm text-muted-foreground">
              Unlock detailed data for all countries
            </p>
            <Button onClick={onShowAllData} className="w-full">
              Get Full Access
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-72">
      <CardContent className="p-4 space-y-4">
        <h3 className="font-semibold text-lg">{country.name}</h3>
        
        <div className="space-y-2">
          <div>
            <div className="text-sm text-muted-foreground">GDP 2023</div>
            <div className="font-medium">${formatValue(country.gdp.actual2023)}B</div>
          </div>
          
          <div>
            <div className="text-sm text-muted-foreground">US Trade Balance</div>
            <div className="font-medium">${(country.usTradeBalance / 1000).toFixed(1)}B</div>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <div>
              <div className="text-sm text-muted-foreground">Share of Imports</div>
              <div className="font-medium">{country.shareOfUsImports?.toFixed(1) || 'N/A'}%</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Share of Exports</div>
              <div className="font-medium">{country.shareOfUsExports?.toFixed(1) || 'N/A'}%</div>
            </div>
          </div>
        </div>

        <Button onClick={onShowAllData} variant="outline" className="w-full">
          Show All Data <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default CountryPopup;
