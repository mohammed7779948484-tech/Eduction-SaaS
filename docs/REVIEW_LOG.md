# Review Log

> Every review cycle recorded here (master task §7). Severity: BLOCKER / CRITICAL / MAJOR / MINOR / SUGGESTION.
> 7 specialist subagents reviewed the implementation; the primary agent applied accepted fixes.

---

## Cycle 1 — M2 Dependency cleanup (primary self-review)
Reviewer: Primary
Findings (all resolved): `layout.tsx` imported deleted toaster → switched to sonner; `sonner.tsx` imported removed `next-themes` → light-only; `tailwind.config.ts` imported removed `tailwindcss-animate` → deleted (Tailwind v4 CSS-first).
Verification: `bun run lint` exit 0; dev server Ready in 647ms; grep confirms no broken imports.

---

## Cycle 2 — M5–M7 Specialist Review (7 subagents)

### Subagent 1 — Client Source & Requirements Auditor (8-a)
- [PASS] Section order, brand name, brand colors (exact hex), 3 channels, illustrative stats, Arabic terminology, age 7–12, no invented production claims.
- [MAJOR→FIXED] Orange CTA misused on language toggle → switched to `bg-primary`.
- [MAJOR→FIXED] Two orange CTAs in hero viewport → header CTA demoted to `variant="default"`.
- [BLOCKER→FIXED] `/register` dead link → created coming-soon page.
- [BLOCKER→FIXED] Final CTA button no action → wired to `/register` via `asChild` link.
- [MINOR→FIXED] Brand cards hardcoded `.ar` → wired `useLanguage` + `[lang]` indexing.
- [MINOR→FIXED] `#how-it-works` anchor broken → `SectionShell` now forwards `id`.
- [SUGGESTION→FIXED] `ctaHref` dead export → removed.

### Subagent 2 — Frontend Architecture & Dependency Reviewer (8-b)
- [PASS] No DB/Prisma/NextAuth/backend imports; no `/api` route; framer-motion (not `motion`); GSAP only in `src/lib/gsap/`; no duplicate button primitive; 24 shadcn components; no tailwindcss-animate; Caddyfile preserved.
- [MINOR→ACCEPTED] Raw hex in design-system showcase are documentation labels (not styling) — acceptable; kept.
- [MINOR→FIXED] `use-mobile.ts` orphan → deleted.
- [MINOR→FIXED] AGENTS.md §5 doc drift → corrected.
- [SUGGESTION] Split `DesignSystemShowcase` into server/client — deferred (acceptable for a reference page).

### Subagent 3 — Design-System & Brand Reviewer (8-c)
- [HIGH→FIXED] Language toggle `bg-cta` → `bg-primary`.
- [HIGH→FIXED] Dual orange CTAs → header CTA navy.
- [HIGH→FIXED] `--brand-grey-text` on white fails AA (4.42:1) → darkened to `#56636E` (≈5.0:1).
- [HIGH→FIXED] Teal-on-white fails AA → introduced `--brand-teal-strong` `#1F7D8C` for text on light; eyebrows/CTA labels use it.
- [HIGH→FIXED] `text-primary` on orange CTA fails → `text-cta-foreground`.
- [MEDIUM→FIXED] DESIGN.md contrast figures inaccurate → replaced with measured values.
- [MEDIUM→FIXED] `--warning` aliased orange → distinct amber `#D97706`.
- [MEDIUM→FIXED] `font-serif` on testimonial quote → dropped.
- [LOW→ACCEPTED] `--space-*` not exposed via @theme → documented as reference-only (Tailwind default scale used).
- [LOW→ACCEPTED] /design-system button-state/responsive/typography-group demos — reference page is comprehensive; minor polish deferred.

### Subagent 4 — Arabic RTL & Accessibility Reviewer (8-d)
- [CRITICAL→FIXED] `SheetContent side="start"` invalid (TS error) → `side={lang === "ar" ? "right" : "left"}`.
- [CRITICAL→FIXED] `SectionShell` dropped `id`/`aria-label` (TS error) → forwards rest props.
- [HIGH→FIXED] Teal-on-navy contrast → `text-brand-teal-pale` on navy.
- [HIGH→FIXED] Teal-on-white contrast → `text-brand-teal-strong`.
- [HIGH→FIXED] Navy-on-orange CTA contrast → `text-cta-foreground`.
- [MEDIUM→FIXED] No skip-to-content link → added skip link + `id="main"`.
- [MEDIUM→FIXED] Touch targets < 44px → hamburger `size-11`, toggle `min-h-9`, carousel buttons `size-11`, nav links `min-h-11`.
- [MEDIUM→FIXED] Carousel RTL physical positioning → logical `-start-12`/`-end-12` + conditional icons.
- [MEDIUM→FIXED] Sheet close button physical `right-4` → logical `end-4` + `focus-visible`.
- [MEDIUM→FIXED] ARIA labels not localized → localized.
- [MEDIUM→FIXED] Bilingual content not wired in cards → wired `[lang]`.
- [LOW→ACCEPTED] Carousel `opts.direction` change won't re-init Embla on toggle — rare edge case; deferred.
- [LOW→ACCEPTED] `[data-hero-anim]` opacity:0 risk if GSAP fails — addressed via parent-animation fix (see 8-e).

