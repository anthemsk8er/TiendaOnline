

import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabaseClient';
import type { Category, Tag, HeroData, FeaturesData, BenefitsData, HeroBenefit, FeatureBenefit, BenefitItem, SupabaseProduct, ComparisonData, ComparisonFeature, FaqData, FaqItem, Profile, VideoWithFeaturesData, VideoFeatureItem } from '../types';
import type { Session, PostgrestSingleResponse, PostgrestResponse } from '@supabase/supabase-js';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { ChevronDownIcon, ChevronUpIcon, TrashIcon, PlusIcon } from '../components/product_detail_page/Icons';
import { iconKeys } from '../lib/iconMap';
import type { Database, Json } from '../lib/database.types';

interface ProductUploadPageProps {
  onCatalogClick: (category?: string) => void;
  onHomeClick: () => void;
  onContactFaqClick: () => void;
  onLegalClick: () => void;
  onAdminProductUploadClick?: () => void;
  onAdminProductManagementClick?: () => void;
  onAdminUserManagementClick?: () => void;
  cartItemCount: number;
  productIdToEdit?: string | null;
  onFinished: () => void;
  // Auth props
  session: Session | null;
  profile: Profile | null;
  onLogout: () => void;
  showAuthModal: (view: 'login' | 'register') => void;
}

interface ProductFormState {
  name: string;
  description: string;
  price: number | string;
  discount_price: number | string;
  stock: number | string;
  vendor: string;
  video_url: string;
  is_active: boolean;
  accordion_point1_title: string;
  accordion_point1_content: string;
  accordion_point2_title: string;
  accordion_point2_content: string;
  accordion_point3_title: string;
  accordion_point3_content: string;
  accordion_point4_title: string;
  accordion_point4_content: string;
}

const initialFormState: ProductFormState = {
  name: '',
  description: '',
  price: 0,
  discount_price: '',
  stock: 0,
  vendor: '',
  video_url: '',
  is_active: true,
  accordion_point1_title: '', accordion_point1_content: '',
  accordion_point2_title: '', accordion_point2_content: '',
  accordion_point3_title: '', accordion_point3_content: '',
  accordion_point4_title: '', accordion_point4_content: '',
};

const initialHeroData: HeroData = { title: '', subtitle: '', imageUrl: null, benefits: [{icon: 'LeafIcon', title: ''}]};
const initialFeaturesData: FeaturesData = { title: '', subtitle: '', imageUrl: null, features: [{icon: 'PremiumQualityIcon', title: '', description: ''}]};
const initialBenefitsData: BenefitsData = { backgroundImageUrl: null, benefits: [{icon: 'BedIcon', title: '', description: ''}]};
const initialComparisonData: ComparisonData = { title: '', subtitle: '', features: [{ feature: '', ours: true, theirs: false }]};
const initialFaqData: FaqData = { title: 'Preguntas Frecuentes', items: [{ question: '', answer: '' }] };
const initialVideoWithFeaturesData: VideoWithFeaturesData = { title: '', videoUrl: '', features: [{ icon: 'CheckCircleIcon', title: '', subtitle: ''}]};


type ImageFileState = { [key: string]: File | null };

