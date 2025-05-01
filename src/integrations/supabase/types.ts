export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      app_config: {
        Row: {
          created_at: string | null
          key: string
          updated_at: string | null
          value: string
        }
        Insert: {
          created_at?: string | null
          key: string
          updated_at?: string | null
          value: string
        }
        Update: {
          created_at?: string | null
          key?: string
          updated_at?: string | null
          value?: string
        }
        Relationships: []
      }
      countries: {
        Row: {
          area: number
          created_at: string | null
          id: string
          name: string
          region: Database["public"]["Enums"]["region_type"]
          Type: string | null
          updated_at: string | null
        }
        Insert: {
          area: number
          created_at?: string | null
          id: string
          name: string
          region: Database["public"]["Enums"]["region_type"]
          Type?: string | null
          updated_at?: string | null
        }
        Update: {
          area?: number
          created_at?: string | null
          id?: string
          name?: string
          region?: Database["public"]["Enums"]["region_type"]
          Type?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      country_gdp: {
        Row: {
          actual_2023: number
          country_id: string | null
          created_at: string | null
          estimate_2024: number
          id: string
          updated_at: string | null
        }
        Insert: {
          actual_2023: number
          country_id?: string | null
          created_at?: string | null
          estimate_2024: number
          id?: string
          updated_at?: string | null
        }
        Update: {
          actual_2023?: number
          country_id?: string | null
          created_at?: string | null
          estimate_2024?: number
          id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "country_gdp_country_id_fkey"
            columns: ["country_id"]
            isOneToOne: true
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
        ]
      }
      country_insights: {
        Row: {
          country_id: string | null
          created_at: string | null
          id: string
          insight_text: string
        }
        Insert: {
          country_id?: string | null
          created_at?: string | null
          id?: string
          insight_text: string
        }
        Update: {
          country_id?: string | null
          created_at?: string | null
          id?: string
          insight_text?: string
        }
        Relationships: [
          {
            foreignKeyName: "country_insights_country_id_fkey"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
        ]
      }
      country_sectors: {
        Row: {
          country_id: string | null
          created_at: string | null
          id: string
          sector_name: string
        }
        Insert: {
          country_id?: string | null
          created_at?: string | null
          id?: string
          sector_name: string
        }
        Update: {
          country_id?: string | null
          created_at?: string | null
          id?: string
          sector_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "country_sectors_country_id_fkey"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
        ]
      }
      national_reactions: {
        Row: {
          country_id: string | null
          created_at: string | null
          description: string
          id: string
        }
        Insert: {
          country_id?: string | null
          created_at?: string | null
          description: string
          id?: string
        }
        Update: {
          country_id?: string | null
          created_at?: string | null
          description?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "national_reactions_country_id_fkey"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
        ]
      }
      us_trade_data: {
        Row: {
          country_id: string | null
          created_at: string | null
          id: string
          reciprocal_tariff: number | null
          share_of_exports: number | null
          share_of_imports: number | null
          tariffs_to_us: number | null
          trade_balance: number | null
          updated_at: string | null
        }
        Insert: {
          country_id?: string | null
          created_at?: string | null
          id?: string
          reciprocal_tariff?: number | null
          share_of_exports?: number | null
          share_of_imports?: number | null
          tariffs_to_us?: number | null
          trade_balance?: number | null
          updated_at?: string | null
        }
        Update: {
          country_id?: string | null
          created_at?: string | null
          id?: string
          reciprocal_tariff?: number | null
          share_of_exports?: number | null
          share_of_imports?: number | null
          tariffs_to_us?: number | null
          trade_balance?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "us_trade_data_country_id_fkey"
            columns: ["country_id"]
            isOneToOne: true
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      region_type:
        | "Asia"
        | "Europe"
        | "Eurasia"
        | "North America"
        | "South America"
        | "Africa"
        | "Oceania"
        | "Middle East"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      region_type: [
        "Asia",
        "Europe",
        "Eurasia",
        "North America",
        "South America",
        "Africa",
        "Oceania",
        "Middle East",
      ],
    },
  },
} as const
