/**
 * Internationalization (i18n) configuration for Esraa Al-Noor Academy
 * Supports Arabic (ar) and English (en) with full type safety
 */

// ============================================================================
// TYPES & CONFIGURATION
// ============================================================================

/** Supported languages */
export type Locale = "ar" | "en";

/** List of available locales for easy iteration */
export const locales: Locale[] = ["ar", "en"];

/** Default locale if none specified */
export const defaultLocale: Locale = "ar";

/**
 * Type guard to check if a string is a valid locale
 * @param x - String to check
 * @returns True if the string is either "ar" or "en"
 */
export function isLocale(x: string): x is Locale {
  return locales.includes(x as Locale);
}

/**
 * Get the direction for a given locale
 * @param locale - The locale to get direction for
 * @returns "rtl" for Arabic, "ltr" for English
 */
export function getDirection(locale: Locale): "rtl" | "ltr" {
  return locale === "ar" ? "rtl" : "ltr";
}

// ============================================================================
// DICTIONARY - COMPLETE BILINGUAL CONTENT
// ============================================================================

/**
 * Complete dictionary with all text content
 * Structured to be easily maintainable and type-safe
 */
export const dict = {
  ar: {
    // Brand & Meta
    brand: {
      name: "إسراء النور",
      tagline: "رحلة وعي… بخطوات عملية",
      description: "كورسات نفسية وتطوير ذاتي بطريقة منظمة وواضحة",
    },
    
    // Navigation
    nav: {
      home: "الرئيسية",
      courses: "الدورات",
      pricing: "الأسعار",
      about: "من نحن",
      contact: "تواصل معنا",
      activate: "تفعيل",
      terms: "الشروط والأحكام",
      privacy: "سياسة الخصوصية",
      faq: "الأسئلة الشائعة",
      blog: "المدونة",
    },
    
    // Hero Section
    hero: {
      title: "رحلة وعي… بخطوات عملية",
      subtitle: "كورسات نفسية وتطوير ذاتي بطريقة منظمة وواضحة. تجربة مشاهدة مريحة، دعم عربي/إنجليزي، وتفعيل آمن عبر كود بعد الدفع.",
      ctaPrimary: "استعرض الدورات",
      ctaSecondary: "كيف يتم التفعيل؟",
      stats: {
        courses: "دورة",
        students: "طالب",
        hours: "ساعة محتوى",
        satisfaction: "رضا العملاء",
      },
    },
    
    // Courses Section
    courses: {
      title: "الدورات المتاحة",
      subtitle: "اختر الدورة المناسبة لرحلتك التطويرية",
      featured: "الدورات المميزة",
      all: "جميع الدورات",
      popular: "الأكثر طلباً",
      new: "جديد",
      
      // Course details
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
        exercises: "تمارين تطبيقية",
        certificate: "شهادة إتمام",
      },
      
      // Actions
      actions: {
        buy: "اشترِ الآن",
        activate: "فعّل الكود",
        preview: "معاينة مجانية",
        details: "عرض التفاصيل",
        addToCart: "أضف إلى السلة",
      },
    },
    
    // Pricing Section
    pricing: {
      title: "خطط مرنة — تفتح كورس واحد",
      subtitle: "اختر الخطة المناسبة لك",
      note: "الاشتراك يفتح كورس واحد فقط لمدة الاشتراك",
      
      plans: {
        one: {
          name: "شراء كورس واحد",
          price: "99,999",
          description: "وصول مدى الحياة لكورس واحد",
          features: [
            "وصول كامل لمحتوى الكورس",
            "تحديثات مجانية",
            "دعم فني 24/7",
            "شهادة إتمام",
          ],
        },
        monthly: {
          name: "اشتراك شهري",
          price: "49,999",
          description: "جدد شهرياً لكورس واحد",
          features: [
            "وصول كامل لمدة شهر",
            "إمكانية التبديل بين الكورسات",
            "دعم فني 24/7",
            "شهادة إتمام",
          ],
        },
        semi: {
          name: "اشتراك نصف سنوي",
          price: "249,999",
          description: "وفر 15% مع الاشتراك نصف السنوي",
          features: [
            "وصول كامل لمدة 6 أشهر",
            "إمكانية التبديل بين الكورسات",
            "دعم فني VIP",
            "شهادة إتمام",
            "جلسة استشارية مجانية",
          ],
        },
        yearly: {
          name: "اشتراك سنوي",
          price: "449,999",
          description: "وفر 25% مع الاشتراك السنوي",
          features: [
            "وصول كامل لمدة سنة",
            "إمكانية التبديل بين الكورسات",
            "دعم فني VIP",
            "شهادة إتمام",
            "جلسات استشارية شهرية",
            "هدايا حصرية",
          ],
        },
      },
      
      // Popular badge
      popular: "الأكثر طلباً",
      bestValue: "أفضل قيمة",
      
      // CTA
      cta: "ابدأ الآن",
      guaranteed: "ضمان استعادة الأموال خلال 7 أيام",
    },
    
    // Activation Section
    activation: {
      title: "تفعيل الوصول",
      subtitle: "بعد الدفع عبر Qi Card أو Zain Cash، سيتم إرسال كود تفعيل من الإدارة. أدخل الكود هنا لفتح الوصول.",
      
      form: {
        label: "كود التفعيل",
        placeholder: "أدخل كود التفعيل المكون من 16 رقم",
        button: "تفعيل الآن",
        processing: "جاري التفعيل...",
        success: "تم التفعيل بنجاح! مرحباً بك في الدورة.",
        error: "كود التفعيل غير صحيح. يرجى المحاولة مرة أخرى.",
      },
      
      hint: "ملاحظة: التفعيل يدوي لضمان الأمان ومنع الاحتيال.",
      needHelp: "تحتاج مساعدة؟ تواصل مع الدعم الفني",
    },
    
    // About Section
    about: {
      title: "من نحن",
      subtitle: "إسراء النور: رحلة تطوير ذاتي بإشراف متخصصين",
      
      mission: {
        title: "رسالتنا",
        text: "تمكين الأفراد من فهم أنفسهم وتطوير قدراتهم من خلال محتوى نفسي وتطويري مبني على أسس علمية، بأسلوب عملي وواضح يناسب الجميع.",
      },
      
      vision: {
        title: "رؤيتنا",
        text: "نطمح لخلق مجتمع واعٍ قادر على تحقيق التوازن النفسي والنجاح العملي من خلال التعلم المستمر والتطوير الذاتي.",
      },
      
      values: {
        title: "قيمنا",
        items: [
          "الأصالة: نقدم محتوى أصيلاً مبنياً على أسس علمية",
          "الوضوح: نبسط المفاهيم دون تعقيد",
          "التطبيق العملي: نركز على ما يمكن تطبيقه في الحياة اليومية",
          "الجودة: نضمن تجربة تعلم استثنائية",
        ],
      },
      
      team: {
        title: "فريقنا",
        members: [
          {
            name: "إسراء النور",
            role: "مؤسسة الأكاديمية",
            bio: "أخصائية نفسية ومطورة ذاتية مع أكثر من 10 سنوات خبرة في مجال التدريب والتطوير",
          },
          {
            name: "أحمد محمد",
            role: "مدير المحتوى",
            bio: "خبير في تطوير المناهج التعليمية وإعداد المواد التدريبية",
          },
          {
            name: "سارة أحمد",
            role: "مستشارة نفسية",
            bio: "أخصائية في العلاج السلوكي المعرفي ومشرفة على المحتوى النفسي",
          },
        ],
      },
    },
    
    // Contact Section
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
        error: "حدث خطأ في الإرسال. يرجى المحاولة مرة أخرى.",
        required: "هذا الحقل مطلوب",
        invalidEmail: "البريد الإلكتروني غير صحيح",
      },
      
      info: {
        title: "معلومات التواصل",
        email: "info@esraa-alnoor.com",
        phone: "+964 123 456 789",
        address: "بغداد، العراق",
        hours: "أوقات العمل: 9 صباحاً - 6 مساءً (السبت - الخميس)",
      },
      
      social: {
        title: "تابعنا على",
        facebook: "فيسبوك",
        instagram: "إنستغرام",
        twitter: "تويتر",
        youtube: "يوتيوب",
        telegram: "تيليغرام",
        whatsapp: "واتساب",
      },
    },
    
    // Testimonials
    testimonials: {
      title: "ماذا يقول المتابعون؟",
      subtitle: "آراء حقيقية من أشخاص خاضوا رحلة التطوير معنا",
      
      items: [
        {
          name: "سارة محمد",
          role: "معلمة",
          text: "أسلوب بسيط وواضح… حسّيت فعلاً بالتغيير خطوة بخطوة. الدورات غيرت نظرتي للحياة.",
          rating: 5,
        },
        {
          name: "علي حسن",
          role: "مهندس برمجيات",
          text: "المحتوى مرتب وحلقات طويلة مفيدة، التجربة مريحة جداً. أنصح بها بشدة.",
          rating: 5,
        },
        {
          name: "نور خالد",
          role: "طالبة جامعية",
          text: "أفضل شيء: التطبيق العملي والوضوح بدون تعقيد. فعلاً أضافت لي الكثير.",
          rating: 5,
        },
        {
          name: "محمد صالح",
          role: "مدير مشاريع",
          text: "استفدت كثيراً من دورة أسس النجاح. غيرت طريقة تفكيري وأسلوب عملي.",
          rating: 5,
        },
      ],
    },
    
    // FAQ Section
    faq: {
      title: "الأسئلة الشائعة",
      subtitle: "إجابات عن أكثر الأسئلة التي تطرحونها",
      
      items: [
        {
          question: "كيف يمكنني شراء دورة؟",
          answer: "يمكنك شراء الدورة عبر الموقع باستخدام بطاقة Qi Card أو Zain Cash. بعد الدفع، سيتم إرسال كود تفعيل عبر البريد الإلكتروني أو الواتساب خلال 24 ساعة.",
        },
        {
          question: "هل يمكنني استرجاع أموالي إذا لم تعجبني الدورة؟",
          answer: "نعم، نوفر ضمان استعادة الأموال خلال 7 أيام من تاريخ الشراء إذا لم تكن راضياً عن الدورة.",
        },
        {
          question: "كم مدة الوصول إلى الدورة بعد الشراء؟",
          answer: "الوصول مدى الحياة للدورة الواحدة في حالة الشراء الفردي. الاشتراكات الشهرية والسنوية تمنح وصولاً لمدة الاشتراك مع إمكانية التبديل بين الدورات.",
        },
        {
          question: "هل أحتاج إلى خبرة سابقة لفهم المحتوى؟",
          answer: "لا على الإطلاق. المحتوى مصمم ليكون مفهوماً للجميع بغض النظر عن الخلفية العلمية أو الخبرة السابقة.",
        },
        {
          question: "كيف يتم التفعيل؟",
          answer: "بعد الدفع، تقوم الإدارة بإرسال كود تفعيل فريد لك. تدخل الكود في صفحة التفعيل ليتم فتح الوصول إلى الدورة التي اخترتها.",
        },
      ],
    },
    
    // Footer
    footer: {
      rights: "جميع الحقوق محفوظة © إسراء النور",
      year: "2026",
      
      sections: {
        about: {
          title: "عن الأكاديمية",
          text: "أكاديمية إسراء النور تقدم محتوى تطويري ونفسي بأسس علمية وأسلوب عملي.",
        },
        links: {
          title: "روابط سريعة",
          items: ["الرئيسية", "الدورات", "الأسعار", "من نحن", "تواصل معنا"],
        },
        legal: {
          title: "قانوني",
          items: ["الشروط والأحكام", "سياسة الخصوصية", "سياسة الاسترجاع"],
        },
        newsletter: {
          title: "النشرة البريدية",
          description: "اشترك لتصلك أحدث الدورات والعروض",
          placeholder: "بريدك الإلكتروني",
          button: "اشترك",
          success: "تم الاشتراك بنجاح!",
        },
      },
      
      social: {
        title: "تابعنا",
      },
      
      payment: {
        title: "طرق الدفع",
        methods: ["Qi Card", "Zain Cash", "Mastercard", "Visa"],
      },
    },
    
    // Common UI Elements
    common: {
      loading: "جاري التحميل...",
      error: "حدث خطأ",
      success: "تم بنجاح",
      save: "حفظ",
      cancel: "إلغاء",
      delete: "حذف",
      edit: "تعديل",
      add: "إضافة",
      search: "بحث",
      filter: "تصفية",
      sort: "ترتيب",
      view: "عرض",
      back: "رجوع",
      next: "التالي",
      previous: "السابق",
      readMore: "اقرأ المزيد",
      showLess: "عرض أقل",
      copy: "نسخ",
      copied: "تم النسخ",
      share: "مشاركة",
      download: "تحميل",
      print: "طباعة",
      close: "إغلاق",
      menu: "القائمة",
      settings: "الإعدادات",
      profile: "الملف الشخصي",
      logout: "تسجيل خروج",
      login: "تسجيل دخول",
      register: "تسجيل",
      forgotPassword: "نسيت كلمة السر؟",
      resetPassword: "إعادة تعيين كلمة السر",
      changePassword: "تغيير كلمة السر",
      confirmPassword: "تأكيد كلمة السر",
      password: "كلمة السر",
      email: "البريد الإلكتروني",
      name: "الاسم",
      phone: "رقم الهاتف",
      address: "العنوان",
      city: "المدينة",
      country: "البلد",
      language: "اللغة",
      theme: "المظهر",
      light: "فاتح",
      dark: "داكن",
      system: "تلقائي",
      arabic: "العربية",
      english: "English",
    },
    
    // Error Messages
    errors: {
      general: "حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.",
      network: "مشكلة في الاتصال بالإنترنت. يرجى التحقق من اتصالك.",
      notFound: "الصفحة غير موجودة",
      unauthorized: "غير مصرح لك بالوصول إلى هذه الصفحة",
      forbidden: "ليس لديك صلاحية للوصول إلى هذا المحتوى",
      serverError: "خطأ في الخادم. يرجى المحاولة لاحقاً",
      timeout: "انتهت مهلة الطلب. يرجى المحاولة مرة أخرى",
    },
    
    // SEO & Meta
    meta: {
      home: {
        title: "إسراء النور - رحلة وعي بخطوات عملية",
        description: "كورسات نفسية وتطوير ذاتي بطريقة منظمة وواضحة. ابدأ رحلة تطويرك الذاتي اليوم",
      },
      courses: {
        title: "الدورات - إسراء النور",
        description: "تصفح مجموعتنا من الدورات التطويرية والنفسية المصممة لتساعدك على فهم نفسك وتطوير قدراتك",
      },
      pricing: {
        title: "الأسعار - إسراء النور",
        description: "خطط مرنة تناسب احتياجاتك. اختر الخطة المناسبة لرحلتك التطويرية",
      },
      about: {
        title: "من نحن - إسراء النور",
        description: "تعرف على فريق إسراء النور ورسالتنا ورؤيتنا في تطوير الذات",
      },
      contact: {
        title: "تواصل معنا - إسراء النور",
        description: "نحن هنا للإجابة عن استفساراتك. تواصل معنا عبر القنوات المتاحة",
      },
    },
  },
  
  en: {
    // Brand & Meta
    brand: {
      name: "Esraa Al-Noor",
      tagline: "A journey of awareness — with practical steps",
      description: "Psychology-inspired & self-growth courses in an organized and clear way",
    },
    
    // Navigation
    nav: {
      home: "Home",
      courses: "Courses",
      pricing: "Pricing",
      about: "About",
      contact: "Contact",
      activate: "Activate",
      terms: "Terms & Conditions",
      privacy: "Privacy Policy",
      faq: "FAQ",
      blog: "Blog",
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
        hours: "Hours of content",
        satisfaction: "Customer satisfaction",
      },
    },
    
    // Courses Section
    courses: {
      title: "Available Courses",
      subtitle: "Choose the right course for your development journey",
      featured: "Featured Courses",
      all: "All Courses",
      popular: "Most Popular",
      new: "New",
      
      // Course details
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
        exercises: "practical exercises",
        certificate: "Certificate of completion",
      },
      
      // Actions
      actions: {
        buy: "Buy now",
        activate: "Activate code",
        preview: "Free preview",
        details: "View details",
        addToCart: "Add to cart",
      },
    },
    
    // Pricing Section
    pricing: {
      title: "Flexible plans — unlock one course",
      subtitle: "Choose the plan that fits your needs",
      note: "Subscription unlocks one course only for the duration",
      
      plans: {
        one: {
          name: "One-time purchase",
          price: "$99.99",
          description: "Lifetime access to one course",
          features: [
            "Full access to course content",
            "Free updates",
            "24/7 technical support",
            "Certificate of completion",
          ],
        },
        monthly: {
          name: "Monthly subscription",
          price: "$49.99",
          description: "Renew monthly for one course",
          features: [
            "Full access for one month",
            "Ability to switch between courses",
            "24/7 technical support",
            "Certificate of completion",
          ],
        },
        semi: {
          name: "Semi-annual subscription",
          price: "$249.99",
          description: "Save 15% with semi-annual plan",
          features: [
            "Full access for 6 months",
            "Ability to switch between courses",
            "VIP technical support",
            "Certificate of completion",
            "Free consultation session",
          ],
        },
        yearly: {
          name: "Yearly subscription",
          price: "$449.99",
          description: "Save 25% with yearly plan",
          features: [
            "Full access for one year",
            "Ability to switch between courses",
            "VIP technical support",
            "Certificate of completion",
            "Monthly consultation sessions",
            "Exclusive gifts",
          ],
        },
      },
      
      // Popular badge
      popular: "Most Popular",
      bestValue: "Best Value",
      
      // CTA
      cta: "Get Started",
      guaranteed: "7-day money-back guarantee",
    },
    
    // Activation Section
    activation: {
      title: "Activate access",
      subtitle: "After paying via Qi Card or Zain Cash, admin sends you an activation code. Enter it here to unlock access.",
      
      form: {
        label: "Activation code",
        placeholder: "Enter your 16-digit activation code",
        button: "Activate now",
        processing: "Activating...",
        success: "Successfully activated! Welcome to the course.",
        error: "Invalid activation code. Please try again.",
      },
      
      hint: "Note: manual activation improves security and reduces fraud.",
      needHelp: "Need help? Contact support",
    },
    
    // About Section
    about: {
      title: "About Us",
      subtitle: "Esraa Al-Noor: A self-development journey with expert guidance",
      
      mission: {
        title: "Our Mission",
        text: "Empower individuals to understand themselves and develop their capabilities through psychology-based self-development content, presented in a practical and clear style accessible to everyone.",
      },
      
      vision: {
        title: "Our Vision",
        text: "We aspire to create a conscious community capable of achieving psychological balance and practical success through continuous learning and self-development.",
      },
      
      values: {
        title: "Our Values",
        items: [
          "Authenticity: We provide original content based on scientific foundations",
          "Clarity: We simplify concepts without complexity",
          "Practical Application: We focus on what can be applied in daily life",
          "Quality: We ensure an exceptional learning experience",
        ],
      },
      
      team: {
        title: "Our Team",
        members: [
          {
            name: "Esraa Al-Noor",
            role: "Academy Founder",
            bio: "Psychologist and self-development coach with over 10 years of experience in training and development",
          },
          {
            name: "Ahmed Mohammed",
            role: "Content Director",
            bio: "Expert in curriculum development and training material preparation",
          },
          {
            name: "Sara Ahmed",
            role: "Psychological Consultant",
            bio: "Cognitive Behavioral Therapy specialist and supervisor of psychological content",
          },
        ],
      },
    },
    
    // Contact Section
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
        error: "An error occurred. Please try again.",
        required: "This field is required",
        invalidEmail: "Invalid email address",
      },
      
      info: {
        title: "Contact Information",
        email: "info@esraa-alnoor.com",
        phone: "+964 123 456 789",
        address: "Baghdad, Iraq",
        hours: "Working hours: 9 AM - 6 PM (Saturday - Thursday)",
      },
      
      social: {
        title: "Follow Us",
        facebook: "Facebook",
        instagram: "Instagram",
        twitter: "Twitter",
        youtube: "YouTube",
        telegram: "Telegram",
        whatsapp: "WhatsApp",
      },
    },
    
    // Testimonials
    testimonials: {
      title: "What learners say",
      subtitle: "Real reviews from people who experienced the journey with us",
      
      items: [
        {
          name: "Sara Mohammed",
          role: "Teacher",
          text: "Simple and clear—real change, step by step. The courses changed my perspective on life.",
          rating: 5,
        },
        {
          name: "Ali Hassan",
          role: "Software Engineer",
          text: "Well-structured long episodes. Super smooth experience. Highly recommended.",
          rating: 5,
        },
        {
          name: "Noor Khalid",
          role: "University Student",
          text: "Best part: practical implementation without complexity. It really added so much to me.",
          rating: 5,
        },
        {
          name: "Mohammed Saleh",
          role: "Project Manager",
          text: "I benefited a lot from the Success Foundations course. It changed my thinking and work style.",
          rating: 5,
        },
      ],
    },
    
    // FAQ Section
    faq: {
      title: "Frequently Asked Questions",
      subtitle: "Answers to your most common questions",
      
      items: [
        {
          question: "How can I purchase a course?",
          answer: "You can purchase a course through the website using Qi Card or Zain Cash. After payment, an activation code will be sent via email or WhatsApp within 24 hours.",
        },
        {
          question: "Can I get a refund if I don't like the course?",
          answer: "Yes, we offer a 7-day money-back guarantee from the purchase date if you're not satisfied with the course.",
        },
        {
          question: "How long do I have access after purchase?",
          answer: "Lifetime access for single course purchase. Monthly and yearly subscriptions provide access for the subscription duration with the ability to switch between courses.",
        },
        {
          question: "Do I need prior experience to understand the content?",
          answer: "Not at all. The content is designed to be understandable for everyone regardless of educational background or prior experience.",
        },
        {
          question: "How does activation work?",
          answer: "After payment, the admin sends you a unique activation code. Enter the code on the activation page to unlock access to your chosen course.",
        },
      ],
    },
    
    // Footer
    footer: {
      rights: "All rights reserved © Esraa Al-Noor",
      year: "2026",
      
      sections: {
        about: {
          title: "About the Academy",
          text: "Esraa Al-Noor Academy offers self-development and psychological content based on scientific foundations with a practical approach.",
        },
        links: {
          title: "Quick Links",
          items: ["Home", "Courses", "Pricing", "About", "Contact"],
        },
        legal: {
          title: "Legal",
          items: ["Terms & Conditions", "Privacy Policy", "Refund Policy"],
        },
        newsletter: {
          title: "Newsletter",
          description: "Subscribe to receive latest courses and offers",
          placeholder: "Your email",
          button: "Subscribe",
          success: "Successfully subscribed!",
        },
      },
      
      social: {
        title: "Follow Us",
      },
      
      payment: {
        title: "Payment Methods",
        methods: ["Qi Card", "Zain Cash", "Mastercard", "Visa"],
      },
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
      add: "Add",
      search: "Search",
      filter: "Filter",
      sort: "Sort",
      view: "View",
      back: "Back",
      next: "Next",
      previous: "Previous",
      readMore: "Read more",
      showLess: "Show less",
      copy: "Copy",
      copied: "Copied!",
      share: "Share",
      download: "Download",
      print: "Print",
      close: "Close",
      menu: "Menu",
      settings: "Settings",
      profile: "Profile",
      logout: "Logout",
      login: "Login",
      register: "Register",
      forgotPassword: "Forgot password?",
      resetPassword: "Reset password",
      changePassword: "Change password",
      confirmPassword: "Confirm password",
      password: "Password",
      email: "Email",
      name: "Name",
      phone: "Phone",
      address: "Address",
      city: "City",
      country: "Country",
      language: "Language",
      theme: "Theme",
      light: "Light",
      dark: "Dark",
      system: "System",
      arabic: "العربية",
      english: "English",
    },
    
    // Error Messages
    errors: {
      general: "An unexpected error occurred. Please try again.",
      network: "Network connection issue. Please check your internet connection.",
      notFound: "Page not found",
      unauthorized: "You are not authorized to access this page",
      forbidden: "You don't have permission to access this content",
      serverError: "Server error. Please try again later",
      timeout: "Request timeout. Please try again",
    },
    
    // SEO & Meta
    meta: {
      home: {
        title: "Esraa Al-Noor - A journey of awareness with practical steps",
        description: "Psychology-inspired & self-growth courses in an organized and clear way. Start your self-development journey today",
      },
      courses: {
        title: "Courses - Esraa Al-Noor",
        description: "Browse our collection of self-development and psychological courses designed to help you understand yourself and develop your capabilities",
      },
      pricing: {
        title: "Pricing - Esraa Al-Noor",
        description: "Flexible plans that fit your needs. Choose the right plan for your development journey",
      },
      about: {
        title: "About - Esraa Al-Noor",
        description: "Meet the Esraa Al-Noor team, our mission, and vision for self-development",
      },
      contact: {
        title: "Contact - Esraa Al-Noor",
        description: "We're here to answer your questions. Contact us through available channels",
      },
    },
  },
} as const;

