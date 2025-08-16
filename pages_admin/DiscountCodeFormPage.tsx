

import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import type { DiscountCode, Profile, SupabaseProduct } from '../types';
import type { Session, PostgrestSingleResponse, PostgrestResponse } from '@supabase/supabase-js';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Database } from '../lib/database.types';

interface DiscountCodeFormPageProps {
  onCatalogClick: (category?: string) => void;
  onHomeClick: () => void;
  onContactFaqClick: () => void;
  onLegalClick: () => void;
  onAdminProductUploadClick?: () => void;
  onAdminProductManagementClick?: () => void;
  onAdminUserManagementClick?: () => void;
  cartItemCount: number;
  discountCodeIdToEdit?: string | null;
  onFinished: () => void;
  session: Session | null;
  profile: Profile | null;
  onLogout: () => void;
  showAuthModal: (view: 'login' | 'register') => void;
}

type DiscountCodeUpsertData = Omit<DiscountCode, 'id' | 'created_at' | 'times_used'>;

const initialFormState: DiscountCodeUpsertData = {
    code: '',
    discount_type: 'percentage',
    discount_value: 10,
    limitation_type: 'date_range',
    start_date: new Date().toISOString().split('T')[0],
    end_date: new Date(new Date().setDate(new Date().getDate() + 30)).toISOString().split('T')[0],
    usage_limit: null,
    scope: 'cart',
    product_id: null,
    is_active: true,
};

