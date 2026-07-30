"use client";

import { motion, type MotionProps } from "framer-motion";
import { type ElementType, type ReactNode } from "react";
import { reveal } from "@/lib/motion/presets/reveal";
import { viewport } from "@/lib/motion/tokens";
import { usePrefersReducedMotion } from "@/lib/motion/reduced-motion";

interface AnimatedRevealProps extends Omit<MotionProps, "variants" | "initial" | "whileInView" | "viewport"> {
  children: ReactNode;
  variant?: "fadeUp" | "fadeIn" | "scaleIn";
  as?: ElementType;
  className?: string;
  delay?: number;
}

/** Single-element viewport reveal. Respects reduced-motion (no travel). */
export function AnimatedReveal({
  children,
  variant = "fadeUp",
  as = "div",
  className,
  delay = 0,
  ...rest
}: AnimatedRevealProps) {
  const reduced = usePrefersReducedMotion();
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;
  const v = reveal(variant);

  if (reduced) {
    const Tag = as as ElementType;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      variants={v}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      transition={{ delay }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