// ============================================================================
// TYPES (Auto-generated from dictionary)
// ============================================================================

/** Type for the entire dictionary structure */
export type Dict = typeof dict;

/** Type for Arabic dictionary */
export type ArabicDict = typeof dict.ar;

/** Type for English dictionary */
export type EnglishDict = typeof dict.en;

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get the complete dictionary for a specific locale
 * @param locale - The locale to get the dictionary for
 * @returns The complete dictionary for the specified locale
 * 
 * @example
 * const t = t('ar');
 * console.log(t.hero.title); // "رحلة وعي… بخطوات عملية"
 */
export function t<L extends Locale>(locale: L): typeof dict[L] {
  return dict[locale];
}

/**
 * Get a nested value from the dictionary using a path string
 * @param locale - The locale to use
 * @param path - Dot-notation path to the value (e.g., "hero.title")
 * @param fallback - Optional fallback value if path doesn't exist
 * @returns The value at the specified path or fallback
 * 
 * @example
 * const value = getNested('ar', 'hero.title');
 * // Returns: "رحلة وعي… بخطوات عملية"
 */
export function getNested<T = string>(
  locale: Locale, 
  path: string, 
  fallback?: T
): T | string {
  try {
    const parts = path.split('.');
    let result: any = dict[locale];
    
    for (const part of parts) {
      if (result && typeof result === 'object' && part in result) {
        result = result[part];
      } else {
        return fallback !== undefined ? fallback : path;
      }
    }
    
    return result !== undefined ? result : (fallback !== undefined ? fallback : path);
  } catch {
    return fallback !== undefined ? fallback : path;
  }
}

