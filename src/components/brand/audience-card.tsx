"use client";

import { Card } from "@/components/ui/card";
import { useLanguage } from "@/components/layout/language-provider";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface AudienceCardProps {
  icon: LucideIcon;
  title: { ar: string; en: string };
  description: { ar: string; en: string };
  className?: string;
}

/** AudienceCard — target audience display for channels/trainers pages. */
export function AudienceCard({ icon: Icon, title, description, className }: AudienceCardProps) {
  const { lang } = useLanguage();
  return (
    <Card className={cn("p-6 border-border bg-card shadow-sm hover:shadow-md transition-shadow", className)}>
      <span className="flex size-12 items-center justify-center rounded-full bg-secondary text-primary mb-4">
        <Icon className="size-6" />
      </span>
      <h3 className="text-base font-bold text-primary mb-1">{title[lang]}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{description[lang]}</p>
    </Card>
  );
}
