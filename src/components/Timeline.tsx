
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

      {/* Vertical timeline (for all devices) */}
      <div className="relative max-w-3xl mx-auto">
        <div className="absolute w-0.5 bg-gradient-to-b from-infomineo-blue via-infomineo-light to-infomineo-red left-0 md:left-1/2 top-0 bottom-0 z-0 transform md:-translate-x-1/2"></div>
        
        {timelineEvents.map((event, index) => (
          <div 
            key={index} 
            className="timeline-item opacity-0 mb-16 relative"
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            <div className={`flex ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center`}>
              {/* Timeline point */}
              <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 rounded-full bg-infomineo-gradient p-3 shadow-lg hover:scale-110 transition-all duration-300 z-10">
                <Flag className="h-5 w-5 text-white" />
              </div>
              
              {/* Content */}
              <div className={`w-full md:w-[calc(50%-2rem)] ${index % 2 === 0 ? 'md:pr-12 ml-10 md:ml-0' : 'md:pl-12 ml-10 md:ml-0'}`}>
                <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100">
                  <div className="text-sm font-bold text-infomineo-blue">{event.date}</div>
                  <h3 className="text-xl font-bold mt-1">{event.title}</h3>
                  <p className="text-muted-foreground mt-2">{event.description}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
