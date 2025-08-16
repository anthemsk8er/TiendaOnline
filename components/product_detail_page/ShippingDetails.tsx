
import React from 'react';
import { ShippingBoxIcon, MinusCircleIcon, ShieldIcon } from './Icons';

const ShippingDetails: React.FC = () => {
    return (
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 my-8 lg:my-12">
            <div className="bg-zinc-50 p-5 rounded-xl grid grid-cols-1 gap-y-4 md:grid-cols-3 md:gap-x-8 md:gap-y-0 text-zinc-600 text-sm">
                <div className="flex items-center gap-3">
                    <ShippingBoxIcon className="w-7 h-7 text-zinc-400 flex-shrink-0"/>
                    <p><strong className="text-zinc-800">Envío Gratis</strong> • En pedidos mayores a 40 soles.</p>
                </div>
                <div className="flex items-center gap-3">
                    <MinusCircleIcon className="w-7 h-7 text-zinc-400 flex-shrink-0"/>
                    <p><strong className="text-zinc-800">Enviado desde Lima</strong> (1 a 3 días) - Provincias (3 a 7 días)</p>
                </div>
                <div className="flex items-center gap-3">
                    <ShieldIcon className="w-7 h-7 text-zinc-400 flex-shrink-0"/>
                    <p><strong className="text-zinc-800">Compra Segura.</strong> Todos nuestros productos cuentan con garantía</p>
                </div>
            </div>
        </section>
    );
};
export default ShippingDetails;