### Subagent 5 — Motion & Interaction Reviewer (8-e)
- [CRITICAL→FIXED] Hero headline + CTAs invisible to default-motion users (CSS hid parent `[data-hero-anim]` but GSAP only animated children; opacity multiplicative). Fix: GSAP now animates the parent elements (`[data-hero-title]`, `[data-hero-cta]`, etc.) with `fromTo` so inline opacity:1 overrides CSS. Runtime-verified: all hero opacities = 1.
- [MINOR→FIXED] Inline GSAP motion constants → now import `durations`/`stagger` from `tokens.ts` (GSAP string-easings kept inline, centralized).
- [MINOR→FIXED] Dead code `StatCardItem` → removed.
- [MINOR→ACCEPTED] `ParallaxMedia` + `useParallaxScene` reserved as documented architecture for future pages (kept; `useParallaxScene` stub noted as reserved).
- [PASS] GSAP only in `src/lib/gsap/`; signature sequences only; `useGSAP` scope+cleanup; reduced-motion respected at every layer; no Arabic per-character animation; count-up setState only in callback.

### Subagent 6 — Responsive Visual QA Reviewer (8-f)
- [HIGH→FIXED] Horizontal overflow at 375px (header too wide) → Logo made responsive (hide English subtitle < sm, smaller text); verified `scrollWidth=375, overflow=false`.
- [HIGH→FIXED] Carousel-arrow overflow at 640–863px → arrows now `hidden lg:flex` (swipe/drag below lg); verified `scrollWidth=768, overflow=false`.
- [MEDIUM→FIXED] Radix DialogContent a11y warning → added `SheetDescription` (sr-only).
- [MEDIUM→FIXED] Touch targets → bumped (see 8-d).
- [LOW→FIXED] `/register` sticky-footer padding → reduced to `py-12 sm:py-16`.
- [LOW→ACCEPTED] Carousel RTL arrow visual confirm at 768 — arrows hidden below lg; swipe works.
- [PASS] Hero stacks, stats 2×2→4×1, channels 1→3, mobile nav operable, zero console/hydration errors, /design-system no overflow, sticky footer OK.
- Prior-findings resolution visually confirmed (orange-CTA, /register, bilingual all resolved).

### Subagent 7 — Documentation & Consistency Reviewer (8-g)
- [MAJOR→FIXED] PROGRESS.md stale (M5–M7 marked not-started) → updated to done.
- [MAJOR→FIXED] IMPLEMENTATION_PLAN.md stale → updated.
- [MAJOR→FIXED] DESIGN.md "teal-pale on navy 13:1" overstated → corrected to 7.6:1.
- [MINOR→FIXED] `--brand-grey-text` hex mismatch (#6B7A86 in 3 docs vs #56636E in tokens) → updated DESIGN.md, SOURCE_OF_TRUTH, showcase.
- [MINOR→FIXED] `variants.ts` ghost in MOTION_GUIDELINES → corrected.
- [MINOR→FIXED] `navigation.ts` ghost in AGENTS.md §5 → corrected.
- [MINOR→FIXED] `BrandButton` ghost in AGENTS.md §16, PAGE_SPECS, IMPLEMENTATION_PLAN → "centralized Button (cta variant)".
- [MINOR→FIXED] QA_CHECKLIST /register exclusion → added coming-soon placeholder.
- [MINOR→FIXED] AGENTS.md §2 forbidden-pages → added coming-soon carve-out.
- [SUGGESTION→FIXED] DESIGN.md Layer A missing `--brand-teal-strong` → added.
- [PASS] Commands accurate; token values match; no cross-doc contradictions; no duplication; SKILLS commands valid; README preview instructions correct.

---

## Final Verification (Cycle 3 — regression)
- `bun run lint` → exit 0.
- `/`, `/register`, `/design-system` → all 200.
- Hero opacity runtime check → title/cta/eyebrow all = 1 (CRITICAL fix confirmed).
- 375px + 768px overflow check → `overflow: false` (HIGH fixes confirmed).
- VLM: hero headline + CTAs + abacus visible, correct RTL, no defects.
- Console: only HMR/DevTools info (no errors); no page errors.

## Remaining (accepted/deferred — non-blocking)
- `DesignSystemShowcase` single client component — acceptable for reference page (SUGGESTION, deferred).
- Carousel Embla re-init on live language toggle — rare edge case (LOW, deferred).
- `/design-system` demo content not fully localized to EN — reference page, Arabic-first (LOW, accepted).
- `ParallaxMedia`/`useParallaxScene` reserved architecture utilities (LOW, accepted).
- Next.js dev indicator "N" badge — dev-only, not in production build (LOW, accepted).

**All BLOCKER, CRITICAL, and MAJOR issues resolved. No unresolved blockers remain.**
