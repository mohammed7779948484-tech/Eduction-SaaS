# Architecture & Component-Reuse Audit — Phase 2 (10 public-site pages)

- **Task ID:** P25-R4
- **Agent:** Subagent 4 (Architecture & Component-Reuse Reviewer)
- **Scope:** All page files (`src/app/**/page.tsx` + `layout.tsx`), shared components (`src/components/{brand,layout,sections,motion,ui}/*.tsx`), content (`src/content/*.ts`), lib (`src/lib/{routes,utils,motion,gsap}/*.ts`), `package.json`.
- **Mode:** READ-ONLY review.
- **Date:** Phase 2.5 cycle.

## Summary Verdict

**CONDITIONAL APPROVE** — Phase 2 architecture is fundamentally sound: frontend-only, no backend/auth/DB, content centralized, shared components reused, navigation centralized, metadata architecture correct, TypeScript strict with only one acceptable `as any`. **No BLOCKERS.** However, **6 MAJOR findings** reveal systemic DRY violations and dead code that should be addressed before the codebase grows further. All findings are non-blocking for the current Phase 2 milestone but will compound as new pages are added.

Findings count: **0 BLOCKER · 0 CRITICAL · 6 MAJOR · 11 MINOR · 3 SUGGESTION**

---

## Verification Matrix

| # | Rule | Status | Evidence |
|---|------|--------|----------|
| 1 | Server/Client boundaries: Server default; `'use client'` only for interactivity | ⚠️ MINOR | 4 form pages marked `'use client'` unnecessarily (Findings M-2, m-7) |
| 2 | No duplicate button/card/form/hero primitives | ❌ MAJOR | `AudienceCard` duplicated inline; no shared `FeatureCard`; ~15 page-local Card reimplementations (M-1, M-3, M-4) |
| 3 | Content in `src/content/*.ts`, strongly typed | ✅ PASS | 14 content files; all use `as const`; no inline Arabic/English strings in page JSX |
| 4 | Shared components reused (PageHero, SectionShell, etc.) | ⚠️ PARTIAL | Most are reused, but `AudienceCard`/`MetricCard` are dead; `max-w-[1320px]` pattern duplicated (M-5) |
| 5 | No page-local hardcoded design tokens | ✅ PASS (with note) | No raw hex in components outside `design-system-showcase.tsx` (display-only) and `tokens.css`. Arbitrary `text-[10px]` and `max-w-[1320px]` should be tokens (m-9, m-10) |
| 6 | No dependency creep; no backend/DB/auth/CMS | ⚠️ MINOR | `sonner` + `z-ai-web-dev-sdk` unused in `src/` (m-1, m-2); 5 unused shadcn primitives (m-3) |
| 7 | No unnecessary global state | ✅ PASS | Only React Context (`LanguageProvider`); no Zustand/TanStack/SWR |
| 8 | Metadata architecture: client pages use `layout.tsx` | ✅ PASS | 5 client pages → 5 layouts; 6 server pages → page-level `export const metadata` |
| 9 | Form reuse: shared `PrototypeForm` | ✅ PASS | All 4 forms use `PrototypeForm`; no duplicate form logic |
| 10 | Navigation centralized in `routes.ts` | ✅ PASS | `navItems` + `secondaryNavItems` consumed by header/footer; no page-local nav edits |
| 11 | TypeScript strict; no `any` abuse | ✅ PASS | Single `as any` at `prototype-form.tsx:48` for `zodResolver` (acceptable per task spec) |
| 12 | Frontend-only boundary | ✅ PASS | `rg "prisma\|next-auth\|@tanstack/react-query\|recharts\|@mdxeditor\|/api\|stripe\|nodemailer\|resend"` → 0 hits in `src/` |
| 13 | Large page files >300 lines | ⚠️ MAJOR | `design-system-showcase.tsx` is 421 lines, single component renders 13 sections (M-6); all 10 public pages are 65–150 lines (PASS) |
| 14 | Forms handle error/loading/success states | ✅ PASS | `PrototypeForm`: `loading` via `setLoading`, `submitted` via `SuccessState`, errors via `form.formState.errors` + `aria-invalid` + `role="alert"` |

---

## Findings

### MAJOR Findings

---

