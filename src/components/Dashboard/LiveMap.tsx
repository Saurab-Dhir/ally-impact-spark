import { useState, useEffect } from 'react';
import { MapPin, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Location {
  id: string;
  name: string;
  country: string;
  coordinates: [number, number];
  active: boolean;
  recentActivity: string;
  impactCount: number;
}

const LiveMap = () => {
  const [pulsingLocations, setPulsingLocations] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  // Ally's actual locations
  const locations: Location[] = [
    {
      id: 'nepal',
      name: 'Kathmandu',
      country: 'Nepal',
      coordinates: [27.7172, 85.3240],
      active: true,
      recentActivity: '3 children rescued from brick kilns',
      impactCount: 1106
    },
    {
      id: 'cambodia',
      name: 'Phnom Penh',
      country: 'Cambodia',
      coordinates: [11.5564, 104.9282],
      active: true,
      recentActivity: 'Prevention workshop completed at local school',
      impactCount: 983
    },
    {
      id: 'canada',
      name: 'Thunder Bay',
      country: 'Canada',
      coordinates: [48.3809, -89.2477],
      active: true,
      recentActivity: 'Community leader training session',
      impactCount: 635
    }
  ];

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      const randomLocation = locations[Math.floor(Math.random() * locations.length)];
      triggerPulse(randomLocation.id);
    }, 8000);
    
    return () => clearInterval(interval);
  }, []);

  const triggerPulse = (locationId: string) => {
    setPulsingLocations(prev => [...prev, locationId]);
    setTimeout(() => {
      setPulsingLocations(prev => prev.filter(l => l !== locationId));
    }, 3000);
  };

  return (
    <div className="bg-white rounded-2xl shadow-card border border-slate-100 overflow-hidden">
      
      {/* Simplified map visualization */}
      <div className="relative h-96 bg-gradient-to-br from-blue-50 to-slate-100 overflow-hidden">
        {/* World map background pattern */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 800 400">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#cbd5e1" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Location markers */}
        {locations.map((location, index) => {
          const isPulsing = pulsingLocations.includes(location.id);
          const isSelected = selectedLocation === location.id;
          
          return (
            <div key={location.id}>
              {/* Location marker */}
              <button
                onClick={() => setSelectedLocation(isSelected ? null : location.id)}
                className={cn(
                  "absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300",
                  "hover:scale-110 focus:outline-none focus:ring-4 focus:ring-primary/20 rounded-full"
                )}
                style={{
                  left: `${25 + (index * 25)}%`,
                  top: `${40 + (index * 15)}%`
                }}
              >
                <div className="relative">
                  {/* Base marker */}
                  <div className={cn(
                    "w-6 h-6 rounded-full border-2 border-white shadow-lg transition-all duration-300",
                    location.active ? "bg-primary" : "bg-slate-400",
                    isSelected && "scale-125 ring-4 ring-primary/30"
                  )}>
                    <MapPin className="w-3 h-3 text-white absolute inset-0 m-auto" />
                  </div>
                  
                  {/* Pulsing animation */}
                  {isPulsing && (
                    <>
                      <div className="absolute inset-0 w-6 h-6 bg-primary rounded-full animate-map-pulse opacity-40" />
                      <div className="absolute inset-0 w-6 h-6 bg-primary rounded-full animate-map-pulse opacity-20" 
                           style={{ animationDelay: '0.5s' }} />
                    </>
                  )}
                </div>
              </button>

              {/* Location popup */}
              {isSelected && (
                <div 
                  className="absolute z-10 bg-white rounded-lg shadow-soft border border-slate-200 p-4 min-w-64 animate-scale-in"
                  style={{
                    left: `${25 + (index * 25)}%`,
                    top: `${20 + (index * 15)}%`,
                    transform: 'translateX(-50%)'
                  }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-3 h-3 bg-primary rounded-full" />
                    <div>
                      <h4 className="font-bold text-slate-900">{location.name}</h4>
                      <p className="text-sm text-muted-foreground">{location.country}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">Impact This Year:</span>
                      <span className="font-bold text-primary">{location.impactCount.toLocaleString()}</span>
                    </div>
                    
                    <div className="pt-2 border-t border-slate-100">
                      <p className="text-sm text-slate-700 font-medium">Recent Activity:</p>
                      <p className="text-sm text-muted-foreground mt-1">{location.recentActivity}</p>
                    </div>
                  </div>
                  
                  {/* Arrow pointer */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 -translate-y-1">
                    <div className="w-3 h-3 bg-white border-b border-r border-slate-200 transform rotate-45" />
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Activity feed overlay */}
        {pulsingLocations.length > 0 && (
          <div className="absolute top-4 right-4 bg-primary/90 text-white px-4 py-2 rounded-lg shadow-lg animate-slide-in-right">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              <span className="text-sm font-medium">New activity detected</span>
            </div>
          </div>
        )}
      </div>

      {/* Location summary */}
      <div className="p-6 bg-slate-50 border-t border-slate-200">
        <div className="grid grid-cols-3 gap-4">
          {locations.map((location) => (
            <div key={location.id} className="text-center">
              <div className="font-bold text-lg text-slate-900">
                {location.impactCount.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">{location.country}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LiveMap;