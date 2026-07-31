"use client";

import { useEffect, useState } from "react";
import { SectionShell } from "@/components/layout/section-shell";
import { PageContainer } from "@/components/layout/page-container";
import { SectionHeading } from "@/components/brand/section-heading";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { TestimonialCard } from "@/components/brand/testimonial-card";
import { testimonialsHeading, testimonials } from "@/content/testimonials";
import { useLanguage } from "@/components/layout/language-provider";
import { cn } from "@/lib/utils";

export function Testimonials() {
  const { lang } = useLanguage();
  const [api, setApi] = useState<CarouselApi | undefined>();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setActive(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <SectionShell tone="tint" as="section">
      <PageContainer className="space-y-10 sm:space-y-12">
        <SectionHeading
          eyebrow={lang === "ar" ? "تجارب حقيقية" : "Real experiences"}
          title={testimonialsHeading[lang]}
        />
        <Carousel
          opts={{ loop: true, direction: lang === "ar" ? "rtl" : "ltr", align: "start" }}
          setApi={setApi}
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
        {/* pagination dots — always visible (mobile-friendly position indicator), 44px touch targets */}
        <div className="flex items-center justify-center gap-1" role="tablist" aria-label={lang === "ar" ? "الشهادات" : "Testimonials"}>
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              tabIndex={active === i ? 0 : -1}
              aria-selected={active === i}
              aria-label={lang === "ar" ? `شهادة ${i + 1}` : `Testimonial ${i + 1}`}
              onClick={() => api?.scrollTo(i)}
              className="size-11 flex items-center justify-center rounded-full focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-hidden"
            >
              <span
                className={cn(
                  "rounded-full transition-all duration-300",
                  active === i ? "bg-accent size-2.5" : "bg-border size-2 hover:bg-brand-grey-text"
                )}
              />
            </button>
          ))}
        </div>
      </PageContainer>
    </SectionShell>
  );
}
