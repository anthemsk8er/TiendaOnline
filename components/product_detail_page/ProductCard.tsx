import React from 'react';
import type { RelatedProduct } from '../../types';

interface ProductCardProps {
  product: RelatedProduct;
  onClick: (productId: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  const handleClick = () => {
    onClick(product.id);
  };

  return (
    <button 
      onClick={handleClick} 
      className="border rounded-lg overflow-hidden group text-left w-full transition-shadow hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
      aria-label={`View details for ${product.title}`}
    >
      <div className="aspect-square bg-gray-100 overflow-hidden">
        <img src={product.image} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"/>
      </div>
      <div className="p-3">
        <h3 className="font-medium text-sm text-gray-700 truncate">{product.title}</h3>
        <p className="font-bold text-base text-gray-900 mt-1">S/ {product.price.toFixed(2)}</p>
      </div>
    </button>
  );
};

export default ProductCard;
