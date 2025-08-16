

import React, { useState, useEffect } from 'react';
import type { Product } from '../../types';
import QuantitySelector from './QuantitySelector';
import StarRating from './StarRating';
import { 
    ShoppingBagIcon, 
    TruckIcon,
    ShippingBoxIcon,
    ShieldIcon,
    CreditCardIcon,
    GlobeAltIcon
} from './Icons';
import ProductDetailsAccordion from './ProductDetailsAccordion';

interface ProductInfoProps {
  product: Product;
  onOrderNow: (quantity: number) => void;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product, onOrderNow }) => {
  const [quantity, setQuantity] = useState(1);
  const [viewers, setViewers] = useState(0);

  useEffect(() => {
    // Set initial random viewers
    setViewers(Math.floor(Math.random() * 200) + 100); // 

    const interval = setInterval(() => {
      setViewers(prev => {
        const change = Math.floor(Math.random() * 7) - 9; //
        const newViewers = prev + change;
        return newViewers > 100 ? newViewers : 100; // Keep it above 100
      });
    }, 4500); // Update every 4.5 seconds

    return () => clearInterval(interval);
  }, []);

  const guaranteeItems = [
    { icon: <ShieldIcon className="h-8 w-8 text-sky-600" strokeWidth={1.5}/>, text: "Garantía de Satisfacción" },
    { icon: <CreditCardIcon className="h-8 w-8 text-sky-600" strokeWidth={1.5}/>, text: "Compra Segura" },
    { icon: <TruckIcon className="h-8 w-8 text-sky-600" strokeWidth={1.5}/>, text: "Pago Contra Entrega" },
    { icon: <GlobeAltIcon className="h-8 w-8 text-sky-600" strokeWidth={1.5}/>, text: "Envíos a Nivel Nacional" }
  ];

  const timelineItems = [
      { icon: <ShoppingBagIcon className="w-6 h-6 text-white" strokeWidth={2}/>, time: "30 minutos", text: "Confirmamos tu Pedido"},
      { icon: <ShippingBoxIcon className="w-6 h-6 text-white" strokeWidth={2}/>, time: "24 horas", text: "Realizamos el Envío"},
      { icon: <TruckIcon className="w-6 h-6 text-white" strokeWidth={2}/>, time: "24 a 48 horas", text: "Entregamos tu Pedido"},
  ];

  return (
    <div className="flex flex-col gap-4">
     {/* <p className="text-sm font-semibold uppercase text-gray-500 animate-fade-in-up">{product.vendor}</p> */}
      
      <div className="flex items-baseline gap-3 animate-fade-in-up delay-100">
        {product.originalPrice && product.originalPrice > product.price ? (
            <>
              <p className="text-3xl font-bold text-[#1a2b63]">S/ {product.price.toFixed(2)}</p>
              <p className="text-md text-gray-400 line-through">S/ {product.originalPrice.toFixed(2)}</p>
              <span className="bg-[#16a085] text-white text-xs font-bold px-2 py-1 rounded-md">OFERTA</span>
            </>
          ) : (
            <p className="text-3xl font-bold text-[#1a2b63]">S/ {product.price.toFixed(2)}</p>
          )
        }
      </div>

      <h1 className="text-2xl md:text-3xl font-bold text-[#1a2b63] animate-fade-in-up delay-200">{product.title}</h1>
      
      
      <div className="flex items-center gap-2 animate-fade-in-up delay-300">
        <StarRating rating={product.rating} />
        <span className="text-sm text-gray-600">({product.reviewCount} reseñas)</span>
      </div>


             <div className="mt-4 space-y-1 animate-fade-in-up delay-500">
        <p className="font-semibold text-gray-800 flex items-center text-sm">
            <span className="w-2.5 h-2.5 bg-[#16a085] rounded-full mr-2 animate-pulse"></span>
            {viewers} PERSONAS VIENDO ESTE PRODUCTO.
        </p>
        {product.stock > 0 && product.stock < 20 && (
            <p className="text-sm text-gray-700">
                Solamente quedan <strong className="font-bold text-[#16a085]">{product.stock}</strong> en stock.
            </p>
        )}
      </div>



 
      {product.description && (
        <div className="bg-zinc-50 p-5 rounded-xl mt-6 animate-fade-in-up delay-400">
            <p className="text-zinc-700 whitespace-pre-wrap">{product.description}</p>
        </div>
      )}

      <div className="mt-6 flex flex-col gap-4 animate-fade-in-up delay-500">
          <button 
            onClick={() => onOrderNow(quantity)}
            className="w-full bg-[#16a085] text-white font-bold py-4 px-6 rounded-xl border-black-400 hover:bg-[#117a65] transition-colors flex items-center justify-center gap-3 text-lg shadow-lg shadow-[#16a085]/30"
          >
              <div className="text-left">
                <span className="block font-bold text-base leading-tight">REALIZA TU PEDIDO</span>
                <span className="block text-xs font-normal">Pide Ahora, ¡PAGA AL RECIBIR! Envío Gratis</span>
              </div>
              <ShoppingBagIcon className="w-8 h-8 ml-auto"/>
          </button>
      </div>



      <div className="mt-4 border border-sky-400 bg-sky-50/50 rounded-lg grid grid-cols-2 sm:grid-cols-4 divide-x divide-sky-300 text-center animate-fade-in-up delay-600">
        {guaranteeItems.map((item, index) => (
            <div key={index} className="p-3 flex flex-col items-center justify-start gap-2">
                {item.icon}
                <span className="text-xs font-bold text-gray-700 uppercase leading-tight">{item.text}</span>
            </div>
        ))}
      </div>

      <div className="mt-10 mb-6 animate-fade-in-up delay-700">
        <div className="flex justify-between items-start text-center relative">
          <div className="absolute top-5 left-1/2 -translate-x-1/2 w-2/3 h-0.5 bg-gray-200" style={{zIndex: -1}}></div>
          {timelineItems.map((item) => (
            <div key={item.time} className="flex-1 px-2">
              <div className="w-10 h-10 mx-auto bg-[#2952a3] rounded-full flex items-center justify-center text-white border-4 border-white z-10 relative">
                  {item.icon}
              </div>
              <p className="mt-2 font-bold text-sm text-gray-800">{item.time}</p>
              <p className="text-xs text-gray-500 leading-tight">{item.text}</p>
            </div>
          ))}
        </div>
      </div>


      <ProductDetailsAccordion details={product.details ?? null} />
      
    </div>
  );
};

export default ProductInfo;
