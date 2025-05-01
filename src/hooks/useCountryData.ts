
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { CountryData } from '@/data/types';

export function useCountryData() {
  return useQuery({
    queryKey: ['countries'],
    queryFn: async () => {
      // Get countries data from Supabase
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

      if (countriesError) {
        console.error('Error fetching countries:', countriesError);
        throw countriesError;
      }

      if (!countries || countries.length === 0) {
        console.warn('No countries found in database');
        return [];
      }

      console.log('Countries from DB:', countries);

      // Map the database result to our CountryData type
      const mappedCountries = countries.map(country => ({
        id: country.id,
        name: country.name,
        region: country.region,
        area: country.area,
        gdp: {
          actual2023: country.country_gdp?.[0]?.actual_2023 || 0,
          estimate2024: country.country_gdp?.[0]?.estimate_2024 || 0,
        },
        usTradeBalance: country.us_trade_data?.[0]?.trade_balance || 0,
        shareOfUsImports: country.us_trade_data?.[0]?.share_of_imports || null,
        shareOfUsExports: country.us_trade_data?.[0]?.share_of_exports || null,
        reciprocalTariff: country.us_trade_data?.[0]?.reciprocal_tariff || null,
        tariffsToUS: country.us_trade_data?.[0]?.tariffs_to_us || null,
        impactedSectors: country.country_sectors?.map(s => s.sector_name) || [],
        keyInsights: country.country_insights?.map(i => i.insight_text) || [],
        nationalReaction: {
          retaliatory: country.national_reactions?.filter((_, index) => index % 2 === 0).map(r => r.description) || [],
          domesticSupport: country.national_reactions?.filter((_, index) => index % 2 === 1).map(r => r.description) || [],
        }
      })) as CountryData[];

      console.log('Mapped countries:', mappedCountries);
      return mappedCountries;
    },
    retry: 1,
    refetchOnWindowFocus: false,
  });
}
