import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  align?: "start" | "center";
  tone?: "dark" | "light";
  className?: string;
  as?: "h2" | "h3";
}

/** Shared section heading with eyebrow + title + subtitle. */
export function SectionHeading({
  title,
  subtitle,
  eyebrow,
  align = "center",
  tone = "dark",
  className,
  as: Tag = "h2",
}: SectionHeadingProps) {
  const titleColor = tone === "light" ? "text-white" : "text-primary";
  const subColor = tone === "light" ? "text-white/80" : "text-muted-foreground";
  const eyebrowColor = tone === "light" ? "text-brand-teal-pale" : "text-brand-teal-strong";

  return (
    <div
      className={cn(
        "flex flex-col gap-2",
        align === "center" ? "items-center text-center" : "items-start text-start",
        className
      )}
    >
      {eyebrow && (
        <span className={cn("text-sm font-bold tracking-wide", eyebrowColor)}>
          {eyebrow}
        </span>
      )}
      <Tag className={cn("text-2xl sm:text-3xl font-extrabold leading-tight text-balance", titleColor)}>
        {title}
      </Tag>
      {subtitle && (
        <p className={cn("text-base sm:text-lg max-w-2xl text-pretty", subColor)}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
