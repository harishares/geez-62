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
      content_bookmarks: {
        Row: {
          content_id: string
          created_at: string
          id: string
          user_id: string
        }
        Insert: {
          content_id: string
          created_at?: string
          id?: string
          user_id: string
        }
        Update: {
          content_id?: string
          created_at?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "content_bookmarks_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "mentor_content"
            referencedColumns: ["id"]
          },
        ]
      }
      law_categories: {
        Row: {
          created_at: string
          description: string | null
          icon: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      law_resources: {
        Row: {
          category_id: string | null
          content: string | null
          created_at: string
          description: string | null
          id: string
          is_free: boolean | null
          title: string
          url: string | null
        }
        Insert: {
          category_id?: string | null
          content?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_free?: boolean | null
          title: string
          url?: string | null
        }
        Update: {
          category_id?: string | null
          content?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_free?: boolean | null
          title?: string
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "law_resources_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "law_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      mentor_content: {
        Row: {
          created_at: string
          description: string
          difficulty: string
          duration: number | null
          id: string
          is_free: boolean
          mentor_id: string
          thumbnail_url: string | null
          title: string
          updated_at: string
          video_url: string
        }
        Insert: {
          created_at?: string
          description: string
          difficulty?: string
          duration?: number | null
          id?: string
          is_free?: boolean
          mentor_id: string
          thumbnail_url?: string | null
          title: string
          updated_at?: string
          video_url: string
        }
        Update: {
          created_at?: string
          description?: string
          difficulty?: string
          duration?: number | null
          id?: string
          is_free?: boolean
          mentor_id?: string
          thumbnail_url?: string | null
          title?: string
          updated_at?: string
          video_url?: string
        }
        Relationships: [
          {
            foreignKeyName: "mentor_content_mentor_id_fkey"
            columns: ["mentor_id"]
            isOneToOne: false
            referencedRelation: "mentors"
            referencedColumns: ["id"]
          },
        ]
      }
      mentor_messages: {
        Row: {
          created_at: string
          id: string
          message: string
          read: boolean
          recipient_id: string
          sender_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          message: string
          read?: boolean
          recipient_id: string
          sender_id: string
        }
        Update: {
          created_at?: string
          id?: string
          message?: string
          read?: boolean
          recipient_id?: string
          sender_id?: string
        }
        Relationships: []
      }
      mentors: {
        Row: {
          available_slots: Json | null
          bio: string
          category: Database["public"]["Enums"]["mentor_category"]
          created_at: string
          experience_years: number
          full_name: string
          hourly_rate: number
          id: string
          intro_video_url: string | null
          languages: string[]
          rating: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          available_slots?: Json | null
          bio: string
          category: Database["public"]["Enums"]["mentor_category"]
          created_at?: string
          experience_years: number
          full_name: string
          hourly_rate: number
          id?: string
          intro_video_url?: string | null
          languages: string[]
          rating?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          available_slots?: Json | null
          bio?: string
          category?: Database["public"]["Enums"]["mentor_category"]
          created_at?: string
          experience_years?: number
          full_name?: string
          hourly_rate?: number
          id?: string
          intro_video_url?: string | null
          languages?: string[]
          rating?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      mentorship_sessions: {
        Row: {
          created_at: string
          duration_minutes: number
          id: string
          mentor_id: string
          mentor_joined: boolean
          room_id: string | null
          scheduled_at: string
          session_type: string
          status: string
          updated_at: string
          user_feedback: string | null
          user_id: string
          user_joined: boolean
          user_rating: number | null
        }
        Insert: {
          created_at?: string
          duration_minutes?: number
          id?: string
          mentor_id: string
          mentor_joined?: boolean
          room_id?: string | null
          scheduled_at: string
          session_type?: string
          status?: string
          updated_at?: string
          user_feedback?: string | null
          user_id: string
          user_joined?: boolean
          user_rating?: number | null
        }
        Update: {
          created_at?: string
          duration_minutes?: number
          id?: string
          mentor_id?: string
          mentor_joined?: boolean
          room_id?: string | null
          scheduled_at?: string
          session_type?: string
          status?: string
          updated_at?: string
          user_feedback?: string | null
          user_id?: string
          user_joined?: boolean
          user_rating?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "mentorship_sessions_mentor_id_fkey"
            columns: ["mentor_id"]
            isOneToOne: false
            referencedRelation: "mentors"
            referencedColumns: ["id"]
          },
        ]
      }
      mentorship_subscriptions: {
        Row: {
          created_at: string
          expires_at: string | null
          id: string
          mentor_id: string | null
          payment_id: string | null
          payment_method: string | null
          started_at: string | null
          status: Database["public"]["Enums"]["subscription_status"]
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          expires_at?: string | null
          id?: string
          mentor_id?: string | null
          payment_id?: string | null
          payment_method?: string | null
          started_at?: string | null
          status?: Database["public"]["Enums"]["subscription_status"]
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          expires_at?: string | null
          id?: string
          mentor_id?: string | null
          payment_id?: string | null
          payment_method?: string | null
          started_at?: string | null
          status?: Database["public"]["Enums"]["subscription_status"]
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "mentorship_subscriptions_mentor_id_fkey"
            columns: ["mentor_id"]
            isOneToOne: false
            referencedRelation: "mentors"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          course: string | null
          created_at: string
          description: string | null
          full_name: string | null
          id: string
          industry: string | null
          org_name: string | null
          skills: string[] | null
          study_year: number | null
          university: string | null
          updated_at: string
          user_role: Database["public"]["Enums"]["user_role"]
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          course?: string | null
          created_at?: string
          description?: string | null
          full_name?: string | null
          id: string
          industry?: string | null
          org_name?: string | null
          skills?: string[] | null
          study_year?: number | null
          university?: string | null
          updated_at?: string
          user_role: Database["public"]["Enums"]["user_role"]
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          course?: string | null
          created_at?: string
          description?: string | null
          full_name?: string | null
          id?: string
          industry?: string | null
          org_name?: string | null
          skills?: string[] | null
          study_year?: number | null
          university?: string | null
          updated_at?: string
          user_role?: Database["public"]["Enums"]["user_role"]
          website?: string | null
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
      mentor_category:
        | "academics"
        | "career"
        | "technology"
        | "business"
        | "arts"
        | "personal_development"
        | "other"
      subscription_status: "none" | "trial" | "active" | "cancelled" | "expired"
      user_role: "student" | "organization"
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
      mentor_category: [
        "academics",
        "career",
        "technology",
        "business",
        "arts",
        "personal_development",
        "other",
      ],
      subscription_status: ["none", "trial", "active", "cancelled", "expired"],
      user_role: ["student", "organization"],
    },
  },
} as const
