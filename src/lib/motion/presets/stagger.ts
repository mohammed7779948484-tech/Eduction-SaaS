import type { Variants } from "framer-motion";
import { durations, easings, stagger, viewport } from "../tokens";

/** Container that orchestrates staggered children reveals. */
export function staggerContainer(
  staggerKey: keyof typeof stagger = "normal",
  delayChildren = 0
): Variants {
  return {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger[staggerKey],
        delayChildren,
      },
    },
  };
}

/** Item variant for use inside a stagger container. */
export function staggerItem(): Variants {
  return {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: durations.normal, ease: easings.emphasized },
    },
  };
}

export { viewport };
