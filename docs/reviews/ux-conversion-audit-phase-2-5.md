# UX & Conversion Audit — Phase 2.5

**Task ID:** P25-R2
**Agent:** Subagent 2 (UX & Conversion Reviewer)
**Scope:** 11 public-site pages (/, /about, /program, /channels, /platform, /register, /contact, /schools, /trainers, /faq, /privacy) inspected at 390×844 (mobile) and 1440×900 (desktop) via Playwright-driven agent-browser + targeted DOM inspection + interaction tests + VLM cross-check.
**Mode:** READ-ONLY review. No source files modified. Report file only.

---

## Methodology

For each page at both viewports:
1. Programmatic capture — `h1`, `h2`s, all interactive elements (links/buttons with text), section order, backgrounds, form structure, banners, dimensions, scrollWidth vs clientWidth, console errors.
2. Interaction tests — anchor scroll, FAQ search filter, form submit → success state, mobile nav hamburger, language toggle, privacy TOC anchor focus, register select widths.
3. Visual cross-check — VLM (z-ai vision) on 6 key screenshots (home mobile/desktop, register mobile/desktop, contact mobile, platform desktop) to validate layout, hierarchy, and "first-impression" clarity.
4. Cross-reference to DESIGN.md (`§Color roles`, `§Button hierarchy`, `§Anti-patterns`, `§Restraint rule`) and SOURCE_OF_TRUTH.md §10 (prototype scope: forms are frontend-only, success states must be honest).

Severity scale used: **BLOCKER** (broken/dead interaction or hard rule violation) · **CRITICAL** (significant UX/confusion on a primary conversion path) · **MAJOR** (clear UX weakness, recoverable but should fix) · **MINOR** (polish/consistency issue) · **SUGGESTION** (optional enhancement).

---

## Verdict

**CONDITIONAL APPROVE — Phase 2 ships 11 visually polished, on-brand pages, but 1 BLOCKER + 2 CRITICAL issues prevent a clean sign-off.** The BLOCKER is a dead interaction on the homepage's primary "channels" section (cards look clickable, aren't). The CRITICAL issues are (a) the /register form rendering at ~1190px wide on desktop due to a `max-w-*` CSS-cascade bug, and (b) the /channels "Register interest" CTA pointing to /platform (a "coming soon" page with no form), creating a misleading extra hop with intent mismatch. All other findings are MAJOR/MINOR/SUGGESTION.

Pages that look visually complete but provide a weak/confusing experience: **home** (dead channel cards), **register** (overwide form, 9 fields, generic "اختر" placeholders), **channels** (misleading "سجّل اهتمامك" → /platform hop), **program** (no link from inline FAQ to /faq).

