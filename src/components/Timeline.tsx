
import React, { useState } from 'react';
import { Flag, AlertTriangle, TrendingUp, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  isHighlighted?: boolean;
  country: 'us' | 'china';
}

// Combined US and China timeline events data, sorted by date
const combinedUsChina: TimelineEvent[] = [
  {
    date: 'Feb 1, 2025',
    title: 'Initial Tariffs Ordered',
    description: 'Trump ordered a 10% tariff on all Chinese imports, adding to existing duties from both his previous administration and the Biden era, effective February 4.',
    icon: <Flag className="h-6 w-6 text-white" />,
    isHighlighted: true,
    country: 'us'
  },
  {
    date: 'Feb 4, 2025',
    title: 'Tariffs Take Effect',
    description: '10% tariffs on Chinese imports take effect.',
    icon: <Flag className="h-6 w-6 text-white" />,
    country: 'us'
  },
  {
    date: 'Feb 4, 2025',
    title: 'Retaliatory Tariffs Announced',
    description: 'China announces retaliatory 15% tariffs on U.S. coal and liquefied natural gas, a 10% tariff on cruder oil, agricultural machinery, and large cars, and an anti-monopoly investigation into Google.',
    icon: <Flag className="h-6 w-6 text-white" />,
    isHighlighted: true,
    country: 'china'
  },
  {
    date: 'Feb 10, 2025',
    title: 'Tariffs Implementation',
    description: 'China imposes 15% tariffs on coal and liquefied natural gas products, and 10% tariffs on crude oil, agricultural machinery, and large-engine cars imported from the U.S.',
    icon: <Flag className="h-6 w-6 text-white" />,
    country: 'china'
  },
  {
    date: 'Mar 4, 2025',
    title: 'Tariffs Doubled',
    description: 'Trump doubles tariffs on all Chinese imports to 20%.',
    icon: <TrendingUp className="h-6 w-6 text-white" />,
    isHighlighted: true,
    country: 'us'
  },
  {
    date: 'Mar 4, 2025',
    title: 'Agricultural Tariffs Announced',
    description: 'China announces 15% tariffs on U.S. chicken, wheat, corn, and cotton, and a 10% tariff on sorghum, soybeans, pork, beef, aquatic products, fruits, vegetables, and dairy products (effective Mar 10) and expands export controls to two dozen additional U.S. firms.',
    icon: <AlertTriangle className="h-6 w-6 text-white" />,
    isHighlighted: true,
    country: 'china'
  },
  {
    date: 'Mar 10, 2025',
    title: 'Farm Products Tariffs',
    description: 'China\'s tariffs on American farm products take effect.',
    icon: <Flag className="h-6 w-6 text-white" />,
    country: 'china'
  },
  {
    date: 'Apr 2, 2025',
    title: '"Liberation Day" Agenda',
    description: 'Trump announces new 34% tariff on Chinese imports.',
    icon: <Flag className="h-6 w-6 text-white" />,
    country: 'us'
  },
  {
    date: 'Apr 4, 2025',
    title: 'Matching Tariffs Announced',
    description: 'China announces a matching 34% tariff on all U.S. imports (effective Apr 10), expands rare earth export controls, and sanctions 27 more U.S. companies.',
    icon: <AlertTriangle className="h-6 w-6 text-white" />,
    isHighlighted: true,
    country: 'china'
  },
  {
    date: 'Apr 7, 2025',
    title: 'Additional Tariff Threat',
    description: 'Trump threatens an additional 50% tariff on China, which could raise total tariffs to 104%.',
    icon: <AlertTriangle className="h-6 w-6 text-white" />,
    isHighlighted: true,
    country: 'us'
  },
  {
    date: 'Apr 9, 2025',
    title: 'Selective Tariff Pause',
    description: 'Trump pauses reciprocal tariffs for 90 days for most countries, but keeps China at 125%.',
    icon: <Flag className="h-6 w-6 text-white" />,
    country: 'us'
  },
  {
    date: 'Apr 9, 2025',
    title: 'Additional Tariffs Response',
    description: 'China responds with an additional 50% tariff on all U.S. goods (effective Apr 10), raising total duties to 84%.',
    icon: <AlertTriangle className="h-6 w-6 text-white" />,
    isHighlighted: true,
    country: 'china'
  },
  {
    date: 'Apr 10, 2025',
    title: 'Total Tariff Clarification',
    description: 'White House clarifies total China tariff is 145% when fentanyl-related duties are included.',
    icon: <Flag className="h-6 w-6 text-white" />,
    country: 'us'
  },
  {
    date: 'Apr 11, 2025',
    title: 'Electronics Tariff Exemption',
    description: 'The U.S. exempts most countries from electronics tariffs under its reciprocal policy but keeps a 20% rate on Chinese electronics.',
    icon: <Flag className="h-6 w-6 text-white" />,
    country: 'us'
  },
  {
    date: 'Apr 11, 2025',
    title: 'Total Tariff Increase',
    description: 'China raises its total duties on all U.S. goods to 125%.',
    icon: <AlertTriangle className="h-6 w-6 text-white" />,
    isHighlighted: true,
    country: 'china'
  },
  {
    date: 'Apr 22, 2025',
    title: 'Diplomatic Stance',
    description: 'Trump says he\'s waiting for Xi to initiate talks and claims a "very good relationship."',
    icon: <Flag className="h-6 w-6 text-white" />,
    country: 'us'
  },
  {
    date: 'Apr 22, 2025',
    title: 'Diplomatic Strategy',
    description: 'Xi avoids direct talks, instead launches diplomatic outreach to other trade partners.',
    icon: <Flag className="h-6 w-6 text-white" />,
    country: 'china'
  },
  {
    date: 'Apr 23, 2025',
    title: 'Potential Tariff Reduction',
    description: 'Trump signals potential tariff reduction: base rate may drop from 145% to 50–65%, with strategic items still facing up to 100%.',
    icon: <TrendingUp className="h-6 w-6 text-white" />,
    isHighlighted: true,
    country: 'us'
  }
];

