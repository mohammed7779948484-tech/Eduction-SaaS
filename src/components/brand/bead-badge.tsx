import { cn } from "@/lib/utils";

interface BeadBadgeProps {
  children: React.ReactNode;
  /** Visual tone. */
  tone?: "teal" | "orange" | "navy" | "pale";
  size?: "sm" | "md" | "lg";
  className?: string;
}

/**
 * BeadBadge — abacus-bead-shaped number/label badge.
 * Extends the abacus visual language to other sections (master task §18).
 * Token-driven, accessible, reduced-motion compatible (static).
 */
const toneStyles = {
  teal: "bg-brand-teal-strong text-white",
  orange: "bg-brand-orange text-cta-foreground",
  navy: "bg-primary text-primary-foreground",
  pale: "bg-secondary text-primary",
} as const;

const sizeStyles = {
  sm: "size-8 text-sm",
  md: "size-11 text-base",
  lg: "size-14 text-lg",
} as const;

export function BeadBadge({ children, tone = "teal", size = "md", className }: BeadBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-full font-extrabold tabular-nums shadow-sm ring-2 ring-white/40",
        toneStyles[tone],
        sizeStyles[size],
        className
      )}
    >
      {children}
    </span>
  );
}
