"use client";

import { useLanguage } from "@/components/layout/language-provider";
import { cn } from "@/lib/utils";

interface TocItem {
  id: string;
  label: { ar: string; en: string };
}

interface TableOfContentsProps {
  items: TocItem[];
  className?: string;
}

/** TableOfContents — sticky legal/long-page navigation. */
export function TableOfContents({ items, className }: TableOfContentsProps) {
  const { lang } = useLanguage();
  return (
    <nav aria-label={lang === "ar" ? "جدول المحتويات" : "Table of contents"} className={cn("space-y-1", className)}>
      <p className="text-sm font-bold text-primary mb-3">{lang === "ar" ? "في هذه الصفحة" : "On this page"}</p>
      <ul className="space-y-1.5">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="block text-sm text-muted-foreground hover:text-brand-teal-strong transition-colors py-1 ps-3 border-s-2 border-transparent hover:border-accent"
            >
              {item.label[lang]}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
