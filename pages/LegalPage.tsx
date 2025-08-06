




import React, { useState, useEffect, useRef } from 'react';
import type { Session } from '@supabase/supabase-js';
import type { Profile } from '../types';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

interface LegalPageProps {
  onHomeClick: () => void;
  onCatalogClick: (category?: string) => void;
  onContactClick: () => void;
  onLegalClick: () => void; // For the footer
  cartItemCount: number;
  session: Session | null;
  profile: Profile | null;
  onLogout: () => void;
  showAuthModal: (view: 'login' | 'register') => void;
  onAdminProductUploadClick?: () => void;
  onAdminProductManagementClick?: () => void;
  onAdminUserManagementClick?: () => void;
  onAdminOrdersClick?: () => void;
}

const LegalPage: React.FC<LegalPageProps> = (props) => {
  const [activeSection, setActiveSection] = useState('terms');
  const sectionsRef = useRef<{ [key: string]: HTMLElement | null }>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0.1 }
    );

    const currentSections = sectionsRef.current;
    Object.values(currentSections).forEach((section) => {
      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      Object.values(currentSections).forEach((section) => {
        if (section) {
          observer.unobserve(section);
        }
      });
    };
  }, []);
  
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const sectionElement = sectionsRef.current[sectionId];
    if (sectionElement) {
        sectionElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
    }
  };

  const navLinkClasses = (id: string) => 
    `whitespace-nowrap py-3 px-4 text-sm font-medium rounded-lg transition-colors ${
      activeSection === id
        ? 'bg-gray-800 text-white'
        : 'text-gray-600 hover:bg-gray-200'
    }`;
    
  const today = new Date().toLocaleDateString('es-PE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });


  return (
    <div className="bg-white">
      <Header {...props} onCartClick={() => {}} />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
            <h1 className="text-4xl font-black text-gray-900 tracking-tight animate-fade-in-up">Documentos Legales</h1>
            <p className="mt-2 text-lg text-gray-600 animate-fade-in-up delay-100">Términos, Privacidad y Políticas de KetoShop.</p>
        </div>

        <div className="lg:grid lg:grid-cols-4 lg:gap-12 mt-12">
            <aside className="lg:col-span-1 lg:sticky top-24 self-start">
              <nav className="flex lg:flex-col gap-2 p-2 bg-gray-100 rounded-xl overflow-x-auto">
                  <a href="#terms" onClick={(e) => handleNavClick(e, 'terms')} className={navLinkClasses('terms')}>Términos y Condiciones</a>
                  <a href="#privacy" onClick={(e) => handleNavClick(e, 'privacy')} className={navLinkClasses('privacy')}>Política de Privacidad</a>
                  <a href="#shipping" onClick={(e) => handleNavClick(e, 'shipping')} className={navLinkClasses('shipping')}>Política de Envíos</a>
                  <a href="#returns" onClick={(e) => handleNavClick(e, 'returns')} className={navLinkClasses('returns')}>Política de Devoluciones</a>
              </nav>
            </aside>

            <div className="lg:col-span-3 mt-8 lg:mt-0 prose max-w-none prose-h2:font-bold prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-h3:font-semibold prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3 prose-p:leading-relaxed prose-a:text-pink-600 prose-strong:text-gray-800">
                
              <section id="terms" ref={(el) => { sectionsRef.current['terms'] = el; }} className="scroll-mt-24">
                  <h2>1. TÉRMINOS Y CONDICIONES</h2>
                  <h3>1.1 INFORMACIÓN GENERAL</h3>
                  <p><strong>KetoShop</strong> es una tienda online especializada en productos para el estilo de vida keto y suplementos nutricionales. Al acceder y utilizar nuestro sitio web, aceptas cumplir con estos términos y condiciones.</p>
                  <p><strong>Datos de la empresa:</strong></p>
                  <ul>
                    <li>Razón Social: ROBERTO ORLANDO FRANCISCO REVOREDO ALVA</li>
                    <li>RUC: 10428238821</li>
                    <li>LIMA - PUEBLO LIBRE</li>
                    <li>Email: vpfaprincipal@gmail.com</li>
                    <li>Whatsapp: 965210993</li>
                  </ul>
                  <h3>1.2 ACEPTACIÓN DE TÉRMINOS</h3>
                  <p>Al utilizar nuestros servicios, confirmas que:</p>
                  <ul>
                    <li>Eres mayor de 18 años o cuentas con autorización de tus padres/tutores</li>
                    <li>Proporcionas información veraz y actualizada</li>
                    <li>Aceptas recibir comunicaciones relacionadas con tus pedidos</li>
                    <li>Cumplirás con las leyes aplicables en Perú</li>
                  </ul>
                  <h3>1.3 PRODUCTOS Y SERVICIOS</h3>
                  <ul>
                    <li>Vendemos productos originales para el estilo de vida keto y suplementos nutricionales</li>
                    <li>Las imágenes son referenciales y pueden variar ligeramente del producto real</li>
                    <li>Nos reservamos el derecho de modificar precios sin previo aviso</li>
                    <li>Disponibilidad sujeta a stock</li>
                  </ul>
                  <h3>1.4 PRECIOS Y PROMOCIONES</h3>
                  <ul>
                    <li>Todos los precios están expresados en soles peruanos (PEN)</li>
                    <li>Las ofertas tienen validez limitada y están sujetas a términos específicos</li>
                    <li>Los descuentos no son acumulables salvo indicación contraria</li>
                    <li>El 10% de descuento mencionado aplica según términos específicos de cada promoción</li>
                  </ul>
                  <h3>1.5 REGISTRO DE CUENTA</h3>
                  <p>Para realizar compras debes:</p>
                  <ul>
                    <li>Crear una cuenta con información válida</li>
                    <li>Mantener la confidencialidad de tu contraseña</li>
                    <li>Notificar cualquier uso no autorizado de tu cuenta</li>
                    <li>Actualizar tu información cuando sea necesario</li>
                  </ul>
                  <h3>1.6 LIMITACIÓN DE RESPONSABILIDAD</h3>
                  <p>KetoShop no se hace responsable por:</p>
                  <ul>
                    <li>Daños indirectos o consecuenciales</li>
                    <li>Interrupciones del servicio por mantenimiento</li>
                    <li>Problemas de conectividad o técnicos ajenos a nosotros</li>
                    <li>Uso inadecuado de los productos</li>
                  </ul>
                  <h3>1.7 MODIFICACIONES</h3>
                  <p>Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios serán publicados en nuestro sitio web y entrarán en vigor inmediatamente.</p>
              </section>

              <section id="privacy" ref={(el) => { sectionsRef.current['privacy'] = el; }} className="scroll-mt-24">
                  <h2>2. POLÍTICA DE PRIVACIDAD</h2>
                  <h3>2.1 INFORMACIÓN QUE RECOPILAMOS</h3>
                  <p><strong>Información personal:</strong></p>
                  <ul>
                    <li>Nombre completo y documento de identidad</li>
                    <li>Dirección de correo electrónico</li>
                    <li>Número de teléfono</li>
                    <li>Dirección de entrega</li>
                    <li>Información de pago (procesada de forma segura)</li>
                  </ul>
                  <p><strong>Información automática:</strong></p>
                  <ul>
                    <li>Dirección IP y datos de navegación</li>
                    <li>Cookies y tecnologías similares</li>
                    <li>Interacciones con nuestro sitio web</li>
                    <li>Preferencias de productos</li>
                  </ul>
                  <h3>2.2 USO DE LA INFORMACIÓN</h3>
                  <p>Utilizamos tu información para:</p>
                  <ul>
                    <li>Procesar y entregar tus pedidos</li>
                    <li>Enviar confirmaciones y actualizaciones de estado</li>
                    <li>Brindar atención al cliente</li>
                    <li>Mejorar nuestros productos y servicios</li>
                    <li>Enviar ofertas y promociones (con tu consentimiento)</li>
                    <li>Cumplir con obligaciones legales</li>
                  </ul>
                  <h3>2.3 COMPARTIR INFORMACIÓN</h3>
                  <p>No vendemos ni alquilamos tu información personal. Podemos compartirla con:</p>
                  <ul>
                    <li>Proveedores de servicios de entrega</li>
                    <li>Procesadores de pago</li>
                    <li>Autoridades cuando sea requerido por ley</li>
                    <li>Proveedores de servicios tecnológicos bajo acuerdos de confidencialidad</li>
                  </ul>
                  <h3>2.4 SEGURIDAD DE DATOS</h3>
                  <p>Implementamos medidas de seguridad para proteger tu información:</p>
                  <ul>
                    <li>Encriptación SSL en todas las transacciones</li>
                    <li>Acceso restringido a información personal</li>
                    <li>Monitoreo regular de seguridad</li>
                    <li>Cumplimiento con la Ley de Protección de Datos Personales del Perú</li>
                  </ul>
                  <h3>2.5 TUS DERECHOS</h3>
                  <p>Tienes derecho a:</p>
                  <ul>
                    <li>Acceder a tu información personal</li>
                    <li>Rectificar datos incorrectos</li>
                    <li>Solicitar la eliminación de tus datos</li>
                    <li>Oponerte al procesamiento para marketing</li>
                    <li>Revocar tu consentimiento en cualquier momento</li>
                  </ul>
                  <h3>2.6 COOKIES</h3>
                  <p>Utilizamos cookies para:</p>
                  <ul>
                    <li>Mantener tu sesión activa</li>
                    <li>Recordar tus preferencias</li>
                    <li>Analizar el tráfico del sitio</li>
                    <li>Personalizar tu experiencia</li>
                  </ul>
                  <p>Puedes gestionar las cookies desde la configuración de tu navegador.</p>
                  <h3>2.7 CONTACTO</h3>
                  <p>Para ejercer tus derechos o consultas sobre privacidad:</p>
                  <ul>
                    <li>Email: vpfaprincipal@gmail.com</li>
                  </ul>
              </section>

              <section id="shipping" ref={(el) => { sectionsRef.current['shipping'] = el; }} className="scroll-mt-24">
                  <h2>3. POLÍTICA DE ENVÍOS</h2>
                  <h3>3.1 COBERTURA</h3>
                  <p><strong>¡ENVÍOS A TODO EL PERÚ!</strong></p>
                  <ul>
                    <li>Lima Metropolitana: Entrega express disponible</li>
                    <li>Provincias: Envío a través de courrier autorizado</li>
                    <li>Zonas rurales: Consultar disponibilidad</li>
                  </ul>
                  <h3>3.2 TIEMPOS DE ENTREGA</h3>
                  <p><strong>Lima Metropolitana:</strong></p>
                  <ul>
                    <li>Entrega express: 24-48 horas hábiles</li>
                    <li>Entrega estándar: 2-4 días hábiles</li>
                  </ul>
                  <p><strong>Provincias:</strong></p>
                  <ul>
                    <li>3-7 días hábiles según ubicación</li>
                    <li>Zonas alejadas pueden tomar hasta 10 días hábiles</li>
                  </ul>
                  <h3>3.3 COSTOS DE ENVÍO</h3>
                  <ul>
                    <li><strong>Lima Metropolitana:</strong> Desde S/. 15.00</li>
                    <li><strong>Provincias:</strong> Costos calculados según peso y destino</li>
                    <li><strong>Envío gratuito:</strong> En compras mayores a S/. 150.00 en Lima</li>
                    <li>Los costos se muestran antes de confirmar la compra</li>
                  </ul>
                  <h3>3.4 PROCESO DE ENVÍO</h3>
                  <ol>
                    <li><strong>Confirmación:</strong> Verificamos tu pedido y método de pago</li>
                    <li><strong>Preparación:</strong> Empacamos cuidadosamente tus productos</li>
                    <li><strong>Envío:</strong> Entregamos al courier con código de seguimiento</li>
                    <li><strong>Notificación:</strong> Te enviamos el código de tracking por email/WhatsApp</li>
                    <li><strong>Entrega:</strong> El courier contacta para coordinar la entrega</li>
                  </ol>
                  <h3>3.5 SEGUIMIENTO</h3>
                  <ul>
                    <li>Código de tracking enviado por email y WhatsApp</li>
                    <li>Consulta el estado en línea con tu número de seguimiento</li>
                    <li>Notificaciones automáticas de cambios de estado</li>
                  </ul>
                  <h3>3.6 CONDICIONES ESPECIALES</h3>
                  <ul>
                    <li><strong>Productos frágiles:</strong> Empaque especial sin costo adicional</li>
                    <li><strong>Suplementos:</strong> Verificación de temperatura durante transporte</li>
                    <li><strong>Pedidos grandes:</strong> Pueden requerir tiempo adicional de preparación</li>
                  </ul>
                  <h3>3.7 PROBLEMAS CON ENVÍOS</h3>
                  <p>Si tu pedido:</p>
                  <ul>
                    <li>No llega en el tiempo estimado</li>
                    <li>Llega dañado</li>
                    <li>No corresponde a lo solicitado</li>
                  </ul>
                  <p>Contacta inmediatamente a nuestro equipo de atención al cliente.</p>
              </section>
              
              <section id="returns" ref={(el) => { sectionsRef.current['returns'] = el; }} className="scroll-mt-24">
                  <h2>4. POLÍTICA DE DEVOLUCIONES</h2>
                  <h3>4.1 GARANTÍA DE SATISFACCIÓN</h3>
                  <p>Estamos comprometidos con tu satisfacción. Ofrecemos devoluciones bajo ciertas condiciones para garantizar que tengas la mejor experiencia de compra.</p>
                  <h3>4.2 PLAZO PARA DEVOLUCIONES</h3>
                  <ul>
                    <li><strong>7 días calendario</strong> desde la fecha de entrega</li>
                    <li>Productos sin abrir y en su empaque original</li>
                    <li>Incluir todos los accesorios y documentación</li>
                  </ul>
                  <h3>4.3 PRODUCTOS ELEGIBLES</h3>
                  <p><strong>SÍ se pueden devolver:</strong></p>
                  <ul>
                    <li>Productos cerrados y en perfecto estado</li>
                    <li>Artículos defectuosos o dañados</li>
                    <li>Productos incorrectos (error nuestro)</li>
                    <li>Suplementos sin abrir con sello intacto</li>
                  </ul>
                  <p><strong>NO se pueden devolver:</strong></p>
                  <ul>
                    <li>Productos abiertos o consumidos parcialmente</li>
                    <li>Artículos personalizados</li>
                    <li>Productos en oferta especial (indicado en la descripción)</li>
                    <li>Suplementos con sello roto</li>
                  </ul>
                  <h3>4.4 PROCESO DE DEVOLUCIÓN</h3>
                  <ol>
                    <li><strong>Solicitud:</strong> Contacta a nuestro equipo dentro del plazo</li>
                    <li><strong>Autorización:</strong> Te proporcionamos un código de devolución</li>
                    <li><strong>Empaque:</strong> Usa el empaque original o uno similar</li>
                    <li><strong>Envío:</strong> Envía el producto a nuestra dirección</li>
                    <li><strong>Revisión:</strong> Verificamos el estado del producto</li>
                    <li><strong>Reembolso:</strong> Procesamos el reembolso o cambio</li>
                  </ol>
                  <h3>4.5 COSTOS DE DEVOLUCIÓN</h3>
                  <ul>
                    <li><strong>Error nuestro:</strong> Asumimos todos los costos</li>
                    <li><strong>Cambio de opinión:</strong> El cliente asume el costo de envío de retorno</li>
                    <li><strong>Producto defectuoso:</strong> Reembolso completo + costos de envío</li>
                  </ul>
                  <h3>4.6 MÉTODOS DE REEMBOLSO</h3>
                  <ul>
                    <li><strong>Transferencia bancaria:</strong> 5-7 días hábiles</li>
                    <li><strong>Crédito en tienda:</strong> Inmediato (con 5% adicional de bonificación)</li>
                    <li><strong>Tarjeta de crédito:</strong> 10-15 días hábiles según banco</li>
                  </ul>
                  <h3>4.7 CAMBIOS</h3>
                  <ul>
                    <li>Cambio por talla o color: Sin costo adicional (una vez)</li>
                    <li>Cambio por producto diferente: Diferencia de precio aplicable</li>
                    <li>Stock sujeto a disponibilidad</li>
                  </ul>
                  <h3>4.8 PRODUCTOS DEFECTUOSOS</h3>
                  <p>Si recibes un producto defectuoso:</p>
                  <ol>
                    <li>Reporta inmediatamente (máximo 48 horas)</li>
                    <li>Envía fotos del producto y empaque</li>
                    <li>Te enviamos reemplazo inmediato</li>
                    <li>Recolección del producto defectuoso sin costo</li>
                  </ol>
                  <h3>4.9 CONTACTO PARA DEVOLUCIONES</h3>
                  <p><strong>WhatsApp:</strong> 965210993</p>
                  <p><strong>Email:</strong> devoluciones@ketoshop.com</p>
                  <p><strong>Horario:</strong> Lunes a viernes 9:00 AM - 6:00 PM</p>
                  <p><strong>Dirección para devoluciones:</strong> Av. La Marina 234, Pueblo Libre, Lima, Perú (Dirección de ejemplo)</p>
                  <h3>4.10 CASOS ESPECIALES</h3>
                  <ul>
                    <li><strong>Productos vencidos:</strong> Reemplazo inmediato</li>
                    <li><strong>Daños por transporte:</strong> Cobertura completa</li>
                    <li><strong>Error en pedido:</strong> Corrección sin costo</li>
                  </ul>
                  <hr/>
                  <h2>INFORMACIÓN ADICIONAL</h2>
                  <h3>ATENCIÓN AL CLIENTE</h3>
                  <ul>
                    <li><strong>WhatsApp:</strong> Respuesta inmediata durante horario comercial</li>
                    <li><strong>Email:</strong> Respuesta en máximo 24 horas</li>
                    <li><strong>Horario:</strong> Lunes a viernes 9:00 AM - 6:00 PM, Sábados 9:00 AM - 1:00 PM</li>
                  </ul>
                  <h3>MÉTODOS DE PAGO ACEPTADOS</h3>
                  <ul>
                    <li>Tarjetas de crédito y débito</li>
                    <li>Transferencias bancarias</li>
                    <li>Billeteras digitales</li>
                    <li>Pago contraentrega (Lima Metropolitana)</li>
                  </ul>
                  <h3>CERTIFICACIONES</h3>
                  <ul>
                    <li>Productos originales garantizados</li>
                    <li>Cumplimiento con regulaciones DIGEMID</li>
                    <li>Certificación sanitaria vigente</li>
                  </ul>
              </section>

              <div className="mt-16 text-sm text-gray-500 border-t pt-4">
                  <p>Última actualización: {today}</p>
                  <p>Estos términos están sujetos a la legislación peruana vigente.</p>
              </div>

            </div>
        </div>
      </main>
      <Footer onLegalClick={props.onLegalClick} onCatalogClick={props.onCatalogClick} onHomeClick={props.onHomeClick} />
    </div>
  );
};

export default LegalPage;