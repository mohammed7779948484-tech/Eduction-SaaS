# RTL & Accessibility Audit — Phase 2 (Public-Site Pages)

**Task ID:** P25-R5
**Agent:** Subagent 5 (RTL & Accessibility Reviewer)
**Scope:** 11 routes — `/`, `/about`, `/program`, `/channels`, `/platform`, `/register`, `/contact`, `/schools`, `/trainers`, `/faq`, `/privacy`
**Method:** Code inspection (`src/**/*.tsx`) + browser audit via `agent-browser` at 390×844 and 1440×900. Form flows tested by driving the register form end-to-end. WCAG contrast computed from `tokens.css` hex values.
**Server:** `http://localhost:3000` (production build, HTTP 200 on all 11 routes)
**Date:** 2026-08-01

---

## Executive Summary

**Verdict: CONDITIONAL APPROVE — 1 BLOCKER + 2 CRITICAL issues must be fixed before sign-off.**

Phase 2 is structurally accessible — every page has exactly one `<h1>` in `PageHero`, a working skip link, `<main id="main">`, header / nav / footer landmarks, logical-utility-based layouts (zero physical `left-`/`right-`/`ml-`/`mr-`/`pl-`/`pr-` in project code), keyboard-operable accordions, fully labelled form fields with `aria-invalid` / `aria-required` / `aria-describedby` / `role="alert"` on errors, and a working privacy TOC with `tabIndex={-1}` on jump targets.

However, three regressions slipped through the previous review pass:

1. **Tajawal font is downloaded but NEVER applied** — every page renders Arabic in the browser's default sans-serif (DejaVu / Segoe UI / SF), not Tajawal. Brand typography requirement broken site-wide.
2. **Skip link is obscured by the sticky header** — `z-toast` / `z-header` custom utilities don't generate CSS in Tailwind v4, so both elements have `z-index:auto`; the header (later in DOM) paints over the skip link. Keyboard users can't see the skip link when focused.
3. **Form success state is silent** — `SuccessState` has no `role="status"` / `aria-live`, and focus falls to `<body>` after submit. Screen reader users get no announcement that the form was submitted.

Plus 5 MAJOR, 6 MINOR, 3 SUGGESTION items below.

---

## Findings

### 🔴 BLOCKER

#### B1 — Skip link obscured by sticky header (all 11 pages)

**Evidence (DOM check, 390px + 1440px):**
```
header z-index: "auto"  ← expected: 1050 (z-header)
skipLink z-index: "auto" ← expected: 1400 (z-toast)
skipRect: {top:12, left:229, w:149, h:41}
headerRect: {top:0, left:0, w:390, h:64}
skipOverlapsHeader: true
```
VLM verdict on focused-state screenshot: *"The skip to content link is not visible… effectively fully obscured by the sticky header."*

**Root cause:** `src/styles/tokens.css` declares `--z-toast: 1400` and `--z-header: 1050` as `:root` CSS variables, but `src/app/globals.css` `@theme inline` block does NOT expose them as Tailwind utilities. Compiled CSS (`bd15688ab040ef24.css`) contains the `:root` declarations but generates NO `.z-toast` / `.z-header` class. Both `site-header.tsx` (`sticky top-0 z-header`) and `layout.tsx` skip link (`focus:z-toast`) reference non-existent utilities → both elements resolve to `z-index:auto` → DOM order wins → header paints on top.

**WCAG rule:** 2.4.1 Bypass Blocks (Level A) — skip link must be visible when focused so keyboard users can identify and activate it. 1.4.13 Content on Hover or Focus (also applies).

**Fix (pick one):**
- **(preferred)** In `globals.css` `@theme inline`, add:
  ```css
  --z-base: 0;
  --z-dropdown: 1000;
  --z-header: 1050;
  --z-sticky: 1100;
  --z-overlay: 1200;
  --z-modal: 1300;
  --z-toast: 1400;
  ```
  This exposes them as Tailwind v4 utilities (`z-toast`, `z-header`, etc.).
- **(minimal)** Change `focus:z-toast` → `focus:z-50` (Tailwind built-in) on the skip link, and `z-header` → `z-40` on the header. Sheet already uses `z-50` (built-in) and works.

**Blocks?** YES — bypass-blocks is a Level A requirement; without it the site fails WCAG 2.1 Level A conformance.

---

### 🟠 CRITICAL

#### C1 — Tajawal font downloaded but never applied (all 11 pages)

**Evidence (DOM check, all pages):**
```
body.className: "tajawal_94e5209c-module__PxHUka__variable font-sans antialiased ..."
body computed font-family: "ui-sans-serif, system-ui, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', ..."
:root --font-sans: ""  (empty)
:root --font-tajawal: ""  (empty — only set on body)
body --font-tajawal: '"Tajawal","Tajawal Fallback"'  (next/font injects correctly)
document.fonts: 9 Tajawal faces registered, ALL status "unloaded" (never requested for rendering)
```

