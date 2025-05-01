
import { CountryData } from '@/data/types';
import { AmChartsCountryData } from './types';

// Map country data to the format expected by amCharts
export const mapCountryDataForChart = (countryData: CountryData[]): AmChartsCountryData[] => {
  const result = countryData.map(country => {
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
  
  return result;
};
