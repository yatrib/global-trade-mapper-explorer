
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
  country: 'us' | 'china' | 'global';
}

// Combined US and China timeline events data, sorted by date
const combinedUsChina: TimelineEvent[] = [{
  date: 'Feb 1, 2025',
  title: 'Initial Tariffs Ordered',
  description: 'Days after returning to office, Trump ordered a 10% tariff on all Chinese imports, adding to existing duties from both his previous administration and the Biden era, effective February 4.',
  icon: <Flag className="h-6 w-6 text-white" />,
  isHighlighted: true,
  country: 'us'
}, {
  date: 'Feb 4, 2025',
  title: 'Tariffs Take Effect',
  description: '10% tariffs on Chinese imports take effect.',
  icon: <Flag className="h-6 w-6 text-white" />,
  country: 'us'
}, {
  date: 'Feb 4, 2025',
  title: 'Retaliatory Tariffs Announced',
  description: 'China announces retaliatory 15% tariffs on U.S. coal and liquefied natural gas, a 10% tariff on cruder oil, agricultural machinery, and large cars, and an anti-monopoly investigation into Google.',
  icon: <Flag className="h-6 w-6 text-white" />,
  isHighlighted: true,
  country: 'china'
}, {
  date: 'Feb 10, 2025',
  title: 'Tariffs Implementation',
  description: 'China imposes 15% tariffs on coal and liquefied natural gas products, and 10% tariffs on crude oil, agricultural machinery, and large-engine cars imported from the U.S.',
  icon: <Flag className="h-6 w-6 text-white" />,
  country: 'china'
}, {
  date: 'Feb 10, 2025',
  title: 'Steel and Aluminum Tariffs',
  description: 'Trump announces the reinstatement of increased tariffs on foreign steel and aluminum, marking a return to a policy first introduced during his previous term. The exemptions granted under the 2018 tariffs are eliminated, resulting in a minimum 25% tariff on all imported steel and an increase in aluminum tariffs from 10% to 25%.',
  icon: <Flag className="h-6 w-6 text-white" />,
  country: 'global'
}, {
  date: 'Mar 4, 2025',
  title: 'Tariffs Doubled',
  description: 'Trump doubles tariffs on all Chinese imports to 20%.',
  icon: <TrendingUp className="h-6 w-6 text-white" />,
  isHighlighted: true,
  country: 'us'
}, {
  date: 'Mar 10, 2025',
  title: 'Agricultural Tariffs',
  description: 'China enacts new tariffs of 10% and 15% on U.S. agricultural exports, targeting products where it is the largest overseas market. In parallel, Beijing restricts 15 American companies from purchasing Chinese goods without prior authorization and blocks 10 others from conducting business in China, including a drone manufacturer that supplies the U.S. military.',
  icon: <AlertTriangle className="h-6 w-6 text-white" />,
  isHighlighted: true,
  country: 'china'
}, {
  date: 'Mar 12, 2025',
  title: 'Steel and Aluminum Tariffs Take Effect',
  description: 'The updated U.S. tariffs on all foreign steel and aluminum officially take effect.',
  icon: <Flag className="h-6 w-6 text-white" />,
  country: 'global'
}, {
  date: 'Mar 24, 2025',
  title: 'Venezuela Oil Tariffs',
  description: 'The United States announces that starting April 2, a 25% tariff will apply to goods imported from countries that purchase oil from Venezuela, whether through direct trade or intermediaries.',
  icon: <Flag className="h-6 w-6 text-white" />,
  country: 'global'
}, {
  date: 'Mar 26, 2025',
  title: 'Automobile Tariffs Announced',
  description: 'Trump confirms the introduction of 25% tariffs on automobile imports, describing the move as a way to encourage domestic car production. These tariffs are scheduled to begin on April 3 with fully assembled vehicles, followed by additional levies on car parts phased in by May 3.',
  icon: <Flag className="h-6 w-6 text-white" />,
  country: 'global'
}, {
  date: 'Apr 2, 2025',
  title: '"Liberation Day" Agenda',
  description: 'As part of the administration\'s "Liberation Day" agenda, Trump unveils a new 34% tariff targeting Chinese imports. These duties are layered atop earlier levies, pushing the cumulative rate to 54%.',
  icon: <Flag className="h-6 w-6 text-white" />,
  isHighlighted: true,
  country: 'us'
}, {
  date: 'Apr 3, 2025',
  title: 'Auto Tariffs Take Effect',
  description: 'The U.S. begins collecting tariffs on imported automobiles, following the policy rollout announced in late March.',
  icon: <Flag className="h-6 w-6 text-white" />,
  country: 'global'
}, {
  date: 'Apr 4, 2025',
  title: 'Matching Tariffs Announced',
  description: 'China announces a matching 34% tariff on all U.S. imports (effective Apr 10), expands rare earth export controls, and sanctions 27 more U.S. companies.',
  icon: <AlertTriangle className="h-6 w-6 text-white" />,
  isHighlighted: true,
  country: 'china'
}, {
  date: 'Apr 7, 2025',
  title: 'Additional Tariff Threat',
  description: 'Trump threatens an additional 50% tariff on China, which could raise total tariffs to 104%.',
  icon: <AlertTriangle className="h-6 w-6 text-white" />,
  isHighlighted: true,
  country: 'us'
}, {
  date: 'Apr 9, 2025',
  title: '104% Tariff Applied',
  description: 'The full rate of 104% is applied to Chinese goods under the updated U.S. tariff structure.',
  icon: <Flag className="h-6 w-6 text-white" />,
  country: 'us'
}, {
  date: 'Apr 9, 2025',
  title: 'Selective Tariff Pause',
  description: 'Trump temporarily reverses course, announcing a 90-day suspension of his reciprocal tariff increases. During this pause, a flat 10% rate would apply to most imports. However, he explicitly excludes China from this suspension and instead raises tariffs on Chinese goods to 125%, following Beijing\'s retaliatory move.',
  icon: <Flag className="h-6 w-6 text-white" />,
  isHighlighted: true,
  country: 'us'
}, {
  date: 'Apr 9, 2025',
  title: 'Additional Tariffs Response',
  description: 'In a direct countermeasure, China imposes an additional 50% tariff on all U.S. exports effective April 10, raising its overall tariff rate to 84%. China\'s response comes within 12 hours of the U.S. implementation.',
  icon: <AlertTriangle className="h-6 w-6 text-white" />,
  isHighlighted: true,
  country: 'china'
}, {
  date: 'Apr 10, 2025',
  title: 'Total Tariff Clarification',
  description: 'The White House provides clarification, noting that the newly announced 125% tariff on Chinese imports is being added to a previously implemented 20% levy. This adjustment brings the total tariff burden on Chinese goods to 145%.',
  icon: <Flag className="h-6 w-6 text-white" />,
  country: 'us'
}, {
  date: 'Apr 11, 2025',
  title: 'Electronics Tariff Exemption',
  description: 'Trump\'s administration announces a temporary exemption for several categories of electronics, including smartphones, computers, and related devices. These exemptions apply to the 10% global baseline tariff and the broader import taxes imposed on Chinese goods. However, electronic items from China still face the 20% tariff linked to fentanyl enforcement.',
  icon: <Flag className="h-6 w-6 text-white" />,
  country: 'global'
}, {
  date: 'Apr 11, 2025',
  title: 'Total Tariff Increase',
  description: 'China raises its total duties on all U.S. goods to 125%.',
  icon: <AlertTriangle className="h-6 w-6 text-white" />,
  isHighlighted: true,
  country: 'china'
}, {
  date: 'Apr 13, 2025',
  title: 'Tech Tariff Consideration',
  description: 'Trump signals that the recent exemptions for electronics may be temporary. He states that new tariffs are being considered on computer chips, indicating an escalation in tech-related trade restrictions.',
  icon: <Flag className="h-6 w-6 text-white" />,
  country: 'global'
}, {
  date: 'Apr 22, 2025',
  title: 'Diplomatic Stance',
  description: 'Trump says he\'s waiting for Xi to initiate talks and claims a "very good relationship."',
  icon: <Flag className="h-6 w-6 text-white" />,
  country: 'us'
}, {
  date: 'Apr 22, 2025',
  title: 'Diplomatic Strategy',
  description: 'Xi avoids direct talks, instead launches diplomatic outreach to other trade partners.',
  icon: <Flag className="h-6 w-6 text-white" />,
  country: 'china'
}, {
  date: 'Apr 23, 2025',
  title: 'Potential Tariff Reduction',
  description: 'Trump signals potential tariff reduction: base rate may drop from 145% to 50–65%, with strategic items still facing up to 100%.',
  icon: <TrendingUp className="h-6 w-6 text-white" />,
  isHighlighted: true,
  country: 'us'
}, {
  date: 'Apr 24, 2025',
  title: 'Negotiation Claims Denied',
  description: 'China\'s Ministry of Commerce denies Trump\'s claims of ongoing trade talks, stating that no negotiations are currently taking place between the two countries.',
  icon: <Flag className="h-6 w-6 text-white" />,
  country: 'china'
}, {
  date: 'Apr 29, 2025',
  title: 'Automotive Sector Relief',
  description: 'Two executive orders are signed by Trump, modifying how tariffs are applied to the automotive sector. The 25% auto tariffs will no longer be compounded with other tariffs, such as those on imported steel and aluminum, offering partial relief to affected automakers.',
  icon: <Flag className="h-6 w-6 text-white" />,
  country: 'global'
}, {
  date: 'Apr 30, 2025',
  title: 'Quiet Tariff Exemptions',
  description: 'China quietly notifies select firms — particularly those reliant on U.S. technologies — of exemptions from its 125% tariffs, using private outreach to ease trade tensions without a public announcement.',
  icon: <Flag className="h-6 w-6 text-white" />,
  country: 'china'
}];

