
import React from 'react';
import type { FeaturesData } from '../../types';
import DynamicIcon from '../shared/DynamicIcon';


interface FeatureItemProps {
  icon: string;
  title: string;
  children: React.ReactNode;
  alignment?: 'left' | 'right';
}

const FeatureItem: React.FC<FeatureItemProps> = ({ icon, title, children, alignment = 'left' }) => {
    const isRight = alignment === 'right';
    const containerClasses = `flex items-start gap-4 ${isRight ? 'lg:flex-row-reverse' : ''}`;
    const textAlignment = `text-left ${isRight ? 'lg:text-right' : ''}`;

    return (
        <div className={containerClasses}>
            <div className="flex-shrink-0 mt-1">
                <DynamicIcon name={icon} className="w-8 h-8 text-[#1a2b63]" />
            </div>
            <div className={textAlignment}>
                <h3 className="font-bold text-lg text-[#1a2b63]">{title}</h3>
                <p className="mt-1 text-gray-600">{children}</p>
            </div>
        </div>
    );
};

interface ProductFeaturesProps {
    featuresData?: FeaturesData;
}

const ProductFeatures: React.FC<ProductFeaturesProps> = ({ featuresData }) => {
  if (!featuresData || !featuresData.imageUrl) {
    return null;
  }
  
  const { title, subtitle, imageUrl, features } = featuresData;
  const midPoint = Math.ceil(features.length / 2);
  const leftFeatures = features.slice(0, midPoint);
  const rightFeatures = features.slice(midPoint);

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-black text-[#1a2b63] tracking-tight uppercase animate-fade-in-up">
              {title}
            </h2>
            <p className="mt-4 max-w-3xl mx-auto text-center text-gray-600 animate-fade-in-up delay-100">
              {subtitle}
            </p>
        </div>

        <div className="mt-12 lg:mt-20 grid grid-cols-1 lg:grid-cols-[1fr,auto,1fr] lg:gap-x-12 gap-y-10">
            
            <div className="lg:col-start-1 space-y-10 lg:flex lg:flex-col lg:justify-center lg:items-end">
                {leftFeatures.map((feature, index) => (
                    <div className="max-w-md" key={index}>
                        <FeatureItem
                          title={feature.title}
                          alignment="right"
                          icon={feature.icon}
                        >
                          {feature.description}
                        </FeatureItem>
                    </div>
                ))}
            </div>
            
            <div className="lg:col-start-2 lg:row-start-1 lg:row-span-2 flex justify-center items-center">
                 <img 
                    src={imageUrl} 
                    alt={title} 
                    className="max-w-[600px] sm:max-w-sm w-full" 
                    width="400"
                    height="400"
                    loading="lazy"
                />
            </div>

            <div className="lg:col-start-3 lg:row-start-1 space-y-10 lg:flex lg:flex-col lg:justify-center">
                {rightFeatures.map((feature, index) => (
                     <div className="max-w-md" key={index}>
                        <FeatureItem
                          title={feature.title}
                          icon={feature.icon}
                        >
                          {feature.description}
                        </FeatureItem>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </section>
  );
};

export default ProductFeatures;