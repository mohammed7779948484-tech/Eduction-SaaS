# Implementation Plan

> Milestone sequence with quality gates (master task §9). Primary agent implements;
> subagents review at the marked gates.

## Milestones

| # | Milestone | Gate | Status |
|---|-----------|------|--------|
| M1 | Source understanding | Gate 1 | ✅ Done |
| M2 | Repository + dependency audit | Gate 2 | ✅ Done |
| M3 | Documentation foundation | Gate 3 | ✅ Done |
| M4 | Design constitution (DESIGN.md + tokens) | Gate 4 | ✅ Done |
| M5 | Design-system implementation + `/design-system` page | Gate 5 | ✅ Done |
| M6 | Shared layout components | — | ✅ Done |
| M7 | Homepage | Gate 6 | ✅ Done |
| M8 | Final consistency + verification | Gate 7 | ⏳ In progress (subagent reviews done; fixes applied; final verify pending) |

## Per-milestone loop (master task §8)
A. Source alignment → B. Primary implementation → C. Primary self-review → D. Specialist reviews (relevant only) → E. Consolidate findings → F. Apply corrections → G. Re-verify → H. Repeat until gate met.

## M5 — Design-system page
- Build `/design-system` demonstrating: palette (brand + semantic), typography (Arabic headings, body, captions, numerals), spacing, containers, radius, shadows, button variants/states, badges, cards, form fields, accordion, tabs, dialog/sheet, nav patterns, icons, stats, testimonials, CTA section, Framer presets, GSAP signature example, reduced-motion, mobile + desktop examples.
- Reviewers: design-system, RTL/a11y, motion, documentation, visual QA.

## M6 — Shared layout
- SiteHeader (desktop nav + mobile Sheet RTL nav + logo + primary CTA + AR/EN toggle).
- SiteFooter (branches, child-protection, lang switch, nav).
- PageContainer, SectionShell, SectionHeading, CTASection.
- Brand components: centralized `Button` (cta variant), StatCard, StepCard, ChannelCard, TestimonialCard.
- Future nav items: disabled / coming-soon, no broken behavior.

## M7 — Homepage
- Sections: Header → Hero (GSAP timeline, abacus visual, single orange CTA) → Stats (count-up) → How-it-works (4 steps, staggered) → Channels (3, shared component) → Testimonials (carousel) → Final CTA (orange) → Footer.
- Demo content in `src/content/*` (clearly illustrative).
- RTL, responsive (mobile→desktop), reduced-motion fallback.

## M8 — Final
- Lint, typecheck, build, runtime, browser verification at 6 viewports.
- No DB/auth/backend imports. No raw hex outside tokens. No direct GSAP outside lib/gsap.
- Source reconciliation. Final report.
