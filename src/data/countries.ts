import { CountryData, MetricOption, MetricType } from './types';

export const countryData: CountryData[] = [
  {
    id: 'CN',
    name: 'China',
    region: 'Asia',
    gdp: {
      actual2023: 17680,
      estimate2024: 19220,
    },
    usTradeBalance: -285469,
    shareOfUsImports: 14.2,
    shareOfUsExports: 7.1,
    reciprocalTariff: 25.0,
    tariffsToUS: 19.0,
    impactedSectors: ['Electronics', 'Manufacturing', 'Textiles'],
    keyInsights: [
      'Largest trade deficit for US',
      'Critical supply chain for electronics and consumer goods',
      'Complex trade relationship affected by geopolitical tensions'
    ],
    nationalReaction: {
      retaliatory: ['Matched tariffs on US goods', 'Reduced agricultural imports'],
      domesticSupport: ['Manufacturing subsidies', 'Domestic market expansion']
    }
  },
  {
    id: 'FR',
    name: 'France',
    region: 'Europe',
    gdp: {
      actual2023: 2923,
      estimate2024: 3017,
    },
    usTradeBalance: -21406,
    shareOfUsImports: 2.2,
    shareOfUsExports: 2.1,
    reciprocalTariff: 0,
    tariffsToUS: 0.9,
    impactedSectors: ['Aerospace', 'Luxury Goods', 'Beverages'],
    keyInsights: [
      'Defense and aerospace collaboration',
      'Luxury goods market',
      'Agricultural trade tensions'
    ],
    nationalReaction: {
      retaliatory: ['EU coordinated response'],
      domesticSupport: ['Export promotion strategy']
    }
  },
  {
    id: 'RU',
    name: 'Russia',
    region: 'Eurasia',
    gdp: {
      actual2023: 1862,
      estimate2024: 1915,
    },
    usTradeBalance: -12450,
    shareOfUsImports: 0.4,
    shareOfUsExports: 0.3,
    reciprocalTariff: 20.0,
    tariffsToUS: 15.0,
    impactedSectors: ['Energy', 'Metals', 'Defense'],
    keyInsights: [
      'Limited trade due to sanctions',
      'Energy market impacts',
      'Geopolitical tensions'
    ],
    nationalReaction: {
      retaliatory: ['Import substitution', 'Trade restrictions'],
      domesticSupport: ['State industry support']
    }
  },
  {
    id: 'CA',
    name: 'Canada',
    region: 'North America',
    gdp: {
      actual2023: 2107,
      estimate2024: 2221,
    },
    usTradeBalance: -60801,
    shareOfUsImports: 11.8,
    shareOfUsExports: 16.9,
    reciprocalTariff: 0,
    tariffsToUS: 0.2,
    impactedSectors: ['Energy', 'Automotive', 'Timber'],
    keyInsights: [
      'Largest bilateral trading relationship',
      'Integrated supply chains',
      'Strong energy partnership'
    ],
    nationalReaction: {
      retaliatory: [],
      domesticSupport: ['Trade diversification strategy']
    }
  },
  {
    id: 'DE',
    name: 'Germany',
    region: 'Europe',
    gdp: {
      actual2023: 4456,
      estimate2024: 4512,
    },
    usTradeBalance: -72516,
    shareOfUsImports: 4.6,
    shareOfUsExports: 3.5,
    reciprocalTariff: 0,
    tariffsToUS: 0.9,
    impactedSectors: ['Automotive', 'Industrial Equipment', 'Pharmaceuticals'],
    keyInsights: [
      'Largest EU trading partner',
      'Advanced manufacturing relationship',
      'Mutual high-tech investment'
    ],
    nationalReaction: {
      retaliatory: ['EU coordinated response'],
      domesticSupport: ['Industrial strategy 2030']
    }
  }
];

export const metricOptions: MetricOption[] = [
  {
    id: 'gdp2023',
    label: 'GDP 2023 (Actual)',
    description: 'Gross Domestic Product for 2023 in billions USD',
    formatter: (value) => value !== null ? `$${value.toLocaleString()} Bn` : 'N/A'
  },
  {
    id: 'gdp2024',
    label: 'GDP 2024 (Estimate)',
    description: 'Estimated Gross Domestic Product for 2024 in billions USD',
    formatter: (value) => value !== null ? `$${value.toLocaleString()} Bn` : 'N/A'
  },
  {
    id: 'usTradeBalance',
    label: 'US Trade Balance 2024',
    description: 'US Trade Balance for Goods & Services in USD millions (2024)',
    formatter: (value) => value !== null ? `$${(value / 1000).toLocaleString()} Bn` : 'N/A'
  },
  {
    id: 'shareOfUsImports',
    label: 'Share of US Imports',
    description: 'Share of US Imports in Feb 2025 (Top 15 Countries)',
    formatter: (value) => value !== null ? `${value.toLocaleString()}%` : 'N/A'
  },
  {
    id: 'shareOfUsExports',
    label: 'Share of US Exports',
    description: 'Share of US Exports in Feb 2025 (Top 15 Countries)',
    formatter: (value) => value !== null ? `${value.toLocaleString()}%` : 'N/A'
  },
  {
    id: 'reciprocalTariff',
    label: 'US Reciprocal Tariff',
    description: 'New US Reciprocal Tariff rates',
    formatter: (value) => value !== null ? `${value.toLocaleString()}%` : 'N/A'
  },
  {
    id: 'tariffsToUS',
    label: 'Tariffs to US',
    description: 'Tariffs charged to the United States',
    formatter: (value) => value !== null ? `${value.toLocaleString()}%` : 'N/A'
  }
];

export const getMetricValue = (country: CountryData, metricId: MetricType): number | null => {
  switch (metricId) {
    case 'gdp2023':
      return country.gdp.actual2023;
    case 'gdp2024':
      return country.gdp.estimate2024;
    case 'usTradeBalance':
      return country.usTradeBalance;
    case 'shareOfUsImports':
      return country.shareOfUsImports;
    case 'shareOfUsExports':
      return country.shareOfUsExports;
    case 'reciprocalTariff':
      return country.reciprocalTariff;
    case 'tariffsToUS':
      return country.tariffsToUS;
    default:
      return null;
  }
};

export const getCountryColor = (country: CountryData, metricId: MetricType): string => {
  const value = getMetricValue(country, metricId);
  
  if (value === null) {
    return '#e0e0e0'; // Gray for no data
  }
  
  if (metricId === 'usTradeBalance') {
    // Red for negative trade balance, blue for positive
    return value < 0 
      ? `rgba(239, 68, 68, ${Math.min(0.2 + Math.abs(value) / 300000, 0.8)})`
      : `rgba(59, 130, 246, ${Math.min(0.2 + Math.abs(value) / 300000, 0.8)})`;
  }
  
  // Default intensity scale for other metrics
  const maxValues: Record<MetricType, number> = {
    gdp2023: 18000,
    gdp2024: 20000,
    usTradeBalance: 300000,
    shareOfUsImports: 15,
    shareOfUsExports: 17,
    reciprocalTariff: 25,
    tariffsToUS: 20
  };
  
  const intensity = Math.min(0.2 + value / maxValues[metricId], 0.8);
  return `rgba(14, 116, 144, ${intensity})`; // Teal color
};
