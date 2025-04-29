
import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number | null;
  trend?: 'up' | 'down' | 'neutral';
  helpText?: string;
  className?: string;
  formatter?: (value: any) => string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  trend,
  helpText,
  className = "",
  formatter = (val) => val?.toString() || 'N/A'
}) => {
  const formattedValue = value !== null ? formatter(value) : 'N/A';
  
  let trendColor = 'text-gray-500';
  let trendIcon = '→';
  
  if (trend === 'up') {
    trendColor = 'text-emerald-500';
    trendIcon = '↑';
  } else if (trend === 'down') {
    trendColor = 'text-rose-500';
    trendIcon = '↓';
  }

  return (
    <div className={`${className} bg-gray-50 p-4 rounded-xl transition-all duration-300 hover:bg-white`}>
      <div className="text-sm font-medium text-gray-500 mb-1">{title}</div>
      <div className="text-2xl font-semibold text-gray-900">{formattedValue}</div>
      {helpText && (
        <p className={`text-xs ${trendColor} flex items-center gap-1 mt-1 font-medium`}>
          <span>{trendIcon}</span> {helpText}
        </p>
      )}
    </div>
  );
};

export default StatCard;
