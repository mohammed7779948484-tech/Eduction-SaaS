"use client";

import { useReducedMotion } from "framer-motion";
import { durations, easings, stagger, viewport } from "./tokens";

/**
 * Reduced-motion helpers. When the user prefers reduced motion, reveal/stagger
 * variants collapse to instant (final state shown, no travel).
 */
export function usePrefersReducedMotion(): boolean {
  return useReducedMotion() ?? false;
}

/** Shared variants — all respect reduced motion. */
export function buildVariants(reduced: boolean) {
  return {
    fadeUp: {
      hidden: { opacity: 0, y: reduced ? 0 : 24 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: reduced ? 0 : durations.normal, ease: easings.emphasized },
      },
    },
    fadeIn: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { duration: reduced ? 0 : durations.normal, ease: easings.emphasized },
      },
    },
    scaleIn: {
      hidden: { opacity: 0, scale: reduced ? 1 : 0.94 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: reduced ? 0 : durations.slow, ease: easings.emphasized },
      },
    },
    slideInStart: {
      // RTL-aware: slides in from the inline-start edge.
      hidden: { opacity: 0, x: reduced ? 0 : -32 },
      visible: {
        opacity: 1,
        x: 0,
        transition: { duration: reduced ? 0 : durations.normal, ease: easings.emphasized },
      },
    },
  } as const;
}

export { durations, easings, stagger, viewport };
