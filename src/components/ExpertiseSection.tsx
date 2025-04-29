
import React from 'react';
import { BarChart3, Globe, Handshake } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const ExpertiseSection: React.FC = () => {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-12 animate-on-scroll opacity-0">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Trust Infomineo?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our expertise combines deep market knowledge with innovative data solutions
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <ExpertiseCard 
            icon={<BarChart3 className="h-10 w-10 text-infomineo-blue" />}
            title="Data-Driven Insights"
            description="We transform complex market data into clear, actionable insights for your business strategy."
            delay={0}
          />
          
          <ExpertiseCard 
            icon={<Globe className="h-10 w-10 text-infomineo-blue" />}
            title="Global Reach"
            description="Our presence across continents ensures comprehensive coverage of emerging markets and trends."
            delay={0.2}
          />
          
          <ExpertiseCard 
            icon={<Handshake className="h-10 w-10 text-infomineo-blue" />}
            title="Tailored Solutions"
            description="We develop customized research solutions that align perfectly with your business objectives."
            delay={0.4}
          />
        </div>
      </div>
    </section>
  );
};

interface ExpertiseCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const ExpertiseCard: React.FC<ExpertiseCardProps> = ({ icon, title, description, delay }) => {
  return (
    <div className="animate-on-scroll opacity-0" style={{ animationDelay: `${delay}s` }}>
      <Card className="h-full border shadow-md hover:shadow-xl transition-all duration-300 group">
        <CardContent className="p-6">
          <div className="mb-4 flex justify-center">
            <div className="p-3 bg-infomineo-grey-100 rounded-full group-hover:bg-infomineo-light/10 transition-colors duration-300">
              {icon}
            </div>
          </div>
          <h3 className="text-xl font-bold text-center mb-3">{title}</h3>
          <p className="text-muted-foreground text-center">{description}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExpertiseSection;
