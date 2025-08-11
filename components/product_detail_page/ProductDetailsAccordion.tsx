
import React, { useState } from 'react';
import { CheckBoxIcon, ChevronDownIcon, ChevronUpIcon } from './Icons';
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
    <div className="mt-6 px-2 border-t border-gray-200">
      {details.map((item, index) => {
        const isOpen = openIndex === index;
        return (
            <div key={index} className="border-b border-gray-200">
                <button
                    onClick={() => handleToggle(index)}
                    className="w-full flex justify-between items-center py-4 text-left gap-4"
                    aria-expanded={isOpen}
                >
                    <span className="flex items-center gap-3">
                        <CheckBoxIcon className="w-6 h-6 text-gray-700 flex-shrink-0" />
                        <span className="font-semibold text-gray-800">{item.title}</span>
                    </span>
                    {isOpen ? <ChevronUpIcon className="w-5 h-5 text-gray-500" /> : <ChevronDownIcon className="w-5 h-5 text-gray-500" />}
                </button>
                <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                    <div className="overflow-hidden">
                        <p className="pb-4 text-gray-600 pl-9 pr-4">
                            {item.content}
                        </p>
                    </div>
                </div>
            </div>
        )
      })}
    </div>
  );
};

export default ProductDetailsAccordion;