Pages with strong UX: **platform** (clearly conceptual, single CTA), **privacy** (TOC + draft notice + readable), **faq** (working search + no-results fallback), **about** (institutional tone, well-structured), **contact** (3 method cards + branches + form), **schools**/**trainers** (form ends the page appropriately).

---

## Findings

### [BLOCKER] #1 — `/` (home) — Channel cards on homepage are non-clickable

- **Evidence:** The "قنوات التعلّم الثلاث" section renders 3 `ChannelCard` components (centers / schools / online platform). Each card displays a bold teal CTA label with an arrow icon — "اعرف الفروع" (See branches), "شراكة المدارس" (School partnership), "قريباً" (Coming soon) — and has a hover lift effect (`hover:-translate-y-1`, `group-hover:gap-2.5` on the arrow span). DOM inspection confirms: `cardCount=3`, `clickable=0` for ALL three cards (no `<a>`, no `<button>` inside). The CTA label is a `<span className="inline-flex items-center gap-1.5 …">` — purely visual.
- Source: `src/components/brand/channel-card.tsx:45-48` — the entire CTA is a `<span>` with no wrapping link. The `Channel` interface in `src/content/home.ts:80-85` has no `href` field, only a `cta: {ar,en}` text label.
- Contrast with `/channels` page: that page (`src/app/channels/page.tsx:60-67`) uses a different markup — `<Button asChild><a href={ch.href}>…</a></Button>` — and IS clickable.
- **UX principle violated:** *Affordance* (Don Norman) — visual cues (arrow icon, bold colored text, hover state change) promise clickability that doesn't exist. *Conversion* — the homepage's primary "discover your options" section is a dead-end; visitors must independently know to navigate to /channels via the header.
- **Recommended fix:** Wrap each card's CTA span (or the entire card) in an `<a href>` link. Map: centers card → `/contact` (branches) or `/channels#centers`; schools card → `/schools`; online platform card → `/platform` (or remove the arrow if "قريباً" is genuinely non-actionable). Alternative: make the entire card clickable via `onClick` + `role="link"` + keyboard handler. Add `href` to the `Channel` interface in `src/content/home.ts`.
- **Blocks?** YES — a primary section of the homepage advertises actions that don't work. Blocks UX sign-off.

---

### [CRITICAL] #2 — `/register` — Form renders at ~1190px wide on desktop (max-w override silently ignored)

- **Evidence:** The register page wraps its form in `<PageContainer className="max-w-2xl">` (intended max-width: 672px). DOM measurement at 1440px viewport: `formW=1190px`, `cardW=1256px`, `pageContainerW=1320px` (full container width). The `max-w-2xl` class is present in the DOM but NOT applied — overridden in the CSS cascade.
- Root cause: `src/components/layout/page-container.tsx:21-26` — `PageContainer` defaults to `width="default"` which sets `maxW = "max-w-[1200px]"`. This is composed into the className BEFORE the caller's `className="max-w-2xl"` override. In Tailwind's CSS, `max-w-[1200px]` and `max-w-2xl` are both `max-width` utilities; whichever appears LATER in the generated CSS source wins — not the order in the `className` string. Since `max-w-[1200px]` is a higher-specificity arbitrary value, it wins, and `max-w-2xl` (672px) is ignored.
- Other form pages (/contact, /schools, /trainers) do NOT exhibit this because they wrap the form in a `grid lg:grid-cols-2` whose column constrains the form width to ~486px — bypassing the PageContainer max-width issue.
- VLM cross-check confirmed: *"The form is excessively wide, appearing to span nearly the full width of the desktop viewport (likely 1000px+)"*.
- **UX principle violated:** *Form ergonomics* — input lines longer than ~600px degrade readability and feel unprofessional. *Visual consistency* — register form is the only one of four form pages that's overwide.
- **Recommended fix:** Add a `width="narrow"` prop to the PageContainer call on `/register` (line 77): `<PageContainer width="narrow" className="max-w-2xl">`. The `width="narrow"` setting uses `max-w-3xl` (768px) which is also overridden by `max-w-2xl` (672px) — but to make `max-w-2xl` reliably win, either (a) change `PageContainer` to NOT apply a default `maxW` when an override is passed, or (b) use `style={{maxWidth: '42rem'}}` inline. Recommended: refactor `PageContainer` to skip its default `maxW` when `className` contains `max-w-`, OR add explicit `width` values (`"form"` → `max-w-2xl`) to the component's width tiers.
- **Blocks?** YES for visual polish sign-off on the primary conversion page. Functional (form still works), but visually broken.

---

### [CRITICAL] #3 — `/channels` — "سجّل اهتمامك" CTA on online-platform card sends visitors on a misleading extra hop

- **Evidence:** `/channels` page card 3 ("المنصّة الرقمية" / Digital platform) has CTA button "سجّل اهتمامك" (Register your interest) → `href="/platform"`. But:
  - The `/platform` page has NO form to register interest — it's a "coming soon" info page with badge "قريباً · Coming soon", a conceptual preview, features list, safety section, and ANOTHER "سجّل اهتمامك" CTA at the bottom → `/register`.
  - The `/register` form is for booking a TRIAL LESSON, not for "registering interest in the platform launch". The form fields are parentName, parentPhone, parentEmail, studentName, studentAge, channel, branch, schedule — none of which capture "notify me when the platform launches".
- Result: visitor clicks "Register interest" expecting to fill a quick interest form. They land on a "coming soon" page (mild surprise), then click "Register interest" again (growing confusion), then land on a 9-field trial-lesson booking form (intent mismatch — they wanted launch notification, not trial booking). Likely abandonment.
- Source: `src/content/channels.ts:46-47` — `cta: { ar: "سجّل اهتمامك" }`, `href: "/platform"`.
- **UX principle violated:** *Mental model match* (Nielsen) — the CTA label promises one action; the destination delivers another. *Conversion path length* — 3 hops (channels → platform → register) where 1 would do.
- **Recommended fix:** Two viable options:
  - **(A)** Change the channel card CTA to "اعرف المزيد" (Learn more) → `/platform` (informational intent), and let `/platform`'s own CTA "سجّل اهتمامك" → `/register` handle the conversion. This matches the actual user journey: read about platform → decide to register → fill form.
  - **(B)** Add a small email-only "notify me at launch" inline form on `/platform` (one field + button), so the channel card's "register interest" promise is fulfilled on-platform without sending visitors to the trial-lesson form.
  - Option (A) is the smaller change and respects the existing IA.
- **Blocks?** YES for conversion-path clarity sign-off. Functional (links work), but the journey is misleading.

---

### [MAJOR] #4 — `/register` — Form is overwhelming: 9 fields, 4 consecutive dropdowns, significant mobile scrolling

- **Evidence:** Register form has 9 fields total: 4 text inputs (parentName, parentPhone, parentEmail, studentName), 4 selects (studentAge, channel, branch, schedule), 1 checkbox (consent). On mobile (390px), the form section is 1319px tall — over 3 screen-heights of vertical scrolling. The 4 selects appear consecutively in the "Preferences" section (`src/app/register/page.tsx:50`: `["channel", "branch", "schedule", "consent"]`), creating a tedious touch-tap pattern.
- VLM cross-check confirmed: *"4 consecutive dropdowns can be cumbersome on mobile touch interfaces"* and *"the main form is a long vertical list of fields. On a mobile screen, this requires significant scrolling, which can feel tedious."*
- Schema (`src/app/register/page.tsx:14-24`) marks all 9 fields required (`z.string().min(1)` or `z.boolean().refine(v => v === true)`).
- **UX principle violated:** *Friction reduction* (BJ Fogg Behavior Model) — each additional field reduces conversion. *Mobile ergonomics* — consecutive dropdowns are tedious. The form asks the visitor to commit to channel/branch/schedule BEFORE they've even had a trial lesson, which may be premature.
- **Recommended fix:**
  - Make `branch` and `schedule` OPTIONAL (allow "غير محدد" / "Undecided" option) — these can be discussed during trial-lesson confirmation.
  - Or split into a 2-step form: Step 1 (parent + student info + age) → Step 2 (channel + branch + schedule + consent). Reduces perceived effort.
  - At minimum, group the 4 selects visually with sub-labels or move consent to a separate visual band below the dropdowns.
- **Blocks?** No — form is functional. But likely depresses conversion.

---

### [MAJOR] #5 — `/register` — All 4 Select dropdowns show identical "اختر" placeholder

- **Evidence:** All 4 SelectTrigger elements on /register render the same placeholder text "اختر" (Choose). DOM measurement confirmed 4 instances, all `text="اختر"`, all 308px wide (mobile) / 1190px wide (desktop — see #2). When collapsed, the visitor sees 4 dropdowns side-by-side that look identical — they can only tell them apart by reading the label above each.
- Source: `src/components/brand/prototype-form.tsx:142` — `<SelectValue placeholder={field.placeholder?.[lang] ?? (lang === "ar" ? "اختر" : "Select")} />` — falls back to "اختر" when `field.placeholder` is undefined. The register page (`src/app/register/page.tsx:33-43`) defines `placeholder` for text inputs but NOT for the 4 select fields (studentAge, channel, branch, schedule).
- **UX principle violated:** *Recognition over recall* (Nielsen) — the dropdown itself should hint at what it's for, not force the visitor to look up at the label each time. *Scannability* — 4 identical "اختر" labels create visual noise.
- **Recommended fix:** Add `placeholder` to each select field definition in `src/app/register/page.tsx`:
  - `studentAge`: `{ ar: "اختر العمر", en: "Select age" }`
  - `channel`: `{ ar: "اختر القناة", en: "Select channel" }`
  - `branch`: `{ ar: "اختر الفرع", en: "Select branch" }`
  - `schedule`: `{ ar: "اختر الموعد", en: "Select schedule" }`
- **Blocks?** No — labels above fields provide context. But adds friction.

---

### [MAJOR] #6 — `/program` — Inline FAQ has 4 items but no link to the full `/faq` page

- **Evidence:** The program page ends with a "أسئلة شائعة عن البرنامج" section containing 4 accordion items: "ما الأعمار المناسبة للبرنامج؟", "ما طريقة السوروبان؟", "كم عدد المستويات؟", "هل توجد حصة تجريبية؟". The `/faq` page has 16 accordion items across 4 categories — INCLUDING these same 4 questions (per `src/content/faq-page.ts`). There is NO link from the program page's FAQ section to `/faq`.
- DOM verified: 4 accordion triggers in program section [7], no anchor link to `/faq` in the surrounding HTML.
- **UX principle violated:** *Progressive disclosure* — visitors whose question isn't in the 4 inline items have no clear path to the comprehensive FAQ. *Cross-page navigation* — missed opportunity to route interested visitors to /faq (which itself routes to /contact for unaddressed questions).
- **Recommended fix:** Below the 4 inline FAQ accordions, add a "اعرض جميع الأسئلة" (See all questions) link → `/faq`. Or wrap the section heading "أسئلة شائعة عن البرنامج" with a "(اعرض الكل ←)" link.
- **Blocks?** No — visitors can use the header nav. But adds friction to finding more answers.

---

### [MAJOR] #7 — `/contact` — Duplicate WhatsApp CTA (top contact-methods grid + bottom-of-form button)

- **Evidence:** The /contact page has 2 separate CTAs to the same WhatsApp destination:
  1. Top "طرق التواصل" section (3 cards: WhatsApp, phone, email) — the WhatsApp card has a link `https://wa.me/967700000000`.
  2. Bottom "أرسل رسالة" section (form + common questions 2-col grid) — below the FAQ accordion, a secondary outline button "تواصل عبر الواتساب" → same `https://wa.me/967700000000`.
- DOM: 2 distinct `<a>` elements with `href="https://wa.me/967700000000"` on /contact.
- **UX principle violated:** *DRY for UI* — duplicate CTAs to the same destination dilute the primary action (fill the form). *Visual clutter* — the bottom WhatsApp button competes with the form's orange "إرسال" submit button.
- **Recommended fix:** Either remove the bottom WhatsApp button (the top contact-methods grid already covers it), OR reframe it as a fallback AFTER form submission (e.g., move it into the SuccessState component for /contact). The current placement (next to the form) creates choice paralysis between "fill form" vs "WhatsApp now".
- **Blocks?** No — both links work. But adds decision friction.

---

### [MINOR] #8 — `/about` — No in-page CTAs to related pages; only the final orange CTA

- **Evidence:** About page has 9 H2 sections (Story, Vision, Mission, Values, Methodology, Why, Team, Child Protection, Final CTA) but only 1 in-page link/CTA in the entire main content area: the final "احجز الآن مجاناً" → /register. No links from "Methodology" section to /program, no links from "Team" to /trainers, no link from "Child Protection" to /privacy.
- DOM: `links=[{t:"احجز الآن مجاناً", h:"/register"}]` — only 1 link in `<main>`.
- **UX principle violated:** *Wayfinding* — institutional pages should offer contextual navigation to deeper content. Visitors reading about methodology may want to see the full program; reading about the team may want to know about trainer recruitment.
- **Recommended fix:** Add contextual inline links: "Methodology" section → "تعرّف على البرنامج الكامل" → /program; "Team" section → "انضم إلى فريقنا" → /trainers; "Child Protection" → "اقرأ سياستنا الكاملة" → /privacy. Or add a "روابط ذات صلة" (Related links) card cluster after the Child Protection section.
- **Blocks?** No — institutional tone is appropriate. But misses cross-page journey opportunities.

---

### [MINOR] #9 — `/schools` & `/trainers` — Structurally identical layouts risk visual monotony

- **Evidence:** Both pages follow the same section pattern:
  - `/schools`: Hero → 4-card grid (why partner) → 3-card grid (delivery models) → 2-card grid (benefits school/student) → ProcessTimeline → 2-col (FAQ + Form)
  - `/trainers`: Hero → 3-card grid (who for) → 3-card grid (curriculum) → ProcessTimeline → 3-card grid (benefits) → 2-col (FAQ + Form)
  Both end with the FAQ+Form 2-col grid and have NO final CTASection (intentional — form is the conversion).
- All card grids use the same `Card className="h-full p-6 border-border bg-card shadow-sm"` + `size-8 text-brand-teal-strong` icon + `text-sm font-bold text-primary` heading + `text-xs/text-sm text-muted-foreground` body. Visual repetition is high.
- **UX principle violated:** *Variety* — repeated identical card patterns can feel monotonous. *Section differentiation* — without background or layout variation, visitors may lose sense of where they are on the page.
- Note: each section's CONTENT is distinct (why partner vs delivery models vs benefits), so this is a polish issue, not a structural one.
- **Recommended fix:** Vary the visual treatment of alternate card grids — e.g., use the `MetricCard` component (numbered) for delivery models, `AudienceCard` for "who for", `ProfileCard`-style for benefits. Or alternate card backgrounds (white / pale-teal) within sections. Small layout variations (e.g., one section uses horizontal cards, another uses vertical) would also help.
- **Blocks?** No — content is clear, just visually repetitive.

---

### [MINOR] #10 — `/channels` — 5 navy primary CTAs compete for attention; 3 of 5 go to /register

- **Evidence:** /channels page main content has 5 `<Button variant="default">` (navy primary) CTAs:
  1. Card 1 (centers): "احجز حصة تجريبية" → /register
  2. Card 2 (schools): "شراكة المدارس" → /schools
  3. Card 3 (platform): "سجّل اهتمامك" → /platform (see #3 — misleading)
  4. Selection guide section: "احجز حصة تجريبية" → /register (DUPLICATE of #1)
  5. Final CTA section: "احجز الآن مجاناً" → /register (closing crescendo — appropriate)
- All 5 are visually identical navy buttons. No orange CTA on this page (correct per design — orange reserved for hero+final).
- **UX principle violated:** *Hick's Law* — multiple identical CTAs reduce decision speed. *Redundancy* — CTA #4 duplicates CTA #1's destination.
- **Recommended fix:**
  - Make the channel-card CTAs visually distinct from the selection-guide CTA (e.g., `size="lg"` for cards, `size="xl"` for selection guide).
  - Or remove the selection-guide CTA entirely — the comparison table above it is sufficient decision support, and the final CTA closes the page.
  - Address CTA #3 per finding #3 (change to "اعرف المزيد" → /platform).
- **Blocks?** No — each CTA works. But choice overload may delay conversion.

---

### [SUGGESTION] #11 — `/faq` — No-results state could be more helpful

- **Evidence:** When search returns 0 results, the FAQ page shows: `<p>لا توجد نتائج. تواصل معنا.</p>` + a "تواصل معنا" button → /contact. The bottom CTA section is correctly hidden (`hasResults && (...)`).
- The message is honest but minimal — it doesn't echo the visitor's query, suggest related categories, or offer in-page alternatives (e.g., "or browse by category").
- **UX principle violated:** *Error recovery* (Nielsen) — error messages should help users recover, not just report the failure.
- **Recommended fix:** Echo the query: `لا توجد نتائج لـ "{query}". تواصل معنا وسنساعدك.` And/or show 2-3 "popular questions" below the no-results message as alternative starting points.
- **Blocks?** No — current behavior is acceptable. Enhancement only.

---

### [SUGGESTION] #12 — `/privacy` — No "print" or "save" action for legal retention

- **Evidence:** Privacy page is a long legal document (10 sections, ~2458px tall on desktop) with TOC navigation and a draft notice. There's no print/save/download CTA. Parents who want to retain a copy must use browser print (Ctrl+P) — which won't be obvious to all visitors, especially on mobile.
- **UX principle violated:** *Document affordance* — legal documents benefit from explicit "keep a copy" actions, especially for child-protection policies.
- **Recommended fix:** Add a small "اطبعة" (Print) or "حفظ نسخة" (Save copy) button in the TOC aside or page header — `onClick={() => window.print()}`. Style as ghost/outline button to not compete with the TOC links.
- **Blocks?** No — accessibility of legal content is acceptable per Phase 2 RTL/a11y review. Enhancement only.

---

### [SUGGESTION] #13 — `/platform` — "Conceptual preview" caption could be more prominent

- **Evidence:** The platform page's "معاينةٌ تصوّرية للمنصّة" section shows a fake browser-mockup card (colored dots, fake dashboard layout). Below the mockup, a small caption reads: "معاينةٌ تصوّرية — ليست واجهةً حقيقية" (Conceptual preview — not a real interface). The caption is `text-xs text-muted-foreground text-center` — small and pale.
- VLM cross-check correctly identified the page as "coming soon" (badge visible), but didn't specifically call out the conceptual nature of the preview from the caption alone — relied on the badge.
- **UX principle violated:** *Honesty* — important disclaimers should be visible enough that visitors don't mistake the mockup for a real product screenshot.
- **Recommended fix:** Either enlarge the caption (e.g., `text-sm` with an info icon), or repeat the disclaimer INSIDE the browser-mockup card as a watermark/overlay. The current caption could be missed on mobile.
- **Blocks?** No — the badge + caption combination is acceptable. Enhancement only.

---

## Pass List (verified working)

These UX expectations are met and require no action:

- **Home hero** — single orange CTA + ghost secondary; "اعرف المزيد" anchor correctly scrolls to `#how-it-works` (verified `scrollY=1161` after click, hash updates).
- **Home stats strip** — count-up animation triggers on scroll (95% / 3 / +780 / 10 after scroll; 0 before).
- **Home testimonials carousel** — prev/next buttons + 3 tab dots, keyboard accessible.
- **Home final CTA** — orange banner + navy button (correct per DESIGN.md `§Color roles`).
- **About page** — institutional tone, well-structured 9 sections, single closing CTA. No competing actions.
- **Program page** — logical section order matching visitor questions (what is it → how it works → levels → ages → outcomes → journey → FAQ → CTA).
- **Channels page** — 3 clickable channel cards (unlike home), comparison table with `overflow-x:auto` wrapper, selection guide.
- **Platform page** — clearly conceptual ("قريباً" badge + "معاينةٌ تصوّرية — ليست واجهةً حقيقية" caption), single orange CTA → /register.
- **Register form** — PrototypeFormNotice visible at top ("هذا نمووذج تجريبي…"), sectioned layout (parent / student / preferences), consent checkbox schema-enforced, WhatsApp alt button below form, success state clearly states "هذا نموذج تجريبي — لن تُرسَل البيانات. سنتواصل معك عبر القنوات الرسمية عند إطلاق الخدمة" + "إرسال طلب آخر" reset button. Select triggers are FULL-WIDTH (308px mobile / 1190px desktop) — the previous responsive-review BLOCKER (74.5px) is FIXED.
- **Contact page** — 3 contact-method cards (WhatsApp, phone, email) at top — easy to find. Branches section with 3 cards (Sana'a, Taiz, Aden). Form + FAQ 2-col layout.
- **Schools/trainers pages** — institutional tone, formal content, no aggressive sales CTAs, form is the conversion (no redundant final CTA after form — correct).
- **FAQ page** — search filters correctly (verified: query "السوروبان" → 2 visible accordions; query "zzzznonexistent" → 0 visible + no-results message + contact CTA). No-results state hides bottom CTA to avoid duplication. Search input has proper `aria-label`.
- **Privacy page** — TOC with 10 anchor links, all functional (verified: clicking `#children-data` scrolls + focuses target section with `tabindex="-1"`). Draft notice visible at top. 10 H2 sections, readable per Phase 2 RTL/a11y review.
- **Mobile nav** — hamburger 44×44px touch target, opens Sheet with 6 nav links.
- **Language toggle** — compact "ع" / "EN" buttons, 44px height, `aria-pressed` + `aria-label`. Verified: clicking EN switches `lang="en" dir="ltr"` + translates H1 to "A faster mind. A better future." + CTA to "Book a free trial lesson".
- **Cross-page links (mostly coherent)** — header nav (6 items) + footer (5 quick links + 5 secondary links) provide consistent wayfinding. Footer includes /platform, /schools, /trainers, /faq, /privacy — all 11 routes reachable from any page.
- **Mobile UX** — single-column layouts at 390px, multi-column at md/lg breakpoints. Channel cards, FAQ accordions, form fields, comparison table all reflow correctly. No horizontal overflow at any viewport (verified `scrollWidth === clientWidth` on all 22 page×viewport combinations).

---

## Cross-Cutting Observations

### What's working well
1. **Honest prototype framing** — every form has a PrototypeFormNotice, every success state explicitly says "no data sent", privacy page is labeled as a draft. This builds trust and matches SOURCE_OF_TRUTH §10 (prototype scope).
2. **Section background alternation** — all pages follow the DESIGN.md `§Section-background alternation` rule (icy ↔ white, navy reserved for hero/footer/safety sections). Visual rhythm is consistent.
3. **Single orange CTA per viewport** — verified: home (1 in hero), platform (1 final), faq (1 contact CTA), register/contact/schools/trainers (1 form submit). No page violates the "one orange per viewport" anti-pattern.
4. **Final CTA pattern** — 6 of 11 pages end with the orange CTASection (home, about, program, channels, [platform has its own variant], [form pages end with form]). Form pages correctly OMIT the final CTA to avoid post-form distraction.

### What needs attention
1. **Affordance consistency** — home channel cards break the clickability expectation that /channels cards establish. Either both should be clickable or neither should look clickable.
2. **Form width governance** — PageContainer's default `max-w-[1200px]` is too wide for form contexts. The component should expose a `width="form"` tier or honor `className` overrides reliably.
3. **Intent-label matching** — the "سجّل اهتمامك" → /platform → /register chain promises "interest registration" but delivers "trial lesson booking". CTA labels must match destination intent.
4. **Cross-page navigation density** — about, program, and home have few in-page links to other routes. Visitors rely on header nav, missing contextual discovery opportunities.

---

## Recommended Priority Order

1. **[BLOCKER #1]** — Fix home channel cards (wrap CTAs in `<a>` or make entire card clickable). Single-component fix in `channel-card.tsx` + add `href` to `Channel` interface in `home.ts`.
2. **[CRITICAL #2]** — Fix register form width (add `width="narrow"` or refactor `PageContainer`). One-line prop change + optional component refactor.
3. **[CRITICAL #3]** — Change /channels card 3 CTA from "سجّل اهتمامك" → "اعرف المزيد" (or add inline interest form on /platform). Content change in `channels.ts`.
4. **[MAJOR #5]** — Add contextual placeholders to /register selects. Content change in `register/page.tsx`.
5. **[MAJOR #6]** — Add "see all FAQs" link on /program inline FAQ. One-line addition.
6. **[MAJOR #7]** — Remove duplicate WhatsApp button on /contact. One-line removal.
7. **[MAJOR #4]** — Reduce /register form friction (make some fields optional, or split into 2 steps). Schema + content change.
8. **[MINOR #8, #9, #10]** — Polish: in-page CTAs on /about, layout variation on /schools + /trainers, CTA visual hierarchy on /channels.
9. **[SUGGESTION #11, #12, #13]** — Optional enhancements.

---

## Test Artifacts

- DOM inspection data: `/home/z/ux_results.json`, `/home/z/ux_detail.json`, `/home/z/ux_sections.json`
- Screenshots (22 page×viewport combinations): `/home/z/ux_shots/{page}_{mobile,desktop}.png`
- Interaction test scripts: `/home/z/ux_inspect.js`, `/home/z/ux_detail.js`, `/home/z/ux_selects.js`, `/home/z/ux_interactions.js`, `/home/z/ux_interactions2.js`, `/home/z/ux_lang3.js`
- VLM analysis JSONs: `/home/z/vlm_home.json`, `/home/z/vlm_home_chan.json`, `/home/z/vlm_reg.json`, `/home/z/vlm_chan.json`, `/home/z/vlm_home_desc.json`, `/home/z/vlm_contact.json`, `/home/z/vlm_reg_desk.json`, `/home/z/vlm_home_desk.json`, `/home/z/vlm_plat.json`

---

**End of report.**
