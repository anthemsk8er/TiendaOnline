
import React, { useState, useEffect } from 'react';
import type { Session } from '@supabase/supabase-js';
import type { Profile } from '../../types';
import InfiniteTextBanner from '../shared/InfiniteTextBanner';
import { MenuIcon, SearchIcon, ShoppingBagIcon, XMarkIcon, UserIcon, ChevronDownIcon } from '../product_detail_page/Icons';


interface HeaderProps {
  onCartClick: () => void;
  onCatalogClick: (category?: string) => void;
  onHomeClick: () => void;
  onContactFaqClick: () => void;
  onAdminProductUploadClick?: () => void;
  onAdminProductManagementClick?: () => void;
  onAdminUserManagementClick?: () => void;
  onAdminOrdersClick?: () => void;
  onAdminDiscountManagementClick?: () => void;
  onAdminReviewManagementClick?: () => void;
  cartItemCount: number;
  session: Session | null;
  profile: Profile | null;
  onLogout: () => void;
  showAuthModal: (view: 'login' | 'register') => void;
}

const Header: React.FC<HeaderProps> = ({
  onCartClick,
  onCatalogClick,
  onHomeClick,
  onContactFaqClick,
  onAdminProductUploadClick,
  onAdminProductManagementClick,
  onAdminUserManagementClick,
  onAdminOrdersClick,
  onAdminDiscountManagementClick,
  onAdminReviewManagementClick,
  cartItemCount,
  session,
  profile,
  onLogout,
  showAuthModal
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const isAdmin = profile?.role === 'ADMIN';

  useEffect(() => {
    if (isMenuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMenuOpen]);

  const createNavHandler = (navFunction?: (...args: any[]) => void) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (navFunction) navFunction();
    setIsMenuOpen(false);
  };

  const navLinks = [
    { label: 'Inicio', handler: createNavHandler(onHomeClick) },
    { label: 'Catálogo', handler: createNavHandler(onCatalogClick) },
    { label: 'Ayuda y FAQ', handler: createNavHandler(onContactFaqClick) },
  ];

  const adminLinks = [
    { label: 'Gestión de Órdenes', handler: createNavHandler(onAdminOrdersClick), condition: isAdmin && !!onAdminOrdersClick },
    { label: 'Gestión de Productos', handler: createNavHandler(onAdminProductManagementClick), condition: isAdmin && !!onAdminProductManagementClick },
    { label: 'Gestión de Descuentos', handler: createNavHandler(onAdminDiscountManagementClick), condition: isAdmin && !!onAdminDiscountManagementClick },
    { label: 'Gestión de Comentarios', handler: createNavHandler(onAdminReviewManagementClick), condition: isAdmin && !!onAdminReviewManagementClick },
    { label: 'Subir Producto', handler: createNavHandler(onAdminProductUploadClick), condition: isAdmin && !!onAdminProductUploadClick },
    { label: 'Gestión de Usuarios', handler: createNavHandler(onAdminUserManagementClick), condition: isAdmin && !!onAdminUserManagementClick },
  ];

  const authLinks = !session
    ? [
        { label: 'Ingresar', handler: (e: React.MouseEvent<HTMLAnchorElement>) => { e.preventDefault(); showAuthModal('login'); setIsMenuOpen(false); } }
       
      ]
    : [];

  return (
    <header className="z-40 bg-[#2952a3] shadow-md">
                <InfiniteTextBanner
                    texts={[
                        'PAGA AL RECIBIR (LIMA Y CALLAO)',
                        'ENVÍOS A TODO EL PERÚ',
                        'PRODUCTOS ORIGINALES',
                        'ENVÍOS SEGUROS',
                    ]}
                    colorScheme="dark"
                    speed="fast"
                />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex flex-1 justify-start">
            <button onClick={() => setIsMenuOpen(true)} aria-label="Open menu" className="rounded-md p-2 text-gray-200 transition hover:bg-[#1f3e7a] hover:text-white lg:hidden">
              <MenuIcon className="h-6 w-6" />
            </button>
            <nav className="hidden lg:flex lg:gap-6">
                {navLinks.map(link => (
                    <a href="#" key={link.label} onClick={link.handler} className="font-medium text-gray-100 hover:text-[#90b8f8] transition-colors">{link.label}</a>
                ))}
            </nav>
          </div>
          <div className="flex-shrink-0">
            <a href="#" onClick={(e) => { e.preventDefault(); onHomeClick(); }} aria-label="Back to homepage">
              <img src="https://uylwgmvnlnnkkvjqirhx.supabase.co/storage/v1/object/public/products/img/header/ketonaturalshop.svg" alt="KetoNatural Shop Logo" className="h-8 w-auto brightness-0 invert" />
            </a>
          </div>
          <div className="flex flex-1 items-center justify-end gap-2">
            <button aria-label="Search" className="hidden sm:block rounded-md p-2 text-gray-200 transition hover:bg-[#1f3e7a] hover:text-white">
              <SearchIcon className="h-6 w-6" />
            </button>
            {session ? (
              <div className="relative">
                <button onClick={() => setIsUserMenuOpen(!isUserMenuOpen)} className="flex items-center gap-2 rounded-full p-2 text-gray-200 transition hover:bg-[#1f3e7a]">
                    <UserIcon className="h-6 w-6"/>
                    <span className="hidden sm:inline font-medium text-sm">{profile?.full_name?.split(' ')[0]}</span>
                    <ChevronDownIcon className="h-4 w-4 hidden sm:inline"/>
                </button>
                {isUserMenuOpen && (
                    <div onMouseLeave={() => setIsUserMenuOpen(false)} className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-50">
                        <div className="px-4 py-2 text-sm text-[#1a2b63] border-b">Hola, <strong>{profile?.full_name}</strong></div>
                        {adminLinks.map(link => link.condition && <a href="#" key={link.label} onClick={link.handler} className="block px-4 py-2 text-sm text-[#1a2b63] hover:bg-gray-100">{link.label}</a>)}
                        <a href="#" onClick={(e) => { e.preventDefault(); onLogout(); setIsUserMenuOpen(false); }} className="block px-4 py-2 text-sm text-[#16a085] hover:bg-gray-100">Cerrar Sesión</a>
                    </div>
                )}
              </div>
            ) : (
                <div className="hidden sm:flex items-center gap-2">
                    <button onClick={() => showAuthModal('login')} className="px-4 py-2 text-sm font-medium text-gray-100 hover:text-[#90b8f8]">Ingresar</button>
                  </div>
            )}
            <button onClick={onCartClick} aria-label="Open cart" className="relative rounded-md p-2 text-gray-200 transition hover:bg-[#1f3e7a] hover:text-white">
              <ShoppingBagIcon className="h-6 w-6" />
              {cartItemCount > 0 && <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#16a085] text-xs font-medium text-white">{cartItemCount}</span>}
            </button>
          </div>
        </div>
      </div>
      <div className={`fixed inset-0 z-50 transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div onClick={() => setIsMenuOpen(false)} className="absolute inset-0 bg-black/50" aria-hidden="true"></div>
        <div className={`relative flex flex-col h-full w-4/5 max-w-sm bg-white shadow-xl transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="font-bold text-lg text-[#1a2b63]">Menú</h2>
            <button onClick={() => setIsMenuOpen(false)} aria-label="Close menu" className="rounded-md p-2 text-gray-600 transition hover:bg-gray-200"><XMarkIcon className="h-6 w-6" /></button>
          </div>
          <nav className="flex-grow p-4">
            <ul className="space-y-4">
               {navLinks.map(link => <li key={link.label}><a href="#" onClick={link.handler} className="text-lg text-[#1a2b63] hover:text-[#16a085] font-medium block p-2 rounded-md hover:bg-gray-100">{link.label}</a></li>)}
               {(adminLinks.some(l => l.condition) || authLinks.length > 0) && <hr className="my-4"/>}
               {adminLinks.map(link => link.condition && <li key={link.label}><a href="#" onClick={link.handler} className="text-lg text-[#1a2b63] hover:text-[#16a085] font-medium block p-2 rounded-md hover:bg-gray-100">{link.label}</a></li>)}
               {authLinks.map(link => <li key={link.label}><a href="#" onClick={link.handler} className="text-lg text-[#1a2b63] hover:text-[#16a085] font-medium block p-2 rounded-md hover:bg-gray-100">{link.label}</a></li>)}
               {session && <li><a href="#" onClick={(e) => { e.preventDefault(); onLogout(); setIsMenuOpen(false); }} className="text-lg text-[#16a085] font-medium block p-2 rounded-md hover:bg-gray-100">Cerrar Sesión</a></li>}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;