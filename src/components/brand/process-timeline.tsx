"use client";

import { BeadBadge } from "./bead-badge";
import { useLanguage } from "@/components/layout/language-provider";
import { cn } from "@/lib/utils";

interface TimelineStep {
  number: string;
  title: { ar: string; en: string };
  description: { ar: string; en: string };
}

interface ProcessTimelineProps {
  steps: readonly TimelineStep[];
  className?: string;
}

/**
 * ProcessTimeline — vertical step progression with bead badges + connecting rail.
 * Used in: About (methodology), Trainers (training stages), Schools (partnership steps).
 */
export function ProcessTimeline({ steps, className }: ProcessTimelineProps) {
  const { lang } = useLanguage();
  return (
    <div className={cn("relative space-y-6", className)}>
      {/* vertical connecting rail */}
      <div className="absolute start-6 top-4 bottom-4 w-px bg-gradient-to-b from-brand-teal/40 via-brand-teal/20 to-transparent" aria-hidden />
      {steps.map((step, i) => (
        <div key={i} className="relative flex gap-4 ps-0">
          <BeadBadge tone="teal" size="md" className="relative z-10 shrink-0">{step.number}</BeadBadge>
          <div className="flex-1 pt-1">
            <h3 className="text-lg font-bold text-primary">{step.title[lang]}</h3>
            <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{step.description[lang]}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
