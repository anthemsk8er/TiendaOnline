



import React, { useState, useEffect } from 'react';
import type { CartItem, Product, Profile } from '../types';
import type { Session } from '@supabase/supabase-js';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { ArrowRightIcon } from '../components/product_detail_page/Icons';
import CheckoutPopup from '../components/cart_delivery/CheckoutPopup';
import Cart from '../components/cart_delivery/Cart';
import ProductsGrid from '../components/products/ProductsGrid';
import WhatsAppButton from '../components/shared/WhatsAppButton';
import InfiniteTextBanner from '../components/shared/InfiniteTextBanner';
import ShippingGuaranteeSection from '../components/shared/ShippingGuaranteeSection';

const categories = [
    { name: 'Sueño', image: 'https://uylwgmvnlnnkkvjqirhx.supabase.co/storage/v1/object/public/products/img/categories/sleep.jpg' },
    { name: 'Energía', image: 'https://uylwgmvnlnnkkvjqirhx.supabase.co/storage/v1/object/public/products/img/categories/energy.jpg' },
    { name: 'Enfoque', image: 'https://uylwgmvnlnnkkvjqirhx.supabase.co/storage/v1/object/public/products/img/categories/focus.jpg' },
    { name: 'Inmunidad', image: 'https://uylwgmvnlnnkkvjqirhx.supabase.co/storage/v1/object/public/products/img/categories/inmunity1.jpg' },
    { name: 'Belleza', image: 'https://uylwgmvnlnnkkvjqirhx.supabase.co/storage/v1/object/public/products/img/categories/belleza.jpg' },
    { name: 'Digestión', image: 'https://uylwgmvnlnnkkvjqirhx.supabase.co/storage/v1/object/public/products/img/categories/digestion.jpg' },
];

interface HomePageProps {
  onProductClick: (productId: string) => void;
  onCatalogClick: (category?: string) => void;
  onHomeClick: () => void;
  onContactFaqClick: () => void;
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

const HomePage: React.FC<HomePageProps> = ({ 
    onProductClick, onCatalogClick, onHomeClick, onContactFaqClick, onLegalClick,
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

    const whatsappMessage = "Hola! me gustaría conocer su catálogo de productos y qué categorías tienen";

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
                {/* Banner Section with Image */}
                <section className="relative h-[60vh] md:h-[60vh] flex flex-col items-center justify-center text-white text-center px-4 overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full z-10"></div>
                    <img
                        src="https://uylwgmvnlnnkkvjqirhx.supabase.co/storage/v1/object/public/products/img/index-hero-img/promo_energia_natural.jpg"
                        alt="Promo Energía"
                        className="absolute top-0 left-0 w-full h-full object-cover z-0"
                        width="1280"
                        height="853"
                        fetchPriority="high"
                    />
                    <div className="relative z-20 flex flex-col items-center">
       
                       {/*  <button 
                            onClick={() => onCatalogClick()}
                            className="mt-40 bg-blue-700 text-white font-bold py-3 px-8 rounded-full hover:bg-blue-800 transition-colors flex items-center justify-center gap-2 text-lg shadow-lg animate-fade-in-up delay-200"
                        >
                            Ver Catálogo <ArrowRightIcon className="w-5 h-5" />
                        </button>
                        */}
                    </div>
                </section>

                

                {/* Featured Products Section */}
                <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 animate-fade-in-up">Ofertas del Mes</h2>
                        <p className="mt-2 text-gray-600 animate-fade-in-up delay-100">Una selección de nuestros mejores productos para ti.</p>
                    </div>
                    <ProductsGrid
                    
                        tagFilter="Oferta"
                        limit={6}
                        onProductClick={onProductClick}
                        onAddToCart={onAddToCart}
                        onCartOpen={handleOpenCart}
                    />
                </section>
<InfiniteTextBanner
                    texts={[
                        'OFERTAS POR LANZAMIENTO',
                         'OFERTAS POR LANZAMIENTO',
                         'OFERTAS POR LANZAMIENTO',
                          'OFERTAS POR LANZAMIENTO',
                    ]}
                    colorScheme="purple"
                    speed="fast"
                />
                {/* Categories Section */}
                <section className="bg-gray-30 py-16 lg:py-24">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 animate-fade-in-up">Nuestras Categorías</h2>
                            <p className="mt-2 text-gray-600 animate-fade-in-up delay-100">Encuentra lo que necesitas para cada aspecto de tu bienestar.</p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
                            {categories.map((cat, index) => (
                                <a 
                                    href="#" 
                                    key={cat.name} 
                                    onClick={(e) => { e.preventDefault(); onCatalogClick(cat.name); }} 
                                    className="block group text-center animate-fade-in-up"
                                    style={{ animationDelay: `${200 + index * 50}ms` }}
                                >
                                    <div className="aspect-square bg-gray-200 rounded-full overflow-hidden w-3/4 mx-auto shadow-md group-hover:shadow-xl transition-shadow">
                                        <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" width="200" height="200"/>
                                    </div>
                                    <h3 className="mt-4 font-semibold text-lg text-gray-800 group-hover:text-green-600">{cat.name}</h3>
                                </a>
                            ))}
                        </div>
                    </div>
                </section>
                <ShippingGuaranteeSection />
            </main>
            <Footer onLegalClick={onLegalClick} onCatalogClick={onCatalogClick} onHomeClick={onHomeClick} onContactFaqClick={onContactFaqClick} />
            <CheckoutPopup isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} items={cartItems} onUpdateQuantity={onUpdateCartQuantity}/>
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

export default HomePage;
