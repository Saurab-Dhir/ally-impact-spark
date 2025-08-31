import { useState } from 'react';
import { Camera, Shield, Loader, Upload } from 'lucide-react';
import { cn } from '@/lib/utils';

const PhotoUploader = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [detectedFaces, setDetectedFaces] = useState(0);
  const [isBlurred, setIsBlurred] = useState(false);
  const [extractedData, setExtractedData] = useState<any>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setUploadedImage(result);
      processImage(result);
    };
    reader.readAsDataURL(file);
  };

  const processImage = (imageData: string) => {
    setIsProcessing(true);
    
    // Simulate AI face detection and metadata extraction
    setTimeout(() => {
      const faces = Math.floor(Math.random() * 4) + 1;
      setDetectedFaces(faces);
      setIsBlurred(true);
      
      // Mock metadata extraction
      setExtractedData({
        location: 'Kathmandu Safe House',
        peopleCount: faces + Math.floor(Math.random() * 3),
        date: new Date().toLocaleDateString(),
        category: 'Safe Housing Program',
        context: 'Educational activity session'
      });
      
      setIsProcessing(false);
      
      // Show success notification
      console.log(`Privacy protection applied: ${faces} faces blurred`);
    }, 2500);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files[0]) {
      const mockEvent = {
        target: { files: [files[0]] }
      } as any;
      handleImageUpload(mockEvent);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-card border border-slate-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-slate-900">Photo Documentation</h3>
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-green-500" />
          <span className="text-sm font-medium text-green-600">Privacy Protected</span>
        </div>
      </div>
      
      {/* Upload Zone */}
      {!uploadedImage && (
        <div 
          className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-primary hover:bg-primary/5 transition-all duration-300"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            id="photo-upload"
          />
          
          <label
            htmlFor="photo-upload"
            className="cursor-pointer flex flex-col items-center"
          >
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
              <Camera className="w-8 h-8 text-primary" />
            </div>
            <p className="text-sm font-medium text-slate-700 mb-2">
              Click to upload photo or drag and drop
            </p>
            <p className="text-xs text-muted-foreground">
              Faces will be automatically blurred for privacy
            </p>
            <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
              <span>📱 Mobile photos</span>
              <span>🖼️ Documentation</span>
              <span>🛡️ Auto-privacy</span>
            </div>
          </label>
        </div>
      )}
      
      {/* Image Preview */}
      {uploadedImage && (
        <div className="space-y-4">
          <div className="relative rounded-xl overflow-hidden bg-slate-100 group">
            <img
              src={uploadedImage}
              alt="Uploaded documentation"
              className={cn(
                "w-full h-auto transition-all duration-300",
                isBlurred && "filter blur-sm hover:blur-none"
              )}
            />
            
            {/* Processing overlay */}
            {isProcessing && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <div className="text-white text-center">
                  <Loader className="w-8 h-8 animate-spin mx-auto mb-3" />
                  <p className="text-sm font-medium">Detecting and blurring faces...</p>
                  <p className="text-xs opacity-80 mt-1">Ensuring privacy protection</p>
                </div>
              </div>
            )}
            
            {/* Privacy badges */}
            {!isProcessing && detectedFaces > 0 && (
              <div className="absolute top-4 right-4 space-y-2">
                <div className="bg-green-500/90 backdrop-blur text-white px-3 py-1 rounded-full text-sm font-medium">
                  ✓ {detectedFaces} faces protected
                </div>
                {isBlurred && (
                  <div className="bg-blue-500/90 backdrop-blur text-white px-3 py-1 rounded-full text-xs">
                    Hover to preview
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* Extracted metadata */}
          {extractedData && !isProcessing && (
            <div className="p-4 bg-slate-50 rounded-xl">
              <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Extracted Information
              </h4>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-muted-foreground">Location:</span>
                  <p className="font-medium text-slate-900">{extractedData.location}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">People count:</span>
                  <p className="font-medium text-slate-900">{extractedData.peopleCount}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Date:</span>
                  <p className="font-medium text-slate-900">{extractedData.date}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Category:</span>
                  <p className="font-medium text-slate-900">{extractedData.category}</p>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-slate-200">
                <span className="text-muted-foreground text-sm">Context:</span>
                <p className="font-medium text-slate-900 text-sm mt-1">{extractedData.context}</p>
              </div>
            </div>
          )}
          
          {/* Action buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => {
                setUploadedImage(null);
                setIsBlurred(false);
                setDetectedFaces(0);
                setExtractedData(null);
              }}
              className="px-4 py-2 text-sm bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
            >
              Upload Another
            </button>
            <button className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
              Save to Records
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoUploader;