
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id?: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
      }
      discount_codes: {
        Row: {
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
        Insert: {
          code: string
          discount_type: 'percentage' | 'fixed_amount'
          discount_value: number
          limitation_type: 'date_range' | 'usage_limit'
          start_date?: string | null
          end_date?: string | null
          usage_limit?: number | null
          scope: 'cart' | 'product'
          product_id?: string | null
          is_active: boolean
        }
        Update: {
          code?: string
          discount_type?: 'percentage' | 'fixed_amount'
          discount_value?: number
          limitation_type?: 'date_range' | 'usage_limit'
          start_date?: string | null
          end_date?: string | null
          usage_limit?: number | null
          scope?: 'cart' | 'product'
          product_id?: string | null
          is_active?: boolean
        }
      }
      leads: {
          Row: {
              id: number;
              created_at: string;
              full_name: string;
              phone: string;
              discount_code_id: string;
          }
          Insert: {
              full_name: string;
              phone: string;
              discount_code_id: string;
          }
          Update: {
              full_name?: string;
              phone?: string;
              discount_code_id?: string;
          }
      }
      orders: {
        Row: {
          id: string;
          created_at: string;
          full_name: string;
          email: string;
          phone: string;
          address: string;
          reference: string | null;
          department: string;
          province: string;
          district: string;
          shipping_method: string | null;
          payment_method: string;
          cart_items: Json; 
          upsell_included: boolean;
          total_amount: number;
          discount_code: string | null;
          discount_amount: number | null;
        }
        Insert: {
          full_name: string
          email: string
          phone: string
          address: string
          reference?: string | null
          department: string
          province: string
          district: string
          shipping_method?: string | null
          payment_method: string
          cart_items: Json
          upsell_included: boolean
          total_amount: number
          discount_code?: string | null
          discount_amount?: number | null
        }
        Update: {
          full_name?: string
          email?: string
          phone?: string
          address?: string
          reference?: string | null
          department?: string
          province?: string
          district?: string
          shipping_method?: string | null
          payment_method?: string
          cart_items?: Json
          upsell_included?: boolean
          total_amount?: number
          discount_code?: string | null
          discount_amount?: number | null
        }
      }
      reviews: {
        Row: {
          id: string
          created_at: string
          product_id: string
          user_id: string
          author_name: string
          author_province: string
          comment: string
          image_url: string | null
          rating: number
          is_approved: boolean
        }
        Insert: {
          id?: string
          product_id: string
          user_id: string
          author_name: string
          author_province: string
          comment: string
          image_url?: string | null
          rating: number
          is_approved?: boolean
        }
        Update: {
          id?: string
          product_id?: string
          user_id?: string
          author_name?: string
          author_province?: string
          comment?: string
          image_url?: string | null
          rating?: number
          is_approved?: boolean
        }
      }
      product_categories: {
        Row: {
          product_id: string
          category_id: string
        }
        Insert: {
          product_id: string
          category_id: string
        }
        Update: {
          product_id?: string
          category_id?: string
        }
      }
      product_tags: {
        Row: {
          product_id: string
          tag_id: string
        }
        Insert: {
          product_id: string
          tag_id: string
        }
        Update: {
          product_id?: string
          tag_id?: string
        }
      }
      products: {
        Row: {
          id: string
          name: string
          description: string
          price: number
          discount_price: number | null
          image_url: string
          image_url_2: string | null
          image_url_3: string | null
          image_url_4: string | null
          video_url: string | null
          stock: number
          vendor: string
          is_active: boolean
          created_at: string
          accordion_point1_title: string | null
          accordion_point1_content: string | null
          accordion_point2_title: string | null
          accordion_point2_content: string | null
          accordion_point3_title: string | null
          accordion_point3_content: string | null
          accordion_point4_title: string | null
          accordion_point4_content: string | null
          hero_data: Json | null
          features_data: Json | null
          benefits_data: Json | null
          comparison_data: Json | null
          faq_data: Json | null
          video_with_features_data: Json | null
        }
        Insert: {
          name: string
          description: string
          price: number
          discount_price?: number | null
          image_url: string
          image_url_2?: string | null
          image_url_3?: string | null
          image_url_4?: string | null
          video_url?: string | null
          stock: number
          vendor: string
          is_active: boolean
          accordion_point1_title?: string | null
          accordion_point1_content?: string | null
          accordion_point2_title?: string | null
          accordion_point2_content?: string | null
          accordion_point3_title?: string | null
          accordion_point3_content?: string | null
          accordion_point4_title?: string | null
          accordion_point4_content?: string | null
          hero_data?: Json | null
          features_data?: Json | null
          benefits_data?: Json | null
          comparison_data?: Json | null
          faq_data?: Json | null
          video_with_features_data?: Json | null
        }
        Update: {
          name?: string
          description?: string
          price?: number
          discount_price?: number | null
          image_url?: string
          image_url_2?: string | null
          image_url_3?: string | null
          image_url_4?: string | null
          video_url?: string | null
          stock?: number
          vendor?: string
          is_active?: boolean
          accordion_point1_title?: string | null
          accordion_point1_content?: string | null
          accordion_point2_title?: string | null
          accordion_point2_content?: string | null
          accordion_point3_title?: string | null
          accordion_point3_content?: string | null
          accordion_point4_title?: string | null
          accordion_point4_content?: string | null
          hero_data?: Json | null
          features_data?: Json | null
          benefits_data?: Json | null
          comparison_data?: Json | null
          faq_data?: Json | null
          video_with_features_data?: Json | null
        }
      }
      profiles: {
        Row: {
          id: string
          full_name: string
          role: 'ADMIN' | 'CLIENT'
        }
        Insert: {
          id: string
          full_name: string
          role: 'ADMIN' | 'CLIENT'
        }
        Update: {
          id?: string
          full_name?: string
          role?: 'ADMIN' | 'CLIENT'
        }
      }
      tags: {
        Row: {
          id: string
          name: string
          color: string
        }
        Insert: {
          id?: string
          name: string
          color: string
        }
        Update: {
          id?: string
          name?: string
          color?: string
        }
      }
    }
    Functions: {
        increment_discount_usage: {
            Args: { p_code: string };
            Returns: undefined;
        }
    }
    Enums: {}
    CompositeTypes: {}
  }
}
