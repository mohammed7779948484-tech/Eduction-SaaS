"use client";

import { motion, type MotionProps } from "framer-motion";
import { type ElementType, type ReactNode } from "react";
import { staggerContainer, staggerItem } from "@/lib/motion/presets/stagger";
import { viewport } from "@/lib/motion/tokens";
import { usePrefersReducedMotion } from "@/lib/motion/reduced-motion";

interface AnimatedStaggerProps extends Omit<MotionProps, "variants" | "initial" | "whileInView" | "viewport"> {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  staggerSpeed?: "fast" | "normal" | "slow";
  delayChildren?: number;
}

/** Container that staggers its direct <AnimatedStaggerItem> children into view. */
export function AnimatedStagger({
  children,
  as = "div",
  className,
  staggerSpeed = "normal",
  delayChildren = 0,
  ...rest
}: AnimatedStaggerProps) {
  const reduced = usePrefersReducedMotion();
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  if (reduced) {
    const Tag = as as ElementType;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      variants={staggerContainer(staggerSpeed, delayChildren)}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

interface StaggerItemProps extends Omit<MotionProps, "variants"> {
  children: ReactNode;
  as?: ElementType;
  className?: string;
}

export function AnimatedStaggerItem({ children, as = "div", className, ...rest }: StaggerItemProps) {
  const reduced = usePrefersReducedMotion();
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  if (reduced) {
    const Tag = as as ElementType;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag className={className} variants={staggerItem()} {...rest}>
      {children}
    </MotionTag>
  );
}
