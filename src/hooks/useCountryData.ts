
import { useState, useEffect } from 'react';
import { CountryData } from '@/data/types';
import { supabase } from "@/integrations/supabase/client";

const useCountryData = () => {
  const [countryData, setCountryData] = useState<CountryData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | string | null>(null);

  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        setLoading(true);
        
        // Fetch all countries
        const { data: countries, error: countriesError } = await supabase
          .from('countries')
          .select('*');
        
        if (countriesError) throw countriesError;
        
        if (!countries || countries.length === 0) {
          throw new Error('No countries found in the database');
        }
        
        // Fetch GDP data
        const { data: gdpData, error: gdpError } = await supabase
          .from('country_gdp')
          .select('*');
        
        if (gdpError) throw gdpError;
        
        // Fetch trade data
        const { data: tradeData, error: tradeError } = await supabase
          .from('us_trade_data')
          .select('*');
        
        if (tradeError) throw tradeError;
        
        // Fetch impacted sectors
        const { data: sectorsData, error: sectorsError } = await supabase
          .from('country_sectors')
          .select('*');
          
        if (sectorsError) throw sectorsError;
        
        // Fetch key insights
        const { data: insightsData, error: insightsError } = await supabase
          .from('country_insights')
          .select('*');
          
        if (insightsError) throw insightsError;
        
        // Fetch national reactions
        const { data: reactionsData, error: reactionsError } = await supabase
          .from('national_reactions')
          .select('*');
          
        if (reactionsError) throw reactionsError;
        
        // Map the data to our CountryData structure
        const mappedData: CountryData[] = countries.map(country => {
          // Find GDP data for this country
          const gdp = gdpData?.find(g => g.country_id === country.id);
          
          // Find trade data for this country
          const trade = tradeData?.find(t => t.country_id === country.id);
          
          // Find sectors for this country (only include if data exists)
          const sectors = sectorsData
            ?.filter(s => s.country_id === country.id)
            .map(s => s.sector_name) || [];
            
          // Find insights for this country (only include if data exists)
          const insights = insightsData
            ?.filter(i => i.country_id === country.id)
            .map(i => i.insight_text) || [];
            
          // Group reactions by type (only include if data exists)
          const reactions = reactionsData
            ?.filter(r => r.country_id === country.id)
            .map(r => r.description) || [];
          
          return {
            id: country.id,
            name: country.name,
            region: country.Type || 'Unknown', // Using Type field as region
            gdp: {
              actual2023: gdp?.actual_2023 || null,
              estimate2024: gdp?.estimate_2024 || null
            },
            usTradeBalance: trade?.trade_balance || null,
            shareOfUsImports: trade?.share_of_imports || null,
            shareOfUsExports: trade?.share_of_exports || null,
            reciprocalTariff: trade?.reciprocal_tariff || null,
            tariffsToUS: trade?.tariffs_to_us || null,
            impactedSectors: sectors.length > 0 ? sectors : [], // Only include if there's data
            keyInsights: insights.length > 0 ? insights : [], // Only include if there's data
            nationalReaction: {
              // Since we don't have type differentiation in the schema,
              // we'll treat all reactions as retaliatory for now
              retaliatory: reactions.length > 0 ? reactions : [],
              domesticSupport: [] 
            }
          };
        });
        
        console.log(`Loaded ${mappedData.length} countries from database`);
        setCountryData(mappedData);
        setLoading(false);
      } catch (e) {
        const errorMessage = e instanceof Error ? e.message : String(e);
        setError(e instanceof Error ? e : new Error(errorMessage));
        console.error("Error loading country data from Supabase:", errorMessage);
        setLoading(false);
      }
    };
    
    fetchCountryData();
  }, []);

  return { countryData, loading, error };
};

export default useCountryData;
