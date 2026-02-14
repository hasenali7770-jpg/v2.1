"use client";

import { useMemo, useState, useEffect } from "react";
import { Container } from "@/components/Container";
import { Locale, isLocale, t } from "@/lib/i18n";
import { CourseCard } from "@/components/CourseCard";
import { useParams } from "next/navigation";

// Define the Course type
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
      try {
        setLoading(true);
        const response = await fetch(`/${locale}/api/courses`);
        if (!response.ok) {
          throw new Error('Failed to fetch courses');
        }
        const data = await response.json();
        setCourses(data);
      } catch (err) {
        console.error("Error fetching courses:", err);
        setError("فشل في تحميل الدورات");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [locale]);

  // Extract unique tags from courses (you might want to add tags to your schema)
  const allTags = useMemo(() => {
    // For now, return empty array or you can extract from course data
    // If you add tags to your schema later, update this
    return [];
  }, [courses]);

  // Filter and sort courses
  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return courses
      .filter((course) => {
        const title = course.title.toLowerCase();
        const description = course.description.toLowerCase();
        const matchQ = !query || title.includes(query) || description.includes(query);
        // Add tag filtering later when you add tags to schema
        return matchQ;
      })
      .slice()
      .sort((a, b) => (sort === "asc" ? a.price - b.price : b.price - a.price));
  }, [courses, q, sort]);

  if (loading) {
    return (
      <Container className="py-10">
        <div className="flex justify-center items-center min-h-[400px]">
          <p className="text-muted">جاري التحميل...</p>
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
                ...course,
                // Add any missing fields that CourseCard expects
                slug: course.id.toString(), // Use id as slug temporarily
                short: course.description.substring(0, 100), // Truncate description for short
                tags: { en: [], ar: [] } // Empty tags for now
              }} 
              locale={locale} 
            />
          ))}
        </div>
      )}
    </Container>
  );
}