#### [MAJOR-1] Page-local `titles` metadata object duplicated across 5 layout files

- **Evidence:**
  - `src/app/register/layout.tsx:3-9`
  - `src/app/contact/layout.tsx:3-9`
  - `src/app/schools/layout.tsx:3-9`
  - `src/app/trainers/layout.tsx:3-9`
  - `src/app/faq/layout.tsx:3-9`

  All 5 layouts define the **same** `titles: Record<string, { title; description }>` object with all 5 entries (`register`, `contact`, `schools`, `trainers`, `faq`), then select one via `titles["<route>"]`. ~7 lines × 5 files = ~35 lines of identical code, plus the silent risk of drift (a metadata edit must be made in 5 places).
- **Rule:** Rule 4 — shared-component use; DRY. Also Rule 10 — centralized navigation/metadata.
- **Fix:** Move the `titles` map to `src/lib/metadata.ts` (or extend `src/content/site.ts`) and import in each layout:
  ```ts
  // src/lib/metadata.ts
  export const routeMetadata: Record<string, Metadata> = {
    register: { title: "...", description: "..." },
    contact: { ... }, schools: { ... }, trainers: { ... }, faq: { ... },
  };
  // src/app/register/layout.tsx
  import { routeMetadata } from "@/lib/metadata";
  export const metadata = routeMetadata.register;
  ```
- **Blocks?** NO. Functional today; will rot silently as metadata edits drift.

---

#### [MAJOR-2] Channels page reimplements `channel-card` variant→{bg,glyph} mapping

- **Evidence:**
  - `src/components/brand/channel-card.tsx:15-19` — defines `variantStyles: Record<Channel["variant"], { bg, hover, glyph }>` (NOT exported)
  - `src/app/channels/page.tsx:21-27` — defines its own `variantBg` and `variantGlyph` mappings for the SAME `variant` union:
    ```ts
    const variantBg = { navy: "bg-brand-navy", blue: "bg-brand-blue", teal: "bg-brand-teal" };
    const variantGlyph = { navy: "center", blue: "school", teal: "screen" } as const;
    ```
  - `src/app/channels/page.tsx:43-44` — uses `variantBg[ch.variant]` and `variantGlyph[ch.variant]`.

  The channels page also renders its own inline `<Card>` per channel (lines 38-72) instead of using the shared `<ChannelCard>`, because the shared component only supports `{variant, title, description, cta}` and the channels page needs `{variant, title, description, whoFor, experience, cta, href}`.
- **Rule:** Rule 2 — no duplicate primitives; Rule 4 — shared-component use.
- **Fix:**
  1. Export `variantStyles` (or split into `variantBg` + `variantGlyph`) from `channel-card.tsx`.
  2. Either (a) extend `ChannelCard` to accept optional `whoFor`, `experience`, `href` props, or (b) create a new shared `ChannelDetailCard` for the channels-page use case that imports the same variant map.
- **Blocks?** NO. Visual output is correct; risk is drift if brand palette evolves.

---

#### [MAJOR-3] No shared `FeatureCard`; ~15 page-local Card reimplementations of the same pattern