const DiscountCodeFormPage: React.FC<DiscountCodeFormPageProps> = ({ discountCodeIdToEdit, onFinished, ...props }) => {
    const isEditMode = !!discountCodeIdToEdit;
    const [formData, setFormData] = useState<DiscountCodeUpsertData>(initialFormState);
    const [useUsageLimit, setUseUsageLimit] = useState(false);
    const [products, setProducts] = useState<{id: string, name: string}[]>([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    useEffect(() => {
        const fetchRelatedData = async () => {
            if (!supabase) return;
            setLoading(true);

            // Fetch products for the dropdown
            const { data: productsData, error: productsError } = await supabase
                .from('products').select('id, name').order('name');
            if(productsError) setMessage({ type: 'error', text: 'Error al cargar productos: ' + productsError.message });
            else setProducts((productsData as unknown as {id: string, name: string}[]) || []);

            // If editing, fetch the discount code data
            if (isEditMode && discountCodeIdToEdit) {
                const { data, error }: PostgrestSingleResponse<DiscountCode> = await supabase.from('discount_codes').select('*').eq('id', discountCodeIdToEdit).single();
                if (error) {
                    setMessage({ type: 'error', text: 'Error al cargar el código: ' + error.message });
                } else if (data) {
                    setFormData({
                        ...data,
                        start_date: data.start_date ? new Date(data.start_date).toISOString().split('T')[0] : null,
                        end_date: data.end_date ? new Date(data.end_date).toISOString().split('T')[0] : null,
                    });
                    setUseUsageLimit(data.limitation_type === 'usage_limit' && data.usage_limit === null);
                }
            }
            setLoading(false);
        };
        fetchRelatedData();
    }, [discountCodeIdToEdit, isEditMode]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        
        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked;
            if (name === 'is_active') {
                setFormData(prev => ({ ...prev, is_active: checked }));
            } else if (name === 'unlimited_usage') {
                setUseUsageLimit(checked);
                setFormData(prev => ({ ...prev, usage_limit: checked ? null : 50 }));
            }
        } else {
             setFormData(prev => ({ ...prev, [name]: value } as DiscountCodeUpsertData));
        }
    };
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!supabase || !formData.code || !formData.discount_value) {
            setMessage({ type: 'error', text: 'Por favor, completa los campos obligatorios: Código y Valor.' });
            return;
        }
        setLoading(true);
        setMessage(null);

        const dataToUpsert = {
            code: formData.code.toUpperCase(),
            discount_type: formData.discount_type,
            discount_value: Number(formData.discount_value),
            limitation_type: formData.limitation_type,
            scope: formData.scope,
            is_active: formData.is_active,
            // Conditional fields
            usage_limit: formData.limitation_type === 'usage_limit' ? (useUsageLimit ? null : Number(formData.usage_limit)) : null,
            start_date: formData.limitation_type === 'date_range' ? formData.start_date : null,
            end_date: formData.limitation_type === 'date_range' ? formData.end_date : null,
            product_id: formData.scope === 'product' ? formData.product_id : null,
        };

        try {
            const { error } = isEditMode
                ? await supabase.from('discount_codes').update(dataToUpsert).eq('id', discountCodeIdToEdit!)
                : await supabase.from('discount_codes').insert([dataToUpsert]);
            
            if (error) throw error;

            setMessage({ type: 'success', text: `¡Código ${isEditMode ? 'actualizado' : 'creado'} con éxito!` });
            setTimeout(() => onFinished(), 1500);

        } catch (error: any) {
             setMessage({ type: 'error', text: `Error: ${error.message}` });
        } finally {
             setLoading(false);
        }
    };

    const inputClass = "mt-1 block w-full px-4 py-3 bg-slate-100 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors";

    if (loading && !formData.code) {
        return (
             <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-pink-600"></div>
            </div>
        )
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            <Header {...props} cartItemCount={0} onCartClick={() => {}} />
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">{isEditMode ? 'Editar Código de Descuento' : 'Crear Nuevo Código'}</h1>
                    <p className="text-gray-500 mb-8">{isEditMode ? 'Actualiza los detalles del código.' : 'Completa el formulario para crear un nuevo código.'}</p>
                    
                    {message && <div className={`p-4 rounded-md mb-6 text-white ${message.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>{message.text}</div>}
                    
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Basic Info */}
                        <fieldset className="space-y-4 p-4 border rounded-lg">
                            <legend className="font-semibold text-lg px-2">Información Básica</legend>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div><label htmlFor="code" className="block text-sm font-medium text-gray-700">Código *</label><input type="text" name="code" value={formData.code} onChange={handleInputChange} required className={inputClass} placeholder="EJ: BIENVENIDO10" /></div>
                                <div><label htmlFor="discount_type" className="block text-sm font-medium text-gray-700">Tipo de Descuento</label><select name="discount_type" value={formData.discount_type} onChange={handleInputChange} className={inputClass}><option value="percentage">Porcentaje (%)</option><option value="fixed_amount">Monto Fijo (S/)</option></select></div>
                                <div><label htmlFor="discount_value" className="block text-sm font-medium text-gray-700">Valor del Descuento *</label><input type="number" name="discount_value" value={formData.discount_value} onChange={handleInputChange} required step="0.01" className={inputClass} /></div>
                            </div>
                        </fieldset>

                        {/* Limitation */}
                        <fieldset className="space-y-4 p-4 border rounded-lg">
                             <legend className="font-semibold text-lg px-2">Límites y Restricciones</legend>
                             <div><label htmlFor="limitation_type" className="block text-sm font-medium text-gray-700">Limitar por</label><select name="limitation_type" value={formData.limitation_type} onChange={handleInputChange} className={inputClass}><option value="date_range">Rango de Fechas</option><option value="usage_limit">Cantidad de Usos</option></select></div>
                             {formData.limitation_type === 'date_range' && (<div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-slate-50 rounded-md"><div><label htmlFor="start_date" className="block text-sm font-medium text-gray-700">Fecha de Inicio</label><input type="date" name="start_date" value={formData.start_date || ''} onChange={handleInputChange} className={inputClass} /></div><div><label htmlFor="end_date" className="block text-sm font-medium text-gray-700">Fecha de Fin</label><input type="date" name="end_date" value={formData.end_date || ''} onChange={handleInputChange} className={inputClass} /></div></div>)}
                             {formData.limitation_type === 'usage_limit' && (<div className="p-4 bg-slate-50 rounded-md space-y-4"><div><label className="flex items-center gap-2"><input type="checkbox" name="unlimited_usage" checked={useUsageLimit} onChange={handleInputChange} className="h-4 w-4 rounded text-pink-600 focus:ring-pink-500" /><span>Uso Ilimitado</span></label></div>{!useUsageLimit && (<div><label htmlFor="usage_limit" className="block text-sm font-medium text-gray-700">Número de Usos</label><input type="number" name="usage_limit" value={formData.usage_limit || ''} onChange={handleInputChange} className={inputClass} /></div>)}</div>)}
                        </fieldset>

                        {/* Scope */}
                        <fieldset className="space-y-4 p-4 border rounded-lg">
                             <legend className="font-semibold text-lg px-2">Ámbito de Aplicación</legend>
                             <div><label htmlFor="scope" className="block text-sm font-medium text-gray-700">Aplicar a</label><select name="scope" value={formData.scope} onChange={handleInputChange} className={inputClass}><option value="cart">Todo el carrito</option><option value="product">Un producto específico</option></select></div>
                            {formData.scope === 'product' && (<div className="p-4 bg-slate-50 rounded-md">
                                <label htmlFor="product_id" className="block text-sm font-medium text-gray-700">Seleccionar Producto</label>
                                <select name="product_id" value={formData.product_id || ''} onChange={handleInputChange} className={inputClass}>
                                    <option value="">-- Ninguno --</option>
                                    {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                                </select>
                            </div>)}
                        </fieldset>

                        {/* Actions */}
                        <div className="flex items-center justify-between pt-6 border-t">
                            <label className="flex items-center space-x-2"><input type="checkbox" name="is_active" checked={formData.is_active} onChange={handleInputChange} className="h-4 w-4 rounded text-pink-600 focus:ring-pink-500" /><span className="text-sm font-medium text-gray-700">Código Activo</span></label>
                            <button type="submit" disabled={loading} className="inline-flex justify-center py-3 px-8 border border-transparent shadow-sm text-base font-medium rounded-full text-white bg-[#e52e8d] hover:bg-[#c82278] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 disabled:opacity-50">{loading ? 'Guardando...' : isEditMode ? 'Actualizar Código' : 'Guardar Código'}</button>
                        </div>
                    </form>
                </div>
            </main>
            <Footer onLegalClick={props.onLegalClick} onCatalogClick={props.onCatalogClick} onHomeClick={props.onHomeClick} onContactFaqClick={props.onContactFaqClick}/>
        </div>
    );
};

export default DiscountCodeFormPage;
