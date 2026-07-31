import { cn } from "@/lib/utils";

interface RailDividerProps {
  className?: string;
  /** Number of beads along the rail. */
  beads?: number;
  /** Tone. */
  tone?: "teal" | "navy" | "muted";
}

/**
 * RailDivider — abacus-rod-inspired section divider.
 * A thin rail with evenly-spaced beads at low opacity.
 * Extends the abacus visual language for section transitions (master task §18).
 * Token-driven, decorative (aria-hidden), reduced-motion compatible (static).
 */
const railTone = {
  teal: { rail: "bg-brand-teal/30", bead: "bg-brand-teal" },
  navy: { rail: "bg-primary/20", bead: "bg-primary" },
  muted: { rail: "bg-border", bead: "bg-brand-grey-light" },
} as const;

export function RailDivider({ className, beads = 7, tone = "teal" }: RailDividerProps) {
  const t = railTone[tone];
  return (
    <div
      role="presentation"
      aria-hidden
      className={cn("flex items-center justify-center gap-1.5 py-2", className)}
    >
      <span className={cn("h-px w-12 sm:w-20", t.rail)} />
      <div className="flex items-center gap-1.5">
        {Array.from({ length: beads }).map((_, i) => (
          <span
            key={i}
            className={cn(
              "size-1.5 rounded-full",
              t.bead,
              i === Math.floor(beads / 2) ? "opacity-90 size-2" : "opacity-40"
            )}
          />
        ))}
      </div>
      <span className={cn("h-px w-12 sm:w-20", t.rail)} />
    </div>
  );
}
