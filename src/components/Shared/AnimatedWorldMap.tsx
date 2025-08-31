import { useEffect, useRef } from 'react';
interface Location {
  x: number;
  y: number;
  name: string;
}
const locations: Location[] = [{
  x: 20,
  y: 45,
  name: 'Canada'
}, {
  x: 75,
  y: 35,
  name: 'Nepal'
}, {
  x: 85,
  y: 55,
  name: 'Cambodia'
}];
const AnimatedWorldMap = () => {
  return (
    <div className="w-64 h-40 relative">
      <svg viewBox="0 0 100 60" className="w-full h-full">
        {/* Simple world map outline */}
        <path
          d="M10,25 Q15,20 25,25 Q35,30 45,25 Q55,20 65,25 Q75,30 85,25 Q90,20 95,25"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
          opacity="0.3"
        />
        
        {/* Location markers */}
        {locations.map((location, index) => (
          <g key={location.name}>
            <circle
              cx={location.x}
              cy={location.y}
              r="2"
              fill="currentColor"
              className="animate-pulse"
              style={{ animationDelay: `${index * 0.5}s` }}
            />
            <text
              x={location.x}
              y={location.y - 4}
              textAnchor="middle"
              fontSize="3"
              fill="currentColor"
              className="opacity-70"
            >
              {location.name}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};
export default AnimatedWorldMap;