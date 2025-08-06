import React, { useState, useEffect, useRef, useMemo } from 'react';
import { XMarkIcon, UserIcon, ChatIcon, MapPinIcon, AtSymbolIcon, ShoppingBagIcon, WalletIcon, ChevronDownIcon } from '../product_detail_page/Icons';
import type { CartItem, DiscountCode, Order } from '../../types';
import { peruLocations } from '../../lib/peruLocations';
import { supabase } from '../../lib/supabaseClient';

interface CheckoutPopupProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number, newUnitPrice?: number) => void;
}

const upsellProduct = {
    title: 'Agrega Gomitas de Colágeno + Biotina (Frasco de 90 Gomitas) S/49',
    price: 49.00,
    image: 'https://uylwgmvnlnnkkvjqirhx.supabase.co/storage/v1/object/public/products/img/products/colageno.jpg'
};

const CheckoutPopup: React.FC<CheckoutPopupProps> = ({ isOpen, onClose, items, onUpdateQuantity }) => {
  const [isUpsellChecked, setIsUpsellChecked] = useState(false);
  const [shippingMethod, setShippingMethod] = useState('domicilio');

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    reference: '',
    email: '',
    department: '',
    province: '',
    district: '',
    discountCode: '',
  });
  
  const [departments, setDepartments] = useState<string[]>([]);
  const [provinces, setProvinces] = useState<string[]>([]);
  const [districts, setDistricts] = useState<string[]>([]);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isFormValid, setIsFormValid] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);
  
  // Discount state
  const [appliedDiscountCode, setAppliedDiscountCode] = useState<DiscountCode | null>(null);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [discountError, setDiscountError] = useState<string | null>(null);
  const [isVerifyingCode, setIsVerifyingCode] = useState(false);

  // Offers state
  const [offers, setOffers] = useState<any[]>([]);
  const singleProduct = items.length === 1 ? items[0] : null;

  useEffect(() => {
    setDepartments(peruLocations.map(dep => dep.departamento));
  }, []);
  
  useEffect(() => {
    // Reset discount when items change or popup opens
    setAppliedDiscountCode(null);
    setDiscountAmount(0);
    setDiscountError(null);
    setFormData(prev => ({...prev, discountCode: ''}));
  }, [items, isOpen]);

  useEffect(() => {
      if (isOpen && items.length === 1) {
          const product = items[0];
          // "Latch" onto the initial state of the cart item to generate static offers.
          // This prevents prices from changing incorrectly when selecting different offers.
          if (offers.length === 0 || !offers.some(o => o.productId === product.id)) {
              const baseNonDiscountedPrice = product.originalPrice || product.price;
              const currentSinglePrice = product.price;

              const generatedOffers = [
                { 
                  id: 1, 
                  productId: product.id,
                  title: 'Compra 1 unidad', 
                  discount: 'Ahorra 0%',
                  quantity: 1, 
                  unitPrice: currentSinglePrice,
                  price: currentSinglePrice,
                  originalPrice: baseNonDiscountedPrice > currentSinglePrice ? baseNonDiscountedPrice : null, 
                  image: product.image 
                },
                { 
                  id: 2, 
                  productId: product.id,
                  title: '¡Compra 2 unidades con un 10% de descuento!', 
                  discount: 'Ahorra 10%', 
                  quantity: 2, 
                  unitPrice: baseNonDiscountedPrice * 0.90, 
                  price: baseNonDiscountedPrice * 2 * 0.90, 
                  originalPrice: baseNonDiscountedPrice * 2, 
                  image: product.image 
                },
                { 
                  id: 3, 
                  productId: product.id,
                  title: '¡Compra 3 unidades con un 15% de descuento!', 
                  discount: 'Ahorra 15%', 
                  quantity: 3, 
                  unitPrice: baseNonDiscountedPrice * 0.85, 
                  price: baseNonDiscountedPrice * 3 * 0.85, 
                  originalPrice: baseNonDiscountedPrice * 3, 
                  image: product.image 
                },
              ];
              setOffers(generatedOffers);
          }
      } else {
          setOffers([]); // Clear offers if not a single product or popup is closed
      }
  }, [isOpen, items]);

  const selectedOffer = useMemo(() => {
    if (!singleProduct || !offers.length) return null;
    const perfectMatch = offers.find(o => 
      o.quantity === singleProduct.quantity && 
      Math.abs(o.unitPrice - singleProduct.price) < 0.01
    );
    return perfectMatch;
  }, [singleProduct, offers]);


  const handleSelectOffer = (offer: typeof offers[0]) => {
      if (singleProduct) {
        onUpdateQuantity(singleProduct.id, offer.quantity, offer.unitPrice);
      }
  };
  
  const cartSubtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const total = cartSubtotal - discountAmount + (isUpsellChecked ? upsellProduct.price : 0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => {
        const newState = { ...prev, [name]: value };
        
        if (name === 'department') {
            const selectedDep = peruLocations.find(d => d.departamento === value);
            setProvinces(selectedDep ? selectedDep.provincias.map(p => p.provincia) : []);
            setDistricts([]);
            newState.province = '';
            newState.district = '';
        }

        if (name === 'province') {
            const selectedDepData = peruLocations.find(d => d.departamento === prev.department);
            const selectedProv = selectedDepData?.provincias.find(p => p.provincia === value);
            setDistricts(selectedProv ? selectedProv.distritos : []);
            newState.district = '';
        }
        return newState;
    });

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
    if (!formData.phone.trim()) newErrors.phone = requiredMessage;
    if (!formData.address.trim()) newErrors.address = requiredMessage;
    if (!formData.reference.trim()) newErrors.reference = requiredMessage;
    if (!formData.email.trim()) {
        newErrors.email = requiredMessage;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Correo electrónico no válido";
    }

    if (!formData.department) newErrors.department = requiredMessage;
    if (!formData.province) newErrors.province = requiredMessage;
    if (!formData.district) newErrors.district = requiredMessage;

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

      const { data: codeData, error } = await supabase
        .from('discount_codes')
        .select('id, code, discount_type, discount_value, limitation_type, start_date, end_date, usage_limit, times_used, scope, product_id, is_active')
        .ilike('code', codeToVerify)
        .single();
      
      setIsVerifyingCode(false);

      // PGRST116 is the code for "no rows found", which we handle as an invalid code, not a server error.
      if (error && error.code !== 'PGRST116') {
        console.error("Error fetching discount code:", error);
        setDiscountError("Ocurrió un error al verificar el código.");
        return;
      }

      if (!codeData) {
        setDiscountError("El código de descuento no es válido.");
        return;
      }
      
      // Restore full validation for robustness
      if (!codeData.is_active) {
          setDiscountError("Este código de descuento no está activo.");
          return;
      }
      
      const now = new Date();
      if (codeData.limitation_type === 'date_range') {
        if (codeData.start_date && new Date(codeData.start_date) > now) {
          setDiscountError("Este código de descuento aún no es válido.");
          return;
        }
        if (codeData.end_date) {
            const endDate = new Date(codeData.end_date);
            endDate.setHours(23, 59, 59, 999); // Set to end of day to include the whole day
            if (endDate < now) {
                setDiscountError("Este código de descuento ha expirado.");
                return;
            }
        }
      }

      if (codeData.limitation_type === 'usage_limit' && codeData.usage_limit !== null) {
          if (codeData.times_used >= codeData.usage_limit) {
              setDiscountError("Este código ha alcanzado su límite de usos.");
              return;
          }
      }
      
      if (codeData.scope === 'product') {
          if (!items.some(item => item.id === codeData.product_id)) {
              setDiscountError("Este código no es válido para los productos en tu carrito.");
              return;
          }
      }

      // If all checks pass, apply discount
      let calculatedDiscount = 0;
      let targetAmount = 0;

      if (codeData.scope === 'product') {
          const productInCart = items.find(item => item.id === codeData.product_id);
          targetAmount = productInCart ? productInCart.price * productInCart.quantity : 0;
      } else { // scope === 'cart'
          targetAmount = cartSubtotal;
      }

      if (codeData.discount_type === 'fixed_amount') {
          calculatedDiscount = codeData.discount_value;
      } else if (codeData.discount_type === 'percentage') {
          calculatedDiscount = targetAmount * (codeData.discount_value / 100);
      }
      
      // Ensure discount isn't more than the target amount
      calculatedDiscount = Math.min(calculatedDiscount, targetAmount);

      setAppliedDiscountCode(codeData as DiscountCode);
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

    try {
        if (supabase) {
            const orderData: Omit<Order, 'id' | 'created_at'> = {
                full_name: formData.fullName,
                email: formData.email,
                phone: formData.phone,
                address: formData.address,
                reference: formData.reference,
                department: formData.department,
                province: formData.province,
                district: formData.district,
                shipping_method: shippingMethod,
                payment_method: paymentMethod,
                cart_items: items,
                upsell_included: isUpsellChecked,
                total_amount: total,
                discount_code: appliedDiscountCode ? appliedDiscountCode.code : null,
                discount_amount: discountAmount > 0 ? discountAmount : null,
            };
            
            const { error: insertError } = await supabase.from('orders').insert([orderData] as any);

            if (insertError) {
                console.error('Error saving order to database:', insertError);
            } else if (appliedDiscountCode) {
                // Increment usage count on successful order
                await supabase.rpc('increment_discount_usage', { p_code: appliedDiscountCode.code });
            }
        }
    } catch (dbError) {
        console.error('An unexpected error occurred while saving the order:', dbError);
    }
    
    let message = `Hola, soy *${formData.fullName}*. Acabo de realizar mi pedido desde la web:\n\n`;
    message += "---------------\n";
    message += "*DETALLES DEL PEDIDO*\n";
    message += "---------------\n";

    items.forEach(item => {
        message += `• ${item.quantity}x ${item.title}\n`;
        message += `  *Precio: S/ ${(item.price * item.quantity).toFixed(2)}*\n`;
    });

    if (isUpsellChecked) {
        message += `• 1x ${upsellProduct.title}\n`;
        message += `  *Precio: S/ ${upsellProduct.price.toFixed(2)}*\n`;
    }

    if (discountAmount > 0) {
        message += `\n*Subtotal:* S/ ${cartSubtotal.toFixed(2)}\n`;
        message += `*Descuento (${appliedDiscountCode?.code}):* -S/ ${discountAmount.toFixed(2)}\n`;
    }

    message += "\n";
    message += `*TOTAL A PAGAR: S/ ${total.toFixed(2)}*\n\n`;
    
    message += "------------------\n";
    message += "*DATOS DE ENTREGA*\n";
    message += "------------------\n";
    message += `*Contacto:* ${formData.phone}\n`;
    message += `*Email:* ${formData.email}\n`;
    message += `*Dirección:* ${formData.address}\n`;
    message += `*Referencia:* ${formData.reference}\n`;
    message += `*Ubicación:* ${formData.district}, ${formData.province}, ${formData.department}\n\n`;

    message += "--------------------\n";
    message += "*MÉTODO DE PAGO*\n";
    message += "--------------------\n";
    message += `Se eligió: *${paymentMethod}*\n\n`;
    
    message += `¡Espero la confirmación de mi pedido, gracias!`;

    const phoneNumber = '965210993';
    const whatsappUrl = `https://wa.me/51${phoneNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, '_blank');
    onClose();
  };

  const formFields = [
      { name: 'fullName', label: 'Nombres y Apellidos', icon: <UserIcon className="w-5 h-5 text-gray-500"/>, placeholder:'Nombres y Apellidos', type: 'text' }, 
      { name: 'phone', label: 'Celular de Contacto', icon: <ChatIcon className="w-5 h-5 text-gray-500"/>, placeholder: 'Celular', type: 'tel'}, 
      { name: 'address', label: 'Dirección exacta de entrega', icon: <MapPinIcon className="w-5 h-5 text-gray-500"/>, placeholder: 'Dirección exacta de entrega', type: 'text' }, 
      { name: 'reference', label: 'Referencias de la Dirección', icon: <MapPinIcon className="w-5 h-5 text-gray-500"/>, placeholder: 'Referencias de la Dirección', type: 'text' }, 
      { name: 'email', label: 'Correo electrónico', icon: <AtSymbolIcon className="w-5 h-5 text-gray-500"/>, placeholder: 'Correo electrónico', type: 'email' }
  ];

  return (
    <div 
      className={`fixed inset-0 bg-black z-50 transition-opacity duration-300 ease-in-out ${isOpen ? 'bg-opacity-60' : 'bg-opacity-0 pointer-events-none'}`}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-heading"
      aria-hidden={!isOpen}
    >
      <div 
        className={`bg-white h-full w-full max-w-2xl shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out absolute right-0 top-0 bottom-0 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        onClick={e => e.stopPropagation()}
      >
        <header className="p-4 border-b flex justify-between items-center sticky top-0 bg-white z-10">
          <h2 id="checkout-heading" className="text-xl font-bold text-gray-800">RESUMEN DEL PEDIDO</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100">
            <XMarkIcon className="w-6 h-6 text-gray-600" />
          </button>
        </header>

        <main className="flex-grow overflow-y-auto">
            <div className="p-4 sm:p-6 space-y-6">
                {singleProduct ? (
                     <div className="space-y-2">
                        {offers.map(offer => (
                        
                        <label key={offer.id} className={`p-4 border rounded-lg flex items-center gap-2 cursor-pointer transition-all ${selectedOffer?.id === offer.id ? 'border-2 border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-400'}`}>
                            
                            <input type="radio" name="offer" value={offer.id} checked={selectedOffer?.id === offer.id} onChange={() => handleSelectOffer(offer)} className="w-5 h-5 accent-blue-600"/>
                            
                            <img src={offer.image} alt="Product" className="w-16 h-16 rounded-md object-cover" width="64" height="64" />
                            
                            <div className="flex-grow">
                              <p className="font-semibold text-gray-800 mb-1">{offer.title}</p>
                              <span className="text-xs font-bold text-white bg-blue-500 px-2 py-0.5  rounded-full">{offer.discount}</span>
                            </div>

                            <div className="text-right">
                              {offer.originalPrice && <p className="text-sm text-gray-400 line-through">S/ {offer.originalPrice.toFixed(2)}</p>}
                              <p className="font-bold text-lg text-gray-900">S/ {offer.price.toFixed(2)}</p>
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
                                    <p className="font-semibold text-gray-800">{item.title}</p>
                                    <p className="text-sm text-gray-500">{item.quantity} x S/ {item.price.toFixed(2)}</p>
                                </div>
                                <p className="font-bold text-lg text-gray-900">S/ {(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                        ))}
                    </div>
                )}
               

                <fieldset>
                    <legend className="font-bold text-gray-800 mb-2">Método de envío</legend>
                    <div className="border border-gray-200 rounded-lg">
                    <label className="p-4 flex items-center gap-4 cursor-pointer border-b">
                        <input type="radio" name="shipping" value="domicilio" checked={shippingMethod === 'domicilio'} onChange={(e) => setShippingMethod(e.target.value)} className="w-5 h-5 accent-gray-800"/>
                        <span className="flex-grow font-medium">Envío GRATIS a Domicilio</span>
                        <span className="font-semibold">Gratis</span>
                    </label>
                    <label className="p-4 flex items-center gap-4 cursor-pointer">
                        <input type="radio" name="shipping" value="provincia" checked={shippingMethod === 'provincia'} onChange={(e) => setShippingMethod(e.target.value)} className="w-5 h-5 accent-gray-800"/>
                        <span className="flex-grow font-medium">Provincia Envío GRATIS</span>
                        <span className="font-semibold">Gratis</span>
                    </label>
                    </div>
                </fieldset>

                <label className={`p-4 border-2 rounded-lg flex items-center gap-4 cursor-pointer transition-all ${isUpsellChecked ? 'border-blue-500 bg-blue-50' : 'border-dashed border-gray-300 hover:border-gray-400'}`}>
                    <input type="checkbox" checked={isUpsellChecked} onChange={() => setIsUpsellChecked(!isUpsellChecked)} className="w-5 h-5 rounded accent-blue-600"/>
                    <div className="flex-grow">
                        <p className="font-semibold text-gray-800" dangerouslySetInnerHTML={{ __html: upsellProduct.title.replace(upsellProduct.price.toFixed(2), `<strong class="text-blue-600">S/ ${upsellProduct.price.toFixed(2)}</strong>`) }}></p>
                    </div>
                    <img src={upsellProduct.image} alt="Upsell Product" className="w-16 h-16 rounded-md object-cover" width="64" height="64" />
                </label>

                <div className="space-y-2 py-4 border-t border-b">
                    <div className="flex justify-between items-center text-gray-600">
                    <span>Subtotal</span>
                    <span>S/ {cartSubtotal.toFixed(2)}</span>
                    </div>
                     {isUpsellChecked && 
                        <div className="flex justify-between items-center text-gray-600">
                            <span>Gomitas Shilajit</span>
                            <span>S/ {upsellProduct.price.toFixed(2)}</span>
                        </div>
                     }
                     {discountAmount > 0 && (
                        <div className="flex justify-between items-center text-green-600 font-semibold">
                            <span>Descuento ({appliedDiscountCode?.code})</span>
                            <span>-S/ {discountAmount.toFixed(2)}</span>
                        </div>
                     )}
                    <div className="flex justify-between items-center text-gray-600">
                    <span>Envío</span>
                    <span className="font-semibold text-green-600">Gratis</span>
                    </div>
                    <div className="flex justify-between items-center font-bold text-lg">
                    <span>Total</span>
                    <span>S/ {total.toFixed(2)}</span>
                    </div>
                </div>
            </div>
            
            <div className="bg-white" ref={formRef}>
              <div className="p-4 sm:p-6 space-y-4">
                <div className="space-y-2">
                    <div className="flex gap-2">
                        <input 
                          type="text" 
                          name="discountCode" 
                          value={formData.discountCode}
                          onChange={handleInputChange}
                          placeholder="Código de descuento" 
                          className="flex-grow px-4 py-3 bg-slate-100 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" 
                          disabled={!!appliedDiscountCode}
                          />
                        <button onClick={handleApplyDiscount} disabled={isVerifyingCode || !!appliedDiscountCode} className="bg-gray-800 text-white font-bold px-6 py-2 rounded-md hover:bg-black transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed">
                            {isVerifyingCode ? '...' : appliedDiscountCode ? 'Aplicado' : 'Aplicar'}
                        </button>
                    </div>
                    {discountError && <p className="text-red-500 text-xs mt-1">{discountError}</p>}
                </div>
                
                <h2 className="text-xl font-bold text-center text-gray-900 pt-4">Ingrese su dirección de envío</h2>
                <form className="space-y-4" noValidate>
                  {formFields.map(field => (
                      <div key={field.name}>
                        <label className="font-semibold text-sm mb-1 block text-gray-700">{field.label} <span className="text-red-500">*</span></label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">{field.icon}</span>
                            <input 
                              type={field.type} 
                              name={field.name}
                              value={formData[field.name as keyof typeof formData]}
                              onChange={handleInputChange}
                              placeholder={field.placeholder} required 
                              aria-invalid={!!errors[field.name]}
                              className={`w-full pl-10 pr-4 py-3 bg-slate-100 text-gray-900 placeholder-gray-500 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${errors[field.name] ? 'border-red-500' : 'border-gray-300'}`} />
                        </div>
                        {errors[field.name] && <p className="text-red-500 text-xs mt-1">{errors[field.name]}</p>}
                      </div>
                  ))}
                  
                  <div>
                      <label htmlFor="department" className="font-semibold text-sm mb-1 block text-gray-700">Departamento <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <select 
                          id="department"
                          name="department"
                          value={formData.department}
                          onChange={handleInputChange}
                          required 
                          aria-invalid={!!errors.department}
                          className={`w-full px-3 py-3 bg-slate-100 text-gray-900 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none transition-colors pr-10 ${errors.department ? 'border-red-500' : 'border-gray-300'}`}>
                            <option value="" disabled>Seleccionar Departamento</option>
                            {departments.map(dep => <option key={dep} value={dep}>{dep}</option>)}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                            <ChevronDownIcon className="w-5 h-5"/>
                        </div>
                      </div>
                      {errors.department && <p className="text-red-500 text-xs mt-1">{errors.department}</p>}
                  </div>

                  <div>
                      <label htmlFor="province" className="font-semibold text-sm mb-1 block text-gray-700">Provincia <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <select 
                          id="province"
                          name="province"
                          value={formData.province}
                          onChange={handleInputChange}
                          required
                          disabled={!formData.department || provinces.length === 0}
                          aria-invalid={!!errors.province}
                          className={`w-full px-3 py-3 bg-slate-100 text-gray-900 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none transition-colors pr-10 ${errors.province ? 'border-red-500' : 'border-gray-300'} disabled:bg-gray-200 disabled:cursor-not-allowed`}>
                            <option value="" disabled>Seleccionar Provincia</option>
                            {provinces.map(prov => <option key={prov} value={prov}>{prov}</option>)}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                            <ChevronDownIcon className="w-5 h-5"/>
                        </div>
                      </div>
                      {errors.province && <p className="text-red-500 text-xs mt-1">{errors.province}</p>}
                  </div>

                  <div>
                      <label htmlFor="district" className="font-semibold text-sm mb-1 block text-gray-700">Distrito <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <select 
                          id="district"
                          name="district"
                          value={formData.district}
                          onChange={handleInputChange}
                          required
                          disabled={!formData.province || districts.length === 0}
                          aria-invalid={!!errors.district}
                          className={`w-full px-3 py-3 bg-slate-100 text-gray-900 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none transition-colors pr-10 ${errors.district ? 'border-red-500' : 'border-gray-300'} disabled:bg-gray-200 disabled:cursor-not-allowed`}>
                            <option value="" disabled>Seleccionar Distrito</option>
                            {districts.map(dist => <option key={dist} value={dist}>{dist}</option>)}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                            <ChevronDownIcon className="w-5 h-5"/>
                        </div>
                      </div>
                      {errors.district && <p className="text-red-500 text-xs mt-1">{errors.district}</p>}
                  </div>
                </form>
              </div>
            </div>

            
        <footer className="p-4 bg-gray-50 border-t border-gray-200  z-10 space-y-3">
            <button 
                onClick={(e) => handleFinalizePurchase(e, 'Pago en Casa')}
                disabled={!isFormValid}
                className="w-full bg-red-600 text-white font-bold py-4 px-6 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-3 text-lg shadow-lg disabled:bg-red-400 disabled:cursor-not-allowed">
                <ShoppingBagIcon className="w-6 h-6"/>
                FINALIZAR COMPRA Y PAGAR EN CASA - S/ {total.toFixed(2)}
            </button>
              <button 
                onClick={(e) => handleFinalizePurchase(e, 'Tarjeta, Yape o Plin')}
                disabled={!isFormValid}
                className="w-full bg-green-500 text-white font-bold py-4 px-6 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-3 text-lg shadow-lg disabled:bg-green-300 disabled:cursor-not-allowed">
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