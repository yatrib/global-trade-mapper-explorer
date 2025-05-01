
// Format numeric values for display
export const formatNumeric = (value: number | null | undefined): string => {
  if (value === null || value === undefined) return 'N/A';
  return value.toFixed(1);
};

// Format currency values
export const formatCurrency = (value: number | null | undefined): string => {
  if (value === null || value === undefined) return 'N/A';
  return `$${value.toFixed(1)}B`;
};

// Format percentage values
export const formatPercentage = (value: number | null | undefined): string => {
  if (value === null || value === undefined) return 'N/A';
  return `${value.toFixed(1)}%`;
};

// Check if a country has any valid metric data
export const hasAnyMetricData = (country: any): boolean => {
  return !!(
    country.gdp2023 !== null || 
    country.gdp2024 !== null || 
    country.usTradeBalance !== null || 
    country.tariffsToUS !== null || 
    country.reciprocalTariff !== null ||
    country.shareOfUsImports !== null ||
    country.shareOfUsExports !== null
  );
};