Verification fix: injecting `--font-tajawal` onto `document.documentElement` via JS causes Tajawal to load and apply immediately:
```
After injection: h1Family = "Tajawal, 'Tajawal Fallback', Tajawal, ui-sans-serif, ..."
                 document.fonts status: "loaded" ✓
```

**Root cause chain:**
1. `layout.tsx` applies `tajawal.variable` to `<body>` → next/font injects `--font-tajawal: "Tajawal", "Tajawal Fallback"` as a class on `<body>` only.
2. `src/styles/typography.css` declares `:root { --font-sans: var(--font-tajawal), "Tajawal", ui-sans-serif, ... }`.
3. At `:root` (the `<html>` element), `--font-tajawal` is NOT defined (CSS custom properties cascade downward, not upward) → `var(--font-tajawal)` resolves to the empty string.
4. `:root`'s `--font-sans` becomes `, "Tajawal", ui-sans-serif, ...` (leading comma) → invalid at computed-value time → `--font-sans` resolves to its initial value (empty).
5. Body inherits the empty `--font-sans` → `font-family: var(--font-sans)` resolves to empty → browser falls back to its default sans-serif stack.
6. Tajawal @font-faces are registered (via `next/font` preload) but never requested because no element references the `"Tajawal"` family.

**WCAG rule:** 1.4.4 Resize Text + 1.4.12 Text Spacing (font must be predictable and consistent). Also violates the brand-design lock (DESIGN.md §Typography mandates Tajawal as the sole Arabic typeface). Inconsistent Arabic rendering across user agents also impacts readability for users with low vision who rely on predictable letterforms.

**Fix (pick one):**
- **(preferred, 1-line)** In `layout.tsx`, move the variable class to `<html>` instead of `<body>`:
  ```tsx
  <html lang="ar" dir="rtl" suppressHydrationWarning className={tajawal.variable}>
    <body className="font-sans antialiased bg-background text-foreground min-h-screen flex flex-col">
  ```
  This sets `--font-tajawal` on `:root`, so the `:root` `--font-sans` declaration resolves correctly. (Confirmed working via the JS injection test above.)
- **(alternative)** In `typography.css`, change `--font-sans: var(--font-tajawal), "Tajawal", ...` → `--font-sans: "Tajawal", ui-sans-serif, system-ui, sans-serif;` (drop the `var()` reference; rely on font-name lookup). Caveat: the next/font hashed family name (e.g. `__Tajawal_94e5209c`) is what actually loads — using the literal `"Tajawal"` name will only work if next/font also exposes the font under that public name, which it does for `next/font/google` (the hashed name is the internal fallback, the public family name is preserved).
- **(alternative)** In `typography.css`, move the `--font-sans` declaration from `:root` to `body` (so it inherits the body-set `--font-tajawal`).

**Blocks?** YES — breaks the brand-design lock and produces inconsistent Arabic typography. Should be fixed before client presentation.

---

#### C2 — Form success state is silent + focus lost (all 4 form pages)

**Evidence (driving /register through to submit):**
```
After successful submit:
  h3 rendered: "تم استلام طلبك" (Request received) ✓
  liveRegionCount: 1  ← only the Sonner Toaster (empty)
  success container role: null  ← no role="status", no aria-live
  focused: "BODY تخطَّ إلى المحتوىبرنامج الحساب"  ← focus fell back to body
```

The success message is rendered visually but:
- No `role="status"` or `aria-live="polite"` on the `SuccessState` container → screen reader users get no announcement that the form was submitted.
- Focus is not managed → falls to `<body>` after the submit button unmounts. Keyboard users must Tab through the entire page again to reach the "Submit another request" button.

**WCAG rule:** 4.1.3 Status Messages (Level AA) — success messages must be announced to screen reader users without moving focus. 2.4.3 Focus Order — focus should move to a logical location (the success message or a logical next action).

**Fix:** In `src/components/brand/success-state.tsx`:
```tsx
import { useEffect, useRef } from "react";

export function SuccessState({ onReset }: { onReset: () => void }) {
  const { lang } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    ref.current?.focus();
  }, []);
  return (
    <div
      ref={ref}
      tabIndex={-1}
      role="status"
      aria-live="polite"
      className="flex flex-col items-center justify-center gap-4 py-12 text-center focus:outline-none"
    >
      ...
    </div>
  );
}
```

**Blocks?** YES for Level AA (4.1.3 Status Messages is a Level AA success criterion).

---

### 🟡 MAJOR

#### M1 — Form error text fails WCAG AA contrast (4 form pages)

**Evidence:**
- `text-destructive` token = `#d64545` on white card = **4.38:1** — fails WCAG AA normal text (4.5:1).
- Used in `prototype-form.tsx:169`: `<p className="text-xs text-destructive" role="alert">` (12px error text).
- Used in `prototype-form.tsx:77,164`: `<span className="text-destructive ms-1">*</span>` (14px required asterisk in labels).

**WCAG rule:** 1.4.3 Contrast (Minimum) Level AA — text < 18pt (or < 14pt bold) must have ≥ 4.5:1 contrast.

