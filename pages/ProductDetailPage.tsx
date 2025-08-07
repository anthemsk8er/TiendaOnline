

import React, { useState, useEffect } from 'react';
import type { Product, Review, CartItem, SupabaseProduct, Tag, Category, AccordionItem, HeroData, FeaturesData, BenefitsData, ComparisonData, FaqData, Profile, VideoWithFeaturesData } from '../types';
import type { Session, PostgrestError } from '@supabase/supabase-js';
import { supabase } from '../lib/supabaseClient';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import ProductHero from '../components/product_detail_page/ProductHero';
import ProductGallery from '../components/product_detail_page/ProductGallery';
import ProductInfo from '../components/product_detail_page/ProductInfo';
import ProductFeatures from '../components/product_detail_page/ProductFeatures';
import ComparisonTable from '../components/product_detail_page/ComparisonTable';
import FaqSection from '../components/product_detail_page/FaqSection';
import { ShoppingBagIcon, ChevronRightIcon } from '../components/product_detail_page/Icons';
import ProductBenefitsSection from '../components/product_detail_page/ProductBenefitsSection';
import VideoWithFeatures from '../components/product_detail_page/VideoWithFeatures';
import CheckoutPopup from '../components/cart_delivery/CheckoutPopup';
import Cart from '../components/cart_delivery/Cart';
import ProductsGrid from '../components/products/ProductsGrid';
import WhatsAppButton from '../components/shared/WhatsAppButton';
import InfiniteTextBanner from '../components/shared/InfiniteTextBanner';
import ShippingGuaranteeSection from '../components/shared/ShippingGuaranteeSection';
import ProductReviewsSection from '../components/product_detail_page/ProductReviewsSection';