/**
 * Format a number according to locale
 * @param locale - The locale to format for
 * @param number - The number to format
 * @param options - Intl.NumberFormat options
 * @returns Formatted number string
 * 
 * @example
 * formatNumber('ar', 500000); // "٥٠٠٬٠٠٠"
 * formatNumber('en', 500000); // "500,000"
 */
export function formatNumber(
  locale: Locale,
  number: number,
  options?: Intl.NumberFormatOptions
): string {
  return new Intl.NumberFormat(locale === 'ar' ? 'ar-IQ' : 'en-US', options).format(number);
}

/**
 * Format currency (IQD)
 * @param locale - The locale to format for
 * @param amount - The amount to format
 * @returns Formatted currency string
 * 
 * @example
 * formatCurrency('ar', 500000); // "د.ع ٥٠٠٬٠٠٠"
 * formatCurrency('en', 500000); // "IQD 500,000"
 */
export function formatCurrency(locale: Locale, amount: number): string {
  if (locale === 'ar') {
    return `د.ع ${formatNumber('ar', amount)}`;
  }
  return `IQD ${formatNumber('en', amount)}`;
}

/**
 * Format date according to locale
 * @param locale - The locale to format for
 * @param date - Date to format (Date object or ISO string)
 * @param options - Intl.DateTimeFormat options
 * @returns Formatted date string
 */
export function formatDate(
  locale: Locale,
  date: Date | string,
  options?: Intl.DateTimeFormatOptions
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat(
    locale === 'ar' ? 'ar-IQ' : 'en-US',
    options || { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }
  ).format(dateObj);
}

/**
 * Get text direction for a locale
 * @param locale - The locale
 * @returns "rtl" or "ltr"
 */
export const getDir = getDirection;

// ============================================================================
// EXPORT DEFAULT
// ============================================================================

export default {
  locales,
  defaultLocale,
  isLocale,
  getDirection,
  t,
  dict,
  getNested,
  formatNumber,
  formatCurrency,
  formatDate,
};
