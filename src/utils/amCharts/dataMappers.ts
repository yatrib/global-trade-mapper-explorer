
import { CountryData } from '@/data/types';
import { AmChartsCountryData } from './types';

// Map country data to the format expected by amCharts, showing all countries in the database
export const mapCountryDataForChart = (countryData: CountryData[]): AmChartsCountryData[] => {
  console.log(`Mapping ${countryData.length} countries for chart display`);
  
  // Map all valid countries to the AmCharts format
  const result = countryData.map(country => {
    // Only check if the country has an ID and name at minimum
    if (!country.id || !country.name) {
      console.log(`Skipping country with missing ID or name:`, country);
      return null;
    }
    
    // Log the country being processed
    console.log(`Processing country for chart: ${country.name} (${country.id})`);
    
    // Include all countries from the database, even if they have null metrics
    return {
      id: country.id,
      name: country.name,
      gdp2023: country.gdp?.actual2023 || null,
      gdp2024: country.gdp?.estimate2024 || null,
      usTradeBalance: country.usTradeBalance || null,
      shareOfUsImports: country.shareOfUsImports || null,
      shareOfUsExports: country.shareOfUsExports || null,
      tariffsToUS: country.tariffsToUS || null,
      reciprocalTariff: country.reciprocalTariff || null,
      countryObject: country // Store the entire country object for reference
    };
  }).filter(Boolean) as AmChartsCountryData[]; // Filter out any null entries
  
  // Log the first few countries in the result to verify data is correct
  if (result.length > 0) {
    console.log("Mapped chart data sample (first 3 countries):", result.slice(0, 3));
  } else {
    console.warn("No countries mapped for chart data");
  }
  
  console.log(`Total countries mapped for chart: ${result.length}`);
  return result;
};
