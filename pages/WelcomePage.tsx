import React from 'react';
import type { Session } from '@supabase/supabase-js';
import type { Profile, CartItem, Product } from '../types';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

interface WelcomePageProps {
  onProductClick: (slug: string) => void;
  onCatalogClick: (category?: string) => void;
  onHomeClick: () => void;
  onContactFaqClick: () => void;
  onLegalClick: () => void;
  onProfileClick?: () => void;
  onAdminProductUploadClick?: () => void;
  onAdminProductManagementClick?: () => void;
  onAdminUserManagementClick?: () => void;
  onAdminOrdersClick?: () => void;
  onAdminDiscountManagementClick?: () => void;
  onAdminReviewManagementClick?: () => void;
  onAdminWelcomePageClick?: () => void;
  cartItems: CartItem[];
  cartItemCount: number;
  onAddToCart: (product: Product, quantity: number) => void;
  onUpdateCartQuantity: (productId: string, quantity: number, newUnitPrice?: number) => void;
  onRemoveFromCart: (productId: string) => void;
  session: Session | null;
  profile: Profile | null;
  onLogout: () => void;
  showAuthModal: (view: 'login' | 'register') => void;
}

const WelcomePage: React.FC<WelcomePageProps> = (props) => {
    const { profile } = props;

    return (
        <div className="bg-slate-50 min-h-screen">
            <Header {...props} onCartClick={() => {}} />
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="max-w-4xl mx-auto space-y-8 bg-white p-8 rounded-lg shadow-md mt-16 mb-16">
                    <div className="text-center">
                        <h1 className="text-4xl font-black text-gray-800 tracking-tight">
                            ¡Bienvenido a la página de bienvenida!
                        </h1>
                        {profile && (
                            <p className="mt-2 text-lg text-gray-600">
                                Hola, {profile.full_name.split(' ')[0]}
                            </p>
                        )}
                        <p className="mt-4 text-gray-600">
                            Esta página es un marcador de posición. El contenido para la página de bienvenida se puede agregar aquí.
                            Desde el panel de administración, puede administrar varios aspectos de la tienda.
                        </p>
                        <div className="mt-8 flex justify-center gap-4">
                            <button
                                onClick={props.onHomeClick}
                                className="bg-[#e52e8d] text-white font-bold py-3 px-8 rounded-full hover:bg-[#c82278] transition-colors"
                            >
                                Ir a Inicio
                            </button>
                            <button
                                onClick={() => props.onCatalogClick()}
                                className="bg-gray-700 text-white font-bold py-3 px-8 rounded-full hover:bg-gray-800 transition-colors"
                            >
                                Ver Catálogo
                            </button>
                        </div>
                    </div>
                </div>
            </main>
            <Footer {...props} />
        </div>
    );
};

export default WelcomePage;
