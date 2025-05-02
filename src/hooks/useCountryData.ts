
import { useState, useEffect } from 'react';
import { CountryData } from '@/data/types';
import { countryData as localCountryData } from '@/data/countries';

const useCountryData = () => {
  const [countryData, setCountryData] = useState<CountryData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | string | null>(null);

  useEffect(() => {
    // Use the local data instead of fetching from external source
    try {
      // Set a small timeout to simulate loading for better UX
      const timer = setTimeout(() => {
        setCountryData(localCountryData);
        setLoading(false);
      }, 500);

      return () => clearTimeout(timer);
    } catch (e: any) {
      setError(e instanceof Error ? e : new Error(`Failed to load local data: ${e}`));
      console.error("Error loading country data:", e);
      setLoading(false);
    }
  }, []);

  return { countryData, loading, error };
};

export default useCountryData;
