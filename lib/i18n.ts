export type Locale = "ar" | "en";
export const locales: Locale[] = ["ar", "en"];
export const defaultLocale: Locale = "ar";

export function isLocale(x: string): x is Locale {
  return locales.includes(x as Locale);
}

export function getDirection(locale: Locale): "rtl" | "ltr" {
  return locale === "ar" ? "rtl" : "ltr";
}

export const dict = {
  ar: {
    // العلامة التجارية
    brand: {
      name: "إسراء النور",
      tagline: "رحلة وعي… بخطوات عملية",
      description: "كورسات نفسية وتطوير ذاتي بأسلوب عملي ومنظم"
    },
    
    // القائمة الرئيسية
    nav: {
      home: "الرئيسية",
      courses: "الدورات",
      pricing: "الأسعار",
      about: "من نحن",
      contact: "تواصل معنا",
      activate: "تفعيل",
      terms: "الشروط",
      privacy: "الخصوصية",
      faq: "الأسئلة الشائعة"
    },
    
    // الصفحة الرئيسية
    hero: {
      title: "رحلة وعي… بخطوات عملية",
      subtitle: "كورسات نفسية وتطوير ذاتي بطريقة منظمة وواضحة. أكاديمية إسراء النور ولدت من قرار أم… قبل ما يكون مشروع..",
      ctaPrimary: "استعرض الدورات",
      ctaSecondary: "كيف يتم التفعيل؟",
      stats: {
        courses: "دورة",
        students: "طالب",
        hours: "ساعة محتوى"
      }
    },
    
    featured: "الدورات المميزة",
    
    // قسم الدورات
    courses: {
      title: "الدورات المتاحة",
      subtitle: "ابحث وفلتر الدورات واختر الأنسب لك",
      search: "ابحث عن دورة…",
      filter: "فلترة حسب الوسوم",
      sort: "ترتيب حسب",
      sortPriceAsc: "السعر: من الأقل للأعلى",
      sortPriceDesc: "السعر: من الأعلى للأقل",
      clear: "مسح",
      empty: "لا توجد نتائج مطابقة",
      
      // تفاصيل الدورة
      details: {
        duration: "المدة",
        hours: "ساعة",
        level: "المستوى",
        beginner: "مبتدئ",
        intermediate: "متوسط",
        advanced: "متقدم",
        includes: "محتوى الدورة",
        videos: "فيديو",
        articles: "مقالات",
        certificate: "شهادة إتمام"
      },
      
      // أزرار الإجراءات
      actions: {
        buy: "اشترِ الآن",
        activate: "فعّل الكود",
        preview: "معاينة مجانية",
        details: "عرض التفاصيل",
        back: "العودة للدورات"
      }
    },
    
    // الأسعار والخطط
    pricing: {
      title: "خطط مرنة — تفتح كورس واحد",
      subtitle: "اختر الخطة المناسبة لرحلتك التطويرية",
      note: "الاشتراك يفتح كورس واحد فقط لمدة الاشتراك",
      popular: "الأكثر طلباً",
      bestValue: "أفضل قيمة",
      cta: "ابدأ الآن",
      guaranteed: "ضمان استعادة الأموال خلال 7 أيام",
      plans: {
        one: {
          name: "شراء كورس واحد",
          description: "وصول مدى الحياة لكورس واحد"
        },
        monthly: {
          name: "اشتراك شهري",
          description: "جدد شهرياً لكورس واحد"
        },
        semi: {
          name: "اشتراك نصف سنوي",
          description: "وفر 15% مع الاشتراك نصف السنوي"
        },
        yearly: {
          name: "اشتراك سنوي",
          description: "وفر 25% مع الاشتراك السنوي"
        }
      }
    },
    
    // صفحة التفعيل
    activation: {
      title: "تفعيل الوصول",
      subtitle: "بعد الدفع عبر Qi Card أو Zain Cash، سيتم إرسال كود تفعيل من الإدارة. أدخل الكود هنا لفتح الوصول.",
      form: {
        label: "كود التفعيل",
        placeholder: "أدخل كود التفعيل المكون من 16 رقم",
        button: "تفعيل الآن",
        processing: "جاري التفعيل...",
        success: "تم التفعيل بنجاح! مرحباً بك في الدورة.",
        error: "كود التفعيل غير صحيح. يرجى المحاولة مرة أخرى."
      },
      hint: "ملاحظة: التفعيل يدوي لضمان الأمان ومنع الاحتيال.",
      needHelp: "تحتاج مساعدة؟ تواصل مع الدعم الفني"
    },
    
    // صفحة من نحن
    about: {
      title: "من نحن",
      subtitle: "إسراء النور: رحلة تطوير ذاتي بإشراف متخصصين",
      mission: {
        title: "رسالتنا",
        text: "تمكين الأفراد من فهم أنفسهم وتطوير قدراتهم من خلال محتوى نفسي وتطويري مبني على أسس علمية، بأسلوب عملي وواضح."
      },
      vision: {
        title: "رؤيتنا",
        text: "نطمح لخلق مجتمع واعٍ قادر على تحقيق التوازن النفسي والنجاح العملي."
      },
      values: [
        "الأصالة: نقدم محتوى أصيلاً مبنياً على أسس علمية",
        "الوضوح: نبسط المفاهيم دون تعقيد",
        "التطبيق العملي: نركز على ما يمكن تطبيقه في الحياة اليومية",
        "الجودة: نضمن تجربة تعلم استثنائية"
      ]
    },
    
    // صفحة التواصل
    contact: {
      title: "تواصل معنا",
      subtitle: "اختر الطريقة المناسبة للتواصل، أو اترك رسالة وسنرد عليك في أقرب وقت",
      form: {
        name: "الاسم",
        email: "البريد الإلكتروني",
        phone: "رقم الهاتف",
        subject: "الموضوع",
        message: "الرسالة",
        send: "إرسال",
        sending: "جاري الإرسال...",
        success: "تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.",
        error: "حدث خطأ في الإرسال. يرجى المحاولة مرة أخرى."
      },
      info: {
        title: "معلومات التواصل",
        email: "info@esraa-alnoor.com",
        phone: "+964 123 456 789",
        address: "بغداد، العراق",
        hours: "أوقات العمل: 9 صباحاً - 6 مساءً"
      },
      social: {
        title: "تابعنا على",
        facebook: "فيسبوك",
        instagram: "إنستغرام",
        youtube: "يوتيوب",
        whatsapp: "واتساب"
      }
    },
    
    // آراء المتابعين
    testimonials: {
      title: "ماذا يقول المتابعون؟",
      subtitle: "آراء حقيقية من أشخاص خاضوا رحلة التطوير معنا",
      items: [
        { name: "سارة", text: "أسلوب بسيط وواضح… حسّيت فعلاً بالتغيير خطوة بخطوة.", rating: 5 },
        { name: "علي", text: "المحتوى مرتب وحلقات طويلة مفيدة، التجربة مريحة جداً.", rating: 5 },
        { name: "نور", text: "أفضل شيء: التطبيق العملي والوضوح بدون تعقيد.", rating: 5 }
      ]
    },
    
    // التذييل
    footer: {
      rights: "جميع الحقوق محفوظة ©",
      year: "2026",
      links: "روابط سريعة",
      follow: "تابعنا",
      about: "عن الأكاديمية",
      legal: "قانوني",
      newsletter: {
        title: "النشرة البريدية",
        description: "اشترك لتصلك أحدث الدورات والعروض",
        placeholder: "بريدك الإلكتروني",
        button: "اشترك"
      }
    },
    
    // عناصر مشتركة
    common: {
      loading: "جاري التحميل...",
      error: "حدث خطأ",
      success: "تم بنجاح",
      save: "حفظ",
      cancel: "إلغاء",
      delete: "حذف",
      edit: "تعديل",
      search: "بحث",
      filter: "تصفية",
      sort: "ترتيب",
      back: "رجوع",
      next: "التالي",
      previous: "السابق",
      close: "إغلاق",
      menu: "القائمة",
      language: "اللغة",
      theme: "المظهر",
      light: "فاتح",
      dark: "داكن",
      system: "تلقائي",
      arabic: "العربية",
      english: "English"
    }
  },
  
  en: {
    // Brand
    brand: {
      name: "Esraa Al-Noor",
      tagline: "A journey of awareness — with practical steps",
      description: "Psychology-inspired & self-growth courses in an organized, practical style"
    },
    
    // Navigation
    nav: {
      home: "Home",
      courses: "Courses",
      pricing: "Pricing",
      about: "About",
      contact: "Contact",
      activate: "Activate",
      terms: "Terms",
      privacy: "Privacy",
      faq: "FAQ"
    },
    
    // Hero Section
    hero: {
      title: "A journey of awareness — with practical steps",
      subtitle: "Psychology-inspired & self-growth courses. Calm viewing experience, bilingual support, and secure manual activation via code.",
      ctaPrimary: "Browse courses",
      ctaSecondary: "How activation works",
      stats: {
        courses: "Courses",
        students: "Students",
        hours: "Hours of content"
      }
    },
    
    featured: "Featured courses",
    
    // Courses Section
    courses: {
      title: "Available Courses",
      subtitle: "Search and filter courses, then pick what fits you",
      search: "Search courses…",
      filter: "Filter by tags",
      sort: "Sort by",
      sortPriceAsc: "Price: low to high",
      sortPriceDesc: "Price: high to low",
      clear: "Clear",
      empty: "No matching results",
      
      details: {
        duration: "Duration",
        hours: "hours",
        level: "Level",
        beginner: "Beginner",
        intermediate: "Intermediate",
        advanced: "Advanced",
        includes: "Course includes",
        videos: "videos",
        articles: "articles",
        certificate: "Certificate of completion"
      },
      
      actions: {
        buy: "Buy now",
        activate: "Activate code",
        preview: "Free preview",
        details: "View details",
        back: "Back to courses"
      }
    },
    
    // Pricing
    pricing: {
      title: "Flexible plans — unlock one course",
      subtitle: "Choose the right plan for your journey",
      note: "Subscription unlocks one course only for the duration",
      popular: "Most Popular",
      bestValue: "Best Value",
      cta: "Get Started",
      guaranteed: "7-day money-back guarantee",
      plans: {
        one: {
          name: "One-time purchase",
          description: "Lifetime access to one course"
        },
        monthly: {
          name: "Monthly subscription",
          description: "Renew monthly for one course"
        },
        semi: {
          name: "Semi-annual subscription",
          description: "Save 15% with semi-annual plan"
        },
        yearly: {
          name: "Yearly subscription",
          description: "Save 25% with yearly plan"
        }
      }
    },
    
    // Activation
    activation: {
      title: "Activate access",
      subtitle: "After paying via Qi Card or Zain Cash, admin sends you an activation code. Enter it here to unlock access.",
      form: {
        label: "Activation code",
        placeholder: "Enter your 16-digit activation code",
        button: "Activate now",
        processing: "Activating...",
        success: "Successfully activated! Welcome to the course.",
        error: "Invalid activation code. Please try again."
      },
      hint: "Note: manual activation improves security and reduces fraud.",
      needHelp: "Need help? Contact support"
    },
    
    // About
    about: {
      title: "About Us",
      subtitle: "Esraa Al-Noor: A self-development journey with expert guidance",
      mission: {
        title: "Our Mission",
        text: "Empower individuals to understand themselves and develop their capabilities through psychology-based self-development content, presented in a practical and clear style."
      },
      vision: {
        title: "Our Vision",
        text: "We aspire to create a conscious community capable of achieving psychological balance and practical success."
      },
      values: [
        "Authenticity: We provide original content based on scientific foundations",
        "Clarity: We simplify concepts without complexity",
        "Practical Application: We focus on what can be applied in daily life",
        "Quality: We ensure an exceptional learning experience"
      ]
    },
    
    // Contact
    contact: {
      title: "Contact Us",
      subtitle: "Choose the appropriate channel, or leave a message and we'll reply as soon as possible",
      form: {
        name: "Name",
        email: "Email",
        phone: "Phone",
        subject: "Subject",
        message: "Message",
        send: "Send",
        sending: "Sending...",
        success: "Your message has been sent successfully! We'll contact you soon.",
        error: "An error occurred. Please try again."
      },
      info: {
        title: "Contact Information",
        email: "info@esraa-alnoor.com",
        phone: "+964 123 456 789",
        address: "Baghdad, Iraq",
        hours: "Working hours: 9 AM - 6 PM"
      },
      social: {
        title: "Follow Us",
        facebook: "Facebook",
        instagram: "Instagram",
        youtube: "YouTube",
        whatsapp: "WhatsApp"
      }
    },
    
    // Testimonials
    testimonials: {
      title: "What learners say",
      subtitle: "Real reviews from people who experienced the journey with us",
      items: [
        { name: "Sara", text: "Simple and clear—real change, step by step.", rating: 5 },
        { name: "Ali", text: "Well-structured long episodes. Super smooth experience.", rating: 5 },
        { name: "Noor", text: "Best part: practical implementation without complexity.", rating: 5 }
      ]
    },
    
    // Footer
    footer: {
      rights: "All rights reserved ©",
      year: "2026",
      links: "Quick links",
      follow: "Follow",
      about: "About the Academy",
      legal: "Legal",
      newsletter: {
        title: "Newsletter",
        description: "Subscribe to receive latest courses and offers",
        placeholder: "Your email",
        button: "Subscribe"
      }
    },
    
    // Common UI Elements
    common: {
      loading: "Loading...",
      error: "An error occurred",
      success: "Success",
      save: "Save",
      cancel: "Cancel",
      delete: "Delete",
      edit: "Edit",
      search: "Search",
      filter: "Filter",
      sort: "Sort",
      back: "Back",
      next: "Next",
      previous: "Previous",
      close: "Close",
      menu: "Menu",
      language: "Language",
      theme: "Theme",
      light: "Light",
      dark: "Dark",
      system: "System",
      arabic: "العربية",
      english: "English"
    }
  }
} as const;

export function t<L extends Locale>(locale: L) {
  return dict[locale];
}

export function formatNumber(locale: Locale, number: number): string {
  return new Intl.NumberFormat(locale === 'ar' ? 'ar-IQ' : 'en-US').format(number);
}

export function formatCurrency(locale: Locale, amount: number): string {
  if (locale === 'ar') {
    return `د.ع ${formatNumber('ar', amount)}`;
  }
  return `IQD ${formatNumber('en', amount)}`;
}

export function formatDate(locale: Locale, date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale === 'ar' ? 'ar-IQ' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(d);
}
