export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      competitions: {
        Row: {
          created_at: string
          date: string | null
          id: number
          notes: string[] | null
          result: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          date?: string | null
          id?: number
          notes?: string[] | null
          result?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          date?: string | null
          id?: number
          notes?: string[] | null
          result?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "competitions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      customers: {
        Row: {
          id: string
          stripe_customer_id: string | null
        }
        Insert: {
          id: string
          stripe_customer_id?: string | null
        }
        Update: {
          id?: string
          stripe_customer_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "customers_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      exercises: {
        Row: {
          category: string | null
          created_at: string
          description: string | null
          id: number
          name: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string
          description?: string | null
          id?: number
          name?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string | null
          id?: number
          name?: string | null
        }
        Relationships: []
      }
      goals: {
        Row: {
          created_at: string
          goal: string | null
          id: number
          notes: string[] | null
          status: string | null
          target_date: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          goal?: string | null
          id?: number
          notes?: string[] | null
          status?: string | null
          target_date?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          goal?: string | null
          id?: number
          notes?: string[] | null
          status?: string | null
          target_date?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "goals_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      prices: {
        Row: {
          active: boolean | null
          currency: string | null
          description: string | null
          id: string
          interval: Database["public"]["Enums"]["pricing_plan_interval"] | null
          interval_count: number | null
          metadata: Json | null
          product_id: string | null
          trial_period_days: number | null
          type: Database["public"]["Enums"]["pricing_type"] | null
          unit_amount: number | null
        }
        Insert: {
          active?: boolean | null
          currency?: string | null
          description?: string | null
          id: string
          interval?: Database["public"]["Enums"]["pricing_plan_interval"] | null
          interval_count?: number | null
          metadata?: Json | null
          product_id?: string | null
          trial_period_days?: number | null
          type?: Database["public"]["Enums"]["pricing_type"] | null
          unit_amount?: number | null
        }
        Update: {
          active?: boolean | null
          currency?: string | null
          description?: string | null
          id?: string
          interval?: Database["public"]["Enums"]["pricing_plan_interval"] | null
          interval_count?: number | null
          metadata?: Json | null
          product_id?: string | null
          trial_period_days?: number | null
          type?: Database["public"]["Enums"]["pricing_type"] | null
          unit_amount?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "prices_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          }
        ]
      }
      products: {
        Row: {
          active: boolean | null
          description: string | null
          id: string
          image: string | null
          metadata: Json | null
          name: string | null
        }
        Insert: {
          active?: boolean | null
          description?: string | null
          id: string
          image?: string | null
          metadata?: Json | null
          name?: string | null
        }
        Update: {
          active?: boolean | null
          description?: string | null
          id?: string
          image?: string | null
          metadata?: Json | null
          name?: string | null
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          cancel_at: string | null
          cancel_at_period_end: boolean | null
          canceled_at: string | null
          created: string
          current_period_end: string
          current_period_start: string
          ended_at: string | null
          id: string
          metadata: Json | null
          price_id: string | null
          quantity: number | null
          status: Database["public"]["Enums"]["subscription_status"] | null
          trial_end: string | null
          trial_start: string | null
          user_id: string
        }
        Insert: {
          cancel_at?: string | null
          cancel_at_period_end?: boolean | null
          canceled_at?: string | null
          created?: string
          current_period_end?: string
          current_period_start?: string
          ended_at?: string | null
          id: string
          metadata?: Json | null
          price_id?: string | null
          quantity?: number | null
          status?: Database["public"]["Enums"]["subscription_status"] | null
          trial_end?: string | null
          trial_start?: string | null
          user_id: string
        }
        Update: {
          cancel_at?: string | null
          cancel_at_period_end?: boolean | null
          canceled_at?: string | null
          created?: string
          current_period_end?: string
          current_period_start?: string
          ended_at?: string | null
          id?: string
          metadata?: Json | null
          price_id?: string | null
          quantity?: number | null
          status?: Database["public"]["Enums"]["subscription_status"] | null
          trial_end?: string | null
          trial_start?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_price_id_fkey"
            columns: ["price_id"]
            isOneToOne: false
            referencedRelation: "prices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscriptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      techniques: {
        Row: {
          category: string | null
          created_at: string
          description: string | null
          id: number
          name: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string
          description?: string | null
          id?: number
          name?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string | null
          id?: number
          name?: string | null
        }
        Relationships: []
      }
      users: {
        Row: {
          avatar_url: string | null
          billing_address: Json | null
          full_name: string | null
          id: string
          payment_method: Json | null
        }
        Insert: {
          avatar_url?: string | null
          billing_address?: Json | null
          full_name?: string | null
          id: string
          payment_method?: Json | null
        }
        Update: {
          avatar_url?: string | null
          billing_address?: Json | null
          full_name?: string | null
          id?: string
          payment_method?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      "workout exercises ": {
        Row: {
          created_at: string
          exercise_id: number
          reps: number | null
          sets: number | null
          "weight ": number | null
          workout_id: number
        }
        Insert: {
          created_at?: string
          exercise_id: number
          reps?: number | null
          sets?: number | null
          "weight "?: number | null
          workout_id: number
        }
        Update: {
          created_at?: string
          exercise_id?: number
          reps?: number | null
          sets?: number | null
          "weight "?: number | null
          workout_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "workout exercises _exercise_id_fkey"
            columns: ["exercise_id"]
            isOneToOne: false
            referencedRelation: "exercises"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workout exercises _workout_id_fkey"
            columns: ["workout_id"]
            isOneToOne: false
            referencedRelation: "workouts"
            referencedColumns: ["id"]
          }
        ]
      }
      "workout techniques": {
        Row: {
          created_at: string
          performance: number | null
          success: boolean | null
          techniques_id: number
          workout_id: number
        }
        Insert: {
          created_at?: string
          performance?: number | null
          success?: boolean | null
          techniques_id: number
          workout_id: number
        }
        Update: {
          created_at?: string
          performance?: number | null
          success?: boolean | null
          techniques_id?: number
          workout_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "workout techniques_techniques_id_fkey"
            columns: ["techniques_id"]
            isOneToOne: false
            referencedRelation: "techniques"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workout techniques_workout_id_fkey"
            columns: ["workout_id"]
            isOneToOne: false
            referencedRelation: "workouts"
            referencedColumns: ["id"]
          }
        ]
      }
      workouts: {
        Row: {
          created_at: string
          date: string | null
          duration: number | null
          id: number
          intensity: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          date?: string | null
          duration?: number | null
          id?: number
          intensity?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          date?: string | null
          duration?: number | null
          id?: number
          intensity?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "workouts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
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
      pricing_plan_interval: "day" | "week" | "month" | "year"
      pricing_type: "one_time" | "recurring"
      subscription_status:
        | "trialing"
        | "active"
        | "canceled"
        | "incomplete"
        | "incomplete_expired"
        | "past_due"
        | "unpaid"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
