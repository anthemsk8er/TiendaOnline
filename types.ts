
import type { Json as SupabaseJson } from './lib/database.types';

export type Json = SupabaseJson;

export interface Profile {
  id: string;
  full_name: string;
  role: 'ADMIN' | 'CLIENT';
}

export interface AccordionItem {
  title: string;
  content: string;
}

// Data structure for the Hero section
export interface HeroBenefit {
  icon: string;
  title:string;
}
export interface HeroData {
  title: string;
  subtitle: string;
  imageUrl: string | null;
  benefits: HeroBenefit[];
}

// Data structure for the Features section
export interface FeatureBenefit {
  icon: string;
  title: string;
  description: string;
}
export interface FeaturesData {
  title: string;
  subtitle: string;
  imageUrl: string | null;
  features: FeatureBenefit[];
}

// Data structure for the Benefits section
export interface BenefitItem {
  icon: string;
  title: string;
  description: string;
}
export interface BenefitsData {
  backgroundImageUrl: string | null;
  benefits: BenefitItem[];
}

// Data structure for the Comparison Table section
export interface ComparisonFeature {
  feature: string;
  ours: boolean;
  theirs: boolean;
}
export interface ComparisonData {
  title: string;
  subtitle: string;
  features: ComparisonFeature[];
}

// Data structure for the FAQ section
export interface FaqItem {
  question: string;
  answer: string;
}
export interface FaqData {
  title: string;
  items: FaqItem[];
}

// Data structure for the VideoWithFeatures section
export interface VideoFeatureItem {
  icon: string;
  title: string;
  subtitle: string;
}
export interface VideoWithFeaturesData {
  title: string;
  videoUrl: string;
  features: VideoFeatureItem[];
}


export interface Product {
  id: string;
  vendor: string;
  title: string;
  price: number;
  originalPrice?: number | null;
  rating: number;
  reviewCount: number;
  images: string[];
  description: string;
  benefits: string[];
  ingredients: string[];
  usage: string;
  stock: number;
  videoUrl?: string;
  details?: AccordionItem[];
  heroData?: HeroData;
  featuresData?: FeaturesData;
  benefitsData?: BenefitsData;
  comparison_data?: ComparisonData | null;
  faqData?: FaqData | null;
  videoWithFeaturesData?: VideoWithFeaturesData | null;
}

export interface Review {
  id: string;
  created_at: string;
  product_id: string;
  user_id: string;
  author_name: string;
  author_province: string;
  comment: string;
  image_url: string | null;
  rating: number;
  is_approved: boolean;
  products?: { name: string } | null; // For joining product name
}

export interface RelatedProduct {
  id: string;
  image: string;
  title: string;
  price: number;
}

export interface CartItem {
  id: string;
  vendor: string;
  title:string;
  price: number;
  originalPrice?: number | null;
  image: string;
  quantity: number;
}

export interface Tag {
  id: string;
  name: string;
  color: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface SupabaseProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  discount_price: number | null;
  image_url: string;
  image_url_2?: string | null;
  image_url_3?: string | null;
  image_url_4?: string | null;
  video_url?: string;
  stock: number;
  vendor: string;
  is_active: boolean;
  categories: Category[];
  tags: Tag[];
  accordion_point1_title: string | null;
  accordion_point1_content: string | null;
  accordion_point2_title: string | null;
  accordion_point2_content: string | null;
  accordion_point3_title: string | null;
  accordion_point3_content: string | null;
  accordion_point4_title: string | null;
  accordion_point4_content: string | null;
  hero_data?: Json | null;
  features_data?: Json | null;
  benefits_data?: Json | null;
  comparison_data?: Json | null;
  faq_data?: Json | null;
  video_with_features_data?: Json | null;
}

export interface Order {
  id: string;
  created_at: string;
  full_name: string;
  email: string;
  phone: string;
  address: string;
  reference?: string | null;
  department: string;
  province: string;
  district: string;
  shipping_method?: string | null;
  payment_method: string;
  cart_items: CartItem[];
  upsell_included: boolean;
  total_amount: number;
  discount_code?: string | null;
  discount_amount?: number | null;
}

export interface DiscountCode {
    id: string;
    code: string;
    discount_type: 'percentage' | 'fixed_amount';
    discount_value: number;
    limitation_type: 'date_range' | 'usage_limit';
    start_date: string | null;
    end_date: string | null;
    usage_limit: number | null;
    times_used: number;
    scope: 'cart' | 'product';
    product_id: string | null;
    is_active: boolean;
    created_at: string;
}
