import { useEffect, useRef } from 'react';

interface Location {
  x: number;
  y: number;
  name: string;
}

const locations: Location[] = [
  { x: 20, y: 45, name: 'Canada' },
  { x: 75, y: 35, name: 'Nepal' },
  { x: 85, y: 55, name: 'Cambodia' },
];

const AnimatedWorldMap = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  return (
    <div className="relative w-full h-32 flex items-center justify-center">
      <svg
        ref={svgRef}
        viewBox="0 0 400 200"
        className="w-full h-full opacity-30"
        style={{ maxWidth: '300px' }}
      >
        {/* Simplified world map outline */}
        <path
          d="M50 100 Q100 80 150 100 Q200 90 250 100 Q300 85 350 100 Q320 120 280 115 Q240 125 200 120 Q150 130 100 120 Q75 115 50 100"
          fill="none"
          stroke="rgba(255, 255, 255, 0.4)"
          strokeWidth="2"
          className="animate-world-pulse"
        />
        
        {/* Continent shapes */}
        <ellipse cx="80" cy="100" rx="25" ry="15" fill="rgba(255, 255, 255, 0.2)" className="animate-world-pulse" />
        <ellipse cx="200" cy="95" rx="30" ry="20" fill="rgba(255, 255, 255, 0.2)" className="animate-world-pulse" />
        <ellipse cx="320" cy="105" rx="20" ry="12" fill="rgba(255, 255, 255, 0.2)" className="animate-world-pulse" />
        
        {/* Active location dots */}
        {locations.map((location, index) => (
          <g key={location.name}>
            <circle
              cx={location.x * 4}
              cy={location.y * 2}
              r="4"
              fill="#00b7c4"
              className="animate-dot-pulse"
              style={{
                animationDelay: `${index * 0.7}s`
              }}
            />
            <circle
              cx={location.x * 4}
              cy={location.y * 2}
              r="8"
              fill="rgba(0, 183, 196, 0.3)"
              className="animate-dot-pulse"
              style={{
                animationDelay: `${index * 0.7 + 0.3}s`
              }}
            />
          </g>
        ))}
        
        {/* Connection lines */}
        <path
          d="M80 90 Q200 70 320 105"
          stroke="rgba(0, 183, 196, 0.4)"
          strokeWidth="1"
          fill="none"
          strokeDasharray="5,5"
          className="animate-pulse"
        />
      </svg>
    </div>
  );
};

export default AnimatedWorldMap;