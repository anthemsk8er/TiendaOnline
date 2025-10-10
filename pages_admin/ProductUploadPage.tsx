
import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabaseClient';
import type { SupabaseProduct, Profile, Category, Tag, ProductHighlightsData, PromotionsData, PromotionCard, PromotionPill } from '../types';
import type { Session } from '@supabase/supabase-js';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import RichTextSection from '../components/product_detail_page/RichTextSection';

interface ProductUploadPageProps {
  onCatalogClick: (category?: string) => void;
  onHomeClick: () => void;
  onContactFaqClick: () => void;
  onLegalClick: () => void;
  onAdminProductUploadClick?: () => void;
  onAdminProductManagementClick?: () => void;
  onAdminUserManagementClick?: () => void;
  onAdminOrdersClick?: () => void;
  onAdminDiscountManagementClick?: () => void;
  onAdminReviewManagementClick?: () => void;
  onAdminWelcomePageClick?: () => void;
  productIdToEdit?: string | null;
  onFinished: () => void;
  session: Session | null;
  profile: Profile | null;
  onLogout: () => void;
  showAuthModal: (view: 'login' | 'register') => void;
  cartItemCount: number;
  onViewProduct: (slug: string) => void;
}

// Omit fields that are auto-generated or handled separately
type ProductFormData = Omit<SupabaseProduct, 'id' | 'created_at' | 'categories' | 'tags'>;

const initialFormState: ProductFormData = {
  name: '',
  slug: '',
  vendor: '',
  description: '',
  price: 0,
  discount_price: null,
  stock: 0,
  image_url: '',
  image_url_2: null,
  image_url_3: null,
  image_url_4: null,
  image_url_5: null,
  image_url_6: null,
  image_url_7: null,
  image_url_8: null,
  image_url_9: null,
  image_url_10: null,
  is_active: true,
  benefit1_title: null,
  benefit1_description: null,
  benefit2_title: null,
  benefit2_description: null,
  benefit3_title: null,
  benefit3_description: null,
  benefit4_title: null,
  benefit4_description: null,
  accordion_point1_title: null,
  accordion_point1_content: null,
  accordion_point2_title: null,
  accordion_point2_content: null,
  accordion_point3_title: null,
  accordion_point3_content: null,
  accordion_point4_title: null,
  accordion_point4_content: null,
  desktop_content: null,
  mobile_content: null,
  video_url: null,
  hero_data: null,
  features_data: null,
  benefits_data: null,
  comparison_data: null,
  faq_data: null,
  video_with_features_data: null,
  highlights_data: null,
  promotions_data: null,
};

const initialHighlightsState: ProductHighlightsData = {
    stats: [
        { value: '', label: '', sublabel: '' },
        { value: '', label: '', sublabel: '' },
        { value: '', label: '', sublabel: '' },
    ],
    info_points: [],
    guarantees: [],
};

const initialPromotionsState: PromotionsData = {
    title: 'Aprovecha las Ofertas Exclusivas',
    subtitle: 'Oferta especial por tiempo limitado. ¡No te quedes sin el tuyo!',
    countdownEndDate: new Date(new Date().setDate(new Date().getDate() + 3)).toISOString(),
    promotions: [
        { id: 1, isBestDeal: false, pills: [{ text: '-20% dcto', icon: 'sparkles' }], imageUrl: '', price: 0, originalPrice: 0, title: 'Comprar 1 unidad', subtitle: '', pricePerUnitText: null, buttonText: 'Lo Quiero', footerText: 'Envío S/10' },
        { id: 2, isBestDeal: false, pills: [{ text: '-25% dcto', icon: 'sparkles' }], imageUrl: '', price: 0, originalPrice: 0, title: 'Comprar 2 unidades', subtitle: 'S/ 0.00 por frasco', pricePerUnitText: null, buttonText: 'Lo Quiero', footerText: null },
        { id: 3, isBestDeal: true, pills: [{ text: 'MEJOR PRECIO', icon: 'check' }, { text: '-63% dcto', icon: 'sparkles' }], imageUrl: '', price: 0, originalPrice: 0, title: 'Comprar 3 unidades', subtitle: null, pricePerUnitText: 'S/ 0.00 POR FRASCO', buttonText: '¡Aprovechar Oferta!', footerText: 'Envío gratis a todo el Perú' },
    ]
};

const jsonToString = (json: any) => json ? JSON.stringify(json, null, 2) : '';

// Helper function to upload files to Supabase Storage
const uploadFile = async (file: File): Promise<string> => {
    if (!supabase) throw new Error("Supabase client is not available.");

    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `img/products/${fileName}`;

    const { error: uploadError } = await supabase.storage
        .from('products')
        .upload(filePath, file);

    if (uploadError) {
        throw uploadError;
    }

    const { data } = supabase.storage
        .from('products')
        .getPublicUrl(filePath);

    return data.publicUrl;
};

const createSlug = (text: string) => text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text


