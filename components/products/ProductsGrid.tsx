


import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import ProductCard from './ProductCard';
import type { SupabaseProduct, Product, Tag, Category } from '../../types';
import type { PostgrestResponse } from '@supabase/supabase-js';
import type { Database } from '../../lib/database.types';

// Mock data to be used when Supabase is not configured
const mockProducts: SupabaseProduct[] = [
    { id: 'mock-1', name: 'Gomitas de Ashwagandha (Mock)', description: 'Reduce el estrés y mejora el ánimo. Configure Supabase para ver productos reales.', price: 89.90, discount_price: 79.90, image_url: 'https://picsum.photos/id/102/400/400', image_url_2: null, image_url_3: null, image_url_4: null, stock: 15, vendor: 'SUPERMOCK™', is_active: true, categories: [{ id: 'cat-sueño', name: 'Sueño' }], tags: [{ id: 'tag-pop', name: 'Popular', color: '#F59E0B' }, { id: 'tag-oferta', name: 'Oferta', color: '#EF4444' }, {id: 'tag-home', name: 'destacados home', color: '#3B82F6'}], accordion_point1_title: 'Mock Title 1', accordion_point1_content: 'Mock content 1', accordion_point2_title: null, accordion_point2_content: null, accordion_point3_title: null, accordion_point3_content: null, accordion_point4_title: null, accordion_point4_content: null, hero_data: null, features_data: null, benefits_data: null, comparison_data: null, faq_data: null, video_with_features_data: null },
    { id: 'mock-2', name: 'Gomitas de Magnesio (Mock)', description: 'Apoya la relajación muscular y el descanso.', price: 69.90, discount_price: null, image_url: 'https://picsum.photos/id/201/400/400', image_url_2: null, image_url_3: null, image_url_4: null, stock: 20, vendor: 'SUPERMOCK™', is_active: true, categories: [{ id: 'cat-sueño', name: 'Sueño' }], tags: [{ id: 'tag-pop', name: 'Popular', color: '#F59E0B' }], accordion_point1_title: null, accordion_point1_content: null, accordion_point2_title: null, accordion_point2_content: null, accordion_point3_title: null, accordion_point3_content: null, accordion_point4_title: null, accordion_point4_content: null, hero_data: null, features_data: null, benefits_data: null, comparison_data: null, faq_data: null, video_with_features_data: null },
    { id: 'mock-3', name: 'Creatina Monohidratada (Mock)', description: 'Aumenta la fuerza y la energía durante el ejercicio.', price: 89.90, discount_price: null, image_url: 'https://picsum.photos/id/202/400/400', image_url_2: null, image_url_3: null, image_url_4: null, stock: 5, vendor: 'SUPERMOCK™', is_active: true, categories: [{ id: 'cat-energia', name: 'Energía' }], tags: [{id: 'tag-home', name: 'destacados home', color: '#3B82F6'}], accordion_point1_title: null, accordion_point1_content: null, accordion_point2_title: null, accordion_point2_content: null, accordion_point3_title: null, accordion_point3_content: null, accordion_point4_title: null, accordion_point4_content: null, hero_data: null, features_data: null, benefits_data: null, comparison_data: null, faq_data: null, video_with_features_data: null },
    { id: 'mock-4', name: 'Vitamina D3+K2 (Mock)', description: 'Fortalece el sistema inmunológico y la salud ósea.', price: 59.90, discount_price: 49.90, image_url: 'https://picsum.photos/id/203/400/400', image_url_2: null, image_url_3: null, image_url_4: null, stock: 0, vendor: 'SUPERMOCK™', is_active: true, categories: [{ id: 'cat-inmunidad', name: 'Inmunidad' }], tags: [{ id: 'tag-oferta', name: 'Oferta', color: '#EF4444' }], accordion_point1_title: null, accordion_point1_content: null, accordion_point2_title: null, accordion_point2_content: null, accordion_point3_title: null, accordion_point3_content: null, accordion_point4_title: null, accordion_point4_content: null, hero_data: null, features_data: null, benefits_data: null, comparison_data: null, faq_data: null, video_with_features_data: null },
    { id: 'mock-5', name: 'Colágeno Hidrolizado (Mock)', description: 'Mejora la salud de la piel, cabello y uñas.', price: 99.90, discount_price: null, image_url: 'https://picsum.photos/id/35/400/400', image_url_2: null, image_url_3: null, image_url_4: null, stock: 30, vendor: 'HEALTHYMOCK', is_active: true, categories: [{ id: 'cat-belleza', name: 'Belleza' }], tags: [], accordion_point1_title: null, accordion_point1_content: null, accordion_point2_title: null, accordion_point2_content: null, accordion_point3_title: null, accordion_point3_content: null, accordion_point4_title: null, accordion_point4_content: null, hero_data: null, features_data: null, benefits_data: null, comparison_data: null, faq_data: null, video_with_features_data: null },
    { id: 'mock-6', name: 'Probióticos Avanzados (Mock)', description: 'Equilibra la flora intestinal para una mejor digestión.', price: 75.50, discount_price: null, image_url: 'https://picsum.photos/id/36/400/400', image_url_2: null, image_url_3: null, image_url_4: null, stock: 12, vendor: 'SUPERMOCK™', is_active: true, categories: [{ id: 'cat-digestion', name: 'Digestión' }], tags: [], accordion_point1_title: null, accordion_point1_content: null, accordion_point2_title: null, accordion_point2_content: null, accordion_point3_title: null, accordion_point3_content: null, accordion_point4_title: null, accordion_point4_content: null, hero_data: null, features_data: null, benefits_data: null, comparison_data: null, faq_data: null, video_with_features_data: null },
    { id: 'mock-7', name: 'Gomitas de Enfoque (Mock)', description: 'Con L-Teanina y Hongo Melena de León.', price: 85.00, discount_price: 75.00, image_url: 'https://picsum.photos/id/32/400/400', image_url_2: null, image_url_3: null, image_url_4: null, stock: 8, vendor: 'SUPERMOCK™', is_active: true, categories: [{ id: 'cat-enfoque', name: 'Enfoque' }], tags: [{ id: 'tag-nuevo', name: 'Nuevo', color: '#10B981' }], accordion_point1_title: null, accordion_point1_content: null, accordion_point2_title: null, accordion_point2_content: null, accordion_point3_title: null, accordion_point3_content: null, accordion_point4_title: null, accordion_point4_content: null, hero_data: null, features_data: null, benefits_data: null, comparison_data: null, faq_data: null, video_with_features_data: null },
    { id: 'mock-8', name: 'Omega 3 de Algas (Mock)', description: 'Fuente vegana de ácidos grasos esenciales.', price: 74.90, discount_price: null, image_url: 'https://picsum.photos/id/204/400/400', image_url_2: null, image_url_3: null, image_url_4: null, stock: 18, vendor: 'HEALTHYMOCK', is_active: true, categories: [{ id: 'cat-salud', name: 'Salud General' }], tags: [], accordion_point1_title: null, accordion_point1_content: null, accordion_point2_title: null, accordion_point2_content: null, accordion_point3_title: null, accordion_point3_content: null, accordion_point4_title: null, accordion_point4_content: null, hero_data: null, features_data: null, benefits_data: null, comparison_data: null, faq_data: null, video_with_features_data: null }
];


