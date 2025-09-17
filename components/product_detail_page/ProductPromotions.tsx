import React, { useState, useEffect } from 'react';
import type { PromotionsData, PromotionCard } from '../../types';

interface ProductPromotionsProps {
  data?: PromotionsData | null;
  onSelectPromotion: (promotion: PromotionCard) => void;
}

const CountdownTimer: React.FC<{ endDate: string }> = ({ endDate }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(endDate) - +new Date();
    let timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  });
  
  const totalSeconds = timeLeft.days * 86400 + timeLeft.hours * 3600 + timeLeft.minutes * 60 + timeLeft.seconds;

  if (totalSeconds <= 0) {
    return <div className="text-center font-bold text-red-500">¡La oferta ha terminado!</div>;
  }
  
  const timeUnits = [];
  if (timeLeft.days > 0) timeUnits.push({ value: timeLeft.days, label: 'Días'});
  timeUnits.push({ value: timeLeft.hours, label: 'Horas' });
  timeUnits.push({ value: timeLeft.minutes, label: 'Min' });
  timeUnits.push({ value: timeLeft.seconds, label: 'Seg' });


  return (
    <div className="flex justify-center items-stretch gap-2 sm:gap-3">
        {timeUnits.map((unit, index) => (
            <React.Fragment key={unit.label}>
                <div className="text-center bg-white p-3 rounded-lg shadow-sm border border-gray-200 min-w-[65px]">
                    <span className="text-3xl font-bold text-[#1a2b63]">{String(unit.value).padStart(2, '0')}</span>
                    <span className="block text-[10px] uppercase tracking-wider text-gray-500 font-semibold">{unit.label}</span>
                </div>
                {index < timeUnits.length - 1 && (
                    <div className="text-3xl font-light self-center text-gray-300 pb-2">:</div>
                )}
            </React.Fragment>
        ))}
    </div>
  );
};


const ProductPromotions: React.FC<ProductPromotionsProps> = ({ data, onSelectPromotion }) => {
  if (!data || !data.promotions || data.promotions.length === 0) {
    return null;
  }

  const { subtitle, countdownEndDate, promotions } = data;

  return (
    <div className="space-y-4">
        {subtitle && (
            <p className="text-left text-sm text-gray-600 -mt-2 mb-2">{subtitle}</p>
        )}
        {countdownEndDate && (
            <div>
              <CountdownTimer endDate={countdownEndDate} />
            </div>
        )}
        <div className="grid grid-cols-2 gap-4">
          {promotions.map((promo) => (
            <button
              key={promo.id}
              onClick={() => onSelectPromotion(promo)}
              className={`p-4 rounded-2xl transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 flex flex-col text-center shadow-md bg-white ${
                promo.isBestDeal
                  ? 'border-2 border-[#2952a3] focus:ring-[#2952a3]'
                  : 'border border-gray-200 focus:ring-teal-500'
              }`}
            >
              <div className="font-bold uppercase text-[10px] h-6 flex items-center justify-center">
                <span className={`px-3 py-1 rounded-full text-white whitespace-nowrap ${promo.isBestDeal ? 'bg-[#2952a3]' : 'bg-[#2952a3]'}`}>{promo.header}</span>
              </div>

              <h3 className="text-xs font-bold leading-tight h-8 flex items-center justify-center text-[#1a2b63] my-1 whitespace-nowrap">
                {promo.title}
              </h3>
              
              <div className="flex flex-col items-center justify-center my-1">
                {promo.originalPrice && (
                  <p className="text-s mb-1 line-through text-gray-400">
                    S/ {promo.originalPrice.toFixed(2)}
                  </p>
                )}
                <p className="text-2xl font-extrabold text-[#1a2b63] leading-none">
                  S/ {promo.price.toFixed(2)}
                </p>
              </div>
              
               {promo.tag && (
                 <div className="text-xs font-semibold py-1 px-3 rounded-full inline-block self-center bg-gray-100 text-gray-700 my-2">
                    {promo.tag}
                 </div>
              )}

              <div className="mt-auto text-center font-bold py-2 px-3 rounded-lg bg-teal-600 hover:bg-teal-700 w-full shadow-md text-white text-xs">
                👉 ¡Lo quiero!
              </div>
            </button>
          ))}
        </div>
    </div>
  );
};

export default ProductPromotions;