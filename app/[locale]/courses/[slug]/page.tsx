import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { Locale, isLocale, t, formatCurrency } from "@/lib/i18n";
import { courses } from "@/lib/courses";
import Link from "next/link";
import { ArrowLeft, Clock, Tag, Star, Users, BookOpen, Award, PlayCircle } from "lucide-react";

export default function CoursePage({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const locale = (isLocale(params.locale) ? params.locale : "ar") as Locale;
  const tr = t(locale);
  
  const course = courses.find((c) => c.slug === params.slug);
  
  if (!course) {
    notFound();
  }

  // Mock features for the course
  const features = [
    { icon: Clock, text: `${course.hoursMin}+ ${tr.courses.details.hours}` },
    { icon: Users, text: locale === "ar" ? "٢٥٠+ طالب" : "250+ students" },
    { icon: BookOpen, text: `${course.hoursMin * 3}+ ${tr.courses.details.videos}` },
    { icon: Award, text: tr.courses.details.certificate },
  ];

  return (
    <Container className="py-10">
      {/* Back button */}
      <Link
        href={`/${locale}/courses`}
        className="mb-6 inline-flex items-center gap-2 text-sm text-muted hover:text-brand dark:text-night-muted"
      >
        <ArrowLeft className="h-4 w-4" />
        {locale === "ar" ? "العودة إلى الدورات" : "Back to courses"}
      </Link>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main content - Course details */}
        <div className="lg:col-span-2">
          {/* Course image/cover */}
          <div className="aspect-[1200/630] w-full overflow-hidden rounded-3xl border border-stroke bg-gradient-to-br from-brand/5 to-accent/5 dark:border-night-stroke">
            <img
              src={course.cover}
              alt={course.title[locale]}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Course title and description */}
          <div className="mt-6">
            <h1 className="text-3xl font-bold text-ink dark:text-night-text">
              {course.title[locale]}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-muted dark:text-night-muted">
              {course.description?.[locale] || course.short[locale]}
            </p>
          </div>

          {/* What you'll learn */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-ink dark:text-night-text">
              {locale === "ar" ? "ماذا ستتعلم؟" : "What you'll learn"}
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-start gap-2">
                  <div className="mt-1 h-2 w-2 rounded-full bg-brand"></div>
                  <span className="text-sm text-muted dark:text-night-muted">
                    {locale === "ar"
                      ? `تعلم المهارة الأساسية رقم ${i}`
                      : `Learn fundamental skill ${i}`}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Course content / syllabus */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-ink dark:text-night-text">
              {locale === "ar" ? "محتوى الدورة" : "Course content"}
            </h2>
            <div className="mt-4 space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 rounded-2xl border border-stroke p-4 dark:border-night-stroke"
                >
                  <PlayCircle className="h-5 w-5 text-brand" />
                  <div>
                    <h3 className="font-medium text-ink dark:text-night-text">
                      {locale === "ar" ? `المحاضرة ${i}` : `Lecture ${i}`}
                    </h3>
                    <p className="text-xs text-muted dark:text-night-muted">
                      {course.hoursMin * 6} {tr.courses.details.minutes}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar - Course info and purchase */}
        <aside className="space-y-4">
          <div className="rounded-3xl border border-stroke bg-white p-6 shadow-soft dark:border-night-stroke dark:bg-night-surface">
            {/* FIXED: Using tr.courses.details.duration */}
            <div className="text-sm text-muted dark:text-night-muted">
              {tr.courses.details.duration}
            </div>
            <div className="mt-1 text-lg font-semibold text-ink dark:text-night-text">
              {course.hoursMin}+ {tr.courses.details.hours}
            </div>
            
            {/* Price */}
            <div className="mt-4 text-sm text-muted dark:text-night-muted">
              {locale === "ar" ? "السعر" : "Price"}
            </div>
            <div className="mt-1 text-2xl font-semibold text-ink dark:text-night-text">
              {formatCurrency(locale, course.priceIQD)}
            </div>

            {/* Buy button */}
            <button className="mt-6 w-full rounded-2xl bg-brand py-3 font-bold text-white transition hover:opacity-90">
              {tr.courses.actions.buy}
            </button>

            {/* Features list */}
            <div className="mt-6 space-y-3">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3 text-sm">
                  <feature.icon className="h-4 w-4 text-brand" />
                  <span className="text-muted dark:text-night-muted">
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Instructor info */}
          <div className="rounded-3xl border border-stroke bg-white p-6 shadow-soft dark:border-night-stroke dark:bg-night-surface">
            <h3 className="font-semibold text-ink dark:text-night-text">
              {locale === "ar" ? "المدرب" : "Instructor"}
            </h3>
            <div className="mt-4 flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-brand/20"></div>
              <div>
                <div className="font-medium text-ink dark:text-night-text">
                  {tr.brand.name}
                </div>
                <div className="text-xs text-muted dark:text-night-muted">
                  {locale === "ar" ? "مؤسسة الأكاديمية" : "Academy Founder"}
                </div>
              </div>
            </div>
            <p className="mt-3 text-sm text-muted dark:text-night-muted">
              {locale === "ar"
                ? "أخصائية نفسية ومطورة ذاتية مع أكثر من 10 سنوات خبرة"
                : "Psychologist and self-development coach with 10+ years experience"}
            </p>
          </div>

          {/* Tags */}
          <div className="rounded-3xl border border-stroke bg-white p-6 shadow-soft dark:border-night-stroke dark:bg-night-surface">
            <h3 className="font-semibold text-ink dark:text-night-text">
              {locale === "ar" ? "الوسوم" : "Tags"}
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {course.tags[locale].map((tag) => (
                <Link
                  key={tag}
                  href={`/${locale}/courses?tag=${tag}`}
                  className="rounded-full bg-bg px-3 py-1 text-xs text-ink transition hover:bg-brand hover:text-white dark:bg-night-bg dark:text-night-text"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </Container>
  );
}
