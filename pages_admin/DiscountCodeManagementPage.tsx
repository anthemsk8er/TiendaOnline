

import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import type { DiscountCode, Profile } from '../types';
import type { Session, PostgrestResponse } from '@supabase/supabase-js';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

interface DiscountCodeManagementPageProps {
  onEditDiscountCode: (id: string) => void;
  onAddNewDiscountCode: () => void;
  onCatalogClick: (category?: string) => void;
  onHomeClick: () => void;
  onContactFaqClick: () => void;
  onLegalClick: () => void;
  onAdminProductUploadClick?: () => void;
  onAdminProductManagementClick?: () => void;
  onAdminUserManagementClick?: () => void;
  onAdminWelcomePageClick?: () => void;
  cartItemCount: number;
  session: Session | null;
  profile: Profile | null;
  onLogout: () => void;
  showAuthModal: (view: 'login' | 'register') => void;
}

const DiscountCodeManagementPage: React.FC<DiscountCodeManagementPageProps> = (props) => {
  const [codes, setCodes] = useState<DiscountCode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDiscountCodes = async () => {
      if (!supabase) {
        setError('Supabase client not available');
        setLoading(false);
        return;
      }
      setLoading(true);
      const { data, error } = await supabase
        .from('discount_codes')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        setError(error.message);
      } else {
        setCodes(data || []);
      }
      setLoading(false);
    };

    fetchDiscountCodes();
  }, []);
  
  const getStatus = (code: DiscountCode) => {
    if(!code.is_active) return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">Inactivo</span>;
    
    const now = new Date();
    if(code.limitation_type === 'date_range' && code.end_date && new Date(code.end_date) < now) {
        return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Expirado</span>;
    }
    if(code.limitation_type === 'usage_limit' && code.usage_limit !== null && code.times_used >= code.usage_limit) {
        return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Agotado</span>;
    }
    return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Activo</span>;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header {...props} onCartClick={() => { /* No-op for admin pages */ }} />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Gestión de Códigos de Descuento</h1>
            <button
              onClick={props.onAddNewDiscountCode}
              className="bg-pink-600 text-white font-semibold px-6 py-2 rounded-full hover:bg-pink-700 transition-colors"
            >
              Crear Nuevo Código
            </button>
          </div>

          {loading && 
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
            </div>
          }
          {error && <p className="text-red-500">Error: {error}</p>}

          {!loading && !error && (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Código</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ámbito</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Límite</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usos</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                    <th scope="col" className="relative px-6 py-3"><span className="sr-only">Acciones</span></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {codes.map((code) => (
                    <tr key={code.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{code.code}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                         <div className="text-sm text-gray-800">{code.discount_type === 'percentage' ? `${code.discount_value}%` : `S/ ${code.discount_value}`}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                        {code.scope === 'product' ? 'Producto' : 'Carrito'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                         {code.limitation_type === 'date_range' ? 
                            `Hasta ${new Date(code.end_date!).toLocaleDateString()}` :
                            `${code.usage_limit || 'Ilimitado'}`
                         }
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {code.times_used}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatus(code)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => props.onEditDiscountCode(code.id)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Editar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
      <Footer onLegalClick={props.onLegalClick} onCatalogClick={props.onCatalogClick} onHomeClick={props.onHomeClick} onContactFaqClick={props.onContactFaqClick} />
    </div>
  );
};

export default DiscountCodeManagementPage;