/**
 * Demo testimonials — REPRESENTATIVE, not verified production testimonials
 * (see SOURCE_OF_TRUTH.md §8). Used in the homepage carousel.
 */

export interface Testimonial {
  quote: { ar: string; en: string };
  name: { ar: string; en: string };
  role: { ar: string; en: string };
}

export const testimonialsHeading: { ar: string; en: string } = {
  ar: "آراء الأولياء والطلاب",
  en: "Parents & students say",
};

export const testimonials: Testimonial[] = [
  {
    quote: {
      ar: "لاحظتُ تطوّراً ملحوظاً في سرعة حساب طفلي وثقته بنفسه بعد عدّة مستويات.",
      en: "I noticed a clear improvement in my child's calculation speed and confidence after several levels.",
    },
    name: { ar: "أم خالد", en: "Khaled's mother" },
    role: { ar: "ولية أمر · صنعاء", en: "Parent · Sana'a" },
  },
  {
    quote: {
      ar: "السوروبان جعل الرياضيات ممتعةً لابنتي؛ صارت تحلّ المسائل ذهنياً بسرعةٍ مدهشة.",
      en: "The Soroban made math fun for my daughter; she now solves problems mentally at an amazing speed.",
    },
    name: { ar: "أبو ريم", en: "Reem's father" },
    role: { ar: "ولي أمر · تعز", en: "Parent · Taiz" },
  },
  {
    quote: {
      ar: "أحبّ الفصول الحضورية والمدرّبين الصبورين؛ تعلّمتُ تركيزاً أفضل في دروسي كلها.",
      en: "I love the in-person classes and patient trainers; I learned better focus in all my lessons.",
    },
    name: { ar: "ريم · 10 سنوات", en: "Reem · age 10" },
    role: { ar: "طالبة · المستوى 4", en: "Student · Level 4" },
  },
];
