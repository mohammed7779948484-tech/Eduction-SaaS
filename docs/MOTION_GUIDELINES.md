# Motion Guidelines

> Companion to `DESIGN.md` §Motion. Centralized motion layer in `src/lib/motion/` and `src/lib/gsap/`.

## Responsibility hierarchy

| Layer | Tool | Use for |
|-------|------|---------|
| 1 | CSS / Tailwind transitions | hover, color, shadow, focus, small transforms, decorative loops |
| 2 | Framer Motion | reveals, entrances, stagger, layout, carousel, hover-lift, count-up, viewport-triggered |
| 3 | GSAP | **signature sequences only**: hero timeline, abacus animation |

## Framer Motion system (`src/lib/motion/`)
- `tokens.ts` — durations/easings/stagger mapped from CSS `--motion-*` / `--ease-*`.
- `reduced-motion.ts` — `usePrefersReducedMotion` hook + `buildVariants()` shared variants (fadeUp, fadeIn, scaleIn, slideInStart) that collapse to instant under reduced motion.
- `presets/` — `reveal.ts` (viewport reveal), `stagger.ts` (container+item), `hover-lift.ts` (card hover), `count-up.ts` (number count-up).

Wrappers in `src/components/motion/`: `AnimatedReveal`, `AnimatedStagger`, `AnimatedCounter`, `ParallaxMedia`.

## GSAP system (`src/lib/gsap/`)
- `register.ts` — `useGSAP` registration + `gsap.registerPlugin(useGSAP)`.
- `hero-timeline.ts` — coordinated hero entrance (headline → subhead → CTAs → visual).
- `scroll-scenes.ts` — reserved for signature scroll scenes (used sparingly).
- All GSAP runs through `useGSAP(() => {...}, { scope, dependencies })` for automatic cleanup.

## Rules
- No page-local motion constants — always import from `src/lib/motion/tokens.ts`.
- No direct `gsap` import outside `src/lib/gsap/`.
- No character-by-character Arabic animation (use line/word-group/block).
- All motion respects `prefers-reduced-motion` (global CSS + `useReducedMotion`).
- Site stays attractive with all motion disabled.
- Avoid: excessive parallax, scroll hijacking, motion delaying content, decorative motion harming clarity.
- Verify GSAP timelines clean up (useGSAP handles this).
- Verify Framer components don't create unnecessary client boundaries (keep reveal wrappers minimal).
