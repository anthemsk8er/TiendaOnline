

import React, { useState, useEffect } from 'react';
import type { CartItem, Product, Profile } from '../types';
import type { Session } from '@supabase/supabase-js';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { ChevronRightIcon } from '../components/product_detail_page/Icons';
import CheckoutPopup from '../components/cart_delivery/CheckoutPopup';
import Cart from '../components/cart_delivery/Cart';
import ProductsGrid from '../components/products/ProductsGrid';
import WhatsAppButton from '../components/shared/WhatsAppButton';

const bannerImage = 'https://uylwgmvnlnnkkvjqirhx.supabase.co/storage/v1/object/public/products/img/product-catalog/productCatalogHeroImage.jpg';

interface ProductCatalogProps {
  onProductClick: (productId: string, productName: string) => void;
  onCatalogClick: (category?: string) => void;
  onHomeClick: () => void;
  onContactFaqClick: () => void;
  onLegalClick: () => void;
  onAdminProductUploadClick?: () => void;
  onAdminProductManagementClick?: () => void;
  onAdminUserManagementClick?: () => void;
  category?: string;
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

const ProductCatalog: React.FC<ProductCatalogProps> = ({ 
    onProductClick, onCatalogClick, onHomeClick, onContactFaqClick, onLegalClick,
    onAdminProductUploadClick, onAdminProductManagementClick, onAdminUserManagementClick,
    category, cartItems, onAddToCart, onUpdateCartQuantity, onRemoveFromCart,
    session, profile, onLogout, showAuthModal
}) => {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [refetchTrigger, setRefetchTrigger] = useState(0);

  const handleOpenCart = () => setIsCartOpen(true);
  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };
  
  const handleRefresh = () => {
    setRefetchTrigger(prev => prev + 1);
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

  const getMonthYear = () => {
    const date = new Date();
    const month = date.toLocaleString('es-ES', { month: 'long' });
    const year = date.getFullYear();
    return `${month.charAt(0).toUpperCase() + month.slice(1)} ${year}`;
  };

  const title = category ? category : `Catálogo (${getMonthYear()})`;
  const whatsappMessage = "Hola estoy viendo su catálogo de productos en Ketoshop, estoy buscando....";
  
  return (
    <div className="bg-white">
      <Header 
        onCartClick={handleOpenCart} 
        onCatalogClick={onCatalogClick} 
        onHomeClick={onHomeClick} 
        onContactFaqClick={onContactFaqClick} 
        onAdminProductUploadClick={onAdminProductUploadClick} 
        onAdminProductManagementClick={onAdminProductManagementClick}
        onAdminUserManagementClick={onAdminUserManagementClick}
        cartItemCount={cartItemCount}
        session={session}
        profile={profile}
        onLogout={onLogout}
        showAuthModal={showAuthModal}
      />
      <main>
        {/* Banner Section */}
        <section 
          className="h-40 bg-cover bg-center flex items-center justify-center text-white"
          style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${bannerImage}?width=1920&quality=75)`}}
        >
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight animate-fade-in-up">{title}</h1>
        </section>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Breadcrumbs and Refresh Button */}
            <div className="flex justify-between items-center pb-5">
             {/*  <nav className="flex" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-3">
                  <li className="inline-flex items-center">
                    <a href="#" onClick={(e) => { e.preventDefault(); onHomeClick(); }} className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-[#16a085]">
                      Inicio
                    </a>
                  </li>
                  {category ? (
                    <>
                      <li>
                        <div className="flex items-center">
                          <ChevronRightIcon className="w-5 h-5 text-gray-400" strokeWidth={2}/>
                          <a href="#" onClick={(e) => { e.preventDefault(); onCatalogClick(); }} className="ml-1 text-sm font-medium text-gray-700 hover:text-[#16a085] md:ml-2">
                            Catálogo
                          </a>
                        </div>
                      </li>
                      <li aria-current="page">
                        <div className="flex items-center">
                          <ChevronRightIcon className="w-5 h-5 text-gray-400" strokeWidth={2}/>
                          <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">
                            {category}
                          </span>
                        </div>
                      </li>
                    </>
                  ) : (
                    <li aria-current="page">
                      <div className="flex items-center">
                        <ChevronRightIcon className="w-5 h-5 text-gray-400" strokeWidth={2}/>
                        <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">
                          Catálogo
                        </span>
                      </div>
                    </li>
                  )}
                </ol>
              </nav>
             <button
                onClick={handleRefresh}
                className="bg-[#16a085] text-white px-4 py-2 rounded-md hover:bg-[#117a65] text-sm font-semibold transition-colors"
              >
                Actualizar Productos
              </button> */}
            </div>

            {/* Products Grid */}
            <ProductsGrid 
                showLoadMore={true}
                categoryFilter={category || undefined}
                onProductClick={onProductClick}
                onAddToCart={onAddToCart}
                refetchTrigger={refetchTrigger}
                onCartOpen={handleOpenCart}
            />
        </div>

      </main>
      <Footer onLegalClick={onLegalClick} onCatalogClick={onCatalogClick} onHomeClick={onHomeClick} onContactFaqClick={onContactFaqClick} />
      {/* FIX: Corrected typo from onUpdateQuantity to onUpdateCartQuantity */}
      <CheckoutPopup isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} items={cartItems} onUpdateQuantity={onUpdateCartQuantity} />
      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        onCheckout={handleProceedToCheckout}
        items={cartItems}
        onRemoveItem={onRemoveFromCart}
        onUpdateQuantity={onUpdateCartQuantity}
      />
       <WhatsAppButton phoneNumber="965210993" message={whatsappMessage} />
    </div>
  );
};

export default ProductCatalog;
