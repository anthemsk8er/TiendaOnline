
import React from 'react';

interface FooterProps {
  onLegalClick: () => void;
  onCatalogClick: (category: string) => void;
  onHomeClick: () => void;
  onContactFaqClick: () => void;
}

const Footer: React.FC<FooterProps> = ({ onLegalClick, onCatalogClick, onHomeClick, onContactFaqClick }) => {
  return (
    <footer className="bg-[#2952a3] border-t mt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <a href="#" onClick={(e) => { e.preventDefault(); onHomeClick(); }} aria-label="Back to homepage">
              <img src="https://uylwgmvnlnnkkvjqirhx.supabase.co/storage/v1/object/public/products/img/header/ketonaturalshop.svg" alt="KetoNatural Shop Logo" className="h-8 w-auto brightness-0 invert" />
            </a>
            <p className="mt-2 text-sm text-gray-200">Suplementos de alta calidad.</p>
          </div>
          <div>
            <h4 className="font-semibold text-white">Comprar</h4>
            <ul className="mt-4 space-y-2 text-sm text-gray-200">
              <li><a href="#" onClick={(e) => { e.preventDefault(); onCatalogClick('Vitaminas'); }} className="hover:text-[#90b8f8]">Vitaminas</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); onCatalogClick('Suplementos'); }} className="hover:text-[#90b8f8]">Suplementos</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); onCatalogClick('Proteínas'); }} className="hover:text-[#90b8f8]">Proteínas</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); onCatalogClick('Packs'); }} className="hover:text-[#90b8f8]">Packs</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white">Ayuda</h4>
            <ul className="mt-4 space-y-2 text-sm text-gray-200">
              <li><a href="#" onClick={(e) => { e.preventDefault(); onContactFaqClick(); }} className="hover:text-[#90b8f8]">Preguntas Frecuentes</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); onLegalClick(); }} className="hover:text-[#90b8f8]">Envíos y Devoluciones</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); onContactFaqClick(); }} className="hover:text-[#90b8f8]">Contacto</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white">Legal</h4>
            <ul className="mt-4 space-y-2 text-sm text-gray-200">
              <li><a href="#" onClick={(e) => { e.preventDefault(); onLegalClick(); }} className="hover:text-[#90b8f8]">Términos y Condiciones</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); onLegalClick(); }} className="hover:text-[#90b8f8]">Política de Privacidad</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-blue-800 text-center text-sm text-gray-300">
          <p>&copy; {new Date().getFullYear()} Keto Burner KetoNatural Shop -  Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;