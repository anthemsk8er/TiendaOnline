import React, { useState, useEffect } from 'react';
// FIX: Changed import path to be relative to the root `types.ts`
import type { Product, Profile, PromotionCard } from '../../types';
import StarRating from './StarRating';
import { 
    ShoppingBagIcon, 
    TruckIcon,
    ShippingBoxIcon,
    GlobeAltIcon,
    CheckCircleIcon,
    ShieldCheckIcon,
    WalletIcon,
    ChatIcon,
    CheckBadgeIcon,
    ShareIcon
} from './Icons';
import ProductDetailsAccordion from './ProductDetailsAccordion';
import ProductHighlights from './ProductHighlights';
import ProductPromotions from './ProductPromotions';

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
  
  const handleScrollToPayments = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('payment-methods-section');
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };
  
  const getDeliveryDateRange = () => {
    const today = new Date();
    const locale = 'es-ES';
    
    const startDate = new Date(today);
    startDate.setDate(today.getDate() + 1);

    const endDate = new Date(today);
    endDate.setDate(today.getDate() + 3);

    const startDay = startDate.getDate();
    const endDay = endDate.getDate();
    const startMonth = startDate.toLocaleString(locale, { month: 'long' });
    const endMonth = endDate.toLocaleString(locale, { month: 'long' });

    if (startMonth === endMonth) {
        return `entre el <strong>${startDay} y ${endDay} de ${startMonth}</strong>`;
    } else {
        return `entre el <strong>${startDay} de ${startMonth} y el ${endDay} de ${endMonth}</strong>`;
    }
  };

  const infoItems = [
    {
        icon: <TruckIcon className="w-6 h-6 text-teal-600 flex-shrink-0" strokeWidth={2}/>,
        text: <span dangerouslySetInnerHTML={{ __html: `Pídelo hoy y recíbelo ${getDeliveryDateRange()}` }} />
    },
    {
        icon: <WalletIcon className="w-6 h-6 text-teal-600 flex-shrink-0" strokeWidth={1.5}/>,
        text: <span>Contamos con todos los métodos de pago - <a href="#payment-methods-section" onClick={handleScrollToPayments} className="font-bold hover:underline">Ver métodos</a></span>
    },
    {
        icon: <ChatIcon className="w-6 h-6 text-teal-600 flex-shrink-0" strokeWidth={1.5}/>,
        text: <span><strong>Seguimiento por WhatsApp.</strong> Confirmamos tu pedido por este medio.</span>
    }
  ];

  const paymentMethods = [
    { name: 'Yape', logoUrl: 'https://uylwgmvnlnnkkvjqirhx.supabase.co/storage/v1/object/public/products/img/payment-methods/yape.png' },
    { name: 'Plin', logoUrl: 'https://uylwgmvnlnnkkvjqirhx.supabase.co/storage/v1/object/public/products/img/payment-methods/plin.png' },
    { name: 'Mastercard', logoUrl: 'https://uylwgmvnlnnkkvjqirhx.supabase.co/storage/v1/object/public/products/img/payment-methods/mastercard.png' },
    { name: 'Visa', logoUrl: 'https://uylwgmvnlnnkkvjqirhx.supabase.co/storage/v1/object/public/products/img/payment-methods/visa.png' },
    { name: 'P.O.S', logoUrl: 'https://uylwgmvnlnnkkvjqirhx.supabase.co/storage/v1/object/public/products/img/payment-methods/pos.png' },
    { name: 'Efectivo', logoUrl: 'https://uylwgmvnlnnkkvjqirhx.supabase.co/storage/v1/object/public/products/img/payment-methods/efectivo.png' },
  ];

  const guaranteeItems = [
    { icon: <CheckBadgeIcon className="h-7 w-7 text-teal-600" strokeWidth={1.5}/>, title: "Garantía de Satisfacción", subtitle: "Devolución garantizada" },
    { icon: <ShieldCheckIcon className="h-7 w-7 text-teal-600" strokeWidth={1.5}/>, title: "Compra 100% Segura", subtitle: "Tus datos están seguros" },
    { icon: <WalletIcon className="h-7 w-7 text-teal-600" strokeWidth={1.5}/>, title: "Pago Contra Entrega", subtitle: "Válido para Lima Metro." },
    { icon: <GlobeAltIcon className="h-7 w-7 text-teal-600" strokeWidth={1.5}/>, title: "Envíos a todo el Perú", subtitle: "Recíbelo en tu casa" }
  ];

  const timelineItems = [
      { icon: <ShoppingBagIcon className="w-6 h-6 text-white" strokeWidth={2}/>, time: "30 minutos", text: "Confirmamos tu Pedido"},
      { icon: <ShippingBoxIcon className="w-6 h-6 text-white" strokeWidth={2}/>, time: "24 horas", text: "Realizamos el Envío"},
      { icon: <TruckIcon className="w-6 h-6 text-white" strokeWidth={2}/>, time: "24 a 48 horas", text: "Entregamos tu Pedido"},
  ];

  const hasBenefits = product.main_benefits && product.main_benefits.length > 0;
  const hasPromotions = product.promotions_data && product.promotions_data.promotions.length > 0;
  
  const handleShare = async () => {
    const shareData = {
        title: product.title,
        text: `¡Mira este increíble producto de KetoShop: ${product.title}!`,
        url: window.location.href,
    };
    if (navigator.share) {
        try {
            await navigator.share(shareData);
        } catch (err: any) {
            if (err.name !== 'AbortError') {
                console.error('Error sharing:', err);
            }
        }
    } else {
        try {
            await navigator.clipboard.writeText(window.location.href);
            alert('¡Enlace del producto copiado al portapapeles!');
        } catch (err) {
            console.error('Failed to copy: ', err);
            alert('No se pudo copiar el enlace.');
        }
    }
  };

  return (
    <div className="flex flex-col gap-4 px-4 pt-0 md:pt-8">
      
      <div className="flex items-baseline gap-2 animate-fade-in-up delay-100">
        {product.originalPrice && product.originalPrice > product.price ? (
            <>
              <p className="text-xl md:text-2xl font-bold text-gray-900">S/ {product.price.toFixed(2)}</p>
              <p className="text-base text-gray-400 line-through">S/ {product.originalPrice.toFixed(2)}</p>
              <span className="bg-[#16a085] text-white text-xs font-bold px-2 py-1 rounded-md">OFERTA</span>
            </>
          ) : (
            <p className="text-xl md:text-2xl font-bold text-gray-900">S/ {product.price.toFixed(2)}</p>
          )
        }
      </div>

      <h1 className="text-lg md:text-xl font-bold text-gray-900 leading-tight animate-fade-in-up delay-200">{product.title}</h1>
      
      <button onClick={handleShare} className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#16a085] transition-colors self-start animate-fade-in-up delay-200">
          <ShareIcon className="w-5 h-5"/>
          <span>Compartir con un amigo</span>
      </button>
      
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
        <span className="font-bold text-xs text-gray-800">(+2.500 Clientes Satisfechos)</span>
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
     

      <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm space-y-4">
        {infoItems.map((item, index) => (
            <div key={index} className="flex items-start gap-3">
                {item.icon}
                <div className="text-sm text-gray-700 pt-0.5">{item.text}</div>
            </div>
        ))}
      </div>
     


      <ProductHighlights data={product.highlights_data} />



      {hasBenefits && (
        <div className="animate-fade-in-up delay-400">
            <h3 className="text-lg font-bold text-gray-800 mb-3">Beneficios</h3>
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




      <div className="space-y-3">
        {guaranteeItems.map((point, index) => (
            <div key={index} className="flex items-center gap-4 border border-gray-200 rounded-lg p-3 bg-white shadow-sm">
                <div className="bg-teal-50 p-2 rounded-full">
                    {point.icon}
                </div>
                <div>
                    <p className="font-semibold text-gray-800 text-sm">{point.title}</p>
                    <p className="text-xs text-gray-600">{point.subtitle}</p>
                </div>
            </div>
        ))}
      </div>
      
 

      {hasPromotions && (
        <div className="animate-fade-in-up delay-500">
          <h3 className="text-lg font-bold text-gray-800 mb-3">
            {product.promotions_data?.title || 'Aprovecha las Ofertas'}
          </h3>
          <ProductPromotions
            data={product.promotions_data}
            onSelectPromotion={onSelectPromotion}
          />
        </div>
      )}
 

        <div id="payment-methods-section" className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm scroll-mt-24">
            <div className="text-center mb-3">
                <h3 className="text-sm font-bold text-gray-800">Paga con toda confianza</h3>
                <p className="text-xs text-gray-500">Aceptamos todos los métodos</p>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-1">
                {paymentMethods.map(method => (
                    <div key={method.name} className="bg-white p-0 rounded-lg border border-gray-200 flex items-center justify-center aspect-[4/3]">
                        <img src={method.logoUrl} alt={method.name} className="max-h-10 object-contain" />
                    </div>
                ))}
            </div>
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

      <div className="flex flex-col gap-4 animate-fade-in-up delay-600">
          <button 
            onClick={() => onOrderNow(quantity)}
            className="w-full bg-teal-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-teal-700 transition-colors flex items-center justify-center gap-3 text-lg shadow-lg shadow-teal-500/30"
          >
              <div className="text-center">
                <span className="block font-bold text-base leading-tight">CONTRAENTREGA</span>
                <span className="block text-xs font-normal">Realiza tu pedido hoy</span>
              </div>
          </button>
      </div>
      <ProductDetailsAccordion details={product.details ?? null} />
      
    </div>
  );
};

export default ProductInfo;