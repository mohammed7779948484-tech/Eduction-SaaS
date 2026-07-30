"use client";

import { Card } from "@/components/ui/card";
import { useLanguage } from "@/components/layout/language-provider";
import { cn } from "@/lib/utils";
import type { Testimonial } from "@/content/testimonials";

interface TestimonialCardProps {
  testimonial: Testimonial;
  className?: string;
}

/** Testimonial card — used in the homepage carousel. */
export function TestimonialCard({ testimonial, className }: TestimonialCardProps) {
  const { lang } = useLanguage();
  return (
    <Card
      className={cn(
        "h-full p-6 sm:p-8 border-border bg-card shadow-sm flex flex-col gap-4",
        className
      )}
    >
      <span className="text-4xl leading-none text-brand-teal-strong" aria-hidden>
        ”
      </span>
      <blockquote className="text-base sm:text-lg text-foreground leading-relaxed flex-1 text-pretty">
        {testimonial.quote[lang]}
      </blockquote>
      <div className="flex items-center gap-3 pt-2 border-t border-border">
        <span className="flex size-10 items-center justify-center rounded-full bg-secondary text-primary font-bold">
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
