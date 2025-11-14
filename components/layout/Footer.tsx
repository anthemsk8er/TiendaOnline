import React from 'react';
import { ShoppingBagIcon, ShippingBoxIcon, TruckIcon, PackageIcon, MinusCircleIcon, CheckCircleIcon } from '../product_detail_page/Icons';

interface FooterProps {
  onLegalClick: () => void;
  onCatalogClick: (category: string) => void;
  onHomeClick: () => void;
  onContactFaqClick: () => void;
}

const Footer: React.FC<FooterProps> = ({ onLegalClick, onCatalogClick, onHomeClick, onContactFaqClick }) => {
  
  const paymentMethods = [
    { name: 'Yape', logoUrl: 'https://uylwgmvnlnnkkvjqirhx.supabase.co/storage/v1/object/public/products/img/payment-methods/yape.png' },
    { name: 'Plin', logoUrl: 'https://uylwgmvnlnnkkvjqirhx.supabase.co/storage/v1/object/public/products/img/payment-methods/plin.png' },
    { name: 'Mastercard', logoUrl: 'https://uylwgmvnlnnkkvjqirhx.supabase.co/storage/v1/object/public/products/img/payment-methods/mastercard.png' },
    { name: 'Visa', logoUrl: 'https://uylwgmvnlnnkkvjqirhx.supabase.co/storage/v1/object/public/products/img/payment-methods/visa.png' },
    { name: 'P.O.S', logoUrl: 'https://uylwgmvnlnnkkvjqirhx.supabase.co/storage/v1/object/public/products/img/payment-methods/pos.png' },
    { name: 'Efectivo', logoUrl: 'https://uylwgmvnlnnkkvjqirhx.supabase.co/storage/v1/object/public/products/img/payment-methods/efectivo.png' },
  ];

  const deliveryTimeline = [
    { icon: <ShoppingBagIcon className="w-8 h-8 text-white"/>, title: '30 minutos', text: 'Confirmamos tu Pedido' },
    { icon: <ShippingBoxIcon className="w-8 h-8 text-white"/>, title: '24 horas', text: 'Realizamos el Envío' },
    { icon: <TruckIcon className="w-8 h-8 text-white"/>, title: '24 a 48 horas', text: 'Entregamos tu Pedido' },
  ];

  const guaranteeItems = [
    { icon: <PackageIcon className="w-7 h-7 text-sky-300 flex-shrink-0"/>, text: <><strong className="font-semibold text-white">Envío Gratis</strong> • En pedidos mayores a 60 soles.</> },
    { icon: <TruckIcon className="w-7 h-7 text-sky-300 flex-shrink-0"/>, text: <><strong className="font-semibold text-white">Enviado por nosotros.</strong> Lima (1 a 3 días) - Provincias (3 a 7 días)</> },
    { icon: <CheckCircleIcon className="w-7 h-7 text-sky-300 flex-shrink-0"/>, text: <><strong className="font-semibold text-white">Compra Segura.</strong> Todos nuestros productos cuentan con garantía</> },
  ];

  return (
    <footer className="bg-[#2952a3] border-t mt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <a href="#" onClick={(e) => { e.preventDefault(); onHomeClick(); }} aria-label="Back to homepage">
              <img src="https://uylwgmvnlnnkkvjqirhx.supabase.co/storage/v1/object/public/products/img/header/LOGO%20KB%20SUPPLEMENTS%20WHITE%20-%20VERTICAL.svg" alt="KetoNatural Shop Logo" className="h-16 w-auto brightness-0 invert" />
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
        




        <div className="mt-12 pt-8 border-t border-blue-800 text-center text-xs text-gray-300">
          <p>&copy; {new Date().getFullYear()} Keto Burner KetoNatural Shop -  Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;