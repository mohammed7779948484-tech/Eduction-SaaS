"use client";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/layout/language-provider";
import { useHeroTimeline } from "@/lib/gsap/hero-timeline";
import { heroContent } from "@/content/home";

export function Hero() {
  const { lang } = useLanguage();
  const { container } = useHeroTimeline();

  return (
    <section
      ref={container as React.RefObject<HTMLElement>}
      aria-label={lang === "ar" ? "مقدمة" : "Introduction"}
      className="py-8 sm:py-12 lg:py-16"
    >
      <div className="mx-auto w-full max-w-[1320px] px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-12 sm:px-10 sm:py-16 lg:px-16 lg:py-20 shadow-lg ring-1 ring-white/5">
          {/* abacus-rail background grid motif (subtle depth) */}
          <RailGridMotif />
          {/* controlled glow */}
          <div className="absolute -top-24 -end-24 size-72 rounded-full bg-brand-teal/20 blur-3xl" aria-hidden />
          <div className="absolute -bottom-32 -start-16 size-80 rounded-full bg-brand-blue/15 blur-3xl" aria-hidden />

          <div className="relative grid items-center gap-10 lg:grid-cols-2">
            {/* Content (inline-start in RTL) */}
            <div className="order-2 lg:order-1 space-y-6 text-center lg:text-start">
              <span
                data-hero-anim
                data-hero-eyebrow
                className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-bold text-brand-teal-pale ring-1 ring-white/10"
              >
                <span className="size-1.5 rounded-full bg-brand-teal" />
                {heroContent.eyebrow[lang]}
              </span>

              <h1
                data-hero-anim
                data-hero-title
                className="flex flex-col gap-1 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] text-white text-balance"
              >
                <span>{heroContent.title[0][lang]}</span>
                <span className="text-brand-teal">{heroContent.title[1][lang]}</span>
              </h1>

              <p
                data-hero-anim
                data-hero-sub
                className="text-base sm:text-lg text-white/80 max-w-xl mx-auto lg:mx-0 text-pretty leading-relaxed"
              >
                {heroContent.subtitle[lang]}
              </p>

              <div
                data-hero-anim
                data-hero-cta
                className="flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start pt-2"
              >
                <Button asChild variant="cta" size="xl" className="w-full sm:w-auto">
                  <a href="/register">{heroContent.primaryCta[lang]}</a>
                </Button>
                <Button
                  asChild
                  variant="ghost"
                  size="xl"
                  className="w-full sm:w-auto text-white border border-white/30 hover:bg-white/10 hover:text-white"
                >
                  <a href="#how-it-works">{heroContent.secondaryCta[lang]}</a>
                </Button>
              </div>
            </div>

            {/* Visual (inline-end in RTL) */}
            <div
              data-hero-anim
              data-hero-visual
              className="order-1 lg:order-2 flex items-center justify-center"
            >
              <HeroAbacus />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Subtle abacus-rail-inspired background grid — low-opacity vertical rails + numerical ticks. */
function RailGridMotif() {
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden>
      <svg className="absolute inset-0 w-full h-full opacity-[0.06]" preserveAspectRatio="none" viewBox="0 0 100 100">
        {/* vertical rails */}
        {[15, 30, 45, 60, 75, 90].map((x) => (
          <line key={x} x1={x} y1="0" x2={x} y2="100" stroke="white" strokeWidth="0.15" />
        ))}
        {/* horizontal beam */}
        <line x1="0" y1="50" x2="100" y2="50" stroke="white" strokeWidth="0.2" />
      </svg>
    </div>
  );
}

function HeroAbacus() {
  return (
    <div className="relative w-full max-w-md aspect-square">
      {/* soft glow behind the abacus */}
      <div className="absolute inset-8 rounded-full bg-brand-teal/15 blur-2xl" aria-hidden />
      <svg
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative w-full h-full drop-shadow-2xl"
        role="img"
        aria-label="سوروبان — أداة الحساب الذهني"
      >
        {/* frame with inner depth */}
        <rect x="56" y="66" width="288" height="268" rx="22" fill="var(--brand-navy-dark)" />
        <rect x="60" y="70" width="280" height="260" rx="20" fill="none" stroke="var(--brand-teal)" strokeWidth="2.5" />
        <rect x="66" y="76" width="268" height="248" rx="16" fill="none" stroke="var(--brand-teal-pale)" strokeWidth="0.8" opacity="0.3" />

        {/* numerical tick marks on the frame (top edge) */}
        {[120, 180, 240, 300].map((x) => (
          <g key={x}>
            <line x1={x} y1="70" x2={x} y2="62" stroke="var(--brand-teal-pale)" strokeWidth="1.5" opacity="0.6" />
            <text x={x} y="54" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--brand-teal-pale)" opacity="0.7">
              {Math.round((x - 60) / 30)}
            </text>
          </g>
        ))}

        {/* rods */}
        {[120, 180, 240, 300].map((x) => (
          <line key={x} x1={x} y1="70" x2={x} y2="330" stroke="var(--brand-teal-pale)" strokeWidth="2" opacity="0.5" />
        ))}

        {/* bead trails (faint ghost positions showing movement) */}
        <circle cx="120" cy="150" r="14" fill="var(--brand-orange)" opacity="0.22" />
        <circle cx="180" cy="240" r="14" fill="var(--brand-teal)" opacity="0.22" />
        <circle cx="300" cy="150" r="14" fill="var(--brand-orange)" opacity="0.22" />

        {/* divider beam */}
        <line x1="60" y1="200" x2="340" y2="200" stroke="var(--brand-teal)" strokeWidth="2.5" />
        <line x1="60" y1="200" x2="340" y2="200" stroke="var(--brand-teal-pale)" strokeWidth="0.6" opacity="0.5" />

        {/* beads — animated by GSAP via data-bead */}
        <circle data-bead cx="120" cy="110" r="16" fill="var(--brand-orange)" />
        <circle data-bead cx="120" cy="110" r="16" fill="none" stroke="var(--brand-navy-dark)" strokeWidth="1" opacity="0.3" />
        <circle data-bead cx="180" cy="110" r="16" fill="var(--brand-orange)" />
        <circle data-bead cx="240" cy="150" r="16" fill="var(--brand-teal)" />
        <circle data-bead cx="300" cy="110" r="16" fill="var(--brand-orange)" />
        <circle data-bead cx="120" cy="240" r="16" fill="var(--brand-teal)" />
        <circle data-bead cx="180" cy="280" r="16" fill="var(--brand-orange)" />
        <circle data-bead cx="240" cy="240" r="16" fill="var(--brand-teal)" />
        <circle data-bead cx="300" cy="280" r="16" fill="var(--brand-orange)" />
        <circle data-bead cx="120" cy="300" r="16" fill="var(--brand-teal)" />
        <circle data-bead cx="300" cy="240" r="16" fill="var(--brand-teal)" />

        {/* intentional floating badges — ringed, positioned at frame corners */}
        <g>
          <circle cx="352" cy="74" r="24" fill="var(--brand-orange)" />
          <circle cx="352" cy="74" r="24" fill="none" stroke="var(--brand-navy-dark)" strokeWidth="2" opacity="0.4" />
          <text x="352" y="82" textAnchor="middle" fontSize="22" fontWeight="800" fill="var(--brand-navy-dark)">7</text>
        </g>
        <g>
          <circle cx="48" cy="326" r="20" fill="var(--brand-teal)" />
          <circle cx="48" cy="326" r="20" fill="none" stroke="var(--brand-navy-dark)" strokeWidth="2" opacity="0.4" />
          <text x="48" y="333" textAnchor="middle" fontSize="20" fontWeight="800" fill="var(--brand-navy-dark)">+</text>
        </g>
      </svg>
    </div>
  );
}
