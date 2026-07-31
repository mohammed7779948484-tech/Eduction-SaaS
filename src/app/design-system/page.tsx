import type { Metadata } from "next";
import { DesignSystemShowcase } from "@/components/sections/design-system-showcase";

export const metadata: Metadata = {
  title: "نظام التصميم",
  description: "مرجع نظام التصميم الداخلي — عقد التنفيذ للصفحات المستقبلية.",
  robots: { index: false, follow: false },
};

export default function DesignSystemPage() {
  return <DesignSystemShowcase />;
}
