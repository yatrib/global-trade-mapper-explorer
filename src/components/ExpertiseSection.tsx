
import React, { useEffect } from 'react';
import { BarChart2, Globe, Handshake } from 'lucide-react';

interface ExpertiseItem {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const expertiseItems: ExpertiseItem[] = [
  {
    title: 'Data-Driven Insights',
    description: 'Comprehensive analysis based on robust economic data and industry patterns.',
    icon: <BarChart2 className="h-10 w-10 text-infomineo-light" />
  },
  {
    title: 'Global Reach',
    description: 'Coverage across all major economies with deep expertise in emerging markets.',
    icon: <Globe className="h-10 w-10 text-infomineo-light" />
  },
  {
    title: 'Tailored Solutions',
    description: 'Customized reports and strategic recommendations for your specific industry.',
    icon: <Handshake className="h-10 w-10 text-infomineo-light" />
  }
];

const ExpertiseSection: React.FC = () => {
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

    const expertiseItems = document.querySelectorAll('.expertise-item');
    expertiseItems.forEach((item) => observer.observe(item));

    return () => {
      expertiseItems.forEach((item) => observer.unobserve(item));
    };
  }, []);

  return (
    <div className="py-16 px-4 md:px-0 bg-infomineo-grey-100">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Why Trust Infomineo?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {expertiseItems.map((item, index) => (
            <div 
              key={index}
              className="expertise-item opacity-0 bg-white rounded-lg p-8 shadow-md flex flex-col items-center text-center transform transition-all duration-300 hover:shadow-lg hover:-translate-y-2"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="mb-6 p-4 rounded-full bg-infomineo-gradient">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold mb-4">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExpertiseSection;
