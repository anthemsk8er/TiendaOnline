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
          product_id: string | null;
          scope: "cart" | "product";
          start_date: string | null;
          times_used: number;
          usage_limit: number | null;
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
          product_id?: string | null;
          scope: "cart" | "product";
          start_date?: string | null;
          times_used?: number;
          usage_limit?: number | null;
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
          product_id?: string | null;
          scope?: "cart" | "product";
          start_date?: string | null;
          times_used?: number;
          usage_limit?: number | null;
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
          address: string | null;
          cart_items: Json;
          created_at: string;
          department: string | null;
          discount_amount: number | null;
          discount_code: string | null;
          district: string | null;
          email: string | null;
          full_name: string;
          id: string;
          payment_method: string;
          phone: string;
          province: string | null;
          reference: string | null;
          shipping_method: string | null;
          total_amount: number;
          upsell_included: boolean;
        };
        Insert: {
          address?: string | null;
          cart_items: Json;
          created_at?: string;
          department?: string | null;
          discount_amount?: number | null;
          discount_code?: string | null;
          district?: string | null;
          email?: string | null;
          full_name: string;
          id?: string;
          payment_method: string;
          phone: string;
          province?: string | null;
          reference?: string | null;
          shipping_method?: string | null;
          total_amount: number;
          upsell_included: boolean;
        };
        Update: {
          address?: string | null;
          cart_items?: Json;
          created_at?: string;
          department?: string | null;
          discount_amount?: number | null;
          discount_code?: string | null;
          district?: string | null;
          email?: string | null;
          full_name?: string;
          id?: string;
          payment_method?: string;
          phone?: string;
          province?: string | null;
          reference?: string | null;
          shipping_method?: string | null;
          total_amount?: number;
          upsell_included?: boolean;
        };
        Relationships: [];
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
          benefit1_description: string | null;
          benefit1_title: string | null;
          benefit2_description: string | null;
          benefit2_title: string | null;
          benefit3_description: string | null;
          benefit3_title: string | null;
          benefit4_description: string | null;
          benefit4_title: string | null;
          benefits_data: Json | null;
          comparison_data: Json | null;
          created_at: string;
          description: string;
          desktop_content: string | null;
          discount_price: number | null;
          faq_data: Json | null;
          features_data: Json | null;
          hero_data: Json | null;
          highlights_data: Json | null;
          id: string;
          image_url: string;
          image_url_10: string | null;
          image_url_2: string | null;
          image_url_3: string | null;
          image_url_4: string | null;
          image_url_5: string | null;
          image_url_6: string | null;
          image_url_7: string | null;
          image_url_8: string | null;
          image_url_9: string | null;
          is_active: boolean;
          mobile_content: string | null;
          name: string;
          price: number;
          promotions_data: Json | null;
          slug: string | null;
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
          benefit1_description?: string | null;
          benefit1_title?: string | null;
          benefit2_description?: string | null;
          benefit2_title?: string | null;
          benefit3_description?: string | null;
          benefit3_title?: string | null;
          benefit4_description?: string | null;
          benefit4_title?: string | null;
          benefits_data?: Json | null;
          comparison_data?: Json | null;
          created_at?: string;
          description: string;
          desktop_content?: string | null;
          discount_price?: number | null;
          faq_data?: Json | null;
          features_data?: Json | null;
          hero_data?: Json | null;
          highlights_data?: Json | null;
          id?: string;
          image_url: string;
          image_url_10?: string | null;
          image_url_2?: string | null;
          image_url_3?: string | null;
          image_url_4?: string | null;
          image_url_5?: string | null;
          image_url_6?: string | null;
          image_url_7?: string | null;
          image_url_8?: string | null;
          image_url_9?: string | null;
          is_active?: boolean;
          mobile_content?: string | null;
          name: string;
          price: number;
          promotions_data?: Json | null;
          slug?: string | null;
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
          benefit1_description?: string | null;
          benefit1_title?: string | null;
          benefit2_description?: string | null;
          benefit2_title?: string | null;
          benefit3_description?: string | null;
          benefit3_title?: string | null;
          benefit4_description?: string | null;
          benefit4_title?: string | null;
          benefits_data?: Json | null;
          comparison_data?: Json | null;
          created_at?: string;
          description?: string;
          desktop_content?: string | null;
          discount_price?: number | null;
          faq_data?: Json | null;
          features_data?: Json | null;
          hero_data?: Json | null;
          highlights_data?: Json | null;
          id?: string;
          image_url?: string;
          image_url_10?: string | null;
          image_url_2?: string | null;
          image_url_3?: string | null;
          image_url_4?: string | null;
          image_url_5?: string | null;
          image_url_6?: string | null;
          image_url_7?: string | null;
          image_url_8?: string | null;
          image_url_9?: string | null;
          is_active?: boolean;
          mobile_content?: string | null;
          name?: string;
          price?: number;
          promotions_data?: Json | null;
          slug?: string | null;
          stock?: number;
          vendor?: string;
          video_url?: string | null;
          video_with_features_data?: Json | null;
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          full_name: string;
          id: string;
          role: "ADMIN" | "CLIENT";
        };
        Insert: {
          full_name: string;
          id: string;
          role?: "ADMIN" | "CLIENT";
        };
        Update: {
          full_name?: string;
          id?: string;
          role?: "ADMIN" | "CLIENT";
        };
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey";
            columns: ["id"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
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
          user_id: string | null;
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
          user_id?: string | null;
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
          user_id?: string | null;
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