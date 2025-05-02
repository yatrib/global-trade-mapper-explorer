
import { CountryData } from '@/data/types';

// Type definition for the chart initialization function
export interface AmChartsInstance {
  dispose: () => void;
}

// Type for window with amCharts globals
export interface WindowWithAmCharts extends Window {
  am5?: any;
  am5map?: any;
  am5themes_Animated?: any;
  am5geodata_worldLow?: any;
}

// Export types for metrics and formatting
export type AmChartsMetric = 'tariffsToUS' | 'reciprocalTariff' | 'gdp2023' | 'gdp2024' | 'usTradeBalance';

// Interface for country data mapped for the chart
export interface AmChartsCountryData {
  id: string;
  name: string;
  value: number; // Value used for heat map coloring (always use a default of 0 if null)
  gdp2023: string | null;
  gdp2024: string | null;
  usTradeBalance: string | null;
  shareOfUsImports: string | null;
  shareOfUsExports: string | null;
  tariffsToUS: string | null;
  reciprocalTariff: string | null;
  countryObject: CountryData;
}
