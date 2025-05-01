
import { CountryData } from '@/data/types';
import { AmChartsCountryData } from './types';

// Map country data to the format expected by amCharts, filtering out countries with null values
export const mapCountryDataForChart = (countryData: CountryData[]): AmChartsCountryData[] => {
  // Filter out countries with null or undefined values for key metrics
  const validCountries = countryData.filter(country => {
    // Ensure the country has an ID and name at minimum
    if (!country.id || !country.name) {
      console.log(`Filtering out country with missing ID or name:`, country);
      return false;
    }
    
    // We only need one valid metric to show the country on the map
    const hasValidMetric = 
      country.gdp?.actual2023 !== null || 
      country.gdp?.estimate2024 !== null || 
      country.usTradeBalance !== null || 
      country.tariffsToUS !== null || 
      country.reciprocalTariff !== null;
    
    if (!hasValidMetric) {
      console.log(`Filtering out country with no valid metrics:`, country.name);
    }
    
    return hasValidMetric;
  });
  
  console.log(`Filtered ${countryData.length - validCountries.length} countries with no valid metrics`);
  
  // Map the valid countries to the AmCharts format
  const result = validCountries.map(country => {
    // Verify and log the numeric values for this country
    console.log(`Mapping country for chart: ${country.name}`, {
      gdp2023: country.gdp.actual2023,
      gdp2024: country.gdp.estimate2024,
      usTradeBalance: country.usTradeBalance,
      shareOfUsImports: country.shareOfUsImports,
      shareOfUsExports: country.shareOfUsExports,
      tariffsToUS: country.tariffsToUS,
      reciprocalTariff: country.reciprocalTariff
    });
    
    return {
      id: country.id,
      name: country.name,
      gdp2023: country.gdp.actual2023,
      gdp2024: country.gdp.estimate2024,
      usTradeBalance: country.usTradeBalance,
      shareOfUsImports: country.shareOfUsImports,
      shareOfUsExports: country.shareOfUsExports,
      tariffsToUS: country.tariffsToUS,
      reciprocalTariff: country.reciprocalTariff,
      countryObject: country // Store the entire country object for reference
    };
  });
  
  // Log the first few countries in the result to verify data is correct
  if (result.length > 0) {
    console.log("Mapped chart data sample (first 3 countries):", result.slice(0, 3));
  } else {
    console.warn("No countries mapped for chart data");
  }
  
  console.log(`Total countries mapped for chart: ${result.length}`);
  return result;
};
