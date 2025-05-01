
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
