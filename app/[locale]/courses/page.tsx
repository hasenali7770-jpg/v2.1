"use client";

import { useMemo, useState, useEffect } from "react";
import { Container } from "@/components/Container";
import { Locale, isLocale, t } from "@/lib/i18n";
import { CourseCard } from "@/components/CourseCard";
import { useParams } from "next/navigation";

interface Course {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string | null;
  videoUrl: string | null;
  createdAt: string;
}

export default function CoursesPage() {
  const params = useParams();
  const locale = (isLocale(params.locale) ? params.locale : "ar") as Locale;
  const tr = t(locale);

  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [q, setQ] = useState("");
  const [tag, setTag] = useState<string | null>(null);
  const [sort, setSort] = useState<"asc" | "desc">("asc");

  // Fetch courses from database
  useEffect(() => {
    const fetchCourses = async () => {
      console.log("📥 Fetching courses for locale:", locale);
      
      try {
        setLoading(true);
        const apiUrl = `/${locale}/api/courses`;
        console.log("🔗 API URL:", apiUrl);
        
        const response = await fetch(apiUrl);
        console.log("📊 Response status:", response.status);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error("❌ Error response:", errorText);
          throw new Error(`Failed to fetch courses: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("✅ Courses fetched:", data);
        console.log("📦 Number of courses:", data.length);
        
        setCourses(data);
      } catch (err) {
        console.error("🔥 Fetch error:", err);
        setError("فشل في تحميل الدورات");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [locale]);

  const allTags = useMemo(() => {
    const set = new Set<string>();
    return Array.from(set);
  }, []);

  const filtered = useMemo(() => {
    console.log("🔍 Filtering courses. Total:", courses.length);
    const query = q.trim().toLowerCase();
    const list = courses
      .filter((course) => {
        const title = course.title.toLowerCase();
        const description = course.description.toLowerCase();
        const matchQ = !query || title.includes(query) || description.includes(query);
        const matchTag = !tag;
        return matchQ && matchTag;
      })
      .slice()
      .sort((a, b) => (sort === "asc" ? a.price - b.price : b.price - a.price));
    
    console.log("✨ Filtered courses:", list.length);
    return list;
  }, [courses, q, tag, sort]);

  if (loading) {
    return (
      <Container className="py-10">
        <div className="flex justify-center items-center min-h-[400px]">
          <p className="text-muted dark:text-night-muted">جاري التحميل...</p>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-10">
        <div className="flex justify-center items-center min-h-[400px]">
          <p className="text-red-500">{error}</p>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-10">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-ink dark:text-night-text">{tr.coursesPage.title}</h1>
        <p className="mt-2 text-sm leading-7 text-muted dark:text-night-muted">{tr.coursesPage.subtitle}</p>
      </div>

      <div className="mb-6 grid gap-3 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={tr.coursesPage.search}
            className="w-full rounded-2xl border border-stroke bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-brand/20 dark:border-night-stroke dark:bg-night-surface dark:text-night-text"
          />
        </div>
        <div className="flex gap-3">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as any)}
            className="w-full rounded-2xl border border-stroke bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-brand/20 dark:border-night-stroke dark:bg-night-surface dark:text-night-text"
          >
            <option value="asc">{tr.coursesPage.sortPriceAsc}</option>
            <option value="desc">{tr.coursesPage.sortPriceDesc}</option>
          </select>
          <button
            onClick={() => {
              setQ("");
              setTag(null);
              setSort("asc");
            }}
            className="shrink-0 rounded-2xl bg-bg px-4 py-3 text-sm font-semibold text-ink transition hover:opacity-90 dark:bg-night-bg dark:text-night-text"
          >
            {tr.coursesPage.clear}
          </button>
        </div>
      </div>

      <div className="mb-6 rounded-3xl border border-stroke bg-white p-5 shadow-soft dark:border-night-stroke dark:bg-night-surface">
        <div className="text-sm font-semibold text-ink dark:text-night-text">{tr.coursesPage.filter}</div>
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            onClick={() => setTag(null)}
            className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
              tag === null
                ? "bg-brand text-white"
                : "bg-bg text-ink hover:opacity-90 dark:bg-night-bg dark:text-night-text"
            }`}
          >
            {locale === "ar" ? "الكل" : "All"}
          </button>
          {allTags.map((tTag) => (
            <button
              key={tTag}
              onClick={() => setTag(tTag)}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                tag === tTag
                  ? "bg-brand text-white"
                  : "bg-bg text-ink hover:opacity-90 dark:bg-night-bg dark:text-night-text"
              }`}
            >
              {tTag}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-3xl border border-stroke bg-white p-6 text-sm text-muted shadow-soft dark:border-night-stroke dark:bg-night-surface dark:text-night-muted">
          {tr.coursesPage.empty}
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((course) => (
            <CourseCard 
              key={course.id} 
              course={{
                slug: course.id.toString(),
                title: { [locale]: course.title },
                short: { [locale]: course.description.substring(0, 100) + '...' },
                description: { [locale]: course.description },
                priceIQD: course.price,
                image: course.image || '/placeholder-course.jpg',
                tags: { [locale]: [] }
              }} 
              locale={locale} 
            />
          ))}
        </div>
      )}
    </Container>
  );
}