**Fix:** Darken the `--destructive` token in `tokens.css` from `#d64545` to `#c23838` (≈ 5.0:1 on white) or `#b53030` (≈ 5.7:1). Alternatively, bump the error text size to `text-sm font-bold` (qualifies as "large text" at 14pt bold, which only requires 3:1).

**Blocks?** No — passes 3:1 for large/bold text, but the `text-xs` (12px regular) error messages strictly fail AA.

---

#### M2 — Footer secondary links + copyright fail WCAG AA contrast (all 11 pages)

**Evidence:**
- `text-primary-foreground/60` (white at 60% opacity on navy `#0a4c82`) = **4.26:1** — fails WCAG AA normal text (4.5:1).
- Used in `site-footer.tsx:100` (secondary nav links: platform / schools / trainers / faq / privacy) and `site-footer.tsx:109` (copyright text).

**WCAG rule:** 1.4.3 Contrast (Minimum) Level AA.

**Fix:** Bump opacity from `/60` to `/70` (5.22:1 — passes) or `/75` (≈ 5.7:1). One-character change in two places.

**Blocks?** No — passes 3:1 for large text, but the `text-xs` (12px) copyright and `text-xs` secondary links strictly fail AA.

---

#### M3 — /register heading hierarchy skip (h1 → h2 → h3 missing form-area h2)

**Evidence (DOM check):**
```
h1: "احجز حصةً تجريبيةً مجانية" (1)
h2: "حصة تجريبية", "تسجيلٌ كامل" (2 — both Options cards)
h3: "بيانات ولي الأمر", "بيانات الطفل", "التفضيلات" (3 — PrototypeForm section titles)
```
The form section (which contains the 3 h3 sub-sections) has no parent h2 introducing it. The PrototypeForm component renders its `sections[].title` as `<h3>` (see `prototype-form.tsx:184`), but there's no `<h2>` immediately above the form on /register.

Other form pages (/contact, /schools, /trainers) DO have an h2 above their PrototypeForm (e.g., "أرسل رسالة", "طلب شراكة", "طلب الانضمام") — only /register is missing this.

**WCAG rule:** 1.3.1 Info and Relationships + heading-navigation best practice — screen reader users navigate by headings; skipping h2 for the form area breaks the logical outline.

**Fix:** In `src/app/register/page.tsx`, add an h2 above the PrototypeForm:
```tsx
<SectionShell tone="default">
  <PageContainer className="max-w-2xl">
    <h2 className="text-xl font-bold text-primary mb-4">{c.form.title.ar}</h2>
    <PrototypeForm fields={fields} ... />
    ...
```
(`c.form.title` is already defined in `src/content/registration.ts` — used by other form pages.)

**Blocks?** No — page is still navigable, but heading outline is incomplete.

---

#### M4 — /schools Benefits section missing parent h2

**Evidence (DOM check):**
```
h2: "لماذا تشارك المدارس؟", "نماذج التقديم", "خطوات الشراكة", "أسئلة شراكة المدارس", "طلب شراكة" (5)
h3: 18 total — includes Delivery Models items (3) AND Benefits cards (2: schoolBenefits, studentBenefits)
```
The "Benefits split" section (`schools/page.tsx:84-112`) has two h3 cards ("للمدرسة" / "للطالب") but no parent h2 introducing the section. The previous h2 is "نماذج التقديم" (Delivery Models) which belongs to a different concept.

**WCAG rule:** 1.3.1 Info and Relationships — section headings should introduce their content.

**Fix:** In `src/app/schools/page.tsx` line 84, add `<SectionHeading title={c.benefits.title.ar} align="center" />` (or `<h2 className="sr-only">الفوائد</h2>`) before the Benefits grid:
```tsx
{/* Benefits split */}
<SectionShell tone="white">
  <PageContainer className="space-y-10">
    <SectionHeading title="الفوائد" align="center" />
    <div className="grid gap-6 md:grid-cols-2">
      ...
```

**Blocks?** No.

---

#### M5 — Carousel keyboard navigation reversed in RTL + tabs not arrow-key operable (home page `/`)

**Evidence (code inspection + DOM check):**
- `src/components/ui/carousel.tsx:78-89` `handleKeyDown`:
  ```ts
  if (event.key === "ArrowLeft") { scrollPrev(); }
  else if (event.key === "ArrowRight") { scrollNext(); }
  ```
  This is hardcoded LTR semantics. In RTL, the WAI-ARIA carousel pattern requires ArrowLeft = next, ArrowRight = previous (because reading flows right-to-left).
- `src/components/sections/testimonials.tsx:58-77` pagination dots use `role="tablist"` + `role="tab"` + roving `tabIndex` + `aria-selected`, but the dots are OUTSIDE the `<Carousel>` component (which carries `onKeyDownCapture`). Pressing ArrowLeft / ArrowRight on a focused dot does nothing — there's no keyboard handler on the tablist. The WAI-ARIA tablist pattern requires ArrowLeft/ArrowRight to move focus between tabs.

