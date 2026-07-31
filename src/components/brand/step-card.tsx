"use client";

import { Card } from "@/components/ui/card";
import { useLanguage } from "@/components/layout/language-provider";
import { cn } from "@/lib/utils";
import type { Step } from "@/content/home";

interface StepCardProps {
  step: Step;
  className?: string;
}

/** "How it works" step card — numbered, abacus-bead accent. */
export function StepCard({ step, className }: StepCardProps) {
  const { lang } = useLanguage();
  return (
    <Card
      className={cn(
        "h-full p-6 flex flex-col gap-4 border-border bg-card shadow-sm hover:shadow-md transition-shadow",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <span className="flex size-12 items-center justify-center rounded-full bg-secondary text-primary font-extrabold text-lg">
          {step.number}
        </span>
        <span className="h-2 w-2 rounded-full bg-accent" aria-hidden />
      </div>
      <div className="space-y-1.5">
        <h3 className="text-lg font-bold text-primary">{step.title[lang]}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {step.description[lang]}
        </p>
      </div>
    </Card>
  );
}
