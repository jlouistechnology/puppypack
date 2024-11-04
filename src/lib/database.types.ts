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
      puppies: {
        Row: {
          id: string
          created_at: string
          user_id: string
          name: string
          breed: string
          gender: string
          birthday: string
          photo_url: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          name: string
          breed: string
          gender: string
          birthday: string
          photo_url?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          name?: string
          breed?: string
          gender?: string
          birthday?: string
          photo_url?: string | null
        }
      }
      puppy_guidance: {
        Row: {
          id: string
          puppy_id: string
          week: number
          title: string
          summary: string
          details: string
          completed: boolean
          ignored: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          puppy_id: string
          week: number
          title: string
          summary: string
          details: string
          completed?: boolean
          ignored?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          puppy_id?: string
          week?: number
          title?: string
          summary?: string
          details?: string
          completed?: boolean
          ignored?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      config: {
        Row: {
          id: string
          openai_key: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          openai_key: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          openai_key?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}