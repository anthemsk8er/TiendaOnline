import React from 'react';
import { TruckIcon, PackageIcon, ShieldIcon } from './Icons';

const ShippingDetails: React.FC = () => {
    const details = [
        { 
            icon: <TruckIcon className="w-6 h-6 text-teal-600 flex-shrink-0 mt-0.5" strokeWidth={1.5} />,
            text: <><strong className="font-bold text-gray-800">Envío Gratis</strong> • En pedidos mayores a 60 soles.</>
        },
        { 
            icon: <PackageIcon className="w-6 h-6 text-teal-600 flex-shrink-0 mt-0.5" strokeWidth={1.5} />,
            text: <><strong className="font-bold text-gray-800">Enviado por nosotros.</strong> Lima (1 a 3 días) - Provincias (3 a 7 días)</>
        },
        { 
            icon: <ShieldIcon className="w-6 h-6 text-teal-600 flex-shrink-0 mt-0.5" strokeWidth={1.5} />,
            text: <><strong className="font-bold text-gray-800">Compra Segura.</strong> Todos nuestros productos cuentan con garantía</>
        }
    ];

    return (
        <div className="border border-gray-200 rounded-xl p-4 bg-white shadow-sm space-y-3">
            {details.map((detail, index) => (
                <div key={index} className="flex items-start gap-3">
                    {detail.icon}
                    <p className="text-sm text-gray-600 leading-snug">
                        {detail.text}
                    </p>
                </div>
            ))}
        </div>
    );
};
export default ShippingDetails;