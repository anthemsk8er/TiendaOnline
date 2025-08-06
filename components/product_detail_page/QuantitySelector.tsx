import React from 'react';
import { MinusIcon, PlusIcon } from './Icons';

interface QuantitySelectorProps {
  quantity: number;
  setQuantity: (q: number) => void;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({ quantity, setQuantity }) => {
  const handleDecrement = () => {
    setQuantity(Math.max(1, quantity - 1));
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div className="flex items-center border border-gray-300 rounded-md w-max">
      <button onClick={handleDecrement} className="p-2 text-gray-600 hover:bg-gray-100 rounded-l-md">
        <MinusIcon />
      </button>
      <span className="px-4 w-12 text-center font-medium">{quantity}</span>
      <button onClick={handleIncrement} className="p-2 text-gray-600 hover:bg-gray-100 rounded-r-md">
        <PlusIcon />
      </button>
    </div>
  );
};

export default QuantitySelector;