# Source of Truth

> The single authoritative record of every client source, what each controls,
> the requirements extracted from each, conflicts discovered, their resolutions,
> missing information, prototype assumptions, unverified claims, and reusable
> assets. All implementation must trace back to this document.

---

## 1. Source Inventory

| # | Source | File | Authority scope |
|---|--------|------|-----------------|
| S1 | Master Task | `upload/Pasted Content_1785439153722.txt` | Process, scope, deliverables, quality gates, working rules |
| S2 | Client Identity & Execution-Concept DOCX | `upload/Document (1) (4).docx` | **Visual identity, colors, homepage direction, design-system direction, page sections** |
| S3 | Phase 1 Proposal PDF | `upload/Phase1_Proposal_MentalArithmetic.pdf` | Business goals, audiences, content, channels, future page scope, localization |
| S4 | Homepage Reference Image | `upload/98183116-d03c-4928-b1df-fbda654baabb.JPG` | Homepage layout & visual direction (structural reference) |

Extracted derived artifacts live in `upload/extracted/` (`docx_text.txt`, `pdf_text.txt`, `image1–4.png`).

---

## 2. Source-of-Truth Hierarchy

1. **S2 (DOCX) + S4 (reference image)** are authoritative for **visual identity and homepage direction**.
2. **S3 (Phase 1 PDF)** is authoritative for **business goals, audiences, content, sections, and future page scope**.
3. Existing scaffold defaults (Z.ai branding, Geist font, neutral palette) are **not authoritative**.
4. Missing details are resolved through documented **prototype assumptions** (§7).
5. Demonstration content does **not** represent verified production data.
6. Illustrative statistics / testimonials are **never** presented as verified client facts.

---

## 3. Requirements Extracted per Source

### S1 — Master Task (process)
- Prototype only: homepage + design system + `/design-system` page + shared layout + full docs.
- Arabic-first, fully RTL, premium, responsive (mobile → large desktop), static, frontend-only.
- Forbidden: database, Prisma, auth, backend, CMS, real APIs, payments, real AI assistant, remaining pages.
- Keep `framer-motion` (do NOT migrate to `motion`); add `gsap` + `@gsap/react` for signature sequences only.
- Centralize all design tokens, motion tokens; no raw brand hex outside token files; no page-local motion constants.
- Specialist subagents review; primary agent implements; iterative quality loops with 7 gates.

### S2 — DOCX (identity + homepage + design system)
- **Program name (Arabic):** برنامج الحساب الذهني · **English:** MENTAL ARITHMETIC PROGRAM.
- **Context:** Yemen. 3-phase roadmap: (1) public institutional site → (2) e-learning platform w/ secure online payment → (3) web app. This prototype = Phase 1 public site only.
- **Public-site page list (from DOCX text):**
  1. الرئيسية — conversion hub: story + proof + clear path to a trial lesson.
  2. من نحن — vision, methodology, lead trainer, child-protection commitment.
  3. البرنامج — Soroban method, 10 levels, age groups, results, FAQ.
  4. القنوات — in-center, partner-schools, online platform (side by side).
  5. المنصة الافتراضية — gateway to the e-learning platform.
  6. التسجيل — registration + trial-lesson booking + pricing + payment.
  7. تواصل معنا — branches, map, WhatsApp, help form.
- **Homepage section order (authoritative, from DOCX):**
  1. Header
  2. Hero — confident, single primary CTA
  3. Credibility statistics strip
  4. "How the program works" — simple 4-step explanation
  5. Three learning channels
  6. Rotating parent/student testimonials
  7. Final trial-lesson CTA
  8. Footer — branches + child-protection statement + AR/EN toggle
