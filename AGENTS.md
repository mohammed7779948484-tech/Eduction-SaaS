# AGENTS.md — Repository Operating Manual for Coding Agents

> Concise operational manual. Not a copy of the proposal or DESIGN.md.
> Read this BEFORE editing anything. Read `DESIGN.md` before any visual work.

## 1. Project Purpose

A high-fidelity interactive **frontend prototype** of the public institutional website for **برنامج الحساب الذهني (Mental Arithmetic Program — Soroban, Yemen)**. Purpose: client presentation to approve visual identity + homepage direction + commercial contract. **Not production.** Production will be a separate project after approval.

## 2. Prototype Scope (HARD)

- **Implemented:** source understanding, repo audit, skills, dependency cleanup, documentation, design system (DESIGN.md + tokens + `/design-system` page), shared layout, **homepage only**.
- **Forbidden:** other pages (About, Program, Channels, Virtual Platform, Contact, Schools, Trainer, FAQ, Privacy), database, Prisma, auth, backend, CMS, real APIs, payments, real AI assistant, real form submission. **Exception:** lightweight coming-soon placeholder routes for future pages are allowed (e.g. `/register` is a coming-soon shell, not a real form — per master task §20).

## 3. Source-of-Truth Hierarchy

1. `docs/SOURCE_OF_TRUTH.md` — every source, conflict, assumption.
2. Client DOCX (`upload/Document (1) (4).docx`) + homepage reference JPG → **visual identity & homepage direction**.
3. Phase 1 PDF (`upload/Phase1_Proposal_MentalArithmetic.pdf`) → **business goals, audiences, content, future page scope**.
4. Scaffold defaults are **not authoritative**.

## 4. Technology Stack

- Next.js 16 (App Router) · React 19 · TypeScript 5 (strict)
- Tailwind CSS v4 (CSS-first `@theme` in `src/app/globals.css`, tokens in `src/styles/tokens.css`)
- shadcn/ui (New York) — 24 curated components in `src/components/ui/`
- Framer Motion (normal UI motion) + GSAP + @gsap/react (signature hero timeline only)
- Bun (package manager — NEVER use npm; preserve `bun.lock`)
- Arabic-first, RTL, light-only (no dark mode)

## 5. Repository Map

```
src/
├── app/                 # layout.tsx (RTL/Arabic), page.tsx (homepage), design-system/page.tsx
│   └── globals.css      # Tailwind v4 entry + @theme inline mapping
├── components/
│   ├── ui/              # 24 curated shadcn primitives
│   ├── brand/           # Logo, SectionHeading, StatCard, StepCard, ChannelCard, TestimonialCard (Button centralized in ui/button.tsx with `cta` variant)
│   ├── layout/          # SiteHeader, SiteFooter, PageContainer, SectionShell, CTASection, LanguageProvider/Toggle
│   ├── sections/        # homepage sections (hero, stats, how-it-works, channels, testimonials, cta)
│   └── motion/          # animated-reveal, animated-stagger, animated-counter, parallax-media
├── content/             # site.ts, home.ts, testimonials.ts, faq.ts (static demo content; navigation in lib/routes.ts)
├── lib/
│   ├── motion/          # tokens.ts, reduced-motion.ts (buildVariants), presets/{reveal,stagger,hover-lift,count-up}
│   ├── gsap/            # register.ts, hero-timeline.ts, scroll-scenes.ts
│   ├── routes.ts, utils.ts
├── styles/              # tokens.css (raw brand hex), typography.css
docs/                    # all project documentation
public/brand|images|illustrations|icons
```

## 6. Commands

```bash
bun run dev      # dev server on :3000 (logs to dev.log)
bun run lint     # ESLint
bun run build    # production build (do NOT run in prototype dev)
```
Type-check: `bunx tsc --noEmit` (or rely on `next build`).

## 7. Coding Conventions

- TypeScript throughout; `'use client'` only where interactivity/motion requires it; prefer Server Components.
- ES modules; `@/*` path alias → `./src/*`.
- Use existing shadcn primitives; do NOT recreate accessible primitives.
- Customize centralized brand components, not page-local alternatives.
- Logical CSS utilities only (`ms-`, `me-`, `ps-`, `pe-`, `start-`, `end-`) — never physical `left`/`right`.
- Static demo content lives in `src/content/*`; never inline data in JSX.
- Arabic-first copy; English is secondary.

