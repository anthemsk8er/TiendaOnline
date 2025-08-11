import React from 'react';
import { ShieldCheckIcon, TruckIcon, StarIcon } from '../product_detail_page/Icons';

const ShippingGuaranteeSection: React.FC = () => {

  const paymentMethods = [
    { name: 'Yape', logoUrl: 'https://uylwgmvnlnnkkvjqirhx.supabase.co/storage/v1/object/public/products/logos/yape.jpg' },
    { name: 'Plin', logoUrl: 'https://uylwgmvnlnnkkvjqirhx.supabase.co/storage/v1/object/public/products/logos/plin.jpg' },
    { name: 'Visa', logoUrl: 'https://uylwgmvnlnnkkvjqirhx.supabase.co/storage/v1/object/public/products/logos/visa.jpg' },
    { name: 'Mastercard', logoUrl: 'https://uylwgmvnlnnkkvjqirhx.supabase.co/storage/v1/object/public/products/logos/mastercard.jpg' }
  ];

  const couriers = [
      { name: 'Olva', logoUrl: 'https://uylwgmvnlnnkkvjqirhx.supabase.co/storage/v1/object/public/products/logos/olva.jpg' },
      { name: 'Shalom', logoUrl: 'https://uylwgmvnlnnkkvjqirhx.supabase.co/storage/v1/object/public/products/logos/shalom.jpg' }
  ]

  return (
    <section className="bg-gray-50 py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* Column 1: Shipping and Payments */}
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
            <div className="flex items-center gap-4">
                <TruckIcon className="w-10 h-10 text-blue-600" strokeWidth={1.5}/>
                <h2 className="text-2xl font-bold text-gray-800">Envíos y Pagos</h2>
            </div>
            <p className="mt-4 text-gray-600">
              Realizamos envíos a todo el Perú de forma rápida y segura. Paga como prefieras, ¡incluyendo contraentrega!
            </p>
            <ul className="mt-6 space-y-4 text-gray-700">
              <li className="flex items-start gap-3">
                <strong className="font-semibold w-28 shrink-0">Pagos:</strong>
                <span>Pagos contraentrega - YAPE/PLIN/TARJETA (POS)</span>
              </li>
              <li className="flex items-start gap-3">
                <strong className="font-semibold w-28 shrink-0">Tiempos:</strong>
                <span>Lima: Entregas en 24 horas.<br/>Provincia: 3 a 4 días.</span>
              </li>
              <li className="flex items-start gap-3">
                <strong className="font-semibold w-28 shrink-0">Couriers:</strong>
                <span>Trabajamos con OLVA COURIER, SHALOM.</span>
              </li>
            </ul>
             <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Aceptamos</h3>
              <div className="flex items-center gap-4 mt-3">
                {paymentMethods.map(method => (
                  <img key={method.name} src={`${method.logoUrl}?width=80&quality=75`} alt={method.name} title={method.name} className="h-12 object-contain" width="80" height="48" loading="lazy" />
                ))}
              </div>
            </div>
             <div className="mt-6">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Nuestros Aliados de Envío</h3>
              <div className="flex items-center gap-6 mt-3">
                {couriers.map(courier => (
                  <img key={courier.name} src={`${courier.logoUrl}?width=80&quality=75`} alt={courier.name} title={courier.name} className="h-12 object-contain" width="80" height="48" loading="lazy" />
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: Guarantee and Quality */}
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
            <div className="flex items-center gap-4">
                <ShieldCheckIcon className="w-10 h-10 text-green-600" strokeWidth={1.5}/>
                <h2 className="text-2xl font-bold text-gray-800">Garantía y Calidad</h2>
            </div>
            <p className="mt-4 text-gray-600">
              En KetoShop, tu compra está 100% protegida. Te ofrecemos productos de la más alta calidad para tu bienestar.
            </p>
            <ul className="mt-6 space-y-4 text-gray-700">
                <li className="flex items-start gap-3">
                    <StarIcon className="w-5 h-5 text-amber-500 mt-0.5 shrink-0"/>
                    <span><strong>Producto de grado premium:</strong> Seleccionamos solo los mejores ingredientes para ti.</span>
                </li>
                <li className="flex items-start gap-3">
                    <StarIcon className="w-5 h-5 text-amber-500 mt-0.5 shrink-0"/>
                    <span><strong>Compromiso con la pureza:</strong> Libre de Gluten, OGM y químicos sintéticos.</span>
                </li>
                <li className="flex items-start gap-3">
                    <StarIcon className="w-5 h-5 text-amber-500 mt-0.5 shrink-0"/>
                    <span><strong>Compra segura:</strong> Tu satisfacción y confianza son nuestra prioridad.</span>
                </li>
            </ul>
            <div className="mt-6 pt-6 border-t border-gray-200">
              <img 
                src="https://uylwgmvnlnnkkvjqirhx.supabase.co/storage/v1/object/public/products/img/sections/envios.jpg?width=530&quality=80" 
                alt="Garantía de calidad" 
                className="w-full h-48 object-cover rounded-lg"
                width="530" height="192" loading="lazy"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ShippingGuaranteeSection;