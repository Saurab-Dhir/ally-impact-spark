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
  const svgRef = useRef<SVGSVGElement>(null);
  return;
};
export default AnimatedWorldMap;