import React from 'react';
import { TruckIcon } from '../product_detail_page/Icons';

const ShippingGuaranteeSection: React.FC = () => {
  return (
    <section className="bg-white py-12 lg:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-50/80 p-6 rounded-xl border border-gray-200/80 flex flex-col md:flex-row justify-around items-center text-center gap-y-6 md:gap-x-8">
          
          <div className="flex items-center gap-4">
            <TruckIcon className="w-9 h-9 text-gray-500 shrink-0" strokeWidth={1.5}/>
            <div>
              <p className="font-bold text-lg text-gray-800">24 horas</p>
              <p className="text-sm text-gray-600">Realizamos el envío</p>
            </div>
          </div>

          <div className="w-full md:w-px h-px md:h-12 bg-gray-200"></div>

          <div className="flex items-center gap-4">
            <TruckIcon className="w-9 h-9 text-gray-500 shrink-0" strokeWidth={1.5}/>
            <div>
              <p className="font-bold text-lg text-gray-800">24 a 48 horas</p>
              <p className="text-sm text-gray-600">Entregamos tu pedido</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ShippingGuaranteeSection;