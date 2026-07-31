"use client";

import { useEffect, useRef } from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/layout/language-provider";

/**
 * SuccessState — shared post-submit success message for all prototype forms.
 * Accessible: role="status" + aria-live="polite" + auto-focus for screen readers.
 * Clearly states no data was sent.
 */
export function SuccessState({ onReset }: { onReset: () => void }) {
  const { lang } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.focus();
  }, []);

  return (
    <div
      ref={ref}
      role="status"
      aria-live="polite"
      tabIndex={-1}
      className="flex flex-col items-center justify-center gap-4 py-12 text-center focus:outline-none"
    >
      <span className="flex size-16 items-center justify-center rounded-full bg-success/15">
        <CheckCircle2 className="size-8 text-success" />
      </span>
      <div className="space-y-1">
        <h3 className="text-xl font-bold text-primary">
          {lang === "ar" ? "تم استلام طلبك" : "Request received"}
        </h3>
        <p className="text-sm text-muted-foreground max-w-md">
          {lang === "ar"
            ? "شكراً لك! هذا نموذج تجريبي — لن تُرسَل البيانات. سنتواصل معك عبر القنوات الرسمية عند إطلاق الخدمة."
            : "Thank you! This is a prototype form — no data was sent. We will contact you through official channels when the service launches."}
        </p>
      </div>
      <Button variant="outline" size="lg" onClick={onReset}>
        {lang === "ar" ? "إرسال طلب آخر" : "Submit another request"}
      </Button>
    </div>
  );
}
