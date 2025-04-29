
import React from 'react';
import { Flag, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  isHighlighted?: boolean;
}

const timelineEvents: TimelineEvent[] = [
  {
    date: 'July 6, 2018',
    title: 'U.S. Imposes Tariffs',
    description: 'U.S. imposes tariffs on $34B of Chinese goods.',
    icon: <Flag className="h-6 w-6 text-white" />,
    isHighlighted: true
  },
  {
    date: 'August 23, 2018',
    title: 'China Retaliates',
    description: 'China retaliates with tariffs on $16B of U.S. goods.',
    icon: <Flag className="h-6 w-6 text-white" />
  },
  {
    date: 'May 10, 2019',
    title: 'Tariff Increase',
    description: 'U.S. raises tariffs to 25% on $200B.',
    icon: <AlertTriangle className="h-6 w-6 text-white" />,
    isHighlighted: true
  },
  {
    date: 'January 15, 2020',
    title: 'Phase One Deal',
    description: 'Phase One trade deal signed between U.S. and China.',
    icon: <Flag className="h-6 w-6 text-white" />
  },
  {
    date: 'Dec 2023 - Feb 2025',
    title: 'Tariffs Reinstated',
    description: 'Trump reimposes tariffs to 54%.',
    icon: <AlertTriangle className="h-6 w-6 text-white" />,
    isHighlighted: true
  }
];

const Timeline: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Key Moments in the U.S.-China Trade War</h2>
        <p className="text-lg text-gray-600">Track the evolution of trade policies and their global impact</p>
      </div>

      <div className="relative flex flex-col items-center">
        {/* Timeline connector line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-infomineo-blue/30 to-infomineo-light/40" style={{ zIndex: 0 }}></div>

        <div className="w-full">
          {timelineEvents.map((event, index) => {
            const isEven = index % 2 === 0;
            
            return (
              <div 
                key={index} 
                className={`relative flex mb-12 ${isEven ? 'justify-start' : 'justify-end'} w-full`}
              >
                {/* Timeline node */}
                <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center shadow-sm transition-all duration-300",
                    event.isHighlighted ? "bg-infomineo-gradient" : "bg-infomineo-blue"
                  )}>
                    {event.icon}
                  </div>
                </div>
                
                {/* Content box */}
                <div className={cn(
                  "w-[calc(50%-2rem)] transition-all duration-300 hover:translate-y-[-2px]",
                  isEven ? "pr-8" : "pl-8"
                )}>
                  <div className="bg-white p-6 rounded-xl hover:bg-gray-50">
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
    </div>
  );
};

export default Timeline;
