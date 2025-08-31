import { useState, useEffect, useRef } from 'react';
import { MapPin, Activity, Key } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
// @ts-ignore
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

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
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [pulsingLocations, setPulsingLocations] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  // Ally's actual locations - Fixed coordinates to [lng, lat] format for Mapbox
  const locations: Location[] = [
    {
      id: 'nepal',
      name: 'Kathmandu',
      country: 'Nepal',
      coordinates: [85.3240, 27.7172], // [lng, lat]
      active: true,
      recentActivity: '3 children rescued from brick kilns',
      impactCount: 1106
    },
    {
      id: 'cambodia',
      name: 'Phnom Penh',
      country: 'Cambodia',
      coordinates: [104.9282, 11.5564], // [lng, lat]
      active: true,
      recentActivity: 'Prevention workshop completed at local school',
      impactCount: 983
    },
    {
      id: 'canada',
      name: 'Thunder Bay',
      country: 'Canada',
      coordinates: [-89.2477, 48.3809], // [lng, lat]
      active: true,
      recentActivity: 'Community leader training session',
      impactCount: 635
    }
  ];

  // Initialize Mapbox
  useEffect(() => {
    if (!mapContainer.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [30, 15], // Center of world view
      zoom: 1.5,
      projection: 'globe' as any
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
    map.current.scrollZoom.disable();

    map.current.on('load', () => {
      setIsMapLoaded(true);
      
      // Add atmosphere effect
      if (map.current) {
        map.current.setFog({
          color: 'rgb(186, 210, 235)',
          'high-color': 'rgb(36, 92, 223)',
          'horizon-blend': 0.02,
          'space-color': 'rgb(11, 11, 25)',
          'star-intensity': 0.6
        });
      }

      // Add markers for each location
      locations.forEach((location) => {
        if (!map.current) return;
        
        const marker = new mapboxgl.Marker({
          color: location.active ? '#00b7c4' : '#64748b',
          scale: 1.2
        })
          .setLngLat(location.coordinates)
          .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(`
            <div class="p-3">
              <h3 class="font-bold text-slate-900 mb-1">${location.name}</h3>
              <p class="text-sm text-slate-600 mb-2">${location.country}</p>
              <div class="space-y-1">
                <div class="flex justify-between text-sm">
                  <span>Impact This Year:</span>
                  <span class="font-bold" style="color: #00b7c4">${location.impactCount.toLocaleString()}</span>
                </div>
                <div class="pt-2 border-t border-slate-200">
                  <p class="text-xs text-slate-500">Recent Activity:</p>
                  <p class="text-sm text-slate-700">${location.recentActivity}</p>
                </div>
              </div>
            </div>
          `))
          .addTo(map.current);
      });
    });

    return () => {
      map.current?.remove();
    };
  }, [mapboxToken]);

  // Simulate live updates
  useEffect(() => {
    if (!isMapLoaded) return;
    
    const interval = setInterval(() => {
      const randomLocation = locations[Math.floor(Math.random() * locations.length)];
      triggerPulse(randomLocation.id);
    }, 8000);
    
    return () => clearInterval(interval);
  }, [isMapLoaded]);

  const triggerPulse = (locationId: string) => {
    setPulsingLocations(prev => [...prev, locationId]);
    setTimeout(() => {
      setPulsingLocations(prev => prev.filter(l => l !== locationId));
    }, 3000);
  };

  const handleTokenSubmit = () => {
    if (!mapboxToken.trim()) return;
    // Token will be used in the useEffect above
  };

  return (
    <div className="bg-white rounded-2xl shadow-card border border-slate-100 overflow-hidden">
      
      {/* Mapbox Token Input - Show if no token set */}
      {!mapboxToken && (
        <div className="p-6 border-b border-slate-200 bg-blue-50">
          <div className="flex items-center gap-3 mb-3">
            <Key className="w-5 h-5 text-blue-600" />
            <h3 className="font-medium text-blue-900">Mapbox Token Required</h3>
          </div>
          <p className="text-sm text-blue-700 mb-4">
            Enter your Mapbox public token to view the interactive world map. 
            Get yours at <a href="https://mapbox.com" target="_blank" rel="noopener noreferrer" className="underline">mapbox.com</a>
          </p>
          <div className="flex gap-2">
            <Input
              placeholder="pk.eyJ1IjoieW91ciIsImEiOiJjbGF1c..."
              value={mapboxToken}
              onChange={(e) => setMapboxToken(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleTokenSubmit} disabled={!mapboxToken.trim()}>
              Load Map
            </Button>
          </div>
        </div>
      )}

      {/* Interactive Mapbox Map */}
      <div className="relative h-96 overflow-hidden">
        {mapboxToken ? (
          <>
            <div ref={mapContainer} className="absolute inset-0" />
            
            {/* Activity feed overlay */}
            {pulsingLocations.length > 0 && (
              <div className="absolute top-4 right-4 bg-primary/90 text-white px-4 py-2 rounded-lg shadow-lg animate-slide-in-right z-10">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  <span className="text-sm font-medium">New activity detected</span>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="flex items-center justify-center h-full bg-slate-100">
            <div className="text-center text-slate-500">
              <MapPin className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>Enter Mapbox token to view interactive map</p>
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