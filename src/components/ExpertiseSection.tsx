import React from 'react';
import { BarChart3, Globe, Handshake, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
const ExpertiseSection: React.FC = () => {
  return <section className="py-24 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Why Trust Infomineo?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our expertise combines deep market knowledge with innovative data solutions
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
          <ExpertiseCard icon={<BarChart3 className="h-8 w-8" strokeWidth={1.5} />} title="Data-Driven Insights" description="We transform complex market data into clear, actionable insights for your business strategy." />
          
          <ExpertiseCard icon={<Globe className="h-8 w-8" strokeWidth={1.5} />} title="Global Reach" description="Our presence across continents ensures comprehensive coverage of emerging markets and trends." />
          
          <ExpertiseCard icon={<Handshake className="h-8 w-8" strokeWidth={1.5} />} title="Tailored Solutions" description="We develop customized research solutions that align perfectly with your business objectives." />
        </div>
        
        {/* New CTA Button */}
        <div className="text-center mt-16">
          <Button variant="default" size="lg" className="bg-infomineo-blue hover:bg-infomineo-blue/90" asChild>
            
          </Button>
        </div>
      </div>
    </section>;
};
interface ExpertiseCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}
const ExpertiseCard: React.FC<ExpertiseCardProps> = ({
  icon,
  title,
  description
}) => {
  return <div>
      <div className="p-8 bg-white rounded-xl">
        <div className="mb-6 inline-flex items-center justify-center p-3 bg-infomineo-blue/5 rounded-full text-infomineo-blue">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>
    </div>;
};
export default ExpertiseSection;