**WCAG rule:** 2.1.1 Keyboard (Level A) — all functionality must be operable from keyboard. 2.1.2 No Keyboard Trap. WAI-ARIA Authoring Practices for tablist + carousel.

**Fix:**
1. In `carousel.tsx` `handleKeyDown`, branch on `opts?.direction`:
   ```ts
   const rtl = opts?.direction === "rtl";
   if (event.key === "ArrowLeft") { event.preventDefault(); rtl ? scrollNext() : scrollPrev(); }
   else if (event.key === "ArrowRight") { event.preventDefault(); rtl ? scrollPrev() : scrollNext(); }
   ```
2. In `testimonials.tsx`, add an `onKeyDown` handler to the tablist `<div role="tablist">` that moves focus between dots on ArrowLeft/ArrowRight (RTL-aware) and calls `api?.scrollTo(i)`.

**Blocks?** No — carousel is still operable via Tab + Enter on dots, and Tab + Enter on prev/next buttons (desktop only). But the expected arrow-key pattern is broken.

---

#### M6 — `select.tsx` uses physical `right-2` / `pr-8 pl-2` (RTL checkmark misaligned)

**Evidence (code inspection):**
- `src/components/ui/select.tsx:110`: `py-1.5 pr-8 pl-2` → should be `py-1.5 pe-8 ps-2`.
- `src/components/ui/select.tsx:115`: `<span className="absolute right-2 ...">` → should be `absolute end-2`.

In RTL, the checkmark indicator (`SelectPrimitive.ItemIndicator`) appears on the wrong side of the SelectItem — it shows on the physical right (= inline-start in RTL), but should appear on the inline-end (= physical left in RTL). The asymmetric padding also misaligns item text.

Affects every form page with a Select dropdown: /register (4 selects), /schools (1 select), /trainers (1 select).

**WCAG rule:** 1.3.3 Sensory Characteristics + RTL-i18n best practice. Not a strict WCAG violation, but the misaligned checkmark is a visible RTL bug.

**Fix:**
```diff
- "py-1.5 pr-8 pl-2 text-sm ..."
+ "py-1.5 pe-8 ps-2 text-sm ..."
- <span className="absolute right-2 flex size-3.5 ...">
+ <span className="absolute end-2 flex size-3.5 ...">
```

**Blocks?** No — functional, but visually broken in RTL.

---

### 🟢 MINOR

#### m1 — Sheet close button touch target 16×16px (all pages with mobile nav)

**Evidence:** `src/components/ui/sheet.tsx:75` close button has no padding or `size-*` class; contains only an `<XIcon className="size-4">` (16×16). Touch target ≈ 16×16px.

**WCAG rule:** 2.5.5 Target Size (AAA, 44×44) — recommended but not required for AA. WCAG 2.2 AA Target Size (Minimum) requires 24×24.

**Fix:** Add `size-11 p-2.5` to the close button className.

**Blocks?** No — Escape key works as fallback.

---

#### m2 — Multiple CTAs below 44×44px touch target

**Evidence (DOM check, 390px):**
- Header CTA "احجز حصة تجريبية" — `size="lg"` (h-10 = 40px) on all pages.
- Channel card CTAs "احجز حصة تجريبية" / "شراكة المدارس" — `size="lg"` (40px).
- FAQ "تواصل معنا" — `size="lg"` (40px).
- Select triggers "اختر" — `size="default"` (h-9 = 36px) on /register, /schools, /trainers.
- Language toggle "ع" button — 32×44 (width < 44).
- Language toggle "EN" button — 42×44 (width < 44).
- Nav links in desktop nav — 48×16 (height < 44, but these are hidden on mobile via `hidden lg:flex`).

**WCAG rule:** 2.5.5 Target Size (AAA, 44×44). WCAG 2.2 AA Target Size (Minimum) is 24×24 — most of these pass AA but fail AAA.

**Fix:** Bump `buttonVariants.size.lg` from `h-10` to `h-11` (44px) in `src/components/ui/button.tsx:28`. Add `min-w-11` to both LanguageToggle buttons in `language-toggle.tsx`. Bump Select trigger from `data-[size=default]:h-9` → `data-[size=default]:h-11` (or add `h-11` override on form SelectTrigger instances).

**Blocks?** No — passes WCAG 2.2 AA (24×24) for all interactive elements.

---

#### m3 — Channels comparison table missing `<caption>` and `scope="col"`

**Evidence (DOM check):**
```
hasTable: true, hasThead: true, hasTbody: true
hasCaption: false  ← missing
headers: [{text:"المعيار", scope:null}, {text:"في المراكز", scope:null}, {text:"المدارس", scope:null}, {text:"أونلاين", scope:null}]
```

**WCAG rule:** 1.3.1 Info and Relationships — table should have a programmatic title (`<caption>`) and explicit header-cell association (`scope="col"` on column headers).

