import { useState, useEffect } from 'react';
import { CountryData } from '@/data/types';

const DATA_URL = 'https://raw.githubusercontent.com/infomineo/dataset-visualizations/main/trade-insights/data/data.json';

const useCountryData = () => {
  const [countryData, setCountryData] = useState<CountryData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(DATA_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const rawData = await response.json();
        const transformedData = transformData(rawData);
        setCountryData(transformedData);
      } catch (e: any) {
        setError(`Failed to fetch data: ${e.message}`);
        console.error("Error fetching country data:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Transform the raw data into our application's format
  const transformData = (rawData: any[]): CountryData[] => {
    if (!rawData || !Array.isArray(rawData)) {
      console.error('Invalid data format received:', rawData);
      return [];
    }

    return rawData.map(country => {
      try {
        // Extract nested data
        const gdpData = country.country_gdp?.[0] || {};
        const tradeData = country.us_trade_data?.[0] || {};
        
        // Safe parsing functions to handle different data types and potential null values
        const safeParseNumber = (value: any): number | null => {
          if (value === null || value === undefined) return null;
          const parsed = Number(value);
          return isNaN(parsed) ? null : parsed;
        };
        
        // Parse all numeric values
        const actual2023 = safeParseNumber(gdpData?.gdp_2023);
        const estimate2024 = safeParseNumber(gdpData?.gdp_2024_estimate);
        const tradeBalance = safeParseNumber(tradeData?.trade_balance);
        const shareOfImports = safeParseNumber(tradeData?.share_of_us_imports);
        const shareOfExports = safeParseNumber(tradeData?.share_of_us_exports);
        const reciprocalTariff = safeParseNumber(tradeData?.reciprocal_tariff);
        const tariffsToUS = safeParseNumber(tradeData?.tariffs_to_us);
        
        if (country.id === 'CA') {
          console.log(`Parsed values for Canada:`, {
            actual2023,
            estimate2024,
            tradeBalance,
            shareOfImports,
            shareOfExports,
            reciprocalTariff,
            tariffsToUS,
            gdpData,
            tradeData
          });
        }
        
        return {
          id: country.id,
          name: country.name,
          region: country.Type || 'Unknown', // Keep the region field
          reciprocalTariff: reciprocalTariff,
          tariffsToUS: tariffsToUS,
          gdp: {
            actual2023,
            estimate2024,
          },
          usTradeBalance: tradeBalance,
          shareOfUsImports: shareOfImports,
          shareOfUsExports: shareOfExports,
          impactedSectors: country.country_sectors?.map(s => s.sector_name) || [],
          keyInsights: country.country_insights?.map(i => i.insight_text) || [],
          nationalReaction: {
            retaliatory: country.country_reactions?.filter(r => r.reaction_type === 'Retaliatory').map(r => r.reaction_text) || [],
            domesticSupport: country.country_reactions?.filter(r => r.reaction_type === 'Domestic Support').map(r => r.reaction_text) || []
          }
        };
      } catch (error) {
        console.error(`Error transforming data for country ${country.name}:`, error);
        return null;
      }
    }).filter(Boolean) as CountryData[];
  };

  return { countryData, loading, error };
};

export default useCountryData;
