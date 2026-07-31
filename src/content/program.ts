/** Program page content — Soroban method, 10 levels, ages, outcomes. */

export const programContent = {
  hero: {
    eyebrow: { ar: "البرنامج", en: "The program" },
    title: { ar: "طريقة السوروبان — منهجٌ متدرّجٌ من 10 مستويات", en: "The Soroban method — a graded 10-level curriculum" },
    subtitle: {
      ar: "تعلّم الحساب الذهني عبر السوروبان يبدأ باللمس وينتهي بالسرعة الذهنية. عشرة مستويات متدرّجة تناسب الأطفال من 7 إلى 12 عاماً.",
      en: "Learning mental arithmetic through the Soroban starts with touch and ends with mental speed. Ten graded levels suited to children aged 7 to 12.",
    },
  },
  whatIs: {
    title: { ar: "ما الحساب الذهني؟", en: "What is mental arithmetic?" },
    body: {
      ar: "الحساب الذهني قدرةٌ على إجراء العمليات الحسابية ذهنياً دون أداةٍ مرئية. يبدأ تدريبها على السوروبان ثم ينتقل الطفل تدريجياً إلى تصوّر الخرزات ذهنياً وحسابها بسرعة.",
      en: "Mental arithmetic is the ability to perform calculations mentally without a visible tool. Training begins on the Soroban, then the child gradually moves to visualizing beads mentally and calculating rapidly.",
    },
  },
  whatIsSoroban: {
    title: { ar: "ما السوروبان؟", en: "What is the Soroban?" },
    body: {
      ar: "السوروبان أداةٌ حسابية يابانية الأصل تتكوّن من إطارٍ وأعمدة وخرزات. يُعدّ وسيلةً تعليميةً فعّالة لتنمية الحساب الذهني والتركيز والذاكرة لدى الأطفال.",
      en: "The Soroban is a Japanese abacus consisting of a frame, rods, and beads. It is an effective educational tool for developing mental arithmetic, focus, and memory in children.",
    },
  },
  levels: {
    title: { ar: "المستويات العشرة", en: "The ten levels" },
    subtitle: { ar: "تدرّجٌ من الاكتشاف إلى الإتقان.", en: "A progression from discovery to mastery." },
    items: Array.from({ length: 10 }, (_, i) => {
      const level = i + 1;
      const titles = [
        { ar: "الاكتشاف", en: "Discovery" },
        { ar: "اللمس", en: "Touch" },
        { ar: "الربط", en: "Connection" },
        { ar: "الجمع البسيط", en: "Simple addition" },
        { ar: "الطرح", en: "Subtraction" },
        { ar: "الضرب", en: "Multiplication" },
        { ar: "القسمة", en: "Division" },
        { ar: "السرعة", en: "Speed" },
        { ar: "الإتقان", en: "Mastery" },
        { ar: "الإبداع", en: "Creativity" },
      ];
      const descs = [
        { ar: "تعرّفٌ أولي على السوروبان.", en: "Initial introduction to the Soroban." },
        { ar: "حركة الخرزات بالأصابع.", en: "Moving beads with fingers." },
        { ar: "ربط الخرزات بالأرقام.", en: "Connecting beads to numbers." },
        { ar: "جمعٌ بسيط على الأداة.", en: "Simple addition on the tool." },
        { ar: "الطرح على السوروبان.", en: "Subtraction on the Soroban." },
        { ar: "الضرب ذهنياً.", en: "Mental multiplication." },
        { ar: "القسمة ذهنياً.", en: "Mental division." },
        { ar: "زيادة سرعة الحساب.", en: "Increasing calculation speed." },
        { ar: "إتقانٌ شامل للحساب الذهني.", en: "Comprehensive mental-arithmetic mastery." },
        { ar: "تطبيقٌ إبداعي للمهارات.", en: "Creative application of skills." },
      ];
      return { level, title: titles[i], description: descs[i] };
    }),
  },
  ages: {
    title: { ar: "الأعمار المناسبة", en: "Suitable ages" },
    body: {
      ar: "يستهدف البرنامج الأطفال من 7 إلى 12 عاماً — وهي مرحلةٌ ذهنيةٌ مثالية لاكتساب مهارات الحساب الذهني، حيث يكون الدماغ في أوج مرونته وقدرته على بناء المسارات العصبية الجديدة.",
      en: "The program targets children aged 7 to 12 — an ideal mental stage for acquiring mental-arithmetic skills, when the brain is at peak plasticity and ability to build new neural pathways.",
    },
  },
  outcomes: {
    title: { ar: "المهارات والنتائج المتوقّعة", en: "Expected skills and outcomes" },
    subtitle: { ar: "نتائج تعليمية متوقّعة — ليست ضمانات.", en: "Expected educational outcomes — not guarantees." },
    items: [
      { title: { ar: "سرعة الحساب", en: "Calculation speed" }, description: { ar: "قدرة على الحساب الذهني السريع والدقيق.", en: "Ability to calculate mentally with speed and accuracy." } },
      { title: { ar: "التركيز والانتباه", en: "Focus and attention" }, description: { ar: "تحسّن في مدة التركيز وجودته.", en: "Improvement in focus duration and quality." } },
      { title: { ar: "الثقة بالنفس", en: "Self-confidence" }, description: { ar: "ثقةٌ أكبر في القدرات العقلية.", en: "Greater confidence in mental abilities." } },
      { title: { ar: "الذاكرة العاملة", en: "Working memory" }, description: { ar: "تعزّز الذاكرة قصيرة المدى.", en: "Enhanced short-term memory." } },
    ],
  },
  journey: {
    title: { ar: "رحلة التعلّم", en: "The learning journey" },
    steps: [
      { number: "1", title: { ar: "الحصة التجريبية", en: "Trial lesson" }, description: { ar: "يتعرّف الطفل والأسرة على البرنامج.", en: "The child and family experience the program." } },
      { number: "2", title: { ar: "التقييم الأولي", en: "Initial assessment" }, description: { ar: "يُحدَّد المستوى المناسب للطفل.", en: "The appropriate level is determined." } },
      { number: "3", title: { ar: "التدرّب المنتظم", en: "Regular training" }, description: { ar: "حصصٌ أسبوعية مع تمرينٍ منزلي خفيف.", en: "Weekly sessions with light home practice." } },
      { number: "4", title: { ar: "التقدّم عبر المستويات", en: "Level progression" }, description: { ar: "ينتقل الطفل للمستوى التالي عند الإتقان.", en: "The child advances upon mastery." } },
    ],
  },
} as const;
