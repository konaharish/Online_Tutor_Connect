export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      booking_sessions: {
        Row: {
          created_at: string
          fees: number
          grade: string
          id: string
          location: string
          scheduled_date: string
          special_requirements: string | null
          status: string
          student_id: string
          subject: string
          teaching_mode: string
          time_slot: string
          tutor_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          fees: number
          grade: string
          id?: string
          location: string
          scheduled_date: string
          special_requirements?: string | null
          status?: string
          student_id: string
          subject: string
          teaching_mode: string
          time_slot: string
          tutor_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          fees?: number
          grade?: string
          id?: string
          location?: string
          scheduled_date?: string
          special_requirements?: string | null
          status?: string
          student_id?: string
          subject?: string
          teaching_mode?: string
          time_slot?: string
          tutor_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "booking_sessions_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "booking_sessions_tutor_id_fkey"
            columns: ["tutor_id"]
            isOneToOne: false
            referencedRelation: "tutors"
            referencedColumns: ["id"]
          },
        ]
      }
      bookings: {
        Row: {
          created_at: string | null
          fees: number
          grade: string
          id: string
          location: string
          scheduled_date: string
          status: string | null
          student_id: string
          subject: string
          teaching_mode: string
          time_slot: string
          tutor_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          fees: number
          grade: string
          id?: string
          location: string
          scheduled_date: string
          status?: string | null
          student_id: string
          subject: string
          teaching_mode: string
          time_slot: string
          tutor_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          fees?: number
          grade?: string
          id?: string
          location?: string
          scheduled_date?: string
          status?: string | null
          student_id?: string
          subject?: string
          teaching_mode?: string
          time_slot?: string
          tutor_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bookings_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_tutor_id_fkey"
            columns: ["tutor_id"]
            isOneToOne: false
            referencedRelation: "tutors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_bookings_student_id"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_bookings_tutor_id"
            columns: ["tutor_id"]
            isOneToOne: false
            referencedRelation: "tutors"
            referencedColumns: ["id"]
          },
        ]
      }
      favorites: {
        Row: {
          created_at: string | null
          id: string
          student_id: string
          tutor_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          student_id: string
          tutor_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          student_id?: string
          tutor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "favorites_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "favorites_tutor_id_fkey"
            columns: ["tutor_id"]
            isOneToOne: false
            referencedRelation: "tutors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_favorites_student_id"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_favorites_tutor_id"
            columns: ["tutor_id"]
            isOneToOne: false
            referencedRelation: "tutors"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          email: string
          id: string
          name: string
          phone: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id: string
          name: string
          phone?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          name?: string
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      reviews: {
        Row: {
          booking_id: string | null
          comment: string | null
          created_at: string | null
          id: string
          rating: number
          student_id: string
          student_name: string
          subject: string
          tutor_id: string
        }
        Insert: {
          booking_id?: string | null
          comment?: string | null
          created_at?: string | null
          id?: string
          rating: number
          student_id: string
          student_name: string
          subject: string
          tutor_id: string
        }
        Update: {
          booking_id?: string | null
          comment?: string | null
          created_at?: string | null
          id?: string
          rating?: number
          student_id?: string
          student_name?: string
          subject?: string
          tutor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_reviews_booking_id"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_reviews_student_id"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_reviews_tutor_id"
            columns: ["tutor_id"]
            isOneToOne: false
            referencedRelation: "tutors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_tutor_id_fkey"
            columns: ["tutor_id"]
            isOneToOne: false
            referencedRelation: "tutors"
            referencedColumns: ["id"]
          },
        ]
      }
      students: {
        Row: {
          address: string
          budget_max: number | null
          budget_min: number | null
          city: string
          coordinates_lat: number | null
          coordinates_lng: number | null
          created_at: string | null
          email: string
          grade: string
          id: string
          name: string
          phone: string
          preferred_mode: string | null
          state: string
          subjects: string[] | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          address: string
          budget_max?: number | null
          budget_min?: number | null
          city: string
          coordinates_lat?: number | null
          coordinates_lng?: number | null
          created_at?: string | null
          email: string
          grade: string
          id?: string
          name: string
          phone: string
          preferred_mode?: string | null
          state: string
          subjects?: string[] | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          address?: string
          budget_max?: number | null
          budget_min?: number | null
          city?: string
          coordinates_lat?: number | null
          coordinates_lng?: number | null
          created_at?: string | null
          email?: string
          grade?: string
          id?: string
          name?: string
          phone?: string
          preferred_mode?: string | null
          state?: string
          subjects?: string[] | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      tutors: {
        Row: {
          address: string
          availability_days: string[] | null
          city: string
          coordinates_lat: number | null
          coordinates_lng: number | null
          created_at: string | null
          email: string
          experience: number | null
          fees_grade10: number | null
          fees_grade11to12: number | null
          fees_grade1to4: number | null
          fees_grade5to9: number | null
          fees_graduation: number | null
          id: string
          is_verified: boolean | null
          name: string
          phone: string
          photo: string | null
          qualifications: string[] | null
          rating: number | null
          state: string
          subjects: string[] | null
          teaching_mode: string | null
          time_slots: string[] | null
          total_reviews: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          address: string
          availability_days?: string[] | null
          city: string
          coordinates_lat?: number | null
          coordinates_lng?: number | null
          created_at?: string | null
          email: string
          experience?: number | null
          fees_grade10?: number | null
          fees_grade11to12?: number | null
          fees_grade1to4?: number | null
          fees_grade5to9?: number | null
          fees_graduation?: number | null
          id?: string
          is_verified?: boolean | null
          name: string
          phone: string
          photo?: string | null
          qualifications?: string[] | null
          rating?: number | null
          state: string
          subjects?: string[] | null
          teaching_mode?: string | null
          time_slots?: string[] | null
          total_reviews?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          address?: string
          availability_days?: string[] | null
          city?: string
          coordinates_lat?: number | null
          coordinates_lng?: number | null
          created_at?: string | null
          email?: string
          experience?: number | null
          fees_grade10?: number | null
          fees_grade11to12?: number | null
          fees_grade1to4?: number | null
          fees_grade5to9?: number | null
          fees_graduation?: number | null
          id?: string
          is_verified?: boolean | null
          name?: string
          phone?: string
          photo?: string | null
          qualifications?: string[] | null
          rating?: number | null
          state?: string
          subjects?: string[] | null
          teaching_mode?: string | null
          time_slots?: string[] | null
          total_reviews?: number | null
          updated_at?: string | null
          user_id?: string | null
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
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
