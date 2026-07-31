"use client";

import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/layout/language-provider";

/**
 * SuccessState — shared post-submit success message for all prototype forms.
 * Shows a success message + reset button. No data sent.
 */
export function SuccessState({ onReset }: { onReset: () => void }) {
  const { lang } = useLanguage();
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
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
