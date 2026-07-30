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
