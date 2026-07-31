import { cn } from "@/lib/utils";

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  /** Max width tier. */
  width?: "default" | "narrow" | "wide";
  as?: React.ElementType;
}

/**
 * Central page container — consistent max-width + horizontal padding.
 * Homepage uses "default" (1320px).
 */
export function PageContainer({
  children,
  className,
  width = "default",
  as: Tag = "div",
}: PageContainerProps) {
  const maxW =
    width === "narrow"
      ? "max-w-3xl"
      : width === "wide"
      ? "max-w-[1320px]"
      : "max-w-[1200px]";

  return (
    <Tag className={cn("mx-auto w-full px-4 sm:px-6 lg:px-8", maxW, className)}>
      {children}
    </Tag>
  );
}