// Sort events by date string
const sortedEvents = [...combinedUsChina].sort((a, b) => {
  // Parse date strings into comparable format (assuming format is 'MMM D, YYYY')
  const dateA = new Date(a.date);
  const dateB = new Date(b.date);
  return dateA.getTime() - dateB.getTime();
});

const TimelineComponent: React.FC = () => {
  const [visibleCount, setVisibleCount] = useState(3);
  const events = sortedEvents.slice(0, visibleCount);
  
  const loadMore = () => {
    setVisibleCount(prev => Math.min(prev + 3, sortedEvents.length));
  };

  return (
    <div className="relative w-full">
      {/* Timeline center connector line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gray-300 to-gray-200" style={{ zIndex: 0 }}></div>

      <div className="w-full">
        {events.map((event, index) => {
          const isUSEvent = event.country === 'us';
          
          return (
            <div key={index} className="relative flex mb-12 w-full">
              {/* Timeline node in center */}
              <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center shadow-sm",
                  event.isHighlighted ? "bg-infomineo-gradient" : 
                    event.country === 'us' ? "bg-infomineo-blue" : "bg-infomineo-red"
                )}>
                  {event.icon}
                </div>
              </div>
              
              {/* US event on left, China event on right */}
              {isUSEvent ? (
                // US Event (Left)
                <>
                  <div className="w-1/2 pr-8">
                    <Card className="border-l-4 border-l-infomineo-blue hover:shadow-md transition-shadow duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-2">
                          <span className="text-sm font-semibold text-infomineo-blue">{event.date}</span>
                          <span className="text-xs font-bold px-2 py-1 rounded-full bg-infomineo-blue/10 text-infomineo-blue">United States</span>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                        <p className="text-gray-600">{event.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="w-1/2"></div> {/* Empty right side */}
                </>
              ) : (
                // China Event (Right)
                <>
                  <div className="w-1/2"></div> {/* Empty left side */}
                  <div className="w-1/2 pl-8">
                    <Card className="border-l-4 border-l-infomineo-red hover:shadow-md transition-shadow duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-2">
                          <span className="text-sm font-semibold text-infomineo-red">{event.date}</span>
                          <span className="text-xs font-bold px-2 py-1 rounded-full bg-infomineo-red/10 text-infomineo-red">China</span>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                        <p className="text-gray-600">{event.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
      
      {/* Load More Button */}
      {visibleCount < sortedEvents.length && (
        <div className="flex justify-center mt-6">
          <Button 
            onClick={loadMore}
            variant="outline"
            className="flex items-center gap-2"
          >
            Load More <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
      )}
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
        <TabsContent value="us-china">
          <div className="mb-6 flex justify-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-infomineo-blue rounded-full"></div>
              <span className="font-medium">United States</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-infomineo-red rounded-full"></div>
              <span className="font-medium">China</span>
            </div>
          </div>
          <TimelineComponent />
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
