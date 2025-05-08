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
import { ExternalLink, Globe, Factory, Network, Briefcase, Users, TrendingDown } from 'lucide-react';
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
      
      {/* New Ripple Effects Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                Ripple Effects of America's Tariff Escalation: Global Trade, Growth, and Geopolitics at Risk
              </h2>
              <p className="text-lg text-gray-600">
                The latest wave of U.S. tariffs is rippling across the global economy, magnifying vulnerabilities in already fragile supply chains and unsettling established trade patterns. What began as a domestic economic strategy is now reshaping global growth prospects and geopolitical alignments.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {/* Effect 1 */}
              <Card className="bg-white border-t-4 border-t-infomineo-blue hover:shadow-md transition-all">
                <CardContent className="p-6">
                  <div className="mb-4 flex justify-center">
                    <div className="p-3 bg-infomineo-blue/10 rounded-full">
                      <TrendingDown className="h-8 w-8 text-infomineo-blue" strokeWidth={1.5} />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-3 text-center">Global Supply Chain Disruption and Recession Risk</h3>
                  <p className="text-gray-600 text-sm">
                    The new U.S. tariffs add further strain to already fragile global supply chains, still recovering from the pandemic and geopolitical instability. With the U.S. and China representing roughly 43% of global GDP (IMF, 2025), an all-out trade war between them could slow global growth significantly or even push some economies into recession. The IMF now forecasts global growth at just 2.8% in 2025, down from 3.3%, citing supply chain fragmentation as a primary driver.
                  </p>
                </CardContent>
              </Card>
              
              {/* Effect 2 */}
              <Card className="bg-white border-t-4 border-t-infomineo-blue hover:shadow-md transition-all">
                <CardContent className="p-6">
                  <div className="mb-4 flex justify-center">
                    <div className="p-3 bg-infomineo-blue/10 rounded-full">
                      <Globe className="h-8 w-8 text-infomineo-blue" strokeWidth={1.5} />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-3 text-center">Trade Diversion and Market Flooding</h3>
                  <p className="text-gray-600 text-sm">
                    Global firms may reroute exports to more open economies, triggering price pressure and oversupply in third-party markets. China, the world's top manufacturing exporter, may seek alternative buyers for state-subsidized goods that can no longer enter the U.S., risking "dumping" that could undercut local producers elsewhere. Many countries are increasingly concerned that diverted Chinese goods could overwhelm local industries, undercut domestic producers, and destabilize key sectors. While some countries like Brazil and Australia may feel the pressure from diverted Chinese and EU goods, others like India stand to benefit in electronics and textiles as rivals face higher U.S. tariffs.
                  </p>
                </CardContent>
              </Card>
              
              {/* Effect 3 */}
              <Card className="bg-white border-t-4 border-t-infomineo-blue hover:shadow-md transition-all">
                <CardContent className="p-6">
                  <div className="mb-4 flex justify-center">
                    <div className="p-3 bg-infomineo-blue/10 rounded-full">
                      <Network className="h-8 w-8 text-infomineo-blue" strokeWidth={1.5} />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-3 text-center">Regional Trade Realignment</h3>
                  <p className="text-gray-600 text-sm">
                    Trade tensions have pushed unlikely regional partners to collaborate. Japan, China, and South Korea, which are historical competitors, held their first trilateral trade meeting in over five years, discussing the possibility of a regional free-trade agreement that could strategically isolate the U.S. from key Asian economic blocs.
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* Effect 4 */}
              <Card className="bg-white border-t-4 border-t-infomineo-blue hover:shadow-md transition-all">
                <CardContent className="p-6">
                  <div className="mb-4 flex justify-center">
                    <div className="p-3 bg-infomineo-blue/10 rounded-full">
                      <Factory className="h-8 w-8 text-infomineo-blue" strokeWidth={1.5} />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-3 text-center">Commodity Market Vulnerability</h3>
                  <p className="text-gray-600 text-sm">
                    A Chinese economic slowdown, compounded by tariff escalation, could dampen global demand for iron ore, minerals, and industrial inputs. This threatens commodity-dependent exporters and may trigger price drops across key resource markets, particularly for countries tied closely to Chinese growth.
                  </p>
                </CardContent>
              </Card>
              
              {/* Effect 5 */}
              <Card className="bg-white border-t-4 border-t-infomineo-blue hover:shadow-md transition-all">
                <CardContent className="p-6">
                  <div className="mb-4 flex justify-center">
                    <div className="p-3 bg-infomineo-blue/10 rounded-full">
                      <Briefcase className="h-8 w-8 text-infomineo-blue" strokeWidth={1.5} />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-3 text-center">Corporate Retaliation Through Investment Reassessment</h3>
                  <p className="text-gray-600 text-sm">
                    Tariff-hit companies may retaliate not through policy, but by halting or scaling back investment plans in the United States. For multinationals, uncertainty over cost structures makes long-term capital deployment riskier.
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <div className="text-center text-gray-600 italic mb-16">
              <p>Efforts to negotiate exemptions or delays are already underway, with President Trump claiming that "countries are dying to make a deal." Vietnam and Bangladesh are among those who have formally requested tariff reprieves in hopes of cushioning the blow.</p>
            </div>
            
            {/* Tariff Impact Section */}
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                Tariff Impact: Which Players Are Most Exposed?
              </h2>
              <p className="text-lg text-gray-600 mb-12">
                The ripple effects of the U.S. tariff escalation are not evenly distributed. While some actors are positioned to absorb the shock or adapt strategically, others are grappling with mounting costs, disrupted operations, and heightened uncertainty.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                {/* Impact 1 */}
                <div className="relative overflow-hidden group">
                  <Card className="h-full bg-white hover:shadow-lg transition-all duration-300 border-b-4 border-b-infomineo-red">
                    <CardContent className="p-6">
                      <div className="flex justify-center mb-4">
                        <Globe className="h-10 w-10 text-infomineo-red" strokeWidth={1.5} />
                      </div>
                      <h3 className="font-semibold mb-2">Trade-Dependent Economies</h3>
                      <p className="text-xs text-gray-600">
                        Countries that are heavily reliant on either the U.S. or China as a primary trading partner are particularly vulnerable to the tariffs. Whether through direct tariffs or spillover effects from slowed global trade and weakened demand, these nations must navigate growing economic uncertainty. Export-heavy economies are particularly at risk of downturns in manufacturing, agriculture, and resource extraction.
                      </p>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Impact 2 */}
                <div className="relative overflow-hidden group">
                  <Card className="h-full bg-white hover:shadow-lg transition-all duration-300 border-b-4 border-b-infomineo-red">
                    <CardContent className="p-6">
                      <div className="flex justify-center mb-4">
                        <Network className="h-10 w-10 text-infomineo-red" strokeWidth={1.5} />
                      </div>
                      <h3 className="font-semibold mb-2">Interconnected Industries</h3>
                      <p className="text-xs text-gray-600">
                        Sectors that rely on globally dispersed supply chains, like manufacturing, logistics, and retail, are especially vulnerable to tariff-related disruptions. Industries with deeply integrated operations, such as automotive manufacturing, are seeing significant cost pressures under the new U.S. tariffs. The integration runs so deep that the U.S. National Highway Traffic Safety Administration can not distinguish between Canadian-made and American-made parts when calculating domestic content.
                      </p>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Impact 3 */}
                <div className="relative overflow-hidden group">
                  <Card className="h-full bg-white hover:shadow-lg transition-all duration-300 border-b-4 border-b-infomineo-red">
                    <CardContent className="p-6">
                      <div className="flex justify-center mb-4">
                        <Factory className="h-10 w-10 text-infomineo-red" strokeWidth={1.5} />
                      </div>
                      <h3 className="font-semibold mb-2">Energy and Resource-Intensive Industries</h3>
                      <p className="text-xs text-gray-600">
                        Industries that rely heavily on raw material imports, such as steel and aluminum, are facing rising input costs due to the tariffs. This has led to higher expenses in key downstream sectors like construction and manufacturing. Exporters to the U.S. may also face declining demand, as buyers seek alternative sources to avoid the added costs.
                      </p>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Impact 4 */}
                <div className="relative overflow-hidden group">
                  <Card className="h-full bg-white hover:shadow-lg transition-all duration-300 border-b-4 border-b-infomineo-red">
                    <CardContent className="p-6">
                      <div className="flex justify-center mb-4">
                        <Users className="h-10 w-10 text-infomineo-red" strokeWidth={1.5} />
                      </div>
                      <h3 className="font-semibold mb-2">Small and Medium Enterprises (SMEs)</h3>
                      <p className="text-xs text-gray-600">
                        Small businesses are among the hardest hit by the tariffs, facing unpredictable costs, canceled orders, and rising prices they can not absorb. These conditions threaten their survival due to limited sourcing options and tight margins.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
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

      {/* New CTA Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                Ready to Go Deeper? Get Ahead of Shifting Global Trade Dynamics
              </h2>
              <p className="text-lg text-gray-600 mb-10 max-w-3xl mx-auto">
                Infomineo's research team can help you assess the full implications of U.S. tariff policy on your business, industry, or region. Whether it is analyzing how specific sectors will be reshaped, examining the economic and political ripple effects in a particular country, or modeling trade shifts across regional blocs like the EU, USMCA, or ASEAN, we provide tailored insights grounded in data. From employment and supply chain disruptions to investor sentiment and policy alignment, our team is equipped to deliver strategic intelligence that supports proactive decision-making in a rapidly evolving trade landscape.
              </p>
              
              <Button 
                variant="default"
                size="lg" 
                className="bg-infomineo-blue hover:bg-infomineo-blue/90"
                asChild
              >
                <a href="https://infomineo.com/contact-us/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  Connect with us to explore our tailored research solutions <ExternalLink size={16} />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Dialogs - keep existing code */}
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
