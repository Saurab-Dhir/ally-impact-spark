import React, { useState, useEffect } from 'react';
import { ArrowUp, ArrowDown, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import AnimatedCounter from '../Shared/AnimatedCounter';
import SparklineChart from './SparklineChart';
import { getIconForCategory } from './MetricIcons';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface MetricData {
  nepal?: number;
  cambodia?: number;
  makwa?: number;
  total: number;
  lifetime?: number;
}

interface MetricCardProps {
  title: string;
  value: MetricData;
  category: 'prevention' | 'provide' | 'prepare';
  trend?: number[];
  isNew?: boolean;
  showCelebration?: boolean;
  className?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  category,
  trend = [10, 15, 12, 18, 22, 25, value.total || 0],
  isNew = false,
  showCelebration = false,
  className
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isPulsing, setIsPulsing] = useState(isNew);
  const Icon = getIconForCategory(category);
  
  const categoryColors = {
    prevention: { primary: '#8B5CF6', secondary: '#7C3AED', light: '#F3F4F6' },
    provide: { primary: '#14B8A6', secondary: '#0D9488', light: '#F0FDFA' },
    prepare: { primary: '#FB923C', secondary: '#EA580C', light: '#FFF7ED' }
  };
  
  const colors = categoryColors[category];

  // Celebration effect
  useEffect(() => {
    if (showCelebration) {
      const timer = setTimeout(() => setIsPulsing(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showCelebration]);

  const changeIndicator = trend.length > 1 ? 
    ((trend[trend.length - 1] - trend[trend.length - 2]) / trend[trend.length - 2]) * 100 : 0;

  return (
    <TooltipProvider>
      <div 
        className={cn(
          "group relative h-[180px] cursor-pointer perspective-1000",
          className
        )}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Card Container */}
        <div className={cn(
          "relative w-full h-full transition-transform duration-700 preserve-3d",
          isFlipped && "rotate-y-180"
        )}>
          
          {/* Front Side */}
          <div className={cn(
            "absolute inset-0 backface-hidden rounded-2xl overflow-hidden",
            "bg-white shadow-lg hover:shadow-xl transition-all duration-300",
            "border-t-4 hover:-translate-y-1",
            isPulsing && "animate-pulse shadow-lg",
            category === 'prevention' && "border-t-[#8B5CF6]",
            category === 'provide' && "border-t-[#14B8A6]", 
            category === 'prepare' && "border-t-[#FB923C]"
          )}>
            
            {/* Icon Background */}
            <div className="absolute top-4 right-4 w-16 h-16 rounded-full opacity-10"
                 style={{ 
                   background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` 
                 }}>
            </div>
            
            {/* Icon */}
            <div className="absolute top-6 right-6 z-10">
              <Icon className="w-12 h-12" />
            </div>
            
            {/* Content */}
            <div className="p-6 h-full flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-medium text-slate-600 mb-2 uppercase tracking-wide">
                  {title}
                </h3>
                
                <div className="flex items-baseline gap-2 mb-1">
                  <AnimatedCounter 
                    value={value.total || 0} 
                    className="text-4xl font-bold text-slate-900"
                  />
                  {changeIndicator !== 0 && (
                    <div className={cn(
                      "flex items-center text-sm font-medium",
                      changeIndicator > 0 ? "text-green-600" : "text-red-600"
                    )}>
                      {changeIndicator > 0 ? 
                        <ArrowUp className="w-3 h-3 mr-1" /> : 
                        <ArrowDown className="w-3 h-3 mr-1" />
                      }
                      {Math.abs(changeIndicator).toFixed(1)}%
                    </div>
                  )}
                </div>
                
                {value.lifetime && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center text-xs text-slate-500">
                        <span>/ {value.lifetime.toLocaleString()} lifetime</span>
                        <Info className="w-3 h-3 ml-1" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Total since program inception</p>
                    </TooltipContent>
                  </Tooltip>
                )}
              </div>
              
              {/* Sparkline */}
              <div className="mt-4">
                <SparklineChart 
                  data={trend} 
                  color={colors.primary}
                  className="opacity-60 group-hover:opacity-100 transition-opacity"
                />
              </div>
            </div>
            
            {/* Celebration overlay */}
            {showCelebration && (
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 animate-pulse" />
            )}
          </div>
          
          {/* Back Side */}
          <div className={cn(
            "absolute inset-0 backface-hidden rotate-y-180 rounded-2xl overflow-hidden",
            "bg-gradient-to-br shadow-lg",
            category === 'prevention' && "from-[#8B5CF6] to-[#7C3AED]",
            category === 'provide' && "from-[#14B8A6] to-[#0D9488]",
            category === 'prepare' && "from-[#FB923C] to-[#EA580C]"
          )}>
            <div className="p-6 h-full flex flex-col justify-between text-white">
              <div>
                <h3 className="text-lg font-semibold mb-4">{title} Breakdown</h3>
                
                {/* Location breakdown */}
                <div className="space-y-3">
                  {value.nepal !== undefined && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm opacity-90">Nepal</span>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-white/20 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-white/60 rounded-full transition-all duration-1000"
                            style={{ width: `${(value.nepal / value.total) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium w-8 text-right">{value.nepal}</span>
                      </div>
                    </div>
                  )}
                  
                  {value.cambodia !== undefined && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm opacity-90">Cambodia</span>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-white/20 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-white/60 rounded-full transition-all duration-1000"
                            style={{ width: `${(value.cambodia / value.total) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium w-8 text-right">{value.cambodia}</span>
                      </div>
                    </div>
                  )}
                  
                  {value.makwa !== undefined && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm opacity-90">Canada</span>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-white/20 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-white/60 rounded-full transition-all duration-1000"
                            style={{ width: `${(value.makwa / value.total) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium w-8 text-right">{value.makwa}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="text-xs opacity-75 text-center">
                Click to flip back
              </div>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default MetricCard;