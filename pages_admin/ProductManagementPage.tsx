

import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import type { SupabaseProduct, Category, Profile, Tag } from '../types';
import type { Session } from '@supabase/supabase-js';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

interface ProductManagementPageProps {
  onEditProduct: (id: string) => void;
  onViewProduct: (slug: string) => void;
  onAddNewProduct: () => void;
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

const ProductManagementPage: React.FC<ProductManagementPageProps> = (props) => {
  const [products, setProducts] = useState<SupabaseProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!supabase) {
        setError('Supabase client not available');
        setLoading(false);
        return;
      }
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*, product_categories(categories(id, name)), product_tags(tags(id, name, color))')
        .order('created_at', { ascending: false });

      if (error) {
        setError(error.message);
      } else {
        const transformedData = (data || []).map((p: any) => ({
            ...p,
            categories: (p.product_categories || []).map((pc: any) => pc.categories).filter(Boolean),
            tags: (p.product_tags || []).map((pt: any) => pt.tags).filter(Boolean)
        }))
        setProducts(transformedData as SupabaseProduct[]);
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header {...props} onCartClick={() => { /* No-op for admin pages */ }} />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Gestión de Productos</h1>
            <button
              onClick={props.onAddNewProduct}
              className="bg-pink-600 text-white font-semibold px-6 py-2 rounded-full hover:bg-pink-700 transition-colors"
            >
              Subir Nuevo Producto
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
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Imagen</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categorías</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendedor</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                    <th scope="col" className="relative px-6 py-3"><span className="sr-only">Acciones</span></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <img src={product.image_url} alt={product.name} className="w-16 h-16 object-cover rounded-md" width="64" height="64" loading="lazy" />
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{product.name}</div>
                      </td>
                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 max-w-xs truncate">
                        {product.categories.map(cat => cat.name).join(', ')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{product.vendor}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">S/ {product.price.toFixed(2)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {product.stock}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-4">
                        <button
                          onClick={() => product.slug && props.onViewProduct(product.slug)}
                          className="text-green-600 hover:text-green-900"
                        >
                          Ver
                        </button>
                        <button
                          onClick={() => props.onEditProduct(product.id)}
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

export default ProductManagementPage;