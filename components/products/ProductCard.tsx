
import React from 'react';
import type { SupabaseProduct, Product } from '../../types';

interface ProductCardProps {
  product: SupabaseProduct;
  onProductClick: (id: string) => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onCartOpen?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onProductClick, onAddToCart, onCartOpen }) => {
  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent onProductClick from firing when button is clicked

    const productForCart: Product = {
      id: product.id,
      vendor: product.vendor,
      title: product.name,
      price: product.discount_price ?? product.price,
      originalPrice: product.discount_price ? product.price : null,
      images: [product.image_url],
      rating: 5, // Default value as not in Supabase
      reviewCount: 0, // Default value
      description: product.description,
      benefits: [], // Default value
      ingredients: [], // Default value
      usage: '', // Default value
      stock: product.stock,
    };
    onAddToCart(productForCart, 1);
    if (onCartOpen) {
      onCartOpen();
    }
  };

  return (
    <div 
      className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer group flex flex-col"
      onClick={() => onProductClick(product.id)}
      aria-label={`View details for ${product.name}`}
    >
      <div className="relative">
        <div className="aspect-square bg-gray-100 overflow-hidden">
            <img
            src={`${product.image_url}?width=400&height=400&resize=cover&quality=80`}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            width="400"
            height="400"
            />
        </div>
        {product.discount_price && (
          <div className="absolute top-2 right-2 bg-[#16a085] text-white px-2 py-1 rounded-md text-xs font-bold">
            OFERTA
          </div>
        )}
      </div>
      
      <div className="p-3 flex flex-col flex-grow">
        {product.vendor && (
            <p className="text-xs font-semibold uppercase text-[#2575fc] mb-1 tracking-wider">
                {product.vendor}
            </p>
        )}
        <h3 className="font-medium text-sm text-[#1a2b63] mb-1 line-clamp-2 h-10">
          {product.name}
        </h3>
        
        {product.tags && product.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 my-2">
            {product.tags.map((tag) => (
              <span
                key={tag.id}
                className="px-2 py-0.5 text-xs rounded-full text-white font-semibold"
                style={{ backgroundColor: tag.color }}
              >
                {tag.name}
              </span>
            ))}
          </div>
        )}
        
        <div className="mt-auto pt-2">
            <div className="flex items-baseline gap-2">
                {product.discount_price ? (
                <>
                    <span className="font-bold text-base text-[#1a2b63]">
                    S/ {product.discount_price.toFixed(2)}
                    </span>
                    <span className="text-sm text-gray-500 line-through">
                    S/ {product.price.toFixed(2)}
                    </span>
                </>
                ) : (
                <span className="font-bold text-base text-[#1a2b63]">
                    S/ {product.price.toFixed(2)}
                </span>
                )}
            </div>
            
            {product.stock <= 5 && product.stock > 0 && (
              <p className="text-orange-500 text-xs mt-1 font-semibold">
                ¡Solo quedan {product.stock} unidades!
              </p>
            )}
            
            {product.stock === 0 && (
              <p className="text-red-500 text-sm mt-1 font-semibold">
                Agotado
              </p>
            )}
            <button 
                onClick={handleAddToCartClick}
                disabled={product.stock === 0}
                className="w-full mt-3 bg-[#16a085] text-white px-3 py-2 rounded-lg hover:bg-[#117a65] transition-colors duration-200 text-sm font-bold disabled:bg-gray-300 disabled:cursor-not-allowed">
                Agregar al Carrito
            </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;