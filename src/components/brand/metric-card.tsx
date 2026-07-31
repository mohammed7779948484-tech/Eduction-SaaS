import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  value: string;
  label: string;
  className?: string;
}

/** MetricCard — compact stat/metric display for interior pages. */
export function MetricCard({ value, label, className }: MetricCardProps) {
  return (
    <Card className={cn("p-6 text-center border-border bg-card shadow-sm", className)}>
      <div className="size-2 rounded-full bg-accent mx-auto mb-3" aria-hidden />
      <div className="text-3xl sm:text-4xl font-extrabold text-primary tabular-nums leading-none">{value}</div>
      <div className="mt-2 text-sm text-muted-foreground font-medium">{label}</div>
    </Card>
  );
}
