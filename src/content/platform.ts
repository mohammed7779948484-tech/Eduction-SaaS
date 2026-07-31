/** Virtual Platform page content — Phase 2 vision, clearly conceptual. */

export const platformContent = {
  hero: {
    eyebrow: { ar: "المنصّة الافتراضية", en: "Virtual platform" },
    title: { ar: "منصّة تعليمية تفاعلية — قريباً", en: "An interactive educational platform — coming soon" },
    subtitle: {
      ar: "نعمل على منصّةٍ رقميةٍ تجعل تعلّم الحساب الذهني متاحاً لكل طفلٍ في اليمن، أينما كان. هذه صفحةٌ تصوّرية للمستقبل — ليست منصّةً جاهزة.",
      en: "We are working on a digital platform to make mental-arithmetic learning accessible to every child in Yemen, wherever they are. This is a conceptual page for the future — not a live platform.",
    },
  },
  vision: {
    title: { ar: "رؤيتنا للمنصّة", en: "Our vision for the platform" },
    body: {
      ar: "منصّةٌ تعليمية متكاملة تربط الطفل والأهل والمدرّب في فضاءٍ رقميٍّ آمن، مع تمارين تفاعلية وتتبّعٍ للتقدّم ومكتبة دروسٍ غنية.",
      en: "An integrated educational platform connecting the child, parents, and trainer in a safe digital space, with interactive exercises, progress tracking, and a rich lesson library.",
    },
  },
  features: [
    {
      title: { ar: "تجربة الطالب", en: "Student experience" },
      description: { ar: "حصصٌ تفاعلية، تمارينٌ ممتعة، شاراتٌ وتحديات.", en: "Interactive lessons, fun exercises, badges and challenges." },
    },
    {
      title: { ar: "بوابة الأهل", en: "Parent portal" },
      description: { ar: "متابعة تقدّم الطفل، تقارير دورية، تواصلٌ مع المدرّب.", en: "Track child's progress, periodic reports, trainer communication." },
    },
    {
      title: { ar: "التمارين والتدريبات", en: "Exercises and drills" },
      description: { ar: "تمارينٌ متدرّجة، تكيّفٌ مع مستوى الطفل.", en: "Graded exercises adapting to the child's level." },
    },
    {
      title: { ar: "تتبّع التقدّم", en: "Progress tracking" },
      description: { ar: "لوحةٌ بصرية تعرض رحلة الطفل عبر المستويات.", en: "A visual dashboard showing the child's journey across levels." },
    },
    {
      title: { ar: "الفصول الافتراضية", en: "Virtual classes" },
      description: { ar: "حصصٌ مباشرة مع المدرّب عبر الفيديو.", en: "Live sessions with the trainer via video." },
    },
    {
      title: { ar: "مكتبة الدروس", en: "Lesson library" },
      description: { ar: "دروسٌ مسجّلة يمكن مراجعتها في أي وقت.", en: "Recorded lessons available for review anytime." },
    },
  ],
  safety: {
    title: { ar: "السلامة والخصوصية", en: "Safety and privacy" },
    body: {
      ar: "ستُبنى المنصّة على مبادئ حماية الطفل: بياناتٌ محدودة، إشرافٌ أبوي، محتوىً آمن، وامتثالٌ لمتطلبات حماية بيانات الأطفال.",
      en: "The platform will be built on child-protection principles: minimal data, parental supervision, safe content, and compliance with children's data protection requirements.",
    },
  },
  interestForm: {
    title: { ar: "سجّل اهتمامك", en: "Register your interest" },
    body: { ar: "أخبرنا ببريدك الإلكتروني لنُعلمك عند إطلاق المنصّة.", en: "Tell us your email and we'll notify you when the platform launches." },
  },
} as const;
