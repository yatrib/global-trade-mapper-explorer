
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CountryData } from '@/data/types';

interface CountryTypeFilterProps {
  countryData: CountryData[];
  selectedType: string | null;
  onSelectType: (type: string | null) => void;
}

const CountryTypeFilter: React.FC<CountryTypeFilterProps> = ({ 
  countryData,
  selectedType,
  onSelectType
}) => {
  // Get unique country types from the data
  const countryTypes = React.useMemo(() => {
    const types = new Set<string>();
    countryData.forEach(country => {
      if (country.region) {
        types.add(country.region);
      }
    });
    return Array.from(types).sort();
  }, [countryData]);
  
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium">Filter by type:</span>
      <Select
        value={selectedType || ""}
        onValueChange={(value) => onSelectType(value || null)}
      >
        <SelectTrigger className="w-[180px] h-9">
          <SelectValue placeholder="All Countries" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">All Countries</SelectItem>
          {countryTypes.map((type) => (
            <SelectItem key={type} value={type}>
              {type}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CountryTypeFilter;
