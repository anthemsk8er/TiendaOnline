import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
// FIX: Changed import path to be relative to the root `types.ts`
import type { CartItem, Product, Profile } from '../types';
import type { Session, PostgrestSingleResponse } from '@supabase/supabase-js';
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

const heroData = {
    url: 'https://uylwgmvnlnnkkvjqirhx.supabase.co/storage/v1/object/public/products/img/index-hero-img/citratodemagnesio.jpg',
    alt: 'Promo Citrato de Magnesio',
    title: 'Despierta tu Potencial',
    subtitle: 'Suplementos naturales para darte la energía que necesitas cada día.',
    buttonText: 'Quiero la oferta',
};


interface HomePageProps {
  onProductClick: (slug: string) => void;
  onCatalogClick: (category?: string) => void;
  onHomeClick: () => void;
  onContactFaqClick: () => void;
  onLegalClick: () => void;
  onAdminProductUploadClick?: () => void;
  onAdminProductManagementClick?: () => void;
  onAdminUserManagementClick?: () => void;
  onAdminOrdersClick?: () => void;
  onAdminDiscountManagementClick?: () => void;
  onAdminReviewManagementClick?: () => void;
  cartItems: CartItem[];
  onAddToCart: (product: Product, quantity: number) => void;
  onUpdateCartQuantity: (productId: string, quantity: number, newUnitPrice?: number) => void;
  onRemoveFromCart: (productId: string) => void;
  // Auth props
  session: Session | null;
  profile: Profile | null;
  onLogout: () => void;
  showAuthModal: (view: 'login' | 'register') => void;
  onEditProduct: (id: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ 
    onProductClick, onCatalogClick, onHomeClick, onContactFaqClick, onLegalClick,
    onAdminProductUploadClick, onAdminProductManagementClick, onAdminUserManagementClick, onAdminOrdersClick, onAdminDiscountManagementClick, onAdminReviewManagementClick,
    cartItems, onAddToCart, onUpdateCartQuantity, onRemoveFromCart,
    session, profile, onLogout, showAuthModal, onEditProduct
}) => {
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [citratoProduct, setCitratoProduct] = useState<{id: string, name: string, slug: string | null} | null>(null);
    
    useEffect(() => {
        const fetchCitratoId = async () => {
            if (!supabase) return;
            // Fetch the product ID for Citrato de Magnesio to link the hero button correctly.
            const { data, error }: PostgrestSingleResponse<{ id: string; name: string; slug: string | null; }> = await supabase
                .from('products')
                .select('id, name, slug')
                .ilike('name', '%citrato de magnesio%')
                .limit(1)
                .single();
            
            if (error && error.code !== 'PGRST116') {
                console.warn("Hero button product 'Citrato de Magnesio' not found, falling back to category link:", error.message);
            } else if (data) {
                setCitratoProduct(data);
            }
        };

        fetchCitratoId();
    }, []);

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
                onAdminOrdersClick={onAdminOrdersClick}
                onAdminDiscountManagementClick={onAdminDiscountManagementClick}
                onAdminReviewManagementClick={onAdminReviewManagementClick}
                cartItemCount={cartItemCount}
                session={session}
                profile={profile}
                onLogout={onLogout}
                showAuthModal={showAuthModal}
            />
            <main>

            
                {/* Static Hero Section */}
                <section className="relative h-[60vh] md:h-[75vh] w-full overflow-hidden">
                    <div className="absolute inset-0">
                        <img
                            src={`${heroData.url}?w=auto&quality=80`}
                            alt={heroData.alt}
                            className="w-full h-full object-cover object-center"
                            fetchPriority="high"
                            loading="eager"
                        />
                    </div>
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="relative z-10 flex flex-col items-center justify-center text-center text-white mt-8 h-full">
               
                        <button
                            onClick={() => {
                                if (citratoProduct && citratoProduct.slug) {
                                    onProductClick(citratoProduct.slug);
                                } else {
                                    // Fallback to the 'Energía' category if product not found
                                    onCatalogClick('Energía');
                                }
                            }}
                            className="mt-8 bg-[#16a085] text-white font-bold py-3 px-8 rounded-full hover:bg-[#117a65] transition-colors flex items-center justify-center gap-2 text-lg shadow-lg animate-fade-in-up delay-400"
                        >
                            {heroData.buttonText} <ArrowRightIcon className="w-5 h-5" />
                        </button>
                    </div>
                </section>



                {/* Featured Products Section */}
                <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#1a2b63] animate-fade-in-up">Ofertas del Mes</h2>
                        <p className="mt-2 text-gray-600 animate-fade-in-up delay-100">Una selección de nuestros mejores productos para ti.</p>
                    </div>
                    <ProductsGrid
                    
                        tagFilter="Oferta"
                        limit={6}
                        onProductClick={onProductClick}
                        onAddToCart={onAddToCart}
                        onCartOpen={handleOpenCart}
                        profile={profile}
                        onEditProduct={onEditProduct}
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
                            <h2 className="text-3xl md:text-4xl font-bold text-[#1a2b63] animate-fade-in-up">Nuestras Categorías</h2>
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
                                        <img src={`${cat.image}?width=200&height=200&resize=cover&quality=80`} alt={cat.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" width="200" height="200"/>
                                    </div>
                                    <h3 className="mt-4 font-semibold text-lg text-[#1a2b63] group-hover:text-[#16a085]">{cat.name}</h3>
                                </a>
                            ))}
                        </div>
                    </div>
                </section>
                <ShippingGuaranteeSection />
            </main>
            <Footer onLegalClick={onLegalClick} onCatalogClick={onCatalogClick} onHomeClick={onHomeClick} onContactFaqClick={onContactFaqClick} />
            {/* FIX: Corrected typo from onUpdateQuantity to onUpdateCartQuantity */}
            <CheckoutPopup isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} items={cartItems} onUpdateCartQuantity={onUpdateCartQuantity}/>
            <Cart 
                isOpen={isCartOpen} 
                onClose={() => setIsCartOpen(false)} 
                onCheckout={handleProceedToCheckout} 
                items={cartItems}
                onRemoveItem={onRemoveFromCart}
                // FIX: Corrected typo from onUpdateQuantity to onUpdateCartQuantity
                onUpdateCartQuantity={onUpdateCartQuantity}
             />
            <WhatsAppButton phoneNumber="965210993" message={whatsappMessage} />
        </div>
    );
};

export default HomePage;