- **Evidence:** The recurring pattern `<Card className="... border-border bg-card shadow-sm"><Icon/><h3/><p/></Card>` appears across:
  - `src/app/about/page.tsx:42, 49` (vision/mission, p-8) — `text-xl` heading
  - `src/app/about/page.tsx:69` (values, p-6) — `text-base` heading, `size-8` icon
  - `src/app/about/page.tsx:103` (whyMentalArithmetic, p-6 text-center) — `size-10` icon
  - `src/app/program/page.tsx:38, 45` (whatIs/whatIsSoroban, p-8) — `text-xl` heading, `size-10` icon
  - `src/app/program/page.tsx:97` (outcomes, p-6) — `text-sm` heading, `size-8` icon
  - `src/app/program/page.tsx:116` (journey, p-6) — numbered badge + `text-sm` heading
  - `src/app/platform/page.tsx:97` (features, p-6) — `size-8` icon, `text-base` heading
  - `src/app/schools/page.tsx:57` (whyPartner, p-6 h-full) — `size-8` icon, `text-sm` heading
  - `src/app/schools/page.tsx:74` (deliveryModels, p-6) — numbered badge + `text-sm` heading
  - `src/app/trainers/page.tsx:61` (whoFor, p-6 h-full text-center) — `size-10` icon
  - `src/app/trainers/page.tsx:80` (curriculum, p-6 h-full) — numbered badge + `text-sm` heading
  - `src/app/trainers/page.tsx:108` (benefits, p-6 h-full) — `text-base` heading
  - `src/app/register/page.tsx:61, 66` (options, p-6) — `size-10` icon, `text-lg` heading
  - `src/app/contact/page.tsx:50` (methods, p-6 text-center) — circular icon badge

  Each card uses the same primitive shape with slight variations in icon size, heading size, padding (p-6 vs p-8), alignment (text-start vs text-center), and presence of a numbered badge. There is **no shared `FeatureCard` component** (grep `FeatureCard|ValueCard|InfoCard|BenefitCard` → 0 matches). The existing `AudienceCard` (icon + title + description, centered) covers one variant but is unused (see MAJOR-4).

  Additionally, every one of these cards redundantly repeats `border-border bg-card shadow-sm` — three classes that the default `Card` component already applies (see `src/components/ui/card.tsx:10` — `bg-card ... shadow-sm` is in the base class). The classes should be dropped; `<Card className="p-6">` is sufficient.
- **Rule:** Rule 2 — no duplicate card primitives; Rule 4 — shared-component use.
- **Fix:**
  1. Extract a `FeatureCard` primitive that accepts `{ icon?, title, description, badge?, tone?, align?, padding? }` and renders the canonical pattern.
  2. Migrate the ~15 inline card reimplementations to use `FeatureCard`.
  3. Drop redundant `border-border bg-card shadow-sm` from all `<Card>` usages (Card defaults already include them).
- **Blocks?** NO. But every new page added will likely copy-paste another variant, compounding the debt.

---

#### [MAJOR-4] `AudienceCard` and `MetricCard` components are dead code; trainers page reimplements `AudienceCard` inline

- **Evidence:**
  - `src/components/brand/audience-card.tsx` — defines `AudienceCard({ icon, title, description, className })`. Grep `AudienceCard` → only the definition file matches; **0 imports**.
  - `src/components/brand/metric-card.tsx` — defines `MetricCard({ value, label, className })`. Grep `MetricCard` → only the definition file matches; **0 imports**.
  - `src/app/trainers/page.tsx:53-71` — reimplements the exact `AudienceCard` pattern inline:
    ```tsx
    <Card className="h-full p-6 border-border bg-card shadow-sm text-center">
      <Icon className="size-10 text-brand-teal-strong mx-auto mb-3" />
      <h3 className="text-base font-bold text-primary mb-1">{item.title.ar}</h3>
      <p className="text-sm text-muted-foreground">{item.description.ar}</p>
    </Card>
    ```
    This is identical to `AudienceCard`'s body (with slightly different icon size — `size-10` vs `size-12` in the shared component).
- **Rule:** Rule 2 — no duplicate primitives; Rule 4 — shared-component use.
- **Fix:**
  1. Use `AudienceCard` in `trainers/page.tsx` (adjust icon size if needed, or add an `iconSize` prop).
  2. Either find a use for `MetricCard` (the homepage `StatCard` already serves a similar role with animation) or delete it.
- **Blocks?** NO. But the existence of dead components signals that the component catalog is not being maintained.

---

#### [MAJOR-5] `max-w-[1320px] px-4 sm:px-6 lg:px-8` container pattern duplicated in 4 components

- **Evidence:** The exact string `"mx-auto w-full max-w-[1320px] px-4 sm:px-6 lg:px-8"` (or close variants) appears in:
  - `src/components/sections/hero.tsx:18`
  - `src/components/layout/site-header.tsx:37` (with extra flex/h items)
  - `src/components/layout/site-footer.tsx:26` (with extra `py-12 sm:py-16 pt-16`)
  - `src/components/brand/page-hero.tsx:46` (with `relative` prefix)

  Meanwhile, the shared `PageContainer` component (`src/components/layout/page-container.tsx:15-33`) exists specifically to centralize this pattern. It supports `width: "default" | "narrow" | "wide"` where `wide` is `max-w-[1320px]`.
