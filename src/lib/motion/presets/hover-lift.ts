import type { Variants } from "framer-motion";
import { durations, easings } from "../tokens";

/** Card hover-lift: a subtle rise + shadow on hover. Use on motion elements. */
export function hoverLift(): Variants {
  return {
    rest: { y: 0, boxShadow: "var(--shadow-sm)" },
    hover: {
      y: -6,
      boxShadow: "var(--shadow-md)",
      transition: { duration: durations.fast, ease: easings.standard },
    },
  };
}

/** Tap feedback for pressable cards. */
export function tapPress() {
  return { scale: 0.98 };
}
