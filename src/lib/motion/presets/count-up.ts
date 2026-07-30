"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";
import { usePrefersReducedMotion } from "../reduced-motion";
import { easings } from "../tokens";

export interface CountUpOptions {
  from?: number;
  to: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

/**
 * Animated number count-up when the element enters the viewport.
 * Respects reduced-motion (jumps to final value via a zero-duration tween,
 * so no setState is called synchronously inside the effect body).
 */
export function useCountUp({
  from = 0,
  to,
  duration = 1.6,
  prefix = "",
  suffix = "",
  decimals = 0,
}: CountUpOptions) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduced = usePrefersReducedMotion();
  const [display, setDisplay] = useState(from);

  useEffect(() => {
    if (!inView) return;
    // Always animate; under reduced-motion the duration is 0 so onUpdate fires
    // once with the final value (setState happens in a callback, not synchronously).
    const controls = animate(from, to, {
      duration: reduced ? 0 : duration,
      ease: easings.decelerated,
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
  }, [inView, reduced, from, to, duration]);

  const formatted = display.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return { ref, value: `${prefix}${formatted}${suffix}` };
}
