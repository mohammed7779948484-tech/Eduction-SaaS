"use client";

import { SectionShell } from "@/components/layout/section-shell";
import { PageContainer } from "@/components/layout/page-container";
import { SectionHeading } from "@/components/brand/section-heading";
import { AnimatedStagger, AnimatedStaggerItem } from "@/components/motion/animated-stagger";
import { ChannelCard } from "@/components/brand/channel-card";
import { channelsHeading, channels } from "@/content/home";
import { useLanguage } from "@/components/layout/language-provider";

export function LearningChannels() {
  const { lang } = useLanguage();
  return (
    <SectionShell tone="default" as="section">
      <PageContainer className="space-y-10 sm:space-y-12">
        <SectionHeading
          eyebrow={lang === "ar" ? "خيارات مرنة" : "Flexible options"}
          title={channelsHeading[lang]}
          subtitle={
            lang === "ar"
              ? "ثلاث قنوات تعليمية تناسب كل أسرة — في المركز أو المدرسة أو أونلاين."
              : "Three learning channels to suit every family — at the center, in school, or online."
          }
        />
        <AnimatedStagger className="grid gap-5 md:grid-cols-3" staggerSpeed="normal">
          {channels.map((channel, i) => (
            <AnimatedStaggerItem key={i}>
              <ChannelCard channel={channel} />
            </AnimatedStaggerItem>
          ))}
        </AnimatedStagger>
      </PageContainer>
    </SectionShell>
  );
}