const ImageUploader: React.FC<{
    id: string;
    label: string;
    existingImageUrl: string | null | undefined;
    imageFile: File | null;
    onFileChange: (id: string, file: File | null) => void;
    isRequired?: boolean;
}> = ({ id, label, existingImageUrl, imageFile, onFileChange, isRequired }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) onFileChange(id, e.target.files[0]);
    };
    const handleRemove = () => {
        onFileChange(id, null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };
    const previewUrl = imageFile ? URL.createObjectURL(imageFile) : existingImageUrl;
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700">{label}{isRequired && ' *'}</label>
            <span className="text-xs text-gray-500">Recomendado: 800x800px.</span>
            <div className="mt-2 flex flex-col items-start gap-4">
                <input type="file" accept="image/png, image/jpeg, image/webp" onChange={handleFileChange} className="hidden" ref={fileInputRef} />
                <button type="button" onClick={() => fileInputRef.current?.click()} className="cursor-pointer bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">Seleccionar archivo</button>
                {previewUrl && (
                    <div className="flex items-center gap-4 p-2 border rounded-lg bg-gray-50 max-w-md">
                        <div className="w-24 h-24 rounded-md border overflow-hidden bg-gray-100 flex-shrink-0"><img src={previewUrl} alt="Preview" className="w-full h-full object-cover" width="96" height="96" /></div>
                        <div className="text-sm overflow-hidden">
                            <p className="font-semibold text-gray-800 break-words">{imageFile?.name || 'Imagen actual'}</p>
                            {imageFile && <p className="text-gray-500">{(imageFile.size / 1024).toFixed(2)} KB</p>}
                            <button type="button" onClick={handleRemove} className="mt-2 text-red-600 hover:text-red-800 font-semibold text-xs flex items-center gap-1"><TrashIcon className="w-4 h-4" /> Eliminar</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};


export const ProductUploadPage: React.FC<ProductUploadPageProps> = ({ productIdToEdit, onFinished, ...props }) => {
  const isEditMode = !!productIdToEdit;
  const [activeTab, setActiveTab] = useState('info');
  const [formData, setFormData] = useState<ProductFormState>(initialFormState);
  const [heroData, setHeroData] = useState<HeroData>(initialHeroData);
  const [featuresData, setFeaturesData] = useState<FeaturesData>(initialFeaturesData);
  const [benefitsData, setBenefitsData] = useState<BenefitsData>(initialBenefitsData);
  const [comparisonData, setComparisonData] = useState<ComparisonData>(initialComparisonData);
  const [faqData, setFaqData] = useState<FaqData>(initialFaqData);
  const [videoWithFeaturesData, setVideoWithFeaturesData] = useState<VideoWithFeaturesData>(initialVideoWithFeaturesData);
  const [existingProduct, setExistingProduct] = useState<SupabaseProduct | null>(null);
  
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set());
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [refetchTrigger, setRefetchTrigger] = useState(0);

  const [imageFiles, setImageFiles] = useState<ImageFileState>({});
  const [deletedImageKeys, setDeletedImageKeys] = useState<Set<string>>(new Set());

  const handleFileChange = (id: string, file: File | null) => {
    setImageFiles(prev => ({ ...prev, [id]: file }));
    if (file === null) {
        // User clicked 'Eliminar', mark for deletion
        setDeletedImageKeys(prev => new Set(prev).add(id));
    } else {
        // User uploaded a new file, so it's a replacement, not a deletion.
        setDeletedImageKeys(prev => {
            const newSet = new Set(prev);
            newSet.delete(id);
            return newSet;
        });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!supabase) return;
      setLoading(true);

      const { data: categoriesData, error: categoriesError }: PostgrestResponse<Category> = await supabase.from('categories').select('id, name');
      if (categoriesError) {
        setMessage({ type: 'error', text: 'Error al cargar categorías: ' + categoriesError.message });
      } else {
        setCategories(categoriesData || []);
      }

      const { data: tagsData, error: tagsError }: PostgrestResponse<Tag> = await supabase.from('tags').select('id, name, color');
       if (tagsError) {
        setMessage({ type: 'error', text: 'Error al cargar etiquetas: ' + tagsError.message });
      } else {
        setTags(tagsData || []);
      }
      
      if (isEditMode && productIdToEdit) {
        const { data: productResData, error: productResError } = await supabase
            .from('products')
            .select(`*, product_tags(tags(id)), product_categories(categories(id))`)
            .eq('id', productIdToEdit)
            .single();

        if (productResError) {
            setMessage({ type: 'error', text: 'Error al cargar el producto: ' + productResError.message });
        } else if (productResData) {
            const productResDataAny = productResData as any;
            const transformedProduct: SupabaseProduct = {
                ...productResDataAny,
                tags: (productResDataAny.product_tags || [])
                    .map((pt: { tags: Tag | null }) => pt.tags)
                    .filter((t: Tag | null): t is Tag => t !== null),
                categories: (productResDataAny.product_categories || [])
                    .map((pc: { categories: Category | null }) => pc.categories)
                    .filter((c: Category | null): c is Category => c !== null),
            };
            setExistingProduct(transformedProduct);
            
            const { product_tags, product_categories, hero_data, features_data, benefits_data, comparison_data, faq_data, video_with_features_data, ...productData } = productResDataAny;
            setFormData({
                name: productData.name || '',
                description: productData.description || '',
                price: productData.price || 0,
                discount_price: productData.discount_price ?? '',
                stock: productData.stock || 0,
                vendor: productData.vendor || '',
                video_url: productData.video_url || '',
                is_active: productData.is_active,
                accordion_point1_title: productData.accordion_point1_title || '', accordion_point1_content: productData.accordion_point1_content || '',
                accordion_point2_title: productData.accordion_point2_title || '', accordion_point2_content: productData.accordion_point2_content || '',
                accordion_point3_title: productData.accordion_point3_title || '', accordion_point3_content: productData.accordion_point3_content || '',
                accordion_point4_title: productData.accordion_point4_title || '', accordion_point4_content: productData.accordion_point4_content || '',
            });
            setHeroData((hero_data as HeroData) || initialHeroData);
            setFeaturesData((features_data as FeaturesData) || initialFeaturesData);
            setBenefitsData((benefits_data as BenefitsData) || initialBenefitsData);
            setComparisonData((comparison_data as ComparisonData) || initialComparisonData);
            setFaqData((faq_data as FaqData) || initialFaqData);
            setVideoWithFeaturesData((video_with_features_data as VideoWithFeaturesData) || initialVideoWithFeaturesData);
            const tagIds = (product_tags || []).map((pt: any) => pt.tags?.id).filter(Boolean);
            setSelectedTags(new Set(tagIds));
            const categoryIds = (product_categories || []).map((pc: any) => pc.categories?.id).filter(Boolean);
            setSelectedCategories(new Set(categoryIds));
        }
      }
      setLoading(false);
    };
    fetchData();
  }, [productIdToEdit, isEditMode, refetchTrigger]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') setFormData(prev => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
    else setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  type DynamicSection = 'hero' | 'features' | 'benefits' | 'comparison' | 'faq' | 'video-features';

  const handleDynamicDataChange = (section: DynamicSection, field: string, value: any) => {
    if (section === 'hero') {
        setHeroData(prev => ({ ...prev, [field as keyof HeroData]: value }));
    } else if (section === 'features') {
        setFeaturesData(prev => ({ ...prev, [field as keyof FeaturesData]: value }));
    } else if (section === 'benefits') {
        setBenefitsData(prev => ({ ...prev, [field as keyof BenefitsData]: value }));
    } else if (section === 'comparison') {
        setComparisonData(prev => ({ ...prev, [field as keyof ComparisonData]: value }));
    } else if (section === 'faq') {
        setFaqData(prev => ({ ...prev, [field as keyof FaqData]: value }));
    } else if (section === 'video-features') {
        setVideoWithFeaturesData(prev => ({ ...prev, [field as keyof VideoWithFeaturesData]: value }));
    }
  };

  const handleListItemChange = (section: DynamicSection, index: number, field: string, value: string | boolean) => {
    if (section === 'hero') {
        setHeroData(prev => {
            const newList = [...prev.benefits];
            newList[index] = { ...newList[index], [field as keyof HeroBenefit]: value as string };
            return { ...prev, benefits: newList };
        });
    } else if (section === 'features') {
        setFeaturesData(prev => {
            const newList = [...prev.features];
            newList[index] = { ...newList[index], [field as keyof FeatureBenefit]: value as string };
            return { ...prev, features: newList };
        });
    } else if (section === 'benefits') {
        setBenefitsData(prev => {
            const newList = [...prev.benefits];
            newList[index] = { ...newList[index], [field as keyof BenefitItem]: value as string };
            return { ...prev, benefits: newList };
        });
    } else if (section === 'comparison') {
        setComparisonData(prev => {
            const newList = [...prev.features];
            newList[index] = { ...newList[index], [field as keyof ComparisonFeature]: value };
            return { ...prev, features: newList };
        });
    } else if (section === 'faq') {
        setFaqData(prev => {
            const newList = [...prev.items];
            newList[index] = { ...newList[index], [field as keyof FaqItem]: value as string };
            return { ...prev, items: newList };
        });
    } else if (section === 'video-features') {
        setVideoWithFeaturesData(prev => {
            const newList = [...prev.features];
            newList[index] = { ...newList[index], [field as keyof VideoFeatureItem]: value as string };
            return { ...prev, features: newList };
        });
    }
  };


  const addListItem = (section: DynamicSection) => {
      const newItem = { 
          hero: {icon: 'LeafIcon', title: ''}, 
          features: {icon: 'PremiumQualityIcon', title: '', description: ''}, 
          benefits: {icon: 'BedIcon', title: '', description: ''},
          comparison: { feature: '', ours: true, theirs: false },
          faq: { question: '', answer: '' },
          'video-features': { icon: 'CheckCircleIcon', title: '', subtitle: '' },
      };
      switch(section) {
          case 'hero':
              setHeroData(prev => ({...prev, benefits: [...prev.benefits, newItem.hero]}));
              break;
          case 'features':
              setFeaturesData(prev => ({...prev, features: [...prev.features, newItem.features]}));
              break;
          case 'benefits':
              setBenefitsData(prev => ({...prev, benefits: [...prev.benefits, newItem.benefits]}));
              break;
          case 'comparison':
              setComparisonData(prev => ({...prev, features: [...prev.features, newItem.comparison]}));
              break;
          case 'faq':
              setFaqData(prev => ({...prev, items: [...prev.items, newItem.faq]}));
              break;
          case 'video-features':
              setVideoWithFeaturesData(prev => ({...prev, features: [...prev.features, newItem['video-features']]}));
              break;
      }
  };

  const removeListItem = (section: DynamicSection, index: number) => {
      switch(section) {
          case 'hero':
              setHeroData(prev => {
                  const newList = [...prev.benefits];
                  newList.splice(index, 1);
                  return {...prev, benefits: newList};
              });
              break;
          case 'features':
              setFeaturesData(prev => {
                  const newList = [...prev.features];
                  newList.splice(index, 1);
                  return {...prev, features: newList};
              });
              break;
          case 'benefits':
              setBenefitsData(prev => {
                  const newList = [...prev.benefits];
                  newList.splice(index, 1);
                  return {...prev, benefits: newList};
              });
              break;
          case 'comparison':
              setComparisonData(prev => {
                  const newList = [...prev.features];
                  newList.splice(index, 1);
                  return {...prev, features: newList};
              });
              break;
          case 'faq':
              setFaqData(prev => {
                  const newList = [...prev.items];
                  newList.splice(index, 1);
                  return {...prev, items: newList};
              });
              break;
          case 'video-features':
              setVideoWithFeaturesData(prev => {
                  const newList = [...prev.features];
                  newList.splice(index, 1);
                  return {...prev, features: newList};
              });
              break;
      }
  };
  
  const handleCategoryChange = (catId: string) => setSelectedCategories(prev => {
      const newCats = new Set(prev);
      newCats.has(catId) ? newCats.delete(catId) : newCats.add(catId);
      return newCats;
  });

  const handleAddNewCategory = async () => {
    if (!newCategoryName.trim() || !supabase) return;
    const trimmedName = newCategoryName.trim();
    if (categories.some(c => c.name.toLowerCase() === trimmedName.toLowerCase())) {
        setMessage({ type: 'error', text: 'La categoría ya existe.' });
        return;
    }
    
    const { data, error }: PostgrestSingleResponse<Category> = await supabase.from('categories').insert([{ name: trimmedName }] as any).select().single();
    if (error) {
        setMessage({ type: 'error', text: 'Error al crear la categoría: ' + error.message });
    } else if (data) {
        setCategories(prev => [...prev, data]);
        setSelectedCategories(prev => new Set(prev).add(data.id));
        setNewCategoryName('');
        setMessage({ type: 'success', text: 'Categoría creada y seleccionada.' });
        setTimeout(() => setMessage(null), 3000);
    }
  };


  const handleTagChange = (tagId: string) => setSelectedTags(prev => {
      const newTags = new Set(prev);
      newTags.has(tagId) ? newTags.delete(tagId) : newTags.add(tagId);
      return newTags;
  });

  const uploadImage = async (file: File | null, path: string): Promise<string | null> => {
      if (!file || !supabase) return null;
      const sanitizedFileName = `${Date.now()}_${file.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9-.]/g, '-')}`;
      const { error, data } = await supabase.storage.from('products').upload(`${path}/${sanitizedFileName}`, file);
      if (error) throw new Error(`Error al subir la imagen (${file.name}): ${error.message}`);
      return supabase.storage.from('products').getPublicUrl(data.path).data.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const hasStagedMainImage = !!imageFiles['image_url'];
    const hasExistingMainImage = !!existingProduct?.image_url;
    const isDeletingMainImage = deletedImageKeys.has('image_url');

    if (!isEditMode && !hasStagedMainImage) {
        setMessage({ type: 'error', text: 'Por favor, sube una Imagen Principal.' });
        return;
    }
    if (isEditMode && !hasStagedMainImage && !hasExistingMainImage) {
        setMessage({ type: 'error', text: 'Por favor, sube una Imagen Principal.' });
        return;
    }
     if (isEditMode && isDeletingMainImage && !hasStagedMainImage) {
        setMessage({ type: 'error', text: 'La Imagen Principal es obligatoria. Sube una nueva imagen para reemplazar la actual.' });
        return;
    }
    if (!formData.name || !formData.price) {
        setMessage({ type: 'error', text: 'Por favor, completa los campos obligatorios: Nombre y Precio.' });
        return;
    }
    
    setLoading(true);
    setMessage(null);

    try {
        if (!supabase) throw new Error("Supabase client not initialized.");

        const [
          imgUrl1, imgUrl2, imgUrl3, imgUrl4, 
          heroImgUrl, featuresImgUrl, benefitsImgUrl
        ] = await Promise.all([
            uploadImage(imageFiles['image_url'], 'img/products'),
            uploadImage(imageFiles['image_url_2'], 'img/products'),
            uploadImage(imageFiles['image_url_3'], 'img/products'),
            uploadImage(imageFiles['image_url_4'], 'img/products'),
            uploadImage(imageFiles['hero_image'], 'img/sections'),
            uploadImage(imageFiles['features_image'], 'img/sections'),
            uploadImage(imageFiles['benefits_image'], 'img/sections'),
        ]);

        const getFinalImageUrl = (newUrl: string | null, key: string, existingUrl: string | null | undefined): string | null => {
            if (newUrl) return newUrl;
            if (deletedImageKeys.has(key)) return null;
            return existingUrl ?? null;
        };

        const dbData: Database['public']['Tables']['products']['Insert'] = {
          name: formData.name,
          description: formData.description,
          price: Number(formData.price),
          discount_price: formData.discount_price ? Number(formData.discount_price) : null,
          stock: Number(formData.stock),
          vendor: formData.vendor,
          video_url: formData.video_url || null,
          is_active: formData.is_active,
          accordion_point1_title: formData.accordion_point1_title || null,
          accordion_point1_content: formData.accordion_point1_content || null,
          accordion_point2_title: formData.accordion_point2_title || null,
          accordion_point2_content: formData.accordion_point2_content || null,
          accordion_point3_title: formData.accordion_point3_title || null,
          accordion_point3_content: formData.accordion_point3_content || null,
          accordion_point4_title: formData.accordion_point4_title || null,
          accordion_point4_content: formData.accordion_point4_content || null,
          image_url: getFinalImageUrl(imgUrl1, 'image_url', existingProduct?.image_url) || '',
          image_url_2: getFinalImageUrl(imgUrl2, 'image_url_2', existingProduct?.image_url_2),
          image_url_3: getFinalImageUrl(imgUrl3, 'image_url_3', existingProduct?.image_url_3),
          image_url_4: getFinalImageUrl(imgUrl4, 'image_url_4', existingProduct?.image_url_4),
          hero_data: { ...heroData, imageUrl: getFinalImageUrl(heroImgUrl, 'hero_image', heroData.imageUrl) } as unknown as Json,
          features_data: { ...featuresData, imageUrl: getFinalImageUrl(featuresImgUrl, 'features_image', featuresData.imageUrl) } as unknown as Json,
          benefits_data: { ...benefitsData, backgroundImageUrl: getFinalImageUrl(benefitsImgUrl, 'benefits_image', benefitsData.backgroundImageUrl) } as unknown as Json,
          comparison_data: comparisonData.features.some(f => f.feature) ? comparisonData as unknown as Json : null,
          faq_data: faqData.items.some(i => i.question) ? faqData as unknown as Json : null,
          video_with_features_data: videoWithFeaturesData.features.some(f => f.title) ? videoWithFeaturesData as unknown as Json : null,
        };

        let productId = productIdToEdit;
        const { data: productUpsertData, error } = isEditMode
            ? await supabase.from('products').update(dbData as any).eq('id', productId!).select('id').single()
            : await supabase.from('products').insert([dbData] as any).select('id').single();

        if (error) throw error;
        
        if (!productUpsertData) {
            throw new Error("No se pudo obtener el ID del producto después de la operación.");
        }
        productId = productUpsertData.id;


        if (productId) {
            // Handle Tags
            await supabase.from('product_tags').delete().eq('product_id', productId);
            const tagsToInsert = Array.from(selectedTags).map(tag_id => ({ product_id: productId!, tag_id }));
            if (tagsToInsert.length > 0) {
                const { error: tagsError } = await supabase.from('product_tags').insert(tagsToInsert as any);
                if (tagsError) throw new Error(`Producto guardado, pero falló la asignación de etiquetas: ${tagsError.message}`);
            }
            
            // Handle Categories
            await supabase.from('product_categories').delete().eq('product_id', productId);
            const categoriesToInsert = Array.from(selectedCategories).map(category_id => ({ product_id: productId!, category_id }));
            if (categoriesToInsert.length > 0) {
                const { error: categoriesError } = await supabase.from('product_categories').insert(categoriesToInsert as any);
                if (categoriesError) throw new Error(`Producto guardado, pero falló la asignación de categorías: ${categoriesError.message}`);
            }
        }

        setMessage({ type: 'success', text: `¡Producto ${isEditMode ? 'actualizado' : 'subido'} con éxito!` });
        if (isEditMode) {
          setRefetchTrigger(prev => prev + 1);
        } else {
          setTimeout(() => onFinished(), 1500);
        }
    } catch (error: any) {
        setMessage({ type: 'error', text: `Error al ${isEditMode ? 'actualizar' : 'subir'} el producto: ${error.message}` });
    } finally {
        setLoading(false);
    }
  };
  
  const inputClass = "mt-1 block w-full px-4 py-3 bg-slate-100 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors";
  const { cartItemCount } = props;
  
  const navProps = {
    ...props
  }

  const tabs = [
    { id: 'info', label: 'Información General' },
    { id: 'accordion', label: 'Detalles Acordeón' },
    { id: 'hero', label: 'Sección Hero' },
    { id: 'features', label: 'Sección Features' },
    { id: 'benefits', label: 'Sección Benefits' },
    { id: 'comparison', label: 'Sección Comparación' },
    { id: 'faq', label: 'Sección FAQ' },
    { id: 'video-features', label: 'Sección Vídeo' },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header {...navProps} cartItemCount={cartItemCount} onCartClick={() => {}} />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{isEditMode ? 'Editar Producto' : 'Subir Nuevo Producto'}</h1>
            <p className="text-gray-500 mb-8">{isEditMode ? 'Actualiza los detalles del producto.' : 'Completa el formulario.'}</p>
            
            {message && <div className={`p-4 rounded-md mb-6 text-white ${message.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>{message.text}</div>}
            
            <div className="border-b border-gray-200 mb-6">
                <nav className="-mb-px flex space-x-6 overflow-x-auto">
                    {tabs.map(tab => (
                        <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === tab.id ? 'border-pink-500 text-pink-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>{tab.label}</button>
                    ))}
                </nav>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {activeTab === 'info' && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div><label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre del Producto *</label><input type="text" name="name" id="name" value={formData.name} onChange={handleInputChange} required className={inputClass}/></div>
                            <div><label htmlFor="vendor" className="block text-sm font-medium text-gray-700">Vendedor</label><input type="text" name="vendor" id="vendor" value={formData.vendor} onChange={handleInputChange} className={inputClass}/></div>
                            <div><label htmlFor="price" className="block text-sm font-medium text-gray-700">Precio (S/) *</label><input type="number" name="price" id="price" value={formData.price} onChange={handleInputChange} required step="0.01" className={inputClass}/></div>
                            <div><label htmlFor="discount_price" className="block text-sm font-medium text-gray-700">Precio de Descuento (S/)</label><input type="number" name="discount_price" id="discount_price" value={formData.discount_price} onChange={handleInputChange} step="0.01" placeholder="Ej: 79.90" className={inputClass}/></div>
                            <div><label htmlFor="stock" className="block text-sm font-medium text-gray-700">Stock</label><input type="number" name="stock" id="stock" value={formData.stock} onChange={handleInputChange} className={inputClass}/></div>
                        </div>
                        <div><label htmlFor="description" className="block text-sm font-medium text-gray-700">Descripción</label><textarea name="description" id="description" value={formData.description} onChange={handleInputChange} rows={4} className={inputClass}></textarea></div>
                        
                        <fieldset className="pt-4 border-t"><legend className="text-base font-medium text-gray-900">Categorías *</legend>
                          <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">{categories.map(cat => (<label key={cat.id} className="flex items-center space-x-2 p-2 border rounded-md hover:bg-gray-50 cursor-pointer"><input type="checkbox" checked={selectedCategories.has(cat.id)} onChange={() => handleCategoryChange(cat.id)} className="rounded text-pink-600 focus:ring-pink-500"/><span>{cat.name}</span></label>))}</div>
                           <div className="mt-4 flex gap-2">
                                <input type="text" value={newCategoryName} onChange={(e) => setNewCategoryName(e.target.value)} placeholder="Nueva categoría" className={inputClass}/>
                                <button type="button" onClick={handleAddNewCategory} className="bg-gray-200 text-gray-700 font-semibold px-4 py-2 rounded-md hover:bg-gray-300">Añadir</button>
                           </div>
                        </fieldset>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t">
                            {[...Array(4)].map((_, i) => {
                                const imageKey = i === 0 ? 'image_url' : `image_url_${i + 1}`;
                                const existingImageUrl = deletedImageKeys.has(imageKey)
                                    ? null
                                    : (existingProduct as any)?.[imageKey];

                                return (<ImageUploader
                                    key={imageKey}
                                    id={imageKey}
                                    label={i === 0 ? "Imagen Principal *" : `Imagen Adicional ${i + 1}`}
                                    isRequired={i === 0 && !isEditMode}
                                    existingImageUrl={existingImageUrl}
                                    imageFile={imageFiles[imageKey] || null}
                                    onFileChange={handleFileChange}
                                />);
                            })}
                        </div>
                        <div><label htmlFor="video_url" className="block text-sm font-medium text-gray-700">URL del Video de YouTube (Opcional)</label><input type="url" name="video_url" id="video_url" value={formData.video_url} onChange={handleInputChange} placeholder="https://www.youtube.com/embed/VIDEO_ID" className={inputClass}/></div>
                        <fieldset className="pt-4 border-t"><legend className="text-base font-medium text-gray-900">Etiquetas</legend><div className="mt-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">{tags.map(tag => (<label key={tag.id} className="flex items-center space-x-2 p-2 border rounded-md hover:bg-gray-50 cursor-pointer"><input type="checkbox" checked={selectedTags.has(tag.id)} onChange={() => handleTagChange(tag.id)} className="rounded text-pink-600 focus:ring-pink-500"/><span>{tag.name}</span></label>))}</div></fieldset>
                    </div>
                )}
                {activeTab === 'accordion' && <div className="space-y-6">{[1, 2, 3, 4].map(index => (<div key={index} className="p-4 border rounded-lg space-y-2 bg-gray-50/80"><h4 className="font-semibold text-gray-600">Punto {index}</h4><div><label htmlFor={`accordion_point${index}_title`} className="block text-sm font-medium text-gray-700">Título</label><input type="text" id={`accordion_point${index}_title`} name={`accordion_point${index}_title`} value={(formData as any)[`accordion_point${index}_title`]} onChange={handleInputChange} className={inputClass} /></div><div><label htmlFor={`accordion_point${index}_content`} className="block text-sm font-medium text-gray-700">Contenido</label><textarea id={`accordion_point${index}_content`} name={`accordion_point${index}_content`} value={(formData as any)[`accordion_point${index}_content`]} onChange={handleInputChange} rows={2} className={inputClass}></textarea></div></div>))}</div>}
                
                {activeTab === 'hero' && 
                    <div className="space-y-6">
                        <div><label htmlFor="hero_title" className="block text-sm font-medium text-gray-700">Título</label><input type="text" value={heroData.title} onChange={e => handleDynamicDataChange('hero', 'title', e.target.value)} className={inputClass} /></div>
                        <div><label htmlFor="hero_subtitle" className="block text-sm font-medium text-gray-700">Subtítulo</label><input type="text" value={heroData.subtitle} onChange={e => handleDynamicDataChange('hero', 'subtitle', e.target.value)} className={inputClass} /></div>
                        <ImageUploader id="hero_image" label="Imagen Hero" existingImageUrl={deletedImageKeys.has('hero_image') ? null : heroData.imageUrl} imageFile={imageFiles['hero_image']} onFileChange={handleFileChange} />
                        {heroData.benefits.map((benefit, index) => (
                            <div key={index} className="p-4 border rounded-lg space-y-2 bg-gray-50/80">
                                <div className="flex justify-between items-center">
                                    <label className="text-sm font-medium text-gray-700">Beneficio {index + 1}</label>
                                    <button type="button" onClick={() => removeListItem('hero', index)} className="text-red-500 hover:text-red-700 p-1">
                                        <TrashIcon className="w-5 h-5" />
                                    </button>
                                </div>
                                <div className="flex gap-2">
                                    <div className="w-1/3"><label className="text-xs">Icono</label><select value={benefit.icon} onChange={e => handleListItemChange('hero', index, 'icon', e.target.value)} className={inputClass}><option disabled>Seleccionar</option>{iconKeys.map(key => <option key={key} value={key}>{key}</option>)}</select></div>
                                    <div className="w-2/3"><label className="text-xs">Título</label><input type="text" value={benefit.title} onChange={e => handleListItemChange('hero', index, 'title', e.target.value)} className={inputClass} /></div>
                                </div>
                            </div>
                        ))}
                        <button type="button" onClick={() => addListItem('hero')} className="text-sm font-semibold text-pink-600 hover:text-pink-800 flex items-center gap-1">
                            <PlusIcon className="w-5 h-5" /> Añadir Beneficio
                        </button>
                    </div>
                }

                {activeTab === 'features' && 
                    <div className="space-y-6">
                        <div><label className="block text-sm font-medium text-gray-700">Título</label><input type="text" value={featuresData.title} onChange={e => handleDynamicDataChange('features', 'title', e.target.value)} className={inputClass} /></div>
                        <div><label className="block text-sm font-medium text-gray-700">Subtítulo</label><input type="text" value={featuresData.subtitle} onChange={e => handleDynamicDataChange('features', 'subtitle', e.target.value)} className={inputClass} /></div>
                        <ImageUploader id="features_image" label="Imagen Features" existingImageUrl={deletedImageKeys.has('features_image') ? null : featuresData.imageUrl} imageFile={imageFiles['features_image']} onFileChange={handleFileChange} />
                        {featuresData.features.map((feature, index) => (
                            <div key={index} className="p-4 border rounded-lg space-y-2">
                                <div className="flex justify-between items-center">
                                    <label className="text-sm font-medium text-gray-700">Característica {index + 1}</label>
                                    <button type="button" onClick={() => removeListItem('features', index)} className="text-red-500 hover:text-red-700 p-1">
                                        <TrashIcon className="w-5 h-5" />
                                    </button>
                                </div>
                                <div className="flex gap-2">
                                    <div className="w-1/3"><label className="text-xs">Icono</label><select value={feature.icon} onChange={e => handleListItemChange('features', index, 'icon', e.target.value)} className={inputClass}>{iconKeys.map(key => <option key={key} value={key}>{key}</option>)}</select></div>
                                    <div className="w-2/3"><label className="text-xs">Título</label><input type="text" value={feature.title} onChange={e => handleListItemChange('features', index, 'title', e.target.value)} className={inputClass} /></div>
                                </div>
                                <div><label className="text-xs">Descripción</label><textarea value={feature.description} onChange={e => handleListItemChange('features', index, 'description', e.target.value)} className={inputClass} rows={2}/></div>
                            </div>
                        ))}
                        <button type="button" onClick={() => addListItem('features')} className="text-sm font-semibold text-pink-600 hover:text-pink-800 flex items-center gap-1">
                            <PlusIcon className="w-5 h-5" /> Añadir Característica
                        </button>
                    </div>
                }

                {activeTab === 'benefits' && 
                    <div className="space-y-6">
                        <ImageUploader id="benefits_image" label="Imagen de Fondo" existingImageUrl={deletedImageKeys.has('benefits_image') ? null : benefitsData.backgroundImageUrl} imageFile={imageFiles['benefits_image']} onFileChange={handleFileChange} />
                        {benefitsData.benefits.map((benefit, index) => (
                            <div key={index} className="p-4 border rounded-lg space-y-2">
                                <div className="flex justify-between items-center">
                                    <label className="text-sm font-medium text-gray-700">Beneficio {index + 1}</label>
                                    <button type="button" onClick={() => removeListItem('benefits', index)} className="text-red-500 hover:text-red-700 p-1">
                                        <TrashIcon className="w-5 h-5" />
                                    </button>
                                </div>
                                <div className="flex gap-2">
                                    <div className="w-1/3"><label className="text-xs">Icono</label><select value={benefit.icon} onChange={e => handleListItemChange('benefits', index, 'icon', e.target.value)} className={inputClass}>{iconKeys.map(key => <option key={key} value={key}>{key}</option>)}</select></div>
                                    <div className="w-2/3"><label className="text-xs">Título</label><input type="text" value={benefit.title} onChange={e => handleListItemChange('benefits', index, 'title', e.target.value)} className={inputClass} /></div>
                                </div>
                                <div><label className="text-xs">Descripción</label><textarea value={benefit.description} onChange={e => handleListItemChange('benefits', index, 'description', e.target.value)} className={inputClass} rows={2}/></div>
                            </div>
                        ))}
                        <button type="button" onClick={() => addListItem('benefits')} className="text-sm font-semibold text-pink-600 hover:text-pink-800 flex items-center gap-1">
                            <PlusIcon className="w-5 h-5" /> Añadir Beneficio
                        </button>
                    </div>
                }
                
                {activeTab === 'comparison' && (
                    <div className="space-y-6">
                        <div><label className="block text-sm font-medium text-gray-700">Título</label><input type="text" value={comparisonData.title} onChange={e => handleDynamicDataChange('comparison', 'title', e.target.value)} className={inputClass} /></div>
                        <div><label className="block text-sm font-medium text-gray-700">Subtítulo</label><input type="text" value={comparisonData.subtitle} onChange={e => handleDynamicDataChange('comparison', 'subtitle', e.target.value)} className={inputClass} /></div>
                        <h4 className="font-semibold text-gray-700 pt-4 border-t">Puntos de Comparación</h4>
                        {comparisonData.features.map((feature, index) => (
                            <div key={index} className="p-4 border rounded-lg space-y-2 bg-gray-50/80">
                                <div className="flex justify-between items-center">
                                    <label className="text-sm font-medium text-gray-700">Característica {index + 1}</label>
                                    <button type="button" onClick={() => removeListItem('comparison', index)} className="text-red-500 hover:text-red-700 p-1">
                                        <TrashIcon className="w-5 h-5" />
                                    </button>
                                </div>
                                <div><label className="text-xs">Descripción de la Característica</label><input type="text" placeholder="Ej: Ingredientes Naturales" value={feature.feature} onChange={e => handleListItemChange('comparison', index, 'feature', e.target.value)} className={inputClass} /></div>
                                <div className="flex gap-4 pt-2">
                                  <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={feature.ours} onChange={e => handleListItemChange('comparison', index, 'ours', e.target.checked)} className="rounded text-pink-600 focus:ring-pink-500" /> Nuestro producto</label>
                                  <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={feature.theirs} onChange={e => handleListItemChange('comparison', index, 'theirs', e.target.checked)} className="rounded text-pink-600 focus:ring-pink-500" /> Otros</label>
                                </div>
                            </div>
                        ))}
                        <button type="button" onClick={() => addListItem('comparison')} className="text-sm font-semibold text-pink-600 hover:text-pink-800 flex items-center gap-1">
                            <PlusIcon className="w-5 h-5" /> Añadir Característica
                        </button>
                    </div>
                )}
                
                {activeTab === 'faq' && (
                    <div className="space-y-6">
                        <div><label className="block text-sm font-medium text-gray-700">Título de la Sección</label><input type="text" value={faqData.title} onChange={e => handleDynamicDataChange('faq', 'title', e.target.value)} className={inputClass} /></div>
                        <h4 className="font-semibold text-gray-700 pt-4 border-t">Preguntas y Respuestas</h4>
                        {faqData.items.map((item, index) => (
                            <div key={index} className="p-4 border rounded-lg space-y-2 bg-gray-50/80">
                                <div className="flex justify-between items-center">
                                    <label className="text-sm font-medium text-gray-700">Pregunta {index + 1}</label>
                                    <button type="button" onClick={() => removeListItem('faq', index)} className="text-red-500 hover:text-red-700 p-1">
                                        <TrashIcon className="w-5 h-5" />
                                    </button>
                                </div>
                                <div><label className="text-xs">Pregunta</label><input type="text" value={item.question} onChange={e => handleListItemChange('faq', index, 'question', e.target.value)} className={inputClass} /></div>
                                <div><label className="text-xs">Respuesta</label><textarea value={item.answer} onChange={e => handleListItemChange('faq', index, 'answer', e.target.value)} className={inputClass} rows={3}/></div>
                            </div>
                        ))}
                        <button type="button" onClick={() => addListItem('faq')} className="text-sm font-semibold text-pink-600 hover:text-pink-800 flex items-center gap-1">
                            <PlusIcon className="w-5 h-5" /> Añadir Pregunta
                        </button>
                    </div>
                )}

                {activeTab === 'video-features' && (
                    <div className="space-y-6">
                        <div><label className="block text-sm font-medium text-gray-700">Título</label><input type="text" value={videoWithFeaturesData.title} onChange={e => handleDynamicDataChange('video-features', 'title', e.target.value)} className={inputClass} /></div>
                        <div><label className="block text-sm font-medium text-gray-700">URL del Vídeo (YouTube)</label><input type="url" value={videoWithFeaturesData.videoUrl} onChange={e => handleDynamicDataChange('video-features', 'videoUrl', e.target.value)} placeholder="https://www.youtube.com/watch?v=..." className={inputClass} /></div>
                        <h4 className="font-semibold text-gray-700 pt-4 border-t">Puntos Clave</h4>
                        {videoWithFeaturesData.features.map((feature, index) => (
                            <div key={index} className="p-4 border rounded-lg space-y-2 bg-gray-50/80">
                                <div className="flex justify-between items-center">
                                    <label className="text-sm font-medium text-gray-700">Punto {index + 1}</label>
                                    <button type="button" onClick={() => removeListItem('video-features', index)} className="text-red-500 hover:text-red-700 p-1">
                                        <TrashIcon className="w-5 h-5" />
                                    </button>
                                </div>
                                <div className="flex gap-2">
                                    <div className="w-1/3"><label className="text-xs">Icono</label><select value={feature.icon} onChange={e => handleListItemChange('video-features', index, 'icon', e.target.value)} className={inputClass}><option disabled>Seleccionar</option>{iconKeys.map(key => <option key={key} value={key}>{key}</option>)}</select></div>
                                    <div className="w-2/3"><label className="text-xs">Título</label><input type="text" value={feature.title} onChange={e => handleListItemChange('video-features', index, 'title', e.target.value)} className={inputClass} /></div>
                                </div>
                                <div><label className="text-xs">Subtítulo</label><textarea value={feature.subtitle} onChange={e => handleListItemChange('video-features', index, 'subtitle', e.target.value)} className={inputClass} rows={2}/></div>
                            </div>
                        ))}
                        <button type="button" onClick={() => addListItem('video-features')} className="text-sm font-semibold text-pink-600 hover:text-pink-800 flex items-center gap-1">
                            <PlusIcon className="w-5 h-5" /> Añadir Punto Clave
                        </button>
                    </div>
                )}


                <div className="flex items-center justify-between pt-4 border-t">
                    <label className="flex items-center space-x-2"><input type="checkbox" name="is_active" checked={formData.is_active} onChange={handleInputChange} className="rounded text-pink-600 focus:ring-pink-500"/><span className="text-sm font-medium text-gray-700">Producto Activo</span></label>
                    <button type="submit" disabled={loading} className="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-full text-white bg-[#e52e8d] hover:bg-[#c82278] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 disabled:opacity-50">{loading ? 'Guardando...' : isEditMode ? 'Actualizar Producto' : 'Guardar Producto'}</button>
                </div>
            </form>
        </div>
      </main>
      <Footer onLegalClick={props.onLegalClick} onCatalogClick={props.onCatalogClick} onHomeClick={props.onHomeClick} onContactFaqClick={props.onContactFaqClick}/>
    </div>
  );
};
