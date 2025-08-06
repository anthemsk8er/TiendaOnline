
import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import type { Review, Profile } from '../types';
import type { Session } from '@supabase/supabase-js';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { CheckIcon, TrashIcon } from '../components/product_detail_page/Icons';

interface ReviewManagementPageProps {
  onCatalogClick: (category?: string) => void;
  onHomeClick: () => void;
  onContactClick: () => void;
  onLegalClick: () => void;
  onAdminProductUploadClick?: () => void;
  onAdminProductManagementClick?: () => void;
  onAdminUserManagementClick?: () => void;
  onAdminReviewManagementClick?: () => void;
  onAdminOrdersClick?: () => void;
  session: Session | null;
  profile: Profile | null;
  onLogout: () => void;
  showAuthModal: (view: 'login' | 'register') => void;
  cartItemCount: number;
}

const ReviewManagementPage: React.FC<ReviewManagementPageProps> = (props) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);

  const fetchReviews = async () => {
    if (!supabase) {
      setError('Supabase client not available');
      setLoading(false);
      return;
    }
    setLoading(true);
    const { data, error: fetchError } = await supabase
      .from('reviews')
      .select('*, products(name)')
      .order('created_at', { ascending: false });

    if (fetchError) {
      if (fetchError.code === '42P01') {
          setError('La tabla "reviews" no existe. Por favor, créala ejecutando el script SQL en tu editor de Supabase para habilitar esta función.');
      } else {
          setError(fetchError.message);
      }
    } else {
      setReviews(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleApprove = async (reviewId: string) => {
    setMessage(null);
    if (!supabase) return;
    const payload = { is_approved: true };
    const { error } = await supabase.from('reviews').update(payload as any).eq('id', reviewId);
    if (error) {
        setMessage({ type: 'error', text: `Error al aprobar: ${error.message}`});
    } else {
        setMessage({ type: 'success', text: 'Comentario aprobado.'});
        setReviews(reviews.map(r => r.id === reviewId ? { ...r, is_approved: true } : r));
    }
  };

  const handleDelete = async (reviewId: string) => {
      if(!window.confirm('¿Estás seguro de que quieres eliminar este comentario permanentemente?')) return;
      setMessage(null);
      if (!supabase) return;
      const { error } = await supabase.from('reviews').delete().eq('id', reviewId);
      if (error) {
          setMessage({ type: 'error', text: `Error al eliminar: ${error.message}`});
      } else {
          setMessage({ type: 'success', text: 'Comentario eliminado.'});
          setReviews(reviews.filter(r => r.id !== reviewId));
      }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header {...props} onCartClick={() => {}} />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Gestión de Comentarios</h1>
          </div>
          
          {message && <div className={`p-3 rounded-md mb-6 text-white text-sm ${message.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>{message.text}</div>}
          {loading && 
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
            </div>
          }
          {error && 
            <div className="bg-red-50 border-l-4 border-red-400 p-4">
                <div className="flex">
                    <div className="py-1">
                        <p className="text-sm text-red-700">{error}</p>
                    </div>
                </div>
            </div>
          }

          {!loading && !error && (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Producto</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Autor</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comentario</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Imagen</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {reviews.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-8 text-center text-sm text-gray-500">
                        No hay comentarios para mostrar.
                      </td>
                    </tr>
                  ) : (
                    reviews.map((review) => (
                      <tr key={review.id}>
                        <td className="px-6 py-4 align-top">
                          <div className="text-sm font-medium text-gray-900 w-40 truncate">{review.products?.name}</div>
                          <div className="text-xs text-gray-500">{new Date(review.created_at).toLocaleDateString()}</div>
                        </td>
                        <td className="px-6 py-4 align-top">
                           <div className="text-sm font-medium text-gray-900">{review.author_name}</div>
                           <div className="text-xs text-gray-500">{review.author_province}</div>
                        </td>
                        <td className="px-6 py-4 align-top">
                           <p className="text-sm text-gray-700 w-64 whitespace-normal">{review.comment}</p>
                           <div className="text-yellow-500 mt-1">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</div>
                        </td>
                        <td className="px-6 py-4 align-top">
                          {review.image_url && <img src={review.image_url} alt="Review" className="w-20 h-20 object-cover rounded-md" width="80" height="80"/>}
                        </td>
                         <td className="px-6 py-4 align-top">
                           <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${review.is_approved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                             {review.is_approved ? 'Aprobado' : 'Pendiente'}
                           </span>
                        </td>
                        <td className="px-6 py-4 align-top whitespace-nowrap text-sm font-medium space-y-2">
                          {!review.is_approved && (
                              <button onClick={() => handleApprove(review.id)} className="w-full flex items-center justify-center gap-1 bg-green-500 text-white px-3 py-1.5 rounded-md hover:bg-green-600 text-xs">
                                  <CheckIcon className="w-4 h-4"/> Aprobar
                              </button>
                          )}
                          <button onClick={() => handleDelete(review.id)} className="w-full flex items-center justify-center gap-1 bg-red-500 text-white px-3 py-1.5 rounded-md hover:bg-red-600 text-xs">
                              <TrashIcon className="w-4 h-4"/> Eliminar
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
      <Footer {...props} />
    </div>
  );
};

export default ReviewManagementPage;
