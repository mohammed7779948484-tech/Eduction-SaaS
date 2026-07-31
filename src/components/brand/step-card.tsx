"use client";

import { Card } from "@/components/ui/card";
import { BeadBadge } from "./bead-badge";
import { useLanguage } from "@/components/layout/language-provider";
import { cn } from "@/lib/utils";
import type { Step } from "@/content/home";

interface StepCardProps {
  step: Step;
  className?: string;
}

/** "How it works" step card — bead-shaped number badge, abacus-bead accent. */
export function StepCard({ step, className }: StepCardProps) {
  const { lang } = useLanguage();
  return (
    <Card
      className={cn(
        "relative h-full p-6 flex flex-col gap-4 border-border bg-card shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <BeadBadge tone="teal" size="lg">{step.number}</BeadBadge>
        <span className="h-1.5 w-1.5 rounded-full bg-brand-teal" aria-hidden />
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-bold text-primary">{step.title[lang]}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {step.description[lang]}
        </p>
      </div>
    </Card>
  );
}
