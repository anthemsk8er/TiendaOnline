import React, { useState, useEffect, useRef } from 'react';
import type { CartItem, Product as ProductType, Profile, PromotionCard, SupabaseProduct } from '../types';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabaseClient';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import ProductGallery from '../components/product_detail_page/ProductGallery';
import ProductInfo from '../components/product_detail_page/ProductInfo';
import ProductReviewsSection from '../components/product_detail_page/ProductReviewsSection';
import CheckoutPopup from '../components/cart_delivery/CheckoutPopup';
import Cart from '../components/cart_delivery/Cart';
import WhatsAppButton from '../components/shared/WhatsAppButton';
import ProductFeatures from '../components/product_detail_page/ProductFeatures';
import ProductHero from '../components/product_detail_page/ProductHero';
import ProductBenefitsSection from '../components/product_detail_page/ProductBenefitsSection';
import ComparisonTable from '../components/product_detail_page/ComparisonTable';
import FaqSection from '../components/product_detail_page/FaqSection';
import VideoWithFeatures from '../components/product_detail_page/VideoWithFeatures';
import RichTextSection from '../components/product_detail_page/RichTextSection';

interface ProductDetailPageProps {
  productId: string | null;
  onProductClick: (productId: string, productName: string) => void;
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
  onAddToCart: (product: ProductType, quantity: number) => void;
  onUpdateCartQuantity: (productId: string, quantity: number, newUnitPrice?: number) => void;
  onRemoveFromCart: (productId: string) => void;
  session: Session | null;
  profile: Profile | null;
  onLogout: () => void;
  showAuthModal: (view: 'login' | 'register') => void;
  onEditProduct: (id: string) => void;
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = (props) => {
  const { productId, onAddToCart, cartItems, onUpdateCartQuantity, onRemoveFromCart, profile, onEditProduct } = props;
  const [product, setProduct] = useState<ProductType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) {
        setError('No product ID provided.');
        setLoading(false);
        return;
      }
      if (!supabase) {
        setError('Supabase client not available.');
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      
      const { data, error: fetchError } = await supabase
        .from('products')
        .select('*')
        .eq('id', productId)
        .single();

      if (fetchError) {
        setError(`Error fetching product: ${fetchError.message}`);
      } else if (data) {
        const p = data as SupabaseProduct;
        const images = [
          p.image_url, p.image_url_2, p.image_url_3, p.image_url_4,
          p.image_url_5, p.image_url_6, p.image_url_7, p.image_url_8,
          p.image_url_9, p.image_url_10
        ].filter((url): url is string => !!url);
        
        const transformedProduct: ProductType = {
          id: p.id,
          vendor: p.vendor,
          title: p.name,
          price: p.discount_price ?? p.price,
          originalPrice: p.discount_price ? p.price : null,
          images,
          rating: 5, // Placeholder
          reviewCount: 0, // Placeholder
          description: p.description,
          main_benefits: [
            p.benefit1_title && { title: p.benefit1_title, description: p.benefit1_description || '' },
            p.benefit2_title && { title: p.benefit2_title, description: p.benefit2_description || '' },
            p.benefit3_title && { title: p.benefit3_title, description: p.benefit3_description || '' },
            p.benefit4_title && { title: p.benefit4_title, description: p.benefit4_description || '' },
          ].filter(Boolean) as { title: string, description: string }[],
          details: [
            p.accordion_point1_title && { title: p.accordion_point1_title, content: p.accordion_point1_content || '' },
            p.accordion_point2_title && { title: p.accordion_point2_title, content: p.accordion_point2_content || '' },
            p.accordion_point3_title && { title: p.accordion_point3_title, content: p.accordion_point3_content || '' },
            p.accordion_point4_title && { title: p.accordion_point4_title, content: p.accordion_point4_content || '' },
          ].filter(Boolean) as { title: string, content: string }[],
          stock: p.stock,
          hero_data: p.hero_data as any,
          features_data: p.features_data as any,
          benefits_data: p.benefits_data as any,
          comparison_data: p.comparison_data as any,
          faq_data: p.faq_data as any,
          video_with_features_data: p.video_with_features_data as any,
          desktop_content: p.desktop_content,
          mobile_content: p.mobile_content,
          highlights_data: p.highlights_data as any,
          promotions_data: p.promotions_data as any,
        };
        setProduct(transformedProduct);
      } else {
        setError('Product not found.');
      }
      setLoading(false);
    };

