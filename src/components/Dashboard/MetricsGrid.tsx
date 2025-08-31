import { useState, useEffect } from 'react';
import { TrendingUp } from 'lucide-react';
import MetricCard from './MetricCard';
import { Skeleton } from '@/components/ui/skeleton';
interface MetricData {
  nepal?: number;
  cambodia?: number;
  makwa?: number;
  total: number;
  lifetime?: number;
}
interface CategoryStats {
  [key: string]: MetricData;
}
interface Category {
  title: string;
  color: 'prevention' | 'provide' | 'prepare';
  icon: string;
  stats: CategoryStats;
}
const MetricsGrid = () => {
  const [animationTrigger, setAnimationTrigger] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [celebrateMetrics, setCelebrateMetrics] = useState<Set<string>>(new Set());

  // Exact data from Ally's spreadsheet
  const metrics: {
    [key: string]: Category;
  } = {
    prevention: {
      title: "Prevention",
      color: "prevention",
      icon: "🛡️",
      stats: {
        individualsReached: {
          nepal: 1106,
          cambodia: 983,
          makwa: 635,
          total: 2724,
          lifetime: 37203
        },
        scholarships: {
          nepal: 683,
          cambodia: 191,
          makwa: 0,
          total: 874,
          lifetime: 10495
        },
        schoolsReached: {
          nepal: 8,
          cambodia: 1,
          makwa: 0,
          total: 9
        },
        communitiesEngaged: {
          nepal: 7,
          cambodia: 18,
          makwa: 9,
          total: 34
        },
        presentations: {
          nepal: 8,
          cambodia: 0,
          makwa: 20,
          total: 28
        },
        communityLeaders: {
          nepal: 0,
          cambodia: 0,
          makwa: 18,
          total: 18
        }
      }
    },
    provide: {
      title: "Provide",
      color: "provide",
      icon: "🤝",
      stats: {
        safeSchooling: {
          nepal: 335,
          cambodia: 71,
          total: 406,
          lifetime: 539
        },
        universityScholarships: {
          nepal: 8,
          cambodia: 7,
          total: 15,
          lifetime: 104
        },
        vocationalTraining: {
          nepal: 13,
          cambodia: 80,
          total: 93
        },
        traumaInformedCare: {
          nepal: 184,
          cambodia: 72,
          total: 256,
          lifetime: 328
        },
        safeHomes: {
          nepal: 139,
          cambodia: 67,
          total: 206
        },
        newSurvivors: {
          nepal: 23,
          cambodia: 5,
          total: 28
        },
        traumaCare: {
          nepal: 25,
          cambodia: 15,
          total: 40
        },
        totalStaff: {
          nepal: 138,
          cambodia: 38,
          total: 176
        },
        counselling: {
          nepal: 158,
          cambodia: 12,
          total: 170
        }
      }
    },
    prepare: {
      title: "Prepare",
      color: "prepare",
      icon: "🎯",
      stats: {
        financialAssistance: {
          nepal: 15,
          cambodia: 0,
          total: 15,
          lifetime: 259
        },
        reintegratedFamily: {
          nepal: 7,
          cambodia: 1,
          total: 8
        },
        repatriated: {
          total: 0
        }
      }
    }
  };
  const formatStatName = (key: string): string => {
    const nameMap: {
      [key: string]: string;
    } = {
      individualsReached: "Individuals Reached",
      scholarships: "Scholarships Provided",
      schoolsReached: "Schools Reached",
      communitiesEngaged: "Communities Engaged",
      presentations: "Presentations Given",
      communityLeaders: "Community Leaders",
      safeSchooling: "Safe Schooling",
      universityScholarships: "University Scholarships",
      vocationalTraining: "Vocational Training",
      traumaInformedCare: "Trauma-Informed Care",
      safeHomes: "Safe Homes",
      newSurvivors: "New Survivors",
      traumaCare: "Trauma Care",
      totalStaff: "Total Staff",
      counselling: "Counselling Sessions",
      financialAssistance: "Financial Assistance",
      reintegratedFamily: "Family Reintegration",
      repatriated: "Repatriated"
    };
    return nameMap[key] || key;
  };

  // Simulate loading and live updates
  useEffect(() => {
    // Initial loading
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    // Live updates with celebration detection  
    const interval = setInterval(() => {
      setAnimationTrigger(prev => prev + 1);
      
      // Randomly trigger celebrations for demo
      if (Math.random() > 0.8) {
        const categories = Object.keys(metrics);
        const randomCategory = categories[Math.floor(Math.random() * categories.length)];
        const stats = Object.keys(metrics[randomCategory].stats);
        const randomStat = stats[Math.floor(Math.random() * stats.length)];
        const metricKey = `${randomCategory}-${randomStat}`;
        
        setCelebrateMetrics(prev => new Set([...prev, metricKey]));
        
        // Clear celebration after 3 seconds
        setTimeout(() => {
          setCelebrateMetrics(prev => {
            const newSet = new Set(prev);
            newSet.delete(metricKey);
            return newSet;
          });
        }, 3000);
      }
    }, 15000);

    return () => {
      clearTimeout(loadingTimer);
      clearInterval(interval);
    };
  }, [metrics]);
  if (isLoading) {
    return (
      <div className="space-y-6 mx-[25px]">
      <div className="flex items-center justify-between mx-[15px] mt-6">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-6 w-32" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="space-y-4">
              {[...Array(6)].map((_, j) => (
                <Skeleton key={j} className="h-[180px] w-full rounded-2xl" />
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 mx-[25px]">
      <div className="flex items-center justify-between mx-[15px] mt-6">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
          Impact Metrics
        </h2>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <TrendingUp className="w-4 h-4 animate-pulse" />
          <span>Live Dashboard</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {Object.entries(metrics).map(([categoryKey, category]) => (
          <div key={categoryKey} className="space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-2 rounded-lg ${
                categoryKey === 'prevention' ? 'bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED]' :
                categoryKey === 'provide' ? 'bg-gradient-to-r from-[#14B8A6] to-[#0D9488]' :
                'bg-gradient-to-r from-[#FB923C] to-[#EA580C]'
              }`}>
                <span className="text-white text-lg">{category.icon}</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-800">{category.title}</h3>
            </div>
            
            <div className="space-y-4">
              {Object.entries(category.stats).map(([statKey, statValue]) => {
                const metricKey = `${categoryKey}-${statKey}`;
                const shouldCelebrate = celebrateMetrics.has(metricKey);
                
                return (
                  <MetricCard
                    key={`${statKey}-${animationTrigger}`}
                    title={formatStatName(statKey)}
                    value={statValue}
                    category={category.color}
                    isNew={animationTrigger === 0}
                    showCelebration={shouldCelebrate}
                    className="hover:scale-[1.02] transition-transform duration-200"
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default MetricsGrid;