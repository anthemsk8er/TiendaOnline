import React, { useState, useEffect, useRef, useMemo } from 'react';
import { XMarkIcon, UserIcon, ChatIcon, AtSymbolIcon, ShoppingBagIcon, WalletIcon } from '../product_detail_page/Icons';
import type { CartItem, DiscountCode, Order, PromotionsData, PromotionCard, Profile } from '../../types';
import { supabase } from '../../lib/supabaseClient';
import type { PostgrestSingleResponse, Session } from '@supabase/supabase-js';
import type { Database, Json } from '../../lib/database.types';
import ProductPromotions from '../product_detail_page/ProductPromotions';
import { openAlternatingWhatsApp } from '../../lib/whatsappUtils';

interface CheckoutPopupProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateCartQuantity: (productId: string, quantity: number, newUnitPrice?: number) => void;
  session: Session | null;
  profile: Profile | null;
}

const upsellProduct = {
    title: 'Agrega Gomitas de Colágeno + Biotina (Frasco de 90 Gomitas)',
    price: 39.90,
    image: 'https://uylwgmvnlnnkkvjqirhx.supabase.co/storage/v1/object/public/products/img/products/colageno.jpg'
};

const CheckoutPopup: React.FC<CheckoutPopupProps> = ({ isOpen, onClose, items, onUpdateCartQuantity, session, profile }) => {
  const [isUpsellChecked, setIsUpsellChecked] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    discountCode: '',
  });
  
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isFormValid, setIsFormValid] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);
  
  const [appliedDiscountCode, setAppliedDiscountCode] = useState<DiscountCode | null>(null);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [discountError, setDiscountError] = useState<string | null>(null);
  const [isVerifyingCode, setIsVerifyingCode] = useState(false);

  const [promotionsData, setPromotionsData] = useState<PromotionsData | null>(null);
  const [loadingPromotions, setLoadingPromotions] = useState(false);
  const singleProduct = items.length === 1 ? items[0] : null;

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

  useEffect(() => {
    const fetchPromotions = async () => {
        if (isOpen && singleProduct && supabase) {
            setLoadingPromotions(true);
            const { data, error } = await supabase
                .from('products')
                .select('promotions_data')
                .eq('id', singleProduct.id)
                .single();

            if (data?.promotions_data) {
                // FIX: Cast to unknown first to satisfy TypeScript when converting from Json type.
                setPromotionsData(data.promotions_data as unknown as PromotionsData);
            } else {
                setPromotionsData(null);
            }
            setLoadingPromotions(false);
        } else {
            setPromotionsData(null);
        }
    };

    if (isOpen) {
        fetchPromotions();
    } else {
        // Reset when popup closes
        setPromotionsData(null);
    }
  }, [isOpen, singleProduct?.id]);

  useEffect(() => {
    setAppliedDiscountCode(null);
    setDiscountAmount(0);
    setDiscountError(null);
    setFormData(prev => ({...prev, discountCode: ''}));
  }, [items, isOpen]);
  
  const handleSelectPromotion = (promotion: PromotionCard) => {
    if (singleProduct) {
        const quantityMatch = promotion.title.match(/\d+/);
        const quantity = quantityMatch ? parseInt(quantityMatch[0], 10) : 1;
        if (quantity > 0) {
            const newUnitPrice = promotion.price / quantity;
            onUpdateCartQuantity(singleProduct.id, quantity, newUnitPrice);
        }
    }
  };
  
  const selectedPromotion = useMemo(() => {
    if (!singleProduct || !promotionsData?.promotions) return null;
    return promotionsData.promotions.find(p => {
        const promoQuantityMatch = p.title.match(/\d+/);
        const promoQuantity = promoQuantityMatch ? parseInt(promoQuantityMatch[0], 10) : 1;
        if (promoQuantity === 0) return false;
        const promoUnitPrice = p.price / promoQuantity;
        return promoQuantity === singleProduct.quantity && Math.abs(promoUnitPrice - singleProduct.price) < 0.01;
    });
  }, [singleProduct, promotionsData]);
  
  const cartSubtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const total = cartSubtotal - discountAmount + (isUpsellChecked ? upsellProduct.price : 0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
        setErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors[name];
            return newErrors;
        });
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    const requiredMessage = "Rellena este campo para realizar tu orden";

    if (!formData.fullName.trim()) newErrors.fullName = requiredMessage;
    if (!formData.phone.trim()) {
        newErrors.phone = requiredMessage;
    } else if (!/^\d{9}$/.test(formData.phone.trim())) {
        newErrors.phone = "Por favor, ingresa un número de celular válido de 9 dígitos.";
    }
    
    // Optional email validation
    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
        newErrors.email = "Por favor, ingresa un correo válido.";
    }

    return newErrors;
  };
  
  useEffect(() => {
    const validationErrors = validateForm();
    setIsFormValid(Object.keys(validationErrors).length === 0);
  }, [formData]);

  const handleApplyDiscount = async () => {
      if (appliedDiscountCode) {
          setDiscountError("Solo se puede aplicar un código de descuento por orden.");
          return;
      }
      const codeToVerify = formData.discountCode.trim().toUpperCase();
      if (!codeToVerify) {
          setDiscountError("Por favor, ingresa un código.");
          return;
      }
      if (!supabase) {
          setDiscountError("No se puede conectar a la base de datos.");
          return;
      }

      setIsVerifyingCode(true);
      setDiscountError(null);
      setAppliedDiscountCode(null);
      setDiscountAmount(0);

      const { data: codeData, error }: PostgrestSingleResponse<DiscountCode> = await supabase
        .from('discount_codes')
        .select('*')
        .ilike('code', codeToVerify)
        .single();
      
      setIsVerifyingCode(false);

      if (error && error.code !== 'PGRST116') {
        console.error("Error fetching discount code:", error);
        setDiscountError("Ocurrió un error al verificar el código.");
        return;
      }

      if (!codeData) {
        setDiscountError("El código de descuento no es válido.");
        return;
      }
      
      if (!codeData.is_active) {
          setDiscountError("Este código de descuento no está activo.");
          return;
      }

      if (profile) {
        if (codeToVerify === 'HOLADUERMEKB10' && profile.gift_coupon_1_used) {
          setDiscountError("Ya has utilizado este cupón de regalo.");
          return;
        }
        if (codeToVerify === 'HOLAKETOCAPS10' && profile.gift_coupon_2_used) {
          setDiscountError("Ya has utilizado este cupón de regalo.");
          return;
        }
        if (codeToVerify === 'HOLAKETOCAPS15' && profile.gift_coupon_3_used) {
          setDiscountError("Ya has utilizado este cupón de regalo.");
          return;
        }
      }

      if (codeData.minimum_purchase_amount && cartSubtotal < codeData.minimum_purchase_amount) {
          setDiscountError(`Esta compra debe ser de al menos S/ ${codeData.minimum_purchase_amount.toFixed(2)} para usar este código.`);
          return;
      }
      
      const now = new Date();
      if (codeData.limitation_type === 'date_range' && codeData.end_date && new Date(codeData.end_date) < now) {
          setDiscountError("Este código de descuento ha expirado.");
          return;
      }

      if (codeData.limitation_type === 'usage_limit' && codeData.usage_limit !== null && codeData.times_used >= codeData.usage_limit) {
          setDiscountError("Este código ha alcanzado su límite de usos totales.");
          return;
      }
      
      if (session?.user.id && codeData.usage_limit_per_user) {
          const { count, error: countError } = await supabase
              .from('orders')
              .select('id', { count: 'exact', head: true })
              .eq('user_id', session.user.id)
              .eq('discount_code', codeToVerify);

          if (countError) throw countError;

          if (count !== null && count >= codeData.usage_limit_per_user) {
              setDiscountError("Has alcanzado el límite de usos para este código.");
              return;
          }
      }
      
      if (codeData.scope === 'product' && !items.some(item => item.id === codeData.product_id)) {
          setDiscountError("Este código no es válido para los productos en tu carrito.");
          return;
      }

      let calculatedDiscount = 0;
      let targetAmount = (codeData.scope === 'product') 
        ? items.find(item => item.id === codeData.product_id)?.price ?? 0 
        : cartSubtotal;

      if (codeData.discount_type === 'fixed_amount') {
          calculatedDiscount = codeData.discount_value;
      } else {
          calculatedDiscount = targetAmount * (codeData.discount_value / 100);
      }
      
      calculatedDiscount = Math.min(calculatedDiscount, targetAmount);

      setAppliedDiscountCode(codeData);
      setDiscountAmount(calculatedDiscount);
  };
  

  const handleFinalizePurchase = async (e: React.MouseEvent<HTMLButtonElement>, paymentMethod: string) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
        const firstErrorKey = Object.keys(validationErrors)[0];
        const errorElement = formRef.current?.querySelector(`[name="${firstErrorKey}"]`);
        if (errorElement) {
            errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
    }

    if (supabase) {
        const orderData: Database['public']['Tables']['orders']['Insert'] = {
            full_name: formData.fullName,
            phone: formData.phone,
            email: formData.email.trim() ? formData.email : null,
            address: null,
            reference: null,
            department: null,
            province: null,
            district: null,
            shipping_method: 'Coordinar por WhatsApp',
            payment_method: paymentMethod,
            cart_items: items as unknown as Json,
            upsell_included: isUpsellChecked,
            total_amount: total,
            discount_code: appliedDiscountCode ? appliedDiscountCode.code : null,
            discount_amount: discountAmount > 0 ? discountAmount : null,
            user_id: session?.user.id ?? null,
        };
        const { error: insertError } = await supabase.from('orders').insert([orderData]);
        if (insertError) {
          console.error('Error saving order to database:', insertError);
          // Don't stop here, allow the WhatsApp message to be sent anyway
        } else {
            // If a gift code was used by a logged-in user, mark it as used.
            if (appliedDiscountCode && session?.user.id) {
                let profileUpdate = {};
                switch (appliedDiscountCode.code) {
                    case 'HOLADUERMEKB10':
                        profileUpdate = { gift_coupon_1_used: true };
                        break;
                    case 'HOLAKETOCAPS10':
                        profileUpdate = { gift_coupon_2_used: true };
                        break;
                    case 'HOLAKETOCAPS15':
                        profileUpdate = { gift_coupon_3_used: true };
                        break;
                    default:
                        break;
                }

                if (Object.keys(profileUpdate).length > 0) {
                    const { error: profileUpdateError } = await supabase
                        .from('profiles')
                        .update(profileUpdate)
                        .eq('id', session.user.id);
                    if (profileUpdateError) {
                        console.error("Error updating gift coupon status:", profileUpdateError);
                    }
                }
            }
        }
    }
    
    let message = `Hola, soy *${formData.fullName}*. Acabo de realizar mi pedido desde la web:\n\n`
      + "---------------\n*DETALLES DEL PEDIDO*\n---------------\n";
    items.forEach(item => {
        message += `• ${item.quantity}x ${item.title}\n  *Precio: S/ ${(item.price * item.quantity).toFixed(2)}*\n`;
    });
    if (isUpsellChecked) {
        message += `• 1x ${upsellProduct.title}\n  *Precio: S/ ${upsellProduct.price.toFixed(2)}*\n`;
    }
    if (discountAmount > 0) {
        message += `\n*Subtotal:* S/ ${cartSubtotal.toFixed(2)}\n*Descuento (${appliedDiscountCode?.code}):* -S/ ${discountAmount.toFixed(2)}\n`;
    }
    message += `\n*TOTAL A PAGAR: S/ ${total.toFixed(2)}*\n\n`
      + "------------------\n*DATOS DE CONTACTO*\n------------------\n"
      + `*Contacto:* ${formData.fullName} - ${formData.phone}\n`
      + (formData.email.trim() ? `*Email:* ${formData.email}\n\n` : '\n')
      + "--------------------\n*MÉTODO DE PAGO*\n--------------------\n"
      + `Se eligió: *${paymentMethod}*\n\n¡Espero la confirmación de mi pedido, gracias!`;

    openAlternatingWhatsApp(message);
    onClose();
  };

  const formFields = [
      { name: 'fullName', label: 'Nombres y Apellidos', icon: <UserIcon className="w-5 h-5 text-gray-500"/>, placeholder:'Nombres y Apellidos', type: 'text', required: true }, 
      { name: 'phone', label: 'Celular de Contacto', icon: <ChatIcon className="w-5 h-5 text-gray-500"/>, placeholder: 'Celular', type: 'tel', required: true },
      { name: 'email', label: 'Correo Electrónico (Opcional)', icon: <AtSymbolIcon className="w-5 h-5 text-gray-500"/>, placeholder: 'tu@correo.com', type: 'email', required: false },
  ];
  
  return (
    <div 
      className={`fixed inset-0 bg-black z-50 transition-opacity duration-300 ease-in-out ${isOpen ? 'bg-opacity-60' : 'bg-opacity-0 pointer-events-none'}`}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div 
        className={`bg-white h-full w-full max-w-2xl shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out absolute right-0 top-0 bottom-0 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        onClick={e => e.stopPropagation()}
      >
        <header className="px-4 py-3 sm:p-4 border-b flex justify-between items-center sticky top-0 bg-white z-10">
          <h2 id="checkout-heading" className="text-lg sm:text-xl font-bold text-[#1a2b63]">RESUMEN DEL PEDIDO</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100">
            <XMarkIcon className="w-6 h-6 text-gray-600" />
          </button>
        </header>

        <main className="flex-grow overflow-y-auto">
            <div className="p-4 sm:p-6 space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-[#1a2b63]">
                    Completa para finalizar tu compra
                  </h2>
                  <p
                    className="mt-1.5 text-sm text-gray-600"
                    dangerouslySetInnerHTML={{ __html: `Pídelo hoy y recíbelo ${getDeliveryDateRange()}` }}
                  />
                </div>

                <form className="space-y-4" noValidate>
                  {formFields.map(field => (
                      <div key={field.name}>
                        <label className="font-semibold text-xs sm:text-sm mb-1 block text-gray-700">{field.label} {field.required && <span className="text-red-500">*</span>}</label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">{field.icon}</span>
                            <input type={field.type} name={field.name} value={formData[field.name as keyof typeof formData]} onChange={handleInputChange} placeholder={field.placeholder} required={field.required} aria-invalid={!!errors[field.name]}
                              className={`w-full text-sm pl-9 pr-4 py-2.5 bg-slate-100 text-gray-900 placeholder-gray-500 border rounded-md focus:ring-2 focus:ring-[#16a085] focus:border-[#16a085] outline-none transition-colors ${errors[field.name] ? 'border-red-500' : 'border-gray-300'}`} />
                        </div>
                        {errors[field.name] && <p className="text-red-500 text-xs mt-1">{errors[field.name]}</p>}
                      </div>
                  ))}
                </form>

                 {promotionsData && promotionsData.promotions.length > 0 ? (
                    <>
                        <h2 className="text-lg sm:text-xl font-bold text-center text-[#1a2b63] pt-4">
                            {promotionsData.title || 'Elige tu oferta'}
                        </h2>
                        <ProductPromotions
                            data={promotionsData}
                            onSelectPromotion={handleSelectPromotion}
                            selectedPromotionId={selectedPromotion?.id}
                        />
                    </>
                ) : !singleProduct && items.length > 0 ? (
                    <div className="space-y-3 pt-4">
                        <h2 className="text-lg sm:text-xl font-bold text-center text-[#1a2b63]">Tu Pedido</h2>
                        {items.map(item => (
                            <div key={item.id} className="p-3 border rounded-lg flex items-center gap-3 bg-gray-50">
                                <img src={item.image} alt={item.title} className="w-14 h-14 rounded-md object-cover" width="56" height="56" />
                                <div className="flex-grow">
                                    <p className="font-semibold text-sm text-[#1a2b63]">{item.title}</p>
                                    <p className="text-xs text-gray-500">{item.quantity} x S/ {item.price.toFixed(2)}</p>
                                </div>
                                <p className="font-bold text-base sm:text-lg text-[#1a2b63]">S/ {(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                        ))}
                    </div>
                ): null}
               
                <label className={`p-3 sm:p-4 border-2 rounded-lg flex items-center gap-4 cursor-pointer transition-all ${isUpsellChecked ? 'border-[#16a085] bg-[#16a085]/10' : 'border-dashed border-gray-300 hover:border-gray-400'}`}>
                    <input type="checkbox" checked={isUpsellChecked} onChange={() => setIsUpsellChecked(!isUpsellChecked)} className="w-5 h-5 rounded accent-[#16a085]"/>
                    <div className="flex-grow">
                        <p className="font-semibold text-sm text-[#1a2b63]">
                            {upsellProduct.title} <strong className="text-[#16a085]">S/ {upsellProduct.price.toFixed(2)}</strong>
                        </p>
                    </div>
                    <img src={upsellProduct.image} alt="Upsell Product" className="w-14 h-14 sm:w-16 sm:h-16 rounded-md object-cover" width="64" height="64" />
                </label>


            </div>
            
            <div className="bg-white" ref={formRef}>
              <div className="p-4 sm:p-6 space-y-4">
                <div className="space-y-2 py-4 border-t border-b text-sm">
                    <div className="flex justify-between items-center text-gray-600"><span>Subtotal</span><span>S/ {cartSubtotal.toFixed(2)}</span></div>
                     {isUpsellChecked && <div className="flex justify-between items-center text-gray-600"><span>Gomitas de Colágeno + Biotina</span><span>S/ {upsellProduct.price.toFixed(2)}</span></div>}
                     {discountAmount > 0 && <div className="flex justify-between items-center text-green-600 font-semibold"><span>Descuento ({appliedDiscountCode?.code})</span><span>-S/ {discountAmount.toFixed(2)}</span></div>}
                    <div className="flex justify-between items-center text-gray-600"><span>Envío</span><span className="font-semibold text-green-600">Gratis</span></div>
                    <div className="flex justify-between items-center font-bold text-base sm:text-lg"><span>Total</span><span>S/ {total.toFixed(2)}</span></div>
                </div>

                <div className="space-y-2">
                    <div className="flex gap-2">
                        <input type="text" name="discountCode" value={formData.discountCode} onChange={handleInputChange} placeholder="Código de descuento" className="flex-grow text-sm px-4 py-2.5 bg-slate-100 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#16a085] focus:border-[#16a085] outline-none" disabled={!!appliedDiscountCode} />
                        <button onClick={handleApplyDiscount} disabled={isVerifyingCode || !!appliedDiscountCode} className="bg-gray-800 text-white font-bold px-4 sm:px-6 py-2 rounded-md hover:bg-black transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed text-sm">
                            {isVerifyingCode ? '...' : appliedDiscountCode ? 'Aplicado' : 'Aplicar'}
                        </button>
                    </div>
                    {discountError && <p className="text-red-500 text-xs mt-1">{discountError}</p>}
                </div>
              </div>
            </div>

  
            <footer className="p-4 bg-gray-50 border-t border-gray-200  z-10 space-y-3">
                <button onClick={(e) => handleFinalizePurchase(e, 'Pago en Casa')} disabled={!isFormValid}
                    className="w-full bg-[#16a085] text-white font-bold py-3 px-4 rounded-lg hover:bg-[#117a65] transition-colors flex items-center justify-center gap-2 text-sm shadow-lg disabled:bg-[#16a085]/70 disabled:cursor-not-allowed">
                    <ShoppingBagIcon className="w-5 h-5"/>
                    <span>FINALIZAR Y PAGAR EN CASA - S/ {total.toFixed(2)}</span>
                </button>
                  <button onClick={(e) => handleFinalizePurchase(e, 'Tarjeta, Yape o Plin')} disabled={!isFormValid}
                    className="w-full bg-[#2952a3] text-white font-bold py-3 px-4 rounded-lg hover:bg-[#1f3e7a] transition-colors flex items-center justify-center gap-2 text-sm shadow-lg disabled:bg-[#2952a3]/70 disabled:cursor-not-allowed">
                    <WalletIcon className="w-5 h-5"/>
                     <span>PAGAR CON TARJETA/YAPE - S/ {total.toFixed(2)}</span>
                </button>
            </footer>
        </main>
      </div>
    </div>
  );
};

export default CheckoutPopup;
