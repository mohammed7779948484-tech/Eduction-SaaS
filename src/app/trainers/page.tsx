"use client";

import { z } from "zod";
import { PageHero } from "@/components/brand/page-hero";
import { SectionShell } from "@/components/layout/section-shell";
import { PageContainer } from "@/components/layout/page-container";
import { SectionHeading } from "@/components/brand/section-heading";
import { ProcessTimeline } from "@/components/brand/process-timeline";
import { PrototypeForm } from "@/components/brand/prototype-form";
import { Card } from "@/components/ui/card";
import { Users, GraduationCap, Heart } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AnimatedStagger, AnimatedStaggerItem } from "@/components/motion/animated-stagger";
import { trainersContent } from "@/content/trainers";

const schema = z.object({
  name: z.string().min(1),
  phone: z.string().min(1),
  email: z.string().email(),
  qualification: z.string().min(1),
  experience: z.string().optional(),
  message: z.string().min(1),
});

export default function TrainersPage() {
  const c = trainersContent;
  const fields = [
    { name: "name", label: c.form.name, type: "text" as const, required: true, placeholder: { ar: "الاسم الكامل", en: "Full name" } },
    { name: "phone", label: c.form.phone, type: "tel" as const, required: true, placeholder: { ar: "+967…", en: "+967…" } },
    { name: "email", label: c.form.email, type: "email" as const, required: true, placeholder: { ar: "example@mail.com", en: "example@mail.com" } },
    { name: "qualification", label: c.form.qualification, type: "select" as const, required: true, options: [
      { value: "secondary", label: { ar: "ثانوية", en: "Secondary" } },
      { value: "bachelor", label: { ar: "بكالوريوس", en: "Bachelor" } },
      { value: "master", label: { ar: "ماجستير", en: "Master" } },
      { value: "other", label: { ar: "أخرى", en: "Other" } },
    ] },
    { name: "experience", label: c.form.experience, type: "textarea" as const, placeholder: { ar: "خبرات سابقة…", en: "Previous experience…" } },
    { name: "message", label: c.form.message, type: "textarea" as const, required: true, placeholder: { ar: "لماذا تريد الانضمام؟", en: "Why do you want to join?" } },
  ];

  const whoForIcons = [Users, GraduationCap, Heart];

  return (
    <>
      <PageHero eyebrow={c.hero.eyebrow} title={c.hero.title} subtitle={c.hero.subtitle} tone="navy" />

      {/* Who for */}
      <SectionShell tone="white">
        <PageContainer className="space-y-10">
          <SectionHeading title={c.whoFor.title.ar} align="center" />
          <AnimatedStagger className="grid gap-5 sm:grid-cols-3">
            {c.whoFor.items.map((item, i) => {
              const Icon = whoForIcons[i % whoForIcons.length];
              return (
                <AnimatedStaggerItem key={i}>
                  <Card className="h-full p-6 border-border bg-card shadow-sm text-center">
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

      {/* Curriculum */}
      <SectionShell tone="default">
        <PageContainer className="space-y-10">
          <SectionHeading title={c.curriculum.title.ar} align="center" />
          <AnimatedStagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {c.curriculum.items.map((item, i) => (
              <AnimatedStaggerItem key={i}>
                <Card className="h-full p-6 border-border bg-card shadow-sm">
                  <span className="flex size-8 items-center justify-center rounded-full bg-secondary text-primary font-bold text-sm mb-3">{i + 1}</span>
                  <h3 className="text-sm font-bold text-primary mb-1">{item.title.ar}</h3>
                  <p className="text-xs text-muted-foreground">{item.description.ar}</p>
                </Card>
              </AnimatedStaggerItem>
            ))}
          </AnimatedStagger>
        </PageContainer>
      </SectionShell>

      {/* Stages */}
      <SectionShell tone="white">
        <PageContainer className="space-y-10">
          <SectionHeading title={c.stages.title.ar} align="center" />
          <div className="max-w-3xl mx-auto">
            <ProcessTimeline steps={c.stages.steps} />
          </div>
        </PageContainer>
      </SectionShell>

      {/* Benefits */}
      <SectionShell tone="default">
        <PageContainer className="space-y-10">
          <SectionHeading title={c.benefits.title.ar} align="center" />
          <AnimatedStagger className="grid gap-5 sm:grid-cols-3">
            {c.benefits.items.map((item, i) => (
              <AnimatedStaggerItem key={i}>
                <Card className="h-full p-6 border-border bg-card shadow-sm">
                  <h3 className="text-base font-bold text-primary mb-1">{item.title.ar}</h3>
                  <p className="text-sm text-muted-foreground">{item.description.ar}</p>
                </Card>
              </AnimatedStaggerItem>
            ))}
          </AnimatedStagger>
        </PageContainer>
      </SectionShell>

      {/* FAQ + Form */}
      <SectionShell tone="white">
        <PageContainer>
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <h2 className="text-xl font-bold text-primary mb-4">{c.faq.title.ar}</h2>
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
            </div>
            <div>
              <h2 className="text-xl font-bold text-primary mb-4">{c.form.title.ar}</h2>
              <PrototypeForm fields={fields} submitLabel={c.form.submit} schema={schema} />
            </div>
          </div>
        </PageContainer>
      </SectionShell>
    </>
  );
}
