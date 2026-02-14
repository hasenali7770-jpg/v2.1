"use client";

import { useMemo, useState, useEffect } from "react";
import { Container } from "@/components/Container";
import { Locale, isLocale, t } from "@/lib/i18n";
import { CourseCard } from "@/components/CourseCard";
import { useParams } from "next/navigation";

// Database course type
interface DBCourse {
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
  
  // Fix: Handle locale properly (could be string or string[])
  const localeParam = params.locale;
  const localeValue = Array.isArray(localeParam) ? localeParam[0] : localeParam;
  const locale = (isLocale(localeValue) ? localeValue : "ar") as Locale;
  
  const tr = t(locale);

  const [courses, setCourses] = useState<DBCourse[]>([]);
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
        console.log("Fetched courses:", data);
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

  // Transform database courses to match CourseCard props
  const transformedCourses = useMemo(() => {
    return courses.map(dbCourse => ({
      slug: dbCourse.id.toString(),
      cover: dbCourse.image || '/course-covers/default.svg',
      title: { 
        ar: dbCourse.title, 
        en: dbCourse.title
      },
      short: { 
        ar: dbCourse.description.substring(0, 100) + (dbCourse.description.length > 100 ? '...' : ''), 
        en: dbCourse.description.substring(0, 100) + (dbCourse.description.length > 100 ? '...' : '')
      },
      priceIQD: dbCourse.price,
      hoursMin: 10,
      tags: { 
        ar: [], 
        en: [] 
      }
    }));
  }, [courses]);

  // Extract unique tags
  const allTags = useMemo(() => {
    const set = new Set<string>();
    transformedCourses.forEach((c) => c.tags[locale].forEach((tag) => set.add(tag)));
    return Array.from(set);
  }, [transformedCourses, locale]);

  // Filter and sort courses
  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    const list = transformedCourses
      .filter((c) => {
        const title = c.title[locale].toLowerCase();
        const short = c.short[locale].toLowerCase();
        const matchQ = !query || title.includes(query) || short.includes(query);
        const matchTag = !tag || c.tags[locale].includes(tag);
        return matchQ && matchTag;
      })
      .slice()
      .sort((a, b) => (sort === "asc" ? a.priceIQD - b.priceIQD : b.priceIQD - a.priceIQD));
    return list;
  }, [transformedCourses, q, tag, sort, locale]);

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
            <CourseCard key={course.slug} course={course} locale={locale} />
          ))}
        </div>
      )}
    </Container>
  );
}