interface ProductsGridProps {
  categoryFilter?: string | null;
  tagFilter?: string | null;
  vendorFilter?: string | null;
  limit?: number | null;
  title?: string | null;
  showLoadMore?: boolean;
  onProductClick: (id: string, name: string) => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onCartOpen?: () => void;
  refetchTrigger?: number;
}

type ProductWithRelations = Database['public']['Tables']['products']['Row'] & {
    product_categories: { categories: Category | null }[];
    product_tags: { tags: Tag | null }[];
};


const ProductsGrid: React.FC<ProductsGridProps> = ({ 
  categoryFilter = null, 
  tagFilter = null, 
  vendorFilter = null,
  limit = null,
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

  const PAGE_SIZE = limit && !showLoadMore ? limit : 12;

    const fetchProducts = async (isLoadMore = false) => {
        if (!hasMore && isLoadMore) return;
        try {
            setLoading(true);
            setError(null);
            
            const currentOffset = isLoadMore ? offset : 0;
            
            if (!supabase) {
                // Fallback logic
                let baseData = mockProducts;
                if (vendorFilter) baseData = baseData.filter(p => p.vendor === vendorFilter);
                if (categoryFilter) baseData = baseData.filter(p => p.categories.some(c => c.name === categoryFilter));
                if (tagFilter) baseData = baseData.filter(p => p.tags.some(t => t.name === tagFilter));
                
                const dataToSet = baseData.slice(currentOffset, currentOffset + PAGE_SIZE);
                setProducts(isLoadMore ? prev => [...prev, ...dataToSet] : dataToSet);
                setHasMore(baseData.length > currentOffset + PAGE_SIZE);
                setOffset(currentOffset + PAGE_SIZE);
                setLoading(false);
                return;
            }
            
            const categoriesPart = categoryFilter ? 'product_categories!inner(categories!inner(id, name))' : 'product_categories(categories(id, name))';
            const tagsPart = tagFilter ? 'product_tags!inner(tags!inner(id, name, color))' : 'product_tags(tags(id, name, color))';
            const selectString = `*, ${categoriesPart}, ${tagsPart}`;

            let query = supabase
                .from('products')
                .select(selectString, { count: 'exact' })
                .eq('is_active', true)
                .range(currentOffset, currentOffset + PAGE_SIZE - 1)
                .order('created_at', { ascending: false });

            if (categoryFilter) query = query.eq('product_categories.categories.name', categoryFilter);
            if (tagFilter) query = query.eq('product_tags.tags.name', tagFilter);
            if (vendorFilter) query = query.eq('vendor', vendorFilter);

            const { data, error: fetchError, count } = await query;
            
            if (fetchError) throw fetchError;

            // FIX: Explicitly type `p` as `any` because the dynamic select string breaks TS type inference.
            const transformedData = (data || []).map((p: any) => ({
                ...p,
                tags: (p.product_tags || []).map((pt: any) => pt.tags).filter((t): t is Tag => t !== null),
                categories: (p.product_categories || []).map((pc: any) => pc.categories).filter((c): c is Category => c !== null)
            }));

            setProducts(isLoadMore ? prev => [...prev, ...transformedData] : transformedData);
            setOffset(currentOffset + PAGE_SIZE);
            setHasMore(count ? count > currentOffset + PAGE_SIZE : false);

        } catch (err: any) {
            setError(`Error al cargar productos: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        const loadProducts = async () => {
             // Reset and fetch when filters change.
            setProducts([]);
            setOffset(0);
            setHasMore(true);
            await fetchProducts(false);
        }
        loadProducts();
  }, [categoryFilter, tagFilter, vendorFilter, refetchTrigger]);


  if (loading && products.length === 0) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {[...Array(limit || 8)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg border border-gray-200 overflow-hidden group flex flex-col animate-pulse">
                    <div className="aspect-square bg-gray-200"></div>
                    <div className="p-4 flex flex-col flex-grow">
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
                        <div className="h-10 bg-gray-200 rounded w-full mt-auto"></div>
                    </div>
                </div>
            ))}
        </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-500 py-8">{error}</p>;
  }
  
  if (!loading && products.length === 0) {
    return <p className="text-center text-gray-500 py-8">No se encontraron productos que coincidan con tu búsqueda.</p>;
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
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
        <div className="mt-12 text-center">
          <button
            onClick={() => fetchProducts(true)}
            disabled={loading}
            className="bg-[#2952a3] text-white font-bold py-3 px-8 rounded-full hover:bg-[#1f3e7a] transition-colors disabled:opacity-50"
          >
            {loading ? 'Cargando...' : 'Cargar más productos'}
          </button>
        </div>
      )}
    </>
  );
};
export default ProductsGrid;
