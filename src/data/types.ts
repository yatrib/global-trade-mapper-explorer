
export interface CountryData {
  id: string;
  name: string;
  gdp: {
    actual2023: number | null;
    estimate2024: number | null;
  };
  usTradeBalance: number | null;
  shareOfUsImports: number | null;
  shareOfUsExports: number | null;
  reciprocalTariff: number | null;
  tariffsToUS: number | null;
  impactedSectors: string[];
  keyInsights: string[];
  nationalReaction: {
    retaliatory: string[];
    domesticSupport: string[];
  };
}

export interface MapRegion {
  name: string;
  countries: CountryData[];
}

export type MetricType = 
  | 'gdp2023' 
  | 'gdp2024' 
  | 'usTradeBalance'
  | 'shareOfUsImports'
  | 'shareOfUsExports'
  | 'reciprocalTariff'
  | 'tariffsToUS';

export interface MetricOption {
  id: MetricType;
  label: string;
  description: string;
  formatter: (value: number | null) => string;
}

export type CountryCode = 'FR' | 'RU' | 'CA' | 'CN' | 'DE';
