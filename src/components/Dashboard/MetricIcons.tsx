import React from 'react';

interface IconProps {
  className?: string;
  color?: string;
}

export const PreventionIcon: React.FC<IconProps> = ({ className = "w-8 h-8", color = "currentColor" }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="prevention-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8B5CF6" />
        <stop offset="100%" stopColor="#7C3AED" />
      </linearGradient>
    </defs>
    <path
      d="M12 2L13.09 5.26L16 4L17 7L20.64 6.16L21.36 9.84L18 11L21.36 14.16L20.64 17.84L17 17L16 20L13.09 18.74L12 22L10.91 18.74L8 20L7 17L3.36 17.84L2.64 14.16L6 13L2.64 9.84L3.36 6.16L7 7L8 4L10.91 5.26L12 2Z"
      fill="url(#prevention-gradient)"
      className="animate-pulse"
    />
    <path
      d="M12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7Z"
      fill="white"
      fillOpacity="0.9"
    />
  </svg>
);

export const ProvideIcon: React.FC<IconProps> = ({ className = "w-8 h-8", color = "currentColor" }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="provide-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#14B8A6" />
        <stop offset="100%" stopColor="#0D9488" />
      </linearGradient>
    </defs>
    <path
      d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2Z"
      fill="url(#provide-gradient)"
      className="animate-pulse"
    />
    <path
      d="M21 9V7L15 5.5V4.5C15 3.1 13.9 2 12.5 2H11.5C10.1 2 9 3.1 9 4.5V5.5L3 7V9L9 7.5V21C9 21.6 9.4 22 10 22H14C14.6 22 15 21.6 15 21V7.5L21 9Z"
      fill="url(#provide-gradient)"
      fillOpacity="0.8"
    />
    <circle cx="7" cy="11" r="2" fill="url(#provide-gradient)" className="animate-bounce" style={{ animationDelay: '0.1s' }} />
    <circle cx="17" cy="11" r="2" fill="url(#provide-gradient)" className="animate-bounce" style={{ animationDelay: '0.3s' }} />
  </svg>
);

export const PrepareIcon: React.FC<IconProps> = ({ className = "w-8 h-8", color = "currentColor" }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="prepare-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FB923C" />
        <stop offset="100%" stopColor="#EA580C" />
      </linearGradient>
    </defs>
    <circle
      cx="12"
      cy="12"
      r="10"
      fill="none"
      stroke="url(#prepare-gradient)"
      strokeWidth="2"
      className="animate-spin"
      style={{ animationDuration: '6s' }}
    />
    <path
      d="M12 2V6M12 18V22M22 12H18M6 12H2"
      stroke="url(#prepare-gradient)"
      strokeWidth="2"
      strokeLinecap="round"
      className="animate-pulse"
    />
    <path
      d="M17.66 6.34L15.54 8.46M8.46 15.54L6.34 17.66M17.66 17.66L15.54 15.54M8.46 8.46L6.34 6.34"
      stroke="url(#prepare-gradient)"
      strokeWidth="2"
      strokeLinecap="round"
      fillOpacity="0.6"
    />
    <circle cx="12" cy="12" r="3" fill="url(#prepare-gradient)" className="animate-ping" />
  </svg>
);

export const getIconForCategory = (category: string) => {
  switch (category) {
    case 'prevention':
      return PreventionIcon;
    case 'provide':
      return ProvideIcon;
    case 'prepare':
      return PrepareIcon;
    default:
      return PreventionIcon;
  }
};