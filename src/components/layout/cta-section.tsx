"use client";

import { Button } from "@/components/ui/button";
import { PageContainer } from "./page-container";
import { useLanguage } from "./language-provider";
import { finalCta } from "@/content/home";

/** Final conversion CTA — orange banner, single conversion action. */
export function CTASection() {
  const { lang } = useLanguage();
  return (
    <section className="py-16 sm:py-24" aria-label={lang === "ar" ? "دعوة لحجز حصة تجريبية" : "Book a trial lesson"}>
      <PageContainer>
        <div className="relative overflow-hidden rounded-2xl bg-cta px-6 py-12 sm:px-12 sm:py-16 text-center shadow-lg">
          <DecorativeBeads />
          <div className="relative space-y-4">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-cta-foreground leading-tight text-balance">
              {finalCta.title[lang]}
            </h2>
            <p className="text-base sm:text-lg text-cta-foreground/80 max-w-2xl mx-auto text-pretty">
              {finalCta.subtitle[lang]}
            </p>
            <div className="pt-2">
              <Button asChild variant="default" size="xl" className="bg-primary text-primary-foreground hover:bg-brand-navy-dark">
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
    <div className="absolute inset-0 opacity-20 pointer-events-none" aria-hidden>
      <svg className="absolute -top-6 -start-6" width="120" height="120" viewBox="0 0 120 120" fill="none">
        <circle cx="20" cy="20" r="8" fill="var(--brand-navy)" />
        <circle cx="50" cy="40" r="6" fill="var(--brand-navy)" />
        <circle cx="30" cy="70" r="5" fill="var(--brand-navy)" />
      </svg>
      <svg className="absolute -bottom-6 -end-6" width="140" height="140" viewBox="0 0 140 140" fill="none">
        <circle cx="120" cy="120" r="9" fill="var(--brand-navy)" />
        <circle cx="90" cy="95" r="6" fill="var(--brand-navy)" />
        <circle cx="115" cy="60" r="5" fill="var(--brand-navy)" />
      </svg>
    </div>
  );
}
