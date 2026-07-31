import type { Metadata } from "next";
import { PageHero } from "@/components/brand/page-hero";
import { SectionShell } from "@/components/layout/section-shell";
import { PageContainer } from "@/components/layout/page-container";
import { SectionHeading } from "@/components/brand/section-heading";
import { LevelCard } from "@/components/brand/level-card";
import { RailDivider } from "@/components/brand/rail-divider";
import { CTASection } from "@/components/layout/cta-section";
import { AnimatedReveal } from "@/components/motion/animated-reveal";
import { AnimatedStagger, AnimatedStaggerItem } from "@/components/motion/animated-stagger";
import { Card } from "@/components/ui/card";
import { Calculator, Brain, Clock, TrendingUp } from "lucide-react";
import { programContent } from "@/content/program";
import { faq } from "@/content/faq";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "البرنامج",
  description: "طريقة السوروبان — منهجٌ متدرّجٌ من 10 مستويات للأطفال من 7 إلى 12 عاماً.",
};

export default function ProgramPage() {
  const c = programContent;
  return (
    <>
      <PageHero eyebrow={c.hero.eyebrow} title={c.hero.title} subtitle={c.hero.subtitle} tone="navy" />

      {/* What is mental arithmetic + What is Soroban */}
      <SectionShell tone="white">
        <PageContainer>
          <div className="grid gap-6 md:grid-cols-2">
            <AnimatedReveal>
              <Card className="h-full p-8 border-border bg-card shadow-sm">
                <Brain className="size-10 text-brand-teal-strong mb-4" />
                <h2 className="text-xl font-bold text-primary mb-2">{c.whatIs.title.ar}</h2>
                <p className="text-muted-foreground leading-relaxed">{c.whatIs.body.ar}</p>
              </Card>
            </AnimatedReveal>
            <AnimatedReveal delay={0.1}>
              <Card className="h-full p-8 border-border bg-card shadow-sm">
                <Calculator className="size-10 text-brand-teal-strong mb-4" />
                <h2 className="text-xl font-bold text-primary mb-2">{c.whatIsSoroban.title.ar}</h2>
                <p className="text-muted-foreground leading-relaxed">{c.whatIsSoroban.body.ar}</p>
              </Card>
            </AnimatedReveal>
          </div>
        </PageContainer>
      </SectionShell>

      {/* Levels */}
      <SectionShell tone="default">
        <PageContainer className="space-y-10">
          <SectionHeading eyebrow="التدرّج" title={c.levels.title.ar} subtitle={c.levels.subtitle.ar} align="center" />
          <AnimatedStagger className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
            {c.levels.items.map((lvl, i) => (
              <AnimatedStaggerItem key={i}>
                <LevelCard level={lvl.level} title={lvl.title} description={lvl.description} />
              </AnimatedStaggerItem>
            ))}
          </AnimatedStagger>
        </PageContainer>
      </SectionShell>

      <RailDivider tone="teal" beads={9} />

      {/* Ages */}
      <SectionShell tone="white">
        <PageContainer className="max-w-4xl">
          <AnimatedReveal>
            <SectionHeading title={c.ages.title.ar} align="start" />
            <p className="mt-4 text-base sm:text-lg text-foreground leading-relaxed text-pretty">{c.ages.body.ar}</p>
            <div className="mt-6 flex flex-wrap gap-4">
              <div className="flex items-center gap-2 rounded-lg bg-secondary px-4 py-2">
                <Clock className="size-5 text-brand-teal-strong" />
                <span className="font-bold text-primary">7 – 12 {`سنوات`}</span>
              </div>
            </div>
          </AnimatedReveal>
        </PageContainer>
      </SectionShell>

      {/* Outcomes */}
      <SectionShell tone="default">
        <PageContainer className="space-y-10">
          <SectionHeading eyebrow="النتائج" title={c.outcomes.title.ar} subtitle={c.outcomes.subtitle.ar} align="center" />
          <AnimatedStagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {c.outcomes.items.map((item, i) => {
              const Icons = [TrendingUp, Brain, Calculator, Clock];
              const Icon = Icons[i % Icons.length];
              return (
                <AnimatedStaggerItem key={i}>
                  <Card className="h-full p-6 border-border bg-card shadow-sm">
                    <Icon className="size-8 text-brand-teal-strong mb-3" />
                    <h3 className="text-sm font-bold text-primary mb-1">{item.title.ar}</h3>
                    <p className="text-xs text-muted-foreground">{item.description.ar}</p>
                  </Card>
                </AnimatedStaggerItem>
              );
            })}
          </AnimatedStagger>
        </PageContainer>
      </SectionShell>

      {/* Journey */}
      <SectionShell tone="white">
        <PageContainer className="space-y-10">
          <SectionHeading eyebrow="الرحلة" title={c.journey.title.ar} align="center" />
          <AnimatedStagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {c.journey.steps.map((step, i) => (
              <AnimatedStaggerItem key={i}>
                <Card className="h-full p-6 border-border bg-card shadow-sm">
                  <span className="flex size-10 items-center justify-center rounded-full bg-secondary text-primary font-extrabold mb-3">{step.number}</span>
                  <h3 className="text-sm font-bold text-primary mb-1">{step.title.ar}</h3>
                  <p className="text-xs text-muted-foreground">{step.description.ar}</p>
                </Card>
              </AnimatedStaggerItem>
            ))}
          </AnimatedStagger>
        </PageContainer>
      </SectionShell>

      {/* Program FAQ */}
      <SectionShell tone="default">
        <PageContainer className="max-w-3xl space-y-8">
          <SectionHeading eyebrow="أسئلة" title="أسئلة شائعة عن البرنامج" align="center" />
          <Accordion type="single" collapsible>
            {faq.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger>{f.question.ar}</AccordionTrigger>
                <AccordionContent>{f.answer.ar}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </PageContainer>
      </SectionShell>

      <CTASection />
    </>
  );
}
