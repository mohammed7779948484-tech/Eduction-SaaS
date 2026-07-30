"use client";

import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Logo } from "@/components/brand/logo";
import { LanguageToggle } from "./language-toggle";
import { useLanguage } from "./language-provider";
import { navItems } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { heroContent } from "@/content/home";

export function SiteHeader() {
  const { lang } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const soonLabel = lang === "ar" ? "قريباً" : "Soon";

  return (
    <header
      className={cn(
        "sticky top-0 z-header w-full transition-all duration-300",
        scrolled
          ? "bg-background/85 backdrop-blur-md border-b border-border shadow-xs"
          : "bg-background/0"
      )}
    >
      <div className="mx-auto flex h-16 sm:h-20 w-full max-w-[1320px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo (inline-start) */}
        <a href="/" className="shrink-0" aria-label={lang === "ar" ? "الصفحة الرئيسية" : "Home"}>
          <Logo size={40} />
        </a>

        {/* Desktop nav (center) */}
        <nav className="hidden lg:flex items-center gap-1" aria-label={lang === "ar" ? "الرئيسية" : "Primary"}>
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.enabled ? item.href : undefined}
              aria-disabled={!item.enabled}
              tabIndex={item.enabled ? 0 : -1}
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                item.enabled
                  ? "text-foreground hover:bg-secondary hover:text-primary"
                  : "text-muted-foreground/50 cursor-not-allowed"
              )}
            >
              {item.label[lang]}
              {!item.enabled && <span className="ms-1 text-[10px] align-super">•</span>}
            </a>
          ))}
        </nav>

        {/* Actions (inline-end) */}
        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageToggle />
          {/* Header CTA is navy (default) so the hero retains the single orange CTA per viewport. */}
          <Button asChild variant="default" size="lg" className="hidden sm:inline-flex">
            <a href="/register">{heroContent.primaryCta[lang]}</a>
          </Button>

          {/* Mobile nav trigger — 44px touch target */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden size-11"
                aria-label={lang === "ar" ? "فتح القائمة" : "Open menu"}
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side={lang === "ar" ? "right" : "left"} className="w-[300px] p-0">
              <SheetHeader className="px-5 pt-5 pb-3 border-b border-border">
                <SheetTitle asChild>
                  <div>
                    <Logo size={36} />
                  </div>
                </SheetTitle>
                <SheetDescription className="sr-only">
                  {lang === "ar" ? "قائمة التنقّل للجوال" : "Mobile navigation menu"}
                </SheetDescription>
              </SheetHeader>
              <nav className="flex flex-col gap-1 p-4" aria-label={lang === "ar" ? "التنقّل" : "Mobile"}>
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.enabled ? item.href : undefined}
                    aria-disabled={!item.enabled}
                    onClick={() => item.enabled && setOpen(false)}
                    className={cn(
                      "rounded-lg px-3 py-3 text-base font-medium transition-colors min-h-11",
                      item.enabled
                        ? "text-foreground hover:bg-secondary hover:text-primary"
                        : "text-muted-foreground/50 cursor-not-allowed"
                    )}
                  >
                    {item.label[lang]}
                    {!item.enabled && <span className="ms-2 text-xs text-muted-foreground/60">{soonLabel}</span>}
                  </a>
                ))}
                <Button asChild variant="cta" size="lg" className="mt-3">
                  <a href="/register" onClick={() => setOpen(false)}>
                    {heroContent.primaryCta[lang]}
                  </a>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
