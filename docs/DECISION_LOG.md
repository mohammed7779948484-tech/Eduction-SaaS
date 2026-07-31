# Decision Log

> Significant decisions involving source conflicts, dependencies, architecture,
> typography, color, animation, images, content assumptions, rejected recommendations.

| # | Decision | Context / Conflict | Rationale | Date |
|---|----------|--------------------|-----------|------|
| D1 | Use "برنامج الحساب الذهني" as brand name | JPG reference shows "درس الخبرة"; DOCX/PDF use "برنامج الحساب الذهني" (C1) | DOCX is authoritative for identity (hierarchy §2) | M1 |
| D2 | Use DOCX image1 exact hex as brand palette | JPG-derived approximate hex differ (C2) | DOCX color plate is authoritative (hierarchy §2) | M1 |
| D3 | DOCX text page list is canonical IA | DOCX text vs image2 site-map differ (C3) | DOCX text is explicit; image2 is supporting diagram | M1 |
| D4 | Prototype is static frontend-only; no Payload/Postgres | PDF recommends production stack (C4) | Master task forbids backend in prototype | M1 |
| D5 | Keep `framer-motion`; do NOT migrate to `motion` | Master task §10 explicit | Already installed; migration risk unnecessary for prototype | M2 |
| D6 | Add `gsap` + `@gsap/react`; GSAP for hero only | Master task §11 | Signature timeline requires GSAP; centralized in `src/lib/gsap/` | M2 |
| D7 | Remove `tailwindcss-animate`; keep `tw-animate-css` | Both present (C5) | Tailwind v4 CSS-first + tw-animate-css suffice; legacy config deleted | M2 |
| D8 | Remove `next-themes`; light-only prototype | Master task forbids excessive complexity | Arabic-first marketing prototype is light-only; `.dark` block removed | M2 |
| D9 | Remove `zustand`; use React Context | No genuine global state | AR/EN toggle + mobile nav via Context/local state | M2 |
| D10 | Curate 24 shadcn components; remove 24 | Master task §12 | Deliberate set for homepage + future pages; no retained component depends on removed ones | M2 |
| D11 | Select **Tajawal** as Arabic font | Candidates: Tajawal, Cairo, IBM Plex Sans Arabic, Noto Naskh | Modern, legible at small sizes, warm for kids' education, strong weights, matches reference direction | M4 |
| D12 | Latin digits for stats (tabular-nums) in prototype | Arabic-Indic vs Latin | Clarity for mixed audience; full localization is future | M4 |
| D13 | Orange `--cta` reserved for conversion only | DESIGN.md | ≤1 orange CTA per viewport; never decorative | M4 |
| D14 | Skills documented but not persistently installed | `npx skills add` timed out in sandbox (network) | Discovery+evaluation+documentation complete; agent-browser used for visual QA; documented per master task §5 | M1 |
| D15 | Logo is typographic + abacus-glyph placeholder | Client vector not provided | Built from tokens; easy to replace; documented limitation | M4 |

## Phase 1.5 Decisions

| # | Decision | Context | Rationale | Phase |
|---|----------|---------|-----------|-------|
| D16 | Extend abacus visual language with BeadBadge + RailDivider + ChannelIllustration | Master task §18 (extend abacus language subtly) | Reusable, token-driven, documented patterns create visual unity without repetition | P1.5 |
| D17 | Enrich hero abacus (rail lines, numerical ticks, bead trails, glow, grid motif) | Master task §11 (hero refinement); frontend-design skill ("signature") | Abacus is the signature — spend boldness here; keep everything else disciplined | P1.5 |
| D18 | BeadBadge teal tone uses `bg-brand-teal-strong` (not `bg-brand-teal`) | WCAG AA contrast (white on #37B0C3 = 2.57:1 fails; white on #1F7D8C = 4.81:1 passes) | Accessibility gate | P1.5 |
| D19 | Testimonial avatar: solid `bg-brand-navy` (not gradient) | WCAG AA + "no new gradients" anti-pattern | Solid navy = 8.86:1; resolves both contrast + gradient rule | P1.5 |
| D20 | Pagination dots: 44×44 touch target wrapper + role=tablist | WCAG 2.5.8 AA (24px) + project 44px standard | Accessibility gate | P1.5 |
| D21 | Language toggle: `min-h-11` (44px) | WCAG 2.5.5 AAA touch target | Project standard | P1.5 |
| D22 | `overflow-x: hidden` on html+body | 360px decorative-blur overflow (7px, sub-perceptible) | Guarantee no horizontal scroll at any viewport | P1.5 |
| D23 | Orange strictly conversion-only (step-card dot → teal; testimonial dot → navy) | DESIGN.md §Color roles; subagent finding | Brand-rule discipline | P1.5 |
| D24 | Hero padding tighter than DESIGN.md spec (py-8/12/16 vs 16/24) | Intentional focal emphasis on navy hero panel | Documented exception | P1.5 |
| D25 | Skills: `frontend-design` verified installed; 5 others cannot install (network) but 10 built-in skills cover all 7 required categories | Master task §6.6 honest failure + equivalent built-in capability | Verified capability over false install count | P1.5 |
| D26 | Production-build screenshots (not dev) for final client review | Master task §24 (no Next.js N indicator) | Client-presentation quality | P1.5 |
