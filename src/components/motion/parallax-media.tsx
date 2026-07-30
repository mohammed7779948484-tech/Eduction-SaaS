"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { usePrefersReducedMotion } from "@/lib/motion/reduced-motion";

interface ParallaxMediaProps {
  children: ReactNode;
  className?: string;
  /** Parallax intensity in px (0 = none). Keep small to avoid harming clarity. */
  distance?: number;
}

/**
 * Lightweight scroll parallax wrapper (Framer Motion, no GSAP/ScrollTrigger).
 * Disabled under reduced-motion. Use sparingly — avoid scroll hijacking.
 */
export function ParallaxMedia({ children, className, distance = 24 }: ParallaxMediaProps) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);

  if (reduced) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}
