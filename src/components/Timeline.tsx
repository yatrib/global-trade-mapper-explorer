
import React from 'react';
import { Flag, AlertTriangle, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  isHighlighted?: boolean;
}

// U.S. - China timeline events data
const usEvents: TimelineEvent[] = [
  {
    date: 'Feb 1, 2025',
    title: 'Initial Tariffs Ordered',
    description: 'Trump ordered a 10% tariff on all Chinese imports, adding to existing duties from both his previous administration and the Biden era, effective February 4.',
    icon: <Flag className="h-6 w-6 text-white" />,
    isHighlighted: true
  },
  {
    date: 'Feb 4, 2025',
    title: 'Tariffs Take Effect',
    description: '10% tariffs on Chinese imports take effect.',
    icon: <Flag className="h-6 w-6 text-white" />
  },
  {
    date: 'Mar 4, 2025',
    title: 'Tariffs Doubled',
    description: 'Trump doubles tariffs on all Chinese imports to 20%.',
    icon: <TrendingUp className="h-6 w-6 text-white" />,
    isHighlighted: true
  },
  {
    date: 'Apr 2, 2025',
    title: '"Liberation Day" Agenda',
    description: 'Trump announces new 34% tariff on Chinese imports.',
    icon: <Flag className="h-6 w-6 text-white" />
  },
  {
    date: 'Apr 7, 2025',
    title: 'Additional Tariff Threat',
    description: 'Trump threatens an additional 50% tariff on China, which could raise total tariffs to 104%.',
    icon: <AlertTriangle className="h-6 w-6 text-white" />,
    isHighlighted: true
  },
  {
    date: 'Apr 9, 2025',
    title: 'Selective Tariff Pause',
    description: 'Trump pauses reciprocal tariffs for 90 days for most countries, but keeps China at 125%.',
    icon: <Flag className="h-6 w-6 text-white" />
  },
  {
    date: 'Apr 10, 2025',
    title: 'Total Tariff Clarification',
    description: 'White House clarifies total China tariff is 145% when fentanyl-related duties are included.',
    icon: <Flag className="h-6 w-6 text-white" />
  },
  {
    date: 'Apr 11, 2025',
    title: 'Electronics Tariff Exemption',
    description: 'The U.S. exempts most countries from electronics tariffs under its reciprocal policy but keeps a 20% rate on Chinese electronics.',
    icon: <Flag className="h-6 w-6 text-white" />
  },
  {
    date: 'Apr 22, 2025',
    title: 'Diplomatic Stance',
    description: 'Trump says he\'s waiting for Xi to initiate talks and claims a "very good relationship."',
    icon: <Flag className="h-6 w-6 text-white" />
  },
  {
    date: 'Apr 23, 2025',
    title: 'Potential Tariff Reduction',
    description: 'Trump signals potential tariff reduction: base rate may drop from 145% to 50–65%, with strategic items still facing up to 100%.',
    icon: <TrendingUp className="h-6 w-6 text-white" />,
    isHighlighted: true
  }
];

