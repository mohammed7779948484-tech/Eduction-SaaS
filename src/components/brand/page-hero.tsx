"use client";

import { cn } from "@/lib/utils";
import { useLanguage } from "@/components/layout/language-provider";

interface PageHeroProps {
  eyebrow?: { ar: string; en: string };
  title: { ar: string; en: string };
  subtitle?: { ar: string; en: string };
  /** Visual tone. */
  tone?: "navy" | "tint" | "default";
  className?: string;
  children?: React.ReactNode;
}

/**
 * PageHero — reusable page header for all interior pages.
 * Navy tone for institutional pages; tint for lighter pages; default for minimal.
 * Reuses brand tokens, RailDivider motif, abacus-bead accent.
 */
export function PageHero({ eyebrow, title, subtitle, tone = "navy", className, children }: PageHeroProps) {
  const { lang } = useLanguage();
  const isNavy = tone === "navy";
  const isTint = tone === "tint";

  return (
    <section
      className={cn(
        "relative overflow-hidden",
        isNavy ? "bg-primary text-primary-foreground" : isTint ? "bg-brand-teal-pale/40" : "bg-background",
        "py-12 sm:py-16 lg:py-20",
        className
      )}
    >
      {/* abacus rail motif at top */}
      {isNavy && (
        <div className="absolute top-0 inset-x-0 flex justify-center gap-2 pt-3" aria-hidden>
          {Array.from({ length: 9 }).map((_, i) => (
            <span key={i} className={i === 4 ? "size-2 rounded-full bg-brand-teal" : "size-1.5 rounded-full bg-brand-teal/30"} />
          ))}
        </div>
      )}
      {/* subtle glow for navy */}
      {isNavy && <div className="absolute -top-20 -end-20 size-64 rounded-full bg-brand-teal/15 blur-3xl" aria-hidden />}

      <div className="relative mx-auto w-full max-w-[1320px] px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          {eyebrow && (
            <span className={cn(
              "inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-bold",
              isNavy ? "bg-white/10 text-brand-teal-pale ring-1 ring-white/10" : "bg-secondary text-primary"
            )}>
              <span className="size-1.5 rounded-full bg-accent" />
              {eyebrow[lang]}
            </span>
          )}
          <h1 className={cn(
            "text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-balance",
            isNavy ? "text-white" : "text-primary"
          )}>
            {title[lang]}
          </h1>
          {subtitle && (
            <p className={cn(
              "text-base sm:text-lg max-w-2xl text-pretty leading-relaxed",
              isNavy ? "text-white/80" : "text-muted-foreground"
            )}>
              {subtitle[lang]}
            </p>
          )}
          {children}
        </div>
      </div>
    </section>
  );
}
