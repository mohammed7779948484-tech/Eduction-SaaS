"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { AnimatedCounter } from "@/components/motion/animated-counter";
import { useLanguage } from "@/components/layout/language-provider";
import { cn } from "@/lib/utils";
import type { Stat } from "@/content/home";

interface StatCardProps {
  stat: Stat;
  className?: string;
}

/** Credibility statistic card with bead accent + animated count-up. */
export function StatCard({ stat, className }: StatCardProps) {
  const { lang } = useLanguage();
  return (
    <Card
      className={cn(
        "border-0 bg-transparent shadow-none p-0 flex flex-col items-center text-center gap-2",
        className
      )}
    >
      {/* bead accent (abacus language) */}
      <span className="size-2 rounded-full bg-accent" aria-hidden />
      <div className="text-4xl sm:text-5xl font-extrabold text-primary tabular-nums leading-none">
        <AnimatedCounter to={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
      </div>
      <div className="text-sm sm:text-base text-muted-foreground font-medium">
        {stat.label[lang]}
      </div>
    </Card>
  );
}

/** Motion-wrapped stat card for staggered reveals. */
export function StatCardItem({ stat }: { stat: Stat }) {
  return (
    <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
      <StatCard stat={stat} />
    </motion.div>
  );
}
