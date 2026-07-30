import type { Variants } from "framer-motion";
import { durations, easings, viewport } from "../tokens";

/** Single-element viewport reveal. */
export function reveal(variant: "fadeUp" | "fadeIn" | "scaleIn" = "fadeUp"): Variants {
  switch (variant) {
    case "fadeIn":
      return {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { duration: durations.normal, ease: easings.emphasized },
        },
      };
    case "scaleIn":
      return {
        hidden: { opacity: 0, scale: 0.94 },
        visible: {
          opacity: 1,
          scale: 1,
          transition: { duration: durations.slow, ease: easings.emphasized },
        },
      };
    case "fadeUp":
    default:
      return {
        hidden: { opacity: 0, y: 24 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: durations.normal, ease: easings.emphasized },
        },
      };
  }
}

export { viewport };