// Sort events by date string
const sortedEvents = [...combinedUsChina].sort((a, b) => {
  // Parse date strings into comparable format (assuming format is 'MMM D, YYYY')
  const dateA = new Date(a.date);
  const dateB = new Date(b.date);
  return dateA.getTime() - dateB.getTime();
});

const TimelineComponent: React.FC<{
  events: TimelineEvent[];
}> = ({
  events
}) => {
  const [visibleCount, setVisibleCount] = useState(3);
  const visibleEvents = events.slice(0, visibleCount);
  const loadMore = () => {
    setVisibleCount(prev => Math.min(prev + 3, events.length));
  };
  return <div className="relative w-full">
      {/* Timeline center connector line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gray-300 to-gray-200" style={{
      zIndex: 0
    }}></div>

      <div className="w-full">
        {visibleEvents.map((event, index) => {
        const isLeftSide = event.country === 'us' || event.country === 'global';
        return <div key={index} className="relative flex mb-12 w-full">
              {/* Timeline node in center */}
              <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center shadow-sm", 
                  event.isHighlighted 
                    ? "bg-infomineo-gradient" 
                    : event.country === 'us' 
                      ? "bg-infomineo-blue" 
                      : event.country === 'global' 
                        ? "bg-green-500" 
                        : "bg-infomineo-red"
                )}>
                  {event.icon}
                </div>
              </div>
              
              {/* US/Global event on left, China event on right */}
              {isLeftSide ?
          // US/Global Event (Left)
          <>
                  <div className="w-1/2 pr-8">
                    <Card className={cn(
                      "border-l-4 hover:shadow-md transition-shadow duration-300",
                      event.country === 'us' ? "border-l-infomineo-blue" : "border-l-green-500"
                    )}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-2">
                          <span className={cn(
                            "text-sm font-semibold",
                            event.country === 'us' ? "text-infomineo-blue" : "text-green-600"
                          )}>{event.date}</span>
                          <span className={cn(
                            "text-xs font-bold px-2 py-1 rounded-full",
                            event.country === 'us' 
                              ? "bg-infomineo-blue/10 text-infomineo-blue" 
                              : "bg-green-500/10 text-green-600"
                          )}>
                            {event.country === 'us' ? "United States" : "Global"}
                          </span>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                        <p className="text-gray-600">{event.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="w-1/2"></div> {/* Empty right side */}
                </> :
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
                </>}
            </div>;
      })}
      </div>
      
      {/* Load More Button */}
      {visibleCount < events.length && <div className="flex justify-center mt-6">
          <Button onClick={loadMore} variant="outline" className="flex items-center gap-2">
            Load More <ChevronDown className="h-4 w-4" />
          </Button>
        </div>}
    </div>;
};
const Timeline: React.FC = () => {
  return <div className="max-w-4xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">A Closer Look at the Most Affected Economies</h2>
        <p className="text-gray-600 text-base">The Trump administration has framed its sweeping tariff strategy as a corrective response to long-standing imbalances in global trade. The top five sources of U.S. imports — Mexico, Canada, China, Switzerland, and Ireland — collectively account for nearly half of all inbound goods, a concentration Trump argues reflects systemic unfairness. With Canada, Mexico, and China alone representing over 40% of total U.S. trade in 2024, they have become central targets in the administration's tariff campaign. The result: a turbulent series of retaliations, negotiations, and policy reversals that are redefining America's trade relationships with its most vital economic partners.	</p>
      </div>

      <Tabs defaultValue="us-china" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-10">
          <TabsTrigger value="us-china">U.S. - China</TabsTrigger>
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
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              <span className="font-medium">Global</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-infomineo-red rounded-full"></div>
              <span className="font-medium">China</span>
            </div>
          </div>
          <TimelineComponent events={sortedEvents} />
        </TabsContent>
        
        {/* U.S. - European Union Tab Content - Empty for now */}
        <TabsContent value="us-eu">
          <div className="flex items-center justify-center py-16">
            <p className="text-lg text-gray-500 italic">Content coming soon for U.S. - European Union trade relations.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>;
};
export default Timeline;
