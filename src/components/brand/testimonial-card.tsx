"use client";

import { Card } from "@/components/ui/card";
import { useLanguage } from "@/components/layout/language-provider";
import { cn } from "@/lib/utils";
import type { Testimonial } from "@/content/testimonials";

interface TestimonialCardProps {
  testimonial: Testimonial;
  className?: string;
}

/** Testimonial card — refined quote treatment, bead avatar, trust focus. */
export function TestimonialCard({ testimonial, className }: TestimonialCardProps) {
  const { lang } = useLanguage();
  return (
    <Card
      className={cn(
        "relative h-full p-6 sm:p-8 border-border bg-card shadow-sm flex flex-col gap-4 overflow-hidden",
        className
      )}
    >
      {/* subtle bead accent corner motif */}
      <span className="absolute top-4 end-4 flex gap-1" aria-hidden>
        <span className="size-1.5 rounded-full bg-brand-teal/40" />
        <span className="size-1.5 rounded-full bg-brand-navy/30" />
      </span>
      <span className="text-5xl leading-none text-brand-teal-strong/30 font-extrabold" aria-hidden>
        ”
      </span>
      <blockquote className="text-base sm:text-lg text-foreground leading-relaxed flex-1 text-pretty -mt-2">
        {testimonial.quote[lang]}
      </blockquote>
      <div className="flex items-center gap-3 pt-3 border-t border-border">
        <span aria-hidden className="flex size-11 items-center justify-center rounded-full bg-brand-navy text-white font-bold shadow-sm">
          {testimonial.name[lang].charAt(0)}
        </span>
        <div className="flex flex-col">
          <span className="text-sm font-bold text-primary">{testimonial.name[lang]}</span>
          <span className="text-xs text-muted-foreground">{testimonial.role[lang]}</span>
        </div>
      </div>
    </Card>
  );
}
