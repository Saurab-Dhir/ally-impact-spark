import { useState } from 'react';
import { ExternalLink, CheckCircle, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface GoogleSheetsConnectorProps {
  onConnectionChange?: (connected: boolean) => void;
}

const GoogleSheetsConnector = ({ onConnectionChange }: GoogleSheetsConnectorProps) => {
  const [sheetUrl, setSheetUrl] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = () => {
    if (!sheetUrl.trim()) return;
    
    setIsConnecting(true);
    
    // Demo simulation - any URL will "connect"
    setTimeout(() => {
      setIsConnected(true);
      setIsConnecting(false);
      onConnectionChange?.(true);
    }, 2000);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setSheetUrl('');
    onConnectionChange?.(false);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ExternalLink className="w-5 h-5" />
          Google Sheets Integration
        </CardTitle>
        <CardDescription>
          Connect your Google Sheets to automatically sync live metrics data
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isConnected ? (
          <>
            <div className="space-y-2">
              <label className="text-sm font-medium">Google Sheets URL</label>
              <Input
                placeholder="https://docs.google.com/spreadsheets/d/..."
                value={sheetUrl}
                onChange={(e) => setSheetUrl(e.target.value)}
                disabled={isConnecting}
              />
            </div>
            
            <Button 
              onClick={handleConnect}
              disabled={!sheetUrl.trim() || isConnecting}
              className="w-full"
            >
              {isConnecting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  Connecting...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  Connect to Google Sheets
                </div>
              )}
            </Button>
          </>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <p className="font-medium text-green-800">Connected to Google Sheets</p>
                <p className="text-sm text-green-600">
                  Data syncing every 30 seconds
                </p>
              </div>
            </div>
            
            <div className="p-4 bg-slate-50 rounded-lg">
              <p className="text-sm text-slate-600 mb-2">Connected Sheet:</p>
              <p className="text-xs font-mono bg-white p-2 rounded border truncate">
                {sheetUrl}
              </p>
            </div>
            
            <Button 
              variant="outline" 
              onClick={handleDisconnect}
              className="w-full"
            >
              Disconnect
            </Button>
          </div>
        )}
        
        <div className="text-xs text-muted-foreground">
          <p className="mb-1">💡 <strong>Demo Mode:</strong> Any Google Sheets URL will connect successfully</p>
          <p>Real integration would validate permissions and sheet format</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default GoogleSheetsConnector;