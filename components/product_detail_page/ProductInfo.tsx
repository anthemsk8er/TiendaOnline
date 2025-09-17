import React, { useState, useEffect } from 'react';
// FIX: Changed import path to be relative to the root `types.ts`
import type { Product, Profile, PromotionCard } from '../../types';
import QuantitySelector from './QuantitySelector';
import StarRating from './StarRating';
import { 
    ShoppingBagIcon, 
    TruckIcon,
    ShippingBoxIcon,
    ShieldIcon,
    CreditCardIcon,
    GlobeAltIcon,
    CheckCircleIcon
} from './Icons';
import ProductDetailsAccordion from './ProductDetailsAccordion';
import ProductHighlights from './ProductHighlights';
import ProductPromotions from './ProductPromotions';
import ShippingDetails from './ShippingDetails';

interface ProductInfoProps {
  product: Product;
  onOrderNow: (quantity: number) => void;
  profile: Profile | null;
  onEditProduct: (id: string) => void;
  onSelectPromotion: (promotion: PromotionCard) => void;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product, onOrderNow, profile, onEditProduct, onSelectPromotion }) => {
  const [quantity, setQuantity] = useState(1);
  const [viewers, setViewers] = useState(0);

  useEffect(() => {
    // Set initial random viewers
    setViewers(Math.floor(Math.random() * 200) + 100); // 

    const interval = setInterval(() => {
      setViewers(prev => {
        const change = Math.floor(Math.random() * 7) - 3; //
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

  const hasBenefits = product.main_benefits && product.main_benefits.length > 0;
  const hasPromotions = product.promotions_data && product.promotions_data.promotions.length > 0;

  return (
    <div className="flex flex-col gap-8 px-4 md:pt-8">
     {/* <p className="text-sm font-semibold uppercase text-gray-500 animate-fade-in-up">{product.vendor}</p> */}
      
      <div className="flex items-baseline gap-2 animate-fade-in-up delay-100">
        {product.originalPrice && product.originalPrice > product.price ? (
            <>
              <p className="text-2xl font-bold text-gray-900">S/ {product.price.toFixed(2)}</p>
              <p className="text-md text-gray-400 line-through">S/ {product.originalPrice.toFixed(2)}</p>
              <span className="bg-[#16a085] text-white text-xs font-bold px-2 py-1 rounded-md">OFERTA</span>
            </>
          ) : (
            <p className="text-2xl font-bold text-gray-900">S/ {product.price.toFixed(2)}</p>
          )
        }
      </div>

      <h1 className="text-2xl md:text-2xl font-bold text-gray-900 animate-fade-in-up delay-200">{product.title}</h1>
      
      {profile?.role === 'ADMIN' && (
          <button
              onClick={() => onEditProduct(product.id)}
              className="w-full bg-indigo-600 text-white font-bold py-2.5 px-6 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 text-sm shadow-md"
          >
              Editar Producto
          </button>
      )}

      <div className="flex items-center gap-2 animate-fade-in-up delay-300">
        <StarRating rating={5} />
        <span className="font-bold text-gray-800">(+20.000 Clientes Satisfechos)</span>
      </div>

      <div className="space-y-1 animate-fade-in-up delay-500">
        <p className="text-gray-800 flex items-center text-sm">
            <span className="w-2.5 h-2.5 bg-green-500 rounded-full mr-2 animate-pulse"></span>
            {viewers} PERSONAS VIENDO ESTE PRODUCTO.
        </p>
        {product.stock > 0 && product.stock < 20 && (
            <p className="text-sm text-gray-700">
                Solamente quedan <strong className="font-bold text-red-500">{product.stock}</strong> en stock.
            </p>
        )}
      </div>
      <ProductHighlights data={product.highlights_data} />

      <div className="border border-sky-400 bg-sky-50/50 rounded-lg grid grid-cols-2 sm:grid-cols-4 divide-x divide-sky-300 text-center animate-fade-in-up delay-600">
        {guaranteeItems.map((item, index) => (
            <div key={index} className="p-3 flex flex-col items-center justify-start gap-2">
                {item.icon}
                <span className="text-xs font-bold text-gray-700 uppercase leading-tight">{item.text}</span>
            </div>
        ))}
      </div>
      {hasBenefits && (
        <div className="animate-fade-in-up delay-400">
            <h3 className="text-xl font-bold text-gray-800 mb-3">Beneficios</h3>
            <div className="border border-gray-200 rounded-xl p-4 bg-white shadow-sm space-y-4">
                {product.main_benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                        <CheckCircleIcon className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="font-bold text-gray-800 text-sm leading-tight">{benefit.title}</p>
                            <p className="text-xs text-gray-600 mt-0.5">{benefit.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      )}

      {hasPromotions && (
        <div className="animate-fade-in-up delay-500">
          <h3 className="text-xl font-bold text-gray-800 mb-3">
            {product.promotions_data?.title || 'Aprovecha las Ofertas'}
          </h3>
          <ProductPromotions
            data={product.promotions_data}
            onSelectPromotion={onSelectPromotion}
          />
        </div>
      )}
 
      <div className="flex flex-col gap-4 animate-fade-in-up delay-600">
          <button 
            onClick={() => onOrderNow(quantity)}
            className="w-full bg-teal-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-teal-700 transition-colors flex items-center justify-center gap-3 text-lg shadow-lg shadow-teal-500/30"
          >
              <div className="text-center">
                <span className="block font-bold text-base leading-tight">REALIZA TU PEDIDO</span>
                <span className="block text-xs font-normal">Pide Ahora, ¡PAGA AL RECIBIR!</span>
              </div>
          </button>
      </div>


      <div className="animate-fade-in-up delay-700">
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

      <ShippingDetails />

      <ProductDetailsAccordion details={product.details ?? null} />
      
    </div>
  );
};

export default ProductInfo;