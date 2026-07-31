"use client";

import { Card } from "@/components/ui/card";
import { BeadBadge } from "./bead-badge";
import { useLanguage } from "@/components/layout/language-provider";
import { cn } from "@/lib/utils";

interface LevelCardProps {
  level: number;
  title: { ar: string; en: string };
  description: { ar: string; en: string };
  className?: string;
}

/** LevelCard — program page level progression card (1–10). */
export function LevelCard({ level, title, description, className }: LevelCardProps) {
  const { lang } = useLanguage();
  return (
    <Card className={cn("p-5 border-border bg-card shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all", className)}>
      <div className="flex items-center gap-3 mb-3">
        <BeadBadge tone={level <= 3 ? "teal" : level <= 7 ? "navy" : "pale"} size="md">
          {level}
        </BeadBadge>
        <h3 className="text-sm font-bold text-primary leading-tight">{title[lang]}</h3>
      </div>
      <p className="text-xs text-muted-foreground leading-relaxed">{description[lang]}</p>
    </Card>
  );
}
