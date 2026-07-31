"use client";

import { useLanguage } from "./language-provider";
import { cn } from "@/lib/utils";

/** AR/EN toggle — accessible segmented control. Active state uses primary (navy), not the conversion-orange. */
export function LanguageToggle({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const { lang, setLang } = useLanguage();

  const base = cn(
    "inline-flex items-center rounded-full border p-0.5 text-xs font-bold",
    tone === "light" ? "border-white/30 bg-white/10" : "border-border bg-secondary"
  );
  const active = "bg-primary text-primary-foreground";
  const inactive =
    tone === "light"
      ? "text-white/80 hover:text-white"
      : "text-muted-foreground hover:text-primary";

  return (
    <div role="group" aria-label={lang === "ar" ? "اللغة" : "Language"} className={base}>
      <button
        type="button"
        onClick={() => setLang("ar")}
        aria-pressed={lang === "ar"}
        aria-label={lang === "ar" ? "العربية" : "Arabic"}
        className={cn("min-h-11 rounded-full px-3 py-1.5 transition-colors", lang === "ar" ? active : inactive)}
      >
        ع
      </button>
      <button
        type="button"
        onClick={() => setLang("en")}
        aria-pressed={lang === "en"}
        aria-label="English"
        className={cn("min-h-11 rounded-full px-3 py-1.5 transition-colors", lang === "en" ? active : inactive)}
      >
        EN
      </button>
    </div>
  );
}
