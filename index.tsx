
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import HomePage from './pages/HomePage';
import ProductCatalog from './pages/ProductCatalog';
import ProductDetailPage from './pages/ProductDetailPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';
import LegalPage from './pages/LegalPage';
import ProductManagementPage from './pages_admin/ProductManagementPage';
import ProductUploadPage from './pages_admin/ProductUploadPage';
import UserManagementPage from './pages_admin/UserManagementPage';
import OrdersPage from './pages_admin/OrdersPage';
import DiscountCodeManagementPage from './pages_admin/DiscountCodeManagementPage';
import DiscountCodeFormPage from './pages_admin/DiscountCodeFormPage';
import ReviewManagementPage from './pages_admin/ReviewManagementPage';
import AuthModal from './components/auth/AuthModal';
import { supabase } from './lib/supabaseClient';
import type { Product, CartItem, Profile } from './types';
import type { Session } from '@supabase/supabase-js';
import DiscountTab from './components/shared/DiscountTab';

interface ViewState {
    view: string;
    productId: string | null;
    categoryFilter: string | null;
}

const App = () => {
    const [currentView, setCurrentView] = useState<ViewState>({
        view: 'home',
        productId: null,
        categoryFilter: null,
    });
    const [editingProductId, setEditingProductId] = useState<string | null>(null);
    const [editingDiscountCodeId, setEditingDiscountCodeId] = useState<string | null>(null);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const [session, setSession] = useState<Session | null>(null);
    const [profile, setProfile] = useState<Profile | null>(null);
    const [authModalView, setAuthModalView] = useState<'login' | 'register' | null>(null);
    const [loadingProfile, setLoadingProfile] = useState(true);

    // Effect to handle browser's back and forward buttons
    useEffect(() => {
        // On initial load, replace the current history state with our home view state.
        // This ensures the back button works correctly from the very first navigation.
        window.history.replaceState(currentView, '');

        const handlePopState = (event: PopStateEvent) => {
            if (event.state) {
                // When the user navigates (e.g., clicks 'back'), the browser provides the state.
                // We update our React state to match, triggering a re-render to the previous view.
                setCurrentView(event.state);
            }
        };

        window.addEventListener('popstate', handlePopState);
        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, []); // Empty dependency array ensures this runs only once on mount.


    useEffect(() => {
        if (!supabase) {
            setLoadingProfile(false);
            return;
        }
        
        const getSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setSession(session);
            if (!session) setLoadingProfile(false);
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
                    .select('id, full_name, role')
                    .eq('id', session.user.id)
                    .single();

                // If there's an error, and it's not because the row is missing, log it.
                if (error && error.code !== 'PGRST116') {
                    console.error('Error fetching profile:', error.message);
                    setProfile(null);
                } else {
                    // Construct the profile, using user_metadata as a fallback for the name.
                    const userMetadata = session.user.user_metadata as { [key: string]: any } | undefined;
                    const fullName = profileData?.full_name || userMetadata?.full_name || session.user.email || 'Usuario';
                    
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

    // Navigation handler
    const navigate = (newView: string, id: string | null = null, category: string | null = null) => {
        const newViewState: ViewState = { view: newView, productId: id, categoryFilter: category };

        // Only navigate if the view is actually different to avoid duplicate history entries
        if (JSON.stringify(newViewState) === JSON.stringify(currentView)) {
            return;
        }
        
        // Push the new view state into the browser's history stack
        window.history.pushState(newViewState, '');
        // Update our React state to render the new view
        setCurrentView(newViewState);

        window.scrollTo(0, 0);
    };

    const handleHomeClick = () => navigate('home');
    const handleCatalogClick = (category?: string) => navigate('catalog', null, category || null);
    const handleProductClick = (id: string) => navigate('product', id);
    const handleContactClick = () => navigate('contact');
    const handleLegalClick = () => navigate('legal');

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
    const handleAdminDiscountFormClick = () => {
        setEditingDiscountCodeId(null);
        navigate('admin-discount-form');
    };

    const handleEditProduct = (id: string) => {
        setEditingProductId(id);
        navigate('admin-upload');
    };
     const handleEditDiscountCode = (id: string) => {
        setEditingDiscountCodeId(id);
        navigate('admin-discount-form');
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
        onContactClick: handleContactClick,
        onLegalClick: handleLegalClick,
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
    };

    const renderView = () => {
        if (!profile && loadingProfile && session) {
             return (
                <div className="flex justify-center items-center h-screen">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-pink-600"></div>
                </div>
            );
        }

        switch (currentView.view) {
            case 'home':
                return <HomePage {...pageProps} />;
            case 'catalog':
                return <ProductCatalog {...pageProps} category={currentView.categoryFilter || undefined} />;
            case 'product':
                return <ProductDetailPage {...pageProps} productId={currentView.productId} />;
            case 'contact':
                return <ContactPage {...pageProps} />;
            case 'legal':
                return <LegalPage {...pageProps} />;
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
            <DiscountTab />
        </>
    );
};

const rootElement = document.getElementById('root');
if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
}
