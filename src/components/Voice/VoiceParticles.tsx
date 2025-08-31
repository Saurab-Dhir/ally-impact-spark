import { useEffect, useState, useRef } from 'react';

interface VoiceParticlesProps {
  isActive: boolean;
  intensity?: number;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
}

const VoiceParticles = ({ isActive, intensity = 1 }: VoiceParticlesProps) => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const particleIdRef = useRef(0);

  useEffect(() => {
    if (!isActive) {
      setParticles([]);
      return;
    }

    const createParticle = (): Particle => {
      const angle = Math.random() * 2 * Math.PI;
      const distance = 60 + Math.random() * 40;
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;
      
      return {
        id: particleIdRef.current++,
        x: x + 60, // Center offset
        y: y + 60, // Center offset
        size: Math.random() * 6 + 2,
        delay: Math.random() * 1000,
      };
    };

    const interval = setInterval(() => {
      const newParticle = createParticle();
      setParticles(prev => [...prev, newParticle]);
      
      // Remove particle after animation completes
      setTimeout(() => {
        setParticles(prev => prev.filter(p => p.id !== newParticle.id));
      }, 3000);
    }, 200 / intensity);

    return () => clearInterval(interval);
  }, [isActive, intensity]);

  if (!isActive) return null;

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="voice-particle"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDelay: `${particle.delay}ms`,
          }}
        />
      ))}
    </div>
  );
};

export default VoiceParticles;