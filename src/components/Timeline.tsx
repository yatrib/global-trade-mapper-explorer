
import React from 'react';
import { Flag, AlertTriangle } from 'lucide-react';

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const timelineEvents: TimelineEvent[] = [
  {
    date: 'July 6, 2018',
    title: 'U.S. Imposes Tariffs',
    description: 'U.S. imposes tariffs on $34B of Chinese goods.',
    icon: <Flag className="h-6 w-6 text-white" />
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
    icon: <AlertTriangle className="h-6 w-6 text-white" />
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
    icon: <AlertTriangle className="h-6 w-6 text-white" />
  }
];

const Timeline: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12 animate-on-scroll opacity-0">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Key Moments in the U.S.-China Trade War</h2>
        <p className="text-lg text-muted-foreground">Track the evolution of trade policies and their global impact</p>
      </div>

      <div className="relative">
        {/* Timeline connector line */}
        <div className="absolute left-4 md:left-6 top-0 bottom-0 w-0.5 bg-infomineo-blue/30" style={{ zIndex: 0 }}></div>

        <div className="space-y-12">
          {timelineEvents.map((event, index) => (
            <div 
              key={index} 
              className={`relative flex animate-on-scroll opacity-0`} 
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="flex-shrink-0 w-8 md:w-12 h-8 md:h-12 rounded-full bg-infomineo-gradient flex items-center justify-center z-10 shadow-glow">
                {event.icon}
              </div>
              <div className="ml-6 md:ml-8 pb-2">
                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
                  <span className="text-sm font-bold text-infomineo-light inline-block mb-2">{event.date}</span>
                  <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                  <p className="text-gray-600">{event.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
