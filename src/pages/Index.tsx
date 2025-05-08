
import React, { useState, useRef } from 'react';
import { CountryData } from '@/data/types';
import AmChartsMapWithFilters from '@/components/AmChartsMapWithFilters';
import { Badge } from '@/components/ui/badge';
import useCountryData from '@/hooks/useCountryData';
import CountryDetail from '@/components/CountryDetail';
import { Card, CardContent } from '@/components/ui/card';
import { DownloadReportForm } from '@/components/DownloadReportForm';
import Timeline from '@/components/Timeline';
import ExpertiseSection from '@/components/ExpertiseSection';
import Footer from '@/components/Footer';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import TariffFaq from '@/components/TariffFaq';
const Index: React.FC = () => {
  const {
    countryData,
    loading: isLoading,
    error
  } = useCountryData();
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isLeadFormOpen, setIsLeadFormOpen] = useState(false);
  const downloadSectionRef = useRef<HTMLDivElement>(null);

  // Simplified animation with no opacity-0 class
  const fadeInElements = () => {
    document.querySelectorAll('.animate-on-scroll').forEach(item => {
      item.classList.add('animate-subtle-fade');
    });
  };
  React.useEffect(() => {
    fadeInElements();

    // Use a simple intersection observer for subtle fade-in
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-subtle-fade');
        }
      });
    }, {
      threshold: 0.1
    });
    document.querySelectorAll('.animate-on-scroll').forEach(item => {
      observer.observe(item);
    });
    return () => {
      document.querySelectorAll('.animate-on-scroll').forEach(item => {
        observer.unobserve(item);
      });
    };
  }, []);

  // Remove the restriction on countries - all valid countries are now shown
  const visibleCountries = countryData || [];
  if (isLoading) {
    return <div className="min-h-screen bg-infomineo-gradient flex items-center justify-center">
        <p className="text-lg text-white">Loading data...</p>
      </div>;
  }
  if (error) {
    return <div className="min-h-screen bg-infomineo-gradient flex items-center justify-center">
        <p className="text-lg text-infomineo-red">Error loading data: {typeof error === 'object' && error !== null ? (error as Error).message : String(error)}</p>
      </div>;
  }
  const handleCountrySelect = (country: CountryData) => {
    setSelectedCountry(country);
    setIsDetailOpen(true);
  };
  const scrollToDownload = () => {
    if (downloadSectionRef.current) {
      downloadSectionRef.current.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  const handleGetFullAccess = () => {
    setIsLeadFormOpen(true);
  };
  return <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-infomineo-gradient text-white">
        <header className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src="https://infomineo.com/wp-content/uploads/2024/02/InfomineoLogo01.webp" alt="Infomineo Logo" className="h-10 w-auto" />
            </div>
            <Button variant="outline" size="sm" className="bg-white hover:bg-white/90 text-infomineo-blue" asChild>
              <a href="https://infomineo.com/contact-us/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                Contact Us <ExternalLink size={14} />
              </a>
            </Button>
          </div>
        </header>

        <div className="container mx-auto px-4 pt-16 pb-0">
          <div className="max-w-3xl mx-auto text-center animate-subtle-fade">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">U.S. Tariffs 2025 Tracker</h1>
            <p className="text-lg md:text-xl opacity-90 mb-8 max-w-3xl mx-auto line-clamp-2">
              Track the latest U.S. tariff implementations and their global impact with our interactive map below.
            </p>
          </div>
        </div>

        {/* FAQ Section - Added before the Map */}
        <TariffFaq />

        {/* Map Container - Only showing the filtered map */}
        <div className="container mx-auto px-4 pb-8">
          <AmChartsMapWithFilters onSelectCountry={handleCountrySelect} />
          
          {/* Map Notes - Added after the map */}
          <div className="text-xs text-white/80 mt-4 space-y-1.5 max-w-4xl mx-auto">
            <p>* The tariffs charged to the U.S. are defined by Trump and factor in currency manipulation and trade barriers. These were not individually calculated for Canada and Mexico, as the new U.S. tariffs were attributed to their insufficient efforts in curbing fentanyl trafficking into the U.S. For the EU, the U.S. did not calculate separate tariff rates for each member country's tariffs on U.S. goods.</p>
            <p>** For G20 countries, additional sectors may be affected beyond those shown. This data highlights the primary sectors most impacted by the tariffs.</p>
            <p>*** Sources include international databases, official government releases, national statistics offices, and reputable news organizations.</p>
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
      <Dialog open={isDetailOpen} onOpenChange={open => {
      setIsDetailOpen(open);
      // Don't reset selectedCountry when closing to preserve state
    }}>
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
    </div>;
};
export default Index;
