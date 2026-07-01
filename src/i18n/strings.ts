import type { Locale } from "@/shared/types";

/**
 * Manual i18n dictionary. Covers all user-facing copy in EN + AR.
 * Use `t(locale, key)` to resolve.
 */
export const dict = {
  en: {
    // brand
    brandName: "M. Yahya",
    brandRole: "Software Engineer",
    // nav
    navHome: "Home",
    navWork: "Work",
    navBlog: "Writing",
    navContact: "Contact",
    navCta: "Start a project",
    // hero
    heroEyebrow: "ENGINEER · BUILDER",
    heroTitleLine1: "Designing quiet systems",
    heroTitleLine2: "that carry loud loads.",
    heroSubtitle:
      "Senior software engineer focused on web architecture, API design, and the calm machinery behind resilient products.",
    heroPrimary: "View selected work",
    heroSecondary: "Get in touch",
    heroScroll: "Scroll",
    // about
    aboutEyebrow: "ABOUT",
    aboutTitle: "A craft-minded engineer who ships.",
    aboutBody:
      "I build the unglamorous foundations that let products move fast without breaking — typed APIs, observable services, and frontend architectures that scale with the team. A decade across web, mobile, and data systems has taught me that taste and discipline compound.",
    aboutSkillsTitle: "Core areas",
    aboutStatsYears: "Years building",
    aboutStatsProjects: "Projects shipped",
    aboutStatsClients: "Teams supported",
    // services
    servicesEyebrow: "SERVICES",
    servicesTitle: "How I can help.",
    servicesSubtitle: "Four disciplines, one accountable engineer.",
    // work preview
    workEyebrow: "SELECTED WORK",
    workTitle: "Recent case studies.",
    workSubtitle: "Three projects across web, mobile, and data.",
    workViewAll: "View all work",
    workResult: "result",
    workResults: "results",
    workAll: "All",
    workFiltersLabel: "Filter by tech",
    // case study
    caseEyebrow: "CASE STUDY",
    caseOverview: "Overview",
    caseChallenge: "The challenge",
    caseSolution: "The solution",
    caseOutcome: "Outcome",
    caseLive: "Live site",
    caseRepo: "Source code",
    caseBack: "Back to all work",
    caseTech: "Stack",
    caseGallery: "Gallery",
    // blog
    blogEyebrow: "WRITING",
    blogTitle: "Notes on engineering.",
    blogSubtitle: "Long-form on architecture, taste, and the craft of shipping.",
    blogBack: "Back to all writing",
    blogReadingTime: "min read",
    // contact
    contactEyebrow: "CONTACT",
    contactTitle: "Let's build something durable.",
    contactSubtitle:
      "Tell me about your team, the problem, and the timeline. I reply within two business days.",
    contactName: "Your name",
    contactEmail: "Email",
    contactMessage: "Project notes",
    contactSubmit: "Send message",
    contactSending: "Sending…",
    contactSuccess: "Thanks — your message landed. I'll be in touch shortly.",
    contactError: "Something went wrong. Please try again or email me directly.",
    contactUnset:
      "The contact form is not configured yet. Set VITE_FORMSPREE_ENDPOINT, or reach me directly:",
    contactDirect: "Email directly",
    contactSocial: "Elsewhere",
    contactLocation: "Based in Tripoli, Libya · Working remotely",
    // footer
    footerTagline: "Engineering with taste. Shipping with care.",
    footerNav: "Navigate",
    footerSocial: "Elsewhere",
    footerColophon: "Built with React, Vite, Tailwind & a lot of espresso.",
    footerRights: "All rights reserved.",
    // toggles
    toggleTheme: "Toggle theme",
    toggleLocale: "Switch language",
    localeShort: "ع",
    localeOther: "EN",
    // cta
    ctaEyebrow: "AVAILABLE FOR WORK",
    ctaTitle: "Have a system worth building well?",
    ctaBody:
      "I take on a small number of projects each quarter — usually architecture, platform, or 0→1 product work.",
    ctaButton: "Start a conversation",
    // misc
    notFoundTitle: "Page not found",
    notFoundBody: "The link may be broken or the page may have moved.",
    notFoundBack: "Return home",
  },
  ar: {
    brandName: "م. يحيى",
    brandRole: "مهندس برمجيات",
    navHome: "الرئيسية",
    navWork: "الأعمال",
    navBlog: "كتابات",
    navContact: "تواصل",
    navCta: "ابدأ مشروعاً",
    heroEyebrow: "مهندس · باني",
    heroTitleLine1: "أنظمة هادئة",
    heroTitleLine2: "تتحمل أعباءً صاخبة.",
    heroSubtitle:
      "مهندس برمجيات أول يركّز على معمارية الويب وتصميم الواجهات البرمجية، وعلى الآلة الهادئة خلف المنتجات المرنة.",
    heroPrimary: "استعراض الأعمال المختارة",
    heroSecondary: "تواصل معي",
    heroScroll: "اسحب",
    aboutEyebrow: "نبذة",
    aboutTitle: "مهندس صانع يُشحن بعناية.",
    aboutBody:
      "أبني الأساسات غير البرّاقة التي تتيح للمنتجات أن تتقدّم بسرعة دون أن تنهار — واجهات برمجية مُنمَّطة، وخدمات قابلة للملاحظة، ومعماريات واجهة تتوسّع مع الفريق. عقدٌ في الويب والموبايل والبيانات علّمني أن الذوق والانضباط يتراكم.",
    aboutSkillsTitle: "المجالات الأساسية",
    aboutStatsYears: "سنوات من البناء",
    aboutStatsProjects: "مشروع مُنجز",
    aboutStatsClients: "فريق مدعوم",
    servicesEyebrow: "الخدمات",
    servicesTitle: "كيف يمكنني المساعدة.",
    servicesSubtitle: "أربع تخصّصات، مهندس واحد مسؤول.",
    workEyebrow: "أعمال مختارة",
    workTitle: "دراسات حالة حديثة.",
    workSubtitle: "ثلاثة مشاريع عبر الويب والموبايل والبيانات.",
    workViewAll: "عرض كل الأعمال",
    workResult: "نتيجة",
    workResults: "نتائج",
    workAll: "الكل",
    workFiltersLabel: "فلترة حسب التقنية",
    caseEyebrow: "دراسة حالة",
    caseOverview: "نظرة عامة",
    caseChallenge: "التحدّي",
    caseSolution: "الحل",
    caseOutcome: "النتيجة",
    caseLive: "الموقع الحي",
    caseRepo: "الكود المصدري",
    caseBack: "العودة إلى كل الأعمال",
    caseTech: "التقنيات",
    caseGallery: "المعرض",
    blogEyebrow: "كتابات",
    blogTitle: "ملاحظات في الهندسة.",
    blogSubtitle: "كتابات مطوّلة عن المعمارية والذوق وحرفية الشحن.",
    blogBack: "العودة إلى كل الكتابات",
    blogReadingTime: "دقائق قراءة",
    contactEyebrow: "تواصل",
    contactTitle: "لنبنِ شيئاً يدوم.",
    contactSubtitle:
      "أخبرني عن فريقك، وعن المشكلة، وعن الجدول الزمني. أردّ خلال يومَي عمل.",
    contactName: "اسمك",
    contactEmail: "البريد الإلكتروني",
    contactMessage: "تفاصيل المشروع",
    contactSubmit: "إرسال الرسالة",
    contactSending: "جارٍ الإرسال…",
    contactSuccess: "شكراً — وصلت رسالتك. سأتواصل معك قريباً.",
    contactError: "حدث خطأ ما. حاول مجدداً أو راسلني مباشرة.",
    contactUnset:
      "نموذج التواصل غير مُعدّ بعد. عيّن VITE_FORMSPREE_ENDPOINT، أو راسلني مباشرة:",
    contactDirect: "راسلني مباشرة",
    contactSocial: "في مكان آخر",
    contactLocation: "مقيم في طرابلس، ليبيا · أعمل عن بُعد",
    footerTagline: "هندسة بذوق. شحن بعناية.",
    footerNav: "روابط",
    footerSocial: "في مكان آخر",
    footerColophon: "مبني بـ React وVite وTailwind وكمّية كبيرة من الإسبريسو.",
    footerRights: "جميع الحقوق محفوظة.",
    toggleTheme: "تبديل الثيم",
    toggleLocale: "تبديل اللغة",
    localeShort: "EN",
    localeOther: "ع",
    ctaEyebrow: "متاح للعمل",
    ctaTitle: "لديك نظام يستحق البناء بإتقان؟",
    ctaBody:
      "أقبل عدداً محدوداً من المشاريع كل ربع سنة — عادةً عمل معماري أو منصة أو منتج من الصفر.",
    ctaButton: "ابدأ محادثة",
    notFoundTitle: "الصفحة غير موجودة",
    notFoundBody: "قد يكون الرابط مكسوراً أو أن الصفحة انتقلت.",
    notFoundBack: "العودة للرئيسية",
  },
} as const;

export type DictKey = keyof typeof dict.en;

export function t(locale: Locale, key: DictKey): string {
  const table = dict[locale];
  return (table as Record<string, string>)[key] ?? (dict.en as Record<string, string>)[key] ?? key;
}
