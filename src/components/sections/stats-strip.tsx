"use client";

import { SectionShell } from "@/components/layout/section-shell";
import { PageContainer } from "@/components/layout/page-container";
import { AnimatedStagger, AnimatedStaggerItem } from "@/components/motion/animated-stagger";
import { StatCard } from "@/components/brand/stat-card";
import { stats } from "@/content/home";
import { useLanguage } from "@/components/layout/language-provider";

export function StatsStrip() {
  const { lang } = useLanguage();
  return (
    <SectionShell tone="tint" spacing="compact" aria-label={lang === "ar" ? "إحصاءات" : "Statistics"}>
      <PageContainer>
        <AnimatedStagger
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
          staggerSpeed="normal"
        >
          {stats.map((stat, i) => (
            <AnimatedStaggerItem key={i}>
              <StatCard stat={stat} />
            </AnimatedStaggerItem>
          ))}
        </AnimatedStagger>
      </PageContainer>
    </SectionShell>
  );
}
