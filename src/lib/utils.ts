
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats large numbers with B for billions and M for millions
 */
export function formatValue(value: number | null | undefined): string {
  if (value === null || value === undefined) return 'N/A';
  
  // Format to 1 decimal place without thousands separators
  if (value >= 1000) {
    return `$${(value / 1000).toFixed(1)}B`;
  }
  
  return `$${value.toFixed(1)}`;
}
