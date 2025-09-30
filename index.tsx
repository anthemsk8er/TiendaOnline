import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import HomePage from './pages/HomePage';
import ProductCatalog from './pages/ProductCatalog';
// FIX: Corrected import path
import ProductDetailPage from './pages/ProductDetailPage';
import ContactFaqPage from './pages/ContactFaqPage';
import NotFoundPage from './pages/NotFoundPage';
import LegalPage from './pages/LegalPage';
import WelcomePage from './pages/WelcomePage';
import ProfilePage from './pages/ProfilePage';
import ProductManagementPage from './pages_admin/ProductManagementPage';
// FIX: Corrected import path
import { ProductUploadPage } from './pages_admin/ProductUploadPage';
import UserManagementPage from './pages_admin/UserManagementPage';
import OrdersPage from './pages_admin/OrdersPage';
import DiscountCodeManagementPage from './pages_admin/DiscountCodeManagementPage';
import DiscountCodeFormPage from './pages_admin/DiscountCodeFormPage';
import ReviewManagementPage from './pages_admin/ReviewManagementPage';
import AuthModal from './components/auth/AuthModal';
import { supabase } from './lib/supabaseClient';
// FIX: Corrected import path
import type { Product, CartItem, Profile, PromotionCard } from './types';
import type { Session, PostgrestSingleResponse } from '@supabase/supabase-js';


interface ViewState {
    view: string;
    productSlug: string | null;
    categoryFilter: string | null;
}

// IMPORTANT: Replace with your actual reCAPTCHA v3 Site Key
const RECAPTCHA_V3_SITE_KEY = '6LfaSNkrAAAAANs2uvdGDvomsM7wXlpubYtrNqGt';