**Fix:** In `src/components/brand/comparison-table.tsx`:
```tsx
<table className="w-full text-sm border-collapse">
  <caption className="sr-only">{lang === "ar" ? "مقارنة القنوات التعليمية الثلاث" : "Comparison of three learning channels"}</caption>
  <thead>
    <tr className="border-b-2 border-border">
      <th scope="col" className="text-start py-3 px-4 font-bold text-primary">{lang === "ar" ? "المعيار" : "Feature"}</th>
      <th scope="col" ...>{lang === "ar" ? "في المراكز" : "Centers"}</th>
      ...
```

**Blocks?** No — the section heading above the table provides context; missing caption is a best-practice gap.

---

#### m4 — Carousel slides lack `aria-label` (home page)

**Evidence:** `src/components/ui/carousel.tsx:156-171` `CarouselItem` renders `role="group" aria-roledescription="slide"` but no `aria-label` indicating slide position. Screen reader users hear "slide" but not "Slide 1 of 3".

**WCAG rule:** WAI-ARIA carousel pattern — each slide should have an accessible name indicating its position.

**Fix:** In `testimonials.tsx`, pass `aria-label={`${lang === 'ar' ? 'شهادة' : 'Slide'} ${i+1} ${lang === 'ar' ? 'من' : 'of'} ${testimonials.length}`}` to each `<CarouselItem>`.

**Blocks?** No — the pagination dots provide position info via `aria-label="شهادة N"`.

---

#### m5 — Carousel prev/next `sr-only` text not localized

**Evidence:** `src/components/ui/carousel.tsx:200,231`:
```tsx
<span className="sr-only">Previous slide</span>
<span className="sr-only">Next slide</span>
```
Always English, even on the Arabic site.

**Fix:** Pass localized strings from `testimonials.tsx` via props, or read from a small i18n dictionary inside the carousel primitive.

**Blocks?** No — sr-only text is announced by screen readers but doesn't affect visual layout.

---

#### m6 — `role="alert"` misused on informational notices

**Evidence:** `src/components/ui/alert.tsx:30` always sets `role="alert"` on the Alert primitive. This is used for:
- `PrototypeFormNotice` (informational "this is a prototype form" notice) on /register, /contact, /schools, /trainers.
- Privacy draft notice on /privacy.

`role="alert"` is semantically for urgent errors; informational notices should use `role="status"` (polite) or no role. Form error messages correctly use a separate `<p role="alert">` (correct usage).

**WCAG rule:** 4.1.3 Status Messages — `role="alert"` triggers an assertive announcement which is too intrusive for non-urgent info.

**Fix:** Either:
- Add a `role` prop to `Alert` and pass `role="status"` for informational variants.
- Or change the default `role="alert"` → `role="status"` (less disruptive default), and override to `role="alert"` only for destructive variants.

**Blocks?** No — informational notices still get announced; just with wrong priority.

---

### 💡 SUGGESTION

#### s1 — Mobile nav sheet slides from inline-start; consider inline-end to match hamburger position

`site-header.tsx:84` sets `side={lang === "ar" ? "right" : "left"}`. In RTL, this means the sheet slides from the right (= inline-start). The hamburger button is at the inline-END (left in RTL). Convention varies: Material Design slides nav drawers from inline-start; iOS/iPadOS slides from the side the trigger is on (inline-end). Either is acceptable; the current Material-style behavior is consistent.

**Suggestion:** No change needed unless matching a specific platform convention is desired.

---

#### s2 — `/channels` ArrowLeft icons don't auto-flip on language toggle

`channels/page.tsx:13,64` uses `ArrowLeft` for the channel detail card CTAs. In Arabic RTL, ArrowLeft points forward (correct). When the user toggles to English (LTR), the arrow still points left — but "forward" in LTR is ArrowRight. The `channel-card.tsx` (home page) handles this correctly via `const Arrow = lang === "ar" ? ArrowLeft : ArrowRight;`.

**Suggestion:** Apply the same conditional to `channels/page.tsx` (requires converting the page to a client component or extracting the CTA into a client component).

---

#### s3 — Redundant `text-start` overrides on accordion triggers

`/faq/page.tsx:80`, `/contact/page.tsx:94`, `/schools/page.tsx:134`, `/trainers/page.tsx:128` all pass `className="text-start"` to `<AccordionTrigger>`. This was needed before the previous review fixed `accordion.tsx:38` to use `text-start` as the base class. These overrides are now redundant and can be removed for cleanliness.

**Suggestion:** Remove the `className="text-start"` overrides (purely cosmetic, no behavior change).

---

## PASS Items (verified working)

