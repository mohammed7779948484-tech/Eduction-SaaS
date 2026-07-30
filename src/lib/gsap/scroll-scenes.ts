"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "./register";
import { usePrefersReducedMotion } from "@/lib/motion/reduced-motion";

/**
 * Reserved for signature scroll scenes (used sparingly).
 * Currently a gentle parallax on a media element — disabled under reduced-motion.
 */
export function useParallaxScene(speed = 0.15) {
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;
      const el = ref.current;
      if (!el) return;
      gsap.to(el, {
        yPercent: -speed * 100,
        ease: "none",
        scrollTrigger: undefined, // ScrollTrigger not registered to keep bundle lean;
        // instead, bind to scroll via a lightweight rAF in component if needed.
      });
    },
    { scope: ref, dependencies: [reduced, speed] }
  );

  return { ref };
}
