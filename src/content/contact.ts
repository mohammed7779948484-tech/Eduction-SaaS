/** Contact page content — branches, methods, form. */

export const contactContent = {
  hero: {
    eyebrow: { ar: "تواصل معنا", en: "Contact us" },
    title: { ar: "نحن هنا لمساعدتك", en: "We're here to help" },
    subtitle: {
      ar: "تواصل معنا عبر القناة الأنسب لك — واتساب، هاتف، بريد، أو بزيارة أحد فروعنا.",
      en: "Reach us through the channel that suits you — WhatsApp, phone, email, or by visiting one of our branches.",
    },
  },
  methods: [
    { icon: "whatsapp", title: { ar: "واتساب", en: "WhatsApp" }, value: "+967 700 000 000", href: "https://wa.me/967700000000" },
    { icon: "phone", title: { ar: "هاتف", en: "Phone" }, value: "+967 1 000 000", href: "tel:+9671000000" },
    { icon: "mail", title: { ar: "بريد إلكتروني", en: "Email" }, value: "info@example.ye", href: "mailto:info@example.ye" },
  ],
  branches: [
    { city: { ar: "صنعاء", en: "Sana'a" }, area: { ar: "شارع حدة", en: "Hadda St." }, hours: { ar: "السبت–الخميس: 9ص–6م", en: "Sat–Thu: 9am–6pm" } },
    { city: { ar: "تعز", en: "Taiz" }, area: { ar: "شارع الجمهوري", en: "Al-Jumhuri St." }, hours: { ar: "السبت–الخميس: 9ص–5م", en: "Sat–Thu: 9am–5pm" } },
    { city: { ar: "عدن", en: "Aden" }, area: { ar: "خور مكسر", en: "Khormaksar" }, hours: { ar: "السبت–الأربعاء: 9ص–4م", en: "Sat–Wed: 9am–4pm" } },
  ],
  form: {
    title: { ar: "أرسل رسالة", en: "Send a message" },
    name: { ar: "الاسم", en: "Name" },
    email: { ar: "البريد الإلكتروني", en: "Email" },
    subject: { ar: "الموضوع", en: "Subject" },
    message: { ar: "الرسالة", en: "Message" },
    submit: { ar: "إرسال", en: "Send" },
  },
  commonQuestions: {
    title: { ar: "أسئلة شائعة", en: "Common questions" },
    items: [
      { q: { ar: "ما أعمار قبول الأطفال؟", en: "What ages do you accept?" }, a: { ar: "من 7 إلى 12 عاماً.", en: "Ages 7 to 12." } },
      { q: { ar: "هل توجد حصة تجريبية؟", en: "Is there a trial lesson?" }, a: { ar: "نعم، مجانية. احجزها من صفحة التسجيل.", en: "Yes, free. Book it from the registration page." } },
      { q: { ar: "أين فروعكم؟", en: "Where are your branches?" }, a: { ar: "صنعاء، تعز، عدن.", en: "Sana'a, Taiz, Aden." } },
    ],
  },
  social: {
    title: { ar: "تابعونا", en: "Follow us" },
    items: [
      { name: { ar: "فيسبوك", en: "Facebook" }, href: "https://facebook.com", icon: "facebook" },
      { name: { ar: "إنستغرام", en: "Instagram" }, href: "https://instagram.com", icon: "instagram" },
      { name: { ar: "يوتيوب", en: "YouTube" }, href: "https://youtube.com", icon: "youtube" },
    ],
  },
} as const;
