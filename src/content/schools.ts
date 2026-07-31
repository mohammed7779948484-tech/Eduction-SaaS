/** Schools page content — B2B partnership proposition. */

export const schoolsContent = {
  hero: {
    eyebrow: { ar: "المدارس والمؤسسات", en: "Schools & institutions" },
    title: { ar: "شارك معنا في بناء جيلٍ واثقٍ ومبدع", en: "Partner with us to build a confident, creative generation" },
    subtitle: {
      ar: "ادمج برنامج الحساب الذهني في مناهج مدرستك — منهجٌ جاهز، مدرّبون مؤهّلون، نتائجُ ملموسة.",
      en: "Integrate the mental-arithmetic program into your school's curriculum — a ready curriculum, qualified trainers, tangible results.",
    },
  },
  whyPartner: {
    title: { ar: "لماذا تشارك المدارس؟", en: "Why do schools partner?" },
    items: [
      { title: { ar: "إثراء المنهج", en: "Curriculum enrichment" }, description: { ar: "إضافة قيمةٍ تعليميةٍ مميّزة لمدرستك.", en: "Adding distinctive educational value to your school." } },
      { title: { ar: "تميّز تنافسي", en: "Competitive distinction" }, description: { ar: "عامل جذبٍ للأهالي الباحثين عن الأفضل.", en: "A draw for parents seeking the best." } },
      { title: { ar: "بدون عبءٍ إداري", en: "No administrative burden" }, description: { ar: "نتولّى التدريس والتقييم والإشراف.", en: "We handle teaching, assessment, and supervision." } },
      { title: { ar: "نتائج قابلة للقياس", en: "Measurable results" }, description: { ar: "تقارير دورية عن تقدّم الطلاب.", en: "Periodic reports on student progress." } },
    ],
  },
  deliveryModels: {
    title: { ar: "نماذج التقديم", en: "Delivery models" },
    items: [
      { title: { ar: "ضمن اليوم الدراسي", en: "During school day" }, description: { ar: "حصصٌ مدمجة في الجدول المدرسي.", en: "Sessions integrated into the school schedule." } },
      { title: { ar: "بعد الدوام", en: "After school" }, description: { ar: "حصصٌ اختيارية بعد انتهاء الدوام.", en: "Optional sessions after school hours." } },
      { title: { ar: "نشاطٌ أسبوعي", en: "Weekly activity" }, description: { ar: "نشاطٌ مدرسي أسبوعي مميّز.", en: "A distinctive weekly school activity." } },
    ],
  },
  benefits: {
    title: { ar: "الفوائد", en: "Benefits" },
    schoolBenefits: {
      title: { ar: "للمدرسة", en: "For the school" },
      items: [{ ar: "تميّزٌ في السوق التعليمي", en: "Market distinction" }, { ar: "رضا الأهالي", en: "Parent satisfaction" }, { ar: "لا تكاليف تدريس", en: "No teaching costs" }],
    },
    studentBenefits: {
      title: { ar: "للطالب", en: "For the student" },
      items: [{ ar: "تركيزٌ أعمق", en: "Deeper focus" }, { ar: "ثقةٌ بالنفس", en: "Self-confidence" }, { ar: "مهاراتٌ ذهنية", en: "Mental skills" }],
    },
  },
  process: {
    title: { ar: "خطوات الشراكة", en: "Partnership steps" },
    steps: [
      { number: "1", title: { ar: "التواصل الأولي", en: "Initial contact" }, description: { ar: "نناقش احتياجات مدرستك.", en: "We discuss your school's needs." } },
      { number: "2", title: { ar: "عرضٌ مخصّص", en: "Custom proposal" }, description: { ar: "نقدّم نموذجاً يناسب جدولكم.", en: "We present a model that fits your schedule." } },
      { number: "3", title: { ar: "التجربة", en: "Trial" }, description: { ar: "حصةٌ تجريبية في المدرسة.", en: "A trial lesson at the school." } },
      { number: "4", title: { ar: "الشراكة الكاملة", en: "Full partnership" }, description: { ar: "توقيع الاتفاقية والانطلاق.", en: "Sign agreement and launch." } },
    ],
  },
  faq: {
    title: { ar: "أسئلة شراكة المدارس", en: "School partnership FAQ" },
    items: [
      { q: { ar: "هل يتحمل المدرسة تكاليف التدريس؟", en: "Does the school bear teaching costs?" }, a: { ar: "لا، نتولّى التدريس والإشراف.", en: "No, we handle teaching and supervision." } },
      { q: { ar: "كم تستغرق الحصة؟", en: "How long is a session?" }, a: { ar: "45–60 دقيقة.", en: "45–60 minutes." } },
      { q: { ar: "هل تقدمون التقارير؟", en: "Do you provide reports?" }, a: { ar: "نعم، تقارير دورية.", en: "Yes, periodic reports." } },
    ],
  },
  form: {
    title: { ar: "طلب شراكة", en: "Partnership request" },
    schoolName: { ar: "اسم المدرسة", en: "School name" },
    contactPerson: { ar: "مسؤول التواصل", en: "Contact person" },
    phone: { ar: "الهاتف", en: "Phone" },
    email: { ar: "البريد الإلكتروني", en: "Email" },
    students: { ar: "عدد الطلاب المتوقّع", en: "Expected student count" },
    message: { ar: "ملاحظات", en: "Notes" },
    submit: { ar: "إرسال الطلب", en: "Submit request" },
  },
} as const;
