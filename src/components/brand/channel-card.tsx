"use client";

import { Card } from "@/components/ui/card";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useLanguage } from "@/components/layout/language-provider";
import { cn } from "@/lib/utils";
import type { Channel } from "@/content/home";
import { ChannelIllustration, type ChannelKind } from "./channel-illustration";

interface ChannelCardProps {
  channel: Channel;
  className?: string;
}

const variantStyles: Record<Channel["variant"], { bg: string; hover: string; glyph: ChannelKind }> = {
  navy: { bg: "bg-brand-navy", hover: "hover:bg-brand-navy-dark", glyph: "center" },
  blue: { bg: "bg-brand-blue", hover: "hover:brightness-110", glyph: "school" },
  teal: { bg: "bg-brand-teal", hover: "hover:brightness-105", glyph: "screen" },
};

/** Learning channel card — one shared component, branded SVG illustration per channel. */
export function ChannelCard({ channel, className }: ChannelCardProps) {
  const { lang } = useLanguage();
  const v = variantStyles[channel.variant];
  const Arrow = lang === "ar" ? ArrowLeft : ArrowRight;
  return (
    <Card
      className={cn(
        "group h-full overflow-hidden border-0 p-0 shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
        v.bg,
        v.hover,
        className
      )}
    >
      {/* Visual band with branded illustration */}
      <div className={cn("relative h-32 sm:h-40 flex items-center justify-center", v.bg)}>
        <ChannelIllustration kind={v.glyph} />
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
