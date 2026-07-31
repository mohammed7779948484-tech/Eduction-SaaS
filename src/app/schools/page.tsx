"use client";

import { z } from "zod";
import { PageHero } from "@/components/brand/page-hero";
import { SectionShell } from "@/components/layout/section-shell";
import { PageContainer } from "@/components/layout/page-container";
import { SectionHeading } from "@/components/brand/section-heading";
import { ProcessTimeline } from "@/components/brand/process-timeline";
import { PrototypeForm } from "@/components/brand/prototype-form";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, MessageCircle } from "lucide-react";
import { site } from "@/content/site";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AnimatedStagger, AnimatedStaggerItem } from "@/components/motion/animated-stagger";
import { schoolsContent } from "@/content/schools";

const schema = z.object({
  schoolName: z.string().min(1),
  contactPerson: z.string().min(1),
  phone: z.string().min(1),
  email: z.string().email(),
  students: z.string().min(1),
  message: z.string().optional(),
});

export default function SchoolsPage() {
  const c = schoolsContent;
  const fields = [
    { name: "schoolName", label: c.form.schoolName, type: "text" as const, required: true, placeholder: { ar: "اسم المدرسة", en: "School name" } },
    { name: "contactPerson", label: c.form.contactPerson, type: "text" as const, required: true, placeholder: { ar: "الاسم", en: "Name" } },
    { name: "phone", label: c.form.phone, type: "tel" as const, required: true, placeholder: { ar: "+967…", en: "+967…" } },
    { name: "email", label: c.form.email, type: "email" as const, required: true, placeholder: { ar: "example@mail.com", en: "example@mail.com" } },
    { name: "students", label: c.form.students, type: "select" as const, required: true, options: [
      { value: "1-50", label: { ar: "1–50 طالب", en: "1–50 students" } },
      { value: "51-100", label: { ar: "51–100 طالب", en: "51–100 students" } },
      { value: "101-200", label: { ar: "101–200 طالب", en: "101–200 students" } },
      { value: "200+", label: { ar: "أكثر من 200", en: "200+" } },
    ] },
    { name: "message", label: c.form.message, type: "textarea" as const, placeholder: { ar: "ملاحظات إضافية…", en: "Additional notes…" } },
  ];

  return (
    <>
      <PageHero eyebrow={c.hero.eyebrow} title={c.hero.title} subtitle={c.hero.subtitle} tone="navy" />

      {/* Why partner */}
      <SectionShell tone="white">
        <PageContainer className="space-y-10">
          <SectionHeading title={c.whyPartner.title.ar} align="center" />
          <AnimatedStagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {c.whyPartner.items.map((item, i) => (
              <AnimatedStaggerItem key={i}>
                <Card className="h-full p-6 border-border bg-card shadow-sm">
                  <CheckCircle2 className="size-8 text-brand-teal-strong mb-3" />
                  <h3 className="text-sm font-bold text-primary mb-1">{item.title.ar}</h3>
                  <p className="text-xs text-muted-foreground">{item.description.ar}</p>
                </Card>
              </AnimatedStaggerItem>
            ))}
          </AnimatedStagger>
        </PageContainer>
      </SectionShell>

      {/* Delivery models + Benefits */}
      <SectionShell tone="default">
        <PageContainer className="space-y-10">
          <SectionHeading title={c.deliveryModels.title.ar} align="center" />
          <div className="grid gap-5 sm:grid-cols-3">
            {c.deliveryModels.items.map((m, i) => (
              <Card key={i} className="p-6 border-border bg-card shadow-sm">
                <span className="flex size-8 items-center justify-center rounded-full bg-secondary text-primary font-bold text-sm mb-3">{i + 1}</span>
                <h3 className="text-sm font-bold text-primary mb-1">{m.title.ar}</h3>
                <p className="text-xs text-muted-foreground">{m.description.ar}</p>
              </Card>
            ))}
          </div>
        </PageContainer>
      </SectionShell>

      {/* Benefits split */}
      <SectionShell tone="white">
        <PageContainer>
          <SectionHeading title={c.benefits.title.ar} align="center" className="mb-8" />
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="p-6 border-border bg-card shadow-sm">
              <h3 className="text-lg font-bold text-primary mb-4">{c.benefits.schoolBenefits.title.ar}</h3>
              <ul className="space-y-2">
                {c.benefits.schoolBenefits.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="size-4 text-success shrink-0" />
                    {item.ar}
                  </li>
                ))}
              </ul>
            </Card>
            <Card className="p-6 border-border bg-card shadow-sm">
              <h3 className="text-lg font-bold text-primary mb-4">{c.benefits.studentBenefits.title.ar}</h3>
              <ul className="space-y-2">
                {c.benefits.studentBenefits.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="size-4 text-success shrink-0" />
                    {item.ar}
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </PageContainer>
      </SectionShell>

      {/* Process */}
      <SectionShell tone="default">
        <PageContainer className="space-y-10">
          <SectionHeading title={c.process.title.ar} align="center" />
          <div className="max-w-3xl mx-auto">
            <ProcessTimeline steps={c.process.steps} />
          </div>
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
              <div className="mt-4">
                <Button asChild variant="outline" size="lg" className="w-full">
                  <a href={`https://wa.me/${site.whatsapp.replace(/[^0-9]/g, "")}`} className="inline-flex items-center gap-2">
                    <MessageCircle className="size-4" />
                    تواصل عبر واتساب
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </PageContainer>
      </SectionShell>
    </>
  );
}
