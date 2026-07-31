import type { Metadata } from "next";
import { PageHero } from "@/components/brand/page-hero";
import { SectionShell } from "@/components/layout/section-shell";
import { PageContainer } from "@/components/layout/page-container";
import { SectionHeading } from "@/components/brand/section-heading";
import { RailDivider } from "@/components/brand/rail-divider";
import { BeadBadge } from "@/components/brand/bead-badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnimatedStagger, AnimatedStaggerItem } from "@/components/motion/animated-stagger";
import { AnimatedReveal } from "@/components/motion/animated-reveal";
import {
  ShieldCheck, Monitor, BookOpen, BarChart3, Video, Library,
  Users, Home, School, MapPin, Clock, CheckCircle2, Sparkles,
} from "lucide-react";
import { platformContent } from "@/content/platform";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "المنصّة الافتراضية",
  description: "منصّة تعليمية تفاعلية للحساب الذهني — قريباً. سجّل اهتمامك.",
};

const featureIcons = [Monitor, BookOpen, BarChart3, Video, Library, Sparkles];
const audienceIcons = [Users, ShieldCheck, School, MapPin];

export default function PlatformPage() {
  const c = platformContent;
  return (
    <>
      <PageHero eyebrow={c.hero.eyebrow} title={c.hero.title} subtitle={c.hero.subtitle} tone="navy">
        <Badge className="bg-secondary text-primary mt-2">قريباً · Coming soon</Badge>
      </PageHero>

      {/* Status — clearly state what's available now vs. future */}
      <SectionShell tone="white">
        <PageContainer className="max-w-4xl">
          <AnimatedReveal>
            <div className="flex items-start gap-4">
              <span className="flex size-12 items-center justify-center rounded-full bg-secondary text-primary shrink-0">
                <Clock className="size-6" />
              </span>
              <div>
                <h2 className="text-xl font-bold text-primary mb-2">{c.status.title.ar}</h2>
                <p className="text-base text-muted-foreground leading-relaxed text-pretty">{c.status.body.ar}</p>
              </div>
            </div>
          </AnimatedReveal>
        </PageContainer>
      </SectionShell>

      {/* Roadmap — 3 phases */}
      <SectionShell tone="default">
        <PageContainer className="space-y-10">
          <SectionHeading eyebrow="خارطة الطريق" title={c.roadmap.title.ar} subtitle={c.roadmap.subtitle.ar} align="center" />
          <AnimatedStagger className="grid gap-5 md:grid-cols-3">
            {c.roadmap.phases.map((phase, i) => (
              <AnimatedStaggerItem key={i}>
                <Card className={`h-full p-6 border-border shadow-sm relative ${phase.active ? "ring-2 ring-accent/30" : ""}`}>
                  <div className="flex items-center justify-between mb-3">
                    <BeadBadge tone={phase.active ? "teal" : "pale"} size="md">{phase.number}</BeadBadge>
                    <Badge className={phase.active ? "bg-success/15 text-success" : "bg-secondary text-muted-foreground"}>
                      {phase.status.ar}
                    </Badge>
                  </div>
                  <h3 className="text-base font-bold text-primary mb-1">{phase.title.ar}</h3>
                  <p className="text-sm text-muted-foreground">{phase.description.ar}</p>
                </Card>
              </AnimatedStaggerItem>
            ))}
          </AnimatedStagger>
        </PageContainer>
      </SectionShell>

      <RailDivider tone="teal" beads={9} />

      {/* Vision */}
      <SectionShell tone="white">
        <PageContainer className="max-w-4xl">
          <AnimatedReveal>
            <SectionHeading title={c.vision.title.ar} align="start" />
            <p className="mt-4 text-base sm:text-lg text-foreground leading-relaxed text-pretty">{c.vision.body.ar}</p>
          </AnimatedReveal>
        </PageContainer>
      </SectionShell>

      {/* How it works — 4 steps */}
      <SectionShell tone="default">
        <PageContainer className="space-y-10">
          <SectionHeading eyebrow="آلية العمل" title={c.howItWorks.title.ar} subtitle={c.howItWorks.subtitle.ar} align="center" />
          <AnimatedStagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {c.howItWorks.steps.map((step, i) => (
              <AnimatedStaggerItem key={i}>
                <Card className="h-full p-6 border-border bg-card shadow-sm">
                  <BeadBadge tone="teal" size="lg" className="mb-3">{step.number}</BeadBadge>
                  <h3 className="text-sm font-bold text-primary mb-1">{step.title.ar}</h3>
                  <p className="text-xs text-muted-foreground">{step.description.ar}</p>
                </Card>
              </AnimatedStaggerItem>
            ))}
          </AnimatedStagger>
        </PageContainer>
      </SectionShell>

      {/* Conceptual interface preview */}
      <SectionShell tone="white">
        <PageContainer className="space-y-8">
          <SectionHeading eyebrow="مفاهيم" title="معاينةٌ تصوّرية للمنصّة" align="center" />
          <AnimatedReveal variant="scaleIn">
            <Card className="overflow-hidden border-border bg-card shadow-lg max-w-4xl mx-auto">
              {/* fake browser chrome */}
              <div className="flex items-center gap-2 bg-secondary px-4 py-3 border-b border-border">
                <span className="size-3 rounded-full bg-destructive/60" />
                <span className="size-3 rounded-full bg-warning/60" />
                <span className="size-3 rounded-full bg-success/60" />
                <span className="ms-3 text-xs text-muted-foreground font-mono">platform.mental-arithmetic.ye</span>
              </div>
              {/* conceptual dashboard */}
              <div className="p-6 sm:p-8 bg-brand-bg grid sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <div className="h-3 w-20 rounded bg-brand-teal/40" />
                  <div className="h-16 rounded-lg bg-card shadow-sm flex items-center justify-center">
                    <BarChart3 className="size-8 text-brand-teal-strong" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-3 w-24 rounded bg-brand-teal/40" />
                  <div className="h-16 rounded-lg bg-card shadow-sm flex items-center justify-center">
                    <BookOpen className="size-8 text-brand-teal-strong" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-3 w-16 rounded bg-brand-teal/40" />
                  <div className="h-16 rounded-lg bg-card shadow-sm flex items-center justify-center">
                    <Video className="size-8 text-brand-teal-strong" />
                  </div>
                </div>
                <div className="sm:col-span-3 space-y-2">
                  <div className="h-3 w-32 rounded bg-brand-navy/30" />
                  <div className="h-2 rounded bg-brand-navy/15" />
                  <div className="h-2 w-3/4 rounded bg-brand-navy/15" />
                  <div className="h-2 w-1/2 rounded bg-brand-navy/15" />
                </div>
              </div>
            </Card>
          </AnimatedReveal>
          <p className="text-center text-xs text-muted-foreground">معاينةٌ تصوّرية — ليست واجهةً حقيقية</p>
        </PageContainer>
      </SectionShell>

      <RailDivider tone="teal" beads={9} />

      {/* Features grid */}
      <SectionShell tone="default">
        <PageContainer className="space-y-10">
          <SectionHeading eyebrow="الميزات" title="ميزات المنصّة المستقبلية" align="center" />
          <AnimatedStagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {c.features.map((f, i) => {
              const Icon = featureIcons[i % featureIcons.length];
              return (
                <AnimatedStaggerItem key={i}>
                  <Card className="h-full p-6 border-border bg-card shadow-sm">
                    <Icon className="size-8 text-brand-teal-strong mb-3" />
                    <h3 className="text-base font-bold text-primary mb-1">{f.title.ar}</h3>
                    <p className="text-sm text-muted-foreground">{f.description.ar}</p>
                  </Card>
                </AnimatedStaggerItem>
              );
            })}
          </AnimatedStagger>
        </PageContainer>
      </SectionShell>

      {/* Audiences */}
      <SectionShell tone="white">
        <PageContainer className="space-y-10">
          <SectionHeading eyebrow="الجمهور" title={c.audiences.title.ar} align="center" />
          <AnimatedStagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {c.audiences.items.map((a, i) => {
              const Icon = audienceIcons[i % audienceIcons.length];
              return (
                <AnimatedStaggerItem key={i}>
                  <Card className="h-full p-6 border-border bg-card shadow-sm text-center">
                    <Icon className="size-10 text-brand-teal-strong mx-auto mb-3" />
                    <h3 className="text-base font-bold text-primary mb-1">{a.title.ar}</h3>
                    <p className="text-sm text-muted-foreground">{a.description.ar}</p>
                  </Card>
                </AnimatedStaggerItem>
              );
            })}
          </AnimatedStagger>
        </PageContainer>
      </SectionShell>

      {/* Comparison */}
      <SectionShell tone="default">
        <PageContainer className="space-y-8">
          <SectionHeading eyebrow="مقارنة" title={c.comparison.title.ar} align="center" />
          <Card className="p-4 sm:p-6 border-border bg-card shadow-sm">
            <div className="overflow-x-auto scroll-thin">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b-2 border-border">
                    <th className="text-start py-3 px-4 font-bold text-primary">{`المعيار`}</th>
                    <th className="text-center py-3 px-4 font-bold text-brand-teal-strong">{`المنصّة الرقمية`}</th>
                    <th className="text-center py-3 px-4 font-bold text-brand-navy">{`التعلّم الحضوري`}</th>
                  </tr>
                </thead>
                <tbody>
                  {c.comparison.rows.map((row, i) => (
                    <tr key={i} className="border-b border-border hover:bg-secondary/30 transition-colors">
                      <td className="py-3 px-4 font-medium text-foreground">{row.feature.ar}</td>
                      <td className="py-3 px-4 text-center text-muted-foreground">{row.platform.ar}</td>
                      <td className="py-3 px-4 text-center text-muted-foreground">{row.inPerson.ar}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </PageContainer>
      </SectionShell>

      {/* FAQ */}
      <SectionShell tone="white">
        <PageContainer className="max-w-3xl space-y-8">
          <SectionHeading eyebrow="أسئلة" title={c.faq.title.ar} align="center" />
          <Card className="p-6 border-border bg-card shadow-sm">
            <Accordion type="single" collapsible>
              {c.faq.items.map((item, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger className="text-start">{item.q.ar}</AccordionTrigger>
                  <AccordionContent>{item.a.ar}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Card>
        </PageContainer>
      </SectionShell>

      {/* Safety */}
      <SectionShell tone="navy">
        <PageContainer className="max-w-3xl">
          <div className="flex items-start gap-4">
            <ShieldCheck className="size-12 text-brand-teal-pale shrink-0" />
            <div>
              <h2 className="text-xl font-bold text-white mb-2">{c.safety.title.ar}</h2>
              <p className="text-white/80 leading-relaxed">{c.safety.body.ar}</p>
            </div>
          </div>
        </PageContainer>
      </SectionShell>

      {/* Interest CTA */}
      <SectionShell tone="default">
        <PageContainer className="max-w-2xl text-center">
          <AnimatedReveal>
            <SectionHeading title={c.interestForm.title.ar} subtitle={c.interestForm.body.ar} align="center" />
            <div className="mt-6">
              <Button asChild variant="cta" size="xl">
                <a href="/register">سجّل اهتمامك</a>
              </Button>
            </div>
          </AnimatedReveal>
        </PageContainer>
      </SectionShell>
    </>
  );
}
