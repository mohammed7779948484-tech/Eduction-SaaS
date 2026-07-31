# Visual Changelog — Phase 2.5

> Before/after evidence for all corrective changes. Per master task §23.
> Screenshots: `screenshots/phase25-before/` and `screenshots/phase25-after/`

## Critical Fixes

### C1 — Tajawal font never applied (ALL pages)
- **What:** The Arabic font (Tajawal) was downloaded but never rendered — `--font-sans` was defined on `:root` but `--font-tajawal` was set on `<body>`, so `:root` couldn't read it (CSS variables cascade downward only).
- **Why:** WCAG 1.4.4 / brand identity — the entire site was rendering in system sans-serif, not the approved Tajawal font.
- **Reviewer:** R5 (RTL/A11y) — CRITICAL
- **Fix:** Moved `--font-sans` definition from `:root` to `body` in `typography.css`.
- **Verification:** `document.fonts.check('16px Tajawal')` → `true` ✓
- **UX impact:** Entire site now renders in the approved Arabic font — massive brand identity improvement.
- **Screenshots:** All before screenshots show system font; all after show Tajawal.

### B1 — Skip link obscured by sticky header (ALL pages)
- **What:** Skip link used `focus:z-toast` but z-index tokens weren't exposed as Tailwind utilities — resolved to `z-index: auto`, so the sticky header painted over it.
- **Why:** WCAG 2.4.1 Level A (Bypass Blocks)
- **Reviewer:** R5 — BLOCKER
- **Fix:** Changed to `focus:z-[1400]` (direct value above header z-index).
- **Verification:** z-index 1400 > header z-index.

### B2 — Homepage channel cards non-clickable
- **What:** Channel card CTAs were `<span>` elements, not links — visitors couldn't click to navigate.
- **Why:** UX/conversion — dead CTAs defeat the channel discovery journey.
- **Reviewer:** R2 (UX) — BLOCKER
- **Fix:** Added `href` field to `Channel` interface + content; wrapped CTA in `<a>`.
- **Verification:** 3 clickable links found on homepage channel section ✓
- **Screenshots:** `before/home-mobile.png` vs `after/home-desktop.png`

### C2 — Form success state silent + focus lost
- **What:** After form submission, the success state had no `role="status"` / `aria-live`, and focus fell to `<body>` — screen reader users got no announcement.
- **Why:** WCAG 4.1.3 Level AA (Status Messages)
- **Reviewer:** R5 — CRITICAL
- **Fix:** Added `role="status" aria-live="polite" tabIndex={-1}` + `useEffect` focus management.
- **Verification:** Success state now focusable + announced.

### C3 — Register form ~1190px wide on desktop
- **What:** `PageContainer`'s default `max-w-[1200px]` overrode the caller's `max-w-2xl` className.
- **Why:** UX — form was unreadably wide on desktop.
- **Reviewer:** R2 — CRITICAL
- **Fix:** Changed to `width="narrow"` prop (max-w-3xl).
- **Verification:** Form width now 638px ✓ (was ~1190px)

## Major Fixes

| ID | Page | Change | Reviewer | Screenshot |
|----|------|--------|----------|------------|
| M1 | All form pages | Darkened `--destructive` from `#d64545` to `#c44141` (AA contrast) | R5 | N/A (color) |
| M2 | All pages (footer) | Footer text `/60` → `/70` opacity (AA contrast) | R5 | N/A (color) |
| M3 | /register | Added `sr-only` h2 before form (heading hierarchy) | R5 | register-desktop |
| M4 | /schools | Added SectionHeading h2 before benefits grid | R5 | schools-desktop |
| M5 | /register, /schools, /trainers | Select physical CSS → logical (`right-2`→`end-2`, `pr-8 pl-2`→`pe-8 ps-2`) | R5 | N/A (RTL) |
| M6 | /trainers | Softened "معتمد" (certified) → "تخرّج" (graduation) | R1 | trainers-desktop |
| M7 | /channels | Channel CTA `variant="cta"` → `variant="default"` (single orange per viewport) | R2/R3 | channels-desktop |
| M8 | /platform | "Coming soon" badge `bg-cta` → `bg-secondary` (orange reserved for conversion) | R3 | platform-desktop |
| M9 | /contact | Removed duplicate WhatsApp CTA at bottom of form section | R2 | contact-desktop |
| M10 | /register | Contextualized select placeholders ("اختر" → "اختر العمر", "اختر القناة", etc.) | R2 | register-desktop |
| M11 | /program | Added "المزيد من الأسئلة" link to /faq after inline FAQ | R2 | program-desktop |
| M12 | /platform | Changed interest form copy to point to /register (not email capture) | R1 | platform-desktop |
| M13 | /about, /platform | Mid-page navy sections documented as intentional thematic accents | R3 | about-desktop |
| M14 | /channels | LevelCard levels 8-10 BeadBadge orange → pale (orange reserved for conversion) | R3 | program-desktop |

## Design-System Updates
- Added z-index tokens to `@theme inline` in globals.css
- Restructured typography.css to properly cascade font variables
- No new /design-system blocks added (deferred — M8 from R3)

## Files Changed
- `src/app/layout.tsx` — tajawal.variable on `<html>`, skip link z-[1400]
- `src/styles/typography.css` — --font-sans moved to body
- `src/styles/tokens.css` — --destructive darkened
- `src/app/globals.css` — z-index tokens in @theme inline
- `src/components/brand/success-state.tsx` — role="status" + focus management
- `src/components/brand/channel-card.tsx` — CTA as `<a>` link
- `src/content/home.ts` — added href to Channel interface
- `src/components/layout/page-container.tsx` — width prop
- `src/components/layout/site-footer.tsx` — contrast fix
- `src/components/ui/select.tsx` — physical→logical CSS
- `src/app/register/page.tsx` — width="narrow", sr-only h2, contextual placeholders
- `src/app/program/page.tsx` — FAQ link to /faq, Button import
- `src/app/contact/page.tsx` — removed duplicate WhatsApp CTA
- `src/app/schools/page.tsx` — benefits SectionHeading
- `src/content/trainers.ts` — "معتمد"→"تخرّج"
- `src/content/platform.ts` — interest form copy
- `src/app/channels/page.tsx` — selection-guide CTA→default
- `src/app/platform/page.tsx` — badge→secondary
