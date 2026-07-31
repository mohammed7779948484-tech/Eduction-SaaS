/** Learning Channels page content — three channels: centers, schools, online. */

export const channelsContent = {
  hero: {
    eyebrow: { ar: "قنوات التعلّم", en: "Learning channels" },
    title: { ar: "ثلاث قنوات تعليمية تناسب كل أسرة", en: "Three learning channels to suit every family" },
    subtitle: {
      ar: "في مراكزنا، أو في المدارس الشريكة، أو على المنصّة الرقمية (قريباً). اختر القناة الأنسب لطفلك وظروفك.",
      en: "At our centers, in partner schools, or on the digital platform (coming soon). Choose the channel that best fits your child and circumstances.",
    },
  },
  channels: [
    {
      variant: "navy" as const,
      title: { ar: "في مراكزنا", en: "At our centers" },
      description: {
        ar: "حصصٌ حضورية في فروعنا المجهّزة بإشراف مدرّبين متخصّصين، في بيئةٍ تعليمية مصمّمة خصيصاً للأطفال.",
        en: "In-person lessons at our equipped branches with specialist trainers, in a learning environment designed for children.",
      },
      whoFor: { ar: "للأسر التي تفضّل التعلّم الحضوري في مركزٍ متخصّص.", en: "For families who prefer in-person learning at a specialized center." },
      experience: { ar: "جلساتٌ منظّمة، مجموعات صغيرة، أدواتٌ تعليمية ملموسة.", en: "Structured sessions, small groups, tangible learning tools." },
      cta: { ar: "احجز حصة تجريبية", en: "Book a trial lesson" },
      href: "/register",
    },
    {
      variant: "blue" as const,
      title: { ar: "في المدارس الشريكة", en: "In partner schools" },
      description: {
        ar: "برنامجٌ مدمج ضمن اليوم الدراسي في المدارس الشريكة، يصل إلى الطفل في بيئته المدرسية.",
        en: "A program integrated into the school day at partner schools, reaching the child in their school environment.",
      },
      whoFor: { ar: "للمدارس التي تريد إثراء مناهجها بالحساب الذهني.", en: "For schools that want to enrich their curriculum with mental arithmetic." },
      experience: { ar: "حصصٌ ضمن الجدول المدرسي، إشرافٌ مشترك بين المدرسة والبرنامج.", en: "Sessions within the school schedule, joint supervision between school and program." },
      cta: { ar: "شراكة المدارس", en: "School partnership" },
      href: "/schools",
    },
    {
      variant: "teal" as const,
      title: { ar: "المنصّة الرقمية", en: "Digital platform" },
      description: {
        ar: "تعلّمٌ أونلاين تفاعلي عبر المنصّة التعليمية — قريباً. سجّل اهتمامك ليصلك الإطلاق.",
        en: "Interactive online learning via the educational platform — coming soon. Register your interest to be notified at launch.",
      },
      whoFor: { ar: "للأسر التي تفضّل التعلّم من المنزل أو البعيدة عن المراكز.", en: "For families who prefer learning from home or are far from centers." },
      experience: { ar: "حصصٌ افتراضية، تمارين تفاعلية، تتبّع التقدّم (مفاهيم).", en: "Virtual sessions, interactive exercises, progress tracking (concepts)." },
      cta: { ar: "سجّل اهتمامك", en: "Register interest" },
      href: "/platform",
    },
  ],
  comparison: {
    title: { ar: "مقارنة القنوات", en: "Channel comparison" },
    rows: [
      { feature: { ar: "مكان التعلّم", en: "Location" }, center: { ar: "في المركز", en: "At center" }, school: { ar: "في المدرسة", en: "At school" }, online: { ar: "من المنزل", en: "From home" } },
      { feature: { ar: "الإشراف", en: "Supervision" }, center: { ar: "مدرّب مباشر", en: "Direct trainer" }, school: { ar: "مدرّب + مدرسة", en: "Trainer + school" }, online: { ar: "افتراضي", en: "Virtual" } },
      { feature: { ar: "المجموعة", en: "Group size" }, center: { ar: "صغيرة", en: "Small" }, school: { ar: "صفٌ دراسي", en: "Class" }, online: { ar: "فردي/مجموعة", en: "Individual/group" } },
      { feature: { ar: "الجدولة", en: "Schedule" }, center: { ar: "مرن", en: "Flexible" }, school: { ar: "ضمن اليوم", en: "During day" }, online: { ar: "مرن", en: "Flexible" } },
      { feature: { ar: "الحالة", en: "Status" }, center: { ar: "متاح", en: "Available" }, school: { ar: "متاح", en: "Available" }, online: { ar: "قريباً", en: "Coming soon" } },
    ],
  },
  selectionGuide: {
    title: { ar: "كيف تختار القناة المناسبة؟", en: "How to choose the right channel?" },
    body: {
      ar: "اختر القناة بناءً على عمر طفلك، قربه من المراكز، جدول الأسرة، وتفضيلك للتعلّم الحضوري أو الرقمي. الحصة التجريبية تساعدك على التجربة قبل الالتزام.",
      en: "Choose based on your child's age, proximity to centers, family schedule, and preference for in-person or digital learning. The trial lesson helps you experience before committing.",
    },
  },
} as const;
