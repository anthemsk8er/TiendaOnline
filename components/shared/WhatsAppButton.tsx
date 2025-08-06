import React, { useState, useEffect } from 'react';
import { WhatsAppIcon } from '../product_detail_page/Icons';

interface WhatsAppButtonProps {
  phoneNumber: string;
  message: string;
  className?: string;
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ phoneNumber, message, className = 'bottom-5 right-5' }) => {
  const [showMessage, setShowMessage] = useState(false);
  const whatsappUrl = `https://wa.me/51${phoneNumber}?text=${encodeURIComponent(message)}`;

  useEffect(() => {
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
  }, []); // Run only once on mount

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
        Online - Tap aquí para mas información
      </div>

      {/* WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#25D366] text-white p-3 rounded-full shadow-lg hover:bg-[#128C7E] transition-all duration-300 transform group-hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        aria-label="Contactar por WhatsApp"
      >
        <WhatsAppIcon className="w-8 h-8" />
      </a>
    </div>
  );
};

export default WhatsAppButton;
