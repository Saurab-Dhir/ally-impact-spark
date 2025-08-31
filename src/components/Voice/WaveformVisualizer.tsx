import { useEffect, useState } from 'react';

interface WaveformVisualizerProps {
  isRecording: boolean;
  className?: string;
}

const WaveformVisualizer = ({ isRecording, className }: WaveformVisualizerProps) => {
  const [bars, setBars] = useState<number[]>([]);

  useEffect(() => {
    if (!isRecording) {
      setBars([]);
      return;
    }

    const generateBars = () => {
      const newBars = Array.from({ length: 20 }, () => Math.random() * 100 + 20);
      setBars(newBars);
    };

    generateBars();
    const interval = setInterval(generateBars, 100);

    return () => clearInterval(interval);
  }, [isRecording]);

  if (!isRecording) return null;

  return (
    <div className={`absolute inset-0 flex items-center justify-center pointer-events-none ${className}`}>
      <div className="flex items-center gap-1">
        {Array.from({ length: 16 }).map((_, index) => {
          const height = bars[index % bars.length] || 20;
          return (
            <div
              key={index}
              className="waveform-bar"
              style={{
                height: `${Math.max(4, height * 0.3)}px`,
                width: '3px',
                animationDelay: `${index * 0.05}s`,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default WaveformVisualizer;