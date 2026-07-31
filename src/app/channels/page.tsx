import type { Metadata } from "next";
import { PageHero } from "@/components/brand/page-hero";
import { SectionShell } from "@/components/layout/section-shell";
import { PageContainer } from "@/components/layout/page-container";
import { SectionHeading } from "@/components/brand/section-heading";
import { ComparisonTable } from "@/components/brand/comparison-table";
import { RailDivider } from "@/components/brand/rail-divider";
import { CTASection } from "@/components/layout/cta-section";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChannelIllustration } from "@/components/brand/channel-illustration";
import { AnimatedReveal } from "@/components/motion/animated-reveal";
import { ArrowLeft } from "lucide-react";
import { channelsContent } from "@/content/channels";

export const metadata: Metadata = {
  title: "القنوات التعليمية",
  description: "ثلاث قنوات تعليمية: في المراكز، في المدارس الشريكة، وعلى المنصّة الرقمية (قريباً).",
};

const variantBg = {
  navy: "bg-brand-navy",
  blue: "bg-brand-blue",
  teal: "bg-brand-teal",
};

const variantGlyph = { navy: "center", blue: "school", teal: "screen" } as const;

export default function ChannelsPage() {
  const c = channelsContent;
  return (
    <>
      <PageHero eyebrow={c.hero.eyebrow} title={c.hero.title} subtitle={c.hero.subtitle} tone="navy" />

      {/* Channel detail cards */}
      <SectionShell tone="white">
        <PageContainer className="space-y-8">
          {c.channels.map((ch, i) => (
            <AnimatedReveal key={i} variant="fadeUp" delay={i * 0.05}>
              <Card className="overflow-hidden border-border bg-card shadow-sm">
                <div className="grid md:grid-cols-[200px_1fr]">
                  {/* Visual band */}
                  <div className={`flex items-center justify-center h-32 md:h-full ${variantBg[ch.variant]}`}>
                    <ChannelIllustration kind={variantGlyph[ch.variant]} />
                  </div>
                  {/* Content */}
                  <div className="p-6 sm:p-8 space-y-3">
                    <h2 className="text-xl font-bold text-primary">{ch.title.ar}</h2>
                    <p className="text-muted-foreground leading-relaxed">{ch.description.ar}</p>
                    <div className="grid sm:grid-cols-2 gap-3 pt-2">
                      <div className="rounded-lg bg-secondary/50 p-3">
                        <p className="text-xs font-bold text-brand-teal-strong mb-1">لمن؟</p>
                        <p className="text-sm text-muted-foreground">{ch.whoFor.ar}</p>
                      </div>
                      <div className="rounded-lg bg-secondary/50 p-3">
                        <p className="text-xs font-bold text-brand-teal-strong mb-1">التجربة</p>
                        <p className="text-sm text-muted-foreground">{ch.experience.ar}</p>
                      </div>
                    </div>
                    <div className="pt-2">
                      <Button asChild variant="default" size="lg">
                        <a href={ch.href} className="inline-flex items-center gap-2">
                          {ch.cta.ar}
                          <ArrowLeft className="size-4" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </AnimatedReveal>
          ))}
        </PageContainer>
      </SectionShell>

      <RailDivider tone="teal" beads={9} />

      {/* Comparison table */}
      <SectionShell tone="default">
        <PageContainer className="space-y-8">
          <SectionHeading eyebrow="مقارنة" title={c.comparison.title.ar} align="center" />
          <Card className="p-4 sm:p-6 border-border bg-card shadow-sm">
            <ComparisonTable rows={c.comparison.rows} />
          </Card>
        </PageContainer>
      </SectionShell>

      {/* Selection guide */}
      <SectionShell tone="white">
        <PageContainer className="max-w-3xl text-center">
          <AnimatedReveal>
            <SectionHeading eyebrow="إرشاد" title={c.selectionGuide.title.ar} align="center" />
            <p className="mt-4 text-base text-muted-foreground leading-relaxed text-pretty">{c.selectionGuide.body.ar}</p>
            <div className="mt-6">
              <Button asChild variant="default" size="lg">
                <a href="/register">احجز حصة تجريبية</a>
              </Button>
            </div>
          </AnimatedReveal>
        </PageContainer>
      </SectionShell>

      <CTASection />
    </>
  );
}
