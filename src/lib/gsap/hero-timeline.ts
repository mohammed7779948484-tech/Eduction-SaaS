"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "./register";
import { usePrefersReducedMotion } from "@/lib/motion/reduced-motion";
import { durations, stagger } from "@/lib/motion/tokens";

// GSAP string easings (no 1:1 Framer equivalent) — centralized here.
const EASE_OUT = "power3.out";
const EASE_BACK = "back.out(2)";

/**
 * Signature hero entrance timeline: eyebrow → headline → subhead → CTAs → visual → beads.
 * GSAP is used ONLY here (and the abacus animation) per master task §11.
 *
 * Each `data-hero-*` element carries `data-hero-anim` (CSS hides it until the
 * timeline runs; reduced-motion shows it immediately via a CSS media query).
 * The timeline animates the PARENT elements (not just their children) so the
 * inline opacity:1 overrides the CSS opacity:0 — otherwise children would stay
 * invisible behind a hidden parent (CSS opacity is multiplicative).
 */
export function useHeroTimeline() {
  const container = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reduced) return; // CSS media query already reveals elements.

      const tl = gsap.timeline({ defaults: { ease: EASE_OUT } });
      tl.fromTo(
        "[data-hero-eyebrow]",
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: durations.fast }
      )
        .fromTo(
          "[data-hero-title]",
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: durations.slow },
          "-=0.2"
        )
        .fromTo(
          "[data-hero-sub]",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: durations.fast },
          "-=0.35"
        )
        .fromTo(
          "[data-hero-cta]",
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: durations.normal },
          "-=0.25"
        )
        .fromTo(
          "[data-hero-visual]",
          { opacity: 0, scale: 0.92 },
          { opacity: 1, scale: 1, duration: durations.slower },
          "-=0.6"
        )
        .fromTo(
          "[data-hero-visual] [data-bead]",
          { opacity: 0, scale: 0 },
          { opacity: 1, scale: 1, duration: durations.normal, stagger: stagger.fast, ease: EASE_BACK },
          "-=0.3"
        );
    },
    { scope: container, dependencies: [reduced] }
  );

  return { container };
}
