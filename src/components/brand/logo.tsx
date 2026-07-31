import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  /** Show the wordmark next to the glyph. */
  withWordmark?: boolean;
  /** Visual tone — light text for dark backgrounds. */
  tone?: "dark" | "light";
  size?: number;
}

/**
 * Brand logo — typographic wordmark + abacus glyph built from brand tokens.
 * Placeholder until the client supplies the final vector logo (see ASSET_GUIDELINES.md).
 */
export function Logo({
  className,
  withWordmark = true,
  tone = "dark",
  size = 40,
}: LogoProps) {
  const wordmarkColor = tone === "light" ? "text-white" : "text-primary";
  const subColor = tone === "light" ? "text-white/70" : "text-muted-foreground";

  return (
    <span className={cn("inline-flex items-center gap-2 sm:gap-2.5", className)}>
      <AbacusGlyph size={size} aria-hidden />
      {withWordmark && (
        <span className="flex flex-col leading-tight">
          <span className={cn("font-extrabold text-sm sm:text-base lg:text-lg", wordmarkColor)}>
            برنامج الحساب الذهني
          </span>
          <span className={cn("hidden sm:block text-[10px] lg:text-xs tracking-wide", subColor)}>
            Mental Arithmetic Program
          </span>
        </span>
      )}
    </span>
  );
}

export function AbacusGlyph({ size = 40, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="شعار برنامج الحساب الذهني"
    >
      <rect width="64" height="64" rx="14" fill="var(--brand-navy)" />
      <rect x="12" y="14" width="40" height="36" rx="4" fill="none" stroke="var(--brand-teal)" strokeWidth="2.5" />
      <line x1="20" y1="14" x2="20" y2="50" stroke="var(--brand-teal-pale)" strokeWidth="1.5" />
      <line x1="32" y1="14" x2="32" y2="50" stroke="var(--brand-teal-pale)" strokeWidth="1.5" />
      <line x1="44" y1="14" x2="44" y2="50" stroke="var(--brand-teal-pale)" strokeWidth="1.5" />
      <circle cx="20" cy="22" r="3.2" fill="var(--brand-orange)" />
      <circle cx="20" cy="42" r="3.2" fill="var(--brand-teal)" />
      <circle cx="32" cy="24" r="3.2" fill="var(--brand-teal)" />
      <circle cx="32" cy="40" r="3.2" fill="var(--brand-orange)" />
      <circle cx="44" cy="22" r="3.2" fill="var(--brand-orange)" />
      <circle cx="44" cy="42" r="3.2" fill="var(--brand-teal)" />
      <line x1="12" y1="32" x2="52" y2="32" stroke="var(--brand-teal-pale)" strokeWidth="1" />
    </svg>
  );
}
