"use client";

import { Card } from "@/components/ui/card";
import { MapPin, Clock } from "lucide-react";
import { useLanguage } from "@/components/layout/language-provider";
import { cn } from "@/lib/utils";

interface BranchCardProps {
  city: { ar: string; en: string };
  area: { ar: string; en: string };
  hours?: { ar: string; en: string };
  className?: string;
}

/** BranchCard — contact page branch display. */
export function BranchCard({ city, area, hours, className }: BranchCardProps) {
  const { lang } = useLanguage();
  return (
    <Card className={cn("p-6 border-border bg-card shadow-sm hover:shadow-md transition-shadow", className)}>
      <div className="flex items-start gap-3">
        <span className="flex size-10 items-center justify-center rounded-full bg-secondary text-primary shrink-0">
          <MapPin className="size-5" />
        </span>
        <div className="space-y-1">
          <h3 className="text-base font-bold text-primary">{city[lang]}</h3>
          <p className="text-sm text-muted-foreground">{area[lang]}</p>
          {hours && (
            <p className="flex items-center gap-1.5 text-xs text-muted-foreground pt-1">
              <Clock className="size-3.5" />
              {hours[lang]}
            </p>
          )}
        </div>
      </div>
    </Card>
  );
}
