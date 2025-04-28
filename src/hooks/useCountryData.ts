
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { CountryData } from '@/data/types';

export function useCountryData() {
  return useQuery({
    queryKey: ['countries'],
    queryFn: async () => {
      const { data: countries, error: countriesError } = await supabase
        .from('countries')
        .select(`
          id,
          name,
          region,
          area,
          country_gdp (
            actual_2023,
            estimate_2024
          ),
          us_trade_data (
            trade_balance,
            share_of_imports,
            share_of_exports,
            reciprocal_tariff,
            tariffs_to_us
          ),
          country_sectors (
            sector_name
          ),
          country_insights (
            insight_text
          ),
          national_reactions (
            description
          )
        `);

      if (countriesError) throw countriesError;

      return countries.map(country => ({
        id: country.id,
        name: country.name,
        region: country.region,
        area: country.area,
        gdp2023: country.country_gdp?.[0]?.actual_2023 || 0,
        gdp2024: country.country_gdp?.[0]?.estimate_2024 || 0,
        tradeBalance: country.us_trade_data?.[0]?.trade_balance || 0,
        shareOfImports: country.us_trade_data?.[0]?.share_of_imports || 0,
        shareOfExports: country.us_trade_data?.[0]?.share_of_exports || 0,
        reciprocalTariff: country.us_trade_data?.[0]?.reciprocal_tariff || 0,
        tariffsToUS: country.us_trade_data?.[0]?.tariffs_to_us || 0,
        sectors: country.country_sectors?.map(s => s.sector_name) || [],
        insights: country.country_insights?.map(i => i.insight_text) || [],
        reactions: country.national_reactions?.map(r => ({
          type: 'general',
          description: r.description
        })) || []
      })) satisfies CountryData[];
    }
  });
}
