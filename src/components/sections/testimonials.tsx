"use client";

import { SectionShell } from "@/components/layout/section-shell";
import { PageContainer } from "@/components/layout/page-container";
import { SectionHeading } from "@/components/brand/section-heading";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { TestimonialCard } from "@/components/brand/testimonial-card";
import { testimonialsHeading, testimonials } from "@/content/testimonials";
import { useLanguage } from "@/components/layout/language-provider";

export function Testimonials() {
  const { lang } = useLanguage();
  return (
    <SectionShell tone="tint" as="section">
      <PageContainer className="space-y-10 sm:space-y-12">
        <SectionHeading
          eyebrow={lang === "ar" ? "تجارب حقيقية" : "Real experiences"}
          title={testimonialsHeading[lang]}
        />
        <Carousel
          opts={{ loop: true, direction: lang === "ar" ? "rtl" : "ltr", align: "start" }}
          className="w-full max-w-3xl mx-auto"
        >
          <CarouselContent className="-ms-2 ps-2">
            {testimonials.map((t, i) => (
              <CarouselItem key={i} className="pe-2">
                <TestimonialCard testimonial={t} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden lg:flex" />
          <CarouselNext className="hidden lg:flex" />
        </Carousel>
      </PageContainer>
    </SectionShell>
  );
}