### RTL & Logical CSS
- `<html lang="ar" dir="rtl">` set in `layout.tsx`; `LanguageProvider` syncs `document.documentElement.lang` / `dir` on toggle (verified: AR→EN switches `dir` to `ltr`, `lang` to `en`, h1 text swaps to English, nav aria-label swaps to "Primary").
- Project code (`src/app/**`, `src/components/brand/**`, `src/components/layout/**`, `src/components/motion/**`, `src/components/sections/**`) contains **ZERO** physical `left-`/`right-`/`ml-`/`mr-`/`pl-`/`pr-`/`text-left`/`text-right`/`border-l-`/`border-r-` utilities (grep with `\b` word boundaries returned 0 matches outside `src/components/ui/`).
- `PageHero`, `SectionHeading`, `TableOfContents`, `ProcessTimeline`, `BranchCard`, `LevelCard`, `ProfileCard`, `ComparisonTable`, `AudienceCard`, `BeadBadge`, `RailDivider`, `PrototypeForm`, `StepCard`, `StatCard`, `ChannelCard`, `TestimonialCard`, `AnimatedReveal`, `AnimatedStagger` all use logical utilities (`ms-`, `me-`, `ps-`, `pe-`, `start-`, `end-`, `text-start`, `border-s-`, `border-e-`).
- Mobile nav Sheet slides from the correct side per language: `side={lang === "ar" ? "right" : "left"}` (verified: RTL→right sheet, LTR→left sheet).
- Hero content grid uses `order-1 lg:order-2` + `lg:text-start` to mirror correctly in RTL.
- Carousel `CarouselPrevious` / `CarouselNext` use logical `-start-12` / `-end-12` for horizontal positioning (carousel.tsx:191,222).
- `CarouselPrevious` / `CarouselNext` icons flip correctly based on `opts.direction === "rtl"` (carousel.tsx:199,230).
- Hero `ChannelCard` CTA arrow uses `const Arrow = lang === "ar" ? ArrowLeft : ArrowRight;` for language-aware direction.

### Landmarks & Structure
- Every page has exactly one `<h1>` (in PageHero) — verified at 390px + 1440px across all 11 routes (h1Count = 1 everywhere).
- `<header>`, `<main id="main">`, `<footer>` landmarks present on every page.
- Two `<nav aria-label>` per page (Primary "الرئيسية" + Footer "تذييل"); /privacy has a third ("جدول المحتويات" on the TOC).
- `SectionShell` defaults to `<section>` element; supports `as` prop + `id` / `aria-label` forwarding.
- Heading counts per page (390px + 1440px identical):
  | Page | h1 | h2 | h3 |
  |------|----|----|-----|
  | / | 1 | 4 | 9 |
  | /about | 1 | 9 | 16 |
  | /program | 1 | 8 | 24 |
  | /channels | 1 | 6 | 2 |
  | /platform | 1 | 5 | 8 |
  | /register | 1 | 2 | 5 |
  | /contact | 1 | 4 | 11 |
  | /schools | 1 | 5 | 18 |
  | /trainers | 1 | 6 | 21 |
  | /faq | 1 | 2 | 18 |
  | /privacy | 1 | 10 | 2 |

### Skip Link (mechanics, not visibility — see B1 for visibility issue)
- `<a href="#main">` present in `layout.tsx` before `<SiteHeader>`.
- `className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:start-3 ..."` — correct logical-position utility (`start-3` = inline-start).
- `<main id="main">` is the target.
- Mechanics work; only the z-index issue (B1) prevents visibility.

### Forms (4 pages: /register, /contact, /schools, /trainers)
- All inputs have associated `<Label htmlFor={field.name}>` (verified: snapshot shows every textbox/combobox/checkbox has a labelled-by relationship).
- All required fields marked with both visual `*` in label AND `aria-required="true"` (verified: 9/9 on /register after failed submit).
- `aria-invalid="true"` set on all 9 fields after failed submit (verified).
- `aria-describedby` links each field to its error `<p id="{field.name}-error">` (verified: 9/9 describedby references resolve).
- Error `<p>` has `role="alert"` — announced by screen readers (verified: 9 role="alert" elements after failed submit, plus 1 for PrototypeFormNotice).
- React Hook Form auto-focuses first invalid field after failed submit (verified: focus moved to `parentName` input).
- `noValidate` on `<form>` — disables browser native validation so RHF + zod controls the messaging.
- `consent` checkbox on /register enforced by zod schema (`z.boolean().refine(v => v === true)`).
- `PrototypeFormNotice` alert present on all 4 form pages.
- Submit button uses `size="xl"` (h-12 = 48px) — meets 44px touch target.
- Loading state shows spinner + "جارٍ الإرسال…" text + `disabled` attribute.
- Form fields drive: verified end-to-end on /register — filled all 9 fields, selected 4 Select options, checked consent, submitted → SuccessState rendered.

### Accordion (5 pages: /faq, /program, /contact, /schools, /trainers)
- Radix Accordion primitive provides `aria-expanded`, `aria-controls`, `data-state` on triggers (verified: pressing Enter on focused trigger toggles `aria-expanded` from `false` → `true`, content `data-state` → `open`).
- Keyboard accessible: Tab to trigger, Enter/Space expands/collapses (verified).
- `accordion.tsx:38` base class uses `text-start` (logical) — correct RTL alignment.

### FAQ Search (/faq)
- `<Input type="search" aria-label="ابحث في الأسئلة…">` — proper aria-label, native search input.
- Results filter via `useMemo` on `query` — updates as user types.
- No-results state: `noResultsVisible: true`, text "لا توجد نتائج. تواصل معنا." + contact CTA visible (`contactCtaInNoResults: true`).
- Bottom CTA section conditionally hidden when `hasResults === false` (`sectionCount: 5 → 4` after no-results search).
- Category count + h2 "فئات الأسئلة" (sr-only) properly introduces the accordion h3s — heading hierarchy h1 → h2 → h3 is correct.

### Privacy TOC (/privacy)
- `TableOfContents` renders `<nav aria-label="جدول المحتويات">` with `<ul>` / `<li>` / `<a href="#id">` structure.
- 10 TOC links matching 10 `<section id="...">` targets (verified: tocCount=10, sectionsCount=10, all IDs match).
- Each `<section>` has `tabIndex={-1}` (verified: sectionsWithTabindex=10) + `className="scroll-mt-24 focus:outline-none"`.
- Clicking a TOC link: URL hash updates, focus moves to target section (verified: clicked "تواصل بشأن الأسئلة" → `location.hash="#contact"`, `document.activeElement` = `<section id="contact">` with `tabIndex=-1`).
- Draft notice Alert (info icon + "هذه الوثيقة مسوّدةٌ تجريبية…" text + last-updated date) present.
- TOC aside `hidden lg:block` on mobile (stacks below content) — correct responsive behavior.

### Channels Table (/channels)
- `<table>` / `<thead>` / `<tbody>` / `<tr>` / `<th>` / `<td>` semantics present.
- Column headers in `<thead>` (4 columns: Feature / Centers / Schools / Online).
- `text-brand-navy` on column headers (was `text-brand-blue` — fixed in previous review for AA contrast).
- Table inside `overflow-x-auto` parent — no document overflow (390px verified: scrollWidth = clientWidth = 390).

### Carousel (home page `/`)
- `<Carousel>` has `role="region" aria-roledescription="carousel"` (carousel.tsx:124-125).
- Pagination dots: `<div role="tablist" aria-label="الشهادات">` + `<button role="tab" aria-selected={active===i} tabIndex={active===i ? 0 : -1} aria-label="شهادة ${i+1}">` (testimonials.tsx:58-66).
- Each dot is 44×44px (`size-11` class) — meets touch target.
- `aria-selected` updates correctly when active slide changes (verified: `شهادة 1` selected=true, others false).
- RTL direction passed to embla: `opts={{ direction: lang === "ar" ? "rtl" : "ltr" }}` (testimonials.tsx:43).
- Prev/next buttons `hidden lg:flex` (desktop only) — mobile relies on dots + swipe.
- CarouselContent uses logical `-ms-2 ps-2` and CarouselItem uses `pe-2` (testimonials.tsx:47,49) — overrides the physical `-ml-4`/`pl-4` defaults from carousel.tsx primitive.

### Reduced Motion
- `globals.css:122-131` global `@media (prefers-reduced-motion: reduce)` override: zeros `animation-duration`, `transition-duration`, `scroll-behavior` on all elements.
- `globals.css:115-119` `@media (prefers-reduced-motion: reduce) { [data-hero-anim] { opacity: 1 !important; } }` — hero elements visible immediately.
- `AnimatedReveal` (`animated-reveal.tsx:30-33`): if `reduced`, renders plain `<Tag>` (no motion wrapper).
- `AnimatedStagger` + `AnimatedStaggerItem` (`animated-stagger.tsx:29-32, 58-61`): same pattern.
- `useCountUp` (`count-up.ts:40`): `duration: reduced ? 0 : duration` — jumps to final value instantly.
- `useHeroTimeline` (`hero-timeline.ts:28`): `if (reduced) return;` — skips GSAP timeline entirely.

### Focus States
- `globals.css:98-102` `:focus-visible { outline: 2px solid var(--ring); outline-offset: 2px; }` — global focus ring.
- All UI primitives (`button.tsx`, `input.tsx`, `select.tsx`, `checkbox.tsx`, `accordion.tsx`, `sheet.tsx`, `tabs.tsx`, etc.) include `focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]` in their base classes.
- 5 `:focus-visible` CSS rules present in compiled stylesheet (verified).
- Mobile nav hamburger: `size-11` (44×44) with `aria-label="فتح القائمة"` + `aria-expanded` toggling.

### Alt Text & SVG Accessibility
- All 11 pages: **0 naked SVGs** (every `<svg>` either has `role="img"` + `aria-label`, OR has `aria-hidden="true"`, OR is inside a parent with `aria-hidden="true"`).
- 0 `<img>` elements without `alt` (in fact, 0 `<img>` elements at all — all imagery is SVG-based).
- Decorative SVGs (hero background grid, CTA beads, abacus-rail motifs, icons in cards) properly hidden via `aria-hidden` on parent or self.
- Hero abacus SVG has `role="img" aria-label="سوروبان — أداة الحساب الذهني"` (hero.tsx:115-116).
- Logo SVGs have `role="img" aria-label="شعار برنامج الحساب الذهني"`.

