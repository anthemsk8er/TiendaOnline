import React, { useState, useEffect } from 'react';
import { getNextWhatsAppContact, generateWhatsAppUrl } from '../../lib/whatsappUtils';

interface WhatsAppButtonProps {
  message: string;
  className?: string;
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ message, className = 'bottom-3 right-5' }) => {
  const [showMessage, setShowMessage] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState('');

  useEffect(() => {
    // Generar URL de WhatsApp con contacto alternante
    const contact = getNextWhatsAppContact();
    const url = generateWhatsAppUrl(contact, message);
    setWhatsappUrl(url);

    // Show the message after a 2-second delay
    const showTimer = setTimeout(() => {
      setShowMessage(true);
    }, 2000);

    // Hide the message after it has been visible for 10 seconds (total 12 seconds from mount)
    const hideTimer = setTimeout(() => {
      setShowMessage(false);
    }, 12000);

    // Cleanup timers on component unmount
    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [message]); // Run when message changes

  return (
    <div className={`fixed z-30 flex items-center group ${className}`}>
      {/* Message Bubble */}
      <div
        className={`
          bg-white text-gray-800 text-xs font-semibold px-3 py-1.5 rounded-l-full rounded-r-full
          shadow-md mr-3 whitespace-nowrap transition-all duration-500 ease-in-out
          flex items-center
          ${showMessage ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'}
        `}
        aria-hidden={!showMessage}
      >
        <span className="w-2 h-2 bg-green-500 rounded-full mr-1.5 animate-pulse"></span>
        En línea
      </div>

      {/* WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full transition-all duration-300 transform group-hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        aria-label="Contactar por WhatsApp"
      >
        <img
            src="https://uylwgmvnlnnkkvjqirhx.supabase.co/storage/v1/object/public/products/whatsapp-icon-chat/boton-whatsapp.svg"
            alt="Contactar por WhatsApp"
            className="w-50 h-14"
        />
      </a>
    </div>
  );
};

export default WhatsAppButton;
