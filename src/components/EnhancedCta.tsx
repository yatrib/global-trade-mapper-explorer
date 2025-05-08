
import React from 'react';
import { ExternalLink, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

const EnhancedCta: React.FC = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-br from-infomineo-blue via-infomineo-blue/90 to-[#1e3a8a] text-white">
      {/* Abstract background shapes */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-[10%] w-[40%] h-[40%] rounded-full bg-white/20 blur-3xl"></div>
        <div className="absolute bottom-0 right-[10%] w-[40%] h-[40%] rounded-full bg-white/20 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12">
            {/* Visual element */}
            <div className="md:w-1/3 flex justify-center">
              <div className="w-60 h-60 relative">
                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-full animate-pulse-soft"></div>
                <div className="absolute inset-4 bg-white/20 backdrop-blur-sm rounded-full"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Globe className="w-24 h-24 text-white" strokeWidth={1} />
                </div>
              </div>
            </div>
            
            {/* Content */}
            <div className="md:w-2/3 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Go Deeper?<br />
                <span className="text-white/90">Get Ahead of Shifting Global Trade Dynamics</span>
              </h2>
              
              <p className="text-white/80 mb-10 text-lg">
                Infomineo's research team can help you assess the full implications of U.S. tariff policy on your business, industry, or region. Whether it is analyzing how specific sectors will be reshaped, examining the economic and political ripple effects in a particular country, or modeling trade shifts across regional blocs like the EU, USMCA, or ASEAN, we provide tailored insights grounded in data.
              </p>
              
              <Button variant="default" size="lg" className="bg-white hover:bg-white/90 text-infomineo-blue" asChild>
                <a href="https://infomineo.com/contact-us/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  Connect with us <ExternalLink size={16} />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnhancedCta;
