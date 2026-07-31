"use client";

import { Card } from "@/components/ui/card";
import { AnimatedCounter } from "@/components/motion/animated-counter";
import { useLanguage } from "@/components/layout/language-provider";
import { cn } from "@/lib/utils";
import type { Stat } from "@/content/home";

interface StatCardProps {
  stat: Stat;
  className?: string;
}

/** Credibility statistic card with animated count-up. */
export function StatCard({ stat, className }: StatCardProps) {
  const { lang } = useLanguage();
  return (
    <Card
      className={cn(
        "border-0 bg-transparent shadow-none p-0 flex flex-col items-center text-center gap-1",
        className
      )}
    >
      <div className="text-4xl sm:text-5xl font-extrabold text-primary tabular-nums">
        <AnimatedCounter to={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
      </div>
      <div className="text-sm sm:text-base text-muted-foreground font-medium">
        {stat.label[lang]}
      </div>
    </Card>
  );
}
