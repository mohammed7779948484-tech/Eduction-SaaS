import type { Metadata } from "next";
import { PageHero } from "@/components/brand/page-hero";
import { SectionShell } from "@/components/layout/section-shell";
import { PageContainer } from "@/components/layout/page-container";
import { TableOfContents } from "@/components/brand/table-of-contents";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";
import { legalContent } from "@/content/legal";

export const metadata: Metadata = {
  title: "الخصوصية والشروط",
  description: "سياسة الخصوصية وحماية الطفل والشروط — مسوّدة تجريبية.",
};

export default function PrivacyPage() {
  const c = legalContent;
  const tocItems = c.sections.map((s) => ({ id: s.id, label: s.title }));

  return (
    <>
      <PageHero eyebrow={c.hero.eyebrow} title={c.hero.title} subtitle={c.hero.subtitle} tone="navy" />

      {/* Draft notice */}
      <SectionShell tone="white" spacing="compact">
        <PageContainer className="max-w-4xl">
          <Alert className="border-warning/30 bg-warning/10">
            <Info className="size-4 text-warning" />
            <AlertDescription className="text-sm text-foreground">
              {c.draftNotice.ar}
            </AlertDescription>
          </Alert>
          <p className="mt-3 text-xs text-muted-foreground">{c.lastUpdated.ar}</p>
        </PageContainer>
      </SectionShell>

      {/* TOC + content */}
      <SectionShell tone="default">
        <PageContainer className="max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
            {/* Sticky TOC */}
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <TableOfContents items={tocItems} />
              </div>
            </aside>

            {/* Content sections */}
            <div className="max-w-3xl space-y-10">
              {c.sections.map((section) => (
                <section key={section.id} id={section.id} tabIndex={-1} className="scroll-mt-24 focus:outline-none">
                  <h2 className="text-xl sm:text-2xl font-bold text-primary mb-3 border-b border-border pb-2">
                    {section.title.ar}
                  </h2>
                  <p className="text-base text-foreground leading-relaxed text-pretty">
                    {section.body.ar}
                  </p>
                </section>
              ))}
            </div>
          </div>
        </PageContainer>
      </SectionShell>
    </>
  );
}
