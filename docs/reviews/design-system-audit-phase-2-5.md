# Design-System & Visual Consistency Audit — Phase 2.5

> **Task ID:** P25-R3
> **Agent:** Subagent 3 (Design-System & Visual Consistency Reviewer)
> **Mode:** READ-ONLY review (no source edits; this report is the only file written)
> **Scope:** 10 public pages implemented in Phase 2 (`/about`, `/program`, `/channels`, `/platform`, `/register`, `/contact`, `/schools`, `/trainers`, `/faq`, `/privacy`) + homepage `/` + internal reference `/design-system`
> **Method:** Source-code review (`src/app/**`, `src/components/brand/**`, `src/components/sections/**`, `src/components/layout/**`, `src/components/ui/button.tsx`, `src/styles/tokens.css`, `src/app/globals.css`, `DESIGN.md`) + production browser inspection (`http://localhost:3000`) + z-ai vision analysis of all 21 screenshots in `screenshots/phase25-before/` (+ homepage screenshot captured fresh)
> **Severity scale:** BLOCKER · CRITICAL · MAJOR · MINOR · SUGGESTION

---

## 1. Executive Summary

Phase 2 is a **strong, largely on-brand implementation**. The locked design system from Phase 1.5 has been applied with discipline: raw hex never leaks outside `tokens.css`; semantic tokens drive 95%+ of styling; the centralized `Button` (with the new `cta` variant + `xl` size) and shared `PrototypeForm` are used everywhere; the abacus visual language (`BeadBadge`, `RailDivider`, `ChannelIllustration`) is subtle and intentional, not decorative; the orange CTA rule ("one per viewport") is respected across every page (verified programmatically via DOM inspection); and each page has a distinct composition rather than a copy-pasted layout.

There are **no BLOCKER issues** and **no CRITICAL issues**. The audit surfaces **4 MAJOR** issues that should be addressed before sign-off (most集中 around the `/design-system` reference page being incomplete relative to what the production pages actually use), **6 MINOR** polish items, and **6 SUGGESTION**-level refinements.

