
import React, { useState, useEffect } from 'react';
import type { Review } from '../../types';
import { supabase } from '../../lib/supabaseClient';
import ReviewCard from './ReviewCard';
import type { PostgrestError } from '@supabase/supabase-js';

interface ProductReviewsSectionProps {
  productId: string;
}

const ProductReviewsSection: React.FC<ProductReviewsSectionProps> = ({ productId }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFeatureReady, setIsFeatureReady] = useState(true); // Assume it's ready initially

  useEffect(() => {
    const fetchReviews = async () => {
      if (!productId || !supabase) {
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);

      try {
        // Fetch only approved reviews for the given product
        const { data, error: fetchError } = await supabase
          .from('reviews')
          .select('*')
          .eq('product_id', productId)
          .eq('is_approved', true)
          .order('created_at', { ascending: false });

        if (fetchError) {
          // "42P01" is the error code for a missing table in PostgreSQL
          if (fetchError.code === '42P01') {
              console.warn('Reviews feature not ready: "reviews" table is missing.');
              setIsFeatureReady(false); // Hide the component if table doesn't exist
          } else {
              throw fetchError;
          }
        } else {
          setReviews((data as Review[]) || []);
          setIsFeatureReady(true);
        }

      } catch (err: any) {
        setError(`Error al cargar los comentarios: ${err.message}`);
        console.error('Error fetching reviews:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [productId]);

  if (!isFeatureReady) {
    return null; // Don't render the section if the table is missing
  }

  return (
    <section className="bg-gray-50 py-16 lg:py-24 mt-16 lg:mt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-12 animate-fade-in-up">
          Comentarios de Nuestros Clientes
        </h2>
        
        {loading && (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
          </div>
        )}

        {error && (
          <div className="text-center text-red-500 bg-red-50 p-4 rounded-lg">
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && reviews.length > 0 && (
          <div className="max-w-4xl mx-auto space-y-8">
            {reviews.map(review => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        )}

        {!loading && !error && reviews.length === 0 && (
          <div className="text-center text-gray-500 bg-white p-8 rounded-lg shadow-sm">
            <p>Este producto aún no tiene comentarios. ¡Sé el primero en dejar uno!</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductReviewsSection;