const App = () => {
    const [currentView, setCurrentView] = useState<ViewState>({
        view: 'home',
        productSlug: null,
        categoryFilter: null,
    });
    const [editingProductId, setEditingProductId] = useState<string | null>(null);
    const [editingDiscountCodeId, setEditingDiscountCodeId] = useState<string | null>(null);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const [session, setSession] = useState<Session | null>(null);
    const [profile, setProfile] = useState<Profile | null>(null);
    const [authModalView, setAuthModalView] = useState<'login' | 'register' | null>(null);
    const [loadingProfile, setLoadingProfile] = useState(true);
    
    // Navigation handler
    const navigate = (newView: string, id: string | null = null, category: string | null = null, slugData: string | null = null) => {
        let path = ''; // Paths for hash routing don't need a leading slash
        switch (newView) {
            case 'home':
                path = '';
                break;
            case 'catalog':
                path = category ? `catalogo/${encodeURIComponent(category)}` : 'catalogo';
                break;
            case 'product':
                path = `productos/${slugData}`;
                break;
            case 'contact-faq':
                path = 'ayuda';
                break;
            case 'legal':
                path = 'legal';
                break;
            case 'welcome':
                path = 'bienvenida';
                break;
            case 'profile':
                path = 'perfil';
                break;
            case 'admin-products':
                path = 'admin/productos';
                break;
            case 'admin-upload':
                path = id ? `admin/productos/editar/${id}` : 'admin/productos/nuevo';
                break;
            case 'admin-users':
                path = 'admin/usuarios';
                break;
            case 'admin-orders':
                path = 'admin/ordenes';
                break;
            case 'admin-reviews':
                path = 'admin/resenas';
                break;
            case 'admin-discounts':
                path = 'admin/descuentos';
                break;
            case 'admin-discount-form':
                path = id ? `admin/descuentos/editar/${id}` : 'admin/descuentos/nuevo';
                break;
            default:
                path = newView; // Fallback for any other view
        }
        
        window.location.hash = path;
        window.scrollTo(0, 0);
    };

    // Effect to handle hash changes for routing
    useEffect(() => {
        const parseHashAndSetView = () => {
            const path = window.location.hash.substring(1); // Remove '#'
            const pathParts = path.split('/').filter(p => p);

            let viewState: ViewState = { view: 'home', productSlug: null, categoryFilter: null };

            if (pathParts.length > 0) {
                const view = pathParts[0];
                switch (view) {
                    case 'catalogo':
                        viewState = { view: 'catalog', productSlug: null, categoryFilter: pathParts.length > 1 ? decodeURIComponent(pathParts[1]) : null };
                        break;
                    case 'productos':
                        if (pathParts.length > 1) {
                            const slug = pathParts[1];
                            viewState = { view: 'product', productSlug: slug, categoryFilter: null };
                        }
                        break;
                    case 'ayuda':
                        viewState = { view: 'contact-faq', productSlug: null, categoryFilter: null };
                        break;
                    case 'legal':
                        viewState = { view: 'legal', productSlug: null, categoryFilter: null };
                        break;
                    case 'bienvenida':
                        viewState = { view: 'welcome', productSlug: null, categoryFilter: null };
                        break;
                    case 'perfil':
                        viewState = { view: 'profile', productSlug: null, categoryFilter: null };
                        break;
                    case 'admin':
                        if (pathParts.length > 1) {
                            const subView = pathParts[1];
                            const id = pathParts.length > 3 ? pathParts[3] : null;
                             if (subView === 'productos') {
                                if (pathParts[2] === 'nuevo') {
                                    viewState = { view: 'admin-upload', productSlug: null, categoryFilter: null };
                                } else if (pathParts[2] === 'editar' && id) {
                                    viewState = { view: 'admin-upload', productSlug: null, categoryFilter: null };
                                    setEditingProductId(id);
                                } else {
                                    viewState = { view: 'admin-products', productSlug: null, categoryFilter: null };
                                }
                            } else if (subView === 'usuarios') {
                                viewState = { view: 'admin-users', productSlug: null, categoryFilter: null };
                            } else if (subView === 'ordenes') {
                                viewState = { view: 'admin-orders', productSlug: null, categoryFilter: null };
                            } else if (subView === 'resenas') {
                                viewState = { view: 'admin-reviews', productSlug: null, categoryFilter: null };
                            } else if (subView === 'descuentos') {
                                if (pathParts[2] === 'nuevo') {
                                    viewState = { view: 'admin-discount-form', productSlug: null, categoryFilter: null };
                                } else if (pathParts[2] === 'editar' && id) {
                                    viewState = { view: 'admin-discount-form', productSlug: null, categoryFilter: null };
                                    setEditingDiscountCodeId(id);
                                } else {
                                    viewState = { view: 'admin-discounts', productSlug: null, categoryFilter: null };
                                }
                            }
                        }
                        break;
                    default:
                        // The render function will handle the 404 case if the view doesn't exist
                        viewState = { view: view, productSlug: null, categoryFilter: null };
                }
            }
            
            setCurrentView(viewState);
        };

        window.addEventListener('hashchange', parseHashAndSetView);
        // Initial load
        parseHashAndSetView();

        return () => {
            window.removeEventListener('hashchange', parseHashAndSetView);
        };
    }, []); 


    useEffect(() => {
        if (!supabase) {
            setLoadingProfile(false);
            return;
        }
        
        const getSession = async () => {
            const { data: sessionData } = await supabase.auth.getSession();
            setSession(sessionData.session);
            if (!sessionData.session) setLoadingProfile(false);
        };
        getSession();

        const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            if (!session) {
                setProfile(null);
                setLoadingProfile(false);
            }
        });

        return () => {
            authListener.subscription.unsubscribe();
        };
    }, []);

    useEffect(() => {
        const getProfile = async () => {
            if (session?.user && supabase) {
                setLoadingProfile(true);
                // Fetch profile from 'profiles' table
                const { data: profileData, error } = await supabase
                    .from('profiles')
                    .select('full_name, role')
                    .eq('id', session.user.id)
                    .single();

                // If there's an error, and it's not because the row is missing, log it.
                if (error && error.code !== 'PGRST116') {
                    console.error('Error fetching profile:', error.message);
                    setProfile(null);
                } else {
                    // Construct the profile, using user_metadata as a fallback for the name.
                    const userMetadata = session.user.user_metadata;
                    const fullNameFromMeta = (userMetadata && typeof userMetadata.full_name === 'string') ? userMetadata.full_name : undefined;
                    const fullName = profileData?.full_name || fullNameFromMeta || session.user.email || 'Usuario';
                    
                    const role: 'ADMIN' | 'CLIENT' = profileData?.role === 'ADMIN' ? 'ADMIN' : 'CLIENT';

                    const finalProfile: Profile = {
                        id: session.user.id,
                        full_name: fullName,
                        role: role,
                    };
                    setProfile(finalProfile);
                }
                setLoadingProfile(false);
            }
        };
        getProfile();
    }, [session]);
    
    useEffect(() => {
        try {
            const storedCart = localStorage.getItem('ketoshop-cart');
            if (storedCart) {
                setCartItems(JSON.parse(storedCart) as CartItem[]);
            }
        } catch (error) {
            console.error("Failed to parse cart items from localStorage", error);
            localStorage.removeItem('ketoshop-cart');
        }
    }, []);

    useEffect(() => {
        try {
            if (cartItems.length > 0) {
               localStorage.setItem('ketoshop-cart', JSON.stringify(cartItems));
            } else {
               localStorage.removeItem('ketoshop-cart');
            }
        } catch (error) {
            console.error("Failed to save cart items to localStorage", error);
        }
    }, [cartItems]);

    const handleHomeClick = () => navigate('home');
    const handleCatalogClick = (category?: string) => navigate('catalog', null, category || null);
    const handleProductClick = (slug: string) => navigate('product', null, null, slug);
    const handleContactFaqClick = () => navigate('contact-faq');
    const handleLegalClick = () => navigate('legal');
    const handleProfileClick = () => navigate('profile');

    // Admin navigation
    const handleAdminProductManagementClick = () => navigate('admin-products');
    const handleAdminProductUploadClick = () => {
        setEditingProductId(null);
        navigate('admin-upload');
    };
    const handleAdminUserManagementClick = () => navigate('admin-users');
    const handleAdminOrdersClick = () => navigate('admin-orders');
    const handleAdminDiscountManagementClick = () => navigate('admin-discounts');
    const handleAdminReviewManagementClick = () => navigate('admin-reviews');
    const handleAdminWelcomePageClick = () => navigate('welcome');
    const handleAdminDiscountFormClick = () => {
        setEditingDiscountCodeId(null);
        navigate('admin-discount-form');
    };

    const handleEditProduct = (id: string) => {
        setEditingProductId(id);
        navigate('admin-upload', id);
    };
     const handleEditDiscountCode = (id: string) => {
        setEditingDiscountCodeId(id);
        navigate('admin-discount-form', id);
    };
    const handleUploadFinished = () => {
        setEditingProductId(null);
        navigate('admin-products');
    };
    const handleDiscountFormFinished = () => {
        setEditingDiscountCodeId(null);
        navigate('admin-discounts');
    };

    // Cart handlers
    const handleAddToCart = (product: Product, quantity: number) => {
        if (!product.images || product.images.length === 0) {
            console.error("Attempted to add a product to cart with no images:", product);
            return; // Prevent adding item without an image
        }
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === product.id);
            if (existingItem) {
                return prevItems.map(item => 
                    item.id === product.id 
                    ? { ...item, quantity: item.quantity + quantity } 
                    : item
                );
            }
            const productForCart: CartItem = {
                id: product.id,
                vendor: product.vendor,
                title: product.title,
                price: product.price,
                originalPrice: product.originalPrice ?? null,
                image: product.images[0],
                quantity: quantity
            };
            return [...prevItems, productForCart];
        });
    };

    const handleUpdateCartQuantity = (productId: string, quantity: number, newUnitPrice?: number) => {
        setCartItems(prevItems => prevItems.map(item => {
            if (item.id === productId) {
                const updatedItem = { ...item, quantity };
                if (newUnitPrice !== undefined) {
                    // If originalPrice isn't set (is null or undefined), it means the item had no initial discount.
                    // We should set it to the current item's price before applying the new offer price.
                    // This preserves the single-unit base price for future calculations.
                    if (item.originalPrice == null) {
                        updatedItem.originalPrice = item.price;
                    }
                    updatedItem.price = newUnitPrice;
                }
                return updatedItem;
            }
            return item;
        }).filter(item => item.quantity > 0));
    };

    const handleRemoveFromCart = (productId: string) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    };
    
    const handleSelectPromotionAndAddToCart = (product: Product, promotion: PromotionCard) => {
        const quantityMatch = promotion.title.match(/\d+/);
        const quantity = quantityMatch ? parseInt(quantityMatch[0], 10) : 1;
        if (quantity <= 0) return;

        const newUnitPrice = promotion.price / quantity;
        
        setCartItems(prevItems => {
            const existingItemIndex = prevItems.findIndex(item => item.id === product.id);

            if (existingItemIndex > -1) {
                // Item exists, update it
                const newItems = [...prevItems];
                const updatedItem = { 
                    ...newItems[existingItemIndex], 
                    quantity: quantity, 
                    price: newUnitPrice 
                };

                // Preserve the very first price as the original price
                if (newItems[existingItemIndex].originalPrice == null) {
                     // The originalPrice from the product object is the base single-unit price before any discounts
                     updatedItem.originalPrice = product.originalPrice ?? product.price;
                }
                
                newItems[existingItemIndex] = updatedItem;
                return newItems;
            } else {
                // Item does not exist, add it
                const newCartItem: CartItem = {
                    id: product.id,
                    vendor: product.vendor,
                    title: product.title,
                    price: newUnitPrice,
                    originalPrice: product.originalPrice ?? product.price, // Base price before promotion
                    image: product.images[0],
                    quantity: quantity
                };
                return [...prevItems, newCartItem];
            }
        });
    };

    // Auth Handlers
    const handleLogout = async () => {
        if (!supabase) return;
        const { error } = await supabase.auth.signOut();
        if (error) console.error('Error logging out:', error.message);
        // onAuthStateChange listener will clear session and profile
        navigate('home');
    };

    const showAuthModal = (view: 'login' | 'register') => {
        setAuthModalView(view);
    };

    const closeAuthModal = () => {
        setAuthModalView(null);
    };

    const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    const pageProps = {
        cartItems: cartItems,
        cartItemCount: cartItemCount,
        onAddToCart: handleAddToCart,
        onUpdateCartQuantity: handleUpdateCartQuantity,
        onRemoveFromCart: handleRemoveFromCart,
        onProductClick: handleProductClick,
        onCatalogClick: handleCatalogClick,
        onHomeClick: handleHomeClick,
        onContactFaqClick: handleContactFaqClick,
        onLegalClick: handleLegalClick,
        onProfileClick: handleProfileClick,
        session: session,
        profile: profile,
        onLogout: handleLogout,
        showAuthModal: showAuthModal,
        onAdminProductUploadClick: handleAdminProductUploadClick,
        onAdminProductManagementClick: handleAdminProductManagementClick,
        onAdminUserManagementClick: handleAdminUserManagementClick,
        onAdminOrdersClick: handleAdminOrdersClick,
        onAdminDiscountManagementClick: handleAdminDiscountManagementClick,
        onAdminReviewManagementClick: handleAdminReviewManagementClick,
        onAdminWelcomePageClick: handleAdminWelcomePageClick,
        onSelectPromotionAndAddToCart: handleSelectPromotionAndAddToCart,
    };

    const renderView = () => {
        if (!profile && loadingProfile && session) {
             return (
                <div className="flex justify-center items-center h-screen">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#2575fc]"></div>
                </div>
            );
        }

        switch (currentView.view) {
            case 'home':
                return <HomePage {...pageProps} onEditProduct={handleEditProduct} />;
            case 'catalog':
                return <ProductCatalog {...pageProps} category={currentView.categoryFilter || undefined} onEditProduct={handleEditProduct} />;
            case 'product':
                return <ProductDetailPage {...pageProps} productSlug={currentView.productSlug} onEditProduct={handleEditProduct} />;
            case 'contact-faq':
                return <ContactFaqPage {...pageProps} />;
            case 'legal':
                return <LegalPage {...pageProps} />;
            case 'welcome':
                return <WelcomePage {...pageProps} />;
            case 'profile':
                return <ProfilePage {...pageProps} />;
            case 'admin-products':
                return <ProductManagementPage 
                    {...pageProps}
                    onEditProduct={handleEditProduct}
                    onViewProduct={handleProductClick}
                    onAddNewProduct={handleAdminProductUploadClick}
                    />;
            case 'admin-upload':
                return <ProductUploadPage
                    {...pageProps}
                    productIdToEdit={editingProductId} 
                    onFinished={handleUploadFinished}
                    onViewProduct={handleProductClick}
                    />;
            case 'admin-users':
                 return <UserManagementPage {...pageProps} />;
            case 'admin-orders':
                 return <OrdersPage {...pageProps} />;
            case 'admin-reviews':
                return <ReviewManagementPage {...pageProps} />;
            case 'admin-discounts':
                return <DiscountCodeManagementPage
                    {...pageProps}
                    onAddNewDiscountCode={handleAdminDiscountFormClick}
                    onEditDiscountCode={handleEditDiscountCode}
                    />;
            case 'admin-discount-form':
                return <DiscountCodeFormPage
                    {...pageProps}
                    discountCodeIdToEdit={editingDiscountCodeId}
                    onFinished={handleDiscountFormFinished}
                    />
            default:
                return <NotFoundPage {...pageProps} />;
        }
    };

    return (
        <>
            {renderView()}
            {authModalView && <AuthModal view={authModalView} onClose={closeAuthModal} />}
        </>
    );
};

const rootElement = document.getElementById('root');
if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        <React.StrictMode>
            <GoogleReCaptchaProvider reCaptchaKey={RECAPTCHA_V3_SITE_KEY}>
                <App />
            </GoogleReCaptchaProvider>
        </React.StrictMode>
    );
}