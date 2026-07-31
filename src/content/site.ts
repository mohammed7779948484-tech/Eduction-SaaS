/**
 * Site-wide information. Demo/placeholder content for the prototype.
 * Real branch details are not provided by the client (see SOURCE_OF_TRUTH.md §7).
 */

export const site = {
  name: { ar: "برنامج الحساب الذهني", en: "Mental Arithmetic Program" },
  shortName: { ar: "الحساب الذهني", en: "Mental Arithmetic" },
  tagline: {
    ar: "عقلٌ أسرع. مستقبلٌ أفضل.",
    en: "A faster mind. A better future.",
  },
  method: { ar: "طريقة السوروبان", en: "Soroban Method" },
  ageRange: { ar: "من 7 إلى 12 عاماً", en: "Ages 7 to 12" },
  country: { ar: "اليمن", en: "Yemen" },
  // Demo contact details (placeholders)
  whatsapp: "+967 700 000 000",
  email: "info@example.ye",
  branches: [
    { city: { ar: "صنعاء", en: "Sana'a" }, area: { ar: "شارع حدة", en: "Hadda St." } },
    { city: { ar: "تعز", en: "Taiz" }, area: { ar: "شارع الجمهوري", en: "Al-Jumhuri St." } },
    { city: { ar: "عدن", en: "Aden" }, area: { ar: "خور مكسر", en: "Khormaksar" } },
  ],
  childProtection: {
    ar: "نلتزم بمعايير حماية الطفل في كل برامجنا ومراكزنا.",
    en: "We are committed to child-protection standards across all our programs and centers.",
  },
} as const;
