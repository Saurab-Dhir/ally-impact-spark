import { useState, useEffect } from 'react';
import { ArrowUp, ArrowDown, TrendingUp } from 'lucide-react';
import AnimatedCounter from '../Shared/AnimatedCounter';
import { ContentCard } from '../ui/content-card';
import MetricsDialog from './MetricsDialog';
import preventionHero from '../../assets/prevention-hero.jpg';
import provideHero from '../../assets/provide-hero.jpg';
import prepareHero from '../../assets/prepare-hero.jpg';
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
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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

  const getHeroImage = (key: string) => {
    switch (key) {
      case 'prevention':
        return preventionHero;
      case 'provide':
        return provideHero;
      case 'prepare':
        return prepareHero;
      default:
        return preventionHero;
    }
  };

  const getCategoryDescription = (key: string) => {
    switch (key) {
      case 'prevention':
        return 'Protecting children through education, awareness, and community engagement';
      case 'provide':
        return 'Providing direct care, support, and rehabilitation services';
      case 'prepare':
        return 'Preparing survivors for independent and sustainable futures';
      default:
        return '';
    }
  };

  const handleCardClick = (category: Category) => {
    setSelectedCategory(category);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedCategory(null);
  };

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationTrigger(prev => prev + 1);
    }, 15000); // Update every 15 seconds

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="space-y-6 mx-[25px]">
      <div className="flex items-center justify-between mx-[15px]">
        <h2 className="text-2xl font-bold text-slate-900">2025 LIVE COUNT</h2>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span>Synced from Google Sheets</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(metrics).map(([key, category]) => (
          <ContentCard
            key={key}
            backgroundImage={getHeroImage(key)}
            title={category.title}
            description={getCategoryDescription(key)}
            icon={category.icon}
            onClick={() => handleCardClick(category)}
          />
        ))}
      </div>

      <MetricsDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        category={selectedCategory}
      />
    </div>
  );
};
export default MetricsGrid;