import React from 'react';
import type { Session } from '@supabase/supabase-js';
import type { Profile } from '../types';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

// A cog icon to represent "work in progress"
const CogIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

interface NotFoundPageProps {
  onHomeClick: () => void;
  onCatalogClick: (category?: string) => void;
  onContactClick: () => void;
  onLegalClick: () => void;
  cartItemCount: number;
  session: Session | null;
  profile: Profile | null;
  onLogout: () => void;
  showAuthModal: (view: 'login' | 'register') => void;
  onAdminProductUploadClick?: () => void;
  onAdminProductManagementClick?: () => void;
  onAdminUserManagementClick?: () => void;
  onAdminOrdersClick?: () => void;
}

const NotFoundPage: React.FC<NotFoundPageProps> = (props) => {
    // The 404 page needs access to all header props to render it correctly
    const headerProps = {
        ...props,
        onCartClick: () => {}, // Dummy handler, cart is probably not relevant here
    };

    return (
        <div className="bg-white flex flex-col min-h-screen">
            <Header {...headerProps} />
            <main className="flex-grow flex items-center justify-center">
                <div className="text-center p-8">
                    <CogIcon className="w-24 h-24 mx-auto text-pink-400 animate-spin-slow" />
                    <h1 className="mt-6 text-6xl md:text-8xl font-black text-gray-800 tracking-tighter">404</h1>
                    <h2 className="mt-2 text-2xl md:text-3xl font-bold text-gray-700">Página en Construcción</h2>
                    <p className="mt-4 max-w-lg mx-auto text-gray-500">
                        ¡Ups! Parece que esta página no existe o todavía estamos trabajando en ella.
                        Mientras tanto, puedes volver al inicio y seguir explorando nuestros productos.
                    </p>
                    <button
                        onClick={props.onHomeClick}
                        className="mt-8 bg-[#e52e8d] text-white font-bold py-3 px-8 rounded-full hover:bg-[#c82278] transition-colors flex items-center justify-center gap-2 text-lg shadow-lg mx-auto"
                    >
                        Volver al Inicio
                    </button>
                </div>
            </main>
            <Footer onLegalClick={props.onLegalClick} onCatalogClick={props.onCatalogClick} onHomeClick={props.onHomeClick} />
        </div>
    );
};

export default NotFoundPage;