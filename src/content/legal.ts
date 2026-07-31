/** Legal page content — privacy, child protection, terms. Draft/prototype status. */

export const legalContent = {
  hero: {
    eyebrow: { ar: "الخصوصية والشروط", en: "Privacy & terms" },
    title: { ar: "سياسة الخصوصية وحماية الطفل والشروط", en: "Privacy policy, child protection, and terms" },
    subtitle: {
      ar: "هذه مسوّدةٌ للنموذج الأولي — النص القانوني النهائي يتطلب مراجعة العميل ومستشارٍ قانوني.",
      en: "This is a prototype draft — the final legal text requires client and legal-counsel review.",
    },
  },
  lastUpdated: { ar: "آخر تحديث: يونيو 2026", en: "Last updated: June 2026" },
  draftNotice: {
    ar: "هذه الوثيقة مسوّدةٌ تجريبية للموقع النموذجي وليست نصاً قانونياً نهائياً.",
    en: "This document is a prototype draft and not final legal text.",
  },
  sections: [
    {
      id: "privacy-overview",
      title: { ar: "نظرة عامة على الخصوصية", en: "Privacy overview" },
      body: { ar: "نحترم خصوصية الأطفال وأوليائهم. نجمع الحد الأدنى من البيانات اللازمة لتقديم خدماتنا التعليمية.", en: "We respect the privacy of children and their parents. We collect the minimum data necessary to provide our educational services." },
    },
    {
      id: "data-categories",
      title: { ar: "فئات البيانات", en: "Data categories" },
      body: { ar: "بيانات ولي الأمر (الاسم، الهاتف، البريد)، بيانات الطفل (الاسم، العمر)، بيانات التسجيل والتفضيلات.", en: "Parent data (name, phone, email), child data (name, age), registration and preference data." },
    },
    {
      id: "children-data",
      title: { ar: "حماية بيانات الأطفال", en: "Children's data protection" },
      body: { ar: "نلتزم بحماية بيانات الأطفال: لا ننشرها، لا نشاركها مع أطرافٍ ثالثة دون إذن، ونحتفظ بها فقط للمدة اللازمة.", en: "We are committed to protecting children's data: we do not publish it, do not share it with third parties without permission, and retain it only for the necessary period." },
    },
    {
      id: "parent-role",
      title: { ar: "دور ولي الأمر", en: "Parent/guardian role" },
      body: { ar: "يحتاج ولي الأمر إلى الموافقة على تسجيل الطفل والاطلاع على بياناته.", en: "A parent/guardian must consent to the child's enrollment and may access their data." },
    },
    {
      id: "safeguarding",
      title: { ar: "مبادئ حماية الطفل", en: "Safeguarding principles" },
      body: { ar: "نلتزم بمعايير حماية الطفل: إجراءات استقبالٍ آمنة، إشرافٌ مستمر، تدريبٌ دوري للمدرّبين، قنوات بلاغٍ مفتوحة.", en: "We adhere to child-protection standards: safe reception, continuous supervision, regular trainer training, open reporting channels." },
    },
    {
      id: "forms",
      title: { ar: "النماذج والتواصل", en: "Forms and communication" },
      body: { ar: "النماذج في هذا الموقع تجريبية — لا تُرسَل البيانات ولا تُحفَظ. التواصل الفعلي يتم عبر القنوات الرسمية.", en: "Forms on this site are prototype — no data is sent or stored. Real communication occurs through official channels." },
    },
    {
      id: "retention",
      title: { ar: "الاحتفاظ بالبيانات", en: "Data retention" },
      body: { ar: "تُحتفظ بيانات التسجيل للمدة اللازمة لتقديم الخدمة، ثم تُحذف وفق سياسةٍ موثّقة.", en: "Registration data is retained for the period necessary to provide the service, then deleted per a documented policy." },
    },
    {
      id: "rights",
      title: { ar: "حقوق المستخدم", en: "User rights" },
      body: { ar: "يحق لولي الأمر الاطلاع على بيانات طفله، تصحيحها، أو طلب حذفها.", en: "A parent/guardian has the right to access, correct, or request deletion of their child's data." },
    },
    {
      id: "terms",
      title: { ar: "شروط الاستخدام", en: "Terms of use" },
      body: { ar: "استخدام هذا الموقع يعني قبول هذه الشروط. المحتوى تعليميٌّ تجريبي ولا يُقدّم نصيحةً قانونية أو طبية.", en: "Using this site implies acceptance of these terms. Content is educational and prototype; it does not constitute legal or medical advice." },
    },
    {
      id: "contact",
      title: { ar: "تواصل بشأن الأسئلة", en: "Contact for questions" },
      body: { ar: "للأسئلة المتعلقة بالخصوصية أو حماية الطفل، تواصل معنا عبر صفحة التواصل.", en: "For privacy or child-protection questions, contact us via the contact page." },
    },
  ],
} as const;
