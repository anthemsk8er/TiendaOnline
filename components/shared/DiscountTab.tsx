import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { XMarkIcon, CheckIcon, ClipboardIcon, UserIcon, ChatIcon } from '../product_detail_page/Icons';

// Moved ModalOverlay outside the main component to prevent re-creation on re-renders.
// This fixes the input focus loss issue.
const ModalOverlay = ({ onClose, children }: { onClose: () => void; children: React.ReactNode }) => (
    <div
        className={`fixed inset-0 bg-black z-50 transition-opacity modal-enter-active bg-opacity-60 flex items-center justify-center p-4`}
        onClick={onClose}
        role="dialog"
        aria-modal="true"
    >
        {children}
    </div>
);

const DiscountTab = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [step, setStep] = useState<'form' | 'loading' | 'success'>('form');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');
    const [generatedCode, setGeneratedCode] = useState('');
    const [isCopied, setIsCopied] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !phone.trim()) {
            setError('Por favor, completa todos los campos.');
            return;
        }
        // Basic phone validation for Peru (9 digits)
        if (!/^\d{9}$/.test(phone.trim())) {
            setError('Por favor, ingresa un número de celular válido de 9 dígitos.');
            return;
        }
        setError('');
        setStep('loading');

        if (!supabase) {
            setError('No se pudo conectar a la base de datos.');
            setStep('form');
            return;
        }

        const hardcodedDiscountId = '3030add2-d958-4d4b-afb8-7a6379aaecf4';
        const hardcodedDiscountCode = 'KB10';

        const { error: leadError } = await supabase
            .from('leads')
            .insert([{
                full_name: name,
                phone: phone,
                discount_code_id: hardcodedDiscountId
            }] as any);
        
        if (leadError) {
            setError(`Error al guardar tus datos: ${leadError.message}`);
            setStep('form');
            return;
        }

        setGeneratedCode(hardcodedDiscountCode);
        setStep('success');
    };
    
    const handleCopy = () => {
        navigator.clipboard.writeText(generatedCode);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2500);
    };
    
    const resetAndClose = () => {
        setIsOpen(false);
        // Delay reset to allow for closing animation
        setTimeout(() => {
            setStep('form');
            setName('');
            setPhone('');
            setError('');
            setGeneratedCode('');
        }, 300);
    };

    const inputClass = "w-full pl-10 pr-4 py-3 bg-slate-100 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-colors";

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="discount-tab-button bg-amber-400 text-blue font-bold text-xs tracking-wider uppercase py-2 px-4 rounded-b-lg shadow-lg hover:bg-amber-600 transition-colors"
            >
                Obtén 10% de dcto!
            </button>
            
            {isOpen && (
                <ModalOverlay onClose={resetAndClose}>
                    <div
                        className={`bg-white rounded-xl shadow-2xl w-full max-w-md p-8 relative transform transition-all modal-content-enter-active`}
                        onClick={e => e.stopPropagation()}
                    >
                         <button onClick={resetAndClose} className="absolute top-4 right-4 p-1 rounded-full text-gray-500 hover:bg-gray-100" aria-label="Cerrar modal">
                            <XMarkIcon className="w-6 h-6" />
                        </button>
                        
                        {step === 'form' && (
                            <>
                                <div className="text-center">
                                    <h2 className="text-2xl font-bold text-gray-900">¡Bienvenido a KetoShop!</h2>
                                    <p className="text-gray-500 mt-2">Ingresa tus datos y obtén un <strong className="text-pink-600">10% de descuento</strong> en tu primera compra.</p>
                                </div>
                                <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                                    <div>
                                        <label htmlFor="lead-name" className="sr-only">Nombre Completo</label>
                                        <div className="relative"><span className="absolute inset-y-0 left-0 flex items-center pl-3"><UserIcon className="w-5 h-5 text-gray-400" /></span><input type="text" id="lead-name" value={name} onChange={e => setName(e.target.value)} placeholder="Nombre Completo" required className={inputClass} /></div>
                                    </div>
                                    <div>
                                        <label htmlFor="lead-phone" className="sr-only">WhatsApp</label>
                                        <div className="relative"><span className="absolute inset-y-0 left-0 flex items-center pl-3"><ChatIcon className="w-5 h-5 text-gray-400" /></span><input type="tel" id="lead-phone" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Número de WhatsApp" required className={inputClass} /></div>
                                    </div>
                                    {error && <p className="text-red-400 text-sm text-center">{error}</p>}
                                    <button type="submit" className="w-full bg-[#e52e8d] text-white font-bold py-3 px-6 rounded-full hover:bg-[#c82278] transition-colors text-base shadow-lg">Obtener mi Descuento</button>
                                </form>
                            </>
                        )}

                        {step === 'loading' && (
                            <div className="text-center py-10">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto"></div>
                                <p className="mt-4 font-semibold text-gray-700">Guardando tus datos...</p>
                            </div>
                        )}

                        {step === 'success' && (
                            <div className="text-center py-4">
                                <h2 className="text-2xl font-bold text-gray-900">¡Felicidades, {name.split(' ')[0]}!</h2>
                                <p className="text-gray-500 mt-2">Aquí tienes tu código de descuento:</p>
                                
                                <div className="my-6 p-4 bg-pink-50 border-2 border-dashed border-pink-200 rounded-lg">
                                    <p className="text-3xl font-extrabold tracking-widest text-pink-600">{generatedCode}</p>
                                </div>

                                <div className="flex gap-2 justify-center">
                                    <button onClick={handleCopy} className="flex-1 bg-gray-800 text-white font-bold py-3 px-6 rounded-full hover:bg-black transition-colors flex items-center justify-center gap-2">
                                        {isCopied ? <CheckIcon className="w-5 h-5"/> : <ClipboardIcon className="w-5 h-5" />}
                                        {isCopied ? '¡Copiado!' : 'Copiar Código'}
                                    </button>
                                </div>
                                <button onClick={resetAndClose} className="mt-4 w-full text-gray-600 font-semibold py-2 px-6 rounded-full hover:bg-gray-100 transition-colors">
                                    Seguir en la página
                                </button>
                            </div>
                        )}
                    </div>
                </ModalOverlay>
            )}
        </>
    );
};

export default DiscountTab;