import { cn } from '@/lib/utils';

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  className?: string;
  suffix?: string;
  prefix?: string;
}

const AnimatedCounter = ({ 
  value, 
  duration = 2000, 
  className = "", 
  suffix = "",
  prefix = ""
}: AnimatedCounterProps) => {
  return (
    <span className={className}>
      {prefix}{value.toLocaleString()}{suffix}
    </span>
  );
};

export default AnimatedCounter;