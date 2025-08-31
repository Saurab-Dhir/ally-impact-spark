import { useState, useEffect } from 'react';
import { Mic, MicOff, Brain, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import WaveformVisualizer from '../Voice/WaveformVisualizer';
import VoiceParticles from '../Voice/VoiceParticles';
import LanguageSelector from '../Voice/LanguageSelector';
import TypewriterText from '../Voice/TypewriterText';

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
  const [detectedLanguage, setDetectedLanguage] = useState('en');
  const [translation, setTranslation] = useState('');
  const [recordingTime, setRecordingTime] = useState(0);
  const [confidence, setConfidence] = useState(0);
  const [showTypewriter, setShowTypewriter] = useState(false);
  const maxRecordingTime = 30; // 30 seconds max

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

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRecording) {
      setRecordingTime(0);
      interval = setInterval(() => {
        setRecordingTime(prev => {
          if (prev >= maxRecordingTime) {
            setIsRecording(false);
            processVoice();
            return prev;
          }
          return prev + 0.1;
        });
      }, 100);
    }

    return () => clearInterval(interval);
  }, [isRecording]);

  const handleStartRecording = () => {
    setIsRecording(true);
    setTranscript('');
    setTranslation('');
    setShowTypewriter(false);
    setConfidence(0);
    
    // Auto-stop after 5 seconds for demo
    setTimeout(() => {
      setIsRecording(false);
      processVoice();
    }, 5000);
  };

  const processVoice = () => {
    setIsProcessing(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const languages = ['nepali', 'khmer', 'english'];
      const randomLang = languages[Math.floor(Math.random() * languages.length)];
      const response = mockResponses[randomLang];
      
      // Set confidence score
      setConfidence(Math.floor(Math.random() * 15) + 85); // 85-100%
      
      // Update detected language
      const langMap: { [key: string]: string } = {
        nepali: 'ne',
        khmer: 'km', 
        english: 'en'
      };
      setDetectedLanguage(langMap[randomLang]);
      
      setIsProcessing(false);
      setTranscript(response.original);
      setShowTypewriter(true);
      
      if (response.translation) {
        setTimeout(() => {
          setTranslation(response.translation);
        }, response.original.length * 50 + 1000);
      }
      
      // Show success notification (would integrate with notification system)
      console.log('Data captured:', response.structured);
      
    }, 2500);
  };

  const progressPercentage = (recordingTime / maxRecordingTime) * 100;

  return (
    <div className="enhanced-card p-0 overflow-hidden">
      {/* Header with Language Selector */}
      <div className="p-6 pb-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-slate-900">Voice Intelligence</h3>
          <div className="text-sm text-muted-foreground">
            {isRecording ? `${(maxRecordingTime - recordingTime).toFixed(0)}s remaining` : 'Ready to capture'}
          </div>
        </div>
        
        <LanguageSelector 
          selectedLanguage={detectedLanguage}
          onLanguageChange={setDetectedLanguage}
        />
      </div>
      
      {/* Stunning Recording Interface */}
      <div className="flex flex-col items-center justify-center py-12 px-6 relative">
        {/* Main Voice Button */}
        <div className="relative">
          <button
            onClick={handleStartRecording}
            disabled={isRecording || isProcessing}
            className={cn(
              "voice-button relative w-30 h-30 rounded-full transition-all duration-500 shadow-glow z-10",
              !isRecording && !isProcessing && "breathing-animation hover:scale-105",
              isRecording && "voice-button-recording scale-110",
              isProcessing && "animate-pulse",
              (isRecording || isProcessing) && "cursor-not-allowed"
            )}
            style={{ width: '120px', height: '120px' }}
          >
            {/* Glassmorphic Overlay */}
            <div className="absolute inset-0 rounded-full bg-white/10 backdrop-blur-sm" />
            
            {/* Icon */}
            <div className="relative z-20 flex items-center justify-center w-full h-full">
              {isProcessing ? (
                <Brain className="w-10 h-10 text-white animate-pulse" />
              ) : isRecording ? (
                <MicOff className="w-10 h-10 text-white" />
              ) : (
                <Mic className="w-10 h-10 text-white" />
              )}
            </div>
            
            {/* Recording Ripple Rings */}
            {isRecording && (
              <>
                <div className="ripple-ring" style={{ width: '140px', height: '140px', top: '-10px', left: '-10px' }} />
                <div className="ripple-ring" style={{ width: '160px', height: '160px', top: '-20px', left: '-20px' }} />
                <div className="ripple-ring" style={{ width: '180px', height: '180px', top: '-30px', left: '-30px' }} />
              </>
            )}
            
            {/* Waveform Visualizer */}
            <WaveformVisualizer isRecording={isRecording} />
            
            {/* Voice Particles */}
            <VoiceParticles isActive={isRecording} intensity={1.5} />
          </button>
          
          {/* Circular Progress Indicator */}
          {isRecording && (
            <div className="absolute inset-0 w-30 h-30">
              <svg className="w-full h-full transform -rotate-90" style={{ width: '120px', height: '120px' }}>
                <circle
                  cx="60"
                  cy="60"
                  r="56"
                  stroke="rgba(255, 255, 255, 0.2)"
                  strokeWidth="4"
                  fill="none"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="56"
                  stroke="rgba(255, 255, 255, 0.8)"
                  strokeWidth="4"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 56}`}
                  strokeDashoffset={`${2 * Math.PI * 56 * (1 - progressPercentage / 100)}`}
                  className="transition-all duration-100 ease-linear"
                />
              </svg>
            </div>
          )}
        </div>
        
        {/* Status Text */}
        <div className="mt-8 text-center">
          <p className="text-base font-medium text-slate-700 flex items-center justify-center gap-2">
            {isRecording && (
              <>
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                Listening... Speak clearly
              </>
            )}
            {isProcessing && (
              <>
                <Brain className="w-4 h-4 animate-pulse" />
                <span className="processing-dots">Processing with AI</span>
              </>
            )}
            {!isRecording && !isProcessing && (
              <>
                <Clock className="w-4 h-4 text-muted-foreground" />
                Tap to start voice capture (up to {maxRecordingTime}s)
              </>
            )}
          </p>
          
          {!isRecording && !isProcessing && (
            <div className="mt-2 flex items-center justify-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                🇳🇵 Nepali
              </span>
              <span className="flex items-center gap-1">
                🇰🇭 Khmer
              </span>
              <span className="flex items-center gap-1">
                🇬🇧 English
              </span>
            </div>
          )}
        </div>
      </div>
      
      {/* Enhanced Results */}
      {(transcript || translation) && (
        <div className="px-6 pb-6 space-y-6">
          {/* Original Transcript with Typewriter Effect */}
          <div className="p-5 bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl border border-slate-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                  Original Transcript
                </span>
                <div className="w-1 h-1 bg-slate-400 rounded-full" />
                <span className="text-xs text-slate-500">{detectedLanguage.toUpperCase()}</span>
              </div>
              {confidence > 0 && (
                <div className="text-xs text-slate-500">
                  Confidence: {confidence}%
                </div>
              )}
            </div>
            
            <div className="text-slate-900 font-medium text-base leading-relaxed">
              {showTypewriter ? (
                <TypewriterText text={transcript} speed={50} />
              ) : (
                transcript
              )}
            </div>
            
            {/* Confidence Bar */}
            {confidence > 0 && (
              <div className="mt-3 w-full bg-slate-200 rounded-full h-1 overflow-hidden">
                <div 
                  className="confidence-bar h-full" 
                  style={{ '--confidence-width': `${confidence}%` } as React.CSSProperties}
                />
              </div>
            )}
          </div>
          
          {/* Translation with Enhanced Styling */}
          {translation && (
            <div className="p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-semibold text-blue-700 uppercase tracking-wide">
                  English Translation
                </span>
                <div className="w-1 h-1 bg-blue-400 rounded-full" />
                <span className="text-xs text-blue-600">Auto-translated</span>
              </div>
              <div className="text-slate-900 font-medium text-base leading-relaxed">
                <TypewriterText text={translation} speed={40} />
              </div>
            </div>
          )}
          
          {/* Enhanced Processing Status */}
          <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl border border-green-200">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <div className="text-sm font-semibold text-green-800">Processing Complete</div>
                <div className="text-xs text-green-600">Data captured and auto-categorized</div>
              </div>
            </div>
            <div className="text-xs text-green-600 font-medium">
              Ready for next input
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VoiceRecorder;