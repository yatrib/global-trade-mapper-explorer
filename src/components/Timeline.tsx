
import React, { useEffect, useRef } from 'react';
import { Flag } from 'lucide-react';

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
}

const timelineEvents: TimelineEvent[] = [
  {
    date: 'July 6, 2018',
    title: 'Initial U.S. Tariffs',
    description: 'U.S. imposes tariffs on $34B of Chinese goods.'
  },
  {
    date: 'August 23, 2018',
    title: 'China Retaliates',
    description: 'China retaliates with tariffs on $16B of U.S. goods.'
  },
  {
    date: 'May 10, 2019',
    title: 'Tariff Increase',
    description: 'U.S. raises tariffs to 25% on $200B.'
  },
  {
    date: 'January 15, 2020',
    title: 'Phase One Deal',
    description: 'Phase One trade deal signed.'
  },
  {
    date: 'Dec 2023 - Feb 2025',
    title: 'New Tariff Wave',
    description: 'Trump reimposes tariffs to 54%.'
  }
];

const Timeline: React.FC = () => {
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            entry.target.classList.remove('opacity-0');
          }
        });
      },
      { threshold: 0.1 }
    );

    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item) => observer.observe(item));

    return () => {
      timelineItems.forEach((item) => observer.unobserve(item));
    };
  }, []);

  return (
    <div ref={timelineRef} className="py-16 px-4 md:px-0">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
        Key Moments in the U.S.-China Trade War
      </h2>

      {/* Desktop timeline (horizontal) */}
      <div className="hidden md:flex overflow-x-auto pb-8 relative">
        <div className="flex space-x-8 min-w-max px-4">
          {timelineEvents.map((event, index) => (
            <div 
              key={index} 
              className="timeline-item opacity-0 flex flex-col items-center w-80"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="rounded-full bg-infomineo-gradient p-3 mb-4 hover:animate-glow transition-all">
                <Flag className="h-6 w-6 text-white" />
              </div>
              <div className="text-lg font-bold text-infomineo-blue">{event.date}</div>
              <h3 className="text-xl font-bold mt-2">{event.title}</h3>
              <p className="text-muted-foreground mt-2 text-center">{event.description}</p>
            </div>
          ))}
        </div>
        <div className="absolute h-0.5 bg-gradient-to-r from-infomineo-blue via-infomineo-light to-infomineo-red top-7 left-0 right-0 z-0 mx-16"></div>
      </div>

      {/* Mobile timeline (vertical) */}
      <div className="md:hidden relative">
        <div className="absolute w-0.5 bg-infomineo-gradient left-8 top-0 bottom-0 z-0"></div>
        {timelineEvents.map((event, index) => (
          <div 
            key={index} 
            className="timeline-item opacity-0 flex mb-10 relative"
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            <div className="absolute left-8 transform -translate-x-1/2 rounded-full bg-infomineo-gradient p-2 z-10 hover:animate-glow transition-all">
              <Flag className="h-4 w-4 text-white" />
            </div>
            <div className="ml-16">
              <div className="text-sm font-bold text-infomineo-blue">{event.date}</div>
              <h3 className="text-lg font-bold mt-1">{event.title}</h3>
              <p className="text-muted-foreground mt-1">{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
