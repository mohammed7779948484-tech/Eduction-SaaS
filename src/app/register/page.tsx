"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageContainer } from "@/components/layout/page-container";
import { useLanguage } from "@/components/layout/language-provider";

export default function RegisterComingSoon() {
  const { lang } = useLanguage();
  return (
    <section className="py-12 sm:py-16">
      <PageContainer className="text-center space-y-6 max-w-xl">
        <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-sm font-bold text-primary">
          {lang === "ar" ? "قريباً" : "Coming soon"}
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-primary text-balance">
          {lang === "ar" ? "التسجيل وحجز الحصة التجريبية" : "Registration & trial-lesson booking"}
        </h1>
        <p className="text-muted-foreground text-pretty">
          {lang === "ar"
            ? "هذه الصفحة من المرحلة الأولى للموقع التجريبي وستُفعّل لاحقاً. تواصل معنا عبر الواتساب لحجز حصّتك التجريبية المجانية."
            : "This page is part of the prototype's first phase and will be activated later. Contact us via WhatsApp to book your free trial lesson."}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Button asChild variant="cta" size="xl">
            <a href="/" className="inline-flex items-center gap-2">
              {lang === "ar" ? "العودة للرئيسية" : "Back to home"}
              <ArrowRight className="size-4 rtl:rotate-180" />
            </a>
          </Button>
        </div>
      </PageContainer>
    </section>
  );
}
