/**
 * Route definitions. All routes now enabled (Phase 2 complete).
 */

export interface RouteDef {
  href: string;
  label: { ar: string; en: string };
  enabled: boolean;
}

export const routes = {
  home: "/",
  designSystem: "/design-system",
} as const;

export const navItems: RouteDef[] = [
  { href: "/", label: { ar: "الرئيسية", en: "Home" }, enabled: true },
  { href: "/about", label: { ar: "من نحن", en: "About" }, enabled: true },
  { href: "/program", label: { ar: "البرنامج", en: "Program" }, enabled: true },
  { href: "/channels", label: { ar: "القنوات", en: "Channels" }, enabled: true },
  { href: "/contact", label: { ar: "تواصل معنا", en: "Contact" }, enabled: true },
];

// Secondary nav (footer / mobile menu)
export const secondaryNavItems: RouteDef[] = [
  { href: "/platform", label: { ar: "المنصّة الافتراضية", en: "Virtual Platform" }, enabled: true },
  { href: "/schools", label: { ar: "المدارس والمؤسسات", en: "Schools" }, enabled: true },
  { href: "/trainers", label: { ar: "تدريب المدربين", en: "Trainers" }, enabled: true },
  { href: "/faq", label: { ar: "الأسئلة الشائعة", en: "FAQ" }, enabled: true },
  { href: "/privacy", label: { ar: "الخصوصية والشروط", en: "Privacy & Terms" }, enabled: true },
];
