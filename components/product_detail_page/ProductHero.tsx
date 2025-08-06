import React from 'react';
import type { HeroData } from '../../types';
import InfiniteTextBanner from '../shared/InfiniteTextBanner';
import DynamicIcon from '../shared/DynamicIcon';

const FeatureBubble = ({ icon, text }: { icon: string, text: string }) => (
  <div className="flex flex-col items-center gap-2 text-center">
    <div className="w-24 h-24 bg-sky-100/80 rounded-full flex items-center justify-center">
      <DynamicIcon name={icon} className="w-10 h-10 text-sky-600" />
    </div>
    <p className="font-semibold text-sm max-w-[120px]">{text}</p>
  </div>
);

interface ProductHeroProps {
  heroData?: HeroData;
}

const ProductHero: React.FC<ProductHeroProps> = ({ heroData }) => {
  if (!heroData || !heroData.imageUrl) {
    // You can return a default static hero or null
    return null;
  }
  
  const { title, subtitle, imageUrl, benefits } = heroData;
  const midPoint = Math.ceil(benefits.length / 2);
  const leftBenefits = benefits.slice(0, midPoint);
  const rightBenefits = benefits.slice(midPoint);


  return (
    <section className="text-center py-8 px-4 md:py-12">



      <div className="flex justify-center items-center gap-2 animate-fade-in-up">
        <DynamicIcon name={benefits[0]?.icon || 'LeafIcon'} className="w-7 h-7 md:w-8 md:h-8 text-green-600" strokeWidth={2} />
        <h1 className="text-2xl md:text-4xl font-black text-gray-800 tracking-tighter">
          {title}
        </h1>
      </div>
      <p className="mt-2 text-base md:text-lg text-gray-500 animate-fade-in-up delay-100">{subtitle}</p>
      
      <div className="mt-8 max-w-5xl mx-auto">
        {/* Desktop Layout */}
        <div className="hidden md:flex flex-row items-center justify-center gap-8 lg:gap-12">
            <div className="flex flex-col justify-center gap-12">
                {leftBenefits.map((benefit, index) => (
                    <FeatureBubble key={index} icon={benefit.icon} text={benefit.title} />
                ))}
            </div>
            <div className="flex-shrink-0">
              <img 
                src={imageUrl}
                alt={title}
                className="max-w-[600px] sm:max-w-xs w-full z-10"
                width="320"
                height="320"
                loading="lazy"
              />
            </div>
            <div className="flex flex-col justify-center gap-12">
                {rightBenefits.map((benefit, index) => (
                    <FeatureBubble key={index} icon={benefit.icon} text={benefit.title} />
                ))}
            </div>
        </div>
        
        {/* Mobile Layout */}
        <div className="md:hidden flex flex-col items-center">
            <img 
              src={imageUrl}
              alt={title}
              className="max-w-[600px] w-full"
              width="600"
              height="600"
              loading="lazy"
            />
            <div className="mt-8 grid grid-cols-2 gap-x-8 gap-y-10 w-full">
                {benefits.map((benefit, index) => (
                    <FeatureBubble key={index} icon={benefit.icon} text={benefit.title} />
                ))}
            </div>
        </div>

      </div>
    </section>
  );
};
export default ProductHero;