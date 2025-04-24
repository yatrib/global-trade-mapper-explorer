
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
  
  let trendColor = 'text-gray-400';
  let trendIcon = '→';
  
  if (trend === 'up') {
    trendColor = 'text-green-500';
    trendIcon = '↑';
  } else if (trend === 'down') {
    trendColor = 'text-red-500';
    trendIcon = '↓';
  }

  return (
    <Card className={`${className} overflow-hidden`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{formattedValue}</div>
        {helpText && (
          <p className={`text-xs ${trendColor} flex items-center gap-1 mt-1`}>
            <span>{trendIcon}</span> {helpText}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default StatCard;
