"use client";

import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useLanguage } from "@/components/layout/language-provider";
import { cn } from "@/lib/utils";

interface ProfileCardProps {
  name: { ar: string; en: string };
  role: { ar: string; en: string };
  bio: { ar: string; en: string };
  className?: string;
}

/** ProfileCard — team/trainer profile display. Uses representative demo content. */
export function ProfileCard({ name, role, bio, className }: ProfileCardProps) {
  const { lang } = useLanguage();
  return (
    <Card className={cn("p-6 border-border bg-card shadow-sm text-center", className)}>
      <Avatar className="size-20 mx-auto mb-4">
        <AvatarFallback className="bg-brand-navy text-white text-xl font-bold">
          {name[lang].charAt(0)}
        </AvatarFallback>
      </Avatar>
      <h3 className="text-base font-bold text-primary">{name[lang]}</h3>
      <p className="text-sm text-brand-teal-strong font-medium mb-2">{role[lang]}</p>
      <p className="text-xs text-muted-foreground leading-relaxed">{bio[lang]}</p>
    </Card>
  );
}
