import { useState, useEffect } from 'react';
import { Clock, MapPin } from 'lucide-react';

interface Update {
  id: number;
  type: 'rescue' | 'education' | 'reintegration' | 'prevention' | 'community';
  location: string;
  message: string;
  time: string;
  urgent: boolean;
  count?: number;
}

const RealtimeUpdates = () => {
  const [updates, setUpdates] = useState<Update[]>([]);

  const mockUpdates: Update[] = [
    { 
      id: 1, 
      type: 'rescue', 
      location: 'Nepal', 
      message: '3 children rescued from brick kiln operation', 
      time: '2 min ago', 
      urgent: true,
      count: 3
    },
    { 
      id: 2, 
      type: 'education', 
      location: 'Cambodia', 
      message: '45 students attended prevention workshop at local school', 
      time: '8 min ago',
      urgent: false,
      count: 45
    },
    { 
      id: 3, 
      type: 'reintegration', 
      location: 'Nepal', 
      message: 'Survivor successfully reunited with family after 6 months', 
      time: '15 min ago',
      urgent: false
    },
    { 
      id: 4, 
      type: 'community', 
      location: 'Thunder Bay', 
      message: 'Community leader training session completed with 18 participants', 
      time: '22 min ago',
      urgent: false,
      count: 18
    },
    { 
      id: 5, 
      type: 'prevention', 
      location: 'Cambodia', 
      message: 'Mobile outreach team reached remote village', 
      time: '35 min ago',
      urgent: false
    }
  ];

  // Simulate incoming updates
  useEffect(() => {
    // Start with first update
    setUpdates([mockUpdates[0]]);

    // Add updates progressively
    mockUpdates.slice(1).forEach((update, index) => {
      setTimeout(() => {
        setUpdates(prev => [update, ...prev].slice(0, 10));
      }, (index + 1) * 5000); // Stagger by 5 seconds
    });

    // Continue adding random updates
    const interval = setInterval(() => {
      const randomUpdate = mockUpdates[Math.floor(Math.random() * mockUpdates.length)];
      const newUpdate = {
        ...randomUpdate,
        id: Date.now(),
        time: 'Just now'
      };
      
      setUpdates(prev => [newUpdate, ...prev].slice(0, 10));
    }, 20000); // Every 20 seconds

    return () => clearInterval(interval);
  }, []);

  const getUpdateIcon = (type: Update['type']): string => {
    const icons = {
      rescue: '🚨',
      education: '📚',
      reintegration: '🏠',
      prevention: '🛡️',
      community: '👥'
    };
    return icons[type] || '📌';
  };

  const getUpdateColor = (type: Update['type']): string => {
    const colors = {
      rescue: 'border-red-200 bg-red-50 text-red-800',
      education: 'border-blue-200 bg-blue-50 text-blue-800',
      reintegration: 'border-green-200 bg-green-50 text-green-800',
      prevention: 'border-purple-200 bg-purple-50 text-purple-800',
      community: 'border-orange-200 bg-orange-50 text-orange-800'
    };
    return colors[type] || 'border-slate-200 bg-slate-50 text-slate-800';
  };

  return (
    <div className="bg-white rounded-2xl shadow-card border border-slate-100">
      <div className="p-6 border-b border-slate-100">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">Live Updates</h3>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-green-600">Real-time</span>
          </div>
        </div>
      </div>
      
      <div className="max-h-96 overflow-y-auto">
        {updates.length === 0 ? (
          <div className="p-6 text-center text-muted-foreground">
            <Clock className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">Waiting for updates...</p>
          </div>
        ) : (
          <div className="p-6 space-y-3">
            {updates.map((update, index) => (
              <div
                key={`${update.id}-${index}`}
                className={`
                  p-4 rounded-lg border transition-all duration-300 hover:shadow-sm
                  ${update.urgent 
                    ? 'border-red-200 bg-red-50 animate-pulse' 
                    : getUpdateColor(update.type)
                  }
                  ${index === 0 ? 'animate-slide-in-right' : ''}
                `}
              >
                <div className="flex items-start gap-3">
                  <div className="text-xl flex-shrink-0 mt-0.5">
                    {getUpdateIcon(update.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <MapPin className="w-3 h-3 opacity-60" />
                      <span className="text-xs font-medium opacity-80">
                        {update.location}
                      </span>
                      <span className="text-xs opacity-60">•</span>
                      <span className="text-xs opacity-60">{update.time}</span>
                      {update.urgent && (
                        <span className="text-xs font-bold bg-red-200 text-red-800 px-2 py-0.5 rounded-full">
                          URGENT
                        </span>
                      )}
                    </div>
                    
                    <p className="text-sm font-medium leading-relaxed">
                      {update.message}
                    </p>
                    
                    {update.count && (
                      <div className="mt-2 inline-flex items-center gap-1 text-xs font-semibold bg-white/50 px-2 py-1 rounded-full">
                        <span className="w-1.5 h-1.5 bg-current rounded-full" />
                        {update.count} people impacted
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RealtimeUpdates;