
import React from 'react';

interface InfiniteTextBannerProps {
  texts: string[];
  colorScheme?: 'purple' | 'red' | 'green' | 'yellow' | 'blue' | 'dark';
  speed?: 'slow' | 'normal' | 'fast';
  className?: string;
}

const colorSchemes = {
  purple: 'bg-[#2575fc] text-white',
  red: 'bg-[#16a085] text-white',
  green: 'bg-[#1a2b63] text-white',
  yellow: 'bg-[#90b8f8] text-[#1a2b63]',
  blue: 'bg-[#2952a3] text-white',
  dark: 'bg-[#1a2b63] text-white',
};

const speeds = {
  slow: 'animate-scroll-slow',
  normal: 'animate-scroll-normal',
  fast: 'animate-scroll-fast',
};

const InfiniteTextBanner: React.FC<InfiniteTextBannerProps> = ({
  texts,
  colorScheme = 'purple',
  speed = 'fast',
  className = '',
}) => {
  if (!texts || texts.length === 0) {
    return null;
  }

  // Duplicate the texts to create a seamless loop
  const bannerTexts = [...texts, ...texts];

  return (
    <div
      className={`w-full overflow-hidden whitespace-nowrap py-3 ${colorSchemes[colorScheme]} ${className}`}
      aria-hidden="true" // Decorative, hide from screen readers
    >
      <div className={`inline-block ${speeds[speed]}`}>
        {bannerTexts.map((text, index) => (
          <span key={index} className="mx-8 text-xs font-bold uppercase tracking-wider">
            {text}
          </span>
        ))}
      </div>
    </div>
  );
};

export default InfiniteTextBanner;