const chinaEvents: TimelineEvent[] = [
  {
    date: 'Feb 4, 2025',
    title: 'Retaliatory Tariffs Announced',
    description: 'China announces retaliatory 15% tariffs on U.S. coal and liquefied natural gas, a 10% tariff on cruder oil, agricultural machinery, and large cars, and an anti-monopoly investigation into Google.',
    icon: <Flag className="h-6 w-6 text-white" />,
    isHighlighted: true
  },
  {
    date: 'Feb 10, 2025',
    title: 'Tariffs Implementation',
    description: 'China imposes 15% tariffs on coal and liquefied natural gas products, and 10% tariffs on crude oil, agricultural machinery, and large-engine cars imported from the U.S.',
    icon: <Flag className="h-6 w-6 text-white" />
  },
  {
    date: 'Mar 4, 2025',
    title: 'Agricultural Tariffs Announced',
    description: 'China announces 15% tariffs on U.S. chicken, wheat, corn, and cotton, and a 10% tariff on sorghum, soybeans, pork, beef, aquatic products, fruits, vegetables, and dairy products (effective Mar 10) and expands export controls to two dozen additional U.S. firms.',
    icon: <AlertTriangle className="h-6 w-6 text-white" />,
    isHighlighted: true
  },
  {
    date: 'Mar 10, 2025',
    title: 'Farm Products Tariffs',
    description: 'China\'s tariffs on American farm products take effect.',
    icon: <Flag className="h-6 w-6 text-white" />
  },
  {
    date: 'Apr 4, 2025',
    title: 'Matching Tariffs Announced',
    description: 'China announces a matching 34% tariff on all U.S. imports (effective Apr 10), expands rare earth export controls, and sanctions 27 more U.S. companies.',
    icon: <AlertTriangle className="h-6 w-6 text-white" />,
    isHighlighted: true
  },
  {
    date: 'Apr 9, 2025',
    title: 'Additional Tariffs Response',
    description: 'China responds with an additional 50% tariff on all U.S. goods (effective Apr 10), raising total duties to 84%.',
    icon: <AlertTriangle className="h-6 w-6 text-white" />,
    isHighlighted: true
  },
  {
    date: 'Apr 11, 2025',
    title: 'Total Tariff Increase',
    description: 'China raises its total duties on all U.S. goods to 125%.',
    icon: <AlertTriangle className="h-6 w-6 text-white" />,
    isHighlighted: true
  },
  {
    date: 'Apr 22, 2025',
    title: 'Diplomatic Strategy',
    description: 'Xi avoids direct talks, instead launches diplomatic outreach to other trade partners.',
    icon: <Flag className="h-6 w-6 text-white" />
  }
];

const TimelineComponent: React.FC<{ events: TimelineEvent[] }> = ({ events }) => {
  return (
    <div className="relative flex flex-col items-center">
      {/* Timeline connector line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-infomineo-blue/30 to-infomineo-light/40" style={{ zIndex: 0 }}></div>

      <div className="w-full">
        {events.map((event, index) => {
          const isEven = index % 2 === 0;
          
          return (
            <div 
              key={index} 
              className={`relative flex mb-12 ${isEven ? 'justify-start' : 'justify-end'} w-full`}
            >
              {/* Timeline node */}
              <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center shadow-sm",
                  event.isHighlighted ? "bg-infomineo-gradient" : "bg-infomineo-blue"
                )}>
                  {event.icon}
                </div>
              </div>
              
              {/* Content box */}
              <div className={cn(
                "w-[calc(50%-2rem)]",
                isEven ? "pr-8" : "pl-8"
              )}>
                <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                  <span className="text-sm font-semibold text-infomineo-light inline-block mb-2">{event.date}</span>
                  <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                  <p className="text-gray-600">{event.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Timeline: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Key Moments in the Global Trade War</h2>
        <p className="text-lg text-gray-600">Track the evolution of trade policies and their global impact</p>
      </div>

      <Tabs defaultValue="us-china" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-10">
          <TabsTrigger value="us-china">U.S. - China</TabsTrigger>
          <TabsTrigger value="us-canada-mexico">U.S. - Canada & Mexico</TabsTrigger>
          <TabsTrigger value="us-eu">U.S. - European Union</TabsTrigger>
        </TabsList>
        
        {/* U.S. - China Tab Content */}
        <TabsContent value="us-china" className="space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-center">United States</h3>
              <TimelineComponent events={usEvents} />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-6 text-center">China</h3>
              <TimelineComponent events={chinaEvents} />
            </div>
          </div>
        </TabsContent>
        
        {/* U.S. - Canada & Mexico Tab Content - Empty for now */}
        <TabsContent value="us-canada-mexico">
          <div className="flex items-center justify-center py-16">
            <p className="text-lg text-gray-500 italic">Content coming soon for U.S. - Canada & Mexico trade relations.</p>
          </div>
        </TabsContent>
        
        {/* U.S. - European Union Tab Content - Empty for now */}
        <TabsContent value="us-eu">
          <div className="flex items-center justify-center py-16">
            <p className="text-lg text-gray-500 italic">Content coming soon for U.S. - European Union trade relations.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Timeline;
