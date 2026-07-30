# QA Checklist

## Automated
- [ ] `bun run lint` clean
- [ ] TypeScript clean (`bunx tsc --noEmit`)
- [ ] Dev server boots, no fatal errors in `dev.log`
- [ ] No console errors / hydration errors at `/` and `/design-system`
- [ ] No DB / Prisma / NextAuth / backend-SDK imports anywhere in `src/`
- [ ] No raw brand hex outside `src/styles/tokens.css` (grep `#[0-9A-Fa-f]{6}` in src excluding tokens.css/styles)
- [ ] No direct `gsap` import outside `src/lib/gsap/`
- [ ] No `tailwindcss-animate` / `motion` package import
- [ ] No `package-lock.json` (Bun only)
- [ ] No unused dependencies after cleanup
- [ ] No remaining page implemented accidentally (only `/` + `/design-system` + `/register` coming-soon placeholder)

## RTL & Accessibility
- [ ] `<html lang="ar" dir="rtl">` set
- [ ] Logical CSS utilities only (no physical left/right in RTL context)
- [ ] Keyboard navigation works through all interactive elements
- [ ] Visible focus states (`:focus-visible` ring)
- [ ] Touch targets ≥ 44px
- [ ] Alt text (Arabic) on all images
- [ ] Semantic landmarks (main/header/nav/section/footer)
- [ ] Contrast ≥ WCAG AA
- [ ] Reduced-motion: site usable + attractive with motion disabled

## Responsive (6 viewports)
- [ ] Small mobile (375px)
- [ ] Large mobile (414px)
- [ ] Tablet portrait (768px)
- [ ] Tablet landscape (1024px)
- [ ] Laptop (1280px)
- [ ] Large desktop (1536px+)
- [ ] No horizontal overflow at any width
- [ ] Mobile nav (Sheet) works RTL
- [ ] Hero stacks correctly on mobile
- [ ] Stats 2x2 → 4x1
- [ ] Channels 1 → 3

## Visual / Source alignment
- [ ] Homepage section order matches DOCX + reference image
- [ ] Brand colors match DOCX image1 exact hex
- [ ] Orange CTA used only for conversion (≤1 per viewport)
- [ ] Header/footer recognizable from reference
- [ ] Abacus visual present in hero
- [ ] No flat-image recreation (real HTML/CSS)
- [ ] No scaffold Z.ai branding

## Documentation
- [ ] AGENTS.md matches repo
- [ ] DESIGN.md matches implemented tokens
- [ ] PAGE_SPECS.md matches sources
- [ ] PROGRESS.md accurate
- [ ] REVIEW_LOG.md populated
- [ ] DECISION_LOG.md populated
