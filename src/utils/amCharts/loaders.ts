
import { WindowWithAmCharts } from './types';

// Load amCharts scripts dynamically
export const loadAmChartsScripts = async (): Promise<void> => {
  try {
    // Define the scripts to load
    const scripts = [
      "https://cdn.amcharts.com/lib/5/index.js",
      "https://cdn.amcharts.com/lib/5/map.js",
      "https://cdn.amcharts.com/lib/5/geodata/worldLow.js",
      "https://cdn.amcharts.com/lib/5/themes/Animated.js"
    ];

    // Load each script sequentially
    for (const src of scripts) {
      await new Promise<void>((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) {
          resolve();
          return;
        }

        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.onload = () => resolve();
        script.onerror = (e) => reject(new Error(`Failed to load script: ${src}`));
        document.head.appendChild(script);
      });
    }
  } catch (error) {
    console.error('Failed to load amCharts:', error);
    throw error;
  }
};

// Helper function to check if amCharts is loaded
export const isAmChartsLoaded = (): boolean => {
  const win = window as unknown as WindowWithAmCharts;
  return !!win.am5;
};
