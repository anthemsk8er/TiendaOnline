import React from 'react';

export const StarIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
  </svg>
);

export const MinusIcon: React.FC<{className?: string; strokeWidth?: number}> = ({ className = "w-4 h-4", strokeWidth = 1.5 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={strokeWidth} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
    </svg>
);

export const PlusIcon: React.FC<{className?: string; strokeWidth?: number}> = ({ className = "w-4 h-4", strokeWidth = 1.5 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={strokeWidth} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
);

export const ChevronDownIcon: React.FC<{className?: string; strokeWidth?: number}> = ({ className = "w-5 h-5", strokeWidth = 2.5 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={strokeWidth} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
    </svg>
);

export const ChevronUpIcon: React.FC<{className?: string; strokeWidth?: number}> = ({ className = "w-5 h-5", strokeWidth = 2.5 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={strokeWidth} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
    </svg>
);

export const CheckCircleIcon: React.FC<{className?: string}> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
  </svg>
);

export const ShoppingBagIcon: React.FC<{className?: string; strokeWidth?: number}> = ({ className = "w-6 h-6", strokeWidth = 1.5 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={strokeWidth} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.658-.463 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
    </svg>
);

export const PackageIcon: React.FC<{className?: string; strokeWidth?: number}> = ({ className = "w-6 h-6", strokeWidth = 1.5 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={strokeWidth} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
);

export const TruckIcon: React.FC<{className?: string; strokeWidth?: number}> = ({ className = "w-6 h-6", strokeWidth = 1.5 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={strokeWidth} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125V14.25m-17.25 4.5v-9m17.25 9v-9m-9-9h1.5a3.375 3.375 0 0 1 3.375 3.375V15a3.375 3.375 0 0 1-3.375 3.375H9.75" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V4.5a3.375 3.375 0 0 0-3.375-3.375H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V15M12 9h.008v.008H12V9Z" />
  </svg>
);

export const ShieldIcon: React.FC<{className?: string; strokeWidth?: number}> = ({ className = "w-6 h-6", strokeWidth = 1.5 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={strokeWidth} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
);

export const MenuIcon: React.FC<{className?: string; strokeWidth?: number}> = ({ className = "w-6 h-6", strokeWidth = 1.5 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={strokeWidth} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
);

export const SearchIcon: React.FC<{className?: string; strokeWidth?: number}> = ({ className = "w-6 h-6", strokeWidth = 1.5 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={strokeWidth} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
    </svg>
);

export const XMarkIcon: React.FC<{className?: string; strokeWidth?: number}> = ({ className = "w-6 h-6", strokeWidth = 1.5 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={strokeWidth} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
);

export const CheckBadgeIcon: React.FC<{className?: string; strokeWidth?: number}> = ({ className = "w-6 h-6", strokeWidth = 1.5 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={strokeWidth} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
);

export const CheckBoxIcon: React.FC<{className?: string; strokeWidth?: number}> = ({ className = "w-6 h-6", strokeWidth = 1.5 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={strokeWidth} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75l1.5 1.5 3-3.75M3.75 6A2.25 2.25 0 016 3.75h12A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6z" />
    </svg>
);

export const MentalBalanceIcon: React.FC<{className?: string; strokeWidth?: number}> = ({ className = "w-8 h-8", strokeWidth = 1.5 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={strokeWidth} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M20.25 20.25v-4.5m0 4.5h-4.5m4.5 0L15 15m-6 0L3.75 20.25m16.5-16.5L15 9m-6 6L20.25 3.75" />
  </svg>
);

export const PremiumQualityIcon: React.FC<{className?: string; strokeWidth?: number}> = ({ className = "w-8 h-8", strokeWidth = 1.5 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={strokeWidth} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286Zm0 13.036h.008v.008H12v-.008Z" />
  </svg>
);

export const ScienceBackedIcon: React.FC<{className?: string; strokeWidth?: number}> = ({ className = "w-8 h-8", strokeWidth = 1.5 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={strokeWidth} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 10.5a8.955 8.955 0 0 1-4.5 0m4.5 0a8.955 8.955 0 0 0-4.5 0m4.5 0 2.25 2.25m-6.75-2.25L7.5 12.75m9-2.25L18.75 6M7.5 8.25 5.25 6m12 6.75 2.25 2.25m-6.75-2.25L7.5 15m9-2.25L18.75 10.5M7.5 12.75 5.25 15M6 18.75l-1.125-1.125m10.25 1.125L14.25 18.75" />
  </svg>
);

export const WellbeingIcon: React.FC<{className?: string; strokeWidth?: number}> = ({ className = "w-8 h-8", strokeWidth = 1.5 }) => (
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={strokeWidth} stroke="currentColor" className={className}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
</svg>
);

export const LeafIcon: React.FC<{className?: string; strokeWidth?: number}> = ({ className = "w-6 h-6", strokeWidth = 1.5 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={strokeWidth} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.82m5.84-2.56a12.022 12.022 0 0 0-5.84 0m5.84 0a12.003 12.003 0 0 0-11.68 0m11.68 0c1.72-1.023 2.895-2.906 3.195-5.036m-12.87 5.036c.3-2.13 1.475-4.013 3.195-5.036C9.18 3.23 7.82.946 6.345 0" />
  </svg>
);

export const BrainIcon: React.FC<{className?: string; strokeWidth?: number}> = ({ className = "w-6 h-6", strokeWidth = 1.5 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={strokeWidth} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.5 12.75a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-.75-.75h-3a.75.75 0 0 1-.75-.75v-3Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12.75a3 3 0 0 1-3-3M9 12.75a3 3 0 0 0 3-3m0 0v-1.5c0-.414.336-.75.75-.75h1.5a.75.75 0 0 1 .75.75v1.5m-3 0a3 3 0 0 0-3 3M12 9a3 3 0 0 0 3 3m-3 9a9 9 0 1 1 0-18 9 9 0 0 1 0 18Z" />
    </svg>
);

export const SmileyFaceIcon: React.FC<{className?: string; strokeWidth?: number}> = ({ className = "w-6 h-6", strokeWidth = 1.5 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={strokeWidth} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4.06 4.06 0 0 1-5.656 0M9 10.5h.008v.008H9v-.008zm6 0h.008v.008H15v-.008z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
    </svg>
);

export const BedIcon: React.FC<{className?: string; strokeWidth?: number}> = ({ className = "w-6 h-6", strokeWidth = 1.5 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={strokeWidth} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25A2.25 2.25 0 0 0 18.75 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V8.25z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18M6.75 6V5.25A2.25 2.25 0 0 1 9 3h6a2.25 2.25 0 0 1 2.25 2.25V6" />
    </svg>
);

export const ShippingBoxIcon: React.FC<{className?: string; strokeWidth?: number}> = ({ className = "w-6 h-6", strokeWidth = 1.5 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={strokeWidth} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0l-7.5-4.615A2.25 2.25 0 0 1 2.25 6.993V6.75" />
    </svg>
);

export const MinusCircleIcon: React.FC<{className?: string; strokeWidth?: number}> = ({ className = "w-6 h-6", strokeWidth = 1.5 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={strokeWidth} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
);

export const ShampooBottleIcon: React.FC<{className?: string; strokeWidth?: number}> = ({ className = "w-6 h-6", strokeWidth = 1.5 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={strokeWidth} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5V6a2.25 2.25 0 0 1 2.25-2.25h3A2.25 2.25 0 0 1 15.75 6v1.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 3.75h3" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5h7.5v10.5a1.5 1.5 0 0 1-1.5 1.5h-4.5a1.5 1.5 0 0 1-1.5-1.5V7.5Z" />
    </svg>
);

export const ShieldCogIcon: React.FC<{className?: string; strokeWidth?: number}> = ({ className = "w-6 h-6", strokeWidth = 1.5 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={strokeWidth} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527c.47-.336 1.06-.234 1.41.234l.782.782c.35.35.452.94.234 1.41l-.527.737c-.25.35-.272.806-.108 1.204.166.397.506.71.93.78l.894.15c.542.09.94.56.94 1.109v1.094c0 .55-.398 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.93.78-.164.398-.142.854.108 1.204l.527.738c.336.47.234 1.06-.234 1.41l-.782.782c-.35-.35-.94.452-1.41-.234l-.737-.527c-.35-.25-.806-.272-1.205-.108-.397.166-.71.506-.78.93l-.15.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.02-.398-1.11-.94l-.149-.894c-.07-.424-.384-.764-.78-.93-.398-.164-.855-.142-1.205.108l-.737.527c-.47.336-1.06-.234-1.41-.234l-.782-.782c-.35-.35-.452-.94-.234-1.41l.527-.737c.25-.35.272-.806.108-1.204-.166-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0 .55.398-1.02.94-1.11l.894-.149c.424-.07.764-.383.93-.78.164-.398-.142.854-.108-1.204l-.527-.738c-.336-.47-.234-1.06.234-1.41l.782-.782c.35-.35.94-.452-1.41-.234l.737.527c.35.25.806.272 1.205.108.397-.166.71-.506.78-.93l.15-.894Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>
);

export const PlantIcon: React.FC<{className?: string; strokeWidth?: number}> = ({ className = "w-6 h-6", strokeWidth = 1.5 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={strokeWidth} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21.75V12m0 0a8.25 8.25 0 0 1-5.14-1.546M12 12a8.25 8.25 0 0 0 5.14-1.546M12 12v9.75M12 12a8.25 8.25 0 0 1-5.14-1.546m5.14 1.546a8.25 8.25 0 0 0 5.14-1.546M4.537 9.398a8.25 8.25 0 0 1 14.926 0" />
    </svg>
);

export const UserIcon: React.FC<{className?: string; strokeWidth?: number}> = ({ className = "w-6 h-6", strokeWidth = 1.5 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={strokeWidth} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
    </svg>
);

export const ChatIcon: React.FC<{className?: string; strokeWidth?: number}> = ({ className = "w-6 h-6", strokeWidth = 1.5 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={strokeWidth} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
    </svg>
);

export const MapPinIcon: React.FC<{className?: string; strokeWidth?: number}> = ({ className = "w-6 h-6", strokeWidth = 1.5 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={strokeWidth} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
    </svg>
);

export const AtSymbolIcon: React.FC<{className?: string; strokeWidth?: number}> = ({ className = "w-6 h-6", strokeWidth = 1.5 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={strokeWidth} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25" />
    </svg>
);

export const WalletIcon: React.FC<{className?: string; strokeWidth?: number}> = ({ className = "w-6 h-6", strokeWidth = 1.5 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={strokeWidth} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 13.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
    </svg>
);

export const ChevronLeftIcon: React.FC<{className?: string; strokeWidth?: number}> = ({ className = "w-5 h-5", strokeWidth = 2.5 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={strokeWidth} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
    </svg>
);

export const ChevronRightIcon: React.FC<{className?: string; strokeWidth?: number}> = ({ className = "w-5 h-5", strokeWidth = 2.5 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={strokeWidth} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
    </svg>
);

export const ArrowRightIcon: React.FC<{className?: string; strokeWidth?: number}> = ({ className = "w-6 h-6", strokeWidth = 1.5 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={strokeWidth} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
    </svg>
);

export const TrashIcon: React.FC<{className?: string; strokeWidth?: number}> = ({ className = "w-6 h-6", strokeWidth = 1.5 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={strokeWidth} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
    </svg>
);

export const AmexIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className} viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="amex-title">
        <title id="amex-title">American Express</title>
        <rect width="38" height="24" rx="3" fill="#006FCF"/>
        <path d="M12,12 h14 v2 h-14 z M12,15 h14 v2 h-14 z M12,9 h14 v2 h-14 z" fill="#FFF"/>
    </svg>
);
export const DinersClubIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className} viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="diners-title">
        <title id="diners-title">Diners Club</title>
        <rect width="38" height="24" rx="3" fill="#00477F"/>
        <circle cx="19" cy="12" r="7" fill="white"/>
        <circle cx="19" cy="12" r="4" fill="#00477F"/>
    </svg>
);
export const MastercardIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className} viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="mastercard-title">
        <title id="mastercard-title">Mastercard</title>
        <rect width="38" height="24" rx="3" fill="#F7F7F7"/>
        <circle cx="15" cy="12" r="7" fill="#EB001B"/>
        <circle cx="23" cy="12" r="7" fill="#F79E1B"/>
        <path d="M20 12a7.5 7.5 0 0 1-10 0 7.5 7.5 0 0 1 10 0z" fill="#FF5F00"/>
    </svg>
);
export const VisaIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className} viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="visa-title">
        <title id="visa-title">Visa</title>
        <rect width="38" height="24" rx="3" fill="#142688"/>
        <path d="M10 12l2-7h3l-2 7zm6 0l2-7h3l-2 7zm-3.5 4l-1-4h-5l1 4z" fill="#F7B600"/>
    </svg>
);

export const ClipboardIcon: React.FC<{className?: string; strokeWidth?: number}> = ({ className = "w-6 h-6", strokeWidth = 1.5 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={strokeWidth} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25a2.25 2.25 0 00-2.25 2.25v9.75a2.25 2.25 0 002.25 2.25h9.75a2.25 2.25 0 002.25-2.25" />
    </svg>
);

export const CheckIcon: React.FC<{className?: string; strokeWidth?: number}> = ({ className = "w-6 h-6", strokeWidth = 1.5 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={strokeWidth} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
    </svg>
);

export const CreditCardIcon: React.FC<{className?: string; strokeWidth?: number}> = ({ className = "w-6 h-6", strokeWidth = 1.5 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={strokeWidth} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15A2.25 2.25 0 002.25 6.75v10.5A2.25 2.25 0 004.5 19.5z" />
    </svg>
);

export const GlobeAltIcon: React.FC<{className?: string; strokeWidth?: number}> = ({ className = "w-6 h-6", strokeWidth = 1.5 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={strokeWidth} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A11.953 11.953 0 0112 13.5c-2.998 0-5.74-1.1-7.843-2.918" />
    </svg>
);

export const ShieldCheckIcon: React.FC<{className?: string; strokeWidth?: number}> = ({ className = "w-6 h-6", strokeWidth = 1.5 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={strokeWidth} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75l2.25 2.25 4.5-4.5m-6.75 2.25c.621 1.168 1.895 2 3.375 2 1.48 0 2.754-.832 3.375-2M21 12c0 4.556-3.046 8.41-7.258 9.497a18.274 18.274 0 01-1.332.222c-.52.072-1.05.111-1.59.135a18.636 18.636 0 01-1.59-.135c-.47-.058-.93-.14-1.332-.222C6.046 20.41 3 16.556 3 12V6.321c0-1.04.85-1.9 1.89-1.928a17.848 17.848 0 011.66-.098 18.274 18.274 0 014.11 0c.58.04 1.14.12 1.66.218 1.04.188 1.89 1.088 1.89 2.119V12Z" />
    </svg>
);

export const SparklesIcon: React.FC<{className?: string; strokeWidth?: number}> = ({ className = "w-6 h-6", strokeWidth=1.5 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={strokeWidth} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09zM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456zM16.898 20.562 16.5 21.75l-.398-1.188a3.375 3.375 0 0 0-2.455-2.456L12.75 18l1.188-.398a3.375 3.375 0 0 0 2.455-2.456L16.5 14.25l.398 1.188a3.375 3.375 0 0 0 2.456 2.456L20.25 18l-1.188.398a3.375 3.375 0 0 0-2.456 2.456z" />
    </svg>
);

export const ShareIcon: React.FC<{className?: string; strokeWidth?: number}> = ({ className = "w-6 h-6", strokeWidth = 1.5 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={strokeWidth} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 0-2.186 2.25 2.25 0 0 0 0 2.186Zm0-12.814a2.25 2.25 0 1 0 0-2.186 2.25 2.25 0 0 0 0 2.186Z" />
    </svg>
);

export const GiftIcon: React.FC<{className?: string; strokeWidth?: number}> = ({ className = "w-6 h-6", strokeWidth = 1.5 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={strokeWidth} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H4.5a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1014.625 7.5H9.375A2.625 2.625 0 1012 4.875zM21 11.25H3v-3.75a1.5 1.5 0 011.5-1.5h15a1.5 1.5 0 011.5 1.5v3.75z" />
    </svg>
);

export const LockClosedIcon: React.FC<{className?: string; strokeWidth?: number}> = ({ className = "w-6 h-6", strokeWidth = 1.5 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={strokeWidth} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 0 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
    </svg>
);

export const DownloadIcon: React.FC<{className?: string; strokeWidth?: number}> = ({ className = "w-6 h-6", strokeWidth = 1.5 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={strokeWidth} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </svg>
);

export const WhatsAppIcon: React.FC<{className?: string;}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.371-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01s-.521.074-.792.372c-.272.296-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
    </svg>
);
