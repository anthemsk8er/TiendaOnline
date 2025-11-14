import React, { useState } from 'react';
import { CheckBoxIcon, ChevronDownIcon } from './Icons';
import type { AccordionItem } from '../../types';

interface ProductDetailsAccordionProps {
  details: AccordionItem[] | null;
}

const ProductDetailsAccordion: React.FC<ProductDetailsAccordionProps> = ({ details }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (!details || details.length === 0) {
    return null;
  }

  return (
    <div className="mt-4 py-6 px-4">
      {details.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={index}>
            <button
              onClick={() => handleToggle(index)}
              className="w-full flex justify-between items-center py-3 text-left text-sm gap-4"
              aria-expanded={isOpen}
            >
              <span className="flex items-center gap-3">
                <CheckBoxIcon className="w-5 h-5 text-teal-600 flex-shrink-0" />
                <span className="font-semibold text-gray-800">{item.title}</span>
              </span>
              <ChevronDownIcon className={`w-7 h-7 text-gray-500 transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`} />
            </button>

            <div
              className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
            >
              <div className="overflow-hidden">
                <div className="pb-5 text-gray-600 pl-8 pr-4 prose prose-sm text-sm max-w-none" dangerouslySetInnerHTML={{ __html: item.content }} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductDetailsAccordion;