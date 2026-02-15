import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// للاستخدام من طرف السيرفر (Server-side) مع صلاحيات كاملة
export const supabaseAdmin = createClient(
  supabaseUrl,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)

// Types
export type Tables = {
  profiles: {
    id: string
    email: string | null
    phone: string | null
    name: string | null
    avatar_url: string | null
    bio: string | null
    role: string
    created_at: string
    updated_at: string
  }
  courses: {
    id: string
    title: string
    slug: string
    description: string | null
    short_desc: string | null
    price: number
    image: string | null
    video_url: string | null
    category: string | null
    level: string
    duration: number | null
    lessons: number
    students: number
    rating: number
    published: boolean
    featured: boolean
    author_id: string | null
    created_at: string
    updated_at: string
  }
  // ... باقي الأنواع
}
