import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types
export type Profile = {
  id: string
  email: string | null
  phone: string | null
  name: string | null
  avatar_url: string | null
  bio: string | null
  role: string
  created_at: string
}

export type Course = {
  id: string
  title: string
  slug: string
  description: string | null
  price: number
  image: string | null
  category: string | null
  level: string
  published: boolean
  author_id: string | null
  created_at: string
  profiles?: Profile
}

export type Lesson = {
  id: string
  title: string
  video_url: string | null
  duration: number | null
  free: boolean
  section_id: string
  created_at: string
}

export type Comment = {
  id: string
  content: string
  user_id: string
  course_id: string | null
  lesson_id: string | null
  parent_id: string | null
  likes: number
  status: string
  created_at: string
  profiles?: Profile
  replies?: Comment[]
}

// Database functions
export const db = {
  // Profiles
  async getProfile(userId: string) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()
    if (error) throw error
    return data as Profile
  },

  async updateProfile(userId: string, updates: Partial<Profile>) {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single()
    if (error) throw error
    return data as Profile
  },

  // Courses
  async getCourses() {
    const { data, error } = await supabase
      .from('courses')
      .select(`
        *,
        profiles:author_id (
          name,
          avatar_url
        )
      `)
      .eq('published', true)
      .order('created_at', { ascending: false })
    if (error) throw error
    return data as (Course & { profiles: Pick<Profile, 'name' | 'avatar_url'> })[]
  },

  async getCourse(slug: string) {
    const { data, error } = await supabase
      .from('courses')
      .select(`
        *,
        profiles:author_id (
          name,
          avatar_url
        ),
        sections (
          id,
          title,
          order,
          lessons (
            id,
            title,
            video_url,
            duration,
            free,
            order
          )
        )
      `)
      .eq('slug', slug)
      .single()
    if (error) throw error
    return data
  },

  async createCourse(course: Partial<Course>) {
    const { data, error } = await supabase
      .from('courses')
      .insert(course)
      .select()
      .single()
    if (error) throw error
    return data as Course
  },

  async updateCourse(id: string, updates: Partial<Course>) {
    const { data, error } = await supabase
      .from('courses')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    if (error) throw error
    return data as Course
  },

  async deleteCourse(id: string) {
    const { error } = await supabase
      .from('courses')
      .delete()
      .eq('id', id)
    if (error) throw error
    return true
  },

  // Enrollments
  async enrollUser(userId: string, courseId: string) {
    const { data, error } = await supabase
      .from('enrollments')
      .insert({ user_id: userId, course_id: courseId })
      .select()
      .single()
    if (error) throw error
    return data
  },

  async getUserEnrollments(userId: string) {
    const { data, error } = await supabase
      .from('enrollments')
      .select(`
        *,
        courses (*)
      `)
      .eq('user_id', userId)
    if (error) throw error
    return data
  },

  // Comments
  async getComments(courseId?: string, lessonId?: string) {
    let query = supabase
      .from('comments')
      .select(`
        *,
        profiles:user_id (
          name,
          avatar_url
        ),
        replies:comments (
          *,
          profiles:user_id (
            name,
            avatar_url
          )
        )
      `)
      .eq('status', 'published')
      .is('parent_id', null)
      .order('created_at', { ascending: false })

    if (courseId) query = query.eq('course_id', courseId)
    if (lessonId) query = query.eq('lesson_id', lessonId)

    const { data, error } = await query
    if (error) throw error
    return data as Comment[]
  },

  async createComment(comment: Partial<Comment>) {
    const { data, error } = await supabase
      .from('comments')
      .insert(comment)
      .select(`
        *,
        profiles:user_id (
          name,
          avatar_url
        )
      `)
      .single()
    if (error) throw error
    return data as Comment
  },

  async likeComment(userId: string, commentId: string) {
    const { error } = await supabase
      .from('comment_likes')
      .insert({ user_id: userId, comment_id: commentId })
    if (error) throw error

    // زيادة عدد الإعجابات
    await supabase.rpc('increment_comment_likes', { comment_id: commentId })
    return true
  },

  async unlikeComment(userId: string, commentId: string) {
    const { error } = await supabase
      .from('comment_likes')
      .delete()
      .eq('user_id', userId)
      .eq('comment_id', commentId)
    if (error) throw error

    // تقليل عدد الإعجابات
    await supabase.rpc('decrement_comment_likes', { comment_id: commentId })
    return true
  },

  // Progress
  async markLessonComplete(userId: string, lessonId: string, enrollmentId: string) {
    const { data, error } = await supabase
      .from('completed_lessons')
      .insert({
        user_id: userId,
        lesson_id: lessonId,
        enrollment_id: enrollmentId
      })
      .select()
      .single()
    if (error) throw error
    return data
  },

  async getCourseProgress(userId: string, courseId: string) {
    const { data, error } = await supabase
      .from('enrollments')
      .select(`
        progress,
        completed,
        completed_lessons (
          lesson_id
        )
      `)
      .eq('user_id', userId)
      .eq('course_id', courseId)
      .single()
    if (error) throw error
    return data
  },

  // Payments
  async createPayment(payment: Partial<Payment>) {
    const { data, error } = await supabase
      .from('payments')
      .insert(payment)
      .select()
      .single()
    if (error) throw error
    return data
  },

  // Uploads
  async uploadFile(bucket: string, path: string, file: File) {
    const { data, error } = await supabase.storage
      .bucket(bucket)
      .upload(path, file)
    if (error) throw error
    return data
  },

  async getFileUrl(bucket: string, path: string) {
    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(path)
    return data.publicUrl
  },

  async deleteFile(bucket: string, path: string) {
    const { error } = await supabase.storage
      .bucket(bucket)
      .remove([path])
    if (error) throw error
    return true
  }
}
