import { useState, useEffect } from 'react';

interface TypewriterTextProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
  className?: string;
}

const TypewriterText = ({ text, speed = 50, onComplete, className }: TypewriterTextProps) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setDisplayedText('');
    setCurrentIndex(0);
  }, [text]);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timer);
    } else if (currentIndex === text.length && onComplete) {
      onComplete();
    }
  }, [currentIndex, text, speed, onComplete]);

  const highlightEntities = (text: string) => {
    // Highlight numbers in blue
    let highlighted = text.replace(/\b\d+\b/g, '<span class="text-blue-600 font-semibold">$&</span>');
    
    // Highlight locations in green (simple pattern matching)
    const locations = ['Nepal', 'Cambodia', 'Canada', 'Thunder Bay', 'Kathmandu', 'Phnom Penh'];
    locations.forEach(location => {
      const regex = new RegExp(`\\b${location}\\b`, 'gi');
      highlighted = highlighted.replace(regex, '<span class="text-green-600 font-semibold">$&</span>');
    });

    return highlighted;
  };

  return (
    <span className={className}>
      <span 
        dangerouslySetInnerHTML={{ 
          __html: highlightEntities(displayedText) 
        }} 
      />
      {currentIndex < text.length && (
        <span className="typewriter-cursor text-primary">|</span>
      )}
    </span>
  );
};

export default TypewriterText;