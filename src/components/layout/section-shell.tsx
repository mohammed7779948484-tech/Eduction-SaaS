import { cn } from "@/lib/utils";

interface SectionShellProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  /** Background tone for section rhythm. */
  tone?: "default" | "white" | "tint" | "navy";
  as?: React.ElementType;
  /** Vertical padding size. */
  spacing?: "default" | "compact" | "relaxed";
}

/**
 * Section shell — consistent vertical rhythm + background alternation.
 * navy reserved for hero/footer bookends. Forwards rest props (id, aria-label, …).
 */
export function SectionShell({
  children,
  className,
  tone = "default",
  as: Tag = "section",
  spacing = "default",
  ...rest
}: SectionShellProps) {
  const toneClass =
    tone === "white"
      ? "bg-card"
      : tone === "tint"
      ? "bg-brand-teal-pale/40"
      : tone === "navy"
      ? "bg-primary text-primary-foreground"
      : "bg-background";

  const spacingClass =
    spacing === "compact"
      ? "py-12 sm:py-16"
      : spacing === "relaxed"
      ? "py-20 sm:py-28"
      : "py-16 sm:py-24";

  return (
    <Tag className={cn(toneClass, spacingClass, className)} {...rest}>
      {children}
    </Tag>
  );
}
