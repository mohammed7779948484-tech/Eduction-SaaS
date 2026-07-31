/** Trainers page content — trainer development path. */

export const trainersContent = {
  hero: {
    eyebrow: { ar: "تدريب المدربين", en: "Trainer training" },
    title: { ar: "كن مدرّباً معتمداً في الحساب الذهني", en: "Become a certified mental-arithmetic trainer" },
    subtitle: {
      ar: "انضم إلى برنامج تطوير المدربين — مسارٌ مهني يجمع بين إتقان السوروبان ومهارات التدريس للأطفال.",
      en: "Join the trainer development program — a professional path combining Soroban mastery with child-teaching skills.",
    },
  },
  whoFor: {
    title: { ar: "لمن هذا المسار؟", en: "Who is this path for?" },
    items: [
      { title: { ar: "المعلّمون", en: "Teachers" }, description: { ar: "معلمون يرغبون في توسيع مهاراتهم.", en: "Teachers wanting to expand their skills." } },
      { title: { ar: "الخريجون", en: "Graduates" }, description: { ar: "خريجو جامعاتٍ يبحثون عن مسارٍ مهني.", en: "University graduates seeking a career path." } },
      { title: { ar: "المتطوّعون", en: "Volunteers" }, description: { ar: "شغوفون بتعليم الأطفال.", en: "Those passionate about teaching children." } },
    ],
  },
  curriculum: {
    title: { ar: "ماذا ستتعلّم؟", en: "What you'll learn" },
    items: [
      { title: { ar: "إتقان السوروبان", en: "Soroban mastery" }, description: { ar: "المهارات العملية والنظرية.", en: "Practical and theoretical skills." } },
      { title: { ar: "منهجية التدريس", en: "Teaching methodology" }, description: { ar: "كيف تُدرّس الأطفال بفعالية.", en: "How to teach children effectively." } },
      { title: { ar: "إدارة الفصل", en: "Classroom management" }, description: { ar: "تقنيات إدارة مجموعات الأطفال.", en: "Techniques for managing children's groups." } },
      { title: { ar: "تقييم التقدّم", en: "Progress assessment" }, description: { ar: "كيف تقيس تقدّم الطالب.", en: "How to measure student progress." } },
      { title: { ar: "حماية الطفل", en: "Child protection" }, description: { ar: "معايير سلامة الطفل.", en: "Child safety standards." } },
      { title: { ar: "التواصل مع الأهل", en: "Parent communication" }, description: { ar: "مهارات التواصل مع الأولياء.", en: "Communication skills with parents." } },
    ],
  },
  stages: {
    title: { ar: "مراحل التدريب", en: "Training stages" },
    steps: [
      { number: "1", title: { ar: "القبول والمقابلة", en: "Admission & interview" }, description: { ar: "تقييم القبول الأولي.", en: "Initial admission assessment." } },
      { number: "2", title: { ar: "التدريب الأساسي", en: "Foundation training" }, description: { ar: "إتقان السوروبان والمنهجية.", en: "Mastering Soroban and methodology." } },
      { number: "3", title: { ar: "التمرين العملي", en: "Practical training" }, description: { ar: "تدريسٌ تحت إشراف مدرّبٍ متمرّس.", en: "Teaching under a senior trainer's supervision." } },
      { number: "4", title: { ar: "الاعتماد", en: "Certification" }, description: { ar: "اعتمادٌ كمدرّبٍ في البرنامج.", en: "Certification as a program trainer." } },
    ],
  },
  benefits: {
    title: { ar: "الفوائد", en: "Benefits" },
    items: [
      { title: { ar: "مسارٌ مهني", en: "Career path" }, description: { ar: "فرصة عملٍ في فروع البرنامج.", en: "Employment opportunity at program branches." } },
      { title: { ar: "تطويرٌ مستمر", en: "Continuous development" }, description: { ar: "تدريبٌ دوري وتطوير مهاري.", en: "Regular training and skill development." } },
      { title: { ar: "أثرٌ مجتمعي", en: "Community impact" }, description: { ar: "مساهمة في بناء جيلٍ مثقّف.", en: "Contributing to building an educated generation." } },
    ],
  },
  faq: {
    title: { ar: "أسئلة شائعة", en: "FAQ" },
    items: [
      { q: { ar: "هل أحتاج خبرةً سابقة؟", en: "Do I need prior experience?" }, a: { ar: "لا، التدريب يبدأ من الأساس.", en: "No, training starts from the basics." } },
      { q: { ar: "كم تستغرق مدة التدريب؟", en: "How long is the training?" }, a: { ar: "عدة أشهر حسب المستوى.", en: "Several months depending on level." } },
      { q: { ar: "هل يُضمَن التوظيف؟", en: "Is employment guaranteed?" }, a: { ar: "لا ضمان، لكن الفرص متاحة للمتميّزين.", en: "No guarantee, but opportunities exist for outstanding trainees." } },
    ],
  },
  form: {
    title: { ar: "طلب الانضمام", en: "Application" },
    name: { ar: "الاسم الكامل", en: "Full name" },
    phone: { ar: "الهاتف", en: "Phone" },
    email: { ar: "البريد الإلكتروني", en: "Email" },
    qualification: { ar: "المؤهل", en: "Qualification" },
    experience: { ar: "خبرات سابقة", en: "Previous experience" },
    message: { ar: "لماذا تريد الانضمام؟", en: "Why do you want to join?" },
    submit: { ar: "إرسال الطلب", en: "Submit application" },
  },
} as const;
