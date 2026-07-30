"use client";

import { MapPin, MessageCircle, Mail, ShieldCheck } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { LanguageToggle } from "./language-toggle";
import { useLanguage } from "./language-provider";
import { navItems } from "@/lib/routes";
import { site } from "@/content/site";
import { heroContent } from "@/content/home";

export function SiteFooter() {
  const { lang } = useLanguage();
  const dir = lang === "ar" ? "ar" : "en";

  return (
    <footer className="bg-primary text-primary-foreground mt-auto">
      <div className="mx-auto w-full max-w-[1320px] px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand + child protection */}
          <div className="space-y-4 lg:col-span-2">
            <Logo tone="light" size={44} />
            <p className="text-sm text-primary-foreground/70 max-w-sm leading-relaxed">
              {lang === "ar"
                ? "منهجٌ تعليميٌّ حديث يعتمد على السوروبان لتنمية مهارات الحساب الذهني لدى الأطفال."
                : "A modern curriculum built on the Soroban to develop mental-arithmetic skills in children."}
            </p>
            <div className="flex items-start gap-2 rounded-lg bg-white/5 p-3 max-w-sm">
              <ShieldCheck className="size-5 text-brand-teal shrink-0 mt-0.5" />
              <p className="text-xs text-primary-foreground/80 leading-relaxed">
                {site.childProtection[dir]}
              </p>
            </div>
          </div>

          {/* Quick links */}
          <nav className="space-y-3" aria-label={lang === "ar" ? "تذييل" : "Footer"}>
            <h3 className="text-sm font-bold text-brand-teal-pale">
              {lang === "ar" ? "روابط سريعة" : "Quick links"}
            </h3>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.enabled ? item.href : undefined}
                    aria-disabled={!item.enabled}
                    className={
                      item.enabled
                        ? "text-sm text-primary-foreground/80 hover:text-brand-teal transition-colors"
                        : "text-sm text-primary-foreground/40 cursor-not-allowed"
                    }
                  >
                    {item.label[lang]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact + branches */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-brand-teal-pale">
              {lang === "ar" ? "تواصل معنا" : "Contact"}
            </h3>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li className="flex items-center gap-2">
                <MessageCircle className="size-4 text-brand-teal shrink-0" />
                <span dir="ltr">{site.whatsapp}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="size-4 text-brand-teal shrink-0" />
                <span dir="ltr">{site.email}</span>
              </li>
            </ul>
            <div className="space-y-1.5 pt-1">
              {site.branches.map((b, i) => (
                <p key={i} className="flex items-center gap-2 text-xs text-primary-foreground/70">
                  <MapPin className="size-3.5 text-brand-teal shrink-0" />
                  {b.city[dir]} — {b.area[dir]}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 pt-6">
          <p className="text-xs text-primary-foreground/60 text-center sm:text-start">
            © {new Date().getFullYear()} {site.name[dir]}
          </p>
          <LanguageToggle tone="light" />
        </div>
      </div>
    </footer>
  );
}
