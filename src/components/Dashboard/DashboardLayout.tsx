import { useState, useEffect } from 'react';
import { Globe, Settings, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import MetricsGrid from './MetricsGrid';
import VoiceRecorder from '../DataCapture/VoiceRecorder';
import LiveMap from './LiveMap';
import RealtimeUpdates from './RealtimeUpdates';
import PhotoUploader from '../DataCapture/PhotoUploader';
import QuickForms from '../DataCapture/QuickForms';

type ViewMode = 'public' | 'donor' | 'partner' | 'hq';

const DashboardLayout = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('hq');
  const [demoMode, setDemoMode] = useState(false);

  const startDemo = () => {
    setDemoMode(true);
    // Demo sequence for hackathon presentation
    setTimeout(() => setDemoMode(false), 60000); // 1 minute demo
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50 shadow-soft">
        <div className="px-6 py-4 flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">
                Ally Impact Intelligence Hub
              </h1>
              <p className="text-sm text-muted-foreground">
                Anti-Trafficking Data Platform
              </p>
            </div>
            
            {/* Live indicator */}
            <div className="flex items-center gap-2 px-3 py-1 bg-green-50 rounded-full border border-green-200">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-green-700">Live</span>
            </div>
          </div>
          
          {/* Controls */}
          <div className="flex items-center gap-4">
            {/* View Mode Switcher */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">View as:</span>
              <select 
                value={viewMode} 
                onChange={(e) => setViewMode(e.target.value as ViewMode)}
                className="px-3 py-1.5 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="public">Public View</option>
                <option value="donor">Donor Dashboard</option>
                <option value="partner">Partner Portal</option>
                <option value="hq">HQ Control Center</option>
              </select>
            </div>

            {/* Demo Mode Toggle */}
            <button
              onClick={startDemo}
              className={cn(
                "px-4 py-2 rounded-lg font-medium transition-all",
                demoMode 
                  ? "bg-accent text-accent-foreground animate-glow" 
                  : "bg-primary text-primary-foreground hover:bg-primary/90"
              )}
            >
              <Zap className="w-4 h-4 mr-2 inline" />
              {demoMode ? "Demo Active" : "Start Demo"}
            </button>

            <button className="p-2 rounded-lg hover:bg-slate-100 transition-colors">
              <Settings className="w-5 h-5 text-slate-600" />
            </button>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Welcome Banner */}
        <div className="mb-8 p-6 bg-gradient-hero rounded-2xl text-white shadow-soft">
          <h2 className="text-2xl font-bold mb-2">
            Welcome to the Impact Intelligence Hub
          </h2>
          <p className="text-white/90">
            Real-time tracking of anti-trafficking efforts across Nepal, Cambodia, and Canada
          </p>
          <div className="mt-4 flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-white/30 rounded-full" />
              <span>3 Active Locations</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-white/30 rounded-full" />
              <span>2,724 Lives Impacted This Year</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-white/30 rounded-full" />
              <span>37K+ Lifetime Impact</span>
            </div>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-12 gap-6">
          {/* Data Input Sidebar */}
          <div className="col-span-12 lg:col-span-3 space-y-6">
            <VoiceRecorder />
            <PhotoUploader />
            <QuickForms />
          </div>
          
          {/* Main Metrics */}
          <div className="col-span-12 lg:col-span-6 space-y-6">
            <MetricsGrid />
            <LiveMap />
          </div>
          
          {/* Updates & Reports */}
          <div className="col-span-12 lg:col-span-3 space-y-6">
            <RealtimeUpdates />
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;