"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { PrototypeFormNotice } from "@/components/brand/prototype-form-notice";
import { SuccessState } from "@/components/brand/success-state";
import { useLanguage } from "@/components/layout/language-provider";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export type FormField = {
  name: string;
  label: { ar: string; en: string };
  type: "text" | "email" | "tel" | "textarea" | "select" | "checkbox";
  placeholder?: { ar: string; en: string };
  options?: readonly { value: string; label: { ar: string; en: string } }[];
  required?: boolean;
  autoComplete?: string;
};

export interface PrototypeFormProps {
  fields: FormField[];
  submitLabel: { ar: string; en: string };
  schema: z.ZodType;
  sections?: { title: { ar: string; en: string }; fields: string[] }[];
}

/**
 * PrototypeForm — centralized, reusable frontend-only form.
 * Uses react-hook-form + zod for local validation. Simulates loading, shows success state.
 * NO network request, NO data persistence.
 */
export function PrototypeForm({ fields, submitLabel, schema, sections }: PrototypeFormProps) {
  const { lang } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<Record<string, unknown>>({
    resolver: zodResolver(schema as any),
    defaultValues: fields.reduce((acc, f) => {
      acc[f.name] = f.type === "checkbox" ? false : "";
      return acc;
    }, {} as Record<string, unknown>),
  });

  const onSubmit = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setSubmitted(true);
    form.reset();
  };

  if (submitted) {
    return <SuccessState onReset={() => setSubmitted(false)} />;
  }

  const renderField = (field: FormField) => {
    const error = form.formState.errors[field.name];
    const errorMsg = error ? (lang === "ar" ? "هذا الحقل مطلوب" : "This field is required") : null;
    const errorId = `${field.name}-error`;

    return (
      <div key={field.name} className="space-y-1.5">
        {field.type !== "checkbox" && (
          <Label htmlFor={field.name} className="text-sm font-medium text-foreground">
            {field.label[lang]}
            {field.required && <span className="text-destructive ms-1">*</span>}
          </Label>
        )}
        {field.type === "text" && (
          <Input
            id={field.name}
            placeholder={field.placeholder?.[lang]}
            autoComplete={field.autoComplete}
            aria-invalid={!!error}
            aria-required={field.required || undefined}
            aria-describedby={error ? errorId : undefined}
            className="w-full"
            {...form.register(field.name)}
          />
        )}
        {field.type === "email" && (
          <Input
            id={field.name}
            type="email"
            placeholder={field.placeholder?.[lang]}
            autoComplete={field.autoComplete}
            aria-invalid={!!error}
            aria-required={field.required || undefined}
            aria-describedby={error ? errorId : undefined}
            className="w-full"
            {...form.register(field.name)}
          />
        )}
        {field.type === "tel" && (
          <Input
            id={field.name}
            type="tel"
            placeholder={field.placeholder?.[lang]}
            autoComplete={field.autoComplete}
            aria-invalid={!!error}
            aria-required={field.required || undefined}
            aria-describedby={error ? errorId : undefined}
            className="w-full"
            {...form.register(field.name)}
          />
        )}
        {field.type === "textarea" && (
          <Textarea
            id={field.name}
            placeholder={field.placeholder?.[lang]}
            rows={4}
            aria-invalid={!!error}
            aria-required={field.required || undefined}
            aria-describedby={error ? errorId : undefined}
            className="w-full"
            {...form.register(field.name)}
          />
        )}
        {field.type === "select" && field.options && (
          <Select
            onValueChange={(v) => form.setValue(field.name, v, { shouldValidate: true })}
            defaultValue={form.getValues(field.name) as string}
          >
            <SelectTrigger
              id={field.name}
              aria-invalid={!!error}
              aria-required={field.required || undefined}
              aria-describedby={error ? errorId : undefined}
              className="w-full"
            >
              <SelectValue placeholder={field.placeholder?.[lang] ?? (lang === "ar" ? "اختر" : "Select")} />
            </SelectTrigger>
            <SelectContent>
              {field.options.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label[lang]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
        {field.type === "checkbox" && (
          <div className="flex items-center gap-2 pt-1">
            <Checkbox
              id={field.name}
              onCheckedChange={(v) => form.setValue(field.name, v as boolean, { shouldValidate: true })}
              aria-invalid={!!error}
              aria-required={field.required || undefined}
              aria-describedby={error ? errorId : undefined}
            />
            <Label htmlFor={field.name} className="text-sm font-normal text-muted-foreground cursor-pointer">
              {field.label[lang]}
              {field.required && <span className="text-destructive ms-1">*</span>}
            </Label>
          </div>
        )}
        {errorMsg && (
          <p id={errorId} className="text-xs text-destructive" role="alert">
            {errorMsg}
          </p>
        )}
      </div>
    );
  };

  return (
    <Card className="p-6 sm:p-8 border-border bg-card shadow-sm">
      <PrototypeFormNotice />
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-6" noValidate>
        {sections ? (
          sections.map((section, si) => (
            <div key={si} className="space-y-4">
              <h3 className="text-sm font-bold text-brand-teal-strong border-b border-border pb-2">
                {section.title[lang]}
              </h3>
              {section.fields.map((fname) => renderField(fields.find((f) => f.name === fname)!))}
            </div>
          ))
        ) : (
          <div className="space-y-4">
            {fields.map(renderField)}
          </div>
        )}
        <Button type="submit" variant="cta" size="xl" className="w-full" disabled={loading}>
          {loading && <Loader2 className="size-4 animate-spin" />}
          {loading ? (lang === "ar" ? "جارٍ الإرسال…" : "Sending…") : submitLabel[lang]}
        </Button>
      </form>
    </Card>
  );
}
