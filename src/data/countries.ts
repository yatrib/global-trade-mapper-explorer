import { CountryData, MetricOption, MetricType } from './types';

export const countryData: CountryData[] = [
  {
    id: 'cn',
    name: 'China',
    region: 'Asia',
    area: 9706961,
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
    id: 'mx',
    name: 'Mexico',
    region: 'North America',
    area: 1964375,
    gdp: {
      actual2023: 1602,
      estimate2024: 1714,
    },
    usTradeBalance: -152041,
    shareOfUsImports: 13.6,
    shareOfUsExports: 15.8,
    reciprocalTariff: 0,
    tariffsToUS: 0.1,
    impactedSectors: ['Automotive', 'Agricultural Products', 'Electronics'],
    keyInsights: [
      'Key USMCA trade partner',
      'Growing manufacturing base',
      'Strategic nearshoring location'
    ],
    nationalReaction: {
      retaliatory: [],
      domesticSupport: ['Manufacturing investment', 'Export diversification programs']
    }
  },
  {
    id: 'ca',
    name: 'Canada',
    region: 'North America',
    area: 9984670,
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
    id: 'jp',
    name: 'Japan',
    region: 'Asia',
    area: 377975,
    gdp: {
      actual2023: 4194,
      estimate2024: 4407,
    },
    usTradeBalance: -65216,
    shareOfUsImports: 4.8,
    shareOfUsExports: 4.5,
    reciprocalTariff: 0,
    tariffsToUS: 1.2,
    impactedSectors: ['Automotive', 'Electronics', 'Machinery'],
    keyInsights: [
      'High-tech manufacturing partner',
      'Significant mutual investment',
      'Strategic military ally'
    ],
    nationalReaction: {
      retaliatory: [],
      domesticSupport: ['Investment in domestic production']
    }
  },
  {
    id: 'de',
    name: 'Germany',
    region: 'Europe',
    area: 357588,
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
  },
  {
    id: 'vn',
    name: 'Vietnam',
    region: 'Asia',
    area: 331212,
    gdp: {
      actual2023: 429,
      estimate2024: 469,
    },
    usTradeBalance: -107077,
    shareOfUsImports: 4.1,
    shareOfUsExports: 1.2,
    reciprocalTariff: 0,
    tariffsToUS: 7.2,
    impactedSectors: ['Textiles', 'Electronics', 'Furniture'],
    keyInsights: [
      'Rapidly growing trade relationship',
      'Emerging manufacturing hub',
      'Alternative to Chinese manufacturing'
    ],
    nationalReaction: {
      retaliatory: [],
      domesticSupport: ['Export promotion incentives']
    }
  },
  {
    id: 'kr',
    name: 'South Korea',
    region: 'Asia',
    area: 100339,
    gdp: {
      actual2023: 1709,
      estimate2024: 1806,
    },
    usTradeBalance: -33700,
    shareOfUsImports: 3.4,
    shareOfUsExports: 3.3,
    reciprocalTariff: 0,
    tariffsToUS: 3.7,
    impactedSectors: ['Electronics', 'Automotive', 'Telecommunications'],
    keyInsights: [
      'Advanced semiconductor trade',
      'Strong technology partnership',
      'Strategic defense ally'
    ],
    nationalReaction: {
      retaliatory: [],
      domesticSupport: ['Targeted sector investments']
    }
  },
  {
    id: 'in',
    name: 'India',
    region: 'Asia',
    area: 3287263,
    gdp: {
      actual2023: 3534,
      estimate2024: 3954,
    },
    usTradeBalance: -34156,
    shareOfUsImports: 2.9,
    shareOfUsExports: 2.4,
    reciprocalTariff: 12.0,
    tariffsToUS: 14.3,
    impactedSectors: ['Pharmaceuticals', 'IT Services', 'Textiles'],
    keyInsights: [
      'Growing strategic partnership',
      'Strong services trade relationship',
      'Potential alternative to Chinese manufacturing'
    ],
    nationalReaction: {
      retaliatory: ['Targeted tariffs on US goods'],
      domesticSupport: ['Make in India initiatives']
    }
  },
  {
    id: 'tw',
    name: 'Taiwan',
    region: 'Asia',
    area: 36197,
    gdp: {
      actual2023: 751,
      estimate2024: 785,
    },
    usTradeBalance: -24020,
    shareOfUsImports: 2.7,
    shareOfUsExports: 2.2,
    reciprocalTariff: 0,
    tariffsToUS: 1.8,
    impactedSectors: ['Semiconductors', 'Electronics', 'Machinery'],
    keyInsights: [
      'Critical semiconductor supplier',
      'High-tech manufacturing partnership',
      'Strategic Indo-Pacific ally'
    ],
    nationalReaction: {
      retaliatory: [],
      domesticSupport: ['Semiconductor investment initiatives']
    }
  },
  {
    id: 'ie',
    name: 'Ireland',
    region: 'Europe',
    area: 70273,
    gdp: {
      actual2023: 592,
      estimate2024: 615,
    },
    usTradeBalance: -62831,
    shareOfUsImports: 2.6,
    shareOfUsExports: 1.1,
    reciprocalTariff: 0,
    tariffsToUS: 0.9,
    impactedSectors: ['Pharmaceuticals', 'Medical Devices', 'Software'],
    keyInsights: [
      'Major pharmaceutical exporter to US',
      'Tax strategy attracting US multinationals',
      'Gateway to European market'
    ],
    nationalReaction: {
      retaliatory: ['EU coordinated response'],
      domesticSupport: ['Digital and medical tech investments']
    }
  },
  {
    id: 'it',
    name: 'Italy',
    region: 'Europe',
    area: 301336,
    gdp: {
      actual2023: 2169,
      estimate2024: 2197,
    },
    usTradeBalance: -43204,
    shareOfUsImports: 2.5,
    shareOfUsExports: 1.8,
    reciprocalTariff: 0,
    tariffsToUS: 0.9,
    impactedSectors: ['Luxury Goods', 'Machinery', 'Food Products'],
    keyInsights: [
      'High-value manufacturing trade',
      'Luxury goods market',
      'Manufacturing technology partnership'
    ],
    nationalReaction: {
      retaliatory: ['EU coordinated response'],
      domesticSupport: ['Made in Italy promotion']
    }
  },
  {
    id: 'gb',
    name: 'United Kingdom',
    region: 'Europe',
    area: 242495,
    gdp: {
      actual2023: 3068,
      estimate2024: 3193,
    },
    usTradeBalance: -5351,
    shareOfUsImports: 2.4,
    shareOfUsExports: 4.0,
    reciprocalTariff: 0,
    tariffsToUS: 0.8,
    impactedSectors: ['Financial Services', 'Pharmaceuticals', 'Aerospace'],
    keyInsights: [
      'Strong financial services relationship',
      'Significant mutual investment',
      'Post-Brexit trade deal potential'
    ],
    nationalReaction: {
      retaliatory: [],
      domesticSupport: ['Global Britain export strategy']
    }
  },
  {
    id: 'fr',
    name: 'France',
    region: 'Europe',
    area: 551695,
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
    id: 'my',
    name: 'Malaysia',
    region: 'Asia',
    area: 330803,
    gdp: {
      actual2023: 417,
      estimate2024: 450,
    },
    usTradeBalance: -31716,
    shareOfUsImports: 2.0,
    shareOfUsExports: 1.0,
    reciprocalTariff: 0,
    tariffsToUS: 5.8,
    impactedSectors: ['Electronics', 'Palm Oil', 'Rubber Products'],
    keyInsights: [
      'Electronics manufacturing hub',
      'Semiconductor supply chain',
      'Growing technological partnership'
    ],
    nationalReaction: {
      retaliatory: [],
      domesticSupport: ['Industry 4.0 investment programs']
    }
  },
  {
    id: 'th',
    name: 'Thailand',
    region: 'Asia',
    area: 513120,
    gdp: {
      actual2023: 512,
      estimate2024: 538,
    },
    usTradeBalance: -26786,
    shareOfUsImports: 1.8,
    shareOfUsExports: 1.0,
    reciprocalTariff: 0,
    tariffsToUS: 7.1,
    impactedSectors: ['Automotive Parts', 'Electronics', 'Food Products'],
    keyInsights: [
      'Regional manufacturing hub',
      'Strong agricultural exports',
      'Growing tech manufacturing'
    ],
    nationalReaction: {
      retaliatory: [],
      domesticSupport: ['Thailand 4.0 initiatives']
    }
  },
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
      ? `rgba(239, 68, 68, ${Math.min(0.2 + Math.abs(value) / 300000, 0.9)})`
      : `rgba(59, 130, 246, ${Math.min(0.2 + Math.abs(value) / 300000, 0.9)})`;
  }
  
  if (metricId === 'reciprocalTariff' || metricId === 'tariffsToUS') {
    // More intense red for higher tariffs
    return `rgba(239, 68, 68, ${Math.min(0.1 + value / 25, 0.9)})`;
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
  
  const intensity = Math.min(0.1 + value / maxValues[metricId], 0.9);
  return `rgba(14, 116, 144, ${intensity})`; // Teal color
};
