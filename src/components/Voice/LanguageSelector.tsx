import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  example: string;
}
const languages: Language[] = [{
  code: 'en',
  name: 'English',
  nativeName: 'English',
  flag: '🇬🇧',
  example: 'Hello World'
}, {
  code: 'ne',
  name: 'Nepali',
  nativeName: 'नेपाली',
  flag: '🇳🇵',
  example: 'नमस्कार संसार'
}, {
  code: 'km',
  name: 'Khmer',
  nativeName: 'ភាសាខ្មែរ',
  flag: '🇰🇭',
  example: 'សួស្តី​ពិភព​លោក'
}];
interface LanguageSelectorProps {
  selectedLanguage?: string;
  onLanguageChange?: (language: string) => void;
}
const LanguageSelector = ({
  selectedLanguage = 'en',
  onLanguageChange
}: LanguageSelectorProps) => {
  const [currentIndex, setCurrentIndex] = useState(languages.findIndex(lang => lang.code === selectedLanguage));
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
  return;
};
export default LanguageSelector;