"use client";

import { cn } from "@/lib/utils";
import { useLanguage } from "@/components/layout/language-provider";

interface Bilingual { ar: string; en: string }

interface SectionHeadingProps {
  title: Bilingual | string;
  subtitle?: Bilingual | string;
  eyebrow?: Bilingual | string;
  align?: "start" | "center";
  tone?: "dark" | "light";
  className?: string;
  as?: "h2" | "h3";
}

/** Shared section heading with eyebrow + title + subtitle. Accepts bilingual {ar,en} or plain strings. */
export function SectionHeading({
  title,
  subtitle,
  eyebrow,
  align = "center",
  tone = "dark",
  className,
  as: Tag = "h2",
}: SectionHeadingProps) {
  const { lang } = useLanguage();
  const titleStr = typeof title === "string" ? title : title[lang];
  const subStr = subtitle ? (typeof subtitle === "string" ? subtitle : subtitle[lang]) : undefined;
  const eyebrowStr = eyebrow ? (typeof eyebrow === "string" ? eyebrow : eyebrow[lang]) : undefined;

  const titleColor = tone === "light" ? "text-white" : "text-primary";
  const subColor = tone === "light" ? "text-white/80" : "text-muted-foreground";
  const eyebrowColor = tone === "light" ? "text-brand-teal-pale" : "text-brand-teal-strong";

  return (
    <div
      className={cn(
        "flex flex-col gap-2",
        align === "center" ? "items-center text-center" : "items-start text-start",
        className
      )}
    >
      {eyebrowStr && (
        <span className={cn("text-sm font-bold tracking-wide", eyebrowColor)}>
          {eyebrowStr}
        </span>
      )}
      <Tag className={cn("text-2xl sm:text-3xl font-extrabold leading-tight text-balance", titleColor)}>
        {titleStr}
      </Tag>
      {subStr && (
        <p className={cn("text-base sm:text-lg max-w-2xl text-pretty", subColor)}>
          {subStr}
        </p>
      )}
    </div>
  );
}
