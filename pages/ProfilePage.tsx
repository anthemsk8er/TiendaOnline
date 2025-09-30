import React, { useState, useEffect } from 'react';
import type { Session } from '@supabase/supabase-js';
import type { Profile, CartItem, Product } from '../types';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { UserIcon, AtSymbolIcon, ChatIcon, GiftIcon, DownloadIcon, WhatsAppIcon, ClipboardIcon, CheckIcon } from '../components/product_detail_page/Icons';

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
    // FIX: Add cartItemCount to props to correctly display cart item number in header
    cartItemCount: number;
    onAddToCart: (product: Product, quantity: number) => void;
    onUpdateCartQuantity: (productId: string, quantity: number, newUnitPrice?: number) => void;
    onRemoveFromCart: (productId: string) => void;
    session: Session | null;
    profile: Profile | null;
    onLogout: () => void;
    showAuthModal: (view: 'login' | 'register') => void;
}

const InfoItem = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string | null | undefined }) => (
    <div className="flex items-center gap-4">
        <div className="bg-slate-100 p-3 rounded-full">{icon}</div>
        <div>
            <p className="text-sm text-gray-500">{label}</p>
            <p className="font-semibold text-gray-800">{value || 'No disponible'}</p>
        </div>
    </div>
);

const GiftCard = ({ icon, title, description, buttonText, downloadLink }: { icon: React.ReactNode, title: string, description: string, buttonText: string, downloadLink: string }) => (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 flex flex-col items-start hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
        <div className="bg-[#e52e8d]/10 text-[#e52e8d] p-3 rounded-full mb-4">
            {icon}
        </div>
        <h3 className="text-lg font-bold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-600 mt-2 mb-4 flex-grow">{description}</p>
        <a href={downloadLink} target="_blank" rel="noopener noreferrer" className="w-full mt-auto bg-gray-800 text-white font-bold py-3 px-4 rounded-lg hover:bg-black transition-colors flex items-center justify-center gap-2 text-sm">
            <DownloadIcon className="w-5 h-5" />
            <span>{buttonText}</span>
        </a>
    </div>
);

const ProfilePage: React.FC<ProfilePageProps> = (props) => {
    const { session, profile } = props;
    const [isCopied, setIsCopied] = useState(false);

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
    
    const discountCode = 'HOLAKB20';
    
    const handleCopy = () => {
        navigator.clipboard.writeText(discountCode);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2500);
    };

    const communities = [
      { name: 'Comunidad 1', link: 'https://chat.whatsapp.com/invite/123' },
      { name: 'Comunidad 2', link: 'https://chat.whatsapp.com/invite/456' },
      { name: 'Comunidad 3', link: 'https://chat.whatsapp.com/invite/789' },
    ];

    return (
        <div className="bg-slate-50 min-h-screen">
            <Header {...props} onCartClick={() => {}} />
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="max-w-4xl mx-auto space-y-8">
                    <div className="text-center">
                        <h1 className="text-4xl font-black text-gray-800 tracking-tight">¡Bienvenido, {profile.full_name.split(' ')[0]}!</h1>
                        <p className="mt-2 text-lg text-gray-600">Este es tu panel personal. Aquí tienes tus regalos y beneficios.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* User Info */}
                        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 space-y-4">
                            <h2 className="text-xl font-bold text-gray-800">Tus Datos</h2>
                            <InfoItem icon={<UserIcon className="w-6 h-6 text-gray-600" />} label="Nombre Completo" value={profile.full_name} />
                            <InfoItem icon={<AtSymbolIcon className="w-6 h-6 text-gray-600" />} label="Correo Electrónico" value={profile.email} />
                            <InfoItem icon={<ChatIcon className="w-6 h-6 text-gray-600" />} label="Celular" value={profile.phone} />
                        </div>
                        
                        {/* Discount Code */}
                        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 flex flex-col justify-center items-center text-center">
                             <h2 className="text-xl font-bold text-gray-800">Tu Cupón de Bienvenida</h2>
                             <p className="text-sm text-gray-500 mt-1 mb-3">20 soles de dscto. en tu recompra de Cápsulas Keto Burner.</p>
                             <div className="my-2 p-3 bg-pink-50 border-2 border-dashed border-pink-200 rounded-lg w-full">
                                <p className="text-3xl font-extrabold tracking-widest text-pink-600">{discountCode}</p>
                            </div>
                            <button onClick={handleCopy} className="w-full mt-3 bg-gray-800 text-white font-bold py-3 px-6 rounded-lg hover:bg-black transition-colors flex items-center justify-center gap-2">
                                {isCopied ? <CheckIcon className="w-5 h-5"/> : <ClipboardIcon className="w-5 h-5" />}
                                {isCopied ? '¡Copiado!' : 'Copiar Código'}
                            </button>
                        </div>
                    </div>

                    {/* WhatsApp Communities */}
                    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
                        <h2 className="text-xl font-bold text-gray-800 text-center">Asesorías Gratuitas</h2>
                        <p className="text-center text-gray-600 mt-2 max-w-2xl mx-auto">
                           PARA INGRESAR A LAS ASESORÍAS PRIMERO ÚNETE A UNA DE LAS COMUNIDADES DE WHATSAPP AQUÍ DEBAJO: LOS DÍAS MIERCOLES Y JUEVES SE ENVÍA EL ENLACE DE GOOGLE MEET PARA QUE TE PUEDAS UNIR.
                        </p>
                        <div className="mt-6 flex flex-wrap justify-center gap-3">
                            {communities.map((community) => (
                                <a key={community.name} href={community.link} target="_blank" rel="noopener noreferrer" className="bg-green-500 text-white font-bold py-3 px-5 rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2">
                                    <WhatsAppIcon className="w-5 h-5" />
                                    <span>{community.name}</span>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Gifts */}
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Tus Regalos Exclusivos</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <GiftCard
                                icon={<GiftIcon className="w-8 h-8"/>}
                                title="Guía de Consejos Nutricionales"
                                description="Aprende los mejores tips y trucos para maximizar tus resultados con las cápsulas Keto Burner y mantener un estilo de vida saludable."
                                buttonText="Obtener Guía"
                                downloadLink="#"
                            />
                            <GiftCard
                                icon={<GiftIcon className="w-8 h-8"/>}
                                title="Recetario Fitness Keto Burner"
                                description="Deliciosas y fáciles recetas para complementar tu plan de pérdida de peso, diseñadas para ser compatibles con tu tratamiento."
                                buttonText="Obtener Recetario"
                                downloadLink="#"
                            />
                            <GiftCard
                                icon={<GiftIcon className="w-8 h-8"/>}
                                title="Guía de Uso (Cápsulas y Gotas)"
                                description="Asegúrate de tomar tus suplementos de la manera correcta. Descarga la guía completa para un uso óptimo y seguro."
                                buttonText="Descargar Guía de Uso"
                                downloadLink="#"
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