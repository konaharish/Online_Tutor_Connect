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
    Enums: {},
  },
} as const
