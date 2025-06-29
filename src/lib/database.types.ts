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
      profiles: {
        Row: {
          id: string
          user_id: string
          hunter_name: string
          age: number
          phone_number: string
          gender: 'male' | 'female' | 'other'
          character: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          hunter_name: string
          age: number
          phone_number: string
          gender: 'male' | 'female' | 'other'
          character?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          hunter_name?: string
          age?: number
          phone_number?: string
          gender?: 'male' | 'female' | 'other'
          character?: Json
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}