interface ProductDetailPageProps {
  productId: string | null;
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

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ 
  productId, 
  onProductClick, 
  onCatalogClick, 
  onHomeClick,
  onContactFaqClick,
  onLegalClick,
  onAdminProductUploadClick,
  onAdminProductManagementClick,
  onAdminUserManagementClick,
  cartItems, 
  onAddToCart, 
  onUpdateCartQuantity, 
  onRemoveFromCart,
  session, profile, onLogout, showAuthModal
}) => {
  const [product, setProduct] = useState<SupabaseProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) {
        setError("No se ha especificado un producto.");
        setLoading(false);
        return;
      }
      if (!supabase) {
        setError("No se pudo conectar a la base de datos.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const { data, error: fetchError }: { data: any | null, error: PostgrestError | null } = await supabase
          .from('products')
          .select(`
            *,
            product_categories(categories(id, name)),
            product_tags(tags(id, name, color))
          `)
          .eq('id', productId!)
          .single();

        if (fetchError) throw fetchError;
        
        if (data) {
          const transformedProduct = {
            ...data,
            tags: (data.product_tags || [])
                .map((pt) => pt.tags)
                .filter((t): t is Tag => t !== null),
            categories: (data.product_categories || [])
                .map((pc) => pc.categories)
                .filter((c): c is Category => c !== null),
          };
          setProduct(transformedProduct as SupabaseProduct);
        } else {
            setError('Producto no encontrado.');
        }

      } catch (err: unknown) {
        let errorMessage = 'An unknown error occurred.';
        if (typeof err === 'object' && err !== null) {
            if ('message' in err && typeof (err as any).message === 'string') {
                errorMessage = (err as any).message;
            }
        } else if (typeof err === 'string') {
            errorMessage = err;
        }
        setError(`Error al cargar el producto: ${errorMessage}`);
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);


  const handleOpenCart = () => setIsCartOpen(true);

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };
  
  const transformSupabaseProductToLegacy = (p: SupabaseProduct): Product => {
    const details: AccordionItem[] = [];
    for (let i = 1; i <= 4; i++) {
        const title = p[`accordion_point${i}_title` as keyof SupabaseProduct] as string | null;
        const content = p[`accordion_point${i}_content` as keyof SupabaseProduct] as string | null;
        if (title && content) {
            details.push({ title, content });
        }
    }

    const images: string[] = [
        p.image_url,
        p.image_url_2,
        p.image_url_3,
        p.image_url_4,
    ].filter((img): img is string => !!img);

    return {
      id: p.id,
      vendor: p.vendor,
      title: p.name,
      price: p.discount_price ?? p.price,
      originalPrice: p.discount_price ? p.price : null,
      images: images,
      videoUrl: p.video_url,
      rating: 5, // Default
      reviewCount: 0, // Default
      stock: p.stock,
      description: p.description,
      benefits: [],
      ingredients: [],
      usage: '',
      details: details.length > 0 ? details : undefined,
      heroData: (p.hero_data as unknown as HeroData) || undefined,
      featuresData: (p.features_data as unknown as FeaturesData) || undefined,
      benefitsData: (p.benefits_data as unknown as BenefitsData) || undefined,
      comparison_data: (p.comparison_data as unknown as ComparisonData) || undefined,
      faqData: (p.faq_data as unknown as FaqData) || undefined,
      videoWithFeaturesData: (p.video_with_features_data as unknown as VideoWithFeaturesData) || undefined,
    };
  };


  const handleOrderNow = (quantity: number) => {
    if (!product) return;
    const productForCart: Product = transformSupabaseProductToLegacy(product);
    onAddToCart(productForCart, quantity);
    setIsCheckoutOpen(true);
  };

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const body = document.body;
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsCartOpen(false);
        setIsCheckoutOpen(false);
      }
    };

    if (isCartOpen || isCheckoutOpen) {
      body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEsc);
    } else {
      body.style.overflow = 'unset';
    }
    
    return () => {
      body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isCartOpen, isCheckoutOpen]);

  const headerProps = { onCartClick:handleOpenCart, onCatalogClick, onHomeClick, onContactFaqClick, onAdminProductUploadClick, onAdminProductManagementClick, onAdminUserManagementClick, cartItemCount, session, profile, onLogout, showAuthModal};

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-pink-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white min-h-screen">
        <Header {...headerProps} />
        <div className="flex flex-col justify-center items-center text-center py-20">
          <h2 className="text-2xl font-bold text-red-600">Oops, algo salió mal</h2>
          <p className="text-red-500 mt-2 max-w-md">{error}</p>
          <button 
              onClick={onHomeClick}
              className="mt-6 bg-pink-600 text-white px-6 py-2 rounded-full hover:bg-pink-700 font-semibold"
          >
              Volver al inicio
          </button>
        </div>
        <Footer onLegalClick={onLegalClick} onCatalogClick={onCatalogClick} onHomeClick={onHomeClick} onContactFaqClick={onContactFaqClick} />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="bg-white min-h-screen">
        <Header {...headerProps} />
        <div className="flex flex-col justify-center items-center text-center py-20">
          <h2 className="text-2xl font-bold text-gray-800">Producto no encontrado</h2>
          <p className="text-gray-500 mt-2">El producto que buscas no existe o no está disponible.</p>
          <button 
              onClick={onHomeClick}
              className="mt-6 bg-pink-600 text-white px-6 py-2 rounded-full hover:bg-pink-700 font-semibold"
          >
              Volver al inicio
          </button>
        </div>
        <Footer onLegalClick={onLegalClick} onCatalogClick={onCatalogClick} onHomeClick={onHomeClick} onContactFaqClick={onContactFaqClick} />
      </div>
    );
  }

  const legacyProduct: Product = transformSupabaseProductToLegacy(product);
  const productLink = `https://ketoshop.pe/producto/${product.id}`;
  const whatsappMessage = `Hola!, quiero más información de ${product.name} ${productLink}`;

  return (
    <div className="bg-white pb-28 sm:pb-0">
      <Header {...headerProps} />
      <main>
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-0">
            {/* <nav className="flex mb-6" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                  <a href="#" onClick={(e) => { e.preventDefault(); onHomeClick(); }} className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-green-600">
                    Inicio
                  </a>
                </li>
                <li>
                  <div className="flex items-center">
                    <ChevronRightIcon className="w-5 h-5 text-gray-400" strokeWidth={2}/>
                    <a href="#" onClick={(e) => { e.preventDefault(); onCatalogClick(); }} className="ml-1 text-sm font-medium text-gray-700 hover:text-green-600 md:ml-2">
                      Catálogo
                    </a>
                  </div>
                </li>
                {product.categories && product.categories[0] && (
                  <li>
                    <div className="flex items-center">
                      <ChevronRightIcon className="w-5 h-5 text-gray-400" strokeWidth={2}/>
                      <a href="#" onClick={(e) => { e.preventDefault(); onCatalogClick(product.categories[0].name); }} className="ml-1 text-sm font-medium text-gray-700 hover:text-green-600 md:ml-2">
                        {product.categories[0].name}
                      </a>
                    </div>
                  </li>
                )}
                <li aria-current="page">
                  <div className="flex items-center">
                    <ChevronRightIcon className="w-5 h-5 text-gray-400" strokeWidth={2}/>
                    <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 line-clamp-1" title={product.name}>
                      {product.name}
                    </span>
                  </div>
                </li>
              </ol>
            </nav>*/}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
              <ProductGallery images={legacyProduct.images} videoUrl={legacyProduct.videoUrl} />
              <ProductInfo product={legacyProduct} onOrderNow={handleOrderNow} />
            </div>
        </section>

       

        <InfiniteTextBanner
            texts={[
                'PAGA AL RECIBIR (LIMA E CALLAO)',
                'ENVÍOS A TODO EL PERÚ',
                'PRODUCTOS ORIGINALES',
                'ENVÍOS SEGUROS',
            ]}
            colorScheme="purple"
            speed="fast"
        />
        <VideoWithFeatures data={legacyProduct.videoWithFeaturesData} />
        <ProductHero heroData={legacyProduct.heroData} />
        <ProductFeatures featuresData={legacyProduct.featuresData} />
        <ProductBenefitsSection benefitsData={legacyProduct.benefitsData} imagePosition="left" />
        
        <ComparisonTable comparisonData={legacyProduct.comparison_data} productImageUrl={legacyProduct.images[0]} />

        <FaqSection faqData={legacyProduct.faqData} />
        <ShippingGuaranteeSection />
        <ProductReviewsSection productId={product.id} />
   
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 mt-16 lg:mt-24">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-8 animate-fade-in-up">Completa tu Rutina</h2>
             <ProductsGrid 
                limit={4}
                onProductClick={onProductClick}
                onAddToCart={onAddToCart}
                tagFilter={'Oferta'}
                onCartOpen={handleOpenCart}
             />
        </section>

      

   

      </main>
      <Footer onLegalClick={onLegalClick} onCatalogClick={onCatalogClick} onHomeClick={onHomeClick} onContactFaqClick={onContactFaqClick} />
       <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-sm border-t border-black-500 sm:hidden z-30">
        <button 
          onClick={() => handleOrderNow(1)}
          className="w-full bg-red-500 text-white font-bold py-4 px-6 rounded-full hover:bg-red-600 transition-colors flex items-center justify-center gap-3 text-base shadow-lg shadow-red-500/30 animate-tada-periodic"
        >
          <ShoppingBagIcon className="w-5 h-5"/>
          REALIZAR MI PEDIDO
        </button>
      </div>
      <CheckoutPopup isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} items={cartItems} onUpdateQuantity={onUpdateCartQuantity} />
      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        onCheckout={handleProceedToCheckout} 
        items={cartItems}
        onRemoveItem={onRemoveFromCart}
        onUpdateQuantity={onUpdateCartQuantity}
      />
      <WhatsAppButton
        phoneNumber="965210993"
        message={whatsappMessage}
        className="bottom-24 right-5 sm:bottom-5"
      />
       
    </div>
  );
};

export default ProductDetailPage;