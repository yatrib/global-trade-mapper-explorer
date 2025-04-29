
import React, { useState, useEffect, useRef } from 'react';
import { CountryData, MetricType } from '@/data/types';
import WorldMap from '@/components/WorldMap';
import { Badge } from '@/components/ui/badge';
import { Globe } from 'lucide-react';
import { useCountryData } from '@/hooks/useCountryData';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import CountryDetail from '@/components/CountryDetail';
import { Card, CardContent } from '@/components/ui/card';
import { DownloadReportForm } from '@/components/DownloadReportForm';
import Timeline from '@/components/Timeline';
import ExpertiseSection from '@/components/ExpertiseSection';
import { metricOptions } from '@/data/countries';

const FREE_COUNTRY_LIMIT = 5;

const Index: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = useState<MetricType>('gdp2023');
  const { data: countryData, isLoading, error } = useCountryData();
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const downloadSectionRef = useRef<HTMLDivElement>(null);

  // Scroll handler for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            entry.target.classList.remove('opacity-0');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.animate-on-scroll').forEach((item) => {
      observer.observe(item);
    });

    return () => {
      document.querySelectorAll('.animate-on-scroll').forEach((item) => {
        observer.unobserve(item);
      });
    };
  }, []);

  // Limit countries shown to first 5 for free users
  const visibleCountries = countryData?.slice(0, FREE_COUNTRY_LIMIT) || [];
  const hiddenCountries = countryData?.slice(FREE_COUNTRY_LIMIT) || [];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-infomineo-gradient flex items-center justify-center">
        <p className="text-lg text-white">Loading data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-infomineo-gradient flex items-center justify-center">
        <p className="text-lg text-infomineo-red">Error loading data: {error.message}</p>
      </div>
    );
  }

  const handleCountrySelect = (country: CountryData) => {
    setSelectedCountry(country);
    setIsSidebarOpen(true);
  };

  const scrollToDownload = () => {
    if (downloadSectionRef.current) {
      downloadSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-infomineo-gradient text-white">
        <header className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Globe className="h-6 w-6 text-infomineo-light" />
              <h1 className="text-xl font-bold">Infomineo</h1>
            </div>
            <Badge variant="outline" className="text-xs px-2 py-0.5 bg-white/10 backdrop-blur text-white border-white/20">
              Latest Data: Feb 2025
            </Badge>
          </div>
        </header>

        <div className="container mx-auto px-4 pt-8 pb-6">
          <div className="max-w-3xl mx-auto text-center animate-on-scroll opacity-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Decoding the U.S.-China Trade War: Global Tariffs Explained</h1>
            <p className="text-xl md:text-2xl opacity-90 mb-8">Explore the ripple effects of tariffs across G20 nations and beyond.</p>
          </div>
        </div>

        {/* Map Section */}
        <div className="relative">
          <div className="h-[70vh] w-full">
            <WorldMap
              selectedCountry={selectedCountry}
              selectedMetric={selectedMetric}
              onSelectMetric={setSelectedMetric}
              onSelectCountry={handleCountrySelect}
              countryData={countryData || []}
              onShowFullAccess={scrollToDownload}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-infomineo-blue/80 via-transparent to-transparent pointer-events-none"></div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="bg-white">
        <div className="container mx-auto">
          <Timeline />
        </div>
      </section>

      {/* Lead Capture Section */}
      <section ref={downloadSectionRef} className="py-16 bg-infomineo-gradient text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10 animate-on-scroll opacity-0">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Stay Informed on Global Trade Dynamics
              </h2>
              <p className="text-lg md:text-xl opacity-90 mb-8">
                Get expert updates and reports directly to your inbox.
              </p>
            </div>
            
            <div className="max-w-md mx-auto animate-on-scroll opacity-0" style={{ animationDelay: "0.2s" }}>
              <Card className="backdrop-blur-md bg-white/10 border-white/20">
                <CardContent className="p-6">
                  <DownloadReportForm />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <ExpertiseSection />

      <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
        <SheetContent side="right" className="w-full sm:w-[540px] p-0">
          <CountryDetail country={selectedCountry} />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Index;
