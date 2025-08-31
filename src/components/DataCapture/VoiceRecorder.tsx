import { useState } from 'react';
import { Mic, MicOff, Globe, Loader } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MockResponse {
  original: string;
  translation?: string;
  structured: {
    action: string;
    count: number;
    category: string;
    subcategory: string;
    location: string;
  };
}

const VoiceRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [detectedLanguage, setDetectedLanguage] = useState('');
  const [translation, setTranslation] = useState('');

  // Mock AI responses for demo
  const mockResponses: { [key: string]: MockResponse } = {
    nepali: {
      original: "आज हामीले ३ बालबालिकालाई बचायौं",
      translation: "Today we rescued 3 children",
      structured: {
        action: "rescue",
        count: 3,
        category: "provide",
        subcategory: "newSurvivors",
        location: "nepal"
      }
    },
    khmer: {
      original: "យើងបានជួយកុមារចំនួន៥នាក់នៅថ្ងៃនេះ",
      translation: "We helped 5 children today",
      structured: {
        action: "help",
        count: 5,
        category: "provide",
        subcategory: "traumaInformedCare",
        location: "cambodia"
      }
    },
    english: {
      original: "Completed prevention presentation at Thunder Bay school, 45 students attended",
      structured: {
        action: "presentation",
        count: 45,
        category: "prevention",
        subcategory: "individualsReached",
        location: "makwa"
      }
    }
  };

  const handleStartRecording = () => {
    setIsRecording(true);
    setTranscript('');
    setTranslation('');
    setDetectedLanguage('');
    
    // Simulate recording for 3 seconds
    setTimeout(() => {
      setIsRecording(false);
      processVoice();
    }, 3000);
  };

  const processVoice = () => {
    setIsProcessing(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const languages = ['nepali', 'khmer', 'english'];
      const randomLang = languages[Math.floor(Math.random() * languages.length)];
      const response = mockResponses[randomLang];
      
      setDetectedLanguage(randomLang);
      setTranscript(response.original);
      if (response.translation) {
        setTranslation(response.translation);
      }
      
      setIsProcessing(false);
      
      // Show success notification (would integrate with notification system)
      console.log('Data captured:', response.structured);
      
    }, 2000);
  };

  return (
    <div className="bg-white rounded-2xl shadow-card border border-slate-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-slate-900">Voice Input</h3>
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            {detectedLanguage || 'Auto-detect language'}
          </span>
        </div>
      </div>
      
      {/* Recording Interface */}
      <div className="flex flex-col items-center justify-center py-8">
        <button
          onClick={handleStartRecording}
          disabled={isRecording || isProcessing}
          className={cn(
            "relative w-24 h-24 rounded-full transition-all duration-300 shadow-glow",
            isRecording 
              ? "bg-red-500 scale-110 animate-recording-pulse" 
              : "bg-primary hover:bg-primary/90 hover:scale-105",
            isProcessing && "bg-warning animate-spin",
            (isRecording || isProcessing) && "cursor-not-allowed"
          )}
        >
          {isProcessing ? (
            <Loader className="w-8 h-8 text-white absolute inset-0 m-auto" />
          ) : isRecording ? (
            <MicOff className="w-8 h-8 text-white absolute inset-0 m-auto" />
          ) : (
            <Mic className="w-8 h-8 text-white absolute inset-0 m-auto" />
          )}
          
          {/* Recording animation rings */}
          {isRecording && (
            <>
              <span className="absolute inset-0 rounded-full bg-red-400 animate-ping opacity-75" />
              <span className="absolute inset-0 rounded-full bg-red-400 animate-ping opacity-50" style={{ animationDelay: '0.2s' }} />
            </>
          )}
        </button>
        
        <div className="mt-4 text-center">
          <p className="text-sm font-medium text-slate-700">
            {isRecording && "🎤 Listening... Speak now"}
            {isProcessing && "🤖 Processing with AI..."}
            {!isRecording && !isProcessing && "Click to record voice update"}
          </p>
          
          {!isRecording && !isProcessing && (
            <p className="text-xs text-muted-foreground mt-1">
              Supports Nepali, Khmer, and English
            </p>
          )}
        </div>
      </div>
      
      {/* Results */}
      {(transcript || translation) && (
        <div className="mt-6 space-y-4">
          {/* Original transcript */}
          <div className="p-4 bg-slate-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-medium text-slate-600 uppercase tracking-wide">
                {detectedLanguage} Original
              </span>
            </div>
            <p className="text-slate-900 font-medium">{transcript}</p>
          </div>
          
          {/* Translation */}
          {translation && (
            <div className="p-4 bg-primary-glow/10 rounded-lg border border-primary/20">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-medium text-primary uppercase tracking-wide">
                  English Translation
                </span>
              </div>
              <p className="text-slate-900 font-medium">{translation}</p>
            </div>
          )}
          
          {/* Processing status */}
          <div className="flex items-center justify-between text-sm">
            <span className="text-green-600 font-medium">✓ Data processed successfully</span>
            <span className="text-muted-foreground">Auto-categorized and logged</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default VoiceRecorder;