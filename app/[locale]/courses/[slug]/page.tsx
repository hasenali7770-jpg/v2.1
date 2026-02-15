import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { Locale, isLocale, t, formatCurrency } from "@/lib/i18n";
import { courses } from "@/lib/courses";
import Link from "next/link";
import { ArrowLeft, Clock, Users, BookOpen, Award } from "lucide-react";

type CourseTr = {
  brand: { name: string };
  courses: {
    details: {
      duration: string;
      hours: string;
      videos: string;
      certificate: string;
    };
    actions: { buy: string };
  };
};

export default function CoursePage({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const locale = (isLocale(params.locale) ? params.locale : "ar") as Locale;

  const trRaw = t(locale) as unknown as Partial<CourseTr>;

  const course = courses.find((c) => c.slug === params.slug);
  if (!course) notFound();

  const durationLabel = trRaw.courses?.details?.duration ?? (locale === "ar" ? "المدة" : "Duration");
  const hoursLabel = trRaw.courses?.details?.hours ?? (locale === "ar" ? "ساعات" : "hours");
  const videosLabel = trRaw.courses?.details?.videos ?? (locale === "ar" ? "فيديو" : "videos");
  const certificateLabel =
    trRaw.courses?.details?.certificate ?? (locale === "ar" ? "شهادة" : "Certificate");
  const buyLabel = trRaw.courses?.actions?.buy ?? (locale === "ar" ? "اشترك الآن" : "Buy now");
  const brandName = trRaw.brand?.name ?? (locale === "ar" ? "إسراء النور" : "Israa Alnoor");

  const features = [
    { icon: Clock, text: `${course.hoursMin}+ ${hoursLabel}` },
    { icon: Users, text: locale === "ar" ? "٢٥٠+ طالب" : "250+ students" },
    { icon: BookOpen, text: `${course.hoursMin * 3}+ ${videosLabel}` },
    { icon: Award, text: certificateLabel },
  ];

  return (
    <Container className="py-10">
      <Link
        href={`/${locale}/courses`}
        className="mb-6 inline-flex items-center gap-2 text-sm text-muted hover:text-brand dark:text-night-muted"
      >
        <ArrowLeft className="h-4 w-4" />
        {locale === "ar" ? "العودة إلى الدورات" : "Back to courses"}
      </Link>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="aspect-[1200/630] w-full overflow-hidden rounded-3xl border border-stroke bg-gradient-to-br from-brand/5 to-accent/5 dark:border-night-stroke">
            <img
              src={course.cover}
              alt={course.title[locale]}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="mt-6">
            <h1 className="text-3xl font-bold text-ink dark:text-night-text">
              {course.title[locale]}
            </h1>
            {/* FIXED: Using short instead of description */}
            <p className="mt-4 text-lg leading-relaxed text-muted dark:text-night-muted">
              {course.short[locale]}
            </p>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="rounded-3xl border border-stroke bg-white p-6 shadow-soft dark:border-night-stroke dark:bg-night-surface">
            <div className="text-sm text-muted dark:text-night-muted">{durationLabel}</div>

            <div className="mt-1 text-lg font-semibold text-ink dark:text-night-text">
              {course.hoursMin}+ {hoursLabel}
            </div>

            <div className="mt-4 text-sm text-muted dark:text-night-muted">
              {locale === "ar" ? "السعر" : "Price"}
            </div>

            <div className="mt-1 text-2xl font-semibold text-ink dark:text-night-text">
              {formatCurrency(locale, course.priceIQD)}
            </div>

            <button className="mt-6 w-full rounded-2xl bg-brand py-3 font-bold text-white transition hover:opacity-90">
              {buyLabel}
            </button>

            <div className="mt-6 space-y-3">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3 text-sm">
                  <feature.icon className="h-4 w-4 text-brand" />
                  <span className="text-muted dark:text-night-muted">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-stroke bg-white p-6 shadow-soft dark:border-night-stroke dark:bg-night-surface">
            <h3 className="font-semibold text-ink dark:text-night-text">
              {locale === "ar" ? "المدرب" : "Instructor"}
            </h3>
            <div className="mt-4 flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-brand/20"></div>
              <div>
                <div className="font-medium text-ink dark:text-night-text">{brandName}</div>
                <div className="text-xs text-muted dark:text-night-muted">
                  {locale === "ar" ? "مؤسسة الأكاديمية" : "Academy Founder"}
                </div>
              </div>
            </div>
          </div>

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
