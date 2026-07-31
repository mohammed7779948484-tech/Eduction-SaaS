import type { Metadata } from "next";
import { PageHero } from "@/components/brand/page-hero";
import { SectionShell } from "@/components/layout/section-shell";
import { PageContainer } from "@/components/layout/page-container";
import { SectionHeading } from "@/components/brand/section-heading";
import { ProcessTimeline } from "@/components/brand/process-timeline";
import { ProfileCard } from "@/components/brand/profile-card";
import { RailDivider } from "@/components/brand/rail-divider";
import { CTASection } from "@/components/layout/cta-section";
import { AnimatedReveal } from "@/components/motion/animated-reveal";
import { AnimatedStagger, AnimatedStaggerItem } from "@/components/motion/animated-stagger";
import { Card } from "@/components/ui/card";
import { ShieldCheck, Eye, Heart, Users, Target, Sparkles } from "lucide-react";
import { aboutContent } from "@/content/about";

export const metadata: Metadata = {
  title: "من نحن",
  description: "برنامج الحساب الذهني (السوروبان) — منهجٌ تعليميٌّ حديث ينمّي مهارات الأطفال مع التزامٍ بحماية الطفل.",
};

export default function AboutPage() {
  const c = aboutContent;
  return (
    <>
      <PageHero eyebrow={c.hero.eyebrow} title={c.hero.title} subtitle={c.hero.subtitle} tone="navy" />

      {/* Story */}
      <SectionShell tone="white">
        <PageContainer className="max-w-4xl">
          <AnimatedReveal>
            <SectionHeading title={c.story.title} align="start" />
            <p className="mt-4 text-base sm:text-lg text-foreground leading-relaxed text-pretty">{c.story.body.ar}</p>
          </AnimatedReveal>
        </PageContainer>
      </SectionShell>

      {/* Vision + Mission */}
      <SectionShell tone="default">
        <PageContainer>
          <div className="grid gap-6 md:grid-cols-2">
            <AnimatedReveal>
              <Card className="h-full p-8 border-border bg-card shadow-sm">
                <Target className="size-10 text-brand-teal-strong mb-4" />
                <h2 className="text-xl font-bold text-primary mb-2">{c.visionMission.visionTitle.ar}</h2>
                <p className="text-muted-foreground leading-relaxed">{c.visionMission.visionBody.ar}</p>
              </Card>
            </AnimatedReveal>
            <AnimatedReveal delay={0.1}>
              <Card className="h-full p-8 border-border bg-card shadow-sm">
                <Sparkles className="size-10 text-brand-teal-strong mb-4" />
                <h2 className="text-xl font-bold text-primary mb-2">{c.visionMission.missionTitle.ar}</h2>
                <p className="text-muted-foreground leading-relaxed">{c.visionMission.missionBody.ar}</p>
              </Card>
            </AnimatedReveal>
          </div>
        </PageContainer>
      </SectionShell>

      {/* Values */}
      <SectionShell tone="white">
        <PageContainer className="space-y-10">
          <SectionHeading eyebrow="قيمنا" title={c.values.title.ar} align="center" />
          <AnimatedStagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {c.values.items.map((v, i) => {
              const Icons = [Heart, Target, Users, Sparkles];
              const Icon = Icons[i % Icons.length];
              return (
                <AnimatedStaggerItem key={i}>
                  <Card className="h-full p-6 border-border bg-card shadow-sm">
                    <Icon className="size-8 text-brand-teal-strong mb-3" />
                    <h3 className="text-base font-bold text-primary mb-1">{v.title.ar}</h3>
                    <p className="text-sm text-muted-foreground">{v.description.ar}</p>
                  </Card>
                </AnimatedStaggerItem>
              );
            })}
          </AnimatedStagger>
        </PageContainer>
      </SectionShell>

      <RailDivider tone="teal" beads={9} />

      {/* Methodology */}
      <SectionShell tone="default">
        <PageContainer className="space-y-10">
          <SectionHeading eyebrow="منهجيتنا" title={c.methodology.title.ar} subtitle={c.methodology.subtitle.ar} align="center" />
          <div className="max-w-3xl mx-auto">
            <ProcessTimeline steps={c.methodology.steps} />
          </div>
        </PageContainer>
      </SectionShell>

      {/* Why mental arithmetic */}
      <SectionShell tone="white">
        <PageContainer className="space-y-10">
          <SectionHeading eyebrow="الفوائد" title={c.whyMentalArithmetic.title.ar} align="center" />
          <AnimatedStagger className="grid gap-5 md:grid-cols-3">
            {c.whyMentalArithmetic.items.map((item, i) => {
              const Icons = [Eye, Target, Heart];
              const Icon = Icons[i % Icons.length];
              return (
                <AnimatedStaggerItem key={i}>
                  <Card className="h-full p-6 text-center border-border bg-card shadow-sm">
                    <Icon className="size-10 text-brand-teal-strong mx-auto mb-3" />
                    <h3 className="text-base font-bold text-primary mb-1">{item.title.ar}</h3>
                    <p className="text-sm text-muted-foreground">{item.description.ar}</p>
                  </Card>
                </AnimatedStaggerItem>
              );
            })}
          </AnimatedStagger>
        </PageContainer>
      </SectionShell>

      {/* Team */}
      <SectionShell tone="default">
        <PageContainer className="space-y-10">
          <SectionHeading eyebrow="فريقنا" title={c.team.title.ar} subtitle={c.team.subtitle.ar} align="center" />
          <AnimatedStagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {c.team.members.map((m, i) => (
              <AnimatedStaggerItem key={i}>
                <ProfileCard name={m.name} role={m.role} bio={m.bio} />
              </AnimatedStaggerItem>
            ))}
          </AnimatedStagger>
        </PageContainer>
      </SectionShell>

      {/* Child protection */}
      <SectionShell tone="navy">
        <PageContainer className="max-w-3xl">
          <div className="flex items-start gap-4">
            <ShieldCheck className="size-12 text-brand-teal-pale shrink-0" />
            <div>
              <h2 className="text-xl font-bold text-white mb-2">{c.childProtection.title.ar}</h2>
              <p className="text-white/80 leading-relaxed">{c.childProtection.body.ar}</p>
            </div>
          </div>
        </PageContainer>
      </SectionShell>

      <CTASection />
    </>
  );
}
