export type Locale = "ar" | "en"
export const locales: Locale[] = ["ar", "en"]

export function isLocale(x: string): x is Locale {
  return locales.includes(x as Locale)
}

export const dict = {
  ar: {
    // القاموس الكامل موجود في الملف السابق
    brand: "أكاديمية إسراء النور",
    // ... (نفس القاموس السابق مع إضافات)
  },
  en: {
    brand: "Esraa Al-Noor Academy",
    // ... (نفس القاموس السابق مع إضافات)
  }
}

export function t(locale: Locale) {
  return dict[locale]
}
