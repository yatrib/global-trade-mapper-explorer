
import { CountryData } from '@/data/types';

export interface WindowWithAmCharts extends Window {
  am5: any;
  am5map: any;
  am5themes_Animated: any;
  am5geodata_worldLow: any;
}

export interface AmChartsCountryData {
  id: string;
  name: string;
  value: number;
  gdp2023: string | null;
  gdp2024: string | null;
  usTradeBalance: string | null;
  shareOfUsImports: string | null;
  shareOfUsExports: string | null;
  tariffsToUS: string | null;
  reciprocalTariff: string | null;
  countryObject: CountryData;
  region?: string; // Include region for filtering
}

export interface AmChartsInstance {
  dispose: () => void;
}

export type AmChartsMetric = 'gdp' | 'tradeBalance' | 'tariff';
