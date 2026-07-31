/**
 * Route definitions. Future pages are marked `enabled: false` and rendered as
 * "coming soon" states — never broken links (master task §20).
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
  { href: "/about", label: { ar: "من نحن", en: "About" }, enabled: false },
  { href: "/program", label: { ar: "البرنامج", en: "Program" }, enabled: false },
  { href: "/channels", label: { ar: "القنوات", en: "Channels" }, enabled: false },
  { href: "/contact", label: { ar: "تواصل معنا", en: "Contact" }, enabled: false },
];

// /register is a coming-soon placeholder route (src/app/register/page.tsx);
// all conversion CTAs link there.