### Language Toggle
- Two buttons in `LanguageToggle` with `aria-pressed`, `aria-label` ("العربية" / "English"), `min-h-11` (44px height).
- Toggling updates `<html lang>` + `<html dir>` (verified: AR→EN switches both).
- All content using `{ar,en}` objects via `[lang]` access swaps correctly (verified h1 text + nav aria-label).

### Touch Targets (passing)
- Submit button: `size="xl"` (h-12 = 48px) ✓.
- Mobile nav hamburger: `size-11` (44×44) ✓.
- Mobile nav links: `min-h-11` (44px) ✓ (verified: 48px each).
- Carousel pagination dots: `size-11` (44×44) ✓.
- Carousel prev/next: `size-11` (44×44) ✓.

### Production Build
- No Next.js dev indicator (`nextjs-portal` / `__NEXT_DEV_INDICATOR` absent).
- No console errors on any of the 11 pages at 390px or 1440px.
- No horizontal overflow (`scrollWidth === clientWidth` at 390px on all 11 pages; same at 1440px).
- All 11 routes return HTTP 200.

---

## Severity Roll-Up

| Severity | Count | IDs |
|----------|-------|-----|
| BLOCKER | 1 | B1 |
| CRITICAL | 2 | C1, C2 |
| MAJOR | 6 | M1, M2, M3, M4, M5, M6 |
| MINOR | 6 | m1, m2, m3, m4, m5, m6 |
| SUGGESTION | 3 | s1, s2, s3 |
| **Total** | **18** | |

---

## Recommended Fix Order

1. **B1** (skip link z-index) — 1-line fix in `globals.css` `@theme inline` block. Also unblocks the header z-index.
2. **C1** (Tajawal font) — 1-line fix in `layout.tsx` (move `tajawal.variable` to `<html>`).
3. **C2** (success state announcement) — ~5-line fix in `success-state.tsx` (add `role="status"` + `tabIndex={-1}` + focus management `useEffect`).
4. **M1 + M2** (contrast) — 2-line fixes in `tokens.css` (darken `--destructive`) and `site-footer.tsx` (bump `/60` → `/70`).
5. **M3 + M4** (heading hierarchy) — 1-line additions in `register/page.tsx` and `schools/page.tsx`.
6. **M6** (select.tsx RTL) — 2-line fix in `select.tsx` (`pr-8 pl-2` → `pe-8 ps-2`, `right-2` → `end-2`).
7. **M5** (carousel keyboard) — ~10-line fix in `carousel.tsx` + `testimonials.tsx`.
8. **m1–m6** (polish pass) — touch targets, table caption, slide labels, alert role, sr-only localization.

Items 1–4 are estimated at <30 minutes total implementation time and resolve all BLOCKER + CRITICAL issues. Items 5–7 add ~1 hour. The minor polish pass (m1–m6) is ~1–2 hours.

---

## Cross-Reference to Previous Reviews

- **P2-REVIEW-2** (RTL/A11y reviewer, earlier pass) flagged 7 MEDIUM + 9 LOW issues. Most were fixed per worklog P2-complete entry:
  - ✅ Fixed: accordion `text-left` → `text-start` (was MEDIUM).
  - ✅ Fixed: form `aria-describedby` + `aria-required` added (was MEDIUM).
  - ✅ Fixed: FAQ + Contact sr-only h2 added for heading hierarchy (was MEDIUM).
  - ✅ Fixed: privacy sections `tabIndex={-1}` added (was MEDIUM).
  - ✅ Fixed: ComparisonTable `text-brand-blue` → `text-brand-navy` (was MEDIUM — contrast).
  - ✅ Fixed: Select trigger `w-full` (was HIGH in responsive QA).
- ❌ **Not caught by P2-REVIEW-2** (this audit found):
  - B1 (skip link z-index broken) — previous review marked skip link as PASS.
  - C1 (Tajawal not applied) — previous review marked Tajawal as verified working.
  - C2 (success state silent) — previous review didn't test the success state.
  - M1 (form error contrast 4.38:1) — previous review didn't compute contrast for `text-destructive`.
  - M2 (footer /60 opacity contrast) — previous review didn't compute alpha-blended contrast.
  - M5 (carousel keyboard RTL) — previous review didn't test arrow-key navigation on carousel.

- **P2-REVIEW-3** (Responsive QA) — findings consistent with this audit (no overflow, register Select width fixed). This audit confirms and extends.

---

## Conclusion

Phase 2 is **structurally accessible** — semantic HTML, logical-utility-based RTL, keyboard-operable components, properly labelled forms, and a working privacy TOC. The 1 BLOCKER + 2 CRITICAL issues are all **1–5 line fixes** (z-index token exposure, font variable placement, success-state role/focus). With those three fixes, the site meets WCAG 2.1 Level A + most of Level AA. The 6 MAJOR items are real but non-blocking; the 6 MINOR + 3 SUGGESTION items are polish.

**Recommendation:** Approve Phase 2 pending fixes for B1, C1, C2 (estimated <30 minutes). M1–M6 should be addressed in the same pass if possible. m1–m6 + s1–s3 can roll into a future polish sprint.
