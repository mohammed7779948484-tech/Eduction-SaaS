"use client";

import { z } from "zod";
import { PageHero } from "@/components/brand/page-hero";
import { SectionShell } from "@/components/layout/section-shell";
import { PageContainer } from "@/components/layout/page-container";
import { PrototypeForm } from "@/components/brand/prototype-form";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, GraduationCap, UserPlus } from "lucide-react";
import { registrationContent } from "@/content/registration";
import { site } from "@/content/site";

const schema = z.object({
  parentName: z.string().min(1),
  parentPhone: z.string().min(1),
  parentEmail: z.string().email(),
  studentName: z.string().min(1),
  studentAge: z.string().min(1),
  channel: z.string().min(1),
  branch: z.string().min(1),
  schedule: z.string().min(1),
  consent: z.boolean().refine((v) => v === true),
});

export default function RegisterPage() {
  const c = registrationContent;
  const fields = [
    { name: "parentName", label: c.form.parentName, type: "text" as const, required: true, autoComplete: "name", placeholder: { ar: "الاسم الكامل", en: "Full name" } },
    { name: "parentPhone", label: c.form.parentPhone, type: "tel" as const, required: true, autoComplete: "tel", placeholder: { ar: "+967…", en: "+967…" } },
    { name: "parentEmail", label: c.form.parentEmail, type: "email" as const, required: true, autoComplete: "email", placeholder: { ar: "example@mail.com", en: "example@mail.com" } },
    { name: "studentName", label: c.form.studentName, type: "text" as const, required: true, placeholder: { ar: "اسم الطفل", en: "Child name" } },
    { name: "studentAge", label: c.form.studentAge, type: "select" as const, required: true, placeholder: { ar: "اختر العمر", en: "Select age" }, options: [
      { value: "7", label: { ar: "7 سنوات", en: "7 years" } },
      { value: "8", label: { ar: "8 سنوات", en: "8 years" } },
      { value: "9", label: { ar: "9 سنوات", en: "9 years" } },
      { value: "10", label: { ar: "10 سنوات", en: "10 years" } },
      { value: "11", label: { ar: "11 سنة", en: "11 years" } },
      { value: "12", label: { ar: "12 سنة", en: "12 years" } },
    ] },
    { name: "channel", label: c.form.channel, type: "select" as const, required: true, placeholder: { ar: "اختر القناة", en: "Select channel" }, options: c.channels },
    { name: "branch", label: c.form.branch, type: "select" as const, required: true, placeholder: { ar: "اختر الفرع", en: "Select branch" }, options: c.branches },
    { name: "schedule", label: c.form.schedule, type: "select" as const, required: true, placeholder: { ar: "اختر الوقت", en: "Select schedule" }, options: c.schedules },
    { name: "consent", label: c.form.consent, type: "checkbox" as const, required: true },
  ];

  const sections = [
    { title: c.form.parentSection, fields: ["parentName", "parentPhone", "parentEmail"] },
    { title: c.form.studentSection, fields: ["studentName", "studentAge"] },
    { title: c.form.preferencesSection, fields: ["channel", "branch", "schedule", "consent"] },
  ];

  return (
    <>
      <PageHero eyebrow={c.hero.eyebrow} title={c.hero.title} subtitle={c.hero.subtitle} tone="navy" />

      {/* Options */}
      <SectionShell tone="white">
        <PageContainer>
          <div className="grid gap-6 sm:grid-cols-2">
            <Card className="p-6 border-border bg-card shadow-sm">
              <GraduationCap className="size-10 text-brand-teal-strong mb-3" />
              <h2 className="text-lg font-bold text-primary mb-1">{c.options.trialTitle.ar}</h2>
              <p className="text-sm text-muted-foreground">{c.options.trialDesc.ar}</p>
            </Card>
            <Card className="p-6 border-border bg-card shadow-sm">
              <UserPlus className="size-10 text-brand-teal-strong mb-3" />
              <h2 className="text-lg font-bold text-primary mb-1">{c.options.registerTitle.ar}</h2>
              <p className="text-sm text-muted-foreground">{c.options.registerDesc.ar}</p>
            </Card>
          </div>
        </PageContainer>
      </SectionShell>

      {/* Form */}
      <SectionShell tone="default">
        <PageContainer width="narrow">
          <h2 className="sr-only">{`نموذج التسجيل`}</h2>
          <PrototypeForm fields={fields} submitLabel={c.form.submit} schema={schema} sections={sections} />
          {/* WhatsApp alternative */}
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground mb-3">{c.form.whatsappAlt.ar}</p>
            <Button asChild variant="outline" size="lg">
              <a href={`https://wa.me/${site.whatsapp.replace(/[^0-9]/g, "")}`} className="inline-flex items-center gap-2">
                <MessageCircle className="size-4" />
                {site.whatsapp}
              </a>
            </Button>
          </div>
        </PageContainer>
      </SectionShell>
    </>
  );
}
