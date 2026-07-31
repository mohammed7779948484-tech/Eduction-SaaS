"use client";

import { useLanguage } from "@/components/layout/language-provider";
import { cn } from "@/lib/utils";

interface ComparisonRow {
  feature: { ar: string; en: string };
  center: { ar: string; en: string };
  school: { ar: string; en: string };
  online: { ar: string; en: string };
}

interface ComparisonTableProps {
  rows: readonly ComparisonRow[];
  className?: string;
}

/** ComparisonTable — channels page comparison matrix. */
export function ComparisonTable({ rows, className }: ComparisonTableProps) {
  const { lang } = useLanguage();
  return (
    <div className={cn("overflow-x-auto scroll-thin", className)}>
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b-2 border-border">
            <th className="text-start py-3 px-4 font-bold text-primary">{lang === "ar" ? "المعيار" : "Feature"}</th>
            <th className="text-center py-3 px-4 font-bold text-brand-navy">{lang === "ar" ? "في المراكز" : "Centers"}</th>
            <th className="text-center py-3 px-4 font-bold text-brand-navy">{lang === "ar" ? "المدارس" : "Schools"}</th>
            <th className="text-center py-3 px-4 font-bold text-brand-teal-strong">{lang === "ar" ? "أونلاين" : "Online"}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-border hover:bg-secondary/30 transition-colors">
              <td className="py-3 px-4 font-medium text-foreground">{row.feature[lang]}</td>
              <td className="py-3 px-4 text-center text-muted-foreground">{row.center[lang]}</td>
              <td className="py-3 px-4 text-center text-muted-foreground">{row.school[lang]}</td>
              <td className="py-3 px-4 text-center text-muted-foreground">{row.online[lang]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
