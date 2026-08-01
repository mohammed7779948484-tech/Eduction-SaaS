"use client";

import { MessageCircle } from "lucide-react";
import { site } from "@/content/site";

/**
 * FloatingWhatsApp — fixed WhatsApp button visible on all pages.
 * Per DOCX requirement: "زر واتساب ثابت يظهر على كل الصفحات".
 * Positioned at inline-end bottom, above footer, with pre-filled message.
 */
export function FloatingWhatsApp() {
  const whatsappNumber = site.whatsapp.replace(/[^0-9]/g, "");
  const message = encodeURIComponent("مرحباً، أودّ الاستفسار عن برنامج الحساب الذهني وحجز حصة تجريبية.");
  const href = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="تواصل عبر واتساب"
      className="fixed bottom-5 end-5 z-overlay flex items-center gap-2 rounded-full bg-success px-4 py-3 text-white shadow-lg transition-all hover:bg-success/90 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 group"
    >
      <MessageCircle className="size-6 shrink-0" />
      <span className="hidden sm:inline text-sm font-bold max-w-0 group-hover:max-w-xs overflow-hidden whitespace-nowrap transition-all duration-300">
        تواصل عبر واتساب
      </span>
    </a>
  );
}
