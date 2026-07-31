"use client";

import { SectionShell } from "@/components/layout/section-shell";
import { PageContainer } from "@/components/layout/page-container";
import { SectionHeading } from "@/components/brand/section-heading";
import { AnimatedStagger, AnimatedStaggerItem } from "@/components/motion/animated-stagger";
import { StepCard } from "@/components/brand/step-card";
import { howItWorks, steps } from "@/content/home";
import { useLanguage } from "@/components/layout/language-provider";

export function HowItWorks() {
  const { lang } = useLanguage();
  return (
    <SectionShell id="how-it-works" tone="white" as="section">
      <PageContainer className="space-y-10 sm:space-y-12">
        <SectionHeading
          eyebrow={lang === "ar" ? "خطوات بسيطة" : "Simple steps"}
          title={howItWorks[lang]}
          subtitle={
            lang === "ar"
              ? "رحلة الطالب من الاكتشاف إلى الإتقان عبر منهجيةٍ متدرّجة."
              : "The student's journey from discovery to mastery through a graded methodology."
          }
        />
        <AnimatedStagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4" staggerSpeed="normal">
          {steps.map((step, i) => (
            <AnimatedStaggerItem key={i}>
              <StepCard step={step} />
            </AnimatedStaggerItem>
          ))}
        </AnimatedStagger>
      </PageContainer>
    </SectionShell>
  );
}
