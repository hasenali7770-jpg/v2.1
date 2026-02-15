"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import {
  LayoutDashboard,
  BookOpen,
  Users,
  MessageSquare,
  Settings,
  Upload,
  Edit,
  Trash,
  Eye,
  Plus,
  Save,
  FileText,
  Image as ImageIcon,
  Video,
  Link as LinkIcon,
  Star,
  TrendingUp,
  Calendar,
  DollarSign,
} from "lucide-react"
import { Container } from "@/components/Container"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { useSession } from "@/app/contexts/SessionContext"

export default function AdminPage({ params }: { params: { locale: string } }) {
  const { user } = useSession()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("dashboard")
  const [courses, setCourses] = useState<any[]>([])
  const [users, setUsers] = useState<any[]>([])
  const [comments, setComments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [editingCourse, setEditingCourse] = useState<any>(null)
  const [editingContent, setEditingContent] = useState<any>(null)

  // إحصائيات
  const [stats, setStats] = useState({
    totalCourses: 0,
    totalUsers: 0,
    totalEnrollments: 0,
    totalRevenue: 0,
    pendingComments: 0,
    popularCourses: [],
  })

  useEffect(() => {
    if (!user || user.role !== "ADMIN") {
      router.push(`/${params.locale}`)
      return
    }
    fetchData()
  }, [user])

  const fetchData = async () => {
    setLoading(true)
    try {
      const [coursesRes, usersRes, commentsRes, statsRes] = await Promise.all([
        fetch("/api/admin/courses"),
        fetch("/api/admin/users"),
        fetch("/api/admin/comments"),
        fetch("/api/admin/stats"),
      ])

      const coursesData = await coursesRes.json()
      const usersData = await usersRes.json()
      const commentsData = await commentsRes.json()
      const statsData = await statsRes.json()

      setCourses(coursesData)
      setUsers(usersData)
      setComments(commentsData)
      setStats(statsData)
    } catch (error) {
      console.error("Failed to fetch data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleUploadFile = async (file: File, type: "image" | "video") => {
    const formData = new FormData()
    formData.append("file", file)
    formData.append("type", type)

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    })

    if (res.ok) {
      const data = await res.json()
      return data.url
    }
    return null
  }

  const handleSaveCourse = async (courseData: any) => {
    try {
      const res = await fetch("/api/admin/courses" + (courseData.id ? `/${courseData.id}` : ""), {
        method: courseData.id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(courseData),
      })

      if (res.ok) {
        fetchData()
        setEditingCourse(null)
      }
    } catch (error) {
      console.error("Failed to save course:", error)
    }
  }

  const handleSaveContent = async (key: string, value: any) => {
    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key, value }),
      })

      if (res.ok) {
        setEditingContent(null)
      }
    } catch (error) {
      console.error("Failed to save content:", error)
    }
  }

  if (loading) {
    return (
      <Container className="py-10">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand border-t-transparent" />
        </div>
      </Container>
    )
  }

  return (
    <Container className="py-10">
      <h1 className="text-3xl font-bold text-ink dark:text-night-text mb-8">
        لوحة التحكم
      </h1>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="dashboard">
            <LayoutDashboard className="h-4 w-4 ml-2" />
            الرئيسية
          </TabsTrigger>
          <TabsTrigger value="courses">
            <BookOpen className="h-4 w-4 ml-2" />
            الدورات
          </TabsTrigger>
          <TabsTrigger value="users">
            <Users className="h-4 w-4 ml-2" />
            المستخدمين
          </TabsTrigger>
          <TabsTrigger value="comments">
            <MessageSquare className="h-4 w-4 ml-2" />
            التعليقات
          </TabsTrigger>
          <TabsTrigger value="content">
            <FileText className="h-4 w-4 ml-2" />
            المحتوى
          </TabsTrigger>
          <TabsTrigger value="settings">
            <Settings className="h-4 w-4 ml-2" />
            الإعدادات
          </TabsTrigger>
        </TabsList>

        {/* Dashboard Tab */}
        <TabsContent value="dashboard" className="space-y-6">
          {/* Stats Grid */}
          <div className="grid gap-4 md:grid-cols-4">
            <div className="card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted dark:text-night-muted">
                    إجمالي الدورات
                  </p>
                  <p className="text-2xl font-bold text-ink dark:text-night-text mt-1">
                    {stats.totalCourses}
                  </p>
                </div>
                <div className="rounded-2xl bg-brand/10 p-3">
                  <BookOpen className="h-6 w-6 text-brand" />
                </div>
              </div>
              <div className="mt-4 text-xs text-green-600">
                <TrendingUp className="inline h-3 w-3" /> +12% هذا الشهر
              </div>
            </div>

            <div className="card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted dark:text-night-muted">
                    إجمالي المستخدمين
                  </p>
                  <p className="text-2xl font-bold text-ink dark:text-night-text mt-1">
                    {stats.totalUsers}
                  </p>
                </div>
                <div className="rounded-2xl bg-accent/10 p-3">
                  <Users className="h-6 w-6 text-accent" />
                </div>
              </div>
              <div className="mt-4 text-xs text-green-600">
                <TrendingUp className="inline h-3 w-3" /> +8% هذا الشهر
              </div>
            </div>

            <div className="card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted dark:text-night-muted">
                    المسجلين
                  </p>
                  <p className="text-2xl font-bold text-ink dark:text-night-text mt-1">
                    {stats.totalEnrollments}
                  </p>
                </div>
                <div className="rounded-2xl bg-green-500/10 p-3">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <div className="mt-4 text-xs text-green-600">
                <TrendingUp className="inline h-3 w-3" /> +15% هذا الشهر
              </div>
            </div>

            <div className="card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted dark:text-night-muted">
                    الإيرادات
                  </p>
                  <p className="text-2xl font-bold text-ink dark:text-night-text mt-1">
                    {stats.totalRevenue.toLocaleString()} د.ع
                  </p>
                </div>
                <div className="rounded-2xl bg-purple-500/10 p-3">
                  <DollarSign className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <div className="mt-4 text-xs text-green-600">
                <TrendingUp className="inline h-3 w-3" /> +23% هذا الشهر
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-ink dark:text-night-text mb-4">
                آخر الدورات
              </h3>
              <div className="space-y-4">
                {courses.slice(0, 5).map((course) => (
                  <div key={course.id} className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-bg dark:bg-night-bg overflow-hidden">
                      {course.image && (
                        <Image
                          src={course.image}
                          alt={course.title}
                          width={40}
                          height={40}
                          className="object-cover"
                        />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-ink dark:text-night-text">
                        {course.title}
                      </p>
                      <p className="text-xs text-muted dark:text-night-muted">
                        {new Date(course.createdAt).toLocaleDateString("ar-IQ")}
                      </p>
                    </div>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                      {course.students} طالب
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="card p-6">
              <h3 className="text-lg font-semibold text-ink dark:text-night-text mb-4">
                أحدث المستخدمين
              </h3>
              <div className="space-y-4">
                {users.slice(0, 5).map((user) => (
                  <div key={user.id} className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-brand text-white flex items-center justify-center">
                      {user.name?.[0] || "U"}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-ink dark:text-night-text">
                        {user.name}
                      </p>
                      <p className="text-xs text-muted dark:text-night-muted">
                        {user.email || user.phone}
                      </p>
                    </div>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                      {new Date(user.createdAt).toLocaleDateString("ar-IQ")}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Popular Courses */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-ink dark:text-night-text mb-4">
              الدورات الأكثر مشاهدة
            </h3>
            <div className="space-y-4">
              {stats.popularCourses.map((course: any, index: number) => (
                <div key={course.id} className="flex items-center gap-4">
                  <span className="text-lg font-bold text-muted w-8">
                    #{index + 1}
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-ink dark:text-night-text">
                      {course.title}
                    </p>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-xs text-muted">
                        ⭐ {course.rating}
                      </span>
                      <span className="text-xs text-muted">
                        👥 {course.students} طالب
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Courses Tab */}
        <TabsContent value="courses">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-ink dark:text-night-text">
                إدارة الدورات
              </h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 ml-2" />
                    إضافة دورة جديدة
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl">
                  <DialogHeader>
                    <DialogTitle>إضافة دورة جديدة</DialogTitle>
                  </DialogHeader>
                  <CourseForm onSubmit={handleSaveCourse} />
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4">
              {courses.map((course) => (
                <div key={course.id} className="card p-4">
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-xl bg-bg dark:bg-night-bg overflow-hidden">
                      {course.image && (
                        <Image
                          src={course.image}
                          alt={course.title}
                          width={64}
                          height={64}
                          className="object-cover"
                        />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-ink dark:text-night-text">
                        {course.title}
                      </h3>
                      <p className="text-sm text-muted dark:text-night-muted line-clamp-1">
                        {course.description}
                      </p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-xs bg-brand/10 text-brand px-2 py-1 rounded-full">
                          {course.price.toLocaleString()} د.ع
                        </span>
                        <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-full">
                          {course.category}
                        </span>
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                          {course.students} طالب
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Switch checked={course.published} />
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-red-500">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Users Tab */}
        <TabsContent value="users">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-ink dark:text-night-text">
                إدارة المستخدمين
              </h2>
              <Input
                placeholder="بحث عن مستخدم..."
                className="max-w-xs"
              />
            </div>

            <div className="grid gap-4">
              {users.map((user) => (
                <div key={user.id} className="card p-4">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-brand text-white flex items-center justify-center text-lg">
                      {user.name?.[0] || "U"}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-ink dark:text-night-text">
                        {user.name}
                      </h3>
                      <p className="text-sm text-muted dark:text-night-muted">
                        {user.email || user.phone}
                      </p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                          {user.role}
                        </span>
                        <span className="text-xs text-muted">
                          {user.enrollments?.length || 0} دورة مسجل بها
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Select defaultValue={user.role}>
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="USER">مستخدم</SelectItem>
                          <SelectItem value="INSTRUCTOR">مدرب</SelectItem>
                          <SelectItem value="ADMIN">مدير</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Comments Tab */}
        <TabsContent value="comments">
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-ink dark:text-night-text">
              إدارة التعليقات
            </h2>

            <div className="grid gap-4">
              {comments.map((comment) => (
                <div key={comment.id} className="card p-4">
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-accent text-white flex items-center justify-center text-sm">
                      {comment.user?.name?.[0] || "U"}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-ink dark:text-night-text">
                          {comment.user?.name}
                        </span>
                        <span className="text-xs text-muted">
                          {new Date(comment.createdAt).toLocaleDateString("ar-IQ")}
                        </span>
                        {!comment.status && (
                          <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </Container>
  )
}

// Course Form Component
function CourseForm({ onSubmit, initialData }: any) {
  const [formData, setFormData] = useState(initialData || {
    title: "",
    description: "",
    price: "",
    category: "",
    level: "beginner",
    image: "",
    videoUrl: "",
    published: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium">عنوان الدورة</label>
          <Input
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">السعر</label>
          <Input
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">الوصف</label>
        <Textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={4}
          required
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium">التصنيف</label>
          <Select
            value={formData.category}
            onValueChange={(value) => setFormData({ ...formData, category: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="development">تطوير الذات</SelectItem>
              <SelectItem value="psychology">علم النفس</SelectItem>
              <SelectItem value="business">الأعمال</SelectItem>
              <SelectItem value="health">الصحة</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">المستوى</label>
          <Select
            value={formData.level}
            onValueChange={(value) => setFormData({ ...formData, level: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="beginner">مبتدئ</SelectItem>
              <SelectItem value="intermediate">متوسط</SelectItem>
              <SelectItem value="advanced">متقدم</SelectItem>
              <SelectItem value="all">جميع المستويات</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium">صورة الدورة</label>
          <div className="flex gap-2">
            <Input
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              placeholder="رابط الصورة"
            />
            <Button type="button" variant="outline">
              <Upload className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">رابط الفيديو</label>
          <Input
            value={formData.videoUrl}
            onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
            placeholder="رابط الفيديو التعريفي"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Switch
          checked={formData.published}
          onCheckedChange={(checked) => setFormData({ ...formData, published: checked })}
        />
        <label className="text-sm font-medium">نشر الدورة</label>
      </div>

      <div className="flex justify-end gap-2">
        <Button type="submit">
          <Save className="h-4 w-4 ml-2" />
          حفظ
        </Button>
      </div>
    </form>
  )
}
