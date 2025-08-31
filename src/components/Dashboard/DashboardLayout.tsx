import { useState, useEffect } from 'react';
import { Globe, Settings, Zap, MessageSquare, BarChart3, Database } from 'lucide-react';
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
import AdminDashboard from '../HQ/AdminDashboard';
import FileUploader from '../Partners/FileUploader';
import GoogleSheetsConnector from './GoogleSheetsConnector';
import DataReconciliation from './DataReconciliation';
type ViewMode = 'hq' | 'partner';
const DashboardLayout = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('hq');
  const [demoMode, setDemoMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSheetConnected, setIsSheetConnected] = useState(false);
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
      <header className={cn("glassmorphic-header sticky top-0 z-50 transition-all duration-300", isScrolled && "header-shrink")} style={{
      background: 'linear-gradient(135deg, #00b7c4 0%, #33c7d0 25%, #00a3b0 50%, #33c7d0 75%, #00b7c4 100%)',
      backgroundSize: '400% 400%',
      animation: 'gradient-shift 8s ease infinite'
    }}>
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center gap-4">
            <div className="logo-hover w-10 h-10 rounded-xl flex items-center justify-center shadow-glow" style={{
            background: '#00b7c4'
          }}>
              <Globe className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-50">
                Ally Impact Intelligence Hub
              </h1>
              <p className="text-sm text-slate-200">
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
              <span className="text-sm text-slate-100">View as:</span>
               <select value={viewMode} onChange={e => setViewMode(e.target.value as ViewMode)} className="px-3 py-1.5 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-primary focus:border-transparent">
                <option value="hq">HQ Control Center</option>
                <option value="partner">Partners</option>
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

        {/* Main Tabs */}
        <Tabs defaultValue="metrics" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="metrics" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Communications
            </TabsTrigger>
            <TabsTrigger value="communications" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Metrics
            </TabsTrigger>
            <TabsTrigger value="data-reconciliation" className="flex items-center gap-2">
              <Database className="w-4 h-4" />
              Data Reconciliation
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="metrics" className="space-y-6">
            {/* Show different content based on view mode */}
            {viewMode === 'hq' ? (/* HQ View - Child Profile Management */
          <AdminDashboard />) : (/* Partner View - File Upload System */
          <FileUploader />)}
          </TabsContent>
          
          <TabsContent value="communications" className="space-y-6">
            {/* Google Sheets Integration */}
            <div className="enhanced-card p-6">
              <GoogleSheetsConnector onConnectionChange={setIsSheetConnected} />
            </div>
            
            {/* Impact Metrics - Full Width */}
            {isSheetConnected && <div className="enhanced-card">
                <MetricsGrid />
              </div>}
            
            
            
            {/* Global Impact Map */}
            {viewMode !== 'partner' && <div className="enhanced-card">
                <LiveMap />
              </div>}
          </TabsContent>

          <TabsContent value="data-reconciliation" className="space-y-6">
            <DataReconciliation />
          </TabsContent>
        </Tabs>
      </main>
    </div>;
};
export default DashboardLayout;