- **AI admissions assistant:** a friendly chat assistant on the public site answering common parent questions (ages, price, schedule, locations) in AR/EN 24/7, helping book trial lessons. **(Concept only — NOT implemented in this prototype.)**
- **Design system (DOCX §"نظام التصميم"):** shared colors + fonts + elements guaranteeing consistency; every element must mirror correctly in RTL and stay tappable on small screens.
- **Bilingual & RTL & localization (DOCX):**
  - Full Arabic + English; one-tap switch; remembers choice.
  - **True RTL** — not a translation layer: layouts, navigation, icons, progress indicators all mirror.
  - Localized content: dates, numbers, currency (Yemeni Rial with USD reference), academic calendar reflect Yemeni context.
  - Arabic-first typography: a Naskh-style font chosen for clarity at small sizes and for young readers.
- **Figure 6 (DOCX image4) — UI element library:** typography samples, 4 button variants, badges (status), cards (info + form), progress bar. Components designed for RTL + small-screen tap targets.

### S3 — Phase 1 Proposal PDF (business + scope)
- **Title:** مقترح المرحلة الأولى — الموقع المؤسسي لبرنامج الحساب الذهني (السوروبان) — اليمن. v1.0, June 2026, confidential.
- **Executive summary:** Phase 1 builds a professional marketing/institutional front-end that introduces the program, builds trust with parents & schools, collects registration + trial-lesson requests, and prepares a scalable tech base. Goal = convert interested visitors into registered clients / partner schools / nominated trainers.
- **Target age:** 7–12 years (per reference design).
- **Audiences:** parents, students, schools, prospective trainers, institutional partners.
- **Three learning channels (as the client sees them):** in-center attendance, school partnerships, online (future channel).
- **Phase 1 scope functions:** design & UX, CMS (production — NOT in prototype), forms & request intake, WhatsApp, AI admissions assistant (production — NOT in prototype), SEO & performance.
- **Out of Phase 1 scope (production roadmap — NOT in prototype):** e-learning platform, payments, web app, real platform functionality.
- **3 packages:** Essential (A), Professional (B — recommended), Premium (C). Pricing in USD. *(Commercial detail — not part of the homepage prototype.)*
- **Recommended production stack:** Next.js + TypeScript + Tailwind + Payload CMS v3 + Postgres. **NOTE: this is the production recommendation; the prototype is static frontend-only and does NOT adopt Payload/Postgres.**
- **Localization requirements:** Arabic-first true RTL; English as second channel; Yemeni regional localization (YER + USD ref).
- **Design direction:** documented design system, considered motion & animation, visual authenticity, identity derived from the logo.
- **Recommendations:** conversion, trust, scalability, maintainability, future evolution.

### S4 — Homepage Reference Image (visual direction)
- Confirms section order: header → navy hero (abacus visual + single CTA) → light stats strip (4 metrics) → 4 how-it-works cards → 3 colored channel cards → testimonial carousel → orange CTA banner → navy footer.
- Visual mood: professional/trustworthy (navy), modern/clean (whitespace, rounded corners, flat), warm/encouraging (amber CTA), structured (grids).
- **Conflict:** the standalone JPG renders the brand wordmark as **"درس الخبرة"**, while S2/S3 use **"برنامج الحساب الذهني"**. See §6, conflict C1.

---

## 4. Visual Rules Extracted

### 4.1 Authoritative Brand Palette (from S2 image1 — exact hex)

These are the **only** permitted raw brand hex values; they live solely in `src/styles/tokens.css` and `DESIGN.md`. Everywhere else uses semantic tokens.

