import React from 'react';
import type { PromotionsData, PromotionCard, PromotionPill } from '../../types';
import { CheckBadgeIcon, SparklesIcon } from './Icons';

interface ProductPromotionsProps {
  data?: PromotionsData | null;
  onSelectPromotion: (promotion: PromotionCard) => void;
  selectedPromotionId?: number | null;
}

const Pill: React.FC<{ pill: PromotionPill, isBestDeal: boolean }> = ({ pill, isBestDeal }) => {
    // FIX: Added whitespace-nowrap to prevent text wrapping.
    const baseClasses = "text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 whitespace-nowrap";
    const colorClass = "bg-[#2952a3]";
    
    const Icon = () => {
        if (pill.icon === 'check') return <CheckBadgeIcon className="w-3.5 h-3.5" />;
        if (pill.icon === 'sparkles') return <SparklesIcon className="w-3.5 h-3.5" />;
        return null;
    };

    return (
        <span className={`${baseClasses} ${colorClass}`}>
            <Icon />
            {pill.text}
        </span>
    );
};

// FIX: Updated placeholder to match new design with dashed border.
const ImagePlaceholder = () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-50/70 border-2 border-dashed border-gray-300 rounded-xl">
        <span className="text-xs text-gray-400 font-medium text-center">campo para imagen de oferta</span>
    </div>
);

const NormalPromotionCard: React.FC<{ promo: PromotionCard, onSelect: () => void, isSelected: boolean }> = ({ promo, onSelect, isSelected }) => (
    <button
      onClick={onSelect}
      className={`relative w-full border bg-white text-left rounded-2xl overflow-hidden group transition-all duration-200 hover:shadow-lg hover:-translate-y-1 ${isSelected ? 'border-[#2952a3] ring-2 ring-[#2952a3]/30' : 'border-gray-200'}`}
    >
      {promo.pills?.length > 0 && (
          <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10">
              <Pill pill={promo.pills[0]} isBestDeal={false} />
          </div>
      )}
      <div className="p-4 pt-10 flex flex-col h-full">
          <div className="aspect-[4/3] rounded-lg overflow-hidden mb-3">
              {promo.imageUrl ? <img src={promo.imageUrl} alt={promo.title} className="w-full h-full object-contain p-2"/> : <ImagePlaceholder />}
          </div>
          <div className="flex flex-col items-center mt-1">
              {promo.originalPrice && <span className="text-sm text-gray-400 line-through">S/{promo.originalPrice.toFixed(2)}</span>}
              {/* FIX: Made font size responsive. */}
              <span className="font-extrabold text-xl sm:text-2xl text-gray-800 leading-none py-1">S/{promo.price.toFixed(2)}</span>
          </div>
          {/* FIX: Added whitespace-nowrap to prevent title wrapping and made font size responsive. */}
          <h3 className="font-semibold text-sm sm:text-base text-gray-800 text-center mt-2 whitespace-nowrap">{promo.title}</h3>
          {promo.footerText && <p className="text-xs text-gray-500 text-center">{promo.footerText}</p>}
           {promo.subtitle && <p className="text-xs text-gray-500 text-center">{promo.subtitle}</p>}
          <div className="mt-auto pt-4">
              {/* FIX: Removed ShoppingBagIcon and related classes. */}
              <div className="w-full text-center bg-gray-400 text-white font-bold py-2.5 px-3 rounded-lg group-hover:bg-gray-500 transition-colors text-sm flex items-center justify-center">
                  {promo.buttonText}
              </div>
          </div>
      </div>
    </button>
);

const FeaturedPromotionCard: React.FC<{ promo: PromotionCard, onSelect: () => void, isSelected: boolean }> = ({ promo, onSelect, isSelected }) => {
    return (
        <button
            onClick={onSelect}
            className={`relative w-full border-2 text-left rounded-2xl overflow-hidden group transition-all duration-200 hover:shadow-xl hover:-translate-y-1 p-4 flex flex-col ${isSelected ? 'border-orange-500 ring-2 ring-orange-300 bg-orange-50/30' : 'border-[#2952a3] bg-white'}`}
        >
            <div className="flex items-center gap-1.5 mb-0">
                {promo.pills?.map((pill, i) => <Pill key={i} pill={pill} isBestDeal={true} />)}
            </div>

            <div className="grid grid-cols-[1fr,auto] gap-2 items-center mt-0">
                <div className="flex flex-col">
                    {/* FIX: Added whitespace-nowrap to prevent title wrapping and made font size responsive. */}
                    <h3 className="font-bold text-base sm:text-lg text-gray-800 whitespace-nowrap">{promo.title}</h3>
                    <div className="flex flex-col mt-1">
                         {/* FIX: Made font size responsive. */}
                         <span className="font-extrabold text-2xl sm:text-3xl text-gray-900 leading-none py-1">S/{promo.price.toFixed(2)}</span>
                        
                         {promo.originalPrice && <span className="text-base text-gray-400 line-through mt-1">antes S/{promo.originalPrice.toFixed(2)}</span>}
                    </div>
                </div>
               
               {/* IMAGEN DE PROMOCIÓN */}
                <div className="relative w-46 h-40 mr-1">
                    {promo.imageUrl ? <img src={promo.imageUrl} alt={promo.title} className="w-full h-full object-contain p-1"/> : <ImagePlaceholder />}
                </div>


            </div>

            <div className="mt-0 pt-0">
                 {/* FIX: Removed ShoppingBagIcon and related classes. */}
                <div className="w-full text-center bg-orange-500 text-white font-extrabold py-2 px-3 rounded-lg group-hover:bg-orange-600 transition-colors text-base shadow-lg shadow-orange-500/30 flex items-center justify-center">
                    {promo.buttonText}
                </div>
                {promo.footerText && <p className="text-sm text-gray-600 text-center mt-2">{promo.footerText}</p>}
            </div>
        </button>
    );
}

const ProductPromotions: React.FC<ProductPromotionsProps> = ({ data, onSelectPromotion, selectedPromotionId }) => {
  if (!data || !data.promotions || data.promotions.length === 0) {
    // Render nothing if there's no promotion data at all
    return null;
  }

  // Filter out promotions that don't have a valid price to avoid showing empty cards
  const validPromotions = data.promotions.filter(p => p && typeof p.price === 'number' && p.price > 0);
  
  if (validPromotions.length === 0) {
      return null;
  }

  const featuredPromotion = validPromotions.find(p => p.isBestDeal);
  const normalPromotions = validPromotions.filter(p => !p.isBestDeal);

  return (
    <div className="space-y-3">
        {normalPromotions.length > 0 && (
            <div className="grid grid-cols-2 gap-3">
                {normalPromotions.map((promo) => (
                    <NormalPromotionCard 
                        key={promo.id} 
                        promo={promo} 
                        onSelect={() => onSelectPromotion(promo)}
                        isSelected={selectedPromotionId === promo.id}
                    />
                ))}
            </div>
        )}

        {featuredPromotion && (
            <FeaturedPromotionCard 
                promo={featuredPromotion} 
                onSelect={() => onSelectPromotion(featuredPromotion)}
                isSelected={selectedPromotionId === featuredPromotion.id}
            />
        )}
    </div>
  );
};

export default ProductPromotions;