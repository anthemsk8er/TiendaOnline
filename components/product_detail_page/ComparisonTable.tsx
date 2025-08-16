
import React from 'react';
import { CheckCircleIcon, XMarkIcon } from './Icons';
import type { ComparisonData } from '../../types';

interface ComparisonTableProps {
  comparisonData?: ComparisonData | null;
  productImageUrl?: string;
}

const ComparisonTable: React.FC<ComparisonTableProps> = ({ comparisonData, productImageUrl }) => {
  if (!comparisonData || !comparisonData.features || comparisonData.features.length === 0) {
    return null;
  }

  const { title, subtitle, features } = comparisonData;

  return (
    <section className="py-12 sm:py-16 lg:py-20 mt-16 lg:mt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {title && (
            <div className="text-center mb-10">
              <h2 className="text-3xl lg:text-4xl font-black text-[#1a2b63] tracking-tight uppercase animate-fade-in-up">
                {title}
              </h2>
              {subtitle && (
                <p className="mt-4 max-w-3xl mx-auto text-center text-gray-600 animate-fade-in-up delay-100">
                  {subtitle}
                </p>
              )}
            </div>
          )}
          <div className="grid grid-cols-[2fr,1.5fr,1fr] items-stretch gap-1 sm:gap-1.5">
            {/* Header row */}
            <div></div> {/* Empty cell for alignment */}
            <div className="flex flex-col items-center justify-end text-center p-4 rounded-t-2xl bg-[#2952a3] z-10 relative shadow-xl shadow-black/20">
              <img 
                src={productImageUrl || 'https://picsum.photos/id/1084/100/100'} 
                alt="Nuestro Producto" 
                className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-md object-cover"
                width="80"
                height="80"
                loading="lazy"
              />
            </div>
            <div className="flex items-end justify-center text-center p-4">
              <h3 className="text-[#1a2b63] font-bold text-lg sm:text-xl">Otros</h3>
            </div>
            
            {/* Feature rows mapped */}
            {features.map((feature, index) => (
              <React.Fragment key={index}>
                {/* Feature Name Cell */}
                <div className={`flex items-center bg-white p-4 sm:p-5 border ${index === 0 ? 'rounded-tl-2xl' : ''} ${index === features.length - 1 ? 'rounded-bl-2xl' : ''}`}>
                  <p className="font-bold text-[#1a2b63] text-sm sm:text-base">{feature.feature}</p>
                </div>

                {/* Our Product Cell */}
                <div className={`flex items-center justify-center bg-[#2952a3] p-4 z-10 relative shadow-xl shadow-black/20 ${index === features.length - 1 ? 'rounded-b-2xl' : ''}`}>
                  {feature.ours ? <CheckCircleIcon className="w-8 h-8 text-green-500" /> : <XMarkIcon className="w-7 h-7 text-gray-400" strokeWidth={2.5}/>}
                </div>

                {/* Others Cell */}
                <div className={`flex items-center justify-center bg-white p-4 border ${index === 0 ? 'rounded-tr-2xl' : ''} ${index === features.length - 1 ? 'rounded-br-2xl' : ''}`}>
                  {feature.theirs ? <CheckCircleIcon className="w-8 h-8 text-green-500" /> : <XMarkIcon className="w-7 h-7 text-gray-700" strokeWidth={2.5}/>}
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonTable;