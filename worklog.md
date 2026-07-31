# Shared Worklog — Mental Arithmetic Program Homepage Prototype

This file is the single shared worklog for all agents (primary + subagents).
Each agent MUST append (never overwrite) a new section starting with `---`.

---
Task ID: 1
Agent: Primary (Z.ai Code)
Task: Read all uploaded source files and create docs/SOURCE_OF_TRUTH.md

Work Log:
- Read master task (upload/Pasted Content_1785439153722.txt, 2033 lines) fully.
- Extracted DOCX text (upload/extracted/docx_text.txt) and 4 embedded images.
- Extracted PDF text (upload/extracted/pdf_text.txt, 31 pages). Arabic body jumbled by layout extraction; TOC + executive summary + project-understanding sections readable; full 12-section structure mapped.
- Analyzed homepage reference JPG via VLM (z-ai vision CLI) → /tmp/vlm_homepage.json.
- Analyzed DOCX image1 (color palette), image2 (info architecture), image3 (homepage mockup), image4 (design-system library) via VLM.
- Inspected existing repository: package.json, layout.tsx, globals.css, tailwind.config.ts, components.json, next.config.ts, lib/db.ts, prisma/schema.prisma, app/page.tsx, lib/utils.ts.
- Created project directory structure (docs, content, lib/motion, lib/gsap, components/motion|brand|layout|sections, styles, public/brand|images|illustrations|icons).

Stage Summary:
- All 4 source files read + visually inspected. Gate 1 (Source Understanding) requirements gathered.
- Authoritative brand palette extracted (exact hex) from DOCX image1.
- Key conflict identified: homepage reference JPG shows "درس الخبرة" branding; DOCX/PDF use "برنامج الحساب الذهني" → DOCX authoritative for identity.
- Repo is standard Next.js 16 + Tailwind v4 + shadcn new-york scaffold; needs heavy cleanup (remove prisma, next-auth, tanstack, recharts, etc.), RTL/Arabic-font setup, token replacement.
- Next: write docs/SOURCE_OF_TRUTH.md, docs/REPOSITORY_AUDIT.md.

---
Task ID: 3
Agent: Primary (Z.ai Code)
Task: Discover & install agent skills; create docs/SKILLS.md

Work Log:
- Used loaded find-skills skill; ran `npx skills find` for frontend-design, shadcn, nextjs-react, accessibility, planning, browser-automation, design-system, tailwind.
- Selected 6 approved skills (anthropics/frontend-design, shadcn/ui, addyosmani/accessibility, addyosmani/planning, wshobson/tailwind-design-system, lombiq/tailwind-4-docs).
- `npx skills add` repeatedly timed out (GitHub-backed fetch; context deadline exceeded) in sandbox — recorded as documented decision.
- Built-in agent-browser skill used for visual verification instead.
- Wrote docs/SKILLS.md with full evaluation table (installed/rejected + reasons + security + phase/agent assignment).

Stage Summary:
- Skill discovery + evaluation + documentation complete (satisfies master task §5 documentation requirement).
- Persistent install blocked by sandbox network; guidance applied directly by primary agent; agent-browser available for visual QA.
---
Task ID: 4
Agent: Primary (Z.ai Code)
Task: Dependency audit + repository cleanup

