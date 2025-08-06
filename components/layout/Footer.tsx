import React from 'react';

interface FooterProps {
  onLegalClick: () => void;
  onCatalogClick: (category: string) => void;
  onHomeClick: () => void;
}

const Footer: React.FC<FooterProps> = ({ onLegalClick, onCatalogClick, onHomeClick }) => {
  return (
    <footer className="bg-gray-50 border-t mt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
                        <a href="#" onClick={(e) => { e.preventDefault(); onHomeClick(); }} aria-label="Back to homepage" className="text-4xl font-bold tracking-tighter">
              <span className="text-orange-500">Shop Natural</span>
            </a>
            <p className="mt-2 text-sm text-gray-600">Suplementos de alta calidad.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">Comprar</h4>
            <ul className="mt-4 space-y-2 text-sm text-gray-600">
              <li><a href="#" onClick={(e) => { e.preventDefault(); onCatalogClick('Vitaminas'); }} className="hover:text-green-600">Vitaminas</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); onCatalogClick('Suplementos'); }} className="hover:text-green-600">Suplementos</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); onCatalogClick('Proteínas'); }} className="hover:text-green-600">Proteínas</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); onCatalogClick('Packs'); }} className="hover:text-green-600">Packs</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">Ayuda</h4>
            <ul className="mt-4 space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-green-600">Preguntas Frecuentes</a></li>
              <li><a href="#" className="hover:text-green-600">Envíos y Devoluciones</a></li>
              <li><a href="#" className="hover:text-green-600">Contacto</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">Legal</h4>
            <ul className="mt-4 space-y-2 text-sm text-gray-600">
              <li><a href="#" onClick={(e) => { e.preventDefault(); onLegalClick(); }} className="hover:text-green-600">Términos y Condiciones</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); onLegalClick(); }} className="hover:text-green-600">Política de Privacidad</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Keto Burner KetoShop -  Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;