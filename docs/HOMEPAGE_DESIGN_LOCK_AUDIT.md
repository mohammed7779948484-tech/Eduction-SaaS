# Homepage Design-Lock Audit (Phase 1.5)

> Per master task §8. Inspected each existing section before editing.
> Refinement, not redesign. Source: client DOCX + reference JPG + DESIGN.md.

## Design lens (from `frontend-design` skill)
- **Signature:** the abacus hero — enrich it; keep everything else disciplined.
- **Restraint:** "remove one accessory before leaving the house."
- **Structure is information:** numbering justified only where order carries meaning (the 4 steps).
- **Match complexity to vision:** educational/institutional → precision in spacing/type/detail, not maximalism.

## Per-section audit

| # | Section | Strengths | Weaknesses | Change? | Evidence / Source / Rule | Proposed change | Overdesign risk | Acceptance criterion |
|---|---------|-----------|-----------|---------|--------------------------|-----------------|-----------------|----------------------|
| 1 | Header | Functional, RTL, sticky, responsive | Logo scale slightly large on mobile; CTA could be quieter | Minor refine | DESIGN.md §Button hierarchy | Tighten logo mobile scale; header CTA stays navy | Low | Header clean at 360px, no overflow |
| 2 | Hero | Navy container, abacus visual, single orange CTA, GSAP timeline | Abacus visual flat; background lacks depth; floating badges feel arbitrary | **Refine** | DESIGN.md §Abacus-inspired graphic language; master task §11 | Enrich abacus: rail lines, numerical ticks, bead trails, controlled glow, subtle grid motif; reposition badges intentionally | Medium — keep restrained | Hero feels crafted, not templated; abacus remains signature |
| 3 | Statistics | 2×2 mobile, 4×1 desktop, count-up animation | Feels disconnected from hero→content bridge; no visual grouping | **Refine** | DESIGN.md §Section-background alternation; master task §12 | Add bead-accent above each number (abacus language); subtle dividers on desktop; tighten spacing | Low | Stats bridge hero→how-it-works cleanly |
| 4 | How-it-works | 4 source-defined steps, staggered | No sense of progression; numbers plain; cards generic | **Refine** | DESIGN.md §Abacus-inspired; master task §13 | Bead-shaped number badges; subtle RTL connecting rail; better number/title/desc rhythm | Medium | Progression immediately understandable |
| 5 | Channels | 3 source channels, shared component, color variation | Visual area is a flat glyph; lacks illustration value | **Refine** | DESIGN.md §Illustration direction; master task §14 | Lightweight branded SVG per channel (center/school/screen); token-driven | Medium | Channels visually richer, still equal-height |
| 6 | Testimonials | Carousel, quote, identity | Quote treatment plain; no position indicator | **Refine** | master task §15 | Refined quote mark, avatar treatment, pagination dots | Low | Trust communicated without overpowering hero |
| 7 | Final CTA | Orange banner, navy button, conversion focus | Decorative beads generic; spacing loose | Minor refine | DESIGN.md §CTA | Tighter spacing; bead motifs aligned to abacus language | Low | CTA refined, orange stays conversion-only |
| 8 | Footer | Multi-column, child-protection, lang toggle | Column balance; lacks subtle brand motif | Minor refine | master task §17 | Balance columns; subtle abacus divider motif at top | Low | Footer polished, IA preserved |
| 9 | Transitions | Section rhythm OK | Sections feel disconnected | **Refine** | master task §18 | Subtle abacus-rod-inspired section divider (reusable `RailDivider`) | Low | Visual unity without repetition |
| 10 | Mobile | Responsive, no overflow (fixed in P1) | Hero visual large; stats spacing | Minor refine | master task §23 | Tune hero visual scale; tighten stats mobile gap | Low | Clean at 360–430px |
| 11 | Tablet | Responsive | Carousel arrows hidden <lg (swipe works) | Preserve | P1 fix | — | — | Swipe works |
| 12 | Desktop | Balanced | Hero whitespace could be richer | Minor refine | DESIGN.md §Whitespace | Subtle background grid motif in hero | Low | Desktop hero feels premium |
| 13 | Motion | GSAP hero + Framer reveals, reduced-motion OK | Hero timeline durations inline (fixed P1) | Preserve | P1 fix | — | — | Motion restrained |
| 14 | Design-system reuse | Tokens centralized | New patterns (bead badge, rail divider) not yet in /design-system | **Add** | master task §20 | Add `BeadBadge` + `RailDivider` + channel illustrations to /design-system | Low | New patterns demonstrated |

## New reusable patterns (token-driven, documented, demonstrated in /design-system)
1. **`BeadBadge`** — bead-shaped number/label badge (abacus language). Used in: stats accent, step numbers.
2. **`RailDivider`** — abacus-rod-inspired section divider (subtle). Used in: section transitions, footer top.
3. **Channel illustrations** — 3 lightweight branded SVGs (center/school/screen). Used in: channel cards.

## Anti-overdesign guardrails
- No new gradients. No glassmorphism. No 3D. No new component library. No animation everywhere.
- Orange stays conversion-only. Abacus appears in hero + subtle motifs, NOT in every section.
- Every new pattern is token-driven, accessible, reduced-motion compatible, and demonstrated in /design-system.