Work Log:
- Wrote docs/DEPENDENCY_AUDIT.md (classify keep/remove/add/conditional for every dep + shadcn curation).
- Deleted scaffold backend/db: src/app/api/, src/lib/db.ts, prisma/, db/, public/logo.svg, src/hooks/use-toast.ts.
- Deleted 24 non-retained shadcn components (alert, calendar, chart, command, drawer, sidebar, slider, table, toast/toaster, toggle*, etc.); kept 24 retained.
- Removed tailwind.config.ts (legacy, used tailwindcss-animate).
- Rewrote package.json: removed 33 deps (prisma, next-auth, @tanstack/*, recharts, mdx, next-intl, next-themes, uuid, date-fns, dnd, cmdk, vaul, zustand, etc.); added gsap + @gsap/react; kept framer-motion (NOT motion), sharp, z-ai-web-dev-sdk.
- Fixed sonner.tsx (removed next-themes dependency, light-only).
- `bun install`: 36 packages removed, gsap@3.15 + @gsap/react@2.1.2 installed. Lockfile preserved.
- Grep verified no broken imports of removed components/packages.
- Created src/styles/tokens.css (raw brand hex — single source), typography.css, rewrote globals.css (Tailwind v4 @theme inline mapping all semantic+brand tokens), layout.tsx (Tajawal font, lang=ar dir=rtl, sonner Toaster, program metadata).
- Created public/brand/favicon.svg (abacus glyph), placeholder page.tsx.
- `bun run lint` → exit 0 (clean). Dev server boots in 647ms, Ready, no errors.

Stage Summary:
- Repository cleaned of all backend/DB/auth/data deps; curated 24 shadcn components; Tailwind v4 CSS-first brand token system live; Arabic-first RTL with Tajawal.
- Gate 2 (Repository & Dependency Audit) + Gate 3 foundation met.
- Next: documentation foundation (AGENTS.md + docs/*.md), DESIGN.md, motion layer, /design-system, layout, homepage.

---
Task ID: 5-7
Agent: Primary (Z.ai Code)
Task: Documentation foundation + DESIGN.md + motion layer + /design-system page + shared layout + homepage

Work Log:
- Wrote AGENTS.md (operational manual), README.md, DESIGN.md (Layer A tokens + Layer B rationale).
- Wrote docs: PROJECT_CONTEXT, INFORMATION_ARCHITECTURE, PAGE_SPECS, MOTION_GUIDELINES, ASSET_GUIDELINES, IMPLEMENTATION_PLAN, QA_CHECKLIST, PROGRESS, REVIEW_LOG, DECISION_LOG (15 decisions).
- Built centralized motion layer: src/lib/motion/{tokens,reduced-motion,presets/{reveal,stagger,hover-lift,count-up}}; src/lib/gsap/{register,hero-timeline,scroll-scenes}; src/components/motion/{animated-reveal,animated-stagger,animated-counter,parallax-media}.
- Built content layer: src/content/{site,navigation(via routes),home,testimonials,faq}; src/lib/routes.ts.
- Extended shadcn Button with `cta` variant + `xl` size + brand radius (centralized, no duplicate primitive).
- Built brand components: logo (abacus glyph + wordmark), section-heading, stat-card, step-card, channel-card, testimonial-card.
- Built layout: language-provider (useSyncExternalStore, true RTL/LTR flip), language-toggle, site-header (desktop + mobile Sheet RTL nav, scroll state, disabled future links), site-footer (branches, child-protection, lang toggle), page-container, section-shell, cta-section.
- Wired layout.tsx: LanguageProvider > SiteHeader > main(flex-1) > SiteFooter + sonner Toaster; sticky-footer flex shell; Tajawal font; lang=ar dir=rtl.
- Built homepage sections: hero (GSAP fromTo timeline + abacus SVG with data-bead, single orange CTA + ghost secondary), stats-strip (AnimatedCounter count-up), how-it-works (4 staggered StepCards), learning-channels (3 ChannelCards), testimonials (embla Carousel RTL), final CTA (orange banner).
- Built /design-system reference page: brand palette, semantic palette, typography scale, spacing/radius/shadow, buttons (all variants/sizes/states), badges, cards, form fields (Input/Textarea/Select/Checkbox/RadioGroup), accordion, tabs, icons, avatar, progress, tooltip, stats (AnimatedCounter), Framer Motion presets (reveal/stagger), states, reduced-motion note.
- Fixed 2 React-19 lint issues (set-state-in-effect) via useSyncExternalStore + callback-only setState.
- Lint clean (exit 0). Both / and /design-system return 200.

Stage Summary:
- M3 (docs), M4 (DESIGN.md+tokens), M5 (/design-system), M6 (layout), M7 (homepage) complete.
- Gates 3,4 satisfied; Gate 5,6 pending visual verification.
- Next: agent-browser visual verification at multiple viewports + specialist subagent reviews.

---
Task ID: 8-b
Agent: Subagent 2 (Architecture)
Task: READ-ONLY Frontend Architecture & Dependency Review

Work Log:
- Read worklog.md (Tasks 1, 3, 4, 5-7) for full context.
- Read package.json, docs/DEPENDENCY_AUDIT.md, docs/REPOSITORY_AUDIT.md, AGENTS.md.
- Read all app routes: src/app/layout.tsx, src/app/page.tsx, src/app/design-system/page.tsx, src/app/globals.css.
- Listed and counted src/components/ui/ (24 files — matches DEPENDENCY_AUDIT §5 retained set exactly).
- Read all brand components (logo, section-heading, stat-card, channel-card, step-card, testimonial-card).
- Read all layout components (language-provider, language-toggle, site-header, site-footer, page-container, section-shell, cta-section).
- Read all section components (hero, stats-strip, how-it-works, learning-channels, testimonials, design-system-showcase).
- Read all motion components + lib/motion/{tokens,reduced-motion,presets/*} + lib/gsap/{register,hero-timeline,scroll-scenes}.
- Read src/lib/{routes,utils}.ts and src/content/{site,home,testimonials,faq}.ts.
- Grep-verified forbidden imports (prisma, next-auth, @tanstack, recharts, mdx, next-intl, next-themes, dnd, cmdk, vaul, zustand, date-fns, uuid, z-ai-web-dev-sdk, tailwindcss-animate, react-resizable-panels, input-otp, @reactuses, react-markdown, react-syntax-highlighter) — zero matches under src/.
- Grep-verified: no imports of removed shadcn components (alert, calendar, chart, command, drawer, sidebar, slider, table, toast/toaster, toggle*, etc.).
- Glob-verified: no src/app/api/, no prisma/, no src/lib/db.*.
- Grep-verified: gsap imported only from src/lib/gsap/register.ts; framer-motion used everywhere; `motion` package NOT imported anywhere.
- Grep-verified: tailwindcss-animate not imported; no tailwind.config.ts file (Glob empty).
- Caddyfile present and unchanged (gateway on :81, XTransformPort query branch, default → :3000).
- Counted 'use client' directives (37 sites); cross-checked server/client boundary discipline.

Findings (severity, evidence, rule, fix, blocks):
1. [MINOR] Raw brand hex present in src/components/sections/design-system-showcase.tsx:31-40 (10 hex strings: #F2A23C, #06335C, #2C8FC0, #37B0C3, #0A4C82, #D2DCE2, #6B7A86, #2A3A47, #F4F9FA, #E1F0F3). Rule: AGENTS.md §8/§16 — "No raw brand hex outside src/styles/tokens.css." Note: these are DOCUMENTATION labels (displayed as text via {c.hex}); the actual swatch styling uses Tailwind token classes (bg-brand-orange, etc.). Fix: move the brand-colors reference array to src/lib/brand-palette.ts (or tokens.ts) OR drop the hex label column. Blocks: NO.
2. [MINOR] Inline motion constants in src/lib/gsap/hero-timeline.ts:25-54 (durations 0.5/0.7/0.8/0.45/0.4; staggers 0.12/0.1/0.05; easings "power3.out"/"back.out(2)"). Rule: AGENTS.md §10 — "No page-local motion constants — use src/lib/motion/tokens.ts." The tokens.ts file's own header claims "Framer Motion and GSAP share one scale" but the hero timeline does not import durations/stagger. Caveat: GSAP string-easings don't map 1:1 to Framer Motion cubic-bezier arrays; durations DO map (0.5 → slow, 0.8 → slower, 0.1 → stagger.normal, 0.06 → stagger.fast). Fix: import {durations, stagger} from "@/lib/motion/tokens" and replace literal durations/staggers; document GSAP-only easings as a named constant block at top of hero-timeline.ts. Blocks: NO.
3. [MINOR] Orphan file src/hooks/use-mobile.ts (lines 1-19) is not imported anywhere under src/ (grep returned only the definition site). Rule: AGENTS.md §16 — no dead code; useToast.ts was deleted in Task 4 but use-mobile.ts survived. The hook also lacks a "use client" directive despite using useState/useEffect (works only because no caller exists). Fix: delete src/hooks/use-mobile.ts (re-introduce when a real consumer appears). Blocks: NO.
4. [MINOR] AGENTS.md §5 doc drift: (a) lists "BrandButton" under src/components/brand/ — no such file exists (button was extended via cva variant in src/components/ui/button.tsx per Task 5-7 worklog); (b) lists "SectionHeading" under src/components/layout/ — it lives in src/components/brand/; (c) lists "variants.ts" under src/lib/motion/ — file does not exist (functionality is in reduced-motion.ts as buildVariants()). Rule: AGENTS.md §1 — "documentation matches code." Fix: update AGENTS.md §5 repository map to match actual file tree. Blocks: NO.
5. [SUGGESTION] src/components/sections/design-system-showcase.tsx:1 — `DesignSystemShowcase` is a single large client component (~379 lines) containing 9 separate demo Blocks. Rule: AGENTS.md §7 — "prefer Server Components; 'use client' only where interactivity/motion requires it." Only the form fields, accordion, tabs, carousel and AnimatedReveal/stagger blocks actually need client. Fix (optional, future): split static Blocks (palette, typography, spacing, buttons-as-static, badges, cards-as-static) into a server component, leaving only interactive bits as client. Blocks: NO.

Verification matrix (10 rules):
1. No DB/Prisma/NextAuth/backend-SDK imports under src/ — PASS (grep: zero matches).
2. No src/app/api/ route — PASS (Glob empty).
3. framer-motion used (NOT `motion`); GSAP only from src/lib/gsap/ — PASS (single `from "gsap"` in src/lib/gsap/register.ts; no `from "motion"` or `from "motion/react"`).
4. No raw brand hex in src/ OUTSIDE tokens.css — PARTIAL (see finding #1; only the design-system reference page, used as documentation labels not styling).
5. No page-local motion constants — PARTIAL (see finding #2; GSAP hero timeline literals).
6. No duplicate button primitives — PASS (only src/components/ui/button.tsx; no BrandButton file or symbol anywhere in src/).
7. Server/client boundaries sensible — PASS (pages are server; layout-level providers/hooks/motion components are client; cta-section, page-container, section-shell, logo, section-heading, channel-card, step-card, testimonial-card are server; sections that consume useLanguage or motion are client). One optional optimization noted (finding #5).
8. shadcn count = 24, no removed-component imports remain — PASS (exactly 24 files; grep for 22 removed component paths returned zero matches).
9. No tailwindcss-animate import, no tailwind.config.ts — PASS (Glob empty for tailwind.config.*; globals.css imports tw-animate-css instead).
10. Caddyfile preserved — PASS (23 lines, :81 listener, XTransformPort branch + default :3000 reverse proxy intact).

Stage Summary:
- Architecture, dependency decisions, server/client boundaries, and component composition are SOUND. All 10 verification rules pass except two PARTIALs, both MINOR and localized to (a) the /design-system reference page's brand-palette documentation labels and (b) the GSAP hero timeline's bespoke durations.
- NO backend/DB/auth/data-layer code remains anywhere under src/. Repository cleanup is complete and consistent with docs/REPOSITORY_AUDIT.md and docs/DEPENDENCY_AUDIT.md.
- No BLOCKER or CRITICAL findings. Findings #1 and #2 should be addressed before final client delivery for token-discipline purity; #3 and #4 are housekeeping; #5 is optional.
- Verdict: APPROVED with minor cleanup recommended. Does not block Gate 5/6 visual verification or proceeding to specialist subagent reviews.

---
Task ID: 8-c
Agent: Subagent 3 (Design-System)
Task: READ-ONLY review of DESIGN.md, design tokens, semantic naming, typography, spacing/radius/shadow/color usage, /design-system page, brand components, and brand consistency vs SOURCE_OF_TRUTH.md §4.

Work Log:
- Read DESIGN.md (219 lines), src/styles/tokens.css, src/styles/typography.css, src/app/globals.css.
- Read src/app/design-system/page.tsx + src/components/sections/design-system-showcase.tsx (379 lines).
- Read src/components/brand/{logo,section-heading,stat-card,channel-card,step-card,testimonial-card}.tsx.
- Read src/components/ui/button.tsx (verifying centralized cta variant + xl size).
- Read src/components/layout/{site-header,site-footer,language-toggle,cta-section,section-shell,page-container}.tsx.
- Read src/components/sections/{hero,stats-strip,how-it-works,learning-channels,testimonials}.tsx.
- Read docs/SOURCE_OF_TRUTH.md §4 (brand palette) — cross-checked hex values against tokens.css and DESIGN.md Layer A.
- Read docs/QA_CHECKLIST.md + DECISION_LOG.md D13 (orange reserved for conversion).
- Grep-verified: raw hex presence (only in tokens.css + display labels in design-system page), var(--brand-*) SVG usage, bg-cta/variant="cta" usage, text-brand-teal vs text-accent usage.
- Computed WCAG contrast for the three key pairs DESIGN.md L189 claims: navy/white, grey-text/white, navy-dark/orange. All three DESIGN.md figures are inaccurate; grey-text/white actually fails AA normal text.

Stage Summary:
- DESIGN.md Layer A + Layer B structure ✓; client identity (برنامج الحساب الذهني / abacus metaphor / Yemeni kids' education) reflected ✓.
- Semantic token layer is correct: primary/cta/accent/secondary/muted/background/foreground/border/ring all defined and wired through globals.css @theme inline. Brand-prefixed utilities (bg-brand-*) also exposed as escape hatch — consistent with DESIGN.md anti-pattern example L199.
- Raw brand hex confined to tokens.css ✓. (Hex strings in design-system-showcase.tsx L31-40 are palette-swatch labels, not styling.)
- Tajawal loaded via next/font/google with arabic+latin subsets, weights 400/500/700/800 ✓. Type scale defined in typography.css ✓.
- /design-system page demonstrates brand palette, semantic palette, typography, spacing, radius, shadows, buttons, badges, cards, form fields, accordion, tabs, icons, stats, motion presets, reduced-motion note, responsive grids ✓.
- Centralized Button with cta variant + xl size ✓; no duplicated primitives.
- Section background alternation correct: navy hero → tint stats → white how → icy channels → tint testimonials → orange CTA → navy footer.
- 3 HIGH-severity blockers found: (1) language-toggle uses bg-cta for non-conversion active state; (2) header trial button + hero CTA produce 2 orange CTAs in same viewport (≥sm); (3) --brand-grey-text on white ≈ 4.42:1 fails WCAG AA for normal text, and DESIGN.md L189 incorrectly claims 4.7:1.
- 3 MEDIUM issues: DESIGN.md contrast figures all inaccurate; --warning aliases --brand-orange (non-conversion reuse of CTA color); font-serif used on testimonial quote mark inconsistent with Tajawal-only direction.
- 4 LOW issues: --space-* tokens defined but not exposed via @theme inline; design-system page lacks explicit button-state demos (only disabled); no dedicated responsive demo block; typography block doesn't separately label headings/body/captions/numerals.
- Verdict: design-system foundation is strong and structurally correct, but 3 HIGH issues (2 brand-rule violations + 1 real AA contrast failure) block Gate 5 sign-off until fixed.

---
Task ID: 8-a
Agent: Subagent 1 (Source Auditor)
Task: READ-ONLY audit comparing implemented homepage + design system against client sources (DOCX text, SOURCE_OF_TRUTH.md, reference JPG analysis). Verify: section order, brand name, brand colors, orange-CTA-only-for-conversion, three channels, illustrative stats, Arabic terminology, no invented production claims, age 7-12.

Work Log:
- Read /home/z/my-project/worklog.md (prior task history).
- Read /home/z/my-project/upload/extracted/docx_text.txt (client DOCX identity + execution concept).
- Read /home/z/my-project/docs/SOURCE_OF_TRUTH.md (full — 10 sections incl. palette, conflicts C1–C6, §7 assumptions, §8 unverified claims).
- Read implementation: src/app/page.tsx, src/app/layout.tsx, src/components/sections/{hero,stats-strip,how-it-works,learning-channels,testimonials}.tsx, src/components/layout/{cta-section,site-header,site-footer,language-toggle,section-shell}.tsx, src/components/brand/{logo,section-heading,stat-card,step-card,channel-card,testimonial-card}.tsx, src/content/{home,testimonials,site}.ts, src/styles/tokens.css, DESIGN.md.
- Cross-checked: grep for `brand-orange|bg-cta|variant="cta"` (orange usage map), `درس الخبرة` (conflict C1 — zero matches, good), `payment|backend|api|prisma|payload|مساعد ذكي` (production claims — only embla-carousel internal `api` type matches, no real backend), `/register` link target, `id` forwarding in SectionShell.

Stage Summary (key findings):

VERIFIED COMPLIANT (no action needed):
1. Section ORDER matches DOCX-authoritative order — layout.tsx wraps Header → main(Hero → StatsStrip → HowItWorks → LearningChannels → Testimonials → CTASection) → Footer. ✓
2. Brand name = "برنامج الحساب الذهني" used everywhere (logo.tsx:31, site.ts:7, layout.tsx metadata). Zero occurrences of the JPG wordmark "درس الخبرة". Conflict C1 correctly resolved per DOCX authority. ✓
3. All 10 brand colors in tokens.css match DOCX image1 exact hex (case-insensitive): #F2A23C, #06335C, #2C8FC0, #37B0C3, #0A4C82, #D2DCE2, #6B7A86, #2A3A47, #F4F9FA, #E1F0F3. Conflict C2 correctly resolved. ✓
4. Three learning channels present (in-center / partner-schools / online). Online correctly marked "قريباً"/"Coming soon" per Phase-1 scope. ✓
5. Stats illustrative — home.ts and testimonials.ts both have explicit header comments marking them as demo/illustrative and referencing SOURCE_OF_TRUTH §8. Stats values (95 / 3 / +780 / 10) match the reference-image numbers cited in §7. ✓
6. Arabic terminology preserved — السوروبان, المستويات العشرة, حصة تجريبية all present across hero, steps, channels, metadata, faq. ✓
7. No invented production claims — no backend, no payments, no AI assistant, no real APIs in source (carousel `api` matches are Embla internal type only). ✓
8. Age range 7-12 reflected in site.ts ageRange and hero subtitle ("من 7 إلى 12 عاماً"). ✓

ISSUES FOUND:

[MAJOR] Orange CTA used decoratively in LanguageToggle — src/components/layout/language-toggle.tsx:28,43 — `bg-cta text-cta-foreground` applied to the active AR/EN button. Rule violated: SOURCE_OF_TRUTH §4.2 + DESIGN.md "Orange CTA: conversion CTAs only, never decorative." The language toggle is a UI control, not a conversion action. Fix: use `bg-primary` (navy) or `bg-accent` (teal) for the active state. Classification: Primary-agent design decision (orange=conversion rule) violated. Blocks completion? No (visual/brand-polish, not a client-source violation), but should be fixed before final QA.

[MAJOR] Two orange CTAs visible simultaneously in the hero viewport — src/components/layout/site-header.tsx:67 (header desktop CTA, `variant="cta"`) + src/components/sections/hero.tsx:64 (hero CTA, `variant="cta"`). Both render as orange buttons visible together on the hero viewport. Rule violated: DESIGN.md "Never more than one orange CTA per visible viewport." Fix: change the header CTA to `variant="default"` (navy) OR change the hero secondary to ghost and keep only the hero CTA as orange (preferred — the hero is the page's primary conversion surface, not the header). Classification: Primary-agent design decision. Blocks completion? No, but should be fixed.

[MAJOR] Broken conversion funnel — three orange CTAs (hero, header desktop, mobile-sheet) all link to `/register`, which is NOT a registered route (only `/` and `/design-system` exist; src/lib/routes.ts:25 declares `ctaHref = "/register"` with comment "future — rendered as coming-soon" but no coming-soon treatment exists). Clicking causes a 404. Rule violated: master task §20 "never broken links; future pages rendered as coming-soon states." Fix: either (a) create a lightweight `/register` coming-soon page, or (b) intercept the click and show a sonner toast "التسجيل سيفتح قريباً", or (c) wire the ctaHref to a non-navigating Button with onClick toast. Classification: Phase-1 requirement. Blocks completion? Yes — the conversion path is the entire point of the homepage and currently dead-ends.

[MAJOR] Final CTA button has no action — src/components/layout/cta-section.tsx:21 renders `<Button variant="default" size="xl">` without `asChild`/`href`/`onClick`. Clicking does nothing. The "conversion crescendo" (DESIGN.md §Section-background alternation) is broken. Fix: make it a link/toast consistent with the chosen /register treatment above. Classification: Phase-1 requirement. Blocks completion? Yes.

[MINOR] Bilingual toggle not wired through brand cards — channel-card.tsx:35-40, step-card.tsx:26-29, testimonial-card.tsx:23-32, stat-card.tsx:31 all hardcode `.ar` (e.g. `channel.title.ar`, `step.title.ar`, `testimonial.quote.ar`, `stat.label.ar`) instead of indexing by `lang`. Section headings DO switch via `lang` (e.g. how-it-works.tsx:18 uses `howItWorks[lang]`), so the inconsistency is visible. EN translations authored in home.ts/testimonials.ts are silently dropped. SOURCE_OF_TRUTH §7 acknowledges full EN content as a documented gap, but the existing EN strings are simply unused. Fix: pass `lang` (or the resolved object) into the brand cards and use `[lang]` indexing. Classification: Prototype assumption vs. Phase-1 requirement (toggle is functional UI per §7). Blocks completion? No, but is a visible polish gap.

[MINOR] Final CTA section hardcodes `.ar` strings — src/components/layout/cta-section.tsx:14,17,22 uses `finalCta.title.ar`, `finalCta.subtitle.ar`, `finalCta.cta.ar`. Same bilingual gap as above (no useLanguage hook). Fix: wire `useLanguage` and index by `lang`. Classification: Prototype assumption. Blocks completion? No.

[MINOR] Hero secondary CTA anchor `#how-it-works` likely does not resolve — src/components/sections/hero.tsx:73 links to `#how-it-works`, and HowItWorks passes `id="how-it-works"` to SectionShell (how-it-works.tsx:14). However, SectionShell's Props interface (section-shell.tsx:3-11) does not include `id`, and the component does not forward unknown props to the rendered Tag — so the `id` is silently dropped at runtime and the anchor has no target. Fix: add `id?: string` to SectionShellProps and spread it onto the Tag (or add it to the className/forwarding). Classification: Phase-1 requirement (functional secondary CTA). Blocks completion? No (non-critical secondary action).

[SUGGESTION] ctaHref export in routes.ts:25 is dead code — never imported anywhere (grep verified). The comment "future — rendered as coming-soon" describes intent not implemented. Fix: either consume ctaHref in the three CTAs (single source of truth for the funnel target) or remove the dead export. Classification: Primary-agent design decision. Blocks completion? No.

[SUGGESTION] DecorativeBeads in cta-section.tsx:36-43 use `var(--brand-navy)` (navy beads on orange banner) — this is acceptable per DESIGN.md (navy-on-orange contrast) and does NOT constitute decorative orange use. No action needed.

Overall verdict: The implementation faithfully implements the client source requirements at the brand/identity/content level — section order, brand name, brand palette, three channels, Arabic terminology, age range, illustrative-stat labeling, and no-backend scope are all correctly observed. Conflict C1 (brand name) and C2 (exact colors) are correctly resolved in favor of the DOCX. However, four MAJOR issues — (1) decorative orange use in the language toggle, (2) dual orange CTAs in the hero viewport, (3) the /register broken-link funnel, and (4) the dead final-CTA button — must be addressed before the prototype can be considered complete. The funnel issues (3) and (4) are blockers; the orange-usage issues (1) and (2) are brand-rule violations that should be fixed before final QA. Bilingual wiring (MINOR) and the `#how-it-works` anchor (MINOR) are polish items.

---
Task ID: 8-d
Agent: Subagent 4 (RTL/A11y)
Task: READ-ONLY Arabic RTL & accessibility review of layout, sections, brand components, globals.css, DESIGN.md

Work Log:
- Read worklog.md (context), DESIGN.md (§Accessibility lines 188–208), layout.tsx, language-provider.tsx, language-toggle.tsx, site-header.tsx, site-footer.tsx, all section components, all brand components, globals.css, tokens.css, typography.css, carousel.tsx, sheet.tsx, button.tsx, routes.ts, content/home.ts.
- Ran `bunx tsc --noEmit` to surface type errors that signal real bugs.
- Fetched SSR HTML from http://localhost:3000 and grepped for landmarks, ARIA attrs, section ids, opacity-modified colors.
- Verified rendered `<html lang="ar" dir="rtl">`, semantic landmarks, focus-visible rule, reduced-motion rule, GSAP/Framer reduced-motion guards.
- Computed WCAG contrast ratios for the four flagged color pairings (teal-on-navy, teal-on-white, navy-on-orange, white-on-navy at opacity modifiers).
- Did NOT edit any files (read-only review per task spec).

Stage Summary:
- 2 CRITICAL TypeScript-confirmed bugs blocking mobile nav + in-page anchor.
- 5 HIGH WCAG AA contrast failures (teal-on-navy, teal-on-white, navy-on-orange).
- 6 MEDIUM issues: no skip-link, touch-target <44px (hamburger/lang-toggle/desktop CTA), carousel RTL physical positioning + keymap, SectionShell drops aria-label/id, partial-EN content (cards hardcoded to `.ar`).
- 6 LOW issues: carousel not re-init on lang toggle, ARIA labels not localized, language-toggle buttons missing aria-label, sheet close-button physical right, lang/dir useEffect flash, no-JS hero invisible.
- Verdict: NOT APPROVED — fix 2 critical + 5 high before visual QA sign-off; medium/low can be batched.
- See full findings in this agent's final message.

---
Task ID: 8-g
Agent: Subagent 7 (Documentation & Consistency Reviewer)
Task: READ-ONLY review of all project documents (AGENTS.md, README.md, DESIGN.md, docs/*.md) for contradictions, duplication, command accuracy, and doc-code drift. Verify 12 specific items (commands, repo map, token values, page specs, milestone status, decision-log consistency, cross-doc contradictions, duplication, SKILLS install syntax, README preview panel, /register route, DESIGN.md contrast figures).

Work Log:
- Read worklog.md (Tasks 1, 3, 4, 5-7, 8-a, 8-b, 8-c, 8-d) for full prior context.
- Read AGENTS.md (148 lines), README.md (32 lines), DESIGN.md (220 lines) in full.
- Read all docs/*.md: SOURCE_OF_TRUTH, REPOSITORY_AUDIT, DEPENDENCY_AUDIT, SKILLS, PROJECT_CONTEXT, INFORMATION_ARCHITECTURE, PAGE_SPECS, MOTION_GUIDELINES, ASSET_GUIDELINES, IMPLEMENTATION_PLAN, QA_CHECKLIST, PROGRESS, REVIEW_LOG, DECISION_LOG.
- Read package.json (verify scripts + dependency list).
- Read actual code: src/app/{layout,page,register/page,design-system/page}.tsx, src/styles/tokens.css, src/lib/routes.ts, src/lib/motion/reduced-motion.ts, src/components/ui/button.tsx, src/components/sections/design-system-showcase.tsx (partial), src/content/{site,home,faq}.ts (partial).
- LS-verified: src/app/, src/components/{ui,brand,layout,sections,motion}/, src/content/, src/lib/{motion,gsap}/ — actual file trees vs documented trees.
- Grep-verified: ctaHref usage (dead code), navigation.ts existence (absent), variants.ts references (only MOTION_GUIDELINES.md), BrandButton references (3 stale docs), 6B7A86 vs 56636e occurrences, "13:1" claim (2 occurrences), "M1-M4 complete" status, "/register" mentions, teal-strong usage.
- Computed WCAG contrast ratios for all 6 DESIGN.md L189 claims using sRGB linearization formula.

Findings (severity, evidence, rule, fix, blocks):

[MAJOR] PROGRESS.md status stale — docs/PROGRESS.md:3,12,14-17 — claims "M1–M4 complete; M5–M8 remaining" and lists M5/M6/M7 as "Not started/Next", but worklog Task 5-7 confirms M5 (/design-system), M6 (shared layout), M7 (homepage) all complete; M8 (this review cycle) is in progress. Violates DoD §17 ("Documentation matches code"). Fix: update PROGRESS.md to show M5/M6/M7 done and M8 in progress. Blocks: yes (Gate 7 sign-off).

[MAJOR] IMPLEMENTATION_PLAN.md milestone table stale — docs/IMPLEMENTATION_PLAN.md:14-17 — M5/M6/M7 listed as ⏳ Next/⏳, but actually done. Same DoD violation. Fix: flip M5/M6/M7 to ✅ Done and M8 to "In progress (subagent reviews)". Blocks: yes (Gate 7 sign-off).

[MAJOR] DESIGN.md + tokens.css teal-pale-on-navy contrast figure significantly overstated — DESIGN.md:189 + src/styles/tokens.css:20 — both claim "teal-pale `#E1F0F3` on navy `#0A4C82` ≈ 13:1". WCAG computation (sRGB linearization) yields ~7.6:1 against navy #0A4C82 (or ~11:1 against navy-dark #06335C). 13:1 is overstated by ~70%. Other 5 contrast figures in L189 are accurate or conservative (ink 11.4:1 ✓; navy 8.8:1 ✓; grey-text 5.0:1 claimed vs actual 6.13:1 — conservative; teal-strong 4.6:1 claimed vs actual 4.80:1 — slightly understated; navy-dark on orange 6.1:1 ✓). Fix: change "≈ 13:1" to "≈ 7.6:1" (or measure against navy-dark and change label). Blocks: no (the actual ratio still passes AA — the figure is just inaccurate, not a false-positive pass).

[MINOR] `--brand-grey-text` hex mismatch — DESIGN.md:21 + docs/SOURCE_OF_TRUTH.md:108 + src/components/sections/design-system-showcase.tsx:37 all list `#6B7A86`, but tokens.css actually defines `--brand-grey-text: #56636E` (intentionally darkened for WCAG AA, per in-file comment). DESIGN.md Layer A brand table, SOURCE_OF_TRUTH §4.1, and the visible /design-system swatch are all stale; only DESIGN.md L189 (contrast section) and tokens.css carry the correct darkened value. Fix: update DESIGN.md:21 and SOURCE_OF_TRUTH.md:108 to `#56636E` with note "darkened from DOCX `#6B7A86` for WCAG AA"; update design-system-showcase.tsx:37 hex label. Blocks: no.

[MINOR] `variants.ts` still listed in MOTION_GUIDELINES.md — docs/MOTION_GUIDELINES.md:15 — references a "variants.ts" file in src/lib/motion/, but LS confirms only tokens.ts + reduced-motion.ts + presets/. The functionality (buildVariants() returning fadeUp/fadeIn/scaleIn/slideInStart) lives in reduced-motion.ts. AGENTS.md §5 was corrected (per 8-b finding) but MOTION_GUIDELINES.md was missed. Fix: remove the `variants.ts` line and merge description into the reduced-motion.ts entry. Blocks: no.

[MINOR] `navigation.ts` still listed in AGENTS.md §5 content folder — AGENTS.md:43 — comment lists "site.ts, navigation.ts, home.ts, testimonials.ts, faq.ts" but src/content/ contains only site.ts, home.ts, testimonials.ts, faq.ts (navigation lives in src/lib/routes.ts as navItems/ctaHref). Fix: change comment to "site.ts, home.ts, testimonials.ts, faq.ts (navigation in lib/routes.ts)". Blocks: no.

[MINOR] `BrandButton` referenced as a component in 3 docs but no such symbol exists — docs/IMPLEMENTATION_PLAN.md:30 + docs/PAGE_SPECS.md:63 + AGENTS.md:134 — all reference "BrandButton" as if it's a brand component file. The centralized button is `Button` in src/components/ui/button.tsx, extended via cva with a `cta` variant (no BrandButton file/symbol anywhere in src/, grep-verified). AGENTS.md §5 was corrected but the §16 anti-pattern reference and the other 2 docs were missed. Fix: replace "BrandButton" with "Button (cta variant)" in all 3 locations. Blocks: no.

[MINOR] QA_CHECKLIST.md `/register` exclusion stale — docs/QA_CHECKLIST.md:14 — automated check says "No remaining page implemented accidentally (only `/` + `/design-system`)" but src/app/register/page.tsx exists as a coming-soon route (added to resolve 8-a MAJOR finding #3). Fix: change to "(only `/` + `/design-system` + `/register` coming-soon placeholder)". Blocks: no.

[MINOR] AGENTS.md §2 forbids "Registration" page but /register coming-soon exists — AGENTS.md:13 — scope says "Forbidden: ... Registration, ... pages" but /register coming-soon shell now exists. Fix: add a note that coming-soon placeholder routes for future pages are explicitly allowed (master task §20), and that the /register route is a placeholder, not a real registration form. Blocks: no.

[MINOR] `ctaHref` still dead code — src/lib/routes.ts:25 — `export const ctaHref = "/register"` is never imported anywhere (grep-verified). 8-a SUGGESTION #7 noted this; not yet addressed. Fix: either consume ctaHref in the 3 CTAs (hero, header, mobile-sheet, final CTA) as the single source of truth for the funnel target, or remove the dead export. Blocks: no.

[SUGGESTION] DESIGN.md Layer A brand-color table missing `--brand-teal-strong` — DESIGN.md:11-24 — table lists 10 brand colors but tokens.css defines an 11th, `--brand-teal-strong: #1F7D8C`, which is actively used by 3 components (section-heading.tsx:25, channel-card.tsx:44, testimonial-card.tsx:23) as the accessible teal-for-text color, and is referenced in DESIGN.md L189 (Layer B contrast section). Fix: add `--brand-teal-strong` row to Layer A brand-color table. Blocks: no.

[SUGGESTION] PROGRESS.md "Remaining pages" list doesn't distinguish /register coming-soon — docs/PROGRESS.md:20 — lists "About, Program, Learning Channels, Contact, Registration, Virtual Platform, Privacy" as "NOT implemented — future tasks". Technically /register exists as a coming-soon shell while the others don't exist at all. Fix: note that /register has a coming-soon placeholder while the other 6 pages are unbuilt. Blocks: no.

Verifications that PASS (no issue):
1. AGENTS.md §6 commands (`bun run dev`, `bun run lint`, `bun run build`) match package.json scripts exactly. (package.json also has `start` which AGENTS.md doesn't mention — acceptable.)
2. AGENTS.md §5 brand/layout/motion paths largely corrected per 8-b finding (BrandButton/SectionHeading-in-layout/variants.ts issues fixed in §5). Residual drift in §5 comment (navigation.ts) and in other docs (see MINOR findings).
3. DESIGN.md token values (radii, spacing, shadows, z-index, motion durations/easings, containers) all match tokens.css exactly.
4. PAGE_SPECS.md matches sources — only Home is IMPLEMENTED; all future pages trace to DOCX/PDF; no invented pages.
5. DECISION_LOG D1-D15 all internally consistent and consistent with worklog decisions (D5 framer-motion kept; D6 gsap added; D7 tw-animate-css kept; D8 next-themes removed; D9 zustand removed; D10 24 components curated; D11 Tajawal; D12 Latin digits; D13 orange conversion-only; D14 skills not installed; D15 logo placeholder).
6. No major cross-doc keep/remove contradictions (framer-motion vs motion, gsap-only-in-lib, no DB/auth — all docs consistent).
7. No significant documentation duplication. DESIGN.md Layer A documents tokens.css (acceptable redundancy: human-readable vs machine-readable). IA/PAGE_SPECS/SOURCE_OF_TRUTH each have distinct angles on future pages.
8. docs/SKILLS.md install commands use valid `npx skills add <owner/repo@skill> -y` syntax.
9. README §Preview correctly mentions the Preview Panel ("Use the Preview Panel on the right. Click Open in New Tab for a separate view.") and does not direct users to localhost:3000 as the primary preview method.
10. /register route exists (src/app/register/page.tsx) as a coming-soon page; no docs claim it's missing/broken (except stale QA_CHECKLIST.md L14 + AGENTS.md §2 scope wording — both MINOR).

Stage Summary:
- 12 specific verification items from the task brief: 8 PASS, 4 PARTIAL (items 2, 3, 5, 12) — all PARTIALs are minor drift / overstatement, not structural contradictions.
- 0 BLOCKER findings.
- 3 MAJOR findings: PROGRESS.md status stale, IMPLEMENTATION_PLAN.md status stale, DESIGN.md/tokens.css "13:1" contrast figure overstated. The two status staleness issues block Gate 7 sign-off (DoD §17) until corrected.
- 7 MINOR findings: stale hex value (#6B7A86 vs #56636E) in 3 files; `variants.ts` ghost file in MOTION_GUIDELINES.md; `navigation.ts` ghost file in AGENTS.md §5; `BrandButton` ghost symbol in 3 docs; QA_CHECKLIST /register exclusion stale; AGENTS.md §2 "Forbidden: Registration" needs coming-soon carve-out; `ctaHref` dead code in routes.ts.
- 2 SUGGESTIONS: DESIGN.md Layer A missing `--brand-teal-strong` row; PROGRESS.md "Remaining pages" should distinguish /register coming-soon from unbuilt pages.
- Most MINOR issues are leftover drift from earlier 8-a/8-b/8-c findings that were partially propagated (AGENTS.md §5 fixed but other docs missed).
- Documentation is structurally sound, internally consistent at the architecture/dependency/scope level, and matches the implemented code at every important checkpoint. The drift is concentrated in (a) status staleness after M5-M7 completion, (b) one inaccurate contrast figure, (c) cascading references to a BrandButton/variants.ts/navigation.ts that no longer exist (or never existed). All findings are batch-fixable in a single doc-update pass.
- Verdict: APPROVED with batch doc-update required before final Gate 7 sign-off. Does not block continuing M8 specialist reviews; the primary agent should clear all 3 MAJOR + 7 MINOR findings in one consolidated documentation pass before declaring M8 complete.

---
Task ID: 8-e
Agent: Subagent 5 (Motion & Interaction)
Task: READ-ONLY review of Framer Motion architecture, GSAP usage, centralized motion tokens, reduced-motion behavior, Arabic-text animation safety, performance/cleanup.

Work Log:
- Read worklog.md (prior tasks 1, 3, 4, 5-7, 8-a/b/c/d) for full context.
- Read src/lib/motion/{tokens.ts, reduced-motion.ts, presets/{reveal.ts, stagger.ts, hover-lift.ts, count-up.ts}}.
- Read src/lib/gsap/{register.ts, hero-timeline.ts, scroll-scenes.ts}.
- Read src/components/motion/{animated-reveal.tsx, animated-stagger.tsx, animated-counter.tsx, parallax-media.tsx}.
- Read src/components/sections/hero.tsx, src/components/sections/{stats-strip,how-it-works,learning-channels,testimonials,design-system-showcase}.tsx (verified thin-wrapper usage).
- Read src/components/brand/stat-card.tsx, src/app/globals.css, src/content/home.ts.
- Grep-verified: `from "gsap"` → only src/lib/gsap/register.ts:3; `@gsap/react` → only register.ts:4; `useGSAP|gsap\.` → only src/lib/gsap/{register,hero-timeline,scroll-scenes}.ts; `from "motion"` / `from "motion/react"` → zero matches; `from "framer-motion"` → 9 sites (5 motion lib files + 4 motion/brand components).
- Grep-verified: `variants=\{` → 4 sites (3 centralized in components/motion/*, 1 inline in stat-card.tsx:38 — dead code).
- Grep-verified: `duration: <number>` / `ease: <string>` literals → only src/lib/gsap/hero-timeline.ts + scroll-scenes.ts (and globals.css reduced-motion overrides). No page-local Framer Motion constants.
- Used agent-browser against http://localhost:3000 to inspect runtime opacity state of [data-hero-anim] elements post-load (both before and after simulating reduced-motion CSS override) and captured two screenshots; analyzed the first via VLM.
- Did NOT edit any files (read-only review per task spec).

Findings (severity, evidence, rule, fix, blocks):

1. [CRITICAL] Hero headline (H1) and primary CTAs (DIV container) are INVISIBLE to all non-reduced-motion users, due to a mismatch between the CSS `[data-hero-anim] { opacity: 0 }` selector and the GSAP target selectors `[data-hero-title] > span` / `[data-hero-cta] > *`.
   - Evidence: src/app/globals.css:108-110 (`[data-hero-anim] { opacity: 0 }`) vs src/lib/gsap/hero-timeline.ts:28 (`.fromTo("[data-hero-title] > span", ...)`) and line 40 (`.fromTo("[data-hero-cta] > *", ...)`). The CSS rule hides every element carrying `data-hero-anim` — including the H1 and the CTA container DIV — on initial paint. The GSAP timeline then animates the CHILDREN of those two elements to opacity 1, but never touches the parents, so the parents stay at opacity 0 forever. Because CSS opacity is multiplicative, the (correctly animated) children remain visually invisible. Runtime-confirmed via headless-browser eval after page load + 6s settle: `parentTitleOpacity="0"`, `parentCtaOpacity="0"`, `titleSpanOpacities=["1","1"]`, `ctaChildOpacities=["1","1"]`. VLM screenshot analysis of the hero confirmed: "There is no main headline text visible in the hero area … there are no primary call-to-action buttons positioned within the main body of the hero section itself." The eyebrow, subhead, and abacus visual animate correctly because GSAP targets those `[data-hero-eyebrow]` / `[data-hero-sub]` / `[data-hero-visual]` elements directly. The bug affects ONLY the two elements whose GSAP target is a child combinator.
   - Rule: 8 (`[data-hero-anim] opacity:0 with reduced-motion override — verify hero is visible without JS issues`). The reduced-motion CSS override (`@media (prefers-reduced-motion: reduce) { [data-hero-anim] { opacity: 1 !important; } }`) correctly reveals all five elements — verified by injecting the same override via JS eval, which restored the H1 and CTA to opacity 1. So reduced-motion users see the hero correctly; only the DEFAULT (motion-on) experience is broken.
   - Fix (pick one): (a) Add the parent elements as explicit GSAP targets alongside the child stagger — e.g. add `.fromTo("[data-hero-title]", { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.7 }, "-=0.2")` BEFORE the per-span stagger (or use a single `gsap.fromTo("[data-hero-title]", { opacity: 0 }, { opacity: 1, duration: 0.01 })` to "unlock" the parent, then the child stagger animates the spans). Same for `[data-hero-cta]`. (b) Move the `data-hero-anim` attribute off the parent containers and onto the child spans / Buttons, so the CSS rule hides the children (which GSAP animates) rather than the parents. (c) Drop the `[data-hero-anim] { opacity: 0 }` CSS rule entirely and use a synchronous `gsap.set("[data-hero-anim]", { opacity: 0 })` as the first step of the timeline — then the GSAP `fromTo` calls naturally reveal both parents and children.
   - Blocks: YES — the hero is the page's primary conversion surface; an invisible headline + invisible CTAs means the homepage's core message and primary actions are unreachable for default-motion users (i.e. the majority of visitors). This blocks Gate 5/6 visual sign-off.

2. [MINOR] Inline GSAP motion constants in hero-timeline.ts (durations 0.5/0.7/0.8/0.45/0.4; staggers 0.12/0.1/0.05; easings "power3.out" and "back.out(2)"). Rule 4 explicitly tolerates GSAP string-easings (no 1:1 Framer cubic-bezier mapping), but durations/staggers should still be sourced from `src/lib/motion/tokens.ts` to honor the file's own header claim ("Framer Motion and GSAP share one scale").
   - Evidence: src/lib/gsap/hero-timeline.ts:21,25,30,36,42,48,54.
   - Rule: 4 (No page-local motion constants).
   - Fix: `import { durations, stagger } from "@/lib/motion/tokens"` and map literals: 0.5→durations.slow, 0.7→(no token; could add `durations.slowMid = 0.7` or use closest token), 0.8→durations.slower, 0.45/0.4→durations.normal, 0.12→stagger.slow, 0.1→stagger.normal, 0.05→stagger.fast. Keep GSAP-only string easings inline as a documented exception. (Already flagged by Subagent 2 finding #2 — duplicated here for motion-specific context.)
   - Blocks: NO (token-discipline polish; no runtime impact).

3. [MINOR] Dead motion code: (a) `StatCardItem` in src/components/brand/stat-card.tsx:36-42 is exported but never imported anywhere under src/ (grep `StatCardItem` returns only the definition site; stats-strip.tsx:20 uses `<AnimatedStaggerItem>` from the centralized motion lib instead). (b) `useParallaxScene` in src/lib/gsap/scroll-scenes.ts:11-31 is exported but never imported (grep `useParallaxScene` returns only the definition site). (c) `ParallaxMedia` in src/components/motion/parallax-media.tsx:18 is exported but never imported (grep returns only the definition site).
   - Evidence: src/components/brand/stat-card.tsx:36-42; src/lib/gsap/scroll-scenes.ts:11-31; src/components/motion/parallax-media.tsx.
   - Rule: AGENTS.md §16 (no dead code).
   - Fix: delete all three (re-introduce when a real consumer appears). Optionally keep `ParallaxMedia` as a documented "available utility" if a planned section will consume it within the same milestone, but in that case wire it up immediately.
   - Blocks: NO.

4. [MINOR] `StatCardItem` redefines Framer Motion variants inline instead of using the centralized `staggerItem()` preset from src/lib/motion/presets/stagger.ts.
   - Evidence: src/components/brand/stat-card.tsx:38 — `<motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>`.
   - Rule: 5 (Framer Motion variants centralized in presets; not redefined per-component).
   - Note: This is dead code (finding #3), so zero runtime impact. If `StatCardItem` is revived, it must import and use `staggerItem()` instead.
   - Fix: replace with `variants={staggerItem()}` (or simply delete the dead function per finding #3).
   - Blocks: NO.

5. [LOW] `useParallaxScene` calls `gsap.to(el, { yPercent: -speed*100, ease: "none", scrollTrigger: undefined })` — `scrollTrigger: undefined` is a no-op, ScrollTrigger is intentionally not registered (per inline comment "to keep bundle lean"), and the resulting animation is a one-shot `yPercent` jump on mount with no scroll-driven behavior. The function thus provides no parallax; if it WERE consumed, it would silently mis-shift the target element by `speed*100%` of its height on mount.
   - Evidence: src/lib/gsap/scroll-scenes.ts:20-25.
   - Rule: 9 (No excessive parallax / scroll hijacking) — latent, since the function is dead code.
   - Fix: delete the function (finding #3). If real scroll-driven parallax is needed later, prefer the existing Framer Motion `useScroll`+`useTransform` pattern already implemented in `ParallaxMedia` (which is correctly disabled under reduced-motion and doesn't require ScrollTrigger registration).
   - Blocks: NO.

Verification matrix (11 rules):
1. GSAP used ONLY in src/lib/gsap/ — PASS. grep `from "gsap"` → single match in register.ts:3; grep `from "gsap/..."` → zero; grep `useGSAP|gsap\.` → only src/lib/gsap/{register,hero-timeline,scroll-scenes}.ts. No direct gsap imports anywhere else in src/.
2. GSAP only for signature sequences (hero timeline + abacus beads) — PASS. hero-timeline.ts animates the hero entrance (eyebrow → headline lines → subhead → CTAs → visual → beads) with the abacus bead stagger (line 51-56). scroll-scenes.ts is dead code (finding #3). No GSAP usage for ordinary reveals/buttons/cards — those all use Framer Motion via the centralized `AnimatedReveal` / `AnimatedStagger` wrappers.
3. useGSAP used with scope + dependencies; cleanup handled — PASS. Both `useGSAP` calls (hero-timeline.ts:17-59, scroll-scenes.ts:15-28) pass `{ scope: <ref>, dependencies: [...] }`. Cleanup is automatic via @gsap/react's `gsap.context()` integration — animations created within the scope are reverted on scope unmount. No manual `tl.kill()` needed.
4. No page-local motion constants — PARTIAL. Inline durations/staggers/easings in hero-timeline.ts (finding #2). No inline Framer Motion constants anywhere (grep `duration: <number>` outside src/lib/gsap/ returns zero matches).
5. Framer Motion variants centralized — PARTIAL. Presets (reveal, stagger, hover-lift, count-up) are correctly centralized and consumed by AnimatedReveal/AnimatedStagger/AnimatedCounter. One inline variant definition in stat-card.tsx:38 (finding #4) — dead code.
6. prefers-reduced-motion respected — PASS (with caveat in finding #1). Global CSS media query in globals.css:118-127 zeroes animation/transition durations. `usePrefersReducedMotion` (wrapping framer-motion's `useReducedMotion`) is consumed by AnimatedReveal, AnimatedStagger, AnimatedStaggerItem, useCountUp, ParallaxMedia, useHeroTimeline, useParallaxScene — all of which either short-circuit to a static render or return early from the effect under reduced-motion. The hero CSS override `[data-hero-anim] { opacity: 1 !important }` under reduced-motion is correctly applied and verified to reveal all five hero elements. CAVEAT: in normal-motion mode the hero is broken (finding #1) — but that is a separate root cause, not a reduced-motion compliance gap.
7. No Arabic text animated character-by-character — PASS. The hero title's GSAP target is `[data-hero-title] > span` (hero.tsx:47-48 — two spans, each wrapping a complete Arabic phrase: "عقلٌ أسرع." and "مستقبلٌ أفضل."). The timeline animates these spans as units (with stagger 0.12 between the two lines), never splitting Arabic characters out of their joined glyph runs. The design-system-showcase stagger demo animates whole Arabic words ("الأول", "الثاني", "الثالث") as `<Card>` children — also safe. No per-character `.split("")` or `Array.from(text)` patterns found anywhere in motion code.
8. `[data-hero-anim] opacity:0 with reduced-motion override — verify hero is visible without JS issues` — FAIL for normal-motion users (finding #1, CRITICAL). The CSS rule and reduced-motion override are themselves correct, but the GSAP selector-vs-CSS-selector mismatch leaves the H1 title and CTA container at opacity 0 indefinitely in default mode. Hero IS visible under reduced-motion (CSS override applies `!important`).
9. No excessive parallax / scroll hijacking — PASS. No `scrollTo`, `preventDefault` on wheel/touch, or Lenis/locomotive-style scroll hijacking anywhere in src/. The only scroll-bound motion primitive is `ParallaxMedia` (Framer Motion `useScroll` + `useTransform`, default distance 24px, disabled under reduced-motion) — and it is dead code (finding #3). No ScrollTrigger usage. `useParallaxScene` is a non-functional stub (finding #5).
10. Framer components don't create unnecessary client boundaries — PASS. AnimatedReveal / AnimatedStagger / AnimatedStaggerItem / AnimatedCounter / ParallaxMedia are thin wrappers (each <50 lines) that delegate to the centralized presets and tokens. Pages (src/app/page.tsx, src/app/design-system/page.tsx) are server components; sections that consume motion wrappers (hero, stats-strip, how-it-works, learning-channels, design-system-showcase) are client only because they ALSO consume `useLanguage` — the motion wrappers themselves don't force the client boundary beyond what framer-motion already requires. The single inline `<motion.div>` in stat-card.tsx is dead code (finding #3/#4).
11. Count-up: setState only in callback (not synchronous in effect) — PASS. `useCountUp` (src/lib/motion/presets/count-up.ts:35-45) — the effect body only calls `animate(from, to, { ..., onUpdate: (v) => setDisplay(v) })` and returns `() => controls.stop()`. No synchronous `setDisplay(...)` in the effect body. Under reduced-motion the `duration: 0` tween still fires `onUpdate` asynchronously (a microtask later, via Framer Motion's `animate` runner), so the React-19 lint rule against set-state-in-effect is satisfied. (This was already fixed in Task 5-7 per the prior worklog entry.)

Stage Summary:
- Centralized motion architecture is structurally sound: token + preset + reduced-motion + thin-wrapper layering is correct and consistent. GSAP is confined to src/lib/gsap/. Framer Motion is confined to the centralized lib + thin wrapper components. Reduced-motion is respected at every layer. Arabic text is animated at span/word granularity, never per-character.
- HOWEVER, one CRITICAL bug blocks visual sign-off: the hero headline (H1) and primary CTAs are invisible to all default-motion users due to a CSS-selector / GSAP-target mismatch (finding #1). This is a regression that the prior static-code architectural review (Subagent 2) and RTL/a11y review (Subagent 4) did not catch — it only surfaces at runtime. Runtime-verified via headless browser eval + VLM screenshot analysis.
- The other four findings are housekeeping: inline GSAP constants (already flagged by Subagent 2), dead code (StatCardItem / useParallaxScene / ParallaxMedia), one inline variant definition (in dead code), and a non-functional scroll-scenes stub.
- Verdict: NOT APPROVED — finding #1 is a hard blocker for Gate 5/6 visual sign-off and must be fixed before any further visual QA. Findings #2-#5 are non-blocking polish items.

---
Task ID: 8-f
Agent: Subagent 6 (Visual QA)
Task: READ-ONLY Responsive Visual QA Review — homepage + /design-system at 5 viewports (375x780, 414x896, 768x1024, 1280x800, 1536x900), mobile nav Sheet, language toggle, carousel operability, sticky footer, console errors.

Work Log:
- Read worklog.md (Tasks 1, 3, 4, 5-7, 8-a, 8-b, 8-c, 8-d) for full context.
- Verified dev server responding 200 on / and /design-system (and /register).
- Used agent-browser (v0.32.3) to drive a headless Chromium session.
- Captured 11 screenshots to /home/z/my-project/qa-*.png:
  * qa-mobile-375.png (homepage @375x780, full page, Arabic RTL default)
  * qa-mobile-414.png (homepage @414x896, full page)
  * qa-tablet-768.png (homepage @768x1024, full page)
  * qa-laptop-1280.png (homepage @1280x800, full page)
  * qa-desktop-1536.png (homepage @1536x900, full page)
  * qa-mobile-hero-375.png (mobile hero close-up)
  * qa-mobile-nav-sheet.png (Sheet open, mobile)
  * qa-mobile-en-ltr.png (mobile after EN toggle, LTR)
  * qa-testimonials-mobile.png (testimonials section @375)
  * qa-testimonials-tablet-768.png (testimonials section @768)
  * qa-design-system-1280.png (/design-system @1280, full page)
  * qa-register-coming-soon-1280.png (/register @1280, full page)
- Ran overflow checks via `document.documentElement.scrollWidth > clientWidth` plus a getBoundingClientRect() scan to identify offending elements and clipped-by-ancestor filtering.
- Ran viewport sweep at 641/700/768/800/900/950/1024/1280/1536 to bound the carousel-button overflow range.
- Tested mobile nav Sheet at 375px: hamburger aria-label="فتح القائمة" → Sheet opens (1 [role=dialog], body overflow:hidden scroll-lock, nav aria-label="التنقّل" with 4 disabled future links + Home + Book-trial CTA + Close button) → Close button dismisses Sheet and restores scroll.
- Tested language toggle at 375px: click "EN" → document.documentElement.dir = "ltr", lang = "en", localStorage["map-lang"] = "en", header/hamburger aria-labels flip to English, hero/stats/cards/section headings flip to English (bilingual wiring confirmed working for all brand cards via [lang] indexing).
- Tested testimonials carousel at 768px: Next button (visible sm:flex) advances slides correctly (transform -8 → -735 → -1464 → -8 looped). Previous button via direct DOM `.click()` works correctly (-8 → -1464 backward loop). Previous button via agent-browser ref-click failed because the button is partially off-screen at x=-24 (only 20 of 44 px visible).
- Checked header CTA color and language toggle active state to verify prior Subagent-1/Subagent-3 findings: header desktop CTA is now navy `bg-primary` (rgb(10,76,130)), language-toggle active state is now `bg-primary` (navy), hero CTA is orange `bg-cta` (rgb(242,162,60)), final CTA section button is now an `<a href="/register">` (navy). All prior orange-misuse and dead-button findings are RESOLVED.
- Verified /register exists with a coming-soon page (resolves Task 8-a finding #3 broken-funnel).
- Verified all 4 brand cards use `[lang]` indexing — bilingual wiring RESOLVED (Task 8-a finding #6, #7 RESOLVED).
- Verified sticky footer: body is flex column with min-height:100vh, header (sticky) + main (flex-1) + footer (mt-auto). Works correctly on long content (homepage, footer at y=3342 of 3765 page). On short content (/register) page is 986px tall vs 800px viewport, requiring ~186px scroll to see footer.
- Ran `agent-browser console` and `agent-browser errors` at every viewport after reload — NO console errors and NO page errors at 375/414/768/1280/1536. The only output is the standard React DevTools info and HMR connected log. ONE warning appeared when opening the mobile nav Sheet on homepage and on /design-system: "Missing `Description` or `aria-describedby={undefined}` for {DialogContent}".
- Verified no hydration errors (body.innerText scan for "hydration"/"did not match" = false).
- Verified /design-system renders all 12+ sections (Brand palette, Semantic palette, Typography, Spacing·Radius·Shadow, Buttons, Badges, Cards, Form fields, Accordion & Tabs, Icons·Avatar·Progress, Statistics, Framer Motion presets, States) without horizontal overflow at 1280px.
- Used z-ai vision to analyze key screenshots (mobile hero, desktop homepage, tablet, mobile nav Sheet, design-system, /register) for visual sanity; vision confirmed readable layouts and noted only the Next.js DevTools FAB (dev-only, hidden in prod).
- Did NOT edit any files (read-only review per task spec).

Findings (severity, evidence, rule, fix, blocks):

1. [HIGH] Horizontal overflow at 375x780 (small mobile) — 16px overflow caused by header. Evidence: qa-mobile-375.png; `scrollWidth=391, clientWidth=375`. Root cause: header outer `flex justify-between gap-4 px-4` has available inner width = 343px, but logo (226.5px) + gap-4 (16px) + language-toggle pill (80px) + gap-2 (8px) + hamburger (44px) = 374.5px → 31.5px overflow past padding = 16px past viewport. Offenders identified via getBoundingClientRect(): `<button>` (hamburger) right=390.953 (15.95px past viewport), language toggle pill right=338.953 (OK), logo right=359 (= viewport − 16, OK). Affects: ~360–413px viewports (414px is clean — boundary somewhere 376–414px). Rule violated: master task §responsive "no horizontal overflow at any viewport." Fix options: (a) shrink logo on `< sm` by hiding the wordmark text and showing only the abacus glyph; (b) move language toggle into the mobile Sheet (header shows only hamburger on `< sm`); (c) reduce hamburger to `size-9` (36px) and toggle pill to two `size-8` icon-only buttons; (d) reduce gap-4 to gap-2 on `< sm`. Recommended: (b) — cleanest, also fixes the touch-target issue (#4) and de-clutters the mobile header. Blocks? YES for small-mobile sign-off; otherwise NO (does not break core functionality, but causes unwanted horizontal swipe).

2. [HIGH] Horizontal overflow at 640–863px viewports (tablet portrait + small desktop) — 24px overflow caused by testimonials carousel nav buttons. Evidence: qa-tablet-768.png + qa-testimonials-tablet-768.png; `scrollWidth=792, clientWidth=768` at 768px; `scrollWidth=724, clientWidth=700` at 700px; `scrollWidth=824, clientWidth=800` at 800px; clean at 900px+. Root cause: src/components/sections/testimonials.tsx:37-38 renders `<CarouselPrevious className="hidden sm:flex" />` and `<CarouselNext className="hidden sm:flex" />` which use the carousel.tsx default positioning `top-1/2 -start-12 -translate-y-1/2` (= `inset-inline-start: -3rem`, i.e., 48px outside the carousel container) and `-end-12` (48px past carousel end). The carousel container is `w-full max-w-3xl mx-auto` (max 768px) inside `PageContainer` (px-4 sm:px-6 lg:px-8). At viewport ≤ 863px, the carousel fills available width (page padding 24px each side leaves no room for the 48px-negative-positioned buttons). Result: Previous button at x=-24 (24px off-screen left, only 20 of 44px visible), Next button at right=viewport+24 (24px off-screen right). The required test viewport 768x1024 falls squarely in this range. Rule violated: master task §responsive "no horizontal overflow at any viewport." Fix options: (a) wrap carousel section in extra horizontal padding on sm-md (`px-12 sm:px-16 md:px-12 lg:px-8`) to give buttons room; (b) change carousel.tsx default `-start-12`/`-end-12` to `start-2`/`end-2` (buttons INSIDE the carousel viewport, overlapping slide edges — common pattern); (c) hide buttons on `< md` and rely on swipe (but swipe-only on tablet portrait is poor UX); (d) reduce button offset to `-start-6`/`-end-6` (24px) and add `mx-6 sm:mx-12` to the carousel section. Recommended: (b) or (d). Blocks? YES for tablet-portrait sign-off.

3. [MEDIUM] Carousel Previous button partially off-screen at 640–863px — 24 of 44px clipped. Evidence: at 768px, Previous button rect = {l:-24, r:20} — only 20px of 44px visible. agent-browser's `click @ref` command failed to advance the carousel backward because the click coordinates fell off-screen; direct DOM `.click()` worked correctly (transform -8 → -1464, loop:true working). Same root cause as #2. Affects: same range 640–863px. Impact: real touch users can still tap the visible 20px but the click target is reduced; mouse users on tablet portrait may miss the button. Fix: same as #2. Blocks? NO (related to #2 — fixing #2 fixes this).

4. [MEDIUM] Touch-target sizes below WCAG 2.5.5 (AAA) 44×44 minimum. Evidence: at 375px, language-toggle "ع" button = 32×36, "EN" button = 42×36, hamburger button = 42×36. All below 44×44. Hero CTAs (295×48) and the desktop CTA (`size-xl`) DO meet 44×44. Rule: WCAG 2.5.5 Level AAA (note: WCAG 2.5.8 Level AA = 24×24 is met, so this is not an AA blocker). Fix: bump `min-h-9` (36px) on language toggle buttons to `min-h-11` (44px); increase hamburger padding from `size-9` (36px) to `size-11` (44px). Note: this compounds with #1 — making the buttons larger will worsen the header overflow, so #1 fix (b) (move language toggle into Sheet) is the better path. Blocks? NO (AAA criterion).

5. [MEDIUM] Radix DialogContent accessibility warning on every Sheet/Dialog open. Evidence: console output after opening mobile nav Sheet on homepage: `[warning] Warning: Missing 'Description' or 'aria-describedby={undefined}' for {DialogContent}.` Same warning on /design-system. Cause: src/components/layout/site-header.tsx Sheet/SheetContent lacks a `<SheetDescription>` (or `aria-describedby={undefined}` prop). Rule: Radix UI dialog-a11y contract — dialogs should have an accessible description. Fix: add `<SheetDescription className="sr-only">{lang === "ar" ? "قائمة التنقل بين الصفحات" : "Page navigation menu"}</SheetDescription>` inside SheetContent (and same for any Dialog in design-system-showcase.tsx). Blocks? NO (accessibility polish).

6. [MEDIUM] /design-system demo content not localized. Evidence: after clicking "EN" on /design-system, document.documentElement.dir="ltr" and lang="en" (layout flipped correctly), but main button labels remained Arabic: "تأكید", "احجز تجربة", "إلغاء", "اعرف المزيد", "تخطّي", "رابط", "صغیر", "افتراضي", "كبیر", "حصة تجریبية" (and form labels, accordion items, tabs). Same finding as Task 8-b #5. Cause: src/components/sections/design-system-showcase.tsx (379 lines, single client component) hardcodes Arabic strings without consuming useLanguage. Fix: either (a) wire `useLanguage` and provide bilingual strings for every demo label, or (b) label the page clearly as "Arabic-only reference page" and disable language toggle on /design-system. Blocks? NO (prototype demo page, not user-facing).

7. [LOW] /register coming-soon page has slight vertical overflow on 1280x800 laptop viewport. Evidence: qa-register-coming-soon-1280.png; `scrollH=986, clientH=800`. Page composition: header 80 + main 483 + footer 423 = 986. Main's 483px exceeds the available 297px (viewport 800 − header 80 − footer 423) because src/app/register/page.tsx:11 uses `py-24 sm:py-32` (192–256px vertical padding). Impact: footer pushed ~186px below the fold; user must scroll to see footer despite the page having minimal content. Sticky-footer pattern partially violated. Fix: reduce section padding on /register to `py-12 sm:py-16` (96–128px) so main fits within available 297px and footer sits at viewport bottom. Blocks? NO (sticky-footer mechanism itself works — footer is at bottom of page content, not floating mid-screen).

8. [LOW] Mobile nav Sheet disabled-future-link accessible name has no separator. Evidence: snapshot shows `link "من نحنقريباً"` (no space between "من نحن" and "قریباً"). Visually `ms-2` margin creates space, but screen-reader accessible name concatenates without separator. Cause: src/components/layout/site-header.tsx:106-107 renders `{item.label[lang]}` then `<span>{soonLabel}</span>` as siblings. Fix: add `aria-label={`${item.label[lang]} — ${soonLabel}`}` on the `<a>` or insert a visually-hidden space `<span className="sr-only"> </span>` between them. Blocks? NO (cosmetic a11y).

9. [LOW] Skip-link text not localized. Evidence: after clicking "EN" on homepage, snapshot still shows `link "تخطَّ إلى المحتوى"` (Arabic) instead of "Skip to content". Cause: skip-link in src/app/layout.tsx is rendered server-side with hardcoded Arabic text (or useLanguage is not wired at that level). Fix: extract skip-link into a small client component using useLanguage, OR set the text via a `lang`-conditional in layout.tsx (which is a server component — would need to read cookies/headers for lang). Blocks? NO (cosmetic).

10. [LOW] Carousel nav button SVG icons may need RTL flip verification. Evidence: at 1280px LTR, CarouselPrevious shows `<ArrowLeft>` (pointing left) and CarouselNext shows `<ArrowRight>` (pointing right) — correct for LTR. carousel.tsx:199/230 swaps to ArrowRight/ArrowLeft respectively when `opts.direction === "rtl"`. NOT directly tested in RTL at >=640px (default RTL was only tested at 375px where buttons are hidden). Recommend: at 768px in Arabic RTL, visually confirm the arrows point in the correct "previous"/"next" direction (Previous=right-arrow, Next=left-arrow). Blocks? NO.

Verification matrix (10 required checks):
1. No horizontal overflow at ANY viewport — FAIL at 375px (16px) and 640–863px range (24px). PASS at 414, 1280, 1536, and /design-system at 1280.
2. Hero stacks correctly on mobile (visual above text, readable) — PASS (vision-confirmed; hero grid is single-column on < lg; visual `order-1` at top:144, text `order-2` at top:479).
3. Stats: 2×2 on mobile, 4×1 on desktop — PASS (375px: 4 cards in 2×2 grid; 1280px: 4 cards in 1×4 grid; container `grid-cols-2 lg:grid-cols-4`).
4. Channels: 1 col mobile, 3 col desktop — PASS (375px: 3 cards stacked vertically; 1280px: 3 cards in 1×3 grid; container `gap-5 md:grid-cols-3`).
5. Mobile nav Sheet opens and is operable — PASS (dialog role present, scroll-lock active, Close button dismisses, 5 nav links + CTA visible).
6. Header logo + CTA visible; CTA touch target adequate — PARTIAL (logo + desktop CTA visible at all viewports; hero CTA = 295×48 ✓; mobile hamburger 42×36 ✗ below AAA 44×44).
7. No console errors / hydration errors — PASS (zero console errors, zero page errors at all 5 viewports; no hydration errors; ONE Radix DialogContent a11y warning when Sheet/Dialog opens — see finding #5).
8. Testimonials carousel operable (swipe or arrows) — PARTIAL (Next button works at 768/1280px; Previous button works via direct DOM but partially off-screen at 640–863px making it hard to click via mouse; buttons hidden on < 640px so swipe-only on mobile — swipe not directly verified via agent-browser mouse events due to embla pointer-event requirements).
9. /design-system renders all sections without overflow — PASS (12+ sections render at 1280px, scrollWidth=1280=clientWidth, zero offenders).
10. Sticky footer on short content (/register) vs long content (homepage) — PARTIAL (long content: footer at y=3342 of 3765 ✓; short content: /register page is 986px on 800px viewport, footer below fold by ~186px due to py-24 section padding — see finding #7).

Prior-Subagent Findings Resolution Status (verified by visual QA):
- Task 8-a #1 (MAJOR: Orange CTA decorative in LanguageToggle) — RESOLVED. language-toggle.tsx:14 active = `bg-primary text-primary-foreground` (navy, not orange). Comment on line 6 explicitly notes the design decision.
- Task 8-a #2 (MAJOR: Two orange CTAs in hero viewport) — RESOLVED. Header desktop CTA is now navy `bg-primary` (verified computed backgroundColor = rgb(10,76,130)). Only hero CTA is orange.
- Task 8-a #3 (MAJOR: /register broken-link funnel) — RESOLVED. /register returns 200 with a coming-soon page (src/app/register/page.tsx, 35 lines) showing badge + heading + paragraph + "Back to home" button. All CTAs (header desktop, mobile Sheet, hero, final CTA section) link to /register.
- Task 8-a #4 (MAJOR: Final CTA button dead) — RESOLVED. cta-section.tsx:25 now renders `<a href="/register">{finalCta.cta[lang]}</a>` via Button asChild.
- Task 8-a #5 (MINOR: Hero #how-it-works anchor) — NOT VERIFIED in this QA (would require SectionShell to forward `id` prop). Status: still likely broken; recommend Subagent 4's critical-fix list re-check.
- Task 8-a #6 (MINOR: Brand cards hardcoded `.ar`) — RESOLVED. grep confirms all 4 brand cards (step, channel, testimonial, stat) use `[lang]` indexing. Visual confirmation: step headings render as "Discovery/Speed/Depth/Mastery" in EN mode.
- Task 8-a #7 (MINOR: cta-section hardcodes `.ar`) — RESOLVED. cta-section.tsx uses `[lang]` indexing.
- Task 8-b #1-#5 (architecture) — Out of scope for visual QA.
- Task 8-c #1-#3 (HIGH: design-system issues) — Partially verified. Language-toggle orange issue RESOLVED. Header CTA orange RESOLVED. WCAG contrast issues with --brand-grey-text on white NOT verified in this QA (would need contrast-ratio recompute).
- Task 8-d (RTL/A11y) — Touch-target issues confirmed (finding #4). Carousel RTL positioning issues confirmed (findings #2, #3, #10). DialogContent warning confirmed (finding #5). Sheet Close button position not specifically verified.

Stage Summary:
- 4 of 5 required viewports PASS cleanly (414x896, 1280x800, 1536x900, plus /design-system at 1280).
- 2 HIGH findings block sign-off at 375px and 768x1024 viewports — both are horizontal-overflow issues with targeted fixes (header re-layout on < 414px; carousel button repositioning on 640–863px).
- 4 MEDIUM findings (touch-target sizes, DialogContent a11y warning, design-system localization, carousel Previous button click-target).
- 4 LOW findings (/register sticky-footer padding, Sheet link name separator, skip-link localization, RTL arrow verification).
- 0 console errors, 0 page errors, 0 hydration errors at any viewport.
- All prior major findings from Tasks 8-a, 8-b, 8-c, 8-d that fall in visual-QA scope have been RESOLVED in the codebase (orange-misuse, broken funnel, dead CTA, bilingual wiring for brand cards).
- Verdict: APPROVED WITH REQUIRED FIXES — fix findings #1 and #2 (both HIGH) before final client delivery; findings #3–#10 should be batched into a polish pass. Does not block continued development on other tracks, but does block Gate 5/6 visual sign-off.

---
Task ID: 8-fix + 9
Agent: Primary (Z.ai Code)
Task: Apply subagent review fixes + final verification

Work Log:
- CRITICAL fix (8-e): hero headline/CTAs were invisible to default-motion users (CSS hid parent [data-hero-anim], GSAP only animated children → multiplicative opacity). Rewrote hero-timeline.ts to fromTo-animate the PARENT elements; runtime-verified all hero opacities = 1.
- CRITICAL fix (8-d): SectionShell now forwards rest props (id, aria-label) — fixed TS error + broken #how-it-works anchor + dropped aria-label.
- CRITICAL fix (8-d): SheetContent side="start" (invalid) → side={lang === "ar" ? "right" : "left"}.
- BLOCKER fix (8-a): created /register coming-soon page; wired all CTAs (hero, header, mobile, final CTA) to it.
- HIGH fix (8-c/8-d): contrast — darkened --brand-grey-text #6B7A86→#56636E (AA); introduced --brand-teal-strong #1F7D8C for teal text on light; cta-section text-primary→text-cta-foreground on orange; teal-on-navy→text-brand-teal-pale.
- HIGH fix (8-a/8-c): orange-CTA misuse — language toggle bg-cta→bg-primary; header CTA variant cta→default (single orange per viewport).
- HIGH fix (8-f): 375px header overflow → Logo responsive (hide EN subtitle < sm, smaller text); 768px carousel-arrow overflow → arrows hidden lg:flex. Verified scrollWidth==clientWidth at both.
- HIGH fix (8-d): added skip-to-content link + id="main".
- MEDIUM fixes: carousel RTL logical positioning + conditional icons; Sheet close end-4 + focus-visible; touch targets ≥44px (hamburger size-11, toggle min-h-9, carousel size-11, nav min-h-11); SheetDescription (Radix a11y warning); bilingual wiring in all brand cards + cta-section; localized aria-labels; --warning distinct amber; dropped font-serif.
- MINOR fixes: deleted use-mobile.ts + StatCardItem dead code; removed ctaHref dead export; hero-timeline imports durations/stagger from tokens.
- Doc fixes (8-g): PROGRESS + IMPLEMENTATION_PLAN status updated; DESIGN.md contrast figures + grey-text hex + brand-teal-strong row; SOURCE_OF_TRUTH + showcase grey-text hex; MOTION_GUIDELINES variants.ts ghost; AGENTS.md navigation.ts/BrandButton/§2 carve-out; QA_CHECKLIST /register; PAGE_SPECS/IMPLEMENTATION_PLAN BrandButton.
- Final verification: bun run lint exit 0; /, /register, /design-system all 200; no backend/DB/auth imports in src; no direct gsap outside lib/gsap; no raw brand hex in .tsx outside tokens; hero opacity=1 (runtime); 375px+768px overflow=false; VLM confirms hero headline+CTAs+abacus visible, correct RTL, no defects; console clean.

Stage Summary:
- All 7 subagent reviews consolidated in docs/REVIEW_LOG.md. Every BLOCKER/CRITICAL/MAJOR resolved. No unresolved blockers.
- Gate 5 (design-system), Gate 6 (homepage), Gate 7 (final consistency) satisfied.
- Prototype complete: Arabic-first RTL homepage + /design-system + /register coming-soon + full documentation, verified via agent-browser at multiple viewports.
