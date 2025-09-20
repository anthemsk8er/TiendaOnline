// FIX: Create types.ts to define shared types used across the application.
import type { Database } from './lib/database.types';

// From Supabase schema, but simplified for frontend use
export type SupabaseProduct = Database['public']['Tables']['products']['Row'] & {
  categories: Category[];
  tags: Tag[];
};

export type Product = {
  id: string;
  slug: string | null;
  vendor: string;
  title: string;
  price: number;
  originalPrice?: number | null;
  images: string[];
  rating: number;
  reviewCount: number;
  description: string;
  main_benefits: { title: string; description: string }[];
  details: AccordionItem[] | null; // For the accordion
  stock: number;
  benefits?: string[];
  ingredients?: string[];
  usage?: string;
  hero_data?: HeroData | null;
  features_data?: FeaturesData | null;
  benefits_data?: BenefitsData | null;
  comparison_data?: ComparisonData | null;
  faq_data?: FaqData | null;
  video_with_features_data?: VideoWithFeaturesData | null;
  desktop_content?: string | null;
  mobile_content?: string | null;
  highlights_data?: ProductHighlightsData | null;
  promotions_data?: PromotionsData | null;
};

export type CartItem = {
  id: string;
  vendor: string;
  title: string;
  price: number;
  originalPrice: number | null;
  image: string;
  quantity: number;
};

export type Profile = Database['public']['Tables']['profiles']['Row'];

export type Review = Database['public']['Tables']['reviews']['Row'];

export type RelatedProduct = {
  id: string;
  title: string;
  price: number;
  image: string;
};

export type Category = Database['public']['Tables']['categories']['Row'];
export type Tag = Database['public']['Tables']['tags']['Row'];

export type Order = Database['public']['Tables']['orders']['Row'];
export type DiscountCode = Database['public']['Tables']['discount_codes']['Row'];

// Sectional Data Types
export interface AccordionItem {
  title: string;
  content: string;
}

export interface HeroBenefit {
    icon: string;
    title: string;
}
export interface HeroData {
    title: string;
    subtitle: string;
    imageUrl: string;
    benefits: HeroBenefit[];
}

export interface Feature {
    icon: string;
    title: string;
    description: string;
}
export interface FeaturesData {
    title: string;
    subtitle: string;
    imageUrl: string;
    features: Feature[];
}

export interface Benefit {
    icon: string;
    title: string;
    description: string;
}
export interface BenefitsData {
    backgroundImageUrl: string;
    benefits: Benefit[];
}

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

export interface FaqItem {
    question: string;
    answer: string;
}
export interface FaqData {
    title: string;
    items: FaqItem[];
}

export interface VideoFeature {
  icon: string;
  title: string;
  subtitle: string;
}

export interface VideoWithFeaturesData {
  title: string;
  videoUrl: string;
  features: VideoFeature[];
}

// NEW: Types for the Product Highlights section
export interface ProductHighlightStat {
  value: string;
  label: string;
  sublabel: string;
}

export interface ProductHighlightInfoPoint {
  icon_url: string;
  title: string;
  subtitle: string;
}

export interface ProductHighlightGuarantee {
  text: string;
}

export interface ProductHighlightsData {
  stats: ProductHighlightStat[];
  info_points: ProductHighlightInfoPoint[];
  guarantees: ProductHighlightGuarantee[];
}

// NEW: Types for the Product Promotions section to support the new design.
export interface PromotionPill {
  text: string;
  icon?: 'check' | 'sparkles' | null;
}

export interface PromotionCard {
  id: number;
  isBestDeal: boolean;
  pills: PromotionPill[];
  imageUrl: string | null;
  price: number;
  originalPrice: number | null;
  title: string;
  subtitle: string | null;
  pricePerUnitText: string | null;
  buttonText: string;
  footerText: string | null;
}

export interface PromotionsData {
  title: string;
  subtitle: string;
  countdownEndDate: string; // ISO 8601 format date string
  promotions: PromotionCard[];
}