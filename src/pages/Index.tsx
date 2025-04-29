
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
import { Dialog, DialogContent } from '@/components/ui/dialog';
import infomineoLogo from '@/assets/infomineo-logo.png';

const FREE_COUNTRY_LIMIT = 5;

const Index: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = useState<MetricType>('gdp2023');
  const { data: countryData, isLoading, error } = useCountryData();
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLeadFormOpen, setIsLeadFormOpen] = useState(false);
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
  
  const handleGetFullAccess = () => {
    setIsLeadFormOpen(true);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-infomineo-gradient text-white">
        <header className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={infomineoLogo} alt="Infomineo Logo" className="h-8 w-auto" />
            </div>
            <Badge variant="outline" className="text-xs px-2 py-0.5 bg-white/10 backdrop-blur text-white border-white/20">
              Latest Data: Feb 2025
            </Badge>
          </div>
        </header>

        <div className="container mx-auto px-4 pt-12 pb-10">
          <div className="max-w-3xl mx-auto text-center animate-on-scroll opacity-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Decoding the U.S.-China Trade War: Global Tariffs Explained</h1>
            <p className="text-xl md:text-2xl opacity-90 mb-10">Explore the ripple effects of tariffs across G20 nations and beyond.</p>
          </div>
        </div>

        {/* Map Section */}
        <div className="relative">
          <div className="h-[70vh] w-full bg-white">
            <WorldMap
              selectedCountry={selectedCountry}
              selectedMetric={selectedMetric}
              onSelectMetric={setSelectedMetric}
              onSelectCountry={handleCountrySelect}
              countryData={countryData || []}
              onShowFullAccess={handleGetFullAccess}
            />
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <Timeline />
        </div>
      </section>

      {/* Lead Capture Section */}
      <section ref={downloadSectionRef} className="py-20 bg-infomineo-gradient text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 animate-on-scroll opacity-0">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Stay Informed on Global Trade Dynamics
              </h2>
              <p className="text-xl md:text-2xl opacity-90 mb-8">
                Get expert updates and reports directly to your inbox.
              </p>
            </div>
            
            <div className="max-w-md mx-auto animate-on-scroll opacity-0" style={{ animationDelay: "0.2s" }}>
              <Card className="backdrop-blur-md bg-white/10 border-white/20 shadow-xl">
                <CardContent className="p-8">
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

      {/* Lead Form Dialog */}
      <Dialog open={isLeadFormOpen} onOpenChange={setIsLeadFormOpen}>
        <DialogContent className="sm:max-w-md">
          <div className="py-4">
            <h2 className="text-2xl font-bold mb-4 text-center">Get Exclusive Access</h2>
            <p className="text-muted-foreground mb-6 text-center">
              Complete the form below to unlock detailed insights for all countries
            </p>
            <DownloadReportForm />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