- **Rule:** Rule 4 — shared-component use; DRY.
- **Fix:** Replace the four inline container divs with `<PageContainer width="wide" className="...">`. Where extra layout is needed (e.g., header's flex items-center justify-between), pass via `className`.
- **Blocks?** NO. Pure duplication. Risk: if max-width changes (e.g., to 1280px), 4 files must be edited in lockstep.

---

#### [MAJOR-6] `design-system-showcase.tsx` is 421 lines; single component renders 13 distinct demo sections

- **Evidence:** `src/components/sections/design-system-showcase.tsx` exports one `DesignSystemShowcase` function (lines 94-421) that renders 13 separate `<Block>` sections:
  1. Brand palette (line 116)
  2. Semantic palette (line 128)
  3. Typography (line 139)
  4. Spacing/Radius/Shadow (line 157)
  5. Buttons (line 189)
  6. Badges (line 210)
  7. Cards (line 222)
  8. Form fields (line 239)
  9. Accordion & Tabs (line 274)
  10. Icons · Avatar · Progress (line 300)
  11. Statistics (line 324)
  12. Motion presets (line 340)
  13. Abacus visual language (line 365)
  14. States (line 405)

  Plus a `Block` helper (lines 82-92) and module-level constant arrays (`brandColors`, `semanticColors`, `spacing`, `radii`, `shadows`, `typeScale`).
- **Rule:** Rule 13 — large files should be decomposed.
- **Fix:** Split into 13 sub-components under `src/components/sections/design-system/` (e.g., `BrandPaletteBlock.tsx`, `TypographyBlock.tsx`, `ButtonsBlock.tsx`, …), with `DesignSystemShowcase` becoming a 30-line orchestrator that imports and composes them. The `Block` helper and the constant arrays can move to a shared `_block.tsx` / `_data.ts`.
- **Blocks?** NO. The page works. But editing one demo section requires scrolling through 400+ lines, and merge conflicts will be common if multiple agents touch it.

---

### MINOR Findings

---

#### [MINOR-1] `sonner` is a dead dependency

- **Evidence:** `package.json:40` declares `"sonner": "^2.0.6"`. `src/components/ui/sonner.tsx:3` imports `Toaster as Sonner`. `src/app/layout.tsx:4` imports `Toaster` and renders `<Toaster />` at line 66. Grep `toast\(|toast\.|from "sonner"` → only the sonner.tsx wrapper matches; **`toast()` is never called anywhere in `src/`**.
- **Rule:** Rule 6 — no dependency creep.
- **Fix:** Either remove `sonner` + `ui/sonner.tsx` + the `<Toaster />` from `layout.tsx`, or actually use `toast()` for form-success notifications (currently `SuccessState` is rendered inline instead).
- **Blocks?** NO. ~30 KB deadweight in `node_modules`.

---

#### [MINOR-2] `z-ai-web-dev-sdk` is in `dependencies` but unused in `src/`

- **Evidence:** `package.json:42` declares `"z-ai-web-dev-sdk": "^0.0.18"`. Grep `z-ai-web-dev-sdk` in `src/` → 0 matches. The package is only referenced in `package.json`, `bun.lock`, and various `tool-results/*.txt` logs.
- **Rule:** Rule 6 — no new packages without justification; no backend/CMS imports.
- **Fix:** Move to `devDependencies` (if it's used by tooling/scripts) or remove entirely (if it was scaffolded by the AI dev environment and is not part of the shipped app).
- **Blocks?** NO. Ship bundle is unaffected (Next.js tree-shakes unused deps), but `bun install` pulls it.

---

#### [MINOR-3] Five shadcn UI primitives scaffolded but never imported

- **Evidence:** Grep `from "@/components/ui/<name>"` for each:
  - `navigation-menu.tsx` — 0 imports outside itself
  - `dropdown-menu.tsx` — 0 imports
  - `dialog.tsx` — 0 imports
  - `aspect-ratio.tsx` — 0 imports
  - `skeleton.tsx` — 0 imports
  - `form.tsx` — 0 imports (the app uses `react-hook-form` directly via `PrototypeForm`, not the shadcn `Form` wrapper)

  Each file is 50-260 lines of dead code. The corresponding `@radix-ui/*` packages in `package.json` (lines 14-28) are also only needed by these dead files.
- **Rule:** Rule 6 — no dependency creep.
- **Fix:** Delete the 5 unused primitive files and their `@radix-ui/react-{navigation-menu,dropdown-menu,dialog,aspect-ratio}` dependencies. Keep `form.tsx` only if planning to migrate to shadcn's `Form` pattern.
- **Blocks?** NO. But adds noise to the component catalog and inflates `node_modules`.

---

#### [MINOR-4] Dead motion code: `buildVariants`, `hoverLift`, `tapPress`, `useParallaxScene`, `ParallaxMedia`

- **Evidence:**
  - `src/lib/motion/reduced-motion.ts:15-50` — `buildVariants(reduced)` function defined but never imported (the actual reveal/stagger logic lives in `presets/reveal.ts` and `presets/stagger.ts`).
  - `src/lib/motion/presets/hover-lift.ts:5-19` — `hoverLift()` and `tapPress()` exported but never imported.
  - `src/lib/gsap/scroll-scenes.ts:11-31` — `useParallaxScene(speed)` exported but never imported. Contains `scrollTrigger: undefined` with a comment noting ScrollTrigger is not registered to keep bundle lean — effectively a stub.
  - `src/components/motion/parallax-media.tsx:18-40` — `ParallaxMedia` component exported but never imported.
- **Rule:** Rule 6 — no dependency creep (dead code ties up `framer-motion` and `gsap` imports).
- **Fix:** Delete the 4 unused exports. If `ParallaxMedia`/`useParallaxScene` are reserved for future use, mark them as such in a comment and exclude from production bundle via tree-shaking verification.
- **Blocks?** NO.

---

#### [MINOR-5] Numbered badge pattern duplicated 3× instead of using shared `BeadBadge`

- **Evidence:**
  - `src/app/program/page.tsx:117` — `<span className="flex size-10 items-center justify-center rounded-full bg-secondary text-primary font-extrabold mb-3">{step.number}</span>`
  - `src/app/schools/page.tsx:75` — `<span className="flex size-8 items-center justify-center rounded-full bg-secondary text-primary font-bold text-sm mb-3">{i + 1}</span>`
  - `src/app/trainers/page.tsx:81` — `<span className="flex size-8 items-center justify-center rounded-full bg-secondary text-primary font-bold text-sm mb-3">{i + 1}</span>`

  The shared `BeadBadge` component (`src/components/brand/bead-badge.tsx`) already supports `tone="pale"` (which renders `bg-secondary text-primary`) and `size: "sm" | "md" | "lg"` with `font-extrabold`.
- **Rule:** Rule 4 — shared-component use.
- **Fix:** Replace the three inline spans with `<BeadBadge tone="pale" size="md">{step.number}</BeadBadge>` (or `size="sm"` for schools/trainers).
- **Blocks?** NO.

---

#### [MINOR-6] WhatsApp contact info duplicated; two different wa.me URL construction patterns

- **Evidence:**
  - `src/content/site.ts:17` — `whatsapp: "+967 700 000 000"`
  - `src/content/contact.ts:13` — `value: "+967 700 000 000", href: "https://wa.me/967700000000"` (hardcoded duplicate of the same number + URL)
  - `src/app/register/page.tsx:83` — `<a href={\`https://wa.me/${site.whatsapp.replace(/[^0-9]/g, "")}\`}>` (constructs URL dynamically from `site.whatsapp`)
  - `src/app/contact/page.tsx:102` — same dynamic construction from `site.whatsapp`

  The `contact.ts` content file hardcodes the wa.me URL while the page files construct it dynamically. If the WhatsApp number changes, `contact.ts:13` will silently drift.
- **Rule:** Rule 3 — content centralization; DRY.
- **Fix:** In `contact.ts`, reference `site.whatsapp` for the value and construct the href via a helper (e.g., add `whatsappHref` to `site.ts` or a util in `src/lib/utils.ts`).
- **Blocks?** NO.

---

#### [MINOR-7] Form schemas and field configs inlined in 4 page files instead of content files

- **Evidence:**
  - `src/app/register/page.tsx:14-24` — `const schema = z.object({...})` inline
  - `src/app/register/page.tsx:28-51` — `const fields = [...]` inline (references `c.form.*` from content but the array structure itself is in the page)
  - Same pattern in `contact/page.tsx:21-36`, `schools/page.tsx:21-44`, `trainers/page.tsx:21-44`

  The field labels are sourced from content files (good), but the field ordering, types, options, required flags, and zod schema live in the page component. This couples content structure to component structure.
- **Rule:** Rule 3 — content in `src/content/*.ts`.
- **Fix:** Move `schema` and `fields` (and `sections` for register) into the corresponding content file (e.g., `registration.ts` exports `registrationSchema` and `registrationFields`). The page then becomes a thin renderer: `<PrototypeForm {...registrationForm} />`.
- **Blocks?** NO. But a content edit (e.g., adding a new field) currently requires touching both the content file and the page file.

---

#### [MINOR-8] 4 form pages marked `'use client'` unnecessarily

- **Evidence:** `src/app/{register,contact,schools,trainers}/page.tsx` all start with `"use client";`. Inspecting each page component body:
  - `RegisterPage` (register/page.tsx:26-93): defines `schema`, `fields`, `sections` constants; returns JSX. **No hooks, no event handlers, no client-only APIs.**
  - `ContactPage` (contact/page.tsx:28-114): same — no hooks.
  - `SchoolsPage` (schools/page.tsx:30-150): same.
  - `TrainersPage` (trainers/page.tsx:30-144): same.

  The pages import `PrototypeForm` (a client component), but server components can render client components without themselves being client. The `z.object(...)` schema and the `fields` array are plain serializable data (zod schemas serialize fine across the RSC boundary in practice).

  By contrast, `faq/page.tsx` correctly uses `"use client"` because it calls `useState` and `useMemo` for search.
- **Rule:** Rule 1 — Server Components by default; `'use client'` only for interactivity.
- **Fix:** Remove `"use client";` from the 4 form pages. The `PrototypeForm` client component will hydrate as a client island inside a server-rendered page. (Note: this requires the `schema` prop to be serializable; if Next.js complains, move schema to a shared client module and import it inside `PrototypeForm` by name.)
- **Blocks?** NO. Current approach works (metadata is in `layout.tsx`). The cost is that the entire page bundle ships to the client (PageHero, SectionShell, etc. all become client components bundled with the form).

---

#### [MINOR-9] `text-[10px]` arbitrary value used 6× — should be a token

- **Evidence:**
  - `src/components/sections/design-system-showcase.tsx:121, 163, 172, 181`
  - `src/components/layout/site-header.tsx:59`
  - `src/components/brand/logo.tsx:33`

  All use `text-[10px]` for ultra-small captions (hex labels, spacing labels, "soon" indicator, logo subtitle).
- **Rule:** Rule 5 — no page-local hardcoded design values; tokens.
- **Fix:** Add `--text-2xs: 0.625rem` (10px) to `tokens.css` and a `text-2xs` utility (or use Tailwind's `text-2xs` extension). Replace the 6 arbitrary values.
- **Blocks?** NO.

---

#### [MINOR-10] `max-w-[1320px]` and `max-w-[1200px]` should be container tokens

- **Evidence:** `max-w-[1320px]` appears 5× (hero, site-header, site-footer, page-hero, page-container) and `max-w-[1200px]` once (page-container). These are the canonical container widths but are expressed as arbitrary values.
- **Rule:** Rule 5 — tokens.
- **Fix:** Add `--container-wide: 1320px` and `--container-default: 1200px` to `tokens.css`; reference via `max-w-[var(--container-wide)]` or extend Tailwind theme. (Or simply centralize through `PageContainer` per MAJOR-5.)
- **Blocks?** NO.

---

#### [MINOR-11] `border-border bg-card shadow-sm` redundantly repeated ~20× across pages

- **Evidence:** Grep `border-border bg-card shadow-sm` in `src/app/**/page.tsx` returns ~20 hits across all 10 pages. The default `Card` component (`src/components/ui/card.tsx:10`) already includes `bg-card ... shadow-sm` in its base class. The `border-border` is technically the default border color (via `--border` token applied to `border`), so it's redundant too.
- **Rule:** Rule 5 — no redundant class declarations; DRY.
- **Fix:** Strip `border-border bg-card shadow-sm` from all `<Card>` usages; rely on Card defaults. Keep only the layout classes (`p-6`, `h-full`, `text-center`, `overflow-hidden`, etc.).
- **Blocks?** NO. Pure noise.

---

### SUGGESTIONS

---

#### [SUGGESTION-1] Extract shared `FaqAccordion` wrapper

- **Evidence:** The pattern `<Accordion type="single" collapsible>{items.map(...)}</Accordion>` wrapped in a `<Card className="p-6 ...">` with an `<h2>` heading appears 5×: `contact/page.tsx:90-99`, `schools/page.tsx:130-139`, `trainers/page.tsx:124-133`, `program/page.tsx:131-138`, `faq/page.tsx:77-85` (without Card wrapper).
- **Suggestion:** Extract `FaqAccordion({ title, items, className })` that renders the heading + Card + Accordion. Each page would reduce ~12 lines to 1.

---

#### [SUGGESTION-2] Extract shared `FormPlusFaqsLayout` for contact/schools/trainers

- **Evidence:** The two-column `<div className="grid gap-8 lg:grid-cols-2">` layout with FAQ accordion on one side and `PrototypeForm` on the other appears in `contact/page.tsx:81-110`, `schools/page.tsx:127-146`, `trainers/page.tsx:121-140`. Each reimplements the same `<h2>` headings and `<Card>` wrapper.
- **Suggestion:** Extract `FormPlusFaqsLayout({ formConfig, faqItems, faqTitle, formTitle })`. Reduces ~30 lines per page to 1.

---

#### [SUGGESTION-3] Consider extracting `BenefitsList` for schools/trainers

- **Evidence:** `schools/page.tsx:84-112` renders two side-by-side cards each containing a `<ul>` of benefits with `<CheckCircle2 className="size-4 text-success shrink-0" />` bullets. `trainers/page.tsx:101-116` renders a similar benefits grid (single column, no CheckCircle2 bullets).
- **Suggestion:** Extract `BenefitsList({ title, items, variant: "bullets" | "cards" })`. Reduces duplication.

---

## PASS Items (Verified Working)

- ✅ **Frontend-only boundary** — `rg "prisma|next-auth|@tanstack/react-query|recharts|@mdxeditor|/api|stripe|nodemailer|resend|supabase|firebase"` in `src/` → 0 matches. No API routes, no DB, no auth, no payment, no email.
- ✅ **No raw hex in components** — `rg "#[0-9A-Fa-f]{6}" src/ --glob "*.tsx"` returns hits only in `design-system-showcase.tsx` (display labels for the palette demo — legitimate) and `tokens.css` (where hex belongs).
- ✅ **No direct gsap imports outside `lib/gsap/`** — `rg "from ['\"]gsap['\"]"` returns only `lib/gsap/register.ts:3`.
- ✅ **No global state libraries** — `rg "zustand|@tanstack/react-query|swr|axios|fetch\("` in `src/` → 0 matches. Only `useSyncExternalStore` in `language-provider.tsx` for localStorage-backed language.
- ✅ **Content centralization** — 14 content files in `src/content/`, all use `as const` for type narrowing, all export typed interfaces (`Stat`, `Step`, `Channel`, `Testimonial`, `FaqCategory`, `FaqItem`, `RouteDef`). No inline Arabic/English strings in page JSX (verified: `rg "lang === \"ar\""` in `src/app/` → 0 matches).
- ✅ **Shared components reused across pages** — `PageHero` (10 pages), `SectionShell` (10 pages), `PageContainer` (10 pages), `SectionHeading` (8 pages), `RailDivider` (4 pages), `CTASection` (5 pages), `AnimatedReveal` (5 pages), `AnimatedStagger` (6 pages), `ProcessTimeline` (3 pages), `ProfileCard` (1 page), `BranchCard` (1 page), `LevelCard` (1 page), `ComparisonTable` (1 page), `TableOfContents` (1 page), `PrototypeForm` (4 pages), `PrototypeFormNotice` (4 pages via PrototypeForm), `SuccessState` (4 pages via PrototypeForm), `BeadBadge` (via ProcessTimeline + LevelCard + StepCard).
- ✅ **Navigation centralized** — `src/lib/routes.ts` exports `navItems` (5 items) + `secondaryNavItems` (5 items); consumed by `site-header.tsx` and `site-footer.tsx`. No page-local nav arrays.
- ✅ **Metadata architecture correct** — server pages (`about`, `channels`, `platform`, `privacy`, `program`, `design-system`) export `metadata` in `page.tsx`; client pages (`register`, `contact`, `schools`, `trainers`, `faq`) use `layout.tsx` for metadata. Root `layout.tsx` provides `title.template` + `openGraph` + `robots`.
- ✅ **TypeScript strict, single acceptable `as any`** — `rg ": any|as any|<any>"` in `src/` → 1 hit: `prototype-form.tsx:48` `resolver: zodResolver(schema as any)`. This is the well-known zodResolver typing workaround (acceptable per task spec).
- ✅ **Form states handled** — `PrototypeForm` manages `loading` (button disabled + spinner + "جارٍ الإرسال…" label), `submitted` (renders `SuccessState` with reset button), and per-field errors (`form.formState.errors[field.name]` → `aria-invalid` + `aria-describedby` + `<p role="alert">`).
- ✅ **Reduced-motion respected** — `AnimatedReveal`, `AnimatedStagger`, `AnimatedStaggerItem`, `ParallaxMedia` (dead but correct), `useHeroTimeline`, `useCountUp` all call `usePrefersReducedMotion()` and render static fallback when reduced.
- ✅ **All 10 public pages are 65-150 lines** — well under the 300-line decomposition threshold. Only `design-system-showcase.tsx` (421 lines, internal tool) exceeds it (MAJOR-6).

---

## Recommended Fix Priority

| Priority | Finding | Effort | Impact |
|----------|---------|--------|--------|
| 1 | MAJOR-1 (metadata `titles` duplication) | 15 min | Single source of truth for route metadata |
| 2 | MAJOR-5 (container pattern duplication) | 30 min | Single source of truth for max-width |
| 3 | MAJOR-2 (channel variant mapping) | 30 min | Export + reuse; closes drift risk |
| 4 | MAJOR-4 (dead AudienceCard/MetricCard) | 20 min | Either use or delete; clean catalog |
| 5 | MAJOR-3 (extract FeatureCard) | 1-2 hr | Removes ~15 duplicates; future pages benefit |
| 6 | MAJOR-6 (decompose design-system-showcase) | 1 hr | Maintainability of internal tool |
| 7 | MINOR-1,2,3,4 (dead deps/code cleanup) | 30 min | Smaller `node_modules`, less noise |
| 8 | MINOR-5,6,7,11 (small DRY fixes) | 1 hr | Polish |
| 9 | MINOR-8 (server/client boundary) | 30 min | Better RSC streaming; optional |
| 10 | MINOR-9,10 (token elevation) | 20 min | Token discipline |
| 11 | SUGGESTION-1,2,3 | 1-2 hr | Further DRY; optional |

**Total estimated effort:** 5-7 hours for full cleanup; 1-2 hours for the top-4 priority fixes.

---

## Stage Summary

Phase 2 architecture is **sound at the macro level** and **drifty at the micro level**. The frontend-only boundary is intact, content is centralized, navigation is centralized, metadata is correctly split between page-level and layout-level, TypeScript is strict, and forms are properly reused via `PrototypeForm`. No blockers.

The 6 MAJOR findings all stem from a single root cause: **the shared-component catalog was defined once (Phase 1) but not enforced during Phase 2 page implementation**. Page authors reached for inline `<Card className="...">` patterns instead of extracting or extending shared primitives, and the `AudienceCard`/`MetricCard` components were created but never adopted. The `channels/page.tsx` reimplements channel-card logic because the shared `ChannelCard` was too narrow for the detail-page use case — a classic "shared component doesn't fit, so copy-paste" pattern.

The 11 MINOR findings are mostly dead code (5 unused shadcn primitives, 4 unused motion exports, 2 unused brand components, 1 unused dependency) and small token/DRY polish items.

**Recommendation:** Approve Phase 2 as-is for the current milestone. Schedule a 1-day cleanup sprint to address MAJOR-1 through MAJOR-6 and MINOR-1 through MINOR-4 before Phase 3 adds more pages on top of the current drift.
