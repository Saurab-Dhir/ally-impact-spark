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
  const mockResponses: {
    [key: string]: MockResponse;
  } = {
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
      const langMap: {
        [key: string]: string;
      } = {
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
  const progressPercentage = recordingTime / maxRecordingTime * 100;
  return <div className="enhanced-card p-0 overflow-hidden">
      {/* Header with Language Selector */}
      
      
      {/* Stunning Recording Interface */}
      
      
      {/* Enhanced Results */}
      {(transcript || translation) && <div className="px-6 pb-6 space-y-6">
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
              {confidence > 0 && <div className="text-xs text-slate-500">
                  Confidence: {confidence}%
                </div>}
            </div>
            
            <div className="text-slate-900 font-medium text-base leading-relaxed">
              {showTypewriter ? <TypewriterText text={transcript} speed={50} /> : transcript}
            </div>
            
            {/* Confidence Bar */}
            {confidence > 0 && <div className="mt-3 w-full bg-slate-200 rounded-full h-1 overflow-hidden">
                <div className="confidence-bar h-full" style={{
            '--confidence-width': `${confidence}%`
          } as React.CSSProperties} />
              </div>}
          </div>
          
          {/* Translation with Enhanced Styling */}
          {translation && <div className="p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
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
            </div>}
          
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
        </div>}
    </div>;
};
export default VoiceRecorder;