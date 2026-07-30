/**
 * Homepage content. Demo/illustrative — NOT verified client facts
 * (see SOURCE_OF_TRUTH.md §8). Numbers are illustrative.
 */

export interface Stat {
  value: number;
  prefix?: string;
  suffix?: string;
  label: { ar: string; en: string };
}

export const heroContent = {
  eyebrow: { ar: "طريقة السوروبان · اليمن", en: "Soroban Method · Yemen" },
  title: [
    { ar: "عقلٌ أسرع.", en: "A faster mind." },
    { ar: "مستقبلٌ أفضل.", en: "A better future." },
  ],
  subtitle: {
    ar: "منهجٌ تعليميٌّ حديث يعتمد على السوروبان لتنمية مهارات الحساب الذهني لدى الأطفال من 7 إلى 12 عاماً — في المركز والمدرسة والمنصّة الرقمية.",
    en: "A modern curriculum built on the Soroban to develop mental-arithmetic skills in children aged 7 to 12 — at our centers, in partner schools, and online.",
  },
  primaryCta: { ar: "احجز حصة تجريبية مجانية", en: "Book a free trial lesson" },
  secondaryCta: { ar: "اعرف المزيد", en: "Learn more" },
} as const;

export const stats: Stat[] = [
  { value: 95, suffix: "%", label: { ar: "رضا الأولياء", en: "Parent satisfaction" } },
  { value: 3, label: { ar: "فروع ناشطة", en: "Active branches" } },
  { value: 780, prefix: "+", label: { ar: "طالب وطالبة", en: "Students" } },
  { value: 10, label: { ar: "مستويات تعليمية", en: "Learning levels" } },
];

export interface Step {
  number: string;
  title: { ar: string; en: string };
  description: { ar: string; en: string };
}

export const howItWorks: { ar: string; en: string } = {
  ar: "كيف يعمل البرنامج",
  en: "How the program works",
};

export const steps: Step[] = [
  {
    number: "1",
    title: { ar: "الاكتشاف", en: "Discovery" },
    description: {
      ar: "يبدأ الطفل بحسابٍ بسيطٍ وممتعٍ على السوروبان ليتعرّف على المفاهيم الأساسية.",
      en: "The child starts with simple, fun calculation on the Soroban to grasp core concepts.",
    },
  },
  {
    number: "2",
    title: { ar: "السرعة", en: "Speed" },
    description: {
      ar: "يتدرّب على الحساب الذهني السريع حتى يستوعب الأرقام دون أداة.",
      en: "Trains in fast mental arithmetic until numbers are grasped without a tool.",
    },
  },
  {
    number: "3",
    title: { ar: "العمق", en: "Depth" },
    description: {
      ar: "يتقدّم عبر المستويات العشرة من 1 إلى 10 بمنهجيةٍ متدرّجة.",
      en: "Progresses through the ten levels from 1 to 10 with a graded methodology.",
    },
  },
  {
    number: "4",
    title: { ar: "الإتقان", en: "Mastery" },
    description: {
      ar: "يكتسب مهاراتٍ ومواهبَ وثقةً تعينه في دراسته وحياته.",
      en: "Gains skills, talents, and confidence that support study and life.",
    },
  },
];

export interface Channel {
  variant: "navy" | "blue" | "teal";
  title: { ar: string; en: string };
  description: { ar: string; en: string };
  cta: { ar: string; en: string };
}

export const channelsHeading: { ar: string; en: string } = {
  ar: "قنوات التعلّم الثلاث",
  en: "Three learning channels",
};

export const channels: Channel[] = [
  {
    variant: "navy",
    title: { ar: "في مراكزنا", en: "At our centers" },
    description: {
      ar: "حصصٌ حضوريةٌ في فروعنا المجهّزة بإشراف مدرّبين متخصّصين.",
      en: "In-person lessons at our equipped branches with specialist trainers.",
    },
    cta: { ar: "اعرف الفروع", en: "See branches" },
  },
  {
    variant: "blue",
    title: { ar: "في المدارس الشريكة", en: "In partner schools" },
    description: {
      ar: "برنامجٌ مدمجٌ ضمن اليوم الدراسي في المدارس الشريكة.",
      en: "A program integrated into the school day at partner schools.",
    },
    cta: { ar: "شراكة المدارس", en: "School partnership" },
  },
  {
    variant: "teal",
    title: { ar: "على المنصّة الرقمية", en: "On the digital platform" },
    description: {
      ar: "تعلّمٌ أونلاين تفاعلي عبر المنصّة التعليمية (قريباً).",
      en: "Interactive online learning via the educational platform (coming soon).",
    },
    cta: { ar: "قريباً", en: "Coming soon" },
  },
];

export const finalCta = {
  title: {
    ar: "جاهزون لتدريب عقول أطفالكم على الإبداع؟",
    en: "Ready to train your children's minds for creativity?",
  },
  subtitle: {
    ar: "احجز حصةً تجريبيةً مجانيةً هذا الشهر واكتشف الفرق.",
    en: "Book a free trial lesson this month and discover the difference.",
  },
  cta: { ar: "احجز الآن مجاناً", en: "Book now — free" },
} as const;
