import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { locales } from "@/lib/i18n";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. استثناء الملفات التقنية، الـ API، ولوحة التحكم من أي تحويل لغوي
  if (
    pathname.startsWith("/_next") || 
    pathname.startsWith("/api") || 
    pathname.startsWith("/admin") || // منع التحويل التلقائي لروابط الإدارة
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // 2. التحقق إذا كان الرابط يحتوي بالفعل على لغة (مثل /ar/ أو /en/)
  const hasLocale = locales.some((l) => 
    pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  );
  
  if (hasLocale) return NextResponse.next();

  // 3. إذا كان الرابط "حاف" (بدون لغة)، قم بتحويله تلقائياً للغة العربية
  const url = request.nextUrl.clone();
  url.pathname = `/ar${pathname === "/" ? "" : pathname}`;
  
  return NextResponse.redirect(url);
}

// تحسين الـ matcher ليتجاهل روابط الإدارة تماماً لتسريع الأداء
export const config = { 
  matcher: ["/((?!_next|api|admin|.*\\..*).*)"] 
};
