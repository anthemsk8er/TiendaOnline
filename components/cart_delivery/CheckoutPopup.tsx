import React, { useState, useEffect, useRef, useMemo } from 'react';
import { XMarkIcon, UserIcon, ChatIcon, MapPinIcon, AtSymbolIcon, ShoppingBagIcon, WalletIcon, ChevronDownIcon } from '../product_detail_page/Icons';
import type { CartItem, DiscountCode, Order } from '../../types';
import { supabase } from '../../lib/supabaseClient';
import type { PostgrestSingleResponse } from '@supabase/supabase-js';
import type { Database, Json } from '../../lib/database.types';

interface CheckoutPopupProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateCartQuantity: (productId: string, quantity: number, newUnitPrice?: number) => void;
}

const upsellProduct = {
    title: 'Agrega Gomitas de Colágeno + Biotina (Frasco de 90 Gomitas)',
    price: 49.00,
    image: 'https://uylwgmvnlnnkkvjqirhx.supabase.co/storage/v1/object/public/products/img/products/colageno.jpg'
};

const CheckoutPopup: React.FC<CheckoutPopupProps> = ({ isOpen, onClose, items, onUpdateCartQuantity }) => {
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

  const [offers, setOffers] = useState<any[]>([]);
  const singleProduct = items.length === 1 ? items[0] : null;

  useEffect(() => {
    setAppliedDiscountCode(null);
    setDiscountAmount(0);
    setDiscountError(null);
    setFormData(prev => ({...prev, discountCode: ''}));
  }, [items, isOpen]);

  useEffect(() => {
      if (isOpen && items.length === 1) {
          const product = items[0];
          if (offers.length === 0 || !offers.some(o => o.productId === product.id)) {
              const baseNonDiscountedPrice = product.originalPrice || product.price;
              const currentSinglePrice = product.price;
              const generatedOffers = [
                { id: 1, productId: product.id, title: 'Compra 1 unidad', discount: 'Ahorra 0%', quantity: 1, unitPrice: currentSinglePrice, price: currentSinglePrice, originalPrice: baseNonDiscountedPrice > currentSinglePrice ? baseNonDiscountedPrice : null, image: product.image },
                { id: 2, productId: product.id, title: '¡Compra 2 unidades con un 10% de descuento!', discount: 'Ahorra 10%', quantity: 2, unitPrice: baseNonDiscountedPrice * 0.90, price: baseNonDiscountedPrice * 2 * 0.90, originalPrice: baseNonDiscountedPrice * 2, image: product.image },
                { id: 3, productId: product.id, title: '¡Compra 3 unidades con un 15% de descuento!', discount: 'Ahorra 15%', quantity: 3, unitPrice: baseNonDiscountedPrice * 0.85, price: baseNonDiscountedPrice * 3 * 0.85, originalPrice: baseNonDiscountedPrice * 3, image: product.image },
              ];
              setOffers(generatedOffers);
          }
      } else {
          setOffers([]);
      }
  }, [isOpen, items]);

  const selectedOffer = useMemo(() => {
    if (!singleProduct || !offers.length) return null;
    return offers.find(o => 
      o.quantity === singleProduct.quantity && 
      Math.abs(o.unitPrice - singleProduct.price) < 0.01
    );
  }, [singleProduct, offers]);

  const handleSelectOffer = (offer: typeof offers[0]) => {
      if (singleProduct) {
        onUpdateCartQuantity(singleProduct.id, offer.quantity, offer.unitPrice);
      }
  };
  
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
      
      const now = new Date();
      if (codeData.limitation_type === 'date_range' && codeData.end_date && new Date(codeData.end_date) < now) {
          setDiscountError("Este código de descuento ha expirado.");
          return;
      }

      if (codeData.limitation_type === 'usage_limit' && codeData.usage_limit !== null && codeData.times_used >= codeData.usage_limit) {
          setDiscountError("Este código ha alcanzado su límite de usos.");
          return;
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
        };
        const { error: insertError } = await supabase.from('orders').insert([orderData]);
        if (insertError) {
          console.error('Error saving order to database:', insertError);
          return;
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

    const phoneNumber = '965210993';
    window.open(`https://wa.me/51${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
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
        <header className="p-4 border-b flex justify-between items-center sticky top-0 bg-white z-10">
          <h2 id="checkout-heading" className="text-xl font-bold text-[#1a2b63]">RESUMEN DEL PEDIDO</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100">
            <XMarkIcon className="w-6 h-6 text-gray-600" />
          </button>
        </header>

        <main className="flex-grow overflow-y-auto">
            <div className="p-4 sm:p-6 space-y-6">

                <h2 className="text-xl font-bold text-center text-[#1a2b63] pt-4">Completa para finalizar tu compra</h2>
                <form className="space-y-4" noValidate>
                  {formFields.map(field => (
                      <div key={field.name}>
                        <label className="font-semibold text-sm mb-1 block text-gray-700">{field.label} {field.required && <span className="text-red-500">*</span>}</label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">{field.icon}</span>
                            <input type={field.type} name={field.name} value={formData[field.name as keyof typeof formData]} onChange={handleInputChange} placeholder={field.placeholder} required={field.required} aria-invalid={!!errors[field.name]}
                              className={`w-full pl-10 pr-4 py-3 bg-slate-100 text-gray-900 placeholder-gray-500 border rounded-md focus:ring-2 focus:ring-[#16a085] focus:border-[#16a085] outline-none transition-colors ${errors[field.name] ? 'border-red-500' : 'border-gray-300'}`} />
                        </div>
                        {errors[field.name] && <p className="text-red-500 text-xs mt-1">{errors[field.name]}</p>}
                      </div>
                  ))}
                </form>

                <h2 className="text-xl font-bold text-center text-[#1a2b63] pt-4">Elige tu oferta</h2>
                {singleProduct ? (
                     <div className="space-y-2">
                        {offers.map(offer => (
                        <label key={offer.id} className={`p-4 border rounded-lg flex items-center gap-2 cursor-pointer transition-all ${selectedOffer?.id === offer.id ? 'border-2 border-[#16a085] bg-[#16a085]/10' : 'border-gray-200 hover:border-gray-400'}`}>
                            <input type="radio" name="offer" value={offer.id} checked={selectedOffer?.id === offer.id} onChange={() => handleSelectOffer(offer)} className="w-5 h-5 accent-[#16a085]"/>
                            <img src={offer.image} alt="Product" className="w-16 h-16 rounded-md object-cover" width="64" height="64" />
                            <div className="flex-grow">
                              <p className="font-medium text-sm text-[#1a2b63] mb-1">{offer.title}</p>
                              <span className="text-xs font-bold text-white bg-[#16a085] px-2 py-0.5  rounded-full">{offer.discount}</span>
                            </div>
                            <div className="text-right flex-shrink-0">
                              {offer.originalPrice && <p className="text-sm text-gray-400 line-through whitespace-nowrap">S/ {offer.originalPrice.toFixed(2)}</p>}
                              <p className="font-bold text-lg text-[#1a2b63] whitespace-nowrap">S/ {offer.price.toFixed(2)}</p>
                            </div>
                        </label>
                        ))}
                    </div>
                ) : (
                    <div className="space-y-3">
                        {items.map(item => (
                            <div key={item.id} className="p-4 border rounded-lg flex items-center gap-4 bg-gray-50">
                                <img src={item.image} alt={item.title} className="w-16 h-16 rounded-md object-cover" width="64" height="64" />
                                <div className="flex-grow">
                                    <p className="font-semibold text-[#1a2b63]">{item.title}</p>
                                    <p className="text-sm text-gray-500">{item.quantity} x S/ {item.price.toFixed(2)}</p>
                                </div>
                                <p className="font-bold text-lg text-[#1a2b63]">S/ {(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                        ))}
                    </div>
                )}
               
                <label className={`p-4 border-2 rounded-lg flex items-center gap-4 cursor-pointer transition-all ${isUpsellChecked ? 'border-[#16a085] bg-[#16a085]/10' : 'border-dashed border-gray-300 hover:border-gray-400'}`}>
                    <input type="checkbox" checked={isUpsellChecked} onChange={() => setIsUpsellChecked(!isUpsellChecked)} className="w-5 h-5 rounded accent-[#16a085]"/>
                    <div className="flex-grow">
                        <p className="font-semibold text-[#1a2b63]">
                            {upsellProduct.title} <strong className="text-[#16a085]">S/ {upsellProduct.price.toFixed(2)}</strong>
                        </p>
                    </div>
                    <img src={upsellProduct.image} alt="Upsell Product" className="w-16 h-16 rounded-md object-cover" width="64" height="64" />
                </label>


            </div>
            
            <div className="bg-white" ref={formRef}>
              <div className="p-4 sm:p-6 space-y-4">
                


                <div className="space-y-2 py-4 border-t border-b">
                    <div className="flex justify-between items-center text-gray-600"><span>Subtotal</span><span>S/ {cartSubtotal.toFixed(2)}</span></div>
                     {isUpsellChecked && <div className="flex justify-between items-center text-gray-600"><span>Gomitas de Colágeno + Biotina</span><span>S/ {upsellProduct.price.toFixed(2)}</span></div>}
                     {discountAmount > 0 && <div className="flex justify-between items-center text-green-600 font-semibold"><span>Descuento ({appliedDiscountCode?.code})</span><span>-S/ {discountAmount.toFixed(2)}</span></div>}
                    <div className="flex justify-between items-center text-gray-600"><span>Envío</span><span className="font-semibold text-green-600">Gratis</span></div>
                    <div className="flex justify-between items-center font-bold text-lg"><span>Total</span><span>S/ {total.toFixed(2)}</span></div>
                </div>

                <div className="space-y-2">
                    <div className="flex gap-2">
                        <input type="text" name="discountCode" value={formData.discountCode} onChange={handleInputChange} placeholder="Código de descuento" className="flex-grow px-4 py-3 bg-slate-100 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#16a085] focus:border-[#16a085] outline-none" disabled={!!appliedDiscountCode} />
                        <button onClick={handleApplyDiscount} disabled={isVerifyingCode || !!appliedDiscountCode} className="bg-gray-800 text-white font-bold px-6 py-2 rounded-md hover:bg-black transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed">
                            {isVerifyingCode ? '...' : appliedDiscountCode ? 'Aplicado' : 'Aplicar'}
                        </button>
                    </div>
                    {discountError && <p className="text-red-500 text-xs mt-1">{discountError}</p>}
                </div>
              </div>
            </div>
            
            <footer className="p-4 bg-gray-50 border-t border-gray-200  z-10 space-y-3">
                <button onClick={(e) => handleFinalizePurchase(e, 'Pago en Casa')} disabled={!isFormValid}
                    className="w-full bg-[#16a085] text-white font-bold py-4 px-6 rounded-lg hover:bg-[#117a65] transition-colors flex items-center justify-center gap-3 text-lg shadow-lg disabled:bg-[#16a085]/70 disabled:cursor-not-allowed">
                    <ShoppingBagIcon className="w-6 h-6"/>
                    FINALIZAR COMPRA Y PAGAR EN CASA - S/ {total.toFixed(2)}
                </button>
                  <button onClick={(e) => handleFinalizePurchase(e, 'Tarjeta, Yape o Plin')} disabled={!isFormValid}
                    className="w-full bg-[#2952a3] text-white font-bold py-4 px-6 rounded-lg hover:bg-[#1f3e7a] transition-colors flex items-center justify-center gap-3 text-lg shadow-lg disabled:bg-[#2952a3]/70 disabled:cursor-not-allowed">
                    <WalletIcon className="w-6 h-6"/>
                    Pagar con Tarjeta, Yape o Plin - S/ {total.toFixed(2)}
                </button>
            </footer>
        </main>
      </div>
    </div>
  );
};

export default CheckoutPopup;