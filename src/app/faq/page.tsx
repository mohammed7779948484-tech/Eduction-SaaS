"use client";

import { useState, useMemo } from "react";
import { PageHero } from "@/components/brand/page-hero";
import { SectionShell } from "@/components/layout/section-shell";
import { PageContainer } from "@/components/layout/page-container";
import { SectionHeading } from "@/components/brand/section-heading";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqCategories, faqPageContent } from "@/content/faq-page";

export default function FaqPage() {
  const c = faqPageContent;
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return faqCategories;
    const q = query.toLowerCase();
    return faqCategories
      .map((cat) => ({
        ...cat,
        items: cat.items.filter(
          (item) =>
            item.q.ar.toLowerCase().includes(q) ||
            item.q.en.toLowerCase().includes(q) ||
            item.a.ar.toLowerCase().includes(q) ||
            item.a.en.toLowerCase().includes(q)
        ),
      }))
      .filter((cat) => cat.items.length > 0);
  }, [query]);

  const hasResults = filtered.length > 0;

  return (
    <>
      <PageHero eyebrow={c.hero.eyebrow} title={c.hero.title} subtitle={c.hero.subtitle} tone="navy" />

      {/* Search */}
      <SectionShell tone="white" spacing="compact">
        <PageContainer className="max-w-2xl">
          <div className="relative">
            <Search className="absolute start-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder={c.searchPlaceholder.ar}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="ps-11 h-12 text-base"
              aria-label={c.searchPlaceholder.ar}
            />
          </div>
        </PageContainer>
      </SectionShell>

      {/* Categories */}
      <SectionShell tone="default">
        <PageContainer className="max-w-3xl space-y-8">
          <h2 className="sr-only">{`فئات الأسئلة`}</h2>
          {hasResults ? (
            filtered.map((cat) => (
              <div key={cat.id} className="space-y-4">
                <div className="flex items-center gap-2">
                  <Badge className="bg-secondary text-primary">{cat.title.ar}</Badge>
                  <span className="text-xs text-muted-foreground">{cat.items.length} {`سؤال`}</span>
                </div>
                <Card className="p-4 sm:p-6 border-border bg-card shadow-sm">
                  <Accordion type="single" collapsible>
                    {cat.items.map((item, i) => (
                      <AccordionItem key={i} value={`${cat.id}-${i}`}>
                        <AccordionTrigger className="text-start">{item.q.ar}</AccordionTrigger>
                        <AccordionContent>{item.a.ar}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </Card>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">{c.noResults.ar}</p>
              <Button asChild variant="default" size="lg" className="mt-4">
                <a href="/contact">{c.contactCta.ar}</a>
              </Button>
            </div>
          )}
        </PageContainer>
      </SectionShell>

      {/* Contact CTA */}
      {hasResults && (
        <SectionShell tone="white" spacing="compact">
          <PageContainer className="max-w-2xl text-center">
            <SectionHeading title={c.contactCta.ar} align="center" />
            <div className="mt-4">
              <Button asChild variant="cta" size="lg">
                <a href="/contact">تواصل معنا</a>
              </Button>
            </div>
          </PageContainer>
        </SectionShell>
      )}
    </>
  );
}
