
import React, { useState } from 'react';
import type { CartItem, Product, Profile } from '../types';
import type { Session } from '@supabase/supabase-js';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { AtSymbolIcon, MapPinIcon, ChatIcon, ChevronDownIcon, ChevronUpIcon } from '../components/product_detail_page/Icons';
import CheckoutPopup from '../components/cart_delivery/CheckoutPopup';
import Cart from '../components/cart_delivery/Cart';
import WhatsAppButton from '../components/shared/WhatsAppButton';

interface ContactFaqPageProps {
  onProductClick: (productId: string) => void;
  onCatalogClick: (category?: string) => void;
  onHomeClick: () => void;
  onContactFaqClick: () => void;
  onLegalClick: () => void;
  onAdminProductUploadClick?: () => void;
  onAdminProductManagementClick?: () => void;
  onAdminUserManagementClick?: () => void;
  onAdminOrdersClick?: () => void;
  onAdminDiscountManagementClick?: () => void;
  onAdminReviewManagementClick?: () => void;
  cartItems: CartItem[];
  onAddToCart: (product: Product, quantity: number) => void;
  onUpdateCartQuantity: (productId: string, quantity: number, newUnitPrice?: number) => void;
  onRemoveFromCart: (productId: string) => void;
  session: Session | null;
  profile: Profile | null;
  onLogout: () => void;
  showAuthModal: (view: 'login' | 'register') => void;
}

const faqs = [
    {
        q: "¿Sus productos son realmente originales?",
        a: "<strong>Absolutamente.</strong> En KetoShop Natural, nuestra reputación se basa en la confianza. Somos distribuidores autorizados y trabajamos directamente con laboratorios reconocidos para garantizar que cada producto que vendemos es <strong>100% original y auténtico.</strong> Todos nuestros productos cuentan con los registros sanitarios correspondientes y sellos de seguridad intactos."
    },
    {
        q: "¿Cómo puedo estar seguro de que los productos son efectivos?",
        a: "Entendemos tu preocupación. La efectividad de nuestros productos se respalda en tres pilares: <br/><ul class='list-disc list-inside mt-2 space-y-1'><li><strong>Ingredientes de Calidad:</strong> Utilizamos fórmulas con ingredientes de alta pureza y con respaldo científico.</li><li><strong>Clientes Satisfechos:</strong> Contamos con cientos de testimonios de clientes que han visto resultados reales y han mejorado su estilo de vida.</li><li><strong>Consistencia:</strong> La efectividad de cualquier suplemento depende de un uso consistente y un estilo de vida adecuado. Nuestros productos son una herramienta poderosa para ayudarte a alcanzar tus metas.</li></ul><p class='mt-2'>Si bien los resultados pueden variar de persona a persona, garantizamos la máxima calidad y potencia en cada frasco.</p>"
    },
    {
        q: "¿Cuáles son los tiempos y costos de envío?",
        a: "Manejamos los siguientes tiempos y costos:<br/><ul class='list-disc list-inside mt-2 space-y-1'><li><strong>Lima Metropolitana:</strong> La entrega se realiza entre 24 y 48 horas hábiles. El costo de envío es a partir de S/ 15.00, y es <strong>gratis para compras mayores a S/ 150.00.</strong></li><li><strong>Provincias:</strong> El tiempo de entrega es de 3 a 7 días hábiles, dependiendo de la ubicación. Trabajamos con couriers confiables como Olva y Shalom para garantizar que tu pedido llegue seguro.</li></ul>"
    },
    {
        q: "¿Puedo devolver un producto si no estoy satisfecho?",
        a: "Sí, puedes devolver un producto dentro de los <strong>7 días calendario</strong> desde la fecha de entrega, siempre y cuando cumpla con las siguientes condiciones: <ul class='list-disc list-inside mt-2 space-y-1'><li>El producto debe estar <strong>completamente sellado, sin abrir y en su empaque original.</strong></li><li>No debe presentar signos de uso.</li></ul><p class='mt-2'>Si el motivo de la devolución es un error nuestro o un defecto de fábrica, cubriremos todos los costos. Si es por un cambio de opinión, el cliente asume el costo del envío de retorno.</p>"
    },
    {
        q: "¿Qué métodos de pago aceptan?",
        a: "Ofrecemos múltiples métodos de pago para tu comodidad:<ul class='list-disc list-inside mt-2 space-y-1'><li><strong>Pago Contraentrega (Solo Lima):</strong> Paga en efectivo o con tarjeta (llevamos POS) al momento de recibir tu pedido.</li><li><strong>Billeteras Digitales:</strong> Aceptamos Yape y Plin.</li><li><strong>Tarjetas de Crédito y Débito:</strong> Aceptamos todas las tarjetas Visa, Mastercard, Diners Club y American Express.</li><li><strong>Transferencia Bancaria.</strong></li></ul>"
    },
];

