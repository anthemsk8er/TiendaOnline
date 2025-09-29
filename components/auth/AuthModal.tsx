import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { XMarkIcon } from '../product_detail_page/Icons';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

interface AuthModalProps {
  view: 'login' | 'register';
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ view, onClose }) => {
  const [currentView, setCurrentView] = useState(view);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleAuthAction = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!executeRecaptcha) {
        setError('reCAPTCHA no está listo. Intenta de nuevo.');
        return;
    }

    setLoading(true);
    setError(null);
    setMessage(null);

    try {
        const recaptchaToken = await executeRecaptcha('authAction');

        // Step 1: Verify reCAPTCHA token with our Netlify function
        const recaptchaResponse = await fetch('/.netlify/functions/verify-recaptcha', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ recaptchaToken }),
        });
        const recaptchaData = await recaptchaResponse.json();

        if (!recaptchaResponse.ok || !recaptchaData.success) {
            throw new Error(recaptchaData.message || 'La verificación de reCAPTCHA falló.');
        }

        // Step 2: Proceed with Supabase Auth if reCAPTCHA is valid
        if (currentView === 'login') {
            const { error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) throw error;
            onClose();
        } else { // Register
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: { full_name: fullName },
                },
            });
            if (error) throw error;
            setMessage('¡Registro exitoso! Revisa tu correo para confirmar tu cuenta.');
            setTimeout(() => {
              onClose();
            }, 3000)
        }
    } catch (err: any) {
        setError(err.message);
    } finally {
        setLoading(false);
    }
  };

  const inputClass = "w-full px-4 py-3 bg-slate-100 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-colors";

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-md p-8 relative transform transition-all"
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 p-1 rounded-full text-gray-500 hover:bg-gray-100" aria-label="Cerrar modal">
          <XMarkIcon className="w-6 h-6" />
        </button>

        <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">
                {currentView === 'login' ? 'Bienvenido de vuelta' : 'Crea tu cuenta'}
            </h2>
            <p className="text-gray-500 mt-2">
                {currentView === 'login' 
                    ? 'Ingresa tus credenciales para continuar.' 
                    : 'Es rápido y fácil.'
                }
            </p>
        </div>

        <form onSubmit={handleAuthAction} className="mt-8 space-y-4">
          {currentView === 'register' && (
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
              <input type="text" id="fullName" value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Tu nombre" required className={inputClass} />
            </div>
          )}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
            <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="tu@email.com" required className={inputClass} />
          </div>
          <div>
            <label htmlFor="password"className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
            <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required className={inputClass} />
          </div>
          
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          {message && <p className="text-green-600 text-sm text-center">{message}</p>}

          <button
            type="submit"
            disabled={loading || !executeRecaptcha}
            className="w-full bg-[#e52e8d] text-white font-bold py-3 px-6 rounded-full hover:bg-[#c82278] transition-colors flex items-center justify-center text-base shadow-lg disabled:opacity-50"
          >
            {loading ? 'Cargando...' : (currentView === 'login' ? 'Ingresar' : 'Registrarse')}
          </button>
        </form>

        <div className="text-center mt-6">
            <button 
                onClick={() => setCurrentView(currentView === 'login' ? 'register' : 'login')}
                className="text-sm font-medium text-pink-600 hover:text-pink-500"
            >
                {currentView === 'login' ? '¿No tienes una cuenta? Regístrate' : '¿Ya tienes una cuenta? Ingresa'}
            </button>
        </div>
        <p className="text-xs text-gray-400 text-center mt-4">
            Este sitio está protegido por reCAPTCHA y se aplican la <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className="underline">Política de Privacidad</a> y los <a href="https://policies.google.com/terms" target="_blank" rel="noreferrer" className="underline">Términos de Servicio</a> de Google.
        </p>
      </div>
    </div>
  );
};

export default AuthModal;