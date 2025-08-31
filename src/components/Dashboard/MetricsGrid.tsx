import { useState, useEffect } from 'react';
import { ArrowUp, ArrowDown, TrendingUp } from 'lucide-react';
import AnimatedCounter from '../Shared/AnimatedCounter';
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

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationTrigger(prev => prev + 1);
    }, 15000); // Update every 15 seconds

    return () => clearInterval(interval);
  }, []);
  return <div className="space-y-6 mx-[25px]">
      <div className="flex items-center justify-between mx-[15px]">
        <h2 className="text-2xl font-bold text-slate-900">Impact Metrics</h2>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <TrendingUp className="w-4 h-4" />
          <span>Updated in real-time</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(metrics).map(([key, category]) => <div key={key} className="bg-white rounded-2xl shadow-card overflow-hidden border border-slate-100 hover:shadow-soft transition-all duration-300">
            {/* Category Header */}
            
            
            {/* Metrics */}
            <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
              {Object.entries(category.stats).map(([statKey, statValue]) => <div key={statKey} className="group">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900 transition-colors">
                      {formatStatName(statKey)}
                    </span>
                    {statValue.total > 0 && <ArrowUp className="w-3 h-3 text-green-500" />}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AnimatedCounter value={statValue.total || 0} className="text-xl font-bold text-slate-900" key={`${statKey}-${animationTrigger}`} />
                      {statValue.lifetime && <span className="text-xs text-muted-foreground">
                          / {statValue.lifetime.toLocaleString()} lifetime
                        </span>}
                    </div>
                  </div>

                  {/* Location breakdown */}
                  {(statValue.nepal || statValue.cambodia || statValue.makwa) && <div className="mt-2 pt-2 border-t border-slate-100">
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        {statValue.nepal !== undefined && <div className="text-center">
                            <div className="font-medium text-slate-600">{statValue.nepal}</div>
                            <div className="text-muted-foreground">Nepal</div>
                          </div>}
                        {statValue.cambodia !== undefined && <div className="text-center">
                            <div className="font-medium text-slate-600">{statValue.cambodia}</div>
                            <div className="text-muted-foreground">Cambodia</div>
                          </div>}
                        {statValue.makwa !== undefined && <div className="text-center">
                            <div className="font-medium text-slate-600">{statValue.makwa}</div>
                            <div className="text-muted-foreground">Canada</div>
                          </div>}
                      </div>
                    </div>}
                </div>)}
            </div>
          </div>)}
      </div>
    </div>;
};
export default MetricsGrid;