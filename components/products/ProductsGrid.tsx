
import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import ProductCard from './ProductCard';
import type { SupabaseProduct, Product, Tag, AccordionItem, Category } from '../../types';

// Mock data to be used when Supabase is not configured
const mockProducts: SupabaseProduct[] = [
    { id: 'mock-1', name: 'Gomitas de Ashwagandha (Mock)', description: 'Reduce el estrés y mejora el ánimo. Configure Supabase para ver productos reales.', price: 89.90, discount_price: 79.90, image_url: 'https://picsum.photos/id/102/400/400', image_url_2: null, image_url_3: null, image_url_4: null, stock: 15, vendor: 'SUPERMOCK™', is_active: true, categories: [{ id: 'cat-sueño', name: 'Sueño' }], tags: [{ id: 'tag-pop', name: 'Popular', color: '#F59E0B' }, { id: 'tag-oferta', name: 'Oferta', color: '#EF4444' }, {id: 'tag-home', name: 'destacados home', color: '#3B82F6'}], accordion_point1_title: 'Mock Title 1', accordion_point1_content: 'Mock content 1', accordion_point2_title: null, accordion_point2_content: null, accordion_point3_title: null, accordion_point3_content: null, accordion_point4_title: null, accordion_point4_content: null, hero_data: null, features_data: null, benefits_data: null, comparison_data: null, faq_data: null },
    { id: 'mock-2', name: 'Gomitas de Magnesio (Mock)', description: 'Apoya la relajación muscular y el descanso.', price: 69.90, discount_price: null, image_url: 'https://picsum.photos/id/201/400/400', image_url_2: null, image_url_3: null, image_url_4: null, stock: 20, vendor: 'SUPERMOCK™', is_active: true, categories: [{ id: 'cat-sueño', name: 'Sueño' }], tags: [{ id: 'tag-pop', name: 'Popular', color: '#F59E0B' }], accordion_point1_title: null, accordion_point1_content: null, accordion_point2_title: null, accordion_point2_content: null, accordion_point3_title: null, accordion_point3_content: null, accordion_point4_title: null, accordion_point4_content: null, hero_data: null, features_data: null, benefits_data: null, comparison_data: null, faq_data: null },
    { id: 'mock-3', name: 'Creatina Monohidratada (Mock)', description: 'Aumenta la fuerza y la energía durante el ejercicio.', price: 89.90, discount_price: null, image_url: 'https://picsum.photos/id/202/400/400', image_url_2: null, image_url_3: null, image_url_4: null, stock: 5, vendor: 'SUPERMOCK™', is_active: true, categories: [{ id: 'cat-energia', name: 'Energía' }], tags: [{id: 'tag-home', name: 'destacados home', color: '#3B82F6'}], accordion_point1_title: null, accordion_point1_content: null, accordion_point2_title: null, accordion_point2_content: null, accordion_point3_title: null, accordion_point3_content: null, accordion_point4_title: null, accordion_point4_content: null, hero_data: null, features_data: null, benefits_data: null, comparison_data: null, faq_data: null },
    { id: 'mock-4', name: 'Vitamina D3+K2 (Mock)', description: 'Fortalece el sistema inmunológico y la salud ósea.', price: 59.90, discount_price: 49.90, image_url: 'https://picsum.photos/id/203/400/400', image_url_2: null, image_url_3: null, image_url_4: null, stock: 0, vendor: 'SUPERMOCK™', is_active: true, categories: [{ id: 'cat-inmunidad', name: 'Inmunidad' }], tags: [{ id: 'tag-oferta', name: 'Oferta', color: '#EF4444' }], accordion_point1_title: null, accordion_point1_content: null, accordion_point2_title: null, accordion_point2_content: null, accordion_point3_title: null, accordion_point3_content: null, accordion_point4_title: null, accordion_point4_content: null, hero_data: null, features_data: null, benefits_data: null, comparison_data: null, faq_data: null },
    { id: 'mock-5', name: 'Colágeno Hidrolizado (Mock)', description: 'Mejora la salud de la piel, cabello y uñas.', price: 99.90, discount_price: null, image_url: 'https://picsum.photos/id/35/400/400', image_url_2: null, image_url_3: null, image_url_4: null, stock: 30, vendor: 'HEALTHYMOCK', is_active: true, categories: [{ id: 'cat-belleza', name: 'Belleza' }], tags: [], accordion_point1_title: null, accordion_point1_content: null, accordion_point2_title: null, accordion_point2_content: null, accordion_point3_title: null, accordion_point3_content: null, accordion_point4_title: null, accordion_point4_content: null, hero_data: null, features_data: null, benefits_data: null, comparison_data: null, faq_data: null },
    { id: 'mock-6', name: 'Probióticos Avanzados (Mock)', description: 'Equilibra la flora intestinal para una mejor digestión.', price: 75.50, discount_price: null, image_url: 'https://picsum.photos/id/36/400/400', image_url_2: null, image_url_3: null, image_url_4: null, stock: 12, vendor: 'SUPERMOCK™', is_active: true, categories: [{ id: 'cat-digestion', name: 'Digestión' }], tags: [], accordion_point1_title: null, accordion_point1_content: null, accordion_point2_title: null, accordion_point2_content: null, accordion_point3_title: null, accordion_point3_content: null, accordion_point4_title: null, accordion_point4_content: null, hero_data: null, features_data: null, benefits_data: null, comparison_data: null, faq_data: null },
    { id: 'mock-7', name: 'Gomitas de Enfoque (Mock)', description: 'Con L-Teanina y Hongo Melena de León.', price: 85.00, discount_price: 75.00, image_url: 'https://picsum.photos/id/32/400/400', image_url_2: null, image_url_3: null, image_url_4: null, stock: 8, vendor: 'SUPERMOCK™', is_active: true, categories: [{ id: 'cat-enfoque', name: 'Enfoque' }], tags: [{ id: 'tag-nuevo', name: 'Nuevo', color: '#10B981' }], accordion_point1_title: null, accordion_point1_content: null, accordion_point2_title: null, accordion_point2_content: null, accordion_point3_title: null, accordion_point3_content: null, accordion_point4_title: null, accordion_point4_content: null, hero_data: null, features_data: null, benefits_data: null, comparison_data: null, faq_data: null },
    { id: 'mock-8', name: 'Omega 3 de Algas (Mock)', description: 'Fuente vegana de ácidos grasos esenciales.', price: 74.90, discount_price: null, image_url: 'https://picsum.photos/id/204/400/400', image_url_2: null, image_url_3: null, image_url_4: null, stock: 18, vendor: 'HEALTHYMOCK', is_active: true, categories: [{ id: 'cat-salud', name: 'Salud General' }], tags: [], accordion_point1_title: null, accordion_point1_content: null, accordion_point2_title: null, accordion_point2_content: null, accordion_point3_title: null, accordion_point3_content: null, accordion_point4_title: null, accordion_point4_content: null, hero_data: null, features_data: null, benefits_data: null, comparison_data: null, faq_data: null }
];


