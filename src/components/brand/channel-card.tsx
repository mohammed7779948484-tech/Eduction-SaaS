"use client";

import { Card } from "@/components/ui/card";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useLanguage } from "@/components/layout/language-provider";
import { cn } from "@/lib/utils";
import type { Channel } from "@/content/home";

interface ChannelCardProps {
  channel: Channel;
  className?: string;
}

const variantStyles: Record<Channel["variant"], { bg: string; hover: string }> = {
  navy: { bg: "bg-brand-navy", hover: "hover:bg-brand-navy-dark" },
  blue: { bg: "bg-brand-blue", hover: "hover:brightness-110" },
  teal: { bg: "bg-brand-teal", hover: "hover:brightness-105" },
};

/** Learning channel card — one shared component, controlled color variation. */
export function ChannelCard({ channel, className }: ChannelCardProps) {
  const { lang } = useLanguage();
  const v = variantStyles[channel.variant];
  const Arrow = lang === "ar" ? ArrowLeft : ArrowRight;
  return (
    <Card
      className={cn(
        "group h-full overflow-hidden border-0 p-0 shadow-md transition-all duration-300",
        v.bg,
        v.hover,
        className
      )}
    >
      {/* Visual band */}
      <div className="relative h-32 sm:h-40 flex items-center justify-center">
        <ChannelGlyph variant={channel.variant} />
      </div>
      {/* Content */}
      <div className="bg-card p-6 space-y-3">
        <h3 className="text-lg font-bold text-primary">{channel.title[lang]}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {channel.description[lang]}
        </p>
        <span className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-teal-strong group-hover:gap-2.5 transition-all">
          {channel.cta[lang]}
          <Arrow className="size-4" />
        </span>
      </div>
    </Card>
  );
}

function ChannelGlyph({ variant }: { variant: Channel["variant"] }) {
  const color =
    variant === "navy" ? "var(--brand-teal)" : variant === "blue" ? "var(--brand-white)" : "var(--brand-navy)";
  return (
    <svg width="72" height="72" viewBox="0 0 64 64" fill="none" aria-hidden>
      <rect x="10" y="12" width="44" height="40" rx="5" fill="none" stroke={color} strokeWidth="2.5" opacity="0.85" />
      <line x1="20" y1="12" x2="20" y2="52" stroke={color} strokeWidth="1.5" opacity="0.6" />
      <line x1="32" y1="12" x2="32" y2="52" stroke={color} strokeWidth="1.5" opacity="0.6" />
      <line x1="44" y1="12" x2="44" y2="52" stroke={color} strokeWidth="1.5" opacity="0.6" />
      <circle cx="20" cy="22" r="3.4" fill="var(--brand-orange)" />
      <circle cx="32" cy="40" r="3.4" fill="var(--brand-orange)" />
      <circle cx="44" cy="24" r="3.4" fill={color} />
    </svg>
  );
}
