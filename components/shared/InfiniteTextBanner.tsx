import React from 'react';

interface InfiniteTextBannerProps {
  texts: string[];
  colorScheme?: 'purple' | 'red' | 'green' | 'yellow' | 'blue' | 'dark';
  speed?: 'slow' | 'normal' | 'fast';
  className?: string;
}

const colorSchemes = {
  purple: 'bg-[#6d28d9] text-white',
  red: 'bg-red-600 text-white',
  green: 'bg-green-600 text-white',
  yellow: 'bg-yellow-400 text-gray-900',
  blue: 'bg-blue-600 text-white',
  dark: 'bg-gray-800 text-white',
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
