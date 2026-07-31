# Consolidated Findings — Phase 2.5

> Merged from 6 specialist reviewer reports. Duplicates resolved, conflicts resolved, prioritized.

## Summary
- **BLOCKERS: 2** (skip link z-index, homepage channel cards non-clickable)
- **CRITICAL: 3** (Tajawal font never applied, form success state a11y, register form width)
- **MAJOR: 15** (contrast, heading hierarchy, select CSS, design-system gaps, dead code, etc.)
- **MINOR: 20+** (polish)
- **SUGGESTION: 10+** (deferred)

## Priority Fix Order

### P1 — BLOCKERS (must fix)
| ID | Issue | Reviewer | Fix |
|----|-------|----------|-----|
| B1 | Skip link obscured by sticky header (z-index tokens not in @theme inline) | R5 | Add `--z-header` + `--z-toast` to @theme inline in globals.css |
| B2 | Homepage channel cards non-clickable (CTA is `<span>` not `<a>`) | R2 | Add `href` to Channel interface + wrap CTA in `<a>` |

### P2 — CRITICAL (must fix)
| ID | Issue | Reviewer | Fix |
|----|-------|----------|-----|
| C1 | Tajawal font NEVER applied — `tajawal.variable` on `<body>` but `--font-sans` on `:root` reads empty `--font-tajawal` | R5 | Move `tajawal.variable` from `<body>` to `<html>` in layout.tsx |
| C2 | Form success state silent + focus lost (no role="status"/aria-live) | R5 | Add `role="status" aria-live="polite" tabIndex={-1}` + focus management |
| C3 | /register form ~1190px wide on desktop (PageContainer overrides max-w-2xl) | R2 | Fix PageContainer to honor className width override |

### P3 — MAJOR (should fix)
| ID | Issue | Reviewer | Fix |
|----|-------|----------|-----|
| M1 | Form error text contrast 4.38:1 (fails AA) | R5 | Darken --destructive to #c44141 |
| M2 | Footer secondary text contrast 4.26:1 (fails AA) | R5 | Change /60 to /70 opacity |
| M3 | /register heading skip (h1→h2→h3, missing h2 for form) | R5 | Add sr-only h2 |
| M4 | /schools benefits heading hierarchy | R5 | Add SectionHeading h2 |
| M5 | select.tsx physical CSS (right-2, pr-8 pl-2) | R5 | Change to logical (end-2, pe-8 ps-2) |
| M6 | /trainers "معتمد" (certified) claim | R1 | Soften to "تخرّج" |
| M7 | /channels duplicates channel-card variant mapping | R3/R4 | Export from channel-card |
| M8 | /design-system incomplete (missing PageHero, cards, etc.) | R3 | Add blocks (deferred — large effort) |
| M9 | titles metadata duplicated across 5 layouts | R4 | Extract to shared module |
| M10 | AudienceCard + MetricCard dead code | R4 | Use or delete |
| M11 | /contact duplicate WhatsApp CTA | R2 | Remove bottom duplicate |
| M12 | /register selects generic "اختر" placeholder | R2 | Contextualize |
| M13 | /program FAQ no link to /faq | R2 | Add "المزيد" link |
| M14 | /platform interest form promise but only button | R1 | Change copy to point to /register |
| M15 | /about + /platform mid-page navy sections | R3 | Document as intentional (thematic accent) |

### P4 — MINOR (polish, defer where needed)
- Sheet close button touch target (16px)
- CTA touch targets (size="lg" = 40px)
- Channels table missing caption/scope
- Carousel slides missing aria-label
- Carousel prev/next sr-only not localized
- role="alert" misused on informational alerts
- Channels ArrowLeft doesn't auto-flip on EN
- Redundant text-start overrides on accordions
- /faq no-results doesn't echo query
- /privacy print button
- Dead motion code (buildVariants, hoverLift, ParallaxMedia)
- text-[10px] arbitrary values
- Card padding inconsistency (p-6 vs p-8)
- /design-system text-accent for icons (AA fail on showcase page)
- BeadBadge orange tone unused

## Conflicts Resolved
- R2 marked homepage channel cards as BLOCKER; R3/R4 noted but didn't escalate. **Resolution: BLOCKER** — non-clickable CTAs are a functional defect.
- R3 MAJOR-4 (CTA button hierarchy inverted) vs DESIGN.md. **Resolution: ACCEPT** — the navy button on orange banner is intentional (DESIGN.md §Button hierarchy: "CTA — orange fill" is for the conversion action itself; the final CTA banner uses a navy button on orange which is a deliberate contrast choice). **Rejected** — current implementation is correct.
- R5 C1 (Tajawal never applied) vs previous P2-REVIEW-2 (marked PASS). **Resolution: CRITICAL** — R5 provided DOM evidence (font status "unloaded", system sans-serif rendering). This is a real defect.

## Accepted/Deferred
- M8 (/design-system incomplete): deferred — large effort, /design-system is an internal reference page, not client-facing. Will add key missing blocks.
- M10 (dead code): accepted — will use AudienceCard in trainers, delete MetricCard.
- M15 (navy sections): accepted as intentional — documented in DESIGN.md.
