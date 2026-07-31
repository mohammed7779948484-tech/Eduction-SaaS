/** Registration page content — trial lesson + general registration. */

export const registrationContent = {
  hero: {
    eyebrow: { ar: "التسجيل", en: "Registration" },
    title: { ar: "احجز حصةً تجريبيةً مجانية", en: "Book a free trial lesson" },
    subtitle: {
      ar: "املأ النموذج أدناه وسنتواصل معك لتحديد موعد الحصة التجريبية. هذا نموذجٌ تجريبي — لا تُرسَل البيانات.",
      en: "Fill out the form below and we'll contact you to schedule your trial lesson. This is a prototype form — no data is sent.",
    },
  },
  options: {
    trialTitle: { ar: "حصة تجريبية", en: "Trial lesson" },
    trialDesc: { ar: "جرّب البرنامج مع طفلك في حصةٍ واحدة مجانية.", en: "Experience the program with your child in one free session." },
    registerTitle: { ar: "تسجيلٌ كامل", en: "Full registration" },
    registerDesc: { ar: "سجّل طفلك في المستوى المناسب بعد الحصة التجريبية.", en: "Enroll your child at the appropriate level after the trial lesson." },
  },
  form: {
    parentSection: { ar: "بيانات ولي الأمر", en: "Parent/guardian details" },
    studentSection: { ar: "بيانات الطفل", en: "Student details" },
    preferencesSection: { ar: "التفضيلات", en: "Preferences" },
    parentName: { ar: "اسم ولي الأمر", en: "Parent name" },
    parentPhone: { ar: "رقم الهاتف", en: "Phone number" },
    parentEmail: { ar: "البريد الإلكتروني", en: "Email" },
    studentName: { ar: "اسم الطفل", en: "Child name" },
    studentAge: { ar: "عمر الطفل", en: "Child age" },
    channel: { ar: "القناة المفضّلة", en: "Preferred channel" },
    branch: { ar: "الفرع المفضّل", en: "Preferred branch" },
    schedule: { ar: "الوقت المفضّل", en: "Preferred schedule" },
    consent: { ar: "أوافق على سياسة الخصوصية وحماية الطفل", en: "I agree to the privacy and child-protection policy" },
    submit: { ar: "إرسال الطلب", en: "Submit request" },
    whatsappAlt: { ar: "أو تواصل عبر الواتساب", en: "Or contact via WhatsApp" },
  },
  branches: [
    { value: "sanaa", label: { ar: "صنعاء", en: "Sana'a" } },
    { value: "taiz", label: { ar: "تعز", en: "Taiz" } },
    { value: "aden", label: { ar: "عدن", en: "Aden" } },
  ],
  channels: [
    { value: "center", label: { ar: "في المركز", en: "At center" } },
    { value: "school", label: { ar: "في المدرسة", en: "In school" } },
    { value: "online", label: { ar: "أونلاين (قريباً)", en: "Online (soon)" } },
  ],
  schedules: [
    { value: "morning", label: { ar: "صباحاً", en: "Morning" } },
    { value: "afternoon", label: { ar: "ظهيرةً", en: "Afternoon" } },
    { value: "evening", label: { ar: "مساءً", en: "Evening" } },
  ],
} as const;
