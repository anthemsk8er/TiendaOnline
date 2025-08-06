



import React, { useState, useEffect } from 'react';
import type { CartItem, Product, Profile } from '../types';
import type { Session } from '@supabase/supabase-js';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { AtSymbolIcon, MapPinIcon, ChatIcon } from '../components/product_detail_page/Icons';
import CheckoutPopup from '../components/cart_delivery/CheckoutPopup';
import Cart from '../components/cart_delivery/Cart';
import ProductsGrid from '../components/products/ProductsGrid';

interface ContactPageProps {
  onProductClick: (productId: string) => void;
  onCatalogClick: (category?: string) => void;
  onHomeClick: () => void;
  onContactClick: () => void;
  onLegalClick: () => void;
  onAdminProductUploadClick?: () => void;
  onAdminProductManagementClick?: () => void;
  onAdminUserManagementClick?: () => void;
  cartItems: CartItem[];
  onAddToCart: (product: Product, quantity: number) => void;
  onUpdateCartQuantity: (productId: string, quantity: number, newUnitPrice?: number) => void;
  onRemoveFromCart: (productId: string) => void;
  // Auth props
  session: Session | null;
  profile: Profile | null;
  onLogout: () => void;
  showAuthModal: (view: 'login' | 'register') => void;
}

const ContactPage: React.FC<ContactPageProps> = ({
  onProductClick, onCatalogClick, onHomeClick, onContactClick, onLegalClick,
  onAdminProductUploadClick, onAdminProductManagementClick, onAdminUserManagementClick,
  cartItems, onAddToCart, onUpdateCartQuantity, onRemoveFromCart,
  session, profile, onLogout, showAuthModal
}) => {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleOpenCart = () => setIsCartOpen(true);
  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const body = document.body;
    if (isCartOpen || isCheckoutOpen) {
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = 'unset';
    }
    return () => {
      body.style.overflow = 'unset';
    };
  }, [isCartOpen, isCheckoutOpen]);

  const headerProps = { onCartClick: handleOpenCart, onCatalogClick, onHomeClick, onContactClick, onAdminProductUploadClick, onAdminProductManagementClick, onAdminUserManagementClick, cartItemCount, session, profile, onLogout, showAuthModal };

  return (
    <div className="bg-gray-50">
      <Header {...headerProps} />
      <main>
        <section
          className="h-64 bg-cover bg-center flex items-center justify-center text-white"
          style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://picsum.photos/id/124/1600/400')` }}
        >
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight animate-fade-in-up">Contacto</h1>
        </section>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 animate-fade-in-up">Envíanos un mensaje</h2>
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre completo</label>
                  <div className="mt-1">
                    <input type="text" name="name" id="name" className="w-full px-4 py-3 bg-slate-100 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none" placeholder="Tu nombre" />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo electrónico</label>
                  <div className="mt-1">
                    <input type="email" name="email" id="email" className="w-full px-4 py-3 bg-slate-100 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none" placeholder="tu@email.com" />
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">Mensaje</label>
                  <div className="mt-1">
                    <textarea id="message" name="message" rows={4} className="w-full px-4 py-3 bg-slate-100 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none" placeholder="Escribe tu consulta aquí..."></textarea>
                  </div>
                </div>
                <div>
                  <button type="submit" className="w-full bg-[#e52e8d] text-white font-bold py-3 px-6 rounded-full hover:bg-[#c82278] transition-colors flex items-center justify-center gap-2 text-base shadow-lg">
                    Enviar Mensaje
                  </button>
                </div>
              </form>
            </div>
            {/* Contact Info */}
            <div className="space-y-8">
                <div className="bg-white p-8 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 animate-fade-in-up">Información de Contacto</h2>
                    <div className="space-y-4 text-gray-700">
                        <div className="flex items-start gap-4">
                            <MapPinIcon className="w-6 h-6 text-pink-600 mt-1 flex-shrink-0"/>
                            <div>
                                <h3 className="font-semibold">Dirección</h3>
                                <p>Av. Principal 123, Miraflores, Lima, Perú</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <ChatIcon className="w-6 h-6 text-pink-600 mt-1 flex-shrink-0"/>
                            <div>
                                <h3 className="font-semibold">Teléfono</h3>
                                <p>+51 987 654 321</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <AtSymbolIcon className="w-6 h-6 text-pink-600 mt-1 flex-shrink-0"/>
                            <div>
                                <h3 className="font-semibold">Email</h3>
                                <p>contacto@ketoshop.com</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 animate-fade-in-up">Horario de Atención</h2>
                    <p className="text-gray-700">Lunes a Viernes: 9:00 AM - 6:00 PM</p>
                    <p className="text-gray-700">Sábados: 9:00 AM - 1:00 PM</p>
                </div>
            </div>
          </div>
        </div>

        {/* Products Grid Section */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 bg-white">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 animate-fade-in-up">También te podría interesar</h2>
                <p className="mt-2 text-gray-600 animate-fade-in-up delay-100">Descubre otros productos increíbles en nuestro catálogo.</p>
            </div>
            <ProductsGrid
                limit={4}
                onProductClick={onProductClick}
                onAddToCart={onAddToCart}
                onCartOpen={handleOpenCart}
            />
        </section>

      </main>
      <Footer onLegalClick={onLegalClick} onCatalogClick={onCatalogClick} onHomeClick={onHomeClick} />
      <CheckoutPopup
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        onUpdateQuantity={onUpdateCartQuantity}
      />
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={handleProceedToCheckout}
        items={cartItems}
        onRemoveItem={onRemoveFromCart}
        onUpdateQuantity={onUpdateCartQuantity}
      />
    </div>
  );
};

export default ContactPage;