| Token (semantic) | Raw hex | Arabic label (DOCX) | Role |
|---|---|---|---|
| `--brand-orange` (CTA) | `#F2A23C` | كمبالي ملمع / برتقالي | Primary CTA, conversion accent |
| `--brand-navy-dark` | `#06335C` | كحلي غامق | Deepest navy — hero/footer depth |
| `--brand-blue` | `#2C8FC0` | أزرق متوسط | Medium blue — channel/secondary |
| `--brand-teal` | `#37B0C3` | فيروزي أساسي | Turquoise — primary brand, icons, accents |
| `--brand-navy` | `#0A4C82` | كحلي أساسي | Primary navy — headings, structure |
| `--brand-grey-light` | `#D2DCE2` | خفيف | Borders, dividers, muted surfaces |
| `--brand-grey-text` | `#56636E` | نص رمادي | Body/secondary text (darkened from DOCX `#6B7A86` for WCAG AA) |
| `--brand-ink` | `#2A3A47` | نص داكن | Headings, high-contrast text |
| `--brand-bg` | `#F4F9FA` | خلفية | Page background (icy off-white) |
| `--brand-teal-pale` | `#E1F0F3` | فيروزي خافت | Pale turquoise tint, soft surfaces |

> The approximate hex values inferred from the rasterized homepage JPG (e.g. `#1A4B6E`, `#F5A623`) are **superseded** by the exact palette above from the DOCX color plate (S2 image1), per hierarchy rule §2.

### 4.2 Color Roles (semantic usage)
- **Navy (`--brand-navy` / `--brand-navy-dark`):** trust, education, structure → hero background, footer, headings, primary structure.
- **Teal (`--brand-teal`):** growth, clarity, brand identity → icons, active states, accents, links.
- **Orange (`--brand-orange`):** warmth + urgency → **reserved for conversion CTAs only**. Never spread across decoration.
- **Medium blue (`--brand-blue`):** secondary surfaces (e.g. channel card variant).
- **Neutrals (`--brand-bg`, `--brand-grey-light`, `--brand-grey-text`, `--brand-ink`):** backgrounds, borders, text hierarchy.
- **Section background alternation:** alternate `--brand-bg` (icy) ↔ white surfaces to create rhythm; navy reserved for hero + footer.

### 4.3 Typography Direction
- Arabic-first. Candidates to evaluate: **Tajawal**, **IBM Plex Sans Arabic**, **Cairo**, **Noto Naskh Arabic**. Final selection documented in `DESIGN.md` §Typography.
- Hierarchy: H1 bold (hero, navy/white), H2 centered navy bold (section titles), body regular dark-grey at ~1.6 line-height, stat numbers extra-bold oversized.
- Numbers: Arabic-Indic numerals may render in localized contexts; Latin numerals acceptable for stats. Decision recorded in `DESIGN.md`.

### 4.4 Component Language (from S2 image4 + S4)
- Rounded corners ~8–16px (pills for badges/tags).
- Flat design; soft shadows only where elevation is needed.
- 4-button hierarchy: Primary (navy fill), CTA (orange fill), Secondary (light fill), Ghost (outline).
- Status badges: navy / blue / orange / teal pill variants.
- Cards: white surface, light border, ~8px radius, two-column (visual + content) where appropriate.

---

## 5. Future Page Scope (from S3 — for `PAGE_SPECS.md`, NOT implemented now)

Production roadmap pages (described only): About, Program (Soroban/10 levels/ages/results/FAQ), Learning Channels, Virtual Platform, Registration, Contact, Schools, Trainer, FAQ, Privacy. Plus the e-learning platform (Phase 2) and web app (Phase 3). None are implemented in this task.

---

## 6. Conflicts & Resolutions

