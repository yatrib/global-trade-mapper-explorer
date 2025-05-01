
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { CountryData } from '@/data/types';

export function useCountryData() {
  return useQuery({
    queryKey: ['countries'],
    queryFn: async () => {
      console.log('Fetching country data from Supabase...');
      
      try {
        // Get countries data from Supabase, using Type instead of region
        const { data: countries, error: countriesError } = await supabase
          .from('countries')
          .select(`
            id,
            name,
            Type,
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
          throw new Error(`Failed to fetch countries: ${countriesError.message}`);
        }

        if (!countries || countries.length === 0) {
          console.warn('No countries found in database');
          return [];
        }

        console.log('Countries fetched successfully:', countries.length);
        console.log('Sample country data:', countries[0]);
        
        // Map the database result to our CountryData type, using Type as region
        const mappedCountries = countries.map(country => {
          console.log(`Mapping country: ${country.name} (${country.id})`);
          
          // Ensure numeric values are properly parsed
          const tradeBalance = parseFloat(country.us_trade_data?.[0]?.trade_balance) || 0;
          const shareOfImports = parseFloat(country.us_trade_data?.[0]?.share_of_imports) || 0;
          const shareOfExports = parseFloat(country.us_trade_data?.[0]?.share_of_exports) || 0;
          const reciprocalTariff = parseFloat(country.us_trade_data?.[0]?.reciprocal_tariff) || 0;
          const tariffsToUS = parseFloat(country.us_trade_data?.[0]?.tariffs_to_us) || 0;
          const actual2023 = parseFloat(country.country_gdp?.[0]?.actual_2023) || 0;
          const estimate2024 = parseFloat(country.country_gdp?.[0]?.estimate_2024) || 0;
          
          console.log(`Country ${country.name} tariffs: ${tariffsToUS}, reciprocal: ${reciprocalTariff}`);
          
          return {
            id: country.id,
            name: country.name,
            region: country.Type || 'Unknown', // Use Type as region with fallback
            area: 0, // Since area isn't present in the schema, set a default value
            gdp: {
              actual2023: actual2023,
              estimate2024: estimate2024,
            },
            usTradeBalance: tradeBalance,
            shareOfUsImports: shareOfImports,
            shareOfUsExports: shareOfExports,
            reciprocalTariff: reciprocalTariff,
            tariffsToUS: tariffsToUS,
            impactedSectors: country.country_sectors?.map(s => s.sector_name) || [],
            keyInsights: country.country_insights?.map(i => i.insight_text) || [],
            nationalReaction: {
              retaliatory: country.national_reactions?.filter((_, index) => index % 2 === 0).map(r => r.description) || [],
              domesticSupport: country.national_reactions?.filter((_, index) => index % 2 === 1).map(r => r.description) || [],
            }
          } as CountryData;
        });

        console.log(`Successfully mapped ${mappedCountries.length} countries`);
        return mappedCountries;
      } catch (error) {
        console.error('Error in useCountryData hook:', error);
        throw error;
      }
    },
    retry: 2,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
