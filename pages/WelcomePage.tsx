import React, { useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import type { Profile, CartItem, Product } from '../types';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { supabase } from '../lib/supabaseClient';
import { UserIcon, AtSymbolIcon, LockClosedIcon, ChatIcon } from '../components/product_detail_page/Icons';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

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
    const { onProfileClick } = props;
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const { executeRecaptcha } = useGoogleReCaptcha();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!executeRecaptcha) {
            setError("reCAPTCHA no está listo. Por favor, espera un momento y vuelve a intentarlo.");
            return;
        }

        const trimmedFullName = fullName.trim();
        const trimmedPhone = phone.trim();
        const trimmedEmail = email.trim();
        const trimmedPassword = password.trim();

        if (!trimmedFullName || !trimmedPhone || !trimmedEmail || !trimmedPassword) {
            setError('Por favor, completa todos los campos.');
            return;
        }
        if (!/^\d{9}$/.test(trimmedPhone)) {
            setError('Por favor, ingresa un número de celular válido de 9 dígitos.');
            return;
        }
        if (trimmedPassword.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres.');
            return;
        }

        setLoading(true);
        setError(null);
        setMessage(null);

        try {
            const recaptchaToken = await executeRecaptcha('signup');

            const { data, error: signUpError } = await supabase.auth.signUp({
                email: trimmedEmail,
                password: trimmedPassword,
                options: {
                    captchaToken: recaptchaToken,
                    data: {
                        full_name: trimmedFullName,
                        phone: trimmedPhone,
                    },
                },
            });

            if (signUpError) {
                if (signUpError.message.includes("User already registered")) {
                    throw new Error("Este correo electrónico ya está registrado. Por favor, inicia sesión.");
                }
                 if (signUpError.message.includes("To many requests")) {
                    throw new Error("Demasiados intentos. Por favor, espera un momento.");
                }
                // Supabase might return a generic "invalid email" for various reasons including failed reCAPTCHA or email provider issues
                if (signUpError.message.toLowerCase().includes('invalid format')) {
                    throw new Error(`La dirección de correo "${trimmedEmail}" no es válida.`);
                }
                throw signUpError;
            }

            if (data.user) {
                // If email confirmation is enabled, the user object will exist but session will be null.
                const successMessage = data.session 
                    ? '¡Registro exitoso! Serás redirigido a tu perfil...' 
                    : '¡Registro exitoso! Revisa tu correo para confirmar tu cuenta.';
                
                setMessage(successMessage);

                if(data.session && onProfileClick) {
                    setTimeout(() => {
                        onProfileClick();
                    }, 2000);
                }
            } else {
                 throw new Error('No se pudo crear el usuario. Por favor, revisa tus datos e intenta de nuevo.');
            }

        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const inputClass = "w-full pl-10 pr-4 py-3 bg-slate-100 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-colors";

    return (
        <div className="bg-slate-50 min-h-screen flex flex-col">
            <Header {...props} onCartClick={() => {}} />
            <main className="flex-grow flex items-center justify-center py-12 px-4">
                <div className="w-full max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-gray-800">Crea tu Cuenta y Obtén Beneficios</h1>
                        <p className="mt-2 text-gray-600">Únete a nuestra comunidad para acceder a regalos y sorpresas únicas.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                        <div>
                            <label htmlFor="fullName" className="sr-only">Nombre Completo</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3"><UserIcon className="w-5 h-5 text-gray-400"/></span>
                                <input type="text" id="fullName" value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Nombre Completo" required className={inputClass} />
                            </div>
                        </div>
                         <div>
                            <label htmlFor="email" className="sr-only">Correo Electrónico</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3"><AtSymbolIcon className="w-5 h-5 text-gray-400"/></span>
                                <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Correo Electrónico" required className={inputClass} />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Contraseña</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3"><LockClosedIcon className="w-5 h-5 text-gray-400"/></span>
                                <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Contraseña" required className={inputClass} />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="phone" className="sr-only">Celular (WhatsApp)</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3"><ChatIcon className="w-5 h-5 text-gray-400"/></span>
                                <input type="tel" id="phone" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Celular (WhatsApp)" required className={inputClass} />
                            </div>
                            <p className="text-xs text-gray-500 mt-1 pl-1">De preferencia, el mismo que usas para tus compras.</p>
                        </div>
                       
                        {error && <p className="text-red-500 text-sm text-center bg-red-50 p-3 rounded-md">{error}</p>}
                        {message && <p className="text-green-600 text-sm text-center bg-green-50 p-3 rounded-md">{message}</p>}

                        <button
                            type="submit"
                            disabled={loading || !executeRecaptcha}
                            className="w-full bg-[#e52e8d] text-white font-bold py-3 px-6 rounded-full hover:bg-[#c82278] transition-colors flex items-center justify-center text-base shadow-lg disabled:opacity-50"
                        >
                            {loading ? 'Registrando...' : 'Registrarme y Obtener Regalos'}
                        </button>
                    </form>
                </div>
            </main>
            <Footer {...props} />
        </div>
    );
};

export default WelcomePage;