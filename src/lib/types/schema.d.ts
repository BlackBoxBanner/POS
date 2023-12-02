import { PostgrestError } from '@supabase/supabase-js';

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  pgbouncer: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_auth: {
        Args: {
          p_usename: string
        }
        Returns: {
          username: string
          password: string
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  pos: {
    Tables: {
      branches: {
        Row: {
          branch_name: string
          created_at: string
          id: string
          phone_number: number
        }
        Insert: {
          branch_name: string
          created_at?: string
          id?: string
          phone_number: number
        }
        Update: {
          branch_name?: string
          created_at?: string
          id?: string
          phone_number?: number
        }
        Relationships: []
      }
      customers: {
        Row: {
          branch_id: string
          check_out_at: string | null
          created_at: string
          employee_id: string
          id: string
          table_id: string
          take_away: boolean
        }
        Insert: {
          branch_id: string
          check_out_at?: string | null
          created_at?: string
          employee_id: string
          id?: string
          table_id: string
          take_away?: boolean
        }
        Update: {
          branch_id?: string
          check_out_at?: string | null
          created_at?: string
          employee_id?: string
          id?: string
          table_id?: string
          take_away?: boolean
        }
        Relationships: []
      }
      dish_types: {
        Row: {
          created_at: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      employees: {
        Row: {
          created_at: string
          email: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      employees_branches: {
        Row: {
          branch_id: string
          employee_id: string
        }
        Insert: {
          branch_id: string
          employee_id: string
        }
        Update: {
          branch_id?: string
          employee_id?: string
        }
        Relationships: []
      }
      menus: {
        Row: {
          created_at: string
          id: string
          image: string | null
          name: string
          price: number
          status: boolean
          type: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          image?: string | null
          name: string
          price: number
          status?: boolean
          type?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          image?: string | null
          name?: string
          price?: number
          status?: boolean
          type?: string | null
        }
        Relationships: []
      }
      menus_orders: {
        Row: {
          menu_id: string
          order_id: string
        }
        Insert: {
          menu_id: string
          order_id: string
        }
        Update: {
          menu_id?: string
          order_id?: string
        }
        Relationships: []
      }
      orders: {
        Row: {
          created_at: string
          id: string
          status: boolean
          table_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          status?: boolean
          table_id: string
        }
        Update: {
          created_at?: string
          id?: string
          status?: boolean
          table_id?: string
        }
        Relationships: []
      }
      tables: {
        Row: {
          created_at: string
          id: string
          seat: number
          table_number: number
        }
        Insert: {
          created_at?: string
          id?: string
          seat: number
          table_number: number
        }
        Update: {
          created_at?: string
          id?: string
          seat?: number
          table_number?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      branches: {
        Row: {
          branch_name: string
          created_at: string
          id: string
          phone_number: number
        }
        Insert: {
          branch_name: string
          created_at?: string
          id?: string
          phone_number: number
        }
        Update: {
          branch_name?: string
          created_at?: string
          id?: string
          phone_number?: number
        }
        Relationships: []
      }
      customers: {
        Row: {
          branch_id: string
          check_out_at: string | null
          created_at: string
          employee_id: string
          id: string
          seat: number
          table_id: string
          take_away: boolean
        }
        Insert: {
          branch_id: string
          check_out_at?: string | null
          created_at?: string
          employee_id: string
          id?: string
          seat: number
          table_id: string
          take_away?: boolean
        }
        Update: {
          branch_id?: string
          check_out_at?: string | null
          created_at?: string
          employee_id?: string
          id?: string
          seat?: number
          table_id?: string
          take_away?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "customers_branch_id_fkey"
            columns: ["branch_id"]
            referencedRelation: "branches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customers_employee_id_fkey"
            columns: ["employee_id"]
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customers_table_id_fkey"
            columns: ["table_id"]
            referencedRelation: "tables"
            referencedColumns: ["id"]
          }
        ]
      }
      dish_types: {
        Row: {
          created_at: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      employees: {
        Row: {
          branch_id: string | null
          created_at: string
          email: string
          id: string
          image: string | null
          name: string
        }
        Insert: {
          branch_id?: string | null
          created_at?: string
          email: string
          id?: string
          image?: string | null
          name: string
        }
        Update: {
          branch_id?: string | null
          created_at?: string
          email?: string
          id?: string
          image?: string | null
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "employees_branch_id_fkey"
            columns: ["branch_id"]
            referencedRelation: "branches"
            referencedColumns: ["id"]
          }
        ]
      }
      history_order: {
        Row: {
          created_at: string
          customer_id: string
          id: string
          menus: Json[] | null
        }
        Insert: {
          created_at?: string
          customer_id: string
          id?: string
          menus?: Json[] | null
        }
        Update: {
          created_at?: string
          customer_id?: string
          id?: string
          menus?: Json[] | null
        }
        Relationships: [
          {
            foreignKeyName: "history_order_customer_id_fkey"
            columns: ["customer_id"]
            referencedRelation: "customers"
            referencedColumns: ["id"]
          }
        ]
      }
      menus: {
        Row: {
          created_at: string
          id: string
          image: string | null
          name: string
          price: number
          status: boolean
          type: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          image?: string | null
          name: string
          price: number
          status?: boolean
          type?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          image?: string | null
          name?: string
          price?: number
          status?: boolean
          type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "menus_type_fkey"
            columns: ["type"]
            referencedRelation: "dish_types"
            referencedColumns: ["id"]
          }
        ]
      }
      orders: {
        Row: {
          created_at: string
          id: string
          menu: string
          portion: number
          status: boolean
          table_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          menu: string
          portion: number
          status?: boolean
          table_id: string
        }
        Update: {
          created_at?: string
          id?: string
          menu?: string
          portion?: number
          status?: boolean
          table_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "orders_menu_fkey"
            columns: ["menu"]
            referencedRelation: "menus"
            referencedColumns: ["name"]
          },
          {
            foreignKeyName: "orders_table_id_fkey"
            columns: ["table_id"]
            referencedRelation: "tables"
            referencedColumns: ["id"]
          }
        ]
      }
      tables: {
        Row: {
          created_at: string
          id: string
          seat: number
          table_number: number
        }
        Insert: {
          created_at?: string
          id?: string
          seat: number
          table_number: number
        }
        Update: {
          created_at?: string
          id?: string
          seat?: number
          table_number?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "buckets_owner_fkey"
            columns: ["owner"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          path_tokens: string[] | null
          updated_at: string | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey"
            columns: ["bucket_id"]
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: unknown
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<T extends keyof Database['public']['Tables']> =
	Database['public']['Tables'][T]['Row'];
export type Inserts<T extends keyof Database['public']['Tables']> =
	Database['public']['Tables'][T]['Insert'];
export type Updates<T extends keyof Database['public']['Tables']> =
	Database['public']['Tables'][T]['Update'];
export type Updates<T extends keyof Database['public']['Tables']> =
	Database['public']['Tables'][T]['Relationships'];
export type Relationships<T extends keyof Database['public']['Enums']> =
	Database['public']['Enums'][T];

export type DbResult<T> = T extends PromiseLike<infer U> ? U : never;
export type DbResultOk<T> = T extends PromiseLike<{ data: infer U }> ? Exclude<U, null> : never;
export type DbResultErr = PostgrestError;