const FaqItem = ({ question, answer, isOpen, onToggle }: { question: string; answer: string; isOpen: boolean; onToggle: () => void; }) => {
  return (
    <div className="border-b border-gray-200">
      <button onClick={onToggle} className="w-full flex justify-between items-center py-5 text-left gap-4" aria-expanded={isOpen}>
        <span className="font-semibold text-lg text-gray-800">{question}</span>
        {isOpen ? <ChevronUpIcon className="text-gray-600" /> : <ChevronDownIcon className="text-gray-500" />}
      </button>
      <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
        <div className="overflow-hidden">
          <div className="pb-5 pr-4 text-gray-600" dangerouslySetInnerHTML={{ __html: answer }} />
        </div>
      </div>
    </div>
  );
};


const ContactFaqPage: React.FC<ContactFaqPageProps> = (props) => {
  const {
    onCatalogClick, onHomeClick, onContactFaqClick, onLegalClick,
    cartItems, onAddToCart, onUpdateCartQuantity, onRemoveFromCart,
    session, profile, onLogout, showAuthModal
  } = props;
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleOpenCart = () => setIsCartOpen(true);
  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const headerProps = { ...props, onCartClick: handleOpenCart, cartItemCount };

  return (
    <div className="bg-gray-50">
      <Header {...headerProps} />
      <main>
        <section
          className="h-56 bg-cover bg-center flex items-center justify-center text-white"
          style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://uylwgmvnlnnkkvjqirhx.supabase.co/storage/v1/object/public/products/img/categories/inmunity1.jpg')` }}
        >
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight animate-fade-in-up">Ayuda y Contacto</h1>
        </section>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 animate-fade-in-up">Información de Contacto</h2>
                <p className="text-gray-600 mb-6">¿Tienes alguna duda? ¡Contáctanos! Estamos aquí para ayudarte con tus compras, productos o cualquier otra consulta.</p>
                <div className="space-y-6 text-gray-700">
                    <div className="flex items-start gap-4">
                        <ChatIcon className="w-7 h-7 text-pink-600 mt-1 flex-shrink-0"/>
                        <div>
                            <h3 className="font-semibold text-lg">WhatsApp</h3>
                            <a href="https://wa.me/51955249392" target="_blank" rel="noopener noreferrer" className="hover:text-pink-700 transition-colors">+51 955 249 392</a>
                            <p className="text-sm text-gray-500">Lunes a Sábado: 9:00 AM - 7:00 PM</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <AtSymbolIcon className="w-7 h-7 text-pink-600 mt-1 flex-shrink-0"/>
                        <div>
                            <h3 className="font-semibold text-lg">Email</h3>
                            <a href="mailto:vpfaprincipal@gmail.com" className="hover:text-pink-700 transition-colors">vpfaprincipal@gmail.com</a>
                            <p className="text-sm text-gray-500">Respondemos en menos de 24 horas.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <MapPinIcon className="w-7 h-7 text-pink-600 mt-1 flex-shrink-0"/>
                        <div>
                            <h3 className="font-semibold text-lg">Almacén Principal</h3>
                            <p>Lima - Lima, Perú</p>
                            <p className="text-sm text-gray-500">Somos una tienda 100% online.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 animate-fade-in-up">Envíanos un mensaje</h2>
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre completo</label>
                  <div className="mt-1">
                    <input type="text" name="name" id="name" className="w-full px-4 py-3 bg-slate-100 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none" placeholder="Tu nombre" />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo electrónico</label>
                  <div className="mt-1">
                    <input type="email" name="email" id="email" className="w-full px-4 py-3 bg-slate-100 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none" placeholder="tu@email.com" />
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">Mensaje</label>
                  <div className="mt-1">
                    <textarea id="message" name="message" rows={4} className="w-full px-4 py-3 bg-slate-100 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none" placeholder="Escribe tu consulta aquí..."></textarea>
                  </div>
                </div>
                <div>
                  <button type="submit" className="w-full bg-[#e52e8d] text-white font-bold py-3 px-6 rounded-full hover:bg-[#c82278] transition-colors flex items-center justify-center gap-2 text-base shadow-lg">
                    Enviar Mensaje
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <section className="bg-white mt-16 py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Preguntas Frecuentes</h2>
                {faqs.map((faq, index) => (
                    <FaqItem
                        key={index}
                        question={faq.q}
                        answer={faq.a}
                        isOpen={openFaq === index}
                        onToggle={() => setOpenFaq(openFaq === index ? null : index)}
                    />
                ))}
            </div>
          </div>
        </section>

      </main>
      <Footer onLegalClick={onLegalClick} onCatalogClick={onCatalogClick} onHomeClick={onHomeClick} onContactFaqClick={onContactFaqClick}/>
      <CheckoutPopup
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        onUpdateQuantity={onUpdateCartQuantity}
      />
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={handleProceedToCheckout}
        items={cartItems}
        onRemoveItem={onRemoveFromCart}
        onUpdateQuantity={onUpdateCartQuantity}
      />
      <WhatsAppButton phoneNumber="955249392" message="Hola, tengo una pregunta sobre un producto de KetoShop." />
    </div>
  );
};

export default ContactFaqPage;
