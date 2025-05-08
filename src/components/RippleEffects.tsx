import React, { useState } from 'react';
import { TrendingDown, Globe, Network, Factory, Briefcase, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
interface EffectCardProps {
  icon: React.ReactNode;
  title: string;
  summary: string;
  fullContent: string;
}
const EffectCard: React.FC<EffectCardProps> = ({
  icon,
  title,
  summary,
  fullContent
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  return <>
      <Card className="bg-white border-t-4 border-t-infomineo-blue h-full hover:shadow-md transition-all">
        <CardContent className="p-6">
          <div className="mb-4 flex justify-center">
            <div className="p-3 bg-infomineo-blue/10 rounded-full">
              {icon}
            </div>
          </div>
          <h3 className="text-lg font-semibold mb-3 text-center">{title}</h3>
          <p className="text-gray-600 text-sm">{summary}</p>
          <div className="mt-4 flex justify-center">
            <Button variant="ghost" size="sm" className="text-infomineo-blue hover:text-infomineo-blue/80 p-0" onClick={() => setIsDialogOpen(true)}>
              Learn More <ExternalLink className="ml-1 h-3.5 w-3.5" />
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogTitle>{title}</DialogTitle>
          <div className="mt-4">
            <p className="text-gray-700 whitespace-pre-line">{fullContent}</p>
          </div>
        </DialogContent>
      </Dialog>
    </>;
};
const RippleEffects: React.FC = () => {
  const effects = [{
    icon: <TrendingDown className="h-8 w-8 text-infomineo-blue" strokeWidth={1.5} />,
    title: "Global Supply Chain Disruption and Recession Risk",
    summary: "New tariffs further strain fragile supply chains recovering from the pandemic and geopolitical tensions, risking significant global growth slowdown.",
    fullContent: "The new U.S. tariffs add further strain to already fragile global supply chains, still recovering from the pandemic and geopolitical instability. With the U.S. and China representing roughly 43% of global GDP (IMF, 2025), an all-out trade war between them could slow global growth significantly or even push some economies into recession. The IMF now forecasts global growth at just 2.8% in 2025, down from 3.3%, citing supply chain fragmentation as a primary driver."
  }, {
    icon: <Globe className="h-8 w-8 text-infomineo-blue" strokeWidth={1.5} />,
    title: "Trade Diversion and Market Flooding",
    summary: "Global firms may reroute exports to open economies, causing price pressure and oversupply in third-party markets with mixed economic impacts.",
    fullContent: "Global firms may reroute exports to more open economies, triggering price pressure and oversupply in third-party markets. China, the world's top manufacturing exporter, may seek alternative buyers for state-subsidized goods that can no longer enter the U.S., risking \"dumping\" that could undercut local producers elsewhere. Many countries are increasingly concerned that diverted Chinese goods could overwhelm local industries, undercut domestic producers, and destabilize key sectors. While some countries like Brazil and Australia may feel the pressure from diverted Chinese and EU goods, others like India stand to benefit in electronics and textiles as rivals face higher U.S. tariffs."
  }, {
    icon: <Network className="h-8 w-8 text-infomineo-blue" strokeWidth={1.5} />,
    title: "Regional Trade Realignment",
    summary: "Trade tensions have pushed historical competitors like Japan, China, and South Korea to collaborate on potential trade agreements.",
    fullContent: "Trade tensions have pushed unlikely regional partners to collaborate. Japan, China, and South Korea, which are historical competitors, held their first trilateral trade meeting in over five years, discussing the possibility of a regional free-trade agreement that could strategically isolate the U.S. from key Asian economic blocs."
  }, {
    icon: <Factory className="h-8 w-8 text-infomineo-blue" strokeWidth={1.5} />,
    title: "Commodity Market Vulnerability",
    summary: "Tariff-related Chinese economic slowdown threatens global demand for resources, particularly affecting commodity-dependent exporters.",
    fullContent: "A Chinese economic slowdown, compounded by tariff escalation, could dampen global demand for iron ore, minerals, and industrial inputs. This threatens commodity-dependent exporters and may trigger price drops across key resource markets, particularly for countries tied closely to Chinese growth."
  }, {
    icon: <Briefcase className="h-8 w-8 text-infomineo-blue" strokeWidth={1.5} />,
    title: "Corporate Retaliation Through Investment Reassessment",
    summary: "Multinational companies may retaliate by scaling back U.S. investments due to cost structure uncertainty and unpredictable tariffs.",
    fullContent: "Tariff-hit companies may retaliate not through policy, but by halting or scaling back investment plans in the United States. For multinationals, uncertainty over cost structures makes long-term capital deployment riskier."
  }];
  return <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Ripple Effects of America's Tariff Escalation:
Global Trade, Growth, and Geopolitics at Risk</h2>
            <p className="text-lg text-gray-600">
              The latest wave of U.S. tariffs is rippling across the global economy, magnifying vulnerabilities in already fragile supply chains and unsettling established trade patterns. What began as a domestic economic strategy is now reshaping global growth prospects and geopolitical alignments.
            </p>
          </div>
          
          <Carousel className="mx-auto max-w-5xl">
            <CarouselContent>
              {effects.map((effect, index) => <CarouselItem key={index} className="md:basis-1/3 pl-4">
                  <EffectCard icon={effect.icon} title={effect.title} summary={effect.summary} fullContent={effect.fullContent} />
                </CarouselItem>)}
            </CarouselContent>
            <CarouselPrevious className="left-0" />
            <CarouselNext className="right-0" />
          </Carousel>
          
          <div className="text-center text-gray-600 italic mt-12">
            <p>Efforts to negotiate exemptions or delays are already underway, with President Trump claiming that "countries are dying to make a deal." Vietnam and Bangladesh are among those who have formally requested tariff reprieves in hopes of cushioning the blow.</p>
          </div>
        </div>
      </div>
    </section>;
};
export default RippleEffects;