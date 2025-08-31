import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  example: string;
}

const languages: Language[] = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇬🇧',
    example: 'Hello World'
  },
  {
    code: 'ne',
    name: 'Nepali',
    nativeName: 'नेपाली',
    flag: '🇳🇵',
    example: 'नमस्कार संसार'
  },
  {
    code: 'km',
    name: 'Khmer',
    nativeName: 'ភាសាខ្មែរ',
    flag: '🇰🇭',
    example: 'សួស្តី​ពិភព​លោក'
  }
];

interface LanguageSelectorProps {
  selectedLanguage?: string;
  onLanguageChange?: (language: string) => void;
}

const LanguageSelector = ({ selectedLanguage = 'en', onLanguageChange }: LanguageSelectorProps) => {
  const [currentIndex, setCurrentIndex] = useState(
    languages.findIndex(lang => lang.code === selectedLanguage)
  );

  const currentLanguage = languages[currentIndex];

  const nextLanguage = () => {
    const newIndex = (currentIndex + 1) % languages.length;
    setCurrentIndex(newIndex);
    onLanguageChange?.(languages[newIndex].code);
  };

  const prevLanguage = () => {
    const newIndex = currentIndex === 0 ? languages.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    onLanguageChange?.(languages[newIndex].code);
  };

  return (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
      <button
        onClick={prevLanguage}
        className="p-1 rounded-lg hover:bg-white/10 transition-colors"
      >
        <ChevronLeft className="w-4 h-4 text-white/70" />
      </button>
      
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <div className="text-2xl">{currentLanguage.flag}</div>
        <div className="min-w-0">
          <div className="text-sm font-medium text-white truncate">
            {currentLanguage.nativeName}
          </div>
          <div className="text-xs text-white/70 truncate">
            {currentLanguage.example}
          </div>
        </div>
      </div>
      
      <button
        onClick={nextLanguage}
        className="p-1 rounded-lg hover:bg-white/10 transition-colors"
      >
        <ChevronRight className="w-4 h-4 text-white/70" />
      </button>
    </div>
  );
};

export default LanguageSelector;