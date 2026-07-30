"use client";

import { useCountUp, type CountUpOptions } from "@/lib/motion/presets/count-up";

/** Animated number that counts up when scrolled into view. */
export function AnimatedCounter(options: CountUpOptions) {
  const { ref, value } = useCountUp(options);
  return (
    <span ref={ref} className="tabular-nums">
      {value}
    </span>
  );
}
