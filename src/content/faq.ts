/**
 * Demo FAQ — used on the /design-system page to demonstrate the Accordion.
 * Future Program page will reuse this content (see PAGE_SPECS.md).
 */

export interface FaqItem {
  question: { ar: string; en: string };
  answer: { ar: string; en: string };
}

export const faq: FaqItem[] = [
  {
    question: { ar: "ما الأعمار المناسبة للبرنامج؟", en: "What ages is the program for?" },
    answer: {
      ar: "يستهدف البرنامج الأطفال من 7 إلى 12 عاماً، وهي مرحلةٌ ذهنيةٌ مثالية لاكتساب مهارات الحساب الذهني.",
      en: "The program targets children aged 7 to 12 — an ideal mental stage for acquiring mental-arithmetic skills.",
    },
  },
  {
    question: { ar: "ما طريقة السوروبان؟", en: "What is the Soroban method?" },
    answer: {
      ar: "السوروبان أداةٌ حسابيةٌ يابانية الأصل تُدرَّب عليها اليد أولًا ثم ينتقل الطفل إلى الحساب الذهني دون أداة.",
      en: "The Soroban is a Japanese abacus; children train with their hands first, then move to mental arithmetic without the tool.",
    },
  },
  {
    question: { ar: "كم عدد المستويات؟", en: "How many levels are there?" },
    answer: {
      ar: "يضمّ البرنامج عشرة مستويات متدرّجة من 1 إلى 10، لكلٍّ منها أهدافٌ ومهاراتٌ محدّدة.",
      en: "The program has ten graded levels from 1 to 10, each with defined goals and skills.",
    },
  },
  {
    question: { ar: "هل توجد حصة تجريبية؟", en: "Is there a trial lesson?" },
    answer: {
      ar: "نعم، يمكن حجز حصةٍ تجريبيةٍ مجانيةٍ ليتعرّف الطفل والأسرة على أسلوب البرنامج.",
      en: "Yes — a free trial lesson can be booked so the child and family can experience the program's style.",
    },
  },
];
