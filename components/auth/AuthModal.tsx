import React, { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { XMarkIcon } from '../product_detail_page/Icons';

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

  const handleAuthAction = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    if (currentView === 'login') {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setError(error.message);
      else onClose();
    } else { // Register
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });
      if (error) {
        setError(error.message);
      } else if (data.user) {
        // With email confirmation disabled in Supabase settings,
        // the user is logged in automatically.
        // The onAuthStateChange listener will handle the session and UI update.
        // We just close the modal for a seamless experience.
        onClose();
      }
    }
    setLoading(false);
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

        <form onSubmit={handleAuthAction} className="mt-8 space-y-6">
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
            disabled={loading}
            className="w-full bg-[#e52e8d] text-white font-bold py-3 px-6 rounded-full hover:bg-[#c82278] transition-colors flex items-center justify-center text-base shadow-lg disabled:opacity-50"
          >
            {loading ? 'Cargando...' : (currentView === 'login' ? 'Ingresar' : 'Registrarse')}
          </button>
        </form>

  
      </div>
    </div>
  );
};

export default AuthModal;