
import React from 'react';
import { CountryData } from '@/data/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Lock, X } from 'lucide-react';
import { formatValue } from '@/lib/utils';

interface CountryPopupProps {
  country: CountryData;
  onShowAllData: () => void;
  onClose: () => void;
  isRestricted?: boolean;
}

const CountryPopup: React.FC<CountryPopupProps> = ({ 
  country, 
  onShowAllData, 
  onClose, 
  isRestricted 
}) => {
  if (isRestricted) {
    return (
      <Card className="w-64 relative">
        <button 
          onClick={onClose} 
          className="absolute right-2 top-2 p-1 rounded-full hover:bg-muted"
          aria-label="Close popup"
        >
          <X className="h-4 w-4 text-muted-foreground" />
        </button>
        <CardContent className="p-4 pt-6">
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
    <Card className="w-64 relative">
      <button 
        onClick={onClose} 
        className="absolute right-2 top-2 p-1 rounded-full hover:bg-muted"
        aria-label="Close popup"
      >
        <X className="h-4 w-4 text-muted-foreground" />
      </button>
      <CardContent className="p-4 pt-6 space-y-3">
        <h3 className="font-semibold text-lg">{country.name}</h3>
        
        <div className="space-y-2">
          <div>
            <div className="text-sm text-muted-foreground">GDP 2023</div>
            <div className="font-medium">${formatValue(country.gdp.actual2023)}B</div>
          </div>
          
          <div>
            <div className="text-sm text-muted-foreground">GDP 2024 (Est.)</div>
            <div className="font-medium">${formatValue(country.gdp.estimate2024)}B</div>
          </div>
          
          <div>
            <div className="text-sm text-muted-foreground">US Trade Balance</div>
            <div className="font-medium">${(country.usTradeBalance / 1000).toFixed(1)}B</div>
          </div>
          
          <div>
            <div className="text-sm text-muted-foreground">Region</div>
            <div className="font-medium">{country.region || 'N/A'}</div>
          </div>
        </div>

        <Button onClick={onShowAllData} variant="outline" className="w-full mt-2">
          Show All Data <ArrowRight className="ml-1 h-3 w-3" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default CountryPopup;
