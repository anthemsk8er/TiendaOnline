export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string;
          name: string;
        };
        Insert: {
          id?: string;
          name: string;
        };
        Update: {
          id?: string;
          name?: string;
        };
        Relationships: [];
      };
      discount_codes: {
        Row: {
          code: string;
          created_at: string;
          discount_type: "percentage" | "fixed_amount";
          discount_value: number;
          end_date: string | null;
          id: string;
          is_active: boolean;
          limitation_type: "date_range" | "usage_limit";
          minimum_purchase_amount: number | null;
          product_id: string | null;
          scope: "cart" | "product";
          start_date: string | null;
          times_used: number;
          usage_limit: number | null;
          usage_limit_per_user: number | null;
        };
        Insert: {
          code: string;
          created_at?: string;
          discount_type: "percentage" | "fixed_amount";
          discount_value: number;
          end_date?: string | null;
          id?: string;
          is_active?: boolean;
          limitation_type: "date_range" | "usage_limit";
          minimum_purchase_amount?: number | null;
          product_id?: string | null;
          scope: "cart" | "product";
          start_date?: string | null;
          times_used?: number;
          usage_limit?: number | null;
          usage_limit_per_user?: number | null;
        };
        Update: {
          code?: string;
          created_at?: string;
          discount_type?: "percentage" | "fixed_amount";
          discount_value?: number;
          end_date?: string | null;
          id?: string;
          is_active?: boolean;
          limitation_type?: "date_range" | "usage_limit";
          minimum_purchase_amount?: number | null;
          product_id?: string | null;
          scope?: "cart" | "product";
          start_date?: string | null;
          times_used?: number;
          usage_limit?: number | null;
          usage_limit_per_user?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "discount_codes_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          }
        ];
      };
      leads: {
        Row: {
          created_at: string;
          discount_code_id: string;
          full_name: string;
          id: number;
          phone: string;
        };
        Insert: {
          created_at?: string;
          discount_code_id: string;
          full_name: string;
          id?: number;
          phone: string;
        };
        Update: {
          created_at?: string;
          discount_code_id?: string;
          full_name?: string;
          id?: number;
          phone?: string;
        };
        Relationships: [
          {
            foreignKeyName: "leads_discount_code_id_fkey";
            columns: ["discount_code_id"];
            isOneToOne: false;
            referencedRelation: "discount_codes";
            referencedColumns: ["id"];
          }
        ];
      };
      orders: {
        Row: {
          address: string;
          cart_items: Json;
          created_at: string;
          department: string;
          discount_amount: number | null;
          discount_code: string | null;
          district: string;
          email: string;
          full_name: string;
          id: string;
          payment_method: string;
          phone: string;
          province: string;
          reference: string | null;
          shipping_method: string | null;
          total_amount: number;
          upsell_included: boolean;
          user_id: string | null;
        };
        Insert: {
          address: string;
          cart_items: Json;
          created_at?: string;
          department: string;
          discount_amount?: number | null;
          discount_code?: string | null;
          district: string;
          email: string;
          full_name: string;
          id?: string;
          payment_method: string;
          phone: string;
          province: string;
          reference?: string | null;
          shipping_method?: string | null;
          total_amount: number;
          upsell_included: boolean;
          user_id?: string | null;
        };
        Update: {
          address?: string;
          cart_items?: Json;
          created_at?: string;
          department?: string;
          discount_amount?: number | null;
          discount_code?: string | null;
          district?: string;
          email?: string;
          full_name?: string;
          id?: string;
          payment_method?: string;
          phone?: string;
          province?: string;
          reference?: string | null;
          shipping_method?: string | null;
          total_amount?: number;
          upsell_included?: boolean;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "orders_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      product_categories: {
        Row: {
          category_id: string;
          product_id: string;
        };
        Insert: {
          category_id: string;
          product_id: string;
        };
        Update: {
          category_id?: string;
          product_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "product_categories_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "categories";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "product_categories_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          }
        ];
      };
      product_tags: {
        Row: {
          product_id: string;
          tag_id: string;
        };
        Insert: {
          product_id: string;
          tag_id: string;
        };
        Update: {
          product_id?: string;
          tag_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "product_tags_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "product_tags_tag_id_fkey";
            columns: ["tag_id"];
            isOneToOne: false;
            referencedRelation: "tags";
            referencedColumns: ["id"];
          }
        ];
      };
      products: {
        Row: {
          accordion_point1_content: string | null;
          accordion_point1_title: string | null;
          accordion_point2_content: string | null;
          accordion_point2_title: string | null;
          accordion_point3_content: string | null;
          accordion_point3_title: string | null;
          accordion_point4_content: string | null;
          accordion_point4_title: string | null;
          benefits_data: Json | null;
          comparison_data: Json | null;
          created_at: string;
          description: string;
          discount_price: number | null;
          faq_data: Json | null;
          features_data: Json | null;
          hero_data: Json | null;
          id: string;
          image_url: string;
          image_url_2: string | null;
          image_url_3: string | null;
          image_url_4: string | null;
          is_active: boolean;
          name: string;
          price: number;
          stock: number;
          vendor: string;
          video_url: string | null;
          video_with_features_data: Json | null;
        };
        Insert: {
          accordion_point1_content?: string | null;
          accordion_point1_title?: string | null;
          accordion_point2_content?: string | null;
          accordion_point2_title?: string | null;
          accordion_point3_content?: string | null;
          accordion_point3_title?: string | null;
          accordion_point4_content?: string | null;
          accordion_point4_title?: string | null;
          benefits_data?: Json | null;
          comparison_data?: Json | null;
          created_at?: string;
          description: string;
          discount_price?: number | null;
          faq_data?: Json | null;
          features_data?: Json | null;
          hero_data?: Json | null;
          id?: string;
          image_url: string;
          image_url_2?: string | null;
          image_url_3?: string | null;
          image_url_4?: string | null;
          is_active?: boolean;
          name: string;
          price: number;
          stock: number;
          vendor: string;
          video_url?: string | null;
          video_with_features_data?: Json | null;
        };
        Update: {
          accordion_point1_content?: string | null;
          accordion_point1_title?: string | null;
          accordion_point2_content?: string | null;
          accordion_point2_title?: string | null;
          accordion_point3_content?: string | null;
          accordion_point3_title?: string | null;
          accordion_point4_content?: string | null;
          accordion_point4_title?: string | null;
          benefits_data?: Json | null;
          comparison_data?: Json | null;
          created_at?: string;
          description?: string;
          discount_price?: number | null;
          faq_data?: Json | null;
          features_data?: Json | null;
          hero_data?: Json | null;
          id?: string;
          image_url?: string;
          image_url_2?: string | null;
          image_url_3?: string | null;
          image_url_4?: string | null;
          is_active?: boolean;
          name?: string;
          price?: number;
          stock?: number;
          vendor?: string;
          video_url?: string | null;
          video_with_features_data?: Json | null;
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          email?: string | null;
          full_name: string;
          gift_coupon_1_used: boolean;
          gift_coupon_2_used: boolean;
          gift_coupon_3_used: boolean;
          id: string;
          phone?: string | null;
          role: "ADMIN" | "CLIENT";
        };
        Insert: {
          email?: string | null;
          full_name: string;
          gift_coupon_1_used?: boolean;
          gift_coupon_2_used?: boolean;
          gift_coupon_3_used?: boolean;
          id: string;
          phone?: string | null;
          role?: "ADMIN" | "CLIENT";
        };
        Update: {
          email?: string | null;
          full_name?: string;
          gift_coupon_1_used?: boolean;
          gift_coupon_2_used?: boolean;
          gift_coupon_3_used?: boolean;
          id?: string;
          phone?: string | null;
          role?: "ADMIN" | "CLIENT";
        };
        Relationships: [];
      };
      reviews: {
        Row: {
          author_name: string;
          author_province: string;
          comment: string;
          created_at: string;
          id: string;
          image_url: string | null;
          is_approved: boolean;
          product_id: string;
          rating: number;
          user_id: string;
        };
        Insert: {
          author_name: string;
          author_province: string;
          comment: string;
          created_at?: string;
          id?: string;
          image_url?: string | null;
          is_approved?: boolean;
          product_id: string;
          rating: number;
          user_id: string;
        };
        Update: {
          author_name?: string;
          author_province?: string;
          comment?: string;
          created_at?: string;
          id?: string;
          image_url?: string | null;
          is_approved?: boolean;
          product_id?: string;
          rating?: number;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "reviews_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          }
        ];
      };
      tags: {
        Row: {
          color: string;
          id: string;
          name: string;
        };
        Insert: {
          color?: string;
          id?: string;
          name: string;
        };
        Update: {
          color?: string;
          id?: string;
          name?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never
    };
    Functions: {
      increment_discount_usage: {
        Args: {
          p_code: string;
        };
        Returns: undefined;
      };
    };
    Enums: {
      [_ in never]: never
    };
    CompositeTypes: {
      [_ in never]: never
    };
  };
};