
import React, { useState, useEffect } from 'react';
import type { Session } from '@supabase/supabase-js';
import type { Profile, CartItem, Product } from '../types';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { UserIcon, AtSymbolIcon, ChatIcon, GiftIcon, DownloadIcon, WhatsAppIcon, CheckCircleIcon } from '../components/product_detail_page/Icons';

interface ProfilePageProps {
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

const InfoCard = ({ icon, title, subtitle }: { icon: React.ReactNode, title: string, subtitle: string | null | undefined }) => (
    <div className="flex items-center gap-4 border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
        <div className="bg-slate-100 p-3 rounded-full flex-shrink-0">
            {icon}
        </div>
        <div>
            <p className="font-semibold text-gray-800">{title}</p>
            <p className="text-sm text-gray-600">{subtitle || 'No disponible'}</p>
        </div>
    </div>
);

const GiftCouponCard: React.FC<{ code: string; description: string; used: boolean; onProductClick: (slug: string) => void; productSlug: string | null; }> = ({ code, description, used, onProductClick, productSlug }) => {
    return (
        <div className={`border rounded-lg p-4 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4 ${used ? 'bg-gray-100' : 'bg-green-50 border-green-200'}`}>
            <div className="flex-grow">
                <div className="flex items-center gap-2">
                    {used ? <CheckCircleIcon className="w-5 h-5 text-gray-500" /> : <GiftIcon className="w-5 h-5 text-green-600"/>}
                    <p className={`font-bold ${used ? 'text-gray-500' : 'text-green-800'}`}>{code}</p>
                </div>
                <p className={`text-sm mt-1 ${used ? 'text-gray-500' : 'text-gray-700'}`}>{description}</p>
            </div>
            {used ? (
                <span className="w-full md:w-auto text-center font-bold text-sm text-gray-500 px-4 py-2 rounded-md bg-gray-200">Utilizado</span>
            ) : (
                <button 
                    onClick={() => productSlug && onProductClick(productSlug)}
                    disabled={!productSlug}
                    className="w-full md:w-auto bg-gray-800 text-white font-bold py-2 px-4 rounded-lg hover:bg-black transition-colors text-sm disabled:bg-gray-400 disabled:cursor-not-allowed whitespace-nowrap"
                >
                    Ver Producto
                </button>
            )}
        </div>
    )
};


const ResourceCard = ({ icon, title, description, buttonText, downloadLink }: { icon: React.ReactNode, title: string, description: string, buttonText: string, downloadLink: string }) => (
    <div className="bg-white rounded-lg border border-gray-200 p-6 flex flex-col items-start hover:shadow-lg hover:-translate-y-1 transition-all duration-300 shadow-sm">
        <div className="bg-[#e52e8d]/10 text-[#e52e8d] p-3 rounded-full mb-4">
            {icon}
        </div>
        <h3 className="text-lg font-bold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-600 mt-2 mb-4 flex-grow">{description}</p>
        <a href={downloadLink} target="_blank" rel="noopener noreferrer" className="w-full mt-auto bg-gray-800 text-white font-bold py-2.5 px-4 rounded-lg hover:bg-black transition-colors flex items-center justify-center gap-2 text-sm">
            <DownloadIcon className="w-5 h-5" />
            <span>{buttonText}</span>
        </a>
    </div>
);

const CommunityCard: React.FC<{ name: string, link: string }> = ({ name, link }) => (
    <a href={link} target="_blank" rel="noopener noreferrer" className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm hover:bg-gray-50 transition-colors flex flex-col items-center justify-center text-center">
        <div className="bg-green-100 p-3 rounded-full mb-3">
            <WhatsAppIcon className="w-7 h-7 text-green-600" />
        </div>
        <p className="text-sm font-semibold text-gray-800">{name}</p>
    </a>
);


const ProfilePage: React.FC<ProfilePageProps> = (props) => {
    const { session, profile, onProductClick } = props;

    if (!session || !profile) {
        return (
            <div className="flex flex-col min-h-screen">
                <Header {...props} cartItemCount={0} onCartClick={() => {}} />
                <main className="flex-grow flex items-center justify-center text-center p-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Acceso Denegado</h1>
                        <p className="mt-2 text-gray-600">Por favor, inicia sesión para ver tu perfil.</p>
                        <button
                            onClick={() => props.showAuthModal('login')}
                            className="mt-6 bg-[#e52e8d] text-white font-bold py-3 px-8 rounded-full hover:bg-[#c82278] transition-colors"
                        >
                            Iniciar Sesión
                        </button>
                    </div>
                </main>
                <Footer {...props} />
            </div>
        );
    }
    
    const giftCoupons = [
        { code: 'HOLADUERMEKB10', description: 'S/ 10 de dscto. en Melatonina Adultos', productSlug: 'gomitas-para-dormir', used: profile.gift_coupon_1_used },
        { code: 'HOLAKETOCAPS10', description: 'S/ 10 de dscto. en Cápsulas Keto Burner', productSlug: 'caps-keto', used: profile.gift_coupon_2_used }, // TODO: Update slug when product is added
        { code: 'HOLAKETOCAPS15', description: 'S/ 15 de dscto. en Cápsulas Keto Burner', productSlug: 'caps-keto', used: profile.gift_coupon_3_used }, // TODO: Update slug when product is added
    ];

    const communities = [
      { name: 'Comunidad #1', link: 'https://chat.whatsapp.com/DU2D7mLnUeZL5GKoiG00AU?mode=ems_copy_t' },
      { name: 'Comunidad #2', link: 'https://chat.whatsapp.com/GYJeycZAYH2D6lYTLqMZLH?mode=ems_wa_t' },
      { name: 'Comunidad #3', link: 'https://chat.whatsapp.com/BKm3JP1aPcWHRbda23MYJ3?mode=ems_wa_t' },
    ];

    return (
        <div className="bg-slate-50 min-h-screen">
            <Header {...props} onCartClick={() => {}} />
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="max-w-4xl mx-auto space-y-10">
                    <div className="text-center">
                        <h1 className="text-4xl font-black text-gray-800 tracking-tight">¡Bienvenido, {profile.full_name.split(' ')[0]}!</h1>
                        <p className="mt-2 text-lg text-gray-600">Este es tu panel personal. Aquí tienes tus regalos y beneficios.</p>
                    </div>

                    {/* User Info & Discount Section */}
                    <div className="space-y-6">
                        <h2 className="text-xl font-bold text-gray-800 border-b pb-2">Tu Cuenta</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InfoCard icon={<UserIcon className="w-6 h-6 text-gray-600" />} title="Nombre Completo" subtitle={profile.full_name} />
                            <InfoCard icon={<AtSymbolIcon className="w-6 h-6 text-gray-600" />} title="Correo Electrónico" subtitle={profile.email} />
                            <InfoCard icon={<ChatIcon className="w-6 h-6 text-gray-600" />} title="Celular" subtitle={profile.phone} />
                        </div>
                    </div>

                    {/* Gift Coupons Section */}
                    <div className="space-y-6">
                        <h2 className="text-xl font-bold text-gray-800 border-b pb-2">Tus Cupones de Regalo</h2>
                        <div className="space-y-3">
                            {giftCoupons.map(coupon => (
                                <GiftCouponCard
                                    key={coupon.code}
                                    code={coupon.code}
                                    description={coupon.description}
                                    used={coupon.used}
                                    onProductClick={onProductClick}
                                    productSlug={coupon.productSlug}
                                />
                            ))}
                        </div>
                    </div>


                    {/* WhatsApp Communities */}
                    <div className="space-y-6">
                        <h2 className="text-xl font-bold text-gray-800 border-b pb-2">Asesorías Gratuitas</h2>
                        <p className="text-center text-gray-600 max-w-2xl mx-auto text-sm">
                           PARA INGRESAR A LAS ASESORÍAS PRIMERO ÚNETE A UNA DE LAS COMUNIDADES DE WHATSAPP AQUÍ DEBAJO: LOS DÍAS MIERCOLES Y JUEVES SE ENVÍA EL ENLACE DE GOOGLE MEET PARA QUE TE PUEDAS UNIR.
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {communities.map((community) => (
                                <CommunityCard key={community.name} name={community.name} link={community.link} />
                            ))}
                        </div>
                    </div>

                    {/* Gifts */}
                    <div className="space-y-6">
                        <h2 className="text-xl font-bold text-gray-800 border-b pb-2">Tus Regalos Exclusivos</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <ResourceCard
                                icon={<GiftIcon className="w-7 h-7"/>}
                                title="Guía de Consejos Nutricionales"
                                description="Aprende los mejores tips y trucos para maximizar tus resultados con las cápsulas Keto Burner y mantener un estilo de vida saludable."
                                buttonText="Obtener Guía"
                                downloadLink="https://uylwgmvnlnnkkvjqirhx.supabase.co/storage/v1/object/public/products/regalos/GUIA%20CONSEJOS%20NUTRICIONALES%20KB.pdf"
                            />
                            <ResourceCard
                                icon={<GiftIcon className="w-7 h-7"/>}
                                title="Recetario Fitness Keto Burner"
                                description="Deliciosas y fáciles recetas para complementar tu plan de pérdida de peso, diseñadas para ser compatibles con tu tratamiento."
                                buttonText="Obtener Recetario"
                                downloadLink="https://uylwgmvnlnnkkvjqirhx.supabase.co/storage/v1/object/public/products/regalos/COCINA%20FIT%20CON%20REVOREITOR-%20RECETARIO%20SALUDABLE.pdf"
                            />
                            <ResourceCard
                                icon={<GiftIcon className="w-7 h-7"/>}
                                title="Guía de Uso (Cápsulas y Gotas)"
                                description="Asegúrate de tomar tus suplementos de la manera correcta. Descarga la guía completa para un uso óptimo y seguro."
                                buttonText="Descargar Guía de Uso"
                                downloadLink="https://uylwgmvnlnnkkvjqirhx.supabase.co/storage/v1/object/public/products/regalos/GUIA%20DE%20USO%20KB.pdf"
                            />
                        </div>
                    </div>

                </div>
            </main>
            <Footer {...props} />
        </div>
    );
};

export default ProfilePage;
