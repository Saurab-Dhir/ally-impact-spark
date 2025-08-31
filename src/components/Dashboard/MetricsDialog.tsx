import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ArrowUp } from 'lucide-react';
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

interface MetricsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  category: Category | null;
}

const MetricsDialog = ({ isOpen, onClose, category }: MetricsDialogProps) => {
  if (!category) return null;

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

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-2xl">
            <span className="text-3xl">{category.icon}</span>
            <span>{category.title} Metrics</span>
            <div className="flex items-center gap-2 text-sm text-muted-foreground font-normal">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span>Live Data</span>
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-6 mt-6">
          {Object.entries(category.stats).map(([statKey, statValue]) => (
            <div key={statKey} className="p-6 border rounded-lg bg-card">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-card-foreground">
                  {formatStatName(statKey)}
                </h3>
                {statValue.total > 0 && <ArrowUp className="w-4 h-4 text-green-500" />}
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* Total and Lifetime */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <span className="text-sm font-medium text-muted-foreground">Current Total</span>
                    <AnimatedCounter 
                      value={statValue.total || 0} 
                      className="text-2xl font-bold" 
                    />
                  </div>
                  
                  {statValue.lifetime && (
                    <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                      <span className="text-sm font-medium text-muted-foreground">Lifetime Total</span>
                      <AnimatedCounter 
                        value={statValue.lifetime} 
                        className="text-xl font-semibold text-muted-foreground" 
                      />
                    </div>
                  )}
                </div>
                
                {/* Location breakdown */}
                {(statValue.nepal || statValue.cambodia || statValue.makwa) && (
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-muted-foreground mb-3">By Location</h4>
                    
                    {statValue.nepal !== undefined && (
                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <span className="text-sm font-medium text-blue-700">🇳🇵 Nepal</span>
                        <AnimatedCounter 
                          value={statValue.nepal} 
                          className="font-semibold text-blue-700" 
                        />
                      </div>
                    )}
                    
                    {statValue.cambodia !== undefined && (
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <span className="text-sm font-medium text-green-700">🇰🇭 Cambodia</span>
                        <AnimatedCounter 
                          value={statValue.cambodia} 
                          className="font-semibold text-green-700" 
                        />
                      </div>
                    )}
                    
                    {statValue.makwa !== undefined && (
                      <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                        <span className="text-sm font-medium text-red-700">🇨🇦 Canada</span>
                        <AnimatedCounter 
                          value={statValue.makwa} 
                          className="font-semibold text-red-700" 
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MetricsDialog;