    fetchProduct();
  }, [productId]);

  const handleOpenCart = () => setIsCartOpen(true);
  
  const handleOrderNow = (quantity: number) => {
    if (!product) return;
    onAddToCart(product, quantity);
    setIsCheckoutOpen(true);
  };

  const handleSelectPromotion = (promotion: PromotionCard) => {
    if (!product) return;
    // Extract quantity from title, e.g., "Comprar 2 unidades" -> 2
    const quantity = parseInt(promotion.title.match(/\d+/)?.[0] || '1', 10);
    const newUnitPrice = promotion.price / quantity;

    // First, add the product to the cart if it's not already there.
    // This ensures there's an item to update.
    const isInCart = cartItems.some(item => item.id === product.id);
    if (!isInCart) {
      onAddToCart(product, 0); // Add with 0 quantity initially
    }

    // Use a timeout to ensure the state update from onAddToCart has propagated
    // before we update the quantity and price.
    setTimeout(() => {
      onUpdateCartQuantity(product.id, quantity, newUnitPrice);
      setIsCheckoutOpen(true);
    }, 50); 
  };
  
  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };
  
  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const headerProps = { ...props, onCartClick: handleOpenCart, cartItemCount };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#2575fc]"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">Error</h2>
        <p className="text-red-500 mt-2">{error || 'Could not load product.'}</p>
      </div>
    );
  }

  const whatsappMessage = `Hola, me gustaría comprar: ${product.title}, ¿qué ofertas tiene?`;

  return (
    <div className="bg-gray-50">
      <Header {...headerProps} />
      <main className="pb-24">
        <div className="container mx-auto px-0 sm:px-6 lg:px-8 pt-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              <ProductGallery images={product.images} videoUrl={null} />
              <div>
                <ProductInfo 
                  product={product} 
                  onOrderNow={handleOrderNow} 
                  profile={profile} 
                  onEditProduct={onEditProduct} 
                  onSelectPromotion={handleSelectPromotion}
                />
              </div>
            </div>
        </div>
        
        

        <section className="container mx-auto px-0 sm:px-0 lg:px-8 my-0 lg:my-24">
            <RichTextSection 
                initialDesktopContent={product.desktop_content}
                initialMobileContent={product.mobile_content}
                previewOnly={true}
            />
        </section>
        <ProductHero heroData={product.hero_data} />
        <ProductFeatures featuresData={product.features_data} />
        <VideoWithFeatures data={product.video_with_features_data} />
        <ProductBenefitsSection benefitsData={product.benefits_data} />
        <ComparisonTable comparisonData={product.comparison_data} productImageUrl={product.images[0]} />
        <FaqSection faqData={product.faq_data} />
        

        <ProductReviewsSection productId={product.id} />
      </main>
      <Footer onLegalClick={props.onLegalClick} onCatalogClick={props.onCatalogClick} onHomeClick={props.onHomeClick} onContactFaqClick={props.onContactFaqClick} />
      <CheckoutPopup isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} items={cartItems} onUpdateCartQuantity={onUpdateCartQuantity} />
      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        onCheckout={handleProceedToCheckout}
        items={cartItems}
        onRemoveItem={onRemoveFromCart}
        onUpdateCartQuantity={onUpdateCartQuantity}
      />
      <WhatsAppButton 
        phoneNumber="965210993" 
        message={whatsappMessage} 
        className={'bottom-20 right-5'}
      />
      
      {/* Sticky "Add to Cart" Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)] p-3 z-40">
        <div className="container mx-auto px-4 flex justify-between items-center gap-4">
            <div className="flex items-center gap-3 overflow-hidden">
                <img src={product.images[0]} alt={product.title} className="w-12 h-12 rounded-md object-cover flex-shrink-0" />
                <div className="flex-grow min-w-0">
                    <h3 className="text-sm font-bold text-gray-800 truncate">{product.title}</h3>
                    <p className="text-sm font-semibold text-gray-700">S/ {product.price.toFixed(2)}</p>
                </div>
            </div>
            <button
                onClick={() => handleOrderNow(1)}
                className="bg-teal-600 text-white font-bold py-3 px-5 rounded-lg hover:bg-teal-700 transition-colors whitespace-nowrap text-sm shadow-md"
            >
                👉 Obtener hoy mismo
            </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;