# Page Specifications (Future Pages — NOT implemented)

> All future pages derived from the Phase 1 proposal + DOCX. **None are implemented
> in this task.** This document is the implementation contract for later phases.
> Each future page MUST reuse the design system demonstrated at `/design-system`.

## Recommended implementation order (next phases)
1. من نحن (About) — vision, methodology, lead trainer, child-protection.
2. البرنامج (Program) — Soroban method, 10 levels, ages, results, FAQ.
3. القنوات (Learning Channels) — in-center / schools / online comparison.
4. تواصل معنا (Contact) — branches, map, WhatsApp, help form.
5. التسجيل (Registration) — registration + trial booking + pricing.
6. المنصة الافتراضية (Virtual Platform gateway) — Phase 2 link.
7. Privacy / Terms — legal.

## Page specs

### 1. الرئيسية (Home) — IMPLEMENTED
See homepage (8 sections). The reference for all future pages.

### 2. من نحن (About)
- Hero: vision statement.
- Methodology: Soroban pedagogy, learning philosophy.
- Lead trainer: profile + credentials.
- Child-protection commitment: policy summary + trust signals.
- CTA: trial lesson.
- Reuse: SectionHeading, CTASection, StatCard.

### 3. البرنامج (Program)
- Soroban method explainer (abacus graphic).
- 10 levels: progression table/cards (Level 1 → 10).
- Age groups: 7–12 mapping to levels.
- Results: illustrative outcomes (clearly demo).
- FAQ: Accordion (reuse shadcn accordion).
- CTA: trial lesson.

### 4. القنوات (Learning Channels)
- 3 channels side-by-side: in-center, partner-schools, online.
- Comparison: format, schedule, age, location.
- ChannelCard component (one shared, controlled variation) — already built for homepage.
- Per-channel detail (future sub-routes).

### 5. تواصل معنا (Contact)
- Branches list + map (placeholder).
- WhatsApp button.
- Help form (react-hook-form + zod, local validation, success toast — no server).
- Reuse: Form, Input, Textarea, Select, Label, Checkbox.

### 6. التسجيل (Registration)
- Registration form (multi-step or single).
- Trial-lesson booking (date/time selection — future; Calendar component deferred).
- Pricing: 3 packages (Essential/Professional/Premium) in YER + USD ref.
- Payment: **Phase 2** — placeholder/coming-soon in prototype.

### 7. المنصة الافتراضية (Virtual Platform)
- Gateway page linking to the Phase 2 e-learning platform.
- Coming-soon state in prototype.

### 8. Privacy / Terms
- Legal text pages. Static.

## Shared components every page reuses
SiteHeader, SiteFooter, PageContainer, SectionShell, SectionHeading, CTASection, centralized `Button` (cta variant), brand tokens, motion presets. **No page may introduce local primitives or tokens.**
