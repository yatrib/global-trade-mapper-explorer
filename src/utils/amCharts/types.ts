
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
  value?: number; // Value used for heat map coloring
  gdp2023: number | null;
  gdp2024: number | null;
  usTradeBalance: number | null;
  shareOfUsImports: number | null;
  shareOfUsExports: number | null;
  tariffsToUS: number | null;
  reciprocalTariff: number | null;
  countryObject: CountryData;
}
