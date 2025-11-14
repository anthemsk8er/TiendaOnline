

import React from 'react';
// FIX: Changed import path to be relative to the root `types.ts`
import type { BenefitsData } from '../../types';
import DynamicIcon from '../shared/DynamicIcon';


interface ProductBenefitsSectionProps {
  imagePosition?: 'left' | 'right';
  benefitsData?: BenefitsData;
}

const ProductBenefitsSection: React.FC<ProductBenefitsSectionProps> = ({ imagePosition = 'right', benefitsData }) => {
    if (!benefitsData || !benefitsData.backgroundImageUrl) {
      return null;
    }

    const { backgroundImageUrl, benefits } = benefitsData;
    const isImageLeft = imagePosition === 'left';

    const textContent = (
        <div className="flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-12">
            <div className="space-y-10 max-w-lg mx-auto">
                {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-5">
                        <div className="flex-shrink-0 mt-1">
                            <DynamicIcon name={benefit.icon} className="w-9 h-9 text-[#16a085]" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-[#1a2b63]">{benefit.title}</h3>
                            <p className="mt-1 text-gray-600">{benefit.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const imageContent = (
        <div className="bg-slate-50 relative p-8 flex justify-center items-center min-h-[500px] lg:min-h-full overflow-hidden">
             <img
                src={backgroundImageUrl}
                alt="Imagen de beneficios del producto"
                className="max-w-full max-h-full object-contain"
                width="800"
                height="650"
                loading="lazy"
            />
        </div>
    );

    return (
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 my-16 lg:my-24">
            <div className={`grid grid-cols-1 lg:grid-cols-2 items-stretch bg-white shadow-xl rounded-lg overflow-hidden ${isImageLeft ? 'lg:grid-flow-col-dense' : ''}`}>
                <div className={`${isImageLeft ? 'lg:col-start-2' : ''}`}>
                  {textContent}
                </div>
                <div className={`${isImageLeft ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                  {imageContent}
                </div>
            </div>
        </section>
    );
};

export default ProductBenefitsSection;