interface ProductsGridProps {
  categoryFilter?: string | null;
  tagFilter?: string | null;
  vendorFilter?: string | null;
  limit?: number | null;
  title?: string | null;
  showLoadMore?: boolean;
  onProductClick: (id: string) => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onCartOpen?: () => void;
  refetchTrigger?: number;
}

const ProductsGrid: React.FC<ProductsGridProps> = ({ 
  categoryFilter = null, 
  tagFilter = null, 
  vendorFilter = null,
  limit = null,
  title = null,
  showLoadMore = false,
  onProductClick,
  onAddToCart,
  onCartOpen,
  refetchTrigger = 0,
}) => {
  const [products, setProducts] = useState<SupabaseProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const PAGE_SIZE = limit || 12;

  const fetchProducts = async (isLoadMore = false) => {
    try {
      setLoading(true);
      setError(null);
      
      const currentOffset = isLoadMore ? offset : 0;
      
      if (!supabase) {
        // Fallback to mock data if Supabase client is not configured
        let baseData = mockProducts;
        if (vendorFilter) {
            baseData = baseData.filter(p => p.vendor === vendorFilter);
        }
        if (categoryFilter) {
            baseData = baseData.filter(p => p.categories.some(c => c.name === categoryFilter));
        }
        if (tagFilter) {
            baseData = baseData.filter(p => p.tags.some(t => t.name === tagFilter));
        }
        
        const dataToSet = baseData.slice(currentOffset, currentOffset + PAGE_SIZE);

        if (isLoadMore) {
            setProducts(prev => [...prev, ...dataToSet]);
        } else {
            setProducts(dataToSet);
        }
        
        setHasMore(baseData.length > currentOffset + PAGE_SIZE);
        setOffset(currentOffset + PAGE_SIZE);
        setLoading(false);
        return;
      }
      
      const categoriesPart = categoryFilter ? 'product_categories!inner(categories!inner(id, name))' : 'product_categories(categories(id, name))';
      const tagsPart = tagFilter ? 'product_tags!inner(tags!inner(id, name, color))' : 'product_tags(tags(id, name, color))';
      const selectString = `*, ${categoriesPart}, ${tagsPart}`;

      let query = (supabase
        .from('products')
        .select(selectString) as any)
        .eq('is_active', true);
      
      if (vendorFilter) {
        query = query.eq('vendor', vendorFilter);
      }
      
      if (categoryFilter) {
        query = query.eq('product_categories.categories.name', categoryFilter);
      }

      if (tagFilter) {
        query = query.eq('product_tags.tags.name', tagFilter);
      }
      
      const { data, error: fetchError } = await query
        .order('created_at', { ascending: false })
        .range(currentOffset, currentOffset + PAGE_SIZE - 1);
        
      if (fetchError) throw fetchError;

      const transformedData: SupabaseProduct[] = (data || []).map((p: any) => {
        const { product_categories, product_tags, ...rest } = p;
        return {
          ...rest,
          categories: (product_categories || [])
              .map((pc: { categories: Category | null }) => pc.categories)
              .filter((c: Category | null): c is Category => c !== null),
          tags: (product_tags || [])
            .map((pt: { tags: Tag | null }) => pt.tags)
            .filter((t: Tag | null): t is Tag => t !== null),
        };
      });

      if (isLoadMore) {
        setProducts(prev => [...prev, ...transformedData]);
      } else {
        setProducts(transformedData);
      }

      setHasMore(transformedData.length === PAGE_SIZE);
      setOffset(currentOffset + PAGE_SIZE);

    } catch (err: unknown) {
      let errorMessage = 'An unknown error occurred. Please try again.';
      if (typeof err === 'object' && err !== null) {
        if ('message' in err && typeof (err as any).message === 'string') {
          errorMessage = (err as any).message;
        }
      } else if (typeof err === 'string') {
        errorMessage = err;
      }
      setError(errorMessage);
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setProducts([]);
    setOffset(0);
    setHasMore(true);
    fetchProducts(false);
  }, [categoryFilter, tagFilter, vendorFilter, limit, refetchTrigger]);

  const handleLoadMore = () => {
    fetchProducts(true);
  };

  if (loading && products.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 bg-red-50 p-4 rounded-lg">
        <p className="text-red-600 font-semibold">Error al cargar productos:</p>
        <p className="text-red-500 text-sm mt-1">{error}</p>
        <button 
          onClick={() => {
              setProducts([]);
              setOffset(0);
              fetchProducts(false);
          }}
          className="mt-4 bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700"
        >
          Intentar nuevamente
        </button>
      </div>
    );
  }

  return (
    <div className="w-full">
      {title && (
         <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">{title}</h2>
         </div>
      )}
      
      {products.length === 0 && !loading ? (
        <div className="text-center py-8">
          <p className="text-gray-600">No se encontraron productos que coincidan con tu búsqueda.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onProductClick={onProductClick}
                onAddToCart={onAddToCart}
                onCartOpen={onCartOpen}
              />
            ))}
          </div>
          
          {showLoadMore && hasMore && (
            <div className="text-center mt-8">
              <button
                onClick={handleLoadMore}
                disabled={loading}
                className="bg-[#e52e8d] text-white font-bold px-6 py-3 rounded-full hover:bg-[#c82278] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? 'Cargando...' : 'Cargar más productos'}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductsGrid;