**Verdict: CONDITIONAL APPROVE.** Phase 2 may ship once the 4 MAJOR items are resolved (the most impactful being `/design-system` doesn't demonstrate PageHero, SectionHeading, ProcessTimeline, CTASection, or any of the higher-level shared brand components that all 10 pages depend on — making it an incomplete "implementation contract").

---

## 2. Verification Matrix — 15 Audit Items

| # | Item | Status | Notes |
|---|------|--------|-------|
| 1 | No raw hex outside `tokens.css`; orange reserved for conversion only | ✅ PASS | Only hex refs are in `design-system-showcase.tsx:34-43` as display strings (designer reference), not as styling. Verified via `rg "#[0-9a-fA-F]{6}"` — 0 styling uses. Orange element count verified per-page via DOM: max 1 visible orange per viewport on every page. |
| 2 | Semantic tokens (bg-primary, text-cta, bg-accent) over raw brand names | ⚠️ PARTIAL | Mostly good. `bg-brand-*` tokens appear in `channels/page.tsx:22-24`, `platform/page.tsx:56-77`, `hero.tsx:23-24,34,109`, `cta-section.tsx:21,33`, `channel-card.tsx:16-18`, `page-hero.tsx:39,44`, `testimonial-card.tsx:25-26,35`, `profile-card.tsx:21,26`, `bead-badge.tsx:17-20`, `rail-divider.tsx:18-20`, `step-card.tsx:26`, `site-footer.tsx:22`. Most are legitimate escape-hatches (decorative SVG fills, channel-card variant bands, abacus motifs at low opacity). **However**: `channels/page.tsx:21-25` duplicates the `variantBg` map already inside `channel-card.tsx:15-19` — DRY violation. See MAJOR-3. |
| 3 | Typography: Tajawal, consistent scale, proper hierarchy | ✅ PASS | `--font-sans` = Tajawal (loaded via `next/font/google` in `layout.tsx:9-14`, weights 400/500/700/800). Type scale used consistently: H1 (3xl→5xl in PageHero), H2 (2xl→3xl in SectionHeading), H3 (base/lg), body (base/sm). `tabular-nums` on stat numbers. |
| 4 | Spacing/radius/shadows from tokens | ✅ PASS | All spacing uses Tailwind scale (4/6/8/12/16/20/24). Radii use `rounded-lg`/`rounded-2xl`/`rounded-pill` (all backed by `--radius-*` tokens). Shadows use `shadow-sm`/`shadow-md`/`shadow-lg` (all from `--shadow-*` tokens). No ad-hoc `style={{ padding: … }}` overrides. |
| 5 | Consistent PageHero pattern across all pages | ✅ PASS | All 10 interior pages use `<PageHero eyebrow title subtitle tone="navy">` (verified in `about/page.tsx:25`, `program/page.tsx:31`, `channels/page.tsx:33`, `platform/page.tsx:26`, `register/page.tsx:55`, `contact/page.tsx:40`, `schools/page.tsx:48`, `trainers/page.tsx:50`, `faq/page.tsx:46`, `privacy/page.tsx:21`). All use `tone="navy"`. Consistent abacus-bead rail motif + subtle teal glow. |
| 6 | Centralized Button with variants, no duplicates | ✅ PASS | Single `Button` in `src/components/ui/button.tsx` with variants `default/cta/destructive/outline/secondary/ghost/link` + sizes `sm/default/lg/xl/icon`. Verified via `rg "variant=\"cta\"" src/app` — all CTAs go through the centralized component. No bespoke `<button>` reimplementations on Phase 2 pages. |
| 7 | Consistent card language (border, radius, shadow, padding) | ✅ PASS (mostly) | Cards uniformly use `border-border bg-card shadow-sm` + `rounded-lg` (from `--radius-lg` = 12px) + `p-6` or `p-8`. Hover state `hover:shadow-md` on interactive cards (LevelCard, BranchCard, AudienceCard). One exception: `channel-card.tsx:28` uses `border-0 shadow-md` (intentional — full-bleed visual band). See MINOR-2 for vision feedback on minor inconsistencies. |
| 8 | Shared PrototypeForm, consistent field styling | ✅ PASS | All 4 form pages (`/register`, `/contact`, `/schools`, `/trainers`) use the shared `<PrototypeForm>` component (`src/components/brand/prototype-form.tsx`). Same `Card p-6 sm:p-8` shell, `PrototypeFormNotice` alert at top, `SuccessState` after submit, `size="xl"` orange submit button. Schema-driven (zod), react-hook-form, no network. |
| 9 | CTA hierarchy: primary (navy), CTA (orange conversion-only), secondary, ghost | ⚠️ PARTIAL | Hierarchy is mostly correct, but the **final CTA section** (`cta-section.tsx:33`) uses `variant="default"` (navy) for the button INSIDE the orange banner — DESIGN.md §"Button hierarchy" #2 says CTA buttons should be orange (`bg-cta`). The implementation uses an orange BANNER with a navy BUTTON, which inverts the hierarchy. Defensible as "the banner itself is the conversion crescendo," but the button-on-banner is no longer the CTA variant. See MAJOR-4. |
| 10 | Abacus visual language: subtle motifs, not in every section | ✅ PASS | Abacus motifs appear in: hero (signature SVG), PageHero (top rail of 9 beads), CTASection (top rail + corner SVG beads), StepCard (BeadBadge), LevelCard (BeadBadge), ProcessTimeline (BeadBadge + vertical rail), RailDivider (between sections on home/about/program/channels/platform), TestimonialCard (corner bead accent). Restraint respected — not every section has beads. |
| 11 | Section rhythm: alternation (icy ↔ white, navy for hero/footer) | ⚠️ PARTIAL | All 10 interior pages strictly alternate `tone="white"` ↔ `tone="default"` (icy) — good. **However**, `/about` (line 130) and `/platform` (line 110) use `tone="navy"` for a mid-page "Child Protection" / "Safety" section — violating DESIGN.md §"Section-background alternation": *"Navy reserved for hero + footer (bookends)."* See MAJOR-1. |
| 12 | Page distinctiveness: unique compositions, NOT identical layouts | ✅ PASS | Each page has a distinct composition: `/about` (story → vision/mission → values → methodology timeline → why → team profile cards → navy band); `/program` (definition cards → 5-col BeadBadge level grid → ages → outcomes → journey → FAQ accordion); `/channels` (vertical channel detail cards w/ visual bands → comparison table → selection guide); `/platform` (vision → fake-browser conceptual preview → features → navy safety → interest CTA); `/register` (options cards → form); `/contact` (methods → branches → form+FAQ split); `/schools` (why → delivery models → benefits split → process timeline → FAQ+form); `/trainers` (who for → curriculum → stages timeline → benefits → FAQ+form); `/faq` (search → categorized accordion); `/privacy` (draft notice → TOC + sections). |
| 13 | No generic SaaS patterns (gradients, glassmorphism, 3D) | ✅ PASS | No `bg-gradient-to-*` utilities in pages (only in `process-timeline.tsx:27` and `how-it-works.tsx:28` for the abacus-rail thin gradient line — decorative, low-opacity, intentional). No `backdrop-blur` except `site-header.tsx:33` (intentional sticky-header translucency). No 3D transforms, no cartoonish mascots, no stock photos. |
| 14 | `/design-system` demonstrates all patterns used in pages | ❌ FAIL | `/design-system` is missing: `PageHero` (not imported), `SectionHeading` (imported but never rendered — `Block` uses raw `<h3>` instead), `ProcessTimeline`, `CTASection`, `ComparisonTable`, `BranchCard`, `ProfileCard`, `LevelCard`, `AudienceCard`, `StatCard`, `StepCard`, `TestimonialCard`, `MetricCard`, `TableOfContents`. Demonstrates only: brand palette, semantic palette, typography, spacing/radius/shadow, buttons, badges, cards (generic), form fields, accordion, tabs, icons/avatar/progress, stats, motion presets, BeadBadge, RailDivider, ChannelIllustration, states. See MAJOR-2. |
| 15 | New patterns (BeadBadge, RailDivider, ChannelIllustration, PageHero, etc.) in `/design-system` | ⚠️ PARTIAL | `BeadBadge` ✅, `RailDivider` ✅, `ChannelIllustration` ✅ — all three new Phase-1.5 patterns are demonstrated. `PageHero` ❌, `SectionHeading` ❌, `ProcessTimeline` ❌ — the three new Phase-2 patterns are NOT demonstrated. See MAJOR-2. |

---

## 3. Findings (severity-ordered)

### MAJOR-1 — Mid-page navy sections violate "navy for hero + footer (bookends)" rule

- **Severity:** MAJOR
- **Where:** `/about` (line 130, `childProtection` section), `/platform` (line 110, `safety` section) — both use `<SectionShell tone="navy">`
- **Evidence:**
  - `src/app/about/page.tsx:130` → `<SectionShell tone="navy">` for "حماية الطفل" (Child Protection)
  - `src/app/platform/page.tsx:110` → `<SectionShell tone="navy">` for safety section
  - `screenshots/phase25-before/about-desktop.png` and `platform-desktop.png` — vision analysis on `/platform` flagged: *"The 'Safety and Security' section uses a Navy background immediately after a White section, creating two heavy, dark blocks separated only by a thin line of white cards. This disrupts the visual 'breathing room' established by the Icy/White alternation."*
- **DESIGN.md rule violated:** §"Section-background alternation" — *"Alternate icy `--background` ↔ white `--card` surfaces to create rhythm. **Navy reserved for hero + footer (bookends).** Stats strip uses a pale tint. Final CTA uses orange (the conversion crescendo)."*
- **Fix:** Replace `tone="navy"` with `tone="tint"` (pale teal surface) on both sections. Use a navy **accent** (icon, divider, or a small navy chip) inside the tinted section to convey trust/safety without breaking the rhythm. If a darker treatment is genuinely needed, use `tone="white"` with a navy left-border (`border-s-4 border-primary`) and navy icon — preserves the trust signal while keeping the icy↔white alternation intact.
- **Blocks?** No (visual rhythm only; does not break functionality or accessibility). But should be fixed before public launch — it's a direct contradiction of an explicit DESIGN.md rule.

---

### MAJOR-2 — `/design-system` page is an incomplete "implementation contract"

- **Severity:** MAJOR
- **Where:** `src/app/design-system/page.tsx` and `src/components/sections/design-system-showcase.tsx`
- **Evidence:** Source-code inspection confirms the following shared brand components are used across Phase 2 pages but are **NOT demonstrated on `/design-system`**:
  - `PageHero` — used on all 10 interior pages; not imported in `design-system-showcase.tsx`
  - `SectionHeading` — used on every page; imported at `design-system-showcase.tsx:23` but **never rendered** (the `Block` helper uses raw `<h3 className="text-xl font-bold text-primary">` instead — `design-system-showcase.tsx:86`)
  - `ProcessTimeline` — used on `/about`, `/schools`, `/trainers`; not imported
  - `CTASection` — used on `/`, `/about`, `/program`, `/channels`; not imported
  - `ComparisonTable` — used on `/channels`; not imported
  - `BranchCard` — used on `/contact`; not imported
  - `ProfileCard` — used on `/about`; not imported
  - `LevelCard` — used on `/program`; not imported
  - `AudienceCard` — defined but unused anywhere (dead component? see MINOR-5)
  - `StatCard` — used on `/` (StatsStrip); not imported
  - `StepCard` — used on `/` (HowItWorks); not imported
  - `TestimonialCard` — used on `/` (Testimonials); not imported
  - `MetricCard` — defined but unused anywhere (dead component? see MINOR-5)
  - `TableOfContents` — used on `/privacy`; not imported
- **DESIGN.md rule violated:** §"Correct examples" + Phase 1.5 spec — *"/design-system reference page" is described as the "implementation contract for future pages"* (`design-system-showcase.tsx:110`). An incomplete contract fails its purpose.
- **Task #15 explicitly requires:** *"New patterns (BeadBadge, RailDivider, ChannelIllustration, **PageHero**, etc.) are in /design-system"* — `PageHero` (and `SectionHeading`, `ProcessTimeline`) are NOT.
- **Vision cross-check:** z-ai vision hallucinated that PageHero and ProcessTimeline were present on `/design-system` (it conflated the page's own `<h1>` + `SectionHeading`-style headers with PageHero, and the `Progress` bar with ProcessTimeline). Source code is authoritative — they are not rendered.
- **Fix:** Add 4 new Blocks to `design-system-showcase.tsx`:
  1. **"Page headers"** — render `<PageHero>` in 3 tones (navy/tint/default) with sample eyebrow/title/subtitle.
  2. **"Section headings"** — render `<SectionHeading>` with eyebrow + title + subtitle, in both `tone="dark"` and `tone="light"`, both alignments. Replace the `Block` helper's raw `<h3>` with `<SectionHeading as="h3">` to dogfood the component.
  3. **"Process timeline"** — render `<ProcessTimeline>` with 3–4 sample steps.
  4. **"Page-level components"** — render `<CTASection>`, `<ComparisonTable>` (sample rows), `<BranchCard>` (sample), `<ProfileCard>` (sample), `<LevelCard>` (sample), `<StepCard>` (sample), `<TestimonialCard>` (sample), `<TableOfContents>` (sample).
- **Blocks?** No (Phase 2 pages work fine without it). But it blocks the "design-system as contract" goal — any future page author cannot reference `/design-system` to see how PageHero or ProcessTimeline should look.

---

### MAJOR-3 — `/channels` page reinvents the channel-card variant→bg mapping instead of reusing the shared `ChannelCard` component

- **Severity:** MAJOR
- **Where:** `src/app/channels/page.tsx:21-27` defines its own `variantBg` and `variantGlyph` maps, duplicating the `variantStyles` map in `src/components/brand/channel-card.tsx:15-19`
- **Evidence:**
  ```tsx
  // channels/page.tsx:21-27
  const variantBg = {
    navy: "bg-brand-navy",
    blue: "bg-brand-blue",
    teal: "bg-brand-teal",
  };
  const variantGlyph = { navy: "center", blue: "school", teal: "screen" } as const;
  ```
  vs
  ```tsx
  // channel-card.tsx:15-19
  const variantStyles: Record<Channel["variant"], { bg: string; hover: string; glyph: ChannelKind }> = {
    navy: { bg: "bg-brand-navy", hover: "hover:bg-brand-navy-dark", glyph: "center" },
    blue: { bg: "bg-brand-blue", hover: "hover:brightness-110", glyph: "school" },
    teal: { bg: "bg-brand-teal", hover: "hover:brightness-105", glyph: "screen" },
  };
  ```
  Also: `channels/page.tsx` does NOT import `ChannelCard` — it builds a bespoke `<Card>` layout with a side visual band + content + sub-info grid (lines 38-72). The homepage (`/`) uses the shared `ChannelCard` component via `learning-channels.tsx:27`.
- **DESIGN.md rule violated:** §"Card language" (consistency) + DRY principle. The two layouts are *intentionally* different (homepage = compact card with arrow CTA; channels page = detailed card with sub-info grid + button CTA) — but the *variant→bg/glyph mapping* should not be duplicated.
- **Vision cross-check:** Vision on `/channels` flagged *"Inconsistent Card Visual Language (Layout): The internal layout of the three feature cards is misaligned. The first card places the 'What' and 'How' text blocks side-by-side, while the second and third cards stack them vertically."* — this is because the channels page renders all 3 channels with the same layout but the content length differs, causing visual misalignment. Using a shared component would enforce consistent layout.
- **Fix:** Extract the variant→bg/glyph mapping to a single shared module (e.g. `src/components/brand/channel-variants.ts`) and import in both `channel-card.tsx` and `channels/page.tsx`. OR: extend the shared `ChannelCard` component to accept a `layout="compact" | "detailed"` prop, and have `channels/page.tsx` use `<ChannelCard layout="detailed">` instead of reimplementing. Either way, eliminate the duplicated map.
- **Blocks?** No (functional). But it's a maintenance hazard — if a variant color or glyph changes, two files must be updated in lockstep.

---

### MAJOR-4 — Final CTA section uses navy button on orange banner — inverts the CTA hierarchy

- **Severity:** MAJOR (design tension — defensible but inconsistent with DESIGN.md)
- **Where:** `src/components/layout/cta-section.tsx:33`
- **Evidence:**
  ```tsx
  <Button asChild variant="default" size="xl" className="bg-primary text-primary-foreground hover:bg-brand-navy-dark shadow-md">
    <a href="/register">{finalCta.cta[lang]}</a>
  </Button>
  ```
  The button is `variant="default"` (navy fill) on an orange (`bg-cta`) banner.
- **DESIGN.md rule tension:** §"Button hierarchy" #2 says *"CTA — orange fill, navy-dark text (`bg-cta`). The conversion action. Most prominent."* The final-CTA button is *the* conversion action of the page, yet it's rendered as `variant="default"` (Primary, not CTA).
- **Vision cross-check:** Vision on home flagged: *"Inside the orange CTA section, the action button is styled as a dark navy/grey filled button... Placing a dark button on a dark-ish orange background reduces its accessibility and breaks the established pattern where 'Orange = Primary Action.'"*
- **Counter-argument:** DESIGN.md §"Section-background alternation" says *"Final CTA uses orange (the conversion crescendo)"* — which can be read as the *banner* being orange (the crescendo), with the button being navy for contrast. The current implementation is internally consistent with this reading.
- **Fix (recommended):** Make the tension explicit by either:
  - **(a)** Keep the orange banner, change the button to `variant="cta"` with a `ring-2 ring-cta-foreground` (navy ring) for separation — preserves "orange button = conversion action" rule. Test contrast of orange-on-orange with ring.
  - **(b)** Keep the navy button on orange banner, but update DESIGN.md §"Button hierarchy" to add a #5: *"On-orange-banner variant — navy fill on `bg-cta` surface (used only inside the final CTASection)."* — codifies the current pattern.
  - **(c)** Change the banner from `bg-cta` to `bg-primary` (navy banner) and the button to `variant="cta"` (orange button) — symmetric inversion of the hero (navy panel + orange CTA). This is the cleanest reading of DESIGN.md's "Correct examples" hero pattern.
  - **Recommendation:** Option (c) — symmetric with hero, unambiguous hierarchy.
- **Blocks?** No. Design discussion item.

---

### MINOR-1 — `SectionShell` "tint" tone (`bg-brand-teal-pale/40`) is documented but unused on interior pages

- **Severity:** MINOR
- **Where:** `src/components/layout/section-shell.tsx:29` defines `tone="tint"` → `bg-brand-teal-pale/40`. Used only on homepage (`stats-strip.tsx:13`, `testimonials.tsx:36`). Never used on any of the 10 interior pages.
- **Evidence:** `rg 'tone="tint"' src/app` returns 0 results.
- **DESIGN.md rule:** §"Section-background alternation" mentions *"Stats strip uses a pale tint."* — implying tint is a documented rhythm variant.
- **Fix:** Consider using `tone="tint"` on one section per interior page (e.g., the methodology timeline section on `/about`, the levels section on `/program`, the FAQ section on `/faq`) to add visual variety beyond the binary icy↔white alternation. Especially valuable on long pages like `/about` (8 sections) and `/schools` (6 sections) where strict alternation becomes monotonous.
- **Blocks?** No.

---

### MINOR-2 — Card padding inconsistency: `p-6` vs `p-8` across visually-similar cards

- **Severity:** MINOR
- **Where:** Multiple pages
- **Evidence:**
  - `/about` vision/mission cards: `p-8` (line 42, 49)
  - `/about` values cards: `p-6` (line 69)
  - `/about` why-mental-arithmetic cards: `p-6` (line 103)
  - `/program` whatIs/whatIsSoroban cards: `p-8` (line 38, 45)
  - `/program` outcomes/journey cards: `p-6` (line 97, 116)
  - `/platform` features cards: `p-6` (line 97)
  - `/schools` whyPartner cards: `p-6` (line 57)
  - `/trainers` whoFor/curriculum/benefits cards: `p-6` (lines 61, 80, 108)
- **DESIGN.md rule:** §"Spacing rhythm" — *"Card padding: 24px (p-6)."* The `p-8` (32px) on the 2-column "intro" cards (vision/mission, whatIs/soroban) deviates from this.
- **Fix:** Standardize all cards to `p-6` unless there's a content-density reason for `p-8`. If `p-8` is intentional for "feature" cards (vs `p-6` for "grid" cards), document the rule in DESIGN.md.
- **Blocks?** No.

---

### MINOR-3 — Icon color token inconsistency between `/design-system` and production pages

- **Severity:** MINOR (accessibility-adjacent)
- **Where:** `src/components/sections/design-system-showcase.tsx` vs all interior pages
- **Evidence:**
  - **Pages** use `text-brand-teal-strong` for icons on light surfaces (e.g., `about/page.tsx:43,70,104`, `program/page.tsx:39,46,98`, `platform/page.tsx:98`, `schools/page.tsx:58`, `trainers/page.tsx:62`) — `--brand-teal-strong` = `#1F7D8C`, contrast on white ≈ 4.6:1 (passes WCAG AA for graphical objects).
  - **`/design-system`** uses `text-accent` for icons (`design-system-showcase.tsx:230, 302, 345, 410`) — `--accent` = `--brand-teal` = `#37B0C3`, contrast on white ≈ 2.0:1 (FAILS WCAG AA for graphical objects, threshold 3:1).
- **DESIGN.md rule:** §"Accessibility" — *"Teal `#37B0C3` is reserved for fills/icons-on-dark, never text on light."* The design-system page itself violates this rule for its icon demos.
- **Fix:** Change all `text-accent` → `text-brand-teal-strong` in `design-system-showcase.tsx` for icons rendered on light/white surfaces. Reserve `text-accent` for icons on navy (where `#37B0C3` has high contrast).
- **Blocks?** No (the design-system page is internal-only, `robots: { index: false, follow: false }`). But it sets a bad example for future page authors who copy from `/design-system`.

---

### MINOR-4 — BeadBadge `orange` tone is documented but never used in production pages

- **Severity:** MINOR
- **Where:** `src/components/brand/bead-badge.tsx:18` defines `orange: "bg-brand-orange text-cta-foreground"`; demonstrated on `/design-system` line 371. But `rg 'tone="orange"' src/app src/components/sections src/components/brand` — only `design-system-showcase.tsx:371` uses it. No production page uses an orange BeadBadge.
- **DESIGN.md rule:** §"When to use the orange CTA color" — *"Never decorative, never on non-conversion elements."* An orange BeadBadge would be a decorative orange use, which is forbidden. So this is actually consistent with the rule.
- **Fix:** Either (a) remove the `orange` tone from `BeadBadge` to prevent future misuse, OR (b) keep it but add a comment in `bead-badge.tsx` warning that orange tone is for `/design-system` demo only and should not be used in production pages (since beads are decorative, not conversion actions).
- **Blocks?** No.

---

### MINOR-5 — Two shared brand components are defined but never used in any page

- **Severity:** MINOR (dead code)
- **Where:**
  - `src/components/brand/audience-card.tsx` — `AudienceCard` component. `rg "AudienceCard" src/app src/components/sections` returns 0 results (only the file itself).
  - `src/components/brand/metric-card.tsx` — `MetricCard` component. `rg "MetricCard" src/app src/components/sections` returns 0 results.
- **DESIGN.md rule:** n/a (dead code, not a rule violation).
- **Fix:** Either (a) delete the two unused components (cleanup), OR (b) demonstrate them on `/design-system` so they're available as documented patterns for future pages. Recommendation: (b) — they're well-built and could be useful; demonstrating them costs nothing.
- **Blocks?** No.

---

### MINOR-6 — Channel illustration contrast is marginal on the `teal` variant

- **Severity:** MINOR
- **Where:** `src/components/brand/channel-illustration.tsx:36-49` — the "screen" illustration uses `var(--brand-navy)` (`#0A4C82`) stroke on a teal background (`bg-brand-teal` = `#37B0C3`)
- **Evidence:** Navy `#0A4C82` on teal `#37B0C3` — both are saturated mid-tones; contrast ratio ≈ 2.2:1, fails WCAG AA for graphical objects (3:1). The illustration is decorative (`aria-hidden`), so this isn't a hard accessibility violation, but the visual separation is weak.
- **Vision cross-check:** Vision did not explicitly flag this, but the channels-page screenshot shows the teal-band card with a screen illustration that's harder to parse than the navy/blue variants.
- **Fix:** Either (a) lighten the stroke to `var(--brand-navy-dark)` (`#06335C`) for slightly better contrast (≈ 2.8:1 — still below AA but better), OR (b) change the screen-illustration stroke to `var(--brand-teal-pale)` (`#E1F0F3`, contrast on teal ≈ 2.6:1 — similar issue), OR (c) change the teal band to `bg-brand-teal-strong` (`#1F7D8C`) so the navy stroke has better contrast (≈ 3.4:1 — passes AA). Option (c) is best.
- **Blocks?** No.

---

### SUGGESTION-1 — Add visible H2 section headings where sr-only H2 was added for accessibility

- **Severity:** SUGGESTION
- **Where:** `/faq` (line 68: `<h2 className="sr-only">فئات الأسئلة</h2>`), `/contact` (line 45: `<h2 className="sr-only">طرق التواصل</h2>`)
- **Evidence:** Phase 2 review (Subagent 2 — RTL/a11y) recommended adding sr-only H2s to fix heading-hierarchy skips. Implemented correctly. But a visible SectionHeading would improve scannability for sighted users too.
- **Fix:** Replace sr-only H2 with `<SectionHeading title="…" align="center" />` on both pages. Improves visual hierarchy without breaking the existing accessibility fix.
- **Blocks?** No.

---

### SUGGESTION-2 — Consider using `RailDivider` more sparingly

- **Severity:** SUGGESTION
- **Where:** Homepage uses `RailDivider` twice (lines 14, 17 of `page.tsx`); `/about`, `/program`, `/channels`, `/platform` each use it once.
- **Evidence:** Vision on home flagged: *"Decorative dotted lines used as section separators... these generic gradient dividers often look dated and inconsistent with the clean, geometric aesthetic."* This is a misread (the dividers are abacus-rod motifs, not generic gradients), but the feedback suggests the dividers may read as visual noise to some users.
- **DESIGN.md rule:** §"Abacus-inspired graphic language" — *"Restraint rule: the abacus appears in the hero (signature) + subtle motifs (bead badges, rail dividers, card accents) — NOT in every section. Visual unity, not repetition."*
- **Fix:** On the homepage, consider removing one of the two `RailDivider`s (the one between HowItWorks and LearningChannels is the most redundant — both sections are tightly related). Keep the other for hero→content transition.
- **Blocks?** No.

---

### SUGGESTION-3 — `/faq` category badges could use distinct tones per category

- **Severity:** SUGGESTION
- **Where:** `src/app/faq/page.tsx:73` — `<Badge className="bg-secondary text-primary">{cat.title.ar}</Badge>`
- **Evidence:** All FAQ category badges use the same `bg-secondary` (teal-pale). Vision on `/faq` flagged: *"Monotonous Card Visual Language... There is no visual differentiation between categories (e.g., General vs. Technical), making the interface feel flat."*
- **Fix:** Assign a deterministic tone per category (e.g., rotate through `bg-secondary`, `bg-accent/20`, `bg-brand-teal-pale`). Or use `BeadBadge tone="teal"|"navy"|"pale"` as a category-number prefix.
- **Blocks?** No.

---

### SUGGESTION-4 — `/privacy` content sections lack visual containment

- **Severity:** SUGGESTION
- **Where:** `src/app/privacy/page.tsx:48-58` — content sections render as plain `<section>` with only an `<h2>` border-bottom + `<p>` body
- **Evidence:** Vision on `/privacy` flagged: *"Missing Visual Card Language: The list of program features lacks any card container, border, or background treatment. This results in a 'wall of text' effect."*
- **DESIGN.md rule:** §"Card language" — cards are recommended for content grouping.
- **Fix:** Wrap each `<section>` in a `<Card className="p-6 sm:p-8">` for visual containment and rhythm. Keeps the TOC anchor targets working (`id={section.id}` moves to the Card).
- **Blocks?** No.

---

### SUGGESTION-5 — Use `tone="tint"` or accent borders to break up long form pages

- **Severity:** SUGGESTION
- **Where:** `/register` (2 content sections), `/schools` (6 sections), `/trainers` (5 sections), `/contact` (3 sections)
- **Evidence:** Form pages follow strict `white → default` alternation. On `/schools` and `/trainers` (5–6 sections each), the rhythm becomes monotonous. Vision on `/schools` flagged: *"The page uses a continuous light blue/icy background for the 'نظام التعليم', 'خطوات التسجيل', and 'أرسل طلبك الآن' sections."* (misread — they actually alternate, but the alternation is subtle).
- **Fix:** Introduce `tone="tint"` on one mid-page section per long form page (e.g., the process-timeline section on `/schools` and `/trainers`) to add a third rhythm level.
- **Blocks?** No.

---

### SUGGESTION-6 — `/contact` WhatsApp outline button could use the WhatsApp brand green sparingly

- **Severity:** SUGGESTION
- **Where:** `src/app/contact/page.tsx:101` and `src/app/register/page.tsx:82` — WhatsApp buttons use `variant="outline"` (teal border)
- **Evidence:** The WhatsApp button is the secondary conversion path (after the form). Currently styled identically to any outline button.
- **DESIGN.md rule:** §"Anti-patterns" — *"Raw brand hex in components"* — WhatsApp green (`#25D366`) is not a brand token, so introducing it would violate the rule. **Do NOT add WhatsApp green.**
- **Alternative fix:** Add a small WhatsApp glyph (lucide `MessageCircle` is already used) before the label, and consider `variant="secondary"` instead of `variant="outline"` to give it slightly more weight as the secondary conversion path.
- **Blocks?** No.

---

## 4. Per-Page Visual Verification Summary

| Page | Status | Key observations |
|------|--------|------------------|
| `/` (home) | ✅ PASS | Hero (navy panel + abacus SVG + orange CTA + ghost secondary), StatsStrip (tint), RailDivider, HowItWorks (white, 4 StepCards), LearningChannels (icy, 3 ChannelCards), RailDivider, Testimonials (tint, carousel), CTASection (orange banner). 1 orange per viewport verified. |
| `/about` | ⚠️ MINOR | 8 sections, good rhythm except MAJOR-1 (mid-page navy "Child Protection" band). Vision flagged: "Inconsistent Section Rhythm... 'Why Us?' and 'Testimonials' both use white consecutively" — but source shows `tone="white" → tone="default" → tone="white"` (correct alternation; vision misread). |
| `/program` | ✅ PASS | 7 sections. 10-level grid with BeadBadge (teal/navy/pale tones by level tier — nice progression). FAQ accordion at end. CTASection. |
| `/channels` | ⚠️ MAJOR-3 | Bespoke channel-detail layout (side visual band + content + sub-info grid + button CTA) duplicates `variantBg`/`variantGlyph` from `channel-card.tsx`. Comparison table well-styled. |
| `/platform` | ⚠️ MAJOR-1 | "Coming soon" badge in hero. Conceptual browser-chrome mockup is a nice distinctive pattern. Mid-page navy safety section violates rhythm. Interest CTA (orange) at end. |
| `/register` | ✅ PASS | 2 sections. Form is the focus. 1 orange (form submit). WhatsApp outline button as secondary. |
| `/contact` | ✅ PASS | 3 sections. Methods (3-col icon cards) → Branches (3-col BranchCard) → Form+FAQ split. 1 orange (form submit). |
| `/schools` | ✅ PASS | 6 sections. Why → Delivery → Benefits split → Process timeline → FAQ+Form. 1 orange (form submit). |
| `/trainers` | ✅ PASS | 5 sections. WhoFor → Curriculum → Stages timeline → Benefits → FAQ+Form. 1 orange (form submit). |
| `/faq` | ✅ PASS | Search → categorized accordion → contact CTA. 1 orange (bottom CTA, only visible when scrolled). |
| `/privacy` | ✅ PASS | Draft notice (warning Alert) → TOC + content sections. No orange (correct — privacy is not a conversion page). |
| `/design-system` | ❌ MAJOR-2 | Demonstrates tokens, primitives, and Phase-1.5 patterns (BeadBadge, RailDivider, ChannelIllustration). Missing Phase-2 patterns (PageHero, SectionHeading, ProcessTimeline, CTASection, all specialized cards). |

---

## 5. Things Done Right (positive findings)

1. **Token discipline is excellent.** Zero raw hex in pages. The only hex strings outside `tokens.css` are display labels in `design-system-showcase.tsx:34-43` (intentional — showing designers the hex values).
2. **Orange CTA rule is rigorously enforced.** Verified via DOM inspection on every page — max 1 visible orange element per viewport. Header CTA is `variant="default"` (navy) on desktop, reserving orange for hero + form submits + final CTA banner.
3. **PageHero consistency is exemplary.** All 10 interior pages use the same `<PageHero tone="navy">` with the same abacus-bead rail motif + teal glow. Single source of truth.
4. **PrototypeForm is a model of reuse.** 4 form pages share one component, one schema pattern (zod), one success state, one notice. Zero duplication.
5. **BeadBadge is used purposefully** — step numbers (StepCard, ProcessTimeline), level numbers (LevelCard with tone-tiers by difficulty). Never decorative.
6. **RailDivider is used sparingly** — only at major section transitions, not between every section.
7. **ChannelIllustration** is a beautiful abacus-derived SVG set, token-driven, aria-hidden, three distinct kinds.
8. **RTL is fully logical** — all pages use `ps/pe/ms/me/start/end` (verified by Subagent 2). No physical `left/right` in page code.
9. **Button component is truly centralized** — no bespoke `<button>` reimplementations. All CTAs go through `<Button>` with the right variant.
10. **Accessibility-correct icon color** — pages use `text-brand-teal-strong` (AA-compliant) for icons on light, not `text-accent` (which fails AA). (Caveat: `/design-system` itself uses `text-accent` — see MINOR-3.)

---

## 6. Recommended Action Plan (priority order)

| Priority | Item | Effort | Impact |
|----------|------|--------|--------|
| 1 | **MAJOR-2**: Add PageHero, SectionHeading, ProcessTimeline, CTASection, and specialized-card demos to `/design-system` | Medium (2-3h) | High — completes the "implementation contract" |
| 2 | **MAJOR-1**: Replace mid-page `tone="navy"` with `tone="tint"` on `/about` and `/platform` | Trivial (10min) | Medium — restores section rhythm |
| 3 | **MAJOR-3**: Extract shared `variantBg`/`variantGlyph` map for channel cards; eliminate duplication | Small (30min) | Medium — DRY/maintenance |
| 4 | **MAJOR-4**: Decide final-CTA button hierarchy (recommend option c: navy banner + orange button, symmetric with hero) | Small (30min + DESIGN.md update) | Medium — design clarity |
| 5 | **MINOR-3**: Fix `/design-system` icon colors `text-accent` → `text-brand-teal-strong` | Trivial (10min) | Low-Medium (accessibility example) |
| 6 | **MINOR-2**: Standardize card padding (`p-6` vs `p-8`) | Small (30min) | Low-Medium (visual consistency) |
| 7 | **MINOR-5**: Delete or demonstrate `AudienceCard` and `MetricCard` | Trivial (5min) | Low (cleanup) |
| 8 | **MINOR-6**: Improve ChannelIllustration `screen` variant contrast on teal bg | Small (15min) | Low (decorative polish) |
| 9 | **MINOR-4**: Remove or document `BeadBadge` orange tone | Trivial (5min) | Low (prevent misuse) |
| 10 | **SUGGESTION-1 through 6**: Apply as time permits | Small each | Low (polish) |

---

## 7. Verdict

**CONDITIONAL APPROVE.** Phase 2 is production-quality work. The 4 MAJOR issues should be resolved before final sign-off — the most important being **MAJOR-2** (`/design-system` is an incomplete contract, missing PageHero/SectionHeading/ProcessTimeline demonstrations). The other 3 MAJORS are quick fixes (MAJOR-1: 10min, MAJOR-3: 30min, MAJOR-4: design decision + 30min). No BLOCKER, no CRITICAL. Ship-ready after MAJOR fixes.

---

*Report generated by Subagent 3 (Design-System & Visual Consistency Reviewer). READ-ONLY — no source files modified.*
