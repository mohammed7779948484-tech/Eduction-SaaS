/** FAQ page content — centralized, reusable. Extends existing faq.ts. */

export interface FaqCategory {
  id: string;
  title: { ar: string; en: string };
  items: { q: { ar: string; en: string }; a: { ar: string; en: string } }[];
}

export const faqCategories: FaqCategory[] = [
  {
    id: "program",
    title: { ar: "البرنامج", en: "Program" },
    items: [
      { q: { ar: "ما الحساب الذهني؟", en: "What is mental arithmetic?" }, a: { ar: "قدرةٌ على الحساب ذهنياً دون أداة، تُنمّى عبر السوروبان.", en: "The ability to calculate mentally without a tool, developed through the Soroban." } },
      { q: { ar: "ما السوروبان؟", en: "What is the Soroban?" }, a: { ar: "أداةٌ حسابية يابانية من إطارٍ وخرزات.", en: "A Japanese abacus made of a frame and beads." } },
      { q: { ar: "كم عدد المستويات؟", en: "How many levels are there?" }, a: { ar: "عشرة مستويات متدرّجة.", en: "Ten graded levels." } },
      { q: { ar: "كم تستغرق الحصة؟", en: "How long is a session?" }, a: { ar: "45–60 دقيقة.", en: "45–60 minutes." } },
    ],
  },
  {
    id: "age",
    title: { ar: "الأعمار والقبول", en: "Age & admission" },
    items: [
      { q: { ar: "ما الأعمار المناسبة؟", en: "What ages are suitable?" }, a: { ar: "من 7 إلى 12 عاماً.", en: "Ages 7 to 12." } },
      { q: { ar: "هل يقبل الأطفال دون 7 سنوات؟", en: "Do you accept children under 7?" }, a: { ar: "يُفضّل الانتظار حتى 7 سنوات.", en: "We recommend waiting until age 7." } },
    ],
  },
  {
    id: "trial",
    title: { ar: "الحصة التجريبية والتسجيل", en: "Trial & registration" },
    items: [
      { q: { ar: "هل الحصة التجريبية مجانية؟", en: "Is the trial lesson free?" }, a: { ar: "نعم، مجانية بالكامل.", en: "Yes, completely free." } },
      { q: { ar: "كيف أحجز حصة تجريبية؟", en: "How do I book a trial?" }, a: { ar: "عبر صفحة التسجيل أو الواتساب.", en: "Via the registration page or WhatsApp." } },
    ],
  },
  {
    id: "channels",
    title: { ar: "القنوات التعليمية", en: "Learning channels" },
    items: [
      { q: { ar: "ما القنوات المتاحة؟", en: "What channels are available?" }, a: { ar: "المراكز، المدارس الشريكة، والمنصّة الرقمية (قريباً).", en: "Centers, partner schools, and the digital platform (soon)." } },
      { q: { ar: "هل المنصّة الأونلاين جاهزة؟", en: "Is the online platform ready?" }, a: { ar: "لا، قيد التطوير — قريباً.", en: "No, under development — coming soon." } },
    ],
  },
  {
    id: "schools",
    title: { ar: "شراكة المدارس", en: "School partnership" },
    items: [
      { q: { ar: "كيف تشارك مدرستنا؟", en: "How does our school partner?" }, a: { ar: "تواصل عبر صفحة المدارس.", en: "Contact us via the schools page." } },
      { q: { ar: "هل تقدّمون التقارير؟", en: "Do you provide reports?" }, a: { ar: "نعم، تقارير دورية.", en: "Yes, periodic reports." } },
    ],
  },
  {
    id: "trainers",
    title: { ar: "تدريب المدربين", en: "Trainer training" },
    items: [
      { q: { ar: "هل أحتاج خبرةً سابقة؟", en: "Do I need prior experience?" }, a: { ar: "لا، التدريب من الأساس.", en: "No, training starts from basics." } },
      { q: { ar: "هل يُضمَن التوظيف؟", en: "Is employment guaranteed?" }, a: { ar: "لا ضمان، لكن الفرص متاحة.", en: "No guarantee, but opportunities exist." } },
    ],
  },
  {
    id: "platform",
    title: { ar: "المنصّة الافتراضية", en: "Virtual platform" },
    items: [
      { q: { ar: "متى تُطلق المنصّة؟", en: "When will the platform launch?" }, a: { ar: "قيد التطوير — سجّل اهتمامك.", en: "Under development — register your interest." } },
      { q: { ar: "هل ستكون مدفوعة؟", en: "Will it be paid?" }, a: { ar: "تفاصيل التسعير عند الإطلاق.", en: "Pricing details at launch." } },
    ],
  },
];

export const faqPageContent = {
  hero: {
    eyebrow: { ar: "الأسئلة الشائعة", en: "FAQ" },
    title: { ar: "إجاباتٌ لأسئلتكم", en: "Answers to your questions" },
    subtitle: { ar: "ابحث أو تصفّح حسب الفئة.", en: "Search or browse by category." },
  },
  searchPlaceholder: { ar: "ابحث في الأسئلة…", en: "Search questions…" },
  noResults: { ar: "لا توجد نتائج. تواصل معنا.", en: "No results. Contact us." },
  contactCta: { ar: "لم تجد إجابتك؟ تواصل معنا", en: "Didn't find your answer? Contact us" },
} as const;
