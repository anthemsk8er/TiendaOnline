import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import type { Profile } from '../types';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import type { Session, PostgrestResponse } from '@supabase/supabase-js';
import type { Database } from '../lib/database.types';

interface UserManagementPageProps {
  onCatalogClick: (category?: string) => void;
  onHomeClick: () => void;
  onContactFaqClick: () => void;
  onLegalClick: () => void;
  onAdminProductUploadClick?: () => void;
  onAdminProductManagementClick?: () => void;
  onAdminUserManagementClick?: () => void;
  session: Session | null;
  profile: Profile | null;
  onLogout: () => void;
  showAuthModal: (view: 'login' | 'register') => void;
  cartItemCount: number;
}

const UserManagementPage: React.FC<UserManagementPageProps> = (props) => {
  const [users, setUsers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);

  const fetchUsers = async () => {
    if (!supabase) {
      setError('Supabase client not available');
      setLoading(false);
      return;
    }
    setLoading(true);
    const { data, error }: PostgrestResponse<Profile> = await supabase
      .from('profiles')
      .select('id, full_name, role');

    if (error) {
      setError(error.message);
    } else {
      setUsers(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId: string, newRole: 'ADMIN' | 'CLIENT') => {
    setMessage(null);
    if (!supabase) {
      setMessage({ type: 'error', text: 'Database client not available.' });
      return;
    }
    
    const { error } = await supabase
      .from('profiles')
      .update({ role: newRole })
      .eq('id', userId);

    if (error) {
      setMessage({ type: 'error', text: `Error al cambiar el rol: ${error.message}` });
    } else {
      setMessage({ type: 'success', text: 'Rol actualizado correctamente.'});
      setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
    }
    setTimeout(() => setMessage(null), 3000);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header {...props} onCartClick={() => { /* No-op for admin pages */ }} />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Gestión de Usuarios</h1>
          </div>

          {message && <div className={`p-3 rounded-md mb-6 text-white text-sm ${message.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>{message.text}</div>}
          
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
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre Completo</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User ID</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rol</th>
                    <th scope="col" className="relative px-6 py-3"><span className="sr-only">Acciones</span></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{user.full_name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.role === 'ADMIN' ? 'bg-pink-100 text-pink-800' : 'bg-gray-100 text-gray-800'}`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-4">
                        {user.role === 'CLIENT' ? (
                          <button onClick={() => handleRoleChange(user.id, 'ADMIN')} className="text-indigo-600 hover:text-indigo-900">Hacer Admin</button>
                        ) : (
                          <button onClick={() => handleRoleChange(user.id, 'CLIENT')} className="text-gray-600 hover:text-gray-900">Hacer Cliente</button>
                        )}
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

export default UserManagementPage;