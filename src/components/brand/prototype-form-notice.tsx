"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";
import { useLanguage } from "@/components/layout/language-provider";

/**
 * PrototypeFormNotice — alert-style notice that forms are prototype-only.
 * Shared across all form pages (registration, contact, schools, trainers).
 */
export function PrototypeFormNotice() {
  const { lang } = useLanguage();
  return (
    <Alert className="border-accent/30 bg-brand-teal-pale/40">
      <Info className="size-4 text-brand-teal-strong" />
      <AlertDescription className="text-sm text-foreground">
        {lang === "ar"
          ? "هذا نموذج تجريبي للموقع فقط — لا تُرسَل البيانات ولا تُحفَظ. تواصل عبر الواتساب لخدمةٍ فعلية."
          : "This is a prototype form only — no data is sent or stored. Contact us via WhatsApp for real service."}
      </AlertDescription>
    </Alert>
  );
}
