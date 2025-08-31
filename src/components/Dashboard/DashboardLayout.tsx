import { useState, useEffect } from 'react';
import { Globe, Settings, Zap, MessageSquare, BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MetricsGrid from './MetricsGrid';
import VoiceRecorder from '../DataCapture/VoiceRecorder';
import LiveMap from './LiveMap';
import RealtimeUpdates from './RealtimeUpdates';
import PhotoUploader from '../DataCapture/PhotoUploader';
import QuickForms from '../DataCapture/QuickForms';
import FloatingParticles from '../Shared/FloatingParticles';
import AnimatedWorldMap from '../Shared/AnimatedWorldMap';
import AnimatedCounter from '../Shared/AnimatedCounter';
type ViewMode = 'public' | 'donor' | 'partner' | 'hq';
const DashboardLayout = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('hq');
  const [demoMode, setDemoMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const startDemo = () => {
    setDemoMode(true);
    // Demo sequence for hackathon presentation
    setTimeout(() => setDemoMode(false), 60000); // 1 minute demo
  };
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Glassmorphic Header */}
      <header className={cn("glassmorphic-header sticky top-0 z-50 transition-all duration-300", isScrolled && "header-shrink")}>
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center gap-4">
            <div className="logo-hover w-10 h-10 rounded-xl flex items-center justify-center shadow-glow" style={{
            background: '#00b7c4'
          }}>
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
            
            {/* Enhanced Live indicator */}
            <div className="flex items-center gap-2 px-3 py-1 bg-green-50/80 backdrop-blur-sm rounded-full border border-green-200/50">
              <div className="live-indicator w-2 h-2" />
              <span className="text-sm font-medium text-green-700">Live</span>
            </div>
          </div>
          
          {/* Controls */}
          <div className="flex items-center gap-4">
            {/* View Mode Switcher */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">View as:</span>
              <select value={viewMode} onChange={e => setViewMode(e.target.value as ViewMode)} className="px-3 py-1.5 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-primary focus:border-transparent">
                <option value="public">Public View</option>
                <option value="donor">Donor Dashboard</option>
                <option value="partner">Partner Portal</option>
                <option value="hq">HQ Control Center</option>
              </select>
            </div>

            {/* Demo Mode Toggle */}
            <button onClick={startDemo} className={cn("px-4 py-2 rounded-lg font-medium transition-all", demoMode ? "bg-accent text-accent-foreground animate-glow" : "bg-primary text-primary-foreground hover:bg-primary/90")}>
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
        {/* Animated Hero Section */}
        <div className="mb-12 relative overflow-hidden rounded-3xl hero-gradient text-white shadow-soft">
          <FloatingParticles />
          
          <div className="relative z-10 p-8 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* Hero Content */}
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold mb-4 animate-fade-in">
                  Welcome to the Impact Intelligence Hub
                </h2>
                <p className="text-white/90 text-lg mb-6 animate-fade-in" style={{
                animationDelay: '0.2s'
              }}>
                  Real-time tracking of anti-trafficking efforts across Nepal, Cambodia, and Canada
                </p>
                
                {/* Animated Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center animate-scale-in" style={{
                  animationDelay: '0.4s'
                }}>
                    <div className="text-3xl font-bold">
                      <AnimatedCounter value={3} />
                    </div>
                    <div className="text-white/80 text-sm">Active Locations</div>
                  </div>
                  <div className="text-center animate-scale-in" style={{
                  animationDelay: '0.6s'
                }}>
                    <div className="text-3xl font-bold">
                      <AnimatedCounter value={2724} />
                    </div>
                    <div className="text-white/80 text-sm">Lives Impacted This Year</div>
                  </div>
                  <div className="text-center animate-scale-in" style={{
                  animationDelay: '0.8s'
                }}>
                    <div className="text-3xl font-bold">
                      <AnimatedCounter value={37000} suffix="+" />
                    </div>
                    <div className="text-white/80 text-sm">Lifetime Impact</div>
                  </div>
                </div>
              </div>
              
              {/* Animated World Map */}
              <div className="flex justify-center lg:justify-end">
                <AnimatedWorldMap />
              </div>
            </div>
          </div>
        </div>

        {/* Main Tabs */}
        <Tabs defaultValue="metrics" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="metrics" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Metrics
            </TabsTrigger>
            <TabsTrigger value="communications" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Communications
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="metrics" className="space-y-6">
            {/* Impact Metrics - Full Width */}
            <div className="enhanced-card">
              <MetricsGrid />
            </div>
            
            {/* Photo Documentation - Full Width */}
            <div className="enhanced-card p-6">
              <PhotoUploader />
            </div>
            
            {/* Live Updates - Full Width */}
            <div className="enhanced-card">
              <RealtimeUpdates />
            </div>
            
            {/* Secondary Grid */}
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12 lg:col-span-8 enhanced-card">
                <LiveMap />
              </div>
              <div className="col-span-12 lg:col-span-4 enhanced-card p-6">
                <QuickForms />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="communications" className="space-y-6">
            <div className="enhanced-card p-6">
              <VoiceRecorder />
            </div>
            
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12 lg:col-span-6 enhanced-card">
                <RealtimeUpdates />
              </div>
              <div className="col-span-12 lg:col-span-6 enhanced-card p-6">
                <div className="text-center py-12">
                  <MessageSquare className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-xl font-semibold mb-2">Communication Center</h3>
                  <p className="text-muted-foreground">
                    Manage communications with partners, donors, and field teams.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>;
};
export default DashboardLayout;