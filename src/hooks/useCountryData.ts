
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
        
        // Log a sample country to inspect the full structure of the data
        if (countries.length > 0) {
          console.log('Sample country data structure (first record):', JSON.stringify(countries[0], null, 2));
          
          // Debug - check if Canada exists in database results
          const canada = countries.find(c => c.id === "CA");
          if (canada) {
            console.log("Canada found in database results:", canada);
          } else {
            console.warn("Canada NOT found in database results!");
          }
        }
        
        // Map the database result to our CountryData type, using Type as region
        const mappedCountries = countries
          .filter(country => country !== null) // Filter out any null country records
          .map(country => {
            // Extract data from nested arrays properly
            const gdpData = country.country_gdp?.[0] || {};
            const tradeData = country.us_trade_data?.[0] || {};
            
            // Log the raw nested data for verification
            console.log(`Raw data for ${country.name}:`, {
              gdp: gdpData,
              trade: tradeData
            });
            
            // Safe parsing functions to handle different data types and potential null values
            const safeParseNumber = (value: any): number | null => {
              if (value === null || value === undefined) return null;
              // Convert to string first to handle any data type, then parse
              const numValue = parseFloat(String(value).replace(/,/g, ''));
              return isNaN(numValue) ? null : numValue;
            };
            
            // Extract and parse numeric values
            const actual2023 = safeParseNumber(gdpData?.actual_2023);
            const estimate2024 = safeParseNumber(gdpData?.estimate_2024);
            const tradeBalance = safeParseNumber(tradeData?.trade_balance);
            const shareOfImports = safeParseNumber(tradeData?.share_of_imports);
            const shareOfExports = safeParseNumber(tradeData?.share_of_exports);
            const reciprocalTariff = safeParseNumber(tradeData?.reciprocal_tariff);
            const tariffsToUS = safeParseNumber(tradeData?.tariffs_to_us);
            
            // Log the parsed values for verification
            console.log(`Parsed values for ${country.name}:`, {
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
              region: country.Type || 'Unknown',
              area: 0, // Since area isn't present in the schema
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
                retaliatory: country.national_reactions?.filter((r, index) => r && index % 2 === 0).map(r => r?.description).filter(Boolean) || [],
                domesticSupport: country.national_reactions?.filter((r, index) => r && index % 2 === 1).map(r => r?.description).filter(Boolean) || [],
              }
            } as CountryData;
          });

        // Log a sample of processed data for final verification
        if (mappedCountries.length > 0) {
          console.log('Final processed country data (first record):', {
            id: mappedCountries[0].id,
            name: mappedCountries[0].name,
            gdp: mappedCountries[0].gdp,
            usTradeBalance: mappedCountries[0].usTradeBalance,
            tariffsToUS: mappedCountries[0].tariffsToUS,
            reciprocalTariff: mappedCountries[0].reciprocalTariff,
          });
          
          // Debug - check if Canada exists in mapped countries
          const canada = mappedCountries.find(c => c.id === "CA");
          if (canada) {
            console.log("Canada found in mapped countries:", {
              id: canada.id,
              name: canada.name,
              gdp: canada.gdp,
              usTradeBalance: canada.usTradeBalance,
              tariffsToUS: canada.tariffsToUS,
              reciprocalTariff: canada.reciprocalTariff,
            });
          } else {
            console.warn("Canada NOT found in mapped countries!");
          }
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
