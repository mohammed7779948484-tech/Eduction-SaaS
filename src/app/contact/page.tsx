"use client";

import { z } from "zod";
import { PageHero } from "@/components/brand/page-hero";
import { SectionShell } from "@/components/layout/section-shell";
import { PageContainer } from "@/components/layout/page-container";
import { PrototypeForm } from "@/components/brand/prototype-form";
import { BranchCard } from "@/components/brand/branch-card";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, Phone, Mail, MapPin, Facebook, Instagram, Youtube } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { contactContent } from "@/content/contact";
import { site } from "@/content/site";

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  subject: z.string().min(1),
  message: z.string().min(1),
});

export default function ContactPage() {
  const c = contactContent;
  const methodIcons = { whatsapp: MessageCircle, phone: Phone, mail: Mail };
  const fields = [
    { name: "name", label: c.form.name, type: "text" as const, required: true, autoComplete: "name", placeholder: { ar: "اسمك", en: "Your name" } },
    { name: "email", label: c.form.email, type: "email" as const, required: true, autoComplete: "email", placeholder: { ar: "example@mail.com", en: "example@mail.com" } },
    { name: "subject", label: c.form.subject, type: "text" as const, required: true, placeholder: { ar: "موضوع الرسالة", en: "Subject" } },
    { name: "message", label: c.form.message, type: "textarea" as const, required: true, placeholder: { ar: "اكتب رسالتك…", en: "Write your message…" } },
  ];

  return (
    <>
      <PageHero eyebrow={c.hero.eyebrow} title={c.hero.title} subtitle={c.hero.subtitle} tone="navy" />

      {/* Contact methods */}
      <SectionShell tone="white">
        <PageContainer>
          <h2 className="sr-only">{`طرق التواصل`}</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {c.methods.map((m, i) => {
              const Icon = methodIcons[m.icon as keyof typeof methodIcons];
              return (
                <Card key={i} className="p-6 border-border bg-card shadow-sm text-center">
                  <span className="flex size-12 items-center justify-center rounded-full bg-secondary text-primary mx-auto mb-3">
                    <Icon className="size-6" />
                  </span>
                  <h3 className="text-sm font-bold text-primary mb-1">{m.title.ar}</h3>
                  <a href={m.href} className="text-sm text-brand-teal-strong hover:underline" dir="ltr">{m.value}</a>
                </Card>
              );
            })}
          </div>
        </PageContainer>
      </SectionShell>

      {/* Branches */}
      <SectionShell tone="default">
        <PageContainer className="space-y-8">
          <h2 className="text-xl font-bold text-primary flex items-center gap-2">
            <MapPin className="size-5 text-brand-teal-strong" />
            فروعنا
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {c.branches.map((b, i) => (
              <BranchCard key={i} city={b.city} area={b.area} hours={b.hours} />
            ))}
          </div>
        </PageContainer>
      </SectionShell>

      {/* Form + Common questions */}
      <SectionShell tone="white">
        <PageContainer>
          <h2 className="sr-only">{`نموذج التواصل والأسئلة`}</h2>
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Form */}
            <div>
              <h2 className="text-xl font-bold text-primary mb-4">{c.form.title.ar}</h2>
              <PrototypeForm fields={fields} submitLabel={c.form.submit} schema={schema} />
            </div>
            {/* Common questions */}
            <div>
              <h2 className="text-xl font-bold text-primary mb-4">{c.commonQuestions.title.ar}</h2>
              <Card className="p-6 border-border bg-card shadow-sm">
                <Accordion type="single" collapsible>
                  {c.commonQuestions.items.map((item, i) => (
                    <AccordionItem key={i} value={`item-${i}`}>
                      <AccordionTrigger className="text-start">{item.q.ar}</AccordionTrigger>
                      <AccordionContent>{item.a.ar}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </Card>
            </div>
          </div>
        </PageContainer>
      </SectionShell>

      {/* Social links */}
      <SectionShell tone="default" spacing="compact">
        <PageContainer className="text-center">
          <h2 className="text-lg font-bold text-primary mb-4">{c.social.title.ar}</h2>
          <div className="flex items-center justify-center gap-4">
            {c.social.items.map((s, i) => (
              <a
                key={i}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.name.ar}
                className="flex size-12 items-center justify-center rounded-full bg-secondary text-primary hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                {s.icon === "facebook" && <Facebook className="size-5" />}
                {s.icon === "instagram" && <Instagram className="size-5" />}
                {s.icon === "youtube" && <Youtube className="size-5" />}
              </a>
            ))}
          </div>
        </PageContainer>
      </SectionShell>
    </>
  );
}
