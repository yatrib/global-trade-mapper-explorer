
import React, { useState } from 'react';
import { Globe, Network, Factory, Users, ExternalLink } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface ImpactCardProps {
  icon: React.ReactNode;
  title: string;
  summary: string;
  fullContent: string;
}

const ImpactCard: React.FC<ImpactCardProps> = ({ icon, title, summary, fullContent }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  return (
    <>
      <div className="h-full flex">
        <div className="p-8 bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] w-full flex flex-col">
          <div className="mb-6 flex justify-center">
            <div className="inline-flex items-center justify-center p-3 bg-infomineo-red/10 rounded-full text-infomineo-red">
              {icon}
            </div>
          </div>
          <h3 className="text-xl font-semibold mb-3 text-center">{title}</h3>
          <p className="text-gray-600 text-sm flex-grow">{summary}</p>
          <div className="mt-4 flex justify-center">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-infomineo-red hover:text-infomineo-red/80 p-0"
              onClick={() => setIsDialogOpen(true)}
            >
              Learn More <ExternalLink className="ml-1 h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </div>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogTitle>{title}</DialogTitle>
          <div className="mt-4">
            <p className="text-gray-700 whitespace-pre-line">{fullContent}</p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

const TariffImpact: React.FC = () => {
  const impacts = [
    {
      icon: <Globe className="h-8 w-8" strokeWidth={1.5} />,
      title: "Trade-Dependent Economies",
      summary: "Countries reliant on U.S. or China trade face heightened vulnerability to economic uncertainty and export sector downturns.",
      fullContent: "Countries that are heavily reliant on either the U.S. or China as a primary trading partner are particularly vulnerable to the tariffs. Whether through direct tariffs or spillover effects from slowed global trade and weakened demand, these nations must navigate growing economic uncertainty. Export-heavy economies are particularly at risk of downturns in manufacturing, agriculture, and resource extraction."
    },
    {
      icon: <Network className="h-8 w-8" strokeWidth={1.5} />,
      title: "Interconnected Industries",
      summary: "Global supply chain sectors like automotive manufacturing face significant cost pressures with deep integration complications.",
      fullContent: "Sectors that rely on globally dispersed supply chains, like manufacturing, logistics, and retail, are especially vulnerable to tariff-related disruptions. Industries with deeply integrated operations, such as automotive manufacturing, are seeing significant cost pressures under the new U.S. tariffs. The integration runs so deep that the U.S. National Highway Traffic Safety Administration can not distinguish between Canadian-made and American-made parts when calculating domestic content."
    },
    {
      icon: <Factory className="h-8 w-8" strokeWidth={1.5} />,
      title: "Energy and Resource-Intensive Industries",
      summary: "Raw material importers face rising costs, with downstream impacts to construction, manufacturing, and declining export competitiveness.",
      fullContent: "Industries that rely heavily on raw material imports, such as steel and aluminum, are facing rising input costs due to the tariffs. This has led to higher expenses in key downstream sectors like construction and manufacturing. Exporters to the U.S. may also face declining demand, as buyers seek alternative sources to avoid the added costs."
    },
    {
      icon: <Users className="h-8 w-8" strokeWidth={1.5} />,
      title: "Small and Medium Enterprises (SMEs)",
      summary: "Small businesses face existential threats from unpredictable costs and tight margins without the resources to adapt quickly.",
      fullContent: "Small businesses are among the hardest hit by the tariffs, facing unpredictable costs, canceled orders, and rising prices they can not absorb. These conditions threaten their survival due to limited sourcing options and tight margins."
    }
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Tariff Impact: Which Players Are Most Exposed?
          </h2>
          <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
            The ripple effects of the U.S. tariff escalation are not evenly distributed. While some actors are positioned to absorb the shock or adapt strategically, others are grappling with mounting costs, disrupted operations, and heightened uncertainty.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {impacts.map((impact, index) => (
              <ImpactCard 
                key={index}
                icon={impact.icon} 
                title={impact.title} 
                summary={impact.summary}
                fullContent={impact.fullContent}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TariffImpact;
