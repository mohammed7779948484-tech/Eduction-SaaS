/**
 * Motion tokens — single source for durations, easings, stagger.
 * Values mirror the CSS custom properties in src/styles/tokens.css
 * so Framer Motion and GSAP share one scale.
 */

export const durations = {
  instant: 0.08,
  fast: 0.18,
  normal: 0.32,
  slow: 0.5,
  slower: 0.8,
} as const;

export const easings = {
  standard: [0.4, 0, 0.2, 1] as [number, number, number, number],
  emphasized: [0.2, 0, 0, 1] as [number, number, number, number],
  decelerated: [0, 0, 0.2, 1] as [number, number, number, number],
  accelerated: [0.4, 0, 1, 1] as [number, number, number, number],
  spring: [0.34, 1.56, 0.64, 1] as [number, number, number, number],
} as const;

export const stagger = {
  fast: 0.06,
  normal: 0.1,
  slow: 0.14,
} as const;

/** Viewport reveal configuration (shared by all reveal presets). */
export const viewport = {
  once: true,
  margin: "0px 0px -12% 0px",
  amount: 0.2,
} as const;

export type Duration = keyof typeof durations;
export type Easing = keyof typeof easings;
