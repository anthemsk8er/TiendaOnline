import React, { useState, useEffect } from 'react';
import { XMarkIcon, ShoppingBagIcon, TrashIcon, AmexIcon, DinersClubIcon, MastercardIcon, VisaIcon, MinusIcon, PlusIcon } from '../product_detail_page/Icons';
// FIX: Changed import path to be relative to the root `types.ts`
import type { CartItem } from '../../types';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
  items: CartItem[];
  onRemoveItem: (id: string) => void;
  // FIX: Renamed prop for consistency
  onUpdateCartQuantity: (id: string, quantity: number, newUnitPrice?: number) => void;
}

const QuantitySelector = ({ quantity, setQuantity }: { quantity: number; setQuantity: (q: number) => void; }) => {
  return (
    <div className="flex items-center border border-gray-300 rounded-md w-max bg-white">
      <button
        onClick={() => setQuantity(Math.max(1, quantity - 1))}
        className="px-2.5 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
        disabled={quantity === 1}
        aria-label="Decrease quantity"
      >
        <MinusIcon className="w-3.5 h-3.5"/>
      </button>
      <span className="px-3 py-1 font-medium text-center bg-gray-50 border-x">{quantity}</span>
      <button
        onClick={() => setQuantity(quantity + 1)}
        className="px-2.5 py-1 text-gray-600 hover:bg-gray-100"
        aria-label="Increase quantity"
      >
        <PlusIcon className="w-3.5 h-3.5"/>
      </button>
    </div>
  );
};

const Cart: React.FC<CartProps> = ({ isOpen, onClose, onCheckout, items, onRemoveItem, onUpdateCartQuantity }) => {
  const [timeLeft, setTimeLeft] = useState(4 * 60 + 18); // 04:18
  
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const originalTotal = items.reduce((sum, item) => sum + ((item.originalPrice || item.price) * item.quantity), 0);
  const savings = originalTotal - subtotal;
  
  useEffect(() => {
    let timer: number;
    if (isOpen && items.length > 0) {
      setTimeLeft(4 * 60 + 18); // Reset timer when cart opens
      timer = window.setInterval(() => {
        setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isOpen, items.length]);
  
  const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
  const seconds = (timeLeft % 60).toString().padStart(2, '0');

  return (
    <div 
        className={`fixed inset-0 bg-black z-50 transition-opacity duration-300 ease-in-out ${isOpen ? 'bg-opacity-60' : 'bg-opacity-0 pointer-events-none'}`}
        onClick={onClose} 
        role="dialog" 
        aria-modal="true" 
        aria-labelledby="cart-heading"
        aria-hidden={!isOpen}
    >
      <div 
        className={`bg-gray-50 h-full w-full max-w-md shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out absolute right-0 top-0 bottom-0 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <header className="p-4 flex justify-between items-center bg-white">
          <h2 id="cart-heading" className="text-xl font-bold text-[#1a2b63]">Carrito • {totalItems} {totalItems === 1 ? 'ítem' : 'ítems'}</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100" aria-label="Cerrar carrito">
            <XMarkIcon className="w-6 h-6 text-gray-700" />
          </button>
        </header>

        {/* Timer */}
        {items.length > 0 && (
          <div className="bg-black text-white text-center py-1.5 font-bold text-sm">
              Carrito reservado por {minutes}:{seconds}
          </div>
        )}

        {/* Cart Content */}
        <div className="flex-grow overflow-y-auto p-6 space-y-4">
            {items.length > 0 ? items.map(item => {
                const itemSavings = ((item.originalPrice || item.price) - item.price) * item.quantity;
                return (
                  <div key={item.id} className="flex gap-4 p-4 bg-white rounded-lg shadow-sm">
                      <img src={item.image} alt={item.title} className="w-24 h-24 object-cover rounded-md border flex-shrink-0" width="96" height="96" />
                      <div className="flex-grow flex flex-col">
                          <div className="flex justify-between items-start gap-2">
                              <h3 className="font-semibold text-[#1a2b63] leading-tight text-sm">{item.title}</h3>
                              <button onClick={() => onRemoveItem(item.id)} className="text-gray-400 hover:text-red-500 flex-shrink-0" aria-label="Eliminar ítem">
                                  <TrashIcon className="w-5 h-5" />
                              </button>
                          </div>
                          <div className="flex justify-between items-end mt-auto pt-2">
                              <QuantitySelector quantity={item.quantity} setQuantity={(q) => onUpdateCartQuantity(item.id, q)} />
                              <div className="text-right">
                                 {item.originalPrice && <p className="text-gray-400 line-through text-sm">S/ {(item.originalPrice * item.quantity).toFixed(2)}</p>}
                                 <p className="font-bold text-[#1a2b63] text-lg">S/ {(item.price * item.quantity).toFixed(2)}</p>
                              </div>
                          </div>
                          {itemSavings > 0 && <p className="text-sm text-green-600 mt-1 text-right font-medium">(Te ahorras S/. {itemSavings.toFixed(2)})</p>}
                      </div>
                  </div>
                )
            }) : (
                <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
                    <ShoppingBagIcon className="w-20 h-20 text-gray-300" />
                    <h3 className="text-xl font-semibold mt-4">Tu carrito está vacío</h3>
                    <p className="mt-1">Añade productos para verlos aquí.</p>
                </div>
            )}
        </div>

        {/* Footer */}
        <footer className="p-6 border-t border-gray-200 bg-white space-y-4">
          {items.length > 0 ? (
            <>
              <div className="space-y-1">
                  {savings > 0 &&
                    <div className="flex justify-between text-green-600 font-semibold">
                        <span>Ahorro de</span>
                        <span>-S/. {savings.toFixed(2)}</span>
                    </div>
                  }
                  <div className="flex justify-between font-bold text-xl text-[#1a2b63]">
                      <span>Subtotal</span>
                      <span>S/. {subtotal.toFixed(2)}</span>
                  </div>
              </div>

              <button 
                  onClick={onCheckout}
                  className="w-full bg-[#16a085] text-white font-bold py-4 px-6 rounded-lg hover:bg-[#117a65] transition-colors flex items-center justify-center gap-3 text-base shadow-lg shadow-green-500/30 animate-tada-periodic"
              >
                  <ShoppingBagIcon className="w-5 h-5"/>
                  REALIZAR MI PEDIDO
              </button>

              <div className="flex justify-center items-center gap-2 pt-2">
                  <AmexIcon className="h-6"/>
                  <DinersClubIcon className="h-6"/>
                  <MastercardIcon className="h-6"/>
                  <VisaIcon className="h-6"/>
              </div>
            </>
          ) : (
             <button
              onClick={onClose}
              className="w-full bg-gray-800 text-white font-bold py-4 px-6 rounded-lg hover:bg-black transition-colors flex items-center justify-center gap-3 text-base"
            >
              Seguir comprando
            </button>
          )}
        </footer>
      </div>
    </div>
  );
};

export default Cart;