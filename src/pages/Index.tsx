
import React, { useState, useRef } from 'react';
import { CountryData } from '@/data/types';
import AmChartsMap from '@/components/AmChartsMap';
import { Badge } from '@/components/ui/badge';
import useCountryData from '@/hooks/useCountryData';
import CountryDetail from '@/components/CountryDetail';
import { Card, CardContent } from '@/components/ui/card';
import { DownloadReportForm } from '@/components/DownloadReportForm';
import Timeline from '@/components/Timeline';
import ExpertiseSection from '@/components/ExpertiseSection';
import Footer from '@/components/Footer';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';

const Index: React.FC = () => {
  const { countryData, loading: isLoading, error } = useCountryData();
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isLeadFormOpen, setIsLeadFormOpen] = useState(false);
  const downloadSectionRef = useRef<HTMLDivElement>(null);

  // Simplified animation with no opacity-0 class
  const fadeInElements = () => {
    document.querySelectorAll('.animate-on-scroll').forEach((item) => {
      item.classList.add('animate-subtle-fade');
    });
  };

  React.useEffect(() => {
    fadeInElements();
    
    // Use a simple intersection observer for subtle fade-in
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-subtle-fade');
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

  // Remove the restriction on countries - all valid countries are now shown
  const visibleCountries = countryData || [];

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
        <p className="text-lg text-infomineo-red">Error loading data: {typeof error === 'object' && error !== null ? (error as Error).message : String(error)}</p>
      </div>
    );
  }

  const handleCountrySelect = (country: CountryData) => {
    setSelectedCountry(country);
    setIsDetailOpen(true);
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
      {/* Hero Section - Updated title and smaller description */}
      <section className="bg-infomineo-gradient text-white">
        <header className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src="https://infomineo.com/wp-content/uploads/2024/02/InfomineoLogo01.webp" alt="Infomineo Logo" className="h-10 w-auto" />
            </div>
            <Badge variant="outline" className="text-sm px-3 py-1.5 bg-white/10 backdrop-blur text-white border-transparent font-medium">
              Latest Data: Feb 2025
            </Badge>
          </div>
        </header>

        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center animate-subtle-fade">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">Global Trade Map</h1>
            <p className="text-lg md:text-xl opacity-90 mb-8 max-w-3xl mx-auto line-clamp-2">
              The Trump administration has declared a national emergency and implemented sweeping tariffs on imports, 
              with highest rates targeting Chinese goods while establishing baseline tariffs on most other countries.
            </p>
          </div>
        </div>

        {/* Map Container - Now only showing AmCharts Map */}
        <div className="container mx-auto px-4 pb-8">
          <div className="w-full bg-white">
            <AmChartsMap
              onSelectCountry={handleCountrySelect}
            />
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="bg-white py-24">
        <div className="container mx-auto px-4">
          <Timeline />
        </div>
      </section>

      {/* Lead Capture Section */}
      <section ref={downloadSectionRef} className="py-24 bg-infomineo-gradient text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Stay Informed on Global Trade Dynamics
              </h2>
              <p className="text-xl opacity-90 mb-8">
                Get expert updates and reports directly to your inbox.
              </p>
            </div>
            
            <div className="max-w-md mx-auto">
              <Card className="backdrop-blur-md bg-white/5 border-transparent shadow-lg">
                <CardContent className="p-6 md:p-8">
                  <DownloadReportForm />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <ExpertiseSection />

      {/* Footer */}
      <Footer />

      {/* Dialog that preserves map state and doesn't reset selectedCountry when closing */}
      <Dialog 
        open={isDetailOpen} 
        onOpenChange={(open) => {
          setIsDetailOpen(open);
          // Don't reset selectedCountry when closing to preserve state
        }}
      >
        <DialogContent className="sm:max-w-[700px] max-h-[85vh] overflow-y-auto">
          <DialogTitle>{selectedCountry?.name || "Country Details"}</DialogTitle>
          <CountryDetail country={selectedCountry} />
        </DialogContent>
      </Dialog>

      {/* Lead Form Dialog */}
      <Dialog open={isLeadFormOpen} onOpenChange={setIsLeadFormOpen}>
        <DialogContent className="sm:max-w-md bg-infomineo-gradient p-0 border-none rounded-xl overflow-hidden">
          <div className="py-8 px-6">
            <h2 className="text-2xl font-bold mb-4 text-center text-white">Get Exclusive Access</h2>
            <p className="text-white/80 mb-6 text-center">
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