// Reusable Image Upload Component
const ImageUploadField: React.FC<{ label: string, value: string | null | undefined, onUpload: (url: string) => void, onClear: () => void }> = ({ label, value, onUpload, onClear }) => {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setUploading(true);
        setError(null);
        try {
            const publicUrl = await uploadFile(file);
            onUpload(publicUrl);
        } catch (err: any) {
            setError(err.message || 'Error al subir la imagen.');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div>
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            <div className="mt-1 flex items-center gap-4 p-2 border border-gray-300 rounded-md bg-slate-50 min-h-[72px]">
                {value ? (
                    <img src={value} alt="Preview" className="w-16 h-16 object-cover rounded-md" />
                ) : (
                    <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center text-xs text-gray-500 text-center">Sin imagen</div>
                )}
                <div className="flex-grow">
                    {uploading ? (
                        <div className="text-sm text-gray-500">Subiendo...</div>
                    ) : (
                        <div className="flex flex-col gap-1">
                            <button type="button" onClick={() => fileInputRef.current?.click()} className="text-sm bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1.5 px-3 border border-gray-300 rounded-md shadow-sm">
                                {value ? 'Cambiar' : 'Subir Imagen'}
                            </button>
                            {value && (
                                <button type="button" onClick={onClear} className="text-xs text-red-600 hover:text-red-800 text-left">
                                    Eliminar
                                </button>
                            )}
                        </div>
                    )}
                    <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
                </div>
            </div>
             {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    );
};


export const ProductUploadPage: React.FC<ProductUploadPageProps> = ({ productIdToEdit, onFinished, ...props }) => {
    const isEditMode = !!productIdToEdit;
    const [formData, setFormData] = useState<ProductFormData>(initialFormState);
    const [highlightsData, setHighlightsData] = useState<ProductHighlightsData>(initialHighlightsState);
    const [promotionsData, setPromotionsData] = useState<PromotionsData>(initialPromotionsState);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [allCategories, setAllCategories] = useState<Category[]>([]);
    const [allTags, setAllTags] = useState<Tag[]>([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const [activeSection, setActiveSection] = useState('basic-info');
    const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

    const [toastMessage, setToastMessage] = useState('');
    const [isToastVisible, setIsToastVisible] = useState(false);
    const toastTimerRef = useRef<number | null>(null);

    const [newCategoryName, setNewCategoryName] = useState('');
    const [newTagName, setNewTagName] = useState('');
    const [newTagColor, setNewTagColor] = useState('#CCCCCC');

    useEffect(() => {
        const fetchRelatedData = async () => {
            if (!supabase) return;
            setLoading(true);

            const { data: categoriesData, error: categoriesError } = await supabase.from('categories').select('*');
            if(categoriesError) setMessage({ type: 'error', text: 'Error al cargar categorías: ' + categoriesError.message });
            else setAllCategories((categoriesData || []).sort((a, b) => a.name.localeCompare(b.name)));

            const { data: tagsData, error: tagsError } = await supabase.from('tags').select('*');
            if(tagsError) setMessage({ type: 'error', text: 'Error al cargar etiquetas: ' + tagsError.message });
            else setAllTags((tagsData || []).sort((a, b) => a.name.localeCompare(b.name)));

            if (isEditMode && productIdToEdit) {
                const { data: productData, error: productError } = await supabase
                .from('products')
                .select('*, product_categories(categories(id)), product_tags(tags(id))')
                .eq('id', productIdToEdit)
                .single();
                
                if (productError) {
                    setMessage({ type: 'error', text: 'Error al cargar el producto: ' + productError.message });
                } else if (productData) {
                    const { product_categories, product_tags, highlights_data, promotions_data, ...rest } = productData as any;
                    setFormData(rest);

                    if (highlights_data) {
                        setHighlightsData({
                            ...initialHighlightsState,
                            ...highlights_data,
                            stats: (highlights_data.stats && highlights_data.stats.length === 3) ? highlights_data.stats : initialHighlightsState.stats,
                        });
                    } else {
                        setHighlightsData(initialHighlightsState);
                    }
                    
                    if (promotions_data) {
                        const loadedPromos = promotions_data as unknown as PromotionsData;
                        const promotionsToMerge = Array.isArray(loadedPromos.promotions) ? loadedPromos.promotions : [];
                        const mergedPromos = initialPromotionsState.promotions.map(initialPromo => {
                            const loadedPromo = promotionsToMerge.find(p => p.id === initialPromo.id);
                            
                            if (loadedPromo) {
                                const newPromo = { ...initialPromo, ...loadedPromo };
                                const loadedPills = Array.isArray(loadedPromo.pills) ? loadedPromo.pills : [];
                                newPromo.pills = initialPromo.pills.map((initialPill, index) => {
                                    return loadedPills[index] ? { ...initialPill, ...loadedPills[index] } : initialPill;
                                });
                                return newPromo;
                            }
                            
                            return initialPromo;
                        });
                        setPromotionsData({ ...initialPromotionsState, ...loadedPromos, promotions: mergedPromos });
                    } else {
                        setPromotionsData(initialPromotionsState);
                    }

                    setSelectedCategories(product_categories.map((pc: any) => pc.categories.id));
                    setSelectedTags(product_tags.map((pt: any) => pt.tags.id));
                }
            } else {
                setFormData(initialFormState);
                setHighlightsData(initialHighlightsState);
                setPromotionsData(initialPromotionsState);
                setSelectedCategories([]);
                setSelectedTags([]);
            }
            setLoading(false);
        };

        fetchRelatedData();
    }, [productIdToEdit, isEditMode]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { rootMargin: '-25% 0px -75% 0px', threshold: 0 }
        );

        const currentRefs = sectionRefs.current;
        Object.values(currentRefs).forEach((ref) => {
            if (ref) observer.observe(ref);
        });

        return () => {
            Object.values(currentRefs).forEach((ref) => {
                if (ref) observer.unobserve(ref);
            });
        };
    }, [loading]);
    
    useEffect(() => {
        return () => {
            if (toastTimerRef.current) {
                clearTimeout(toastTimerRef.current);
            }
        };
    }, []);

    const handleCategorySelectionChange = (categoryId: string) => {
        setSelectedCategories(prev => 
            prev.includes(categoryId)
                ? prev.filter(id => id !== categoryId)
                : [...prev, categoryId]
        );
    };

    const handleTagSelectionChange = (tagId: string) => {
        setSelectedTags(prev => 
            prev.includes(tagId)
                ? prev.filter(id => id !== tagId)
                : [...prev, tagId]
        );
    };
    
    const handleAddNewCategory = async () => {
        const name = newCategoryName.trim();
        if (!name || !supabase) return;
        if (allCategories.some(c => c.name.toLowerCase() === name.toLowerCase())) {
            setMessage({ type: 'error', text: 'Esta categoría ya existe.' });
            return;
        }

        const { data, error } = await supabase.from('categories').insert({ name }).select().single();
        if (error) {
            setMessage({ type: 'error', text: `Error al crear categoría: ${error.message}` });
        } else if (data) {
            setAllCategories(prev => [...prev, data].sort((a, b) => a.name.localeCompare(b.name)));
            setSelectedCategories(prev => [...prev, data.id]);
            setNewCategoryName('');
        }
    };
    
    const handleAddNewTag = async () => {
        const name = newTagName.trim();
        if (!name || !supabase) return;
        if (allTags.some(t => t.name.toLowerCase() === name.toLowerCase())) {
            setMessage({ type: 'error', text: 'Esta etiqueta ya existe.' });
            return;
        }
        
        const { data, error } = await supabase.from('tags').insert({ name, color: newTagColor }).select().single();
        if (error) {
            setMessage({ type: 'error', text: `Error al crear etiqueta: ${error.message}` });
        } else if (data) {
            setAllTags(prev => [...prev, data].sort((a, b) => a.name.localeCompare(b.name)));
            setSelectedTags(prev => [...prev, data.id]);
            setNewTagName('');
            setNewTagColor('#CCCCCC');
        }
    };
    
    const handleHighlightChange = (section: keyof ProductHighlightsData, index: number, field: string, value: string) => {
        setHighlightsData(prev => {
            const newSection = [...prev[section]] as any[];
            newSection[index] = { ...newSection[index], [field]: value };
            return { ...prev, [section]: newSection };
        });
    };

    const addHighlightItem = (section: 'info_points' | 'guarantees') => {
        setHighlightsData(prev => {
            const newItem = section === 'info_points' 
                ? { icon_url: '', title: '', subtitle: '' } 
                : { text: '' };
            return { ...prev, [section]: [...prev[section], newItem] };
        });
    };

    const removeHighlightItem = (section: 'info_points' | 'guarantees', index: number) => {
        setHighlightsData(prev => ({
            ...prev,
            [section]: prev[section].filter((_, i) => i !== index),
        }));
    };
    
    const handlePromotionsChange = (promoIndex: number, field: keyof PromotionCard, value: any) => {
        setPromotionsData(prev => {
            const newPromos = [...prev.promotions];
            (newPromos[promoIndex] as any)[field] = value;
            return { ...prev, promotions: newPromos };
        });
    };

    const handlePillChange = (promoIndex: number, pillIndex: number, field: keyof PromotionPill, value: string) => {
        setPromotionsData(prev => {
            const newPromos = [...prev.promotions];
            const newPills = [...newPromos[promoIndex].pills];
            (newPills[pillIndex] as any)[field] = value;
            newPromos[promoIndex] = { ...newPromos[promoIndex], pills: newPills };
            return { ...prev, promotions: newPromos };
        });
    };


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
            setFormData(prev => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value === '' ? null : value }));
        }
    };
    
    const handleJsonChange = (field: keyof ProductFormData, value: string) => {
        try {
            const jsonValue = value ? JSON.parse(value) : null;
            setFormData(prev => ({ ...prev, [field]: jsonValue }));
            if (message?.text.includes(field)) setMessage(null);
        } catch (error) {
            setMessage({ type: 'error', text: `JSON inválido en el campo ${field}.` });
        }
    };
    
    const handleSubmit = async (e: React.FormEvent, andView: boolean = false) => {
        e.preventDefault();
        if (!supabase) {
            setMessage({ type: 'error', text: 'Cliente Supabase no disponible.' });
            return;
        }
        setLoading(true);
        setMessage(null);

        const productPayload = { ...formData };
        productPayload.price = Number(productPayload.price);
        productPayload.discount_price = productPayload.discount_price ? Number(productPayload.discount_price) : null;
        productPayload.stock = Number(productPayload.stock);
        productPayload.highlights_data = highlightsData as any;
        productPayload.promotions_data = promotionsData as any;
    
        try {
            let productId = productIdToEdit;
            const wasInCreateMode = !isEditMode;

            if (isEditMode) {
                const { error } = await supabase.from('products').update(productPayload).eq('id', productId!);
                if (error) throw error;
            } else {
                const { data, error } = await supabase.from('products').insert(productPayload).select('id').single();
                if (error) throw error;
                productId = data.id;
            }

            if (!productId) throw new Error("No se pudo obtener el ID del producto.");

            await supabase.from('product_categories').delete().eq('product_id', productId);
            if (selectedCategories.length > 0) {
                const categoryRelations = selectedCategories.map(catId => ({ product_id: productId!, category_id: catId }));
                const { error: catError } = await supabase.from('product_categories').insert(categoryRelations);
                if (catError) throw catError;
            }

            await supabase.from('product_tags').delete().eq('product_id', productId);
            if (selectedTags.length > 0) {
                const tagRelations = selectedTags.map(tagId => ({ product_id: productId!, tag_id: tagId }));
                const { error: tagError } = await supabase.from('product_tags').insert(tagRelations);
                if (tagError) throw tagError;
            }
            
            if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
            setToastMessage('Cambios realizados');
            setIsToastVisible(true);
            toastTimerRef.current = window.setTimeout(() => setIsToastVisible(false), 5000);
            
            if (andView && productPayload.slug) {
                props.onViewProduct(productPayload.slug);
            } else if (wasInCreateMode && productId) {
                window.location.hash = `admin/productos/editar/${productId}`;
            }

        } catch (error: any) {
            setMessage({ type: 'error', text: `Error: ${error.message}` });
        } finally {
            setLoading(false);
        }
    };
    
    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
        e.preventDefault();
        sectionRefs.current[sectionId]?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
    };
    
    const sections = [
        { id: 'basic-info', title: 'Información Básica' },
        { id: 'pricing-stock', title: 'Precio y Stock' },
        { id: 'media-relations', title: 'Imágenes y Relaciones' },
        { id: 'highlights-section', title: 'Highlights del Producto'},
        { id: 'promotions-section', title: 'Promociones del Producto' },
        { id: 'main-benefits', title: 'Beneficios Principales' },
        { id: 'accordion-details', title: 'Acordeón de Detalles' },
        { id: 'rich-content', title: 'Contenido Enriquecido' },
        { id: 'json-data', title: 'Datos Estructurados' },
        { id: 'actions', title: 'Guardar' },
    ];
    
    const navLinkClasses = (id: string) => 
        `block w-full text-left whitespace-nowrap py-2 px-3 text-sm font-medium rounded-md transition-colors ${
          activeSection === id
            ? 'bg-pink-100 text-pink-700'
            : 'text-gray-600 hover:bg-gray-100'
        }`;

    const inputClass = "mt-1 block w-full px-4 py-3 bg-slate-100 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors";
    const textAreaClass = `${inputClass} min-h-[100px]`;
    const jsonTextAreaClass = `${inputClass} min-h-[200px] font-mono text-sm`;

    if (loading && !formData.name) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-pink-600"></div>
            </div>
        )
    }

    const imageKeys: (keyof ProductFormData)[] = [
        'image_url', 'image_url_2', 'image_url_3', 'image_url_4', 'image_url_5',
        'image_url_6', 'image_url_7', 'image_url_8', 'image_url_9', 'image_url_10'
    ];

    return (
        <div className="bg-gray-50 min-h-screen">
            <Header {...props} cartItemCount={0} onCartClick={() => {}} />
            
            <div 
                className={`fixed top-24 right-5 bg-green-600 text-white font-semibold py-3 px-6 rounded-lg shadow-xl z-[60] transition-all duration-300 ease-in-out transform ${isToastVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5 pointer-events-none'}`}
                role="alert"
                aria-live="assertive"
            >
                {toastMessage}
            </div>

            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">{isEditMode ? 'Editar Producto' : 'Subir Nuevo Producto'}</h1>
                    <p className="text-gray-500 mb-8">{isEditMode ? `Actualiza los detalles para "${formData.name}".` : 'Completa el formulario para agregar un nuevo producto al catálogo.'}</p>
                    
                     <div className="lg:grid lg:grid-cols-4 lg:gap-12">
                        <aside className="hidden lg:block lg:col-span-1 lg:sticky top-24 self-start">
                           <nav className="flex flex-col gap-1 p-2 bg-white rounded-xl shadow-sm border">
                                {sections.map(section => (
                                    <a key={section.id} href={`#${section.id}`} onClick={(e) => handleNavClick(e, section.id)} className={navLinkClasses(section.id)}>
                                        {section.title}
                                    </a>
                                ))}
                           </nav>
                        </aside>

                        <div className="lg:col-span-3">
                            {message && <div className={`p-4 rounded-md mb-6 text-white ${message.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>{message.text}</div>}
                            <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-8 bg-white p-8 rounded-lg shadow-md">
                                <fieldset id="basic-info" ref={el => { sectionRefs.current['basic-info'] = el as HTMLElement | null; }} className="space-y-4 p-4 border rounded-lg scroll-mt-24">
                                    <legend className="font-semibold text-lg px-2">Información Básica</legend>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div><label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre del Producto *</label><input type="text" name="name" value={formData.name} onChange={handleInputChange} required className={inputClass} /></div>
                                        <div><label htmlFor="vendor" className="block text-sm font-medium text-gray-700">Vendedor / Marca *</label><input type="text" name="vendor" value={formData.vendor} onChange={handleInputChange} required className={inputClass} /></div>
                                    </div>
                                    <div>
                                        <label htmlFor="slug" className="block text-sm font-medium text-gray-700">Slug del Producto (URL) *</label>
                                        <div className="flex items-center gap-2 mt-1">
                                            <input type="text" name="slug" value={formData.slug || ''} onChange={handleInputChange} required className={inputClass + ' mt-0'} placeholder="ejemplo-nombre-producto" />
                                            <button type="button" onClick={() => setFormData(p => ({...p, slug: createSlug(p.name)}))} className="px-4 py-3 bg-gray-200 text-gray-700 text-sm font-semibold rounded-md hover:bg-gray-300 transition">Generar</button>
                                        </div>
                                    </div>
                                    <div><label htmlFor="description" className="block text-sm font-medium text-gray-700">Descripción Corta *</label><textarea name="description" value={formData.description} onChange={handleInputChange} required className={textAreaClass}></textarea></div>
                                </fieldset>
                                
                                <fieldset id="pricing-stock" ref={el => { sectionRefs.current['pricing-stock'] = el as HTMLElement | null; }} className="space-y-4 p-4 border rounded-lg scroll-mt-24">
                                    <legend className="font-semibold text-lg px-2">Precio y Stock</legend>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div><label htmlFor="price" className="block text-sm font-medium text-gray-700">Precio Regular (S/) *</label><input type="number" name="price" value={formData.price} onChange={handleInputChange} required step="0.01" className={inputClass} /></div>
                                        <div><label htmlFor="discount_price" className="block text-sm font-medium text-gray-700">Precio con Descuento (S/)</label><input type="number" name="discount_price" value={formData.discount_price ?? ''} onChange={handleInputChange} step="0.01" className={inputClass} /></div>
                                        <div><label htmlFor="stock" className="block text-sm font-medium text-gray-700">Stock *</label><input type="number" name="stock" value={formData.stock} onChange={handleInputChange} required className={inputClass} /></div>
                                    </div>
                                </fieldset>

                                <fieldset id="media-relations" ref={el => { sectionRefs.current['media-relations'] = el as HTMLElement | null; }} className="space-y-4 p-4 border rounded-lg scroll-mt-24">
                                    <legend className="font-semibold text-lg px-2">Imágenes, Video y Relaciones</legend>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {imageKeys.map((key, i) => (
                                            <ImageUploadField
                                                key={key}
                                                label={`Imagen ${i + 1}${i === 0 ? ' (Principal) *' : ''}`}
                                                value={formData[key] as string | null}
                                                onUpload={(url) => setFormData(prev => ({ ...prev, [key]: url }))}
                                                onClear={() => setFormData(prev => ({ ...prev, [key]: null }))}
                                            />
                                        ))}
                                        <div><label htmlFor="video_url" className="block text-sm font-medium text-gray-700">URL Video (YouTube)</label><input type="url" name="video_url" value={formData.video_url ?? ''} onChange={handleInputChange} className={inputClass} /></div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Categorías</label>
                                            <div className="mt-1 p-3 border border-gray-300 rounded-md bg-slate-50 max-h-48 overflow-y-auto space-y-2">
                                                {allCategories.map(category => (
                                                    <div key={category.id} className="flex items-center">
                                                        <input
                                                            id={`category-${category.id}`}
                                                            type="checkbox"
                                                            checked={selectedCategories.includes(category.id)}
                                                            onChange={() => handleCategorySelectionChange(category.id)}
                                                            className="h-4 w-4 rounded text-pink-600 focus:ring-pink-500 border-gray-300"
                                                        />
                                                        <label htmlFor={`category-${category.id}`} className="ml-3 text-sm text-gray-700">{category.name}</label>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="mt-2 flex gap-2">
                                                <input
                                                    type="text"
                                                    value={newCategoryName}
                                                    onChange={(e) => setNewCategoryName(e.target.value)}
                                                    placeholder="Nueva categoría"
                                                    className={`${inputClass} mt-0 flex-grow`}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={handleAddNewCategory}
                                                    className="px-4 py-2 bg-gray-600 text-white text-sm font-semibold rounded-md hover:bg-gray-700 transition"
                                                >
                                                    Añadir
                                                </button>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Etiquetas</label>
                                            <div className="mt-1 p-3 border border-gray-300 rounded-md bg-slate-50 max-h-48 overflow-y-auto space-y-2">
                                                {allTags.map(tag => (
                                                    <div key={tag.id} className="flex items-center">
                                                        <input
                                                            id={`tag-${tag.id}`}
                                                            type="checkbox"
                                                            checked={selectedTags.includes(tag.id)}
                                                            onChange={() => handleTagSelectionChange(tag.id)}
                                                            className="h-4 w-4 rounded text-pink-600 focus:ring-pink-500 border-gray-300"
                                                        />
                                                        <label htmlFor={`tag-${tag.id}`} className="ml-3 text-sm text-gray-700 flex items-center gap-2">
                                                            {tag.name}
                                                            <span className="w-4 h-4 rounded-full border border-gray-200" style={{ backgroundColor: tag.color }}></span>
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="mt-2 flex gap-2">
                                                <input
                                                    type="text"
                                                    value={newTagName}
                                                    onChange={(e) => setNewTagName(e.target.value)}
                                                    placeholder="Nueva etiqueta"
                                                    className={`${inputClass} mt-0 flex-grow`}
                                                />
                                                <input
                                                    type="color"
                                                    value={newTagColor}
                                                    onChange={(e) => setNewTagColor(e.target.value)}
                                                    className="p-1 h-11 w-12 block bg-slate-100 border border-gray-300 cursor-pointer rounded-md"
                                                    title="Seleccionar color"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={handleAddNewTag}
                                                    className="px-4 py-2 bg-gray-600 text-white text-sm font-semibold rounded-md hover:bg-gray-700 transition"
                                                >
                                                    Añadir
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </fieldset>

                                <fieldset id="highlights-section" ref={el => { sectionRefs.current['highlights-section'] = el as HTMLElement | null; }} className="space-y-6 p-4 border rounded-lg scroll-mt-24">
                                    <legend className="font-semibold text-lg px-2">Highlights del Producto</legend>
                                    <div className="space-y-2 p-3 bg-gray-50 rounded-md">
                                        <h4 className="font-medium text-gray-800">Estadísticas (3 recuadros)</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            {highlightsData.stats.map((stat, i) => (
                                                <div key={i} className="p-3 border rounded bg-white space-y-2">
                                                    <input type="text" placeholder="Número (ej: 90)" value={stat.value} onChange={(e) => handleHighlightChange('stats', i, 'value', e.target.value)} className={inputClass} />
                                                    <input type="text" placeholder="Línea 1 (ej: gomitas)" value={stat.label} onChange={(e) => handleHighlightChange('stats', i, 'label', e.target.value)} className={inputClass} />
                                                    <input type="text" placeholder="Línea 2 (ej: POR FRASCO)" value={stat.sublabel} onChange={(e) => handleHighlightChange('stats', i, 'sublabel', e.target.value)} className={inputClass} />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="space-y-2 p-3 bg-gray-50 rounded-md">
                                        <h4 className="font-medium text-gray-800">Puntos de Información (con icono)</h4>
                                        {highlightsData.info_points.map((point, i) => (
                                            <div key={i} className="flex items-end gap-3 p-3 border rounded bg-white">
                                                <div className="flex-grow space-y-2">
                                                    <ImageUploadField
                                                        label="Icono"
                                                        value={point.icon_url}
                                                        onUpload={(url) => handleHighlightChange('info_points', i, 'icon_url', url)}
                                                        onClear={() => handleHighlightChange('info_points', i, 'icon_url', '')}
                                                    />
                                                    <input type="text" placeholder="Título (ej: Sabor)" value={point.title} onChange={(e) => handleHighlightChange('info_points', i, 'title', e.target.value)} className={inputClass} />
                                                    <input type="text" placeholder="Subtítulo (ej: Frutos del bosque)" value={point.subtitle} onChange={(e) => handleHighlightChange('info_points', i, 'subtitle', e.target.value)} className={inputClass} />
                                                </div>
                                                <button type="button" onClick={() => removeHighlightItem('info_points', i)} className="text-red-500 hover:text-red-700 font-bold px-3 py-2 text-sm">X</button>
                                            </div>
                                        ))}
                                        <button type="button" onClick={() => addHighlightItem('info_points')} className="text-sm bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md mt-2">+ Añadir Punto</button>
                                    </div>
                                    <div className="space-y-2 p-3 bg-gray-50 rounded-md">
                                        <h4 className="font-medium text-gray-800">Garantías (con checkbox)</h4>
                                        {highlightsData.guarantees.map((guarantee, i) => (
                                            <div key={i} className="flex items-center gap-3 p-3 border rounded bg-white">
                                                <input type="text" placeholder="Texto de la garantía" value={guarantee.text} onChange={(e) => handleHighlightChange('guarantees', i, 'text', e.target.value)} className={`${inputClass} flex-grow`} />
                                                <button type="button" onClick={() => removeHighlightItem('guarantees', i)} className="text-red-500 hover:text-red-700 font-bold px-3 py-2 text-sm">X</button>
                                            </div>
                                        ))}
                                        <button type="button" onClick={() => addHighlightItem('guarantees')} className="text-sm bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md mt-2">+ Añadir Garantía</button>
                                    </div>
                                </fieldset>

                                <fieldset id="promotions-section" ref={el => { sectionRefs.current['promotions-section'] = el as HTMLElement | null; }} className="space-y-6 p-4 border rounded-lg scroll-mt-24">
                                    <legend className="font-semibold text-lg px-2">Promociones del Producto</legend>
                                    <div className="space-y-2">
                                        <div><label className="block text-sm font-medium text-gray-700">Título Principal</label><input type="text" value={promotionsData.title} onChange={(e) => setPromotionsData(p => ({ ...p, title: e.target.value }))} className={inputClass} /></div>
                                        <div><label className="block text-sm font-medium text-gray-700">Subtítulo</label><input type="text" value={promotionsData.subtitle} onChange={(e) => setPromotionsData(p => ({ ...p, subtitle: e.target.value }))} className={inputClass} /></div>
                                        <div><label className="block text-sm font-medium text-gray-700">Fecha Fin Countdown (ISO)</label><input type="text" value={promotionsData.countdownEndDate} onChange={(e) => setPromotionsData(p => ({ ...p, countdownEndDate: e.target.value }))} className={inputClass} /></div>
                                    </div>
                                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
                                        {promotionsData.promotions.map((promo, i) => (
                                            <div key={promo.id} className={`p-4 rounded-lg space-y-3 ${promo.isBestDeal ? 'bg-orange-50 border-orange-200 border' : 'bg-gray-50 border-gray-200 border'}`}>
                                                <h4 className="font-bold">{promo.isBestDeal ? 'Promoción Destacada' : `Promoción Normal #${i + 1}`}</h4>
                                                {promo.pills.map((pill, p_i) => (
                                                    <div key={p_i} className="grid grid-cols-2 gap-2">
                                                        <input type="text" placeholder="Texto Píldora" value={pill.text} onChange={e => handlePillChange(i, p_i, 'text', e.target.value)} className={inputClass}/>
                                                        <select value={pill.icon || ''} onChange={e => handlePillChange(i, p_i, 'icon', e.target.value as any)} className={inputClass}>
                                                            <option value="">Sin Icono</option>
                                                            <option value="check">Check</option>
                                                            <option value="sparkles">Sparkles</option>
                                                        </select>
                                                    </div>
                                                ))}
                                                <ImageUploadField
                                                    label="Imagen de Oferta"
                                                    value={promo.imageUrl}
                                                    onUpload={(url) => handlePromotionsChange(i, 'imageUrl', url)}
                                                    onClear={() => handlePromotionsChange(i, 'imageUrl', null)}
                                                />
                                                <div><label className="text-xs">Precio Oferta</label><input type="number" placeholder="Precio Oferta" value={promo.price} onChange={e => handlePromotionsChange(i, 'price', Number(e.target.value))} className={inputClass}/></div>
                                                <div><label className="text-xs">Precio Original</label><input type="number" placeholder="Precio Original" value={promo.originalPrice ?? ''} onChange={e => handlePromotionsChange(i, 'originalPrice', Number(e.target.value))} className={inputClass}/></div>
                                                <div><label className="text-xs">Título</label><input type="text" placeholder="Título" value={promo.title} onChange={e => handlePromotionsChange(i, 'title', e.target.value)} className={inputClass}/></div>
                                                <div><label className="text-xs">Subtítulo</label><input type="text" placeholder="Subtítulo" value={promo.subtitle ?? ''} onChange={e => handlePromotionsChange(i, 'subtitle', e.target.value)} className={inputClass}/></div>
                                                <div><label className="text-xs">Texto Precio/Unidad</label><input type="text" placeholder="Texto Precio/Unidad" value={promo.pricePerUnitText ?? ''} onChange={e => handlePromotionsChange(i, 'pricePerUnitText', e.target.value)} className={inputClass}/></div>
                                                <div><label className="text-xs">Texto Botón</label><input type="text" placeholder="Texto Botón" value={promo.buttonText} onChange={e => handlePromotionsChange(i, 'buttonText', e.target.value)} className={inputClass}/></div>
                                                <div><label className="text-xs">Texto Footer</label><input type="text" placeholder="Texto Footer" value={promo.footerText ?? ''} onChange={e => handlePromotionsChange(i, 'footerText', e.target.value)} className={inputClass}/></div>
                                            </div>
                                        ))}
                                    </div>
                                </fieldset>

                                <fieldset id="main-benefits" ref={el => { sectionRefs.current['main-benefits'] = el as HTMLElement | null; }} className="space-y-4 p-4 border rounded-lg scroll-mt-24">
                                    <legend className="font-semibold text-lg px-2">Beneficios Principales (hasta 4)</legend>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                                        <div><label className="block text-sm font-medium text-gray-700">Título Beneficio 1</label><input type="text" name="benefit1_title" value={formData.benefit1_title ?? ''} onChange={handleInputChange} className={inputClass} /></div>
                                        <div><label className="block text-sm font-medium text-gray-700">Descripción Beneficio 1</label><textarea name="benefit1_description" value={formData.benefit1_description ?? ''} onChange={handleInputChange} className={textAreaClass}></textarea></div>
                                        <div><label className="block text-sm font-medium text-gray-700">Título Beneficio 2</label><input type="text" name="benefit2_title" value={formData.benefit2_title ?? ''} onChange={handleInputChange} className={inputClass} /></div>
                                        <div><label className="block text-sm font-medium text-gray-700">Descripción Beneficio 2</label><textarea name="benefit2_description" value={formData.benefit2_description ?? ''} onChange={handleInputChange} className={textAreaClass}></textarea></div>
                                        <div><label className="block text-sm font-medium text-gray-700">Título Beneficio 3</label><input type="text" name="benefit3_title" value={formData.benefit3_title ?? ''} onChange={handleInputChange} className={inputClass} /></div>
                                        <div><label className="block text-sm font-medium text-gray-700">Descripción Beneficio 3</label><textarea name="benefit3_description" value={formData.benefit3_description ?? ''} onChange={handleInputChange} className={textAreaClass}></textarea></div>
                                        <div><label className="block text-sm font-medium text-gray-700">Título Beneficio 4</label><input type="text" name="benefit4_title" value={formData.benefit4_title ?? ''} onChange={handleInputChange} className={inputClass} /></div>
                                        <div><label className="block text-sm font-medium text-gray-700">Descripción Beneficio 4</label><textarea name="benefit4_description" value={formData.benefit4_description ?? ''} onChange={handleInputChange} className={textAreaClass}></textarea></div>
                                    </div>
                                </fieldset>
                                
                                <fieldset id="accordion-details" ref={el => { sectionRefs.current['accordion-details'] = el as HTMLElement | null; }} className="space-y-4 p-4 border rounded-lg scroll-mt-24">
                                    <legend className="font-semibold text-lg px-2">Acordeón de Detalles (hasta 4)</legend>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                                        <div><label className="block text-sm font-medium text-gray-700">Título Acordeón 1</label><input type="text" name="accordion_point1_title" value={formData.accordion_point1_title ?? ''} onChange={handleInputChange} className={inputClass} /></div>
                                        <div><label className="block text-sm font-medium text-gray-700">Contenido Acordeón 1 (HTML)</label><textarea name="accordion_point1_content" value={formData.accordion_point1_content ?? ''} onChange={handleInputChange} className={textAreaClass}></textarea></div>
                                        <div><label className="block text-sm font-medium text-gray-700">Título Acordeón 2</label><input type="text" name="accordion_point2_title" value={formData.accordion_point2_title ?? ''} onChange={handleInputChange} className={inputClass} /></div>
                                        <div><label className="block text-sm font-medium text-gray-700">Contenido Acordeón 2 (HTML)</label><textarea name="accordion_point2_content" value={formData.accordion_point2_content ?? ''} onChange={handleInputChange} className={textAreaClass}></textarea></div>
                                        <div><label className="block text-sm font-medium text-gray-700">Título Acordeón 3</label><input type="text" name="accordion_point3_title" value={formData.accordion_point3_title ?? ''} onChange={handleInputChange} className={inputClass} /></div>
                                        <div><label className="block text-sm font-medium text-gray-700">Contenido Acordeón 3 (HTML)</label><textarea name="accordion_point3_content" value={formData.accordion_point3_content ?? ''} onChange={handleInputChange} className={textAreaClass}></textarea></div>
                                        <div><label className="block text-sm font-medium text-gray-700">Título Acordeón 4</label><input type="text" name="accordion_point4_title" value={formData.accordion_point4_title ?? ''} onChange={handleInputChange} className={inputClass} /></div>
                                        <div><label className="block text-sm font-medium text-gray-700">Contenido Acordeón 4 (HTML)</label><textarea name="accordion_point4_content" value={formData.accordion_point4_content ?? ''} onChange={handleInputChange} className={textAreaClass}></textarea></div>
                                    </div>
                                </fieldset>
                                
                                <fieldset id="rich-content" ref={el => { sectionRefs.current['rich-content'] = el as HTMLElement | null; }} className="space-y-4 p-4 border rounded-lg scroll-mt-24">
                                    <legend className="font-semibold text-lg px-2">Contenido Enriquecido</legend>
                                    <RichTextSection
                                        initialDesktopContent={formData.desktop_content}
                                        initialMobileContent={formData.mobile_content}
                                        onDesktopChange={(content) => setFormData(prev => ({ ...prev, desktop_content: content }))}
                                        onMobileChange={(content) => setFormData(prev => ({ ...prev, mobile_content: content }))}
                                    />
                                </fieldset>

                                <fieldset id="json-data" ref={el => { sectionRefs.current['json-data'] = el as HTMLElement | null; }} className="space-y-4 p-4 border rounded-lg scroll-mt-24">
                                    <legend className="font-semibold text-lg px-2">Datos Estructurados (JSON)</legend>
                                    <p className="text-xs text-gray-500">Pega aquí el JSON correspondiente para cada sección. Usa un validador de JSON si tienes dudas.</p>
                                    <div><label htmlFor="hero_data" className="block text-sm font-medium text-gray-700">Hero Data</label><textarea name="hero_data" value={jsonToString(formData.hero_data)} onChange={e => handleJsonChange('hero_data', e.target.value)} className={jsonTextAreaClass}></textarea></div>
                                    <div><label htmlFor="features_data" className="block text-sm font-medium text-gray-700">Features Data</label><textarea name="features_data" value={jsonToString(formData.features_data)} onChange={e => handleJsonChange('features_data', e.target.value)} className={jsonTextAreaClass}></textarea></div>
                                    <div><label htmlFor="benefits_data" className="block text-sm font-medium text-gray-700">Benefits Data</label><textarea name="benefits_data" value={jsonToString(formData.benefits_data)} onChange={e => handleJsonChange('benefits_data', e.target.value)} className={jsonTextAreaClass}></textarea></div>
                                    <div><label htmlFor="comparison_data" className="block text-sm font-medium text-gray-700">Comparison Data</label><textarea name="comparison_data" value={jsonToString(formData.comparison_data)} onChange={e => handleJsonChange('comparison_data', e.target.value)} className={jsonTextAreaClass}></textarea></div>
                                    <div><label htmlFor="faq_data" className="block text-sm font-medium text-gray-700">FAQ Data</label><textarea name="faq_data" value={jsonToString(formData.faq_data)} onChange={e => handleJsonChange('faq_data', e.target.value)} className={jsonTextAreaClass}></textarea></div>
                                    <div><label htmlFor="video_with_features_data" className="block text-sm font-medium text-gray-700">Video With Features Data</label><textarea name="video_with_features_data" value={jsonToString(formData.video_with_features_data)} onChange={e => handleJsonChange('video_with_features_data', e.target.value)} className={jsonTextAreaClass}></textarea></div>
                                </fieldset>

                                <div id="actions" ref={el => { sectionRefs.current['actions'] = el as HTMLElement | null; }} className="flex items-center justify-between pt-6 border-t scroll-mt-24">
                                    <label className="flex items-center space-x-2">
                                        <input type="checkbox" name="is_active" checked={formData.is_active} onChange={handleInputChange} className="h-4 w-4 rounded text-pink-600 focus:ring-pink-500" />
                                        <span className="text-sm font-medium text-gray-700">Producto Activo</span>
                                    </label>
                                    <div className="flex items-center gap-3">
                                        {isEditMode && formData.slug && (
                                            <button 
                                                type="button" 
                                                onClick={() => props.onViewProduct(formData.slug!)}
                                                className="inline-flex justify-center py-3 px-6 border border-gray-300 shadow-sm text-base font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                            >
                                                Ver Producto
                                            </button>
                                        )}
                                        <button 
                                            type="button" 
                                            onClick={(e) => handleSubmit(e, true)}
                                            disabled={loading} 
                                            className="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                                        >
                                            {loading ? 'Guardando...' : 'Guardar y Ver'}
                                        </button>
                                        <button type="submit" disabled={loading} className="inline-flex justify-center py-3 px-8 border border-transparent shadow-sm text-base font-medium rounded-full text-white bg-[#e52e8d] hover:bg-[#c82278] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 disabled:opacity-50">
                                            {loading ? 'Guardando...' : isEditMode ? 'Guardar Cambios' : 'Guardar Producto'}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
            <Footer onLegalClick={props.onLegalClick} onCatalogClick={props.onCatalogClick} onHomeClick={props.onHomeClick} onContactFaqClick={props.onContactFaqClick}/>
        </div>
    );
};
