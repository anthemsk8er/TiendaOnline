

import React, { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon, CheckBadgeIcon } from './Icons';
import type { FaqData } from '../../types';

interface FaqSectionProps {
  faqData?: FaqData | null;
}

const FaqSection: React.FC<FaqSectionProps> = ({ faqData }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (!faqData || !faqData.items || faqData.items.length === 0) {
    return null;
  }

  const { title, items } = faqData;

  return (
    <section className="mt-16 lg:mt-24 px-4">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-[#1a2b63] mb-8 animate-fade-in-up">{title}</h2>
      <div className="max-w-4xl mx-auto">
        {items.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={index} className="border-b border-gray-200">
              <button
                onClick={() => handleToggle(index)}
                className="w-full flex justify-between items-center py-5 text-left gap-4"
                aria-expanded={isOpen}
              >
                <span className="flex items-center gap-3">
                  <CheckBadgeIcon className="w-6 h-6 text-gray-400 flex-shrink-0" strokeWidth={1} />
                  <span className="font-semibold text-[#1a2b63]">{faq.question}</span>
                </span>
                {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
              </button>
              <div 
                className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
              >
                <div className="overflow-hidden">
                    <p className="pb-5 text-gray-600 pl-9 pr-4">
                        {faq.answer}
                    </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FaqSection;
