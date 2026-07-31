import type { Metadata } from "next";

const titles: Record<string, { title: string; description: string }> = {
  register: { title: "التسجيل والحصة التجريبية", description: "احجز حصةً تجريبيةً مجانية أو سجّل طفلك في برنامج الحساب الذهني." },
  contact: { title: "تواصل معنا", description: "تواصل معنا عبر الواتساب أو الهاتف أو البريد، أو زُر أحد فروعنا." },
  schools: { title: "المدارس والمؤسسات", description: "شارك معنا في دمج برنامج الحساب الذهني في مناهج مدرستك." },
  trainers: { title: "تدريب المدربين", description: "انضم إلى برنامج تطوير المدربين في الحساب الذهني." },
  faq: { title: "الأسئلة الشائعة", description: "إجاباتٌ لأسئلتكم حول برنامج الحساب الذهني." },
};

export const metadata: Metadata = titles["register"];

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