| ID | Conflict | Sources | Resolution |
|----|----------|---------|------------|
| C1 | Brand name: JPG shows "درس الخبرة"; DOCX/PDF use "برنامج الحساب الذهني" | S4 vs S2/S3 | **DOCX authoritative.** Use "برنامج الحساب الذهني". The JPG is treated as a structural/visual-direction reference only; its wordmark is not the brand. |
| C2 | Exact colors: JPG-derived approximate hex vs DOCX color plate exact hex | S4 vs S2 | **DOCX image1 exact hex wins** (hierarchy §2.1). JPG colors used only for layout/role cues. |
| C3 | Public-site page list differs between DOCX text (7 pages) and DOCX image2 site-map (من نحن/الأهداف/المنهجية الأكاديمية/فرقنا التعليمية/الدورات/تواصل + virtual platform) | S2 text vs S2 image2 | **DOCX text page list is the canonical public-site IA** for this prototype; image2 reflects an earlier/alternate planning diagram and is treated as supporting context. Reconciled IA recorded in `docs/INFORMATION_ARCHITECTURE.md`. |
| C4 | Production stack (Payload CMS + Postgres) vs prototype (static frontend-only) | S3 vs S1 | **Prototype scope wins.** No CMS/DB. Production stack documented as future direction only. |
| C5 | Both `tailwindcss-animate` and `tw-animate-css` present in scaffold | repo | Resolve in `docs/DEPENDENCY_AUDIT.md`: keep `tw-animate-css`, remove `tailwindcss-animate` after verifying no retained component imports it. |
| C6 | PDF body text extraction is character-reversed (RTL layout) | S3 extraction | DOCX text (clean) + PDF TOC/structure are sufficient for requirements. Re-open PDF visually only if a specific claim needs verification. |

---

## 7. Missing Information & Prototype Assumptions

| Item | Status | Assumption |
|------|--------|------------|
| High-quality vector logo | Not provided as standalone asset | Use best available client asset from DOCX embedded media; treat as placeholder; keep easy to replace. Document limitation. |
| Real branch addresses / phone numbers | Not provided | Use representative Yemeni placeholder content; clearly demo. |
| Real testimonials | Not provided | Use clearly representative demo testimonials; never claim verified. |
| Real statistics (student count, years, satisfaction) | Not verified | Use illustrative demo numbers consistent with the reference image (95% / 3 / +780 / 10) but label as illustrative in code/docs. |
| Trial-lesson booking flow backend | Out of scope | Form validates locally, simulates loading, shows success toast, resets. No server. |
| AR/EN full bilingual content | Full English translations not authored in sources | Prototype ships **Arabic-first**; language toggle is functional UI with English strings for navigation/hero; full EN content is a documented gap. |
| Photography (children with abacus) | Not provided | Use CSS/SVG abacus-inspired graphics + abstract educational motifs; avoid generic stock-photo clichés. |
| Currency display | YER + USD reference (S3) | Show YER primary with USD reference where pricing appears (not on homepage). |

---

## 8. Unverified Claims (must NOT be presented as verified facts)

- All statistics in the stats strip (satisfaction %, branch count, student count, years).
- All demo testimonials.
- Any implied "10 levels" / age-range specifics beyond the 7–12 range stated in S3.
- Package pricing details (commercial, not for homepage).

---

## 9. Reusable Client-Provided Assets

| Asset | Source location | Extracted to | Use |
|-------|-----------------|--------------|-----|
| Brand color plate (10 swatches + hex) | S2 image1 | `upload/extracted/image1.png` | Token source of truth |
| Information-architecture diagram | S2 image2 | `upload/extracted/image2.png` | IA reference (C3) |
| Homepage mockup | S2 image3 | `upload/extracted/image3.png` | Homepage structural reference |
| UI element library (Fig 6) | S2 image4 | `upload/extracted/image4.png` | Component-language reference |
| Homepage reference photo | S4 JPG | `upload/98183116-….JPG` | Layout/visual-direction reference (wordmark not authoritative — C1) |
| Program wordmark (text) | S2/S3 | n/a | "برنامج الحساب الذهني" / "MENTAL ARITHMETIC PROGRAM" |

> No standalone vector logo file was provided. The prototype uses a typographic + abacus-glyph logo treatment built from brand tokens, designed for easy replacement when the client supplies the final vector logo.

---

## 10. Prototype Scope Reminder

This prototype implements **only**: source understanding, repo audit, skills, dependency cleanup, documentation, design system (DESIGN.md + tokens + `/design-system` page), shared layout, and the **homepage**. No other pages, no backend, no auth, no DB, no CMS, no real AI assistant, no payments. Future pages are described in `docs/PAGE_SPECS.md` but not built.
