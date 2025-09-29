import React, { useState, useRef } from 'react';
import type { Session } from '@supabase/supabase-js';
import type { Profile, CartItem, Product } from '../types';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { supabase } from '../lib/supabaseClient';
import { UserIcon, ChatIcon, GiftIcon } from '../components/product_detail_page/Icons';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

const welcomeHeroImage = 'https://uylwgmvnlnnkkvjqirhx.supabase.co/storage/v1/object/public/products/img/index-hero-img/promo_energia_natural.jpg';

interface WelcomePageProps {
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
  onAdminWelcomePageClick?: () => void;
  cartItems: CartItem[];
  onAddToCart: (product: Product, quantity: number) => void;
  onUpdateCartQuantity: (productId: string, quantity: number, newUnitPrice?: number) => void;
  onRemoveFromCart: (productId: string) => void;
  session: Session | null;
  profile: Profile | null;
  onLogout: () => void;
  showAuthModal: (view: 'login' | 'register') => void;
}

const WelcomePage: React.FC<WelcomePageProps> = (props) => {
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isSuccess, setIsSuccess] = useState(false);
    const { executeRecaptcha } = useGoogleReCaptcha();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!fullName.trim() || !phone.trim()) {
            setError('Por favor, completa todos los campos.');
            return;
        }
        if (!/^\d{9}$/.test(phone.trim())) {
            setError('Por favor, ingresa un número de celular válido de 9 dígitos.');
            return;
        }
        if (!executeRecaptcha) {
            setError('reCAPTCHA no está listo, por favor espera un momento.');
            return;
        }
        setError(null);
        setLoading(true);

        try {
            const recaptchaToken = await executeRecaptcha('welcomeForm');
            
            // Step 1: Verify reCAPTCHA token
            const recaptchaResponse = await fetch('/.netlify/functions/verify-recaptcha', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ recaptchaToken }),
            });
            const recaptchaData = await recaptchaResponse.json();

            if (!recaptchaResponse.ok || !recaptchaData.success) {
                throw new Error(recaptchaData.message || 'La verificación de reCAPTCHA falló.');
            }

            // Step 2: Proceed with Supabase insert
            if (!supabase) {
                throw new Error('No se pudo conectar a la base de datos.');
            }

            const hardcodedDiscountId = '3030add2-d958-4d4b-afb8-7a6379aaecf4';
            const { error: insertError } = await supabase
                .from('leads')
                .insert([{
                    full_name: fullName,
                    phone: phone,
                    discount_code_id: hardcodedDiscountId
                }]);
            
            if (insertError) {
                if (insertError.code === '23505') { // Unique violation
                     throw new Error('Este número de teléfono ya ha sido registrado.');
                }
                throw new Error('Hubo un error al registrar tus datos.');
            }

            setIsSuccess(true);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const cartItemCount = props.cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const headerProps = { ...props, onCartClick: () => {}, cartItemCount };
    
    const inputClass = "w-full pl-10 pr-4 py-3 bg-slate-100 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#e52e8d] focus:border-[#e52e8d] outline-none transition-colors";

    return (
        <div className="bg-gray-50">
            <Header {...headerProps} />
            <main>
                <section
                    className="h-64 bg-cover bg-center flex items-center justify-center text-white"
                    style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${welcomeHeroImage})` }}
                >
                    <div className="text-center p-4">
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight animate-fade-in-up">¡Bienvenido a la Familia KetoShop!</h1>
                        <p className="mt-2 text-lg text-gray-200 animate-fade-in-up delay-100">Regístrate y recibe sorpresas exclusivas</p>
                    </div>
                </section>

                <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="max-w-lg mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-200">
                        {isSuccess ? (
                            <div className="text-center py-8 animate-fade-in-up">
                                <GiftIcon className="w-20 h-20 mx-auto text-[#16a085]" strokeWidth={1}/>
                                <h2 className="mt-4 text-3xl font-bold text-gray-800">¡Gracias por registrarte, {fullName.split(' ')[0]}!</h2>
                                <p className="mt-2 text-gray-600">Hemos guardado tus datos. Pronto nos pondremos en contacto contigo a través de WhatsApp para entregarte tus regalos y sorpresas exclusivas. ¡Mantente atento!</p>
                                <button
                                    onClick={() => props.onCatalogClick()}
                                    className="mt-8 bg-[#e52e8d] text-white font-bold py-3 px-8 rounded-full hover:bg-[#c82278] transition-colors"
                                >
                                    Explorar Productos
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className="text-center">
                                    <h2 className="text-2xl font-bold text-gray-800">Obtén tus Regalos</h2>
                                    <p className="mt-2 text-gray-600">Completa el formulario para unirte a nuestra comunidad y acceder a beneficios únicos.</p>
                                </div>
                                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                                    <div>
                                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
                                        <div className="relative">
                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3"><UserIcon className="w-5 h-5 text-gray-400" /></span>
                                            <input type="text" id="fullName" value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Tu nombre y apellido" required className={inputClass} />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Celular (WhatsApp)</label>
                                        <div className="relative">
                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3"><ChatIcon className="w-5 h-5 text-gray-400" /></span>
                                            <input type="tel" id="phone" value={phone} onChange={e => setPhone(e.target.value)} placeholder="987654321" required className={inputClass} />
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1">De preferencia, el que usaste para contactarnos.</p>
                                    </div>
                                    
                                    {error && <p className="text-red-500 text-sm text-center bg-red-50 p-3 rounded-md">{error}</p>}
                                    
                                    <button
                                        type="submit"
                                        disabled={loading || !executeRecaptcha}
                                        className="w-full bg-[#e52e8d] text-white font-bold py-3 px-6 rounded-full hover:bg-[#c82278] transition-colors flex items-center justify-center text-base shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {loading ? (
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                        ) : (
                                            '¡Quiero mis Regalos!'
                                        )}
                                    </button>
                                     <p className="text-xs text-gray-400 text-center">
                                        Este sitio está protegido por reCAPTCHA y se aplican la <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className="underline">Política de Privacidad</a> y los <a href="https://policies.google.com/terms" target="_blank" rel="noreferrer" className="underline">Términos de Servicio</a> de Google.
                                    </p>
                                </form>
                            </>
                        )}
                    </div>
                </section>
            </main>
            <Footer onLegalClick={props.onLegalClick} onCatalogClick={props.onCatalogClick} onHomeClick={props.onHomeClick} onContactFaqClick={props.onContactFaqClick}/>
        </div>
    );
};

export default WelcomePage;