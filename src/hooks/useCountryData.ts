
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
        
        // Log a full sample country to inspect data structure and actual values
        if (countries.length > 0) {
          console.log('Full sample country data (raw):', JSON.stringify(countries[0], null, 2));
        }
        
        // Map the database result to our CountryData type, using Type as region
        const mappedCountries = countries.map(country => {
          console.log(`Processing country: ${country.name} (${country.id})`);
          
          // Retrieve numeric values from the data - note they might be strings in the database
          const gdpData = country.country_gdp?.[0] || {};
          const tradeData = country.us_trade_data?.[0] || {};
          
          // Display raw values to debug
          console.log(`Raw GDP data for ${country.name}:`, gdpData);
          console.log(`Raw trade data for ${country.name}:`, tradeData);
          
          // Ensure numeric values are properly parsed - convert string to number, handle null/undefined
          const tradeBalance = tradeData.trade_balance !== null ? Number(tradeData.trade_balance) || 0 : 0;
          const shareOfImports = tradeData.share_of_imports !== null ? Number(tradeData.share_of_imports) || 0 : 0;
          const shareOfExports = tradeData.share_of_exports !== null ? Number(tradeData.share_of_exports) || 0 : 0;
          const reciprocalTariff = tradeData.reciprocal_tariff !== null ? Number(tradeData.reciprocal_tariff) || 0 : 0;
          const tariffsToUS = tradeData.tariffs_to_us !== null ? Number(tradeData.tariffs_to_us) || 0 : 0;
          const actual2023 = gdpData.actual_2023 !== null ? Number(gdpData.actual_2023) || 0 : 0;
          const estimate2024 = gdpData.estimate_2024 !== null ? Number(gdpData.estimate_2024) || 0 : 0;
          
          // Log parsed values for debugging
          console.log(`${country.name} parsed values:`, {
            actual2023,
            estimate2024,
            tradeBalance,
            shareOfImports,
            shareOfExports,
            reciprocalTariff,
            tariffsToUS
          });
          
          return {
            id: country.id,
            name: country.name,
            region: country.Type || 'Unknown', // Use Type as region with fallback
            area: 0, // Since area isn't present in the schema, set a default value
            gdp: {
              actual2023,
              estimate2024,
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
        
        // Log a sample of the processed data
        if (mappedCountries.length > 0) {
          console.log('Sample processed country data:', {
            name: mappedCountries[0].name,
            tariffsToUS: mappedCountries[0].tariffsToUS,
            gdp: mappedCountries[0].gdp
          });
        }
        
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