## 8. Styling Rules

- **No raw brand hex outside `src/styles/tokens.css`.** Use semantic tokens (`bg-primary`, `text-cta`, `bg-brand-teal`).
- Token layers: raw brand (`--brand-*`) → semantic (`--background`, `--primary`, `--cta`, …) → Tailwind utilities via `@theme inline`.
- Orange (`--cta`) is **conversion-only**. Never decorative.
- Radius 12px (`--radius`); pills for badges.
- Section background alternation: `--background` (icy) ↔ white surfaces; navy reserved for hero + footer.

## 9. RTL Rules

- `<html lang="ar" dir="rtl">` is set in `layout.tsx` — never override to LTR.
- Mirror layouts, navigation, icons, progress indicators — not just text.
- Use logical properties everywhere.
- Touch targets ≥ 44px.

## 10. Animation Rules

- CSS/Tailwind: hover, color, shadow, focus, small transforms.
- Framer Motion: reveal, stagger, entrances, layout, carousel, viewport-triggered.
- **GSAP: signature sequences only** (hero timeline, abacus animation). Never for ordinary reveals. Only via `src/lib/gsap/` (centralized, with `useGSAP` + cleanup + reduced-motion fallback).
- No page-local motion constants — use `src/lib/motion/tokens.ts`.
- Do NOT animate Arabic text character-by-character (use line/word-group/block).
- Respect `prefers-reduced-motion` (global rule in `globals.css`).

## 11. Accessibility

- Semantic HTML (`main`, `header`, `nav`, `section`, `article`, `footer`).
- ARIA roles/labels where needed; `sr-only` for screen-reader text.
- Alt text (Arabic) for all images.
- Visible focus states (`:focus-visible` ring = `--ring`).
- Keyboard navigable; contrast ≥ WCAG AA.

## 12. Asset Rules

- No scaffold logo. Use brand logo treatment in `src/components/brand/`.
- Prefer CSS/SVG abacus-inspired graphics over stock photos.
- Centralized in `public/brand|images|illustrations|icons`.
- Easy to replace (logo is placeholder — client vector not yet provided).

## 13. Dependency Policy

- No unreviewed heavy deps. No DB/auth/CMS/backend SDKs.
- Keep `framer-motion` (do NOT migrate to `motion`). GSAP only for hero.
- Preserve `bun.lock`; never generate `package-lock.json`.

## 14. Skill-Usage Rules

- Use installed/approved skills when their trigger applies (see `docs/SKILLS.md`).
- `agent-browser` skill for visual verification.
- Primary agent owns implementation; subagents review only.

## 15. Subagent-Review Rules

- Subagents inspect, compare, test, challenge, report — they do NOT implement.
- Findings use severity: BLOCKER / CRITICAL / MAJOR / MINOR / SUGGESTION.
- Each finding: severity, evidence, affected file/component, violated rule, recommended fix, blocks-completion?
- Primary agent evaluates every finding; may reject with a recorded reason.
- Outcomes logged in `docs/REVIEW_LOG.md`.

## 16. Forbidden Implementation Patterns

- Hardcoded brand hex in pages/feature components.
- Arbitrary new button implementations (use the centralized `Button` — shadcn, with `cta` variant).
- Duplicated card primitives. Page-local design tokens. Page-local motion constants.
- Direct GSAP imports outside `src/lib/gsap/`.
- Invented production functionality. Fake backend endpoints. DB. Auth. CMS. Real AI assistant.
- English-first layout. Forced LTR assumptions. Excessive client components.
- Animation ignoring reduced-motion. Flat-image recreation of the homepage.
- Automatic implementation of remaining pages.

## 17. Definition of Done (per milestone)

- Lint clean · TypeScript clean · dev server boots · no console/hydration errors.
- Renders correctly at mobile + tablet + laptop + desktop (no overflow).
- RTL correct · accessible · reduced-motion works.
- Documentation matches code · source-aligned · no unresolved BLOCKER/CRITICAL/MAJOR.
