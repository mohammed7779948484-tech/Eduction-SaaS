"use client";

import { Button } from "@/components/ui/button";
import { PageContainer } from "./page-container";
import { useLanguage } from "./language-provider";
import { finalCta } from "@/content/home";

/** Final conversion CTA — orange banner, abacus-bead motifs, single conversion action. */
export function CTASection() {
  const { lang } = useLanguage();
  return (
    <section className="py-16 sm:py-20" aria-label={lang === "ar" ? "دعوة لحجز حصة تجريبية" : "Book a trial lesson"}>
      <PageContainer>
        <div className="relative overflow-hidden rounded-2xl bg-cta px-6 py-12 sm:px-12 sm:py-16 text-center shadow-lg ring-1 ring-brand-navy-dark/10">
          <DecorativeBeads />
          {/* abacus rail motif across the top */}
          <div className="absolute top-0 inset-x-0 flex justify-center gap-1.5 pt-3" aria-hidden>
            {Array.from({ length: 9 }).map((_, i) => (
              <span
                key={i}
                className={i === 4 ? "size-2 rounded-full bg-brand-navy" : "size-1.5 rounded-full bg-brand-navy/40"}
              />
            ))}
          </div>
          <div className="relative space-y-4">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-cta-foreground leading-tight text-balance">
              {finalCta.title[lang]}
            </h2>
            <p className="text-base sm:text-lg text-cta-foreground/80 max-w-2xl mx-auto text-pretty">
              {finalCta.subtitle[lang]}
            </p>
            <div className="pt-2">
              <Button asChild variant="default" size="xl" className="bg-primary text-primary-foreground hover:bg-brand-navy-dark shadow-md">
                <a href="/register">{finalCta.cta[lang]}</a>
              </Button>
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}

function DecorativeBeads() {
  return (
    <div className="absolute inset-0 opacity-15 pointer-events-none" aria-hidden>
      <svg className="absolute -top-8 -start-8" width="140" height="140" viewBox="0 0 140 140" fill="none">
        <circle cx="24" cy="24" r="10" fill="var(--brand-navy)" />
        <circle cx="58" cy="48" r="7" fill="var(--brand-navy)" />
        <circle cx="36" cy="82" r="6" fill="var(--brand-navy)" />
      </svg>
      <svg className="absolute -bottom-8 -end-8" width="160" height="160" viewBox="0 0 160 160" fill="none">
        <circle cx="136" cy="136" r="11" fill="var(--brand-navy)" />
        <circle cx="100" cy="108" r="7" fill="var(--brand-navy)" />
        <circle cx="128" cy="68" r="6" fill="var(--brand-navy)" />
      </svg>
    </div>
  );
}
