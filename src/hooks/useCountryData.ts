
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { CountryData } from '@/data/types';

const fetchCountryData = async (): Promise<CountryData[]> => {
  // Fetch all data in parallel
  const [
    { data: countries, error: countriesError },
    { data: gdpData, error: gdpError },
    { data: tradeData, error: tradeError },
    { data: sectors, error: sectorsError },
    { data: insights, error: insightsError },
    { data: reactions, error: reactionsError }
  ] = await Promise.all([
    supabase.from('countries').select('*'),
    supabase.from('country_gdp').select('*'),
    supabase.from('us_trade_data').select('*'),
    supabase.from('country_sectors').select('*'),
    supabase.from('country_insights').select('*'),
    supabase.from('national_reactions').select('*')
  ]);

  if (countriesError) throw new Error(`Error fetching countries: ${countriesError.message}`);
  if (gdpError) throw new Error(`Error fetching GDP data: ${gdpError.message}`);
  if (tradeError) throw new Error(`Error fetching trade data: ${tradeError.message}`);
  if (sectorsError) throw new Error(`Error fetching sectors: ${sectorsError.message}`);
  if (insightsError) throw new Error(`Error fetching insights: ${insightsError.message}`);
  if (reactionsError) throw new Error(`Error fetching reactions: ${reactionsError.message}`);

  // Transform the data into the expected format
  return countries?.map(country => {
    const countryGdp = gdpData?.find(gdp => gdp.country_id === country.id);
    const countryTrade = tradeData?.find(trade => trade.country_id === country.id);
    const countrySectors = sectors?.filter(sector => sector.country_id === country.id).map(s => s.sector_name);
    const countryInsights = insights?.filter(insight => insight.country_id === country.id).map(i => i.insight_text);
    const countryReactions = reactions?.filter(reaction => reaction.country_id === country.id);

    const retaliatoryMeasures = countryReactions
      ?.filter(r => r.reaction_type === 'retaliatory')
      .map(r => r.description) || [];
    const domesticSupport = countryReactions
      ?.filter(r => r.reaction_type === 'domesticSupport')
      .map(r => r.description) || [];

    return {
      id: country.id,
      name: country.name,
      region: country.region,
      area: country.area,
      gdp: {
        actual2023: countryGdp?.actual_2023 || 0,
        estimate2024: countryGdp?.estimate_2024 || 0,
      },
      usTradeBalance: countryTrade?.trade_balance || 0,
      shareOfUsImports: countryTrade?.share_of_imports || null,
      shareOfUsExports: countryTrade?.share_of_exports || null,
      reciprocalTariff: countryTrade?.reciprocal_tariff || null,
      tariffsToUS: countryTrade?.tariffs_to_us || null,
      impactedSectors: countrySectors || [],
      keyInsights: countryInsights || [],
      nationalReaction: {
        retaliatory: retaliatoryMeasures,
        domesticSupport: domesticSupport,
      }
    };
  }) || [];
};

export const useCountryData = () => {
  return useQuery({
    queryKey: ['countryData'],
    queryFn: fetchCountryData,
  });
};
