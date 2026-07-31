"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { AnimatedReveal } from "@/components/motion/animated-reveal";
import { AnimatedStagger, AnimatedStaggerItem } from "@/components/motion/animated-stagger";
import { AnimatedCounter } from "@/components/motion/animated-counter";
import { SectionShell } from "@/components/layout/section-shell";
import { PageContainer } from "@/components/layout/page-container";
import { SectionHeading } from "@/components/brand/section-heading";
import { faq } from "@/content/faq";
import { useLanguage } from "@/components/layout/language-provider";
import {
  CheckCircle2, Info, AlertTriangle, Sparkles, BookOpen, Calculator, Award, Users,
} from "lucide-react";

const brandColors = [
  { name: "Orange (CTA)", token: "bg-brand-orange", hex: "#F2A23C", text: "text-brand-navy-dark" },
  { name: "Navy Dark", token: "bg-brand-navy-dark", hex: "#06335C", text: "text-white" },
  { name: "Blue", token: "bg-brand-blue", hex: "#2C8FC0", text: "text-white" },
  { name: "Teal", token: "bg-brand-teal", hex: "#37B0C3", text: "text-white" },
  { name: "Navy", token: "bg-brand-navy", hex: "#0A4C82", text: "text-white" },
  { name: "Grey Light", token: "bg-brand-grey-light", hex: "#D2DCE2", text: "text-brand-ink" },
  { name: "Grey Text", token: "bg-brand-grey-text", hex: "#56636E", text: "text-white" },
  { name: "Ink", token: "bg-brand-ink", hex: "#2A3A47", text: "text-white" },
  { name: "BG", token: "bg-brand-bg", hex: "#F4F9FA", text: "text-brand-ink" },
  { name: "Teal Pale", token: "bg-brand-teal-pale", hex: "#E1F0F3", text: "text-brand-ink" },
];

const semanticColors = [
  { name: "primary", token: "bg-primary", fg: "text-primary-foreground" },
  { name: "cta", token: "bg-cta", fg: "text-cta-foreground" },
  { name: "secondary", token: "bg-secondary", fg: "text-secondary-foreground" },
  { name: "accent", token: "bg-accent", fg: "text-accent-foreground" },
  { name: "muted", token: "bg-muted", fg: "text-muted-foreground" },
  { name: "destructive", token: "bg-destructive", fg: "text-white" },
  { name: "success", token: "bg-success", fg: "text-white" },
  { name: "border", token: "bg-border", fg: "text-brand-ink" },
];

const spacing = [4, 8, 12, 16, 24, 32, 48, 64, 80, 96];
const radii = [
  { name: "sm", c: "rounded-sm" },
  { name: "md", c: "rounded-md" },
  { name: "lg", c: "rounded-lg" },
  { name: "xl", c: "rounded-xl" },
  { name: "2xl", c: "rounded-2xl" },
  { name: "pill", c: "rounded-pill" },
];
const shadows = [
  { name: "xs", c: "shadow-xs" },
  { name: "sm", c: "shadow-sm" },
  { name: "md", c: "shadow-md" },
  { name: "lg", c: "shadow-lg" },
];
const typeScale = [
  { cls: "text-6xl", label: "6xl / 60px", sample: "عقلٌ أسرع" },
  { cls: "text-4xl", label: "4xl / 36px", sample: "كيف يعمل البرنامج" },
  { cls: "text-2xl", label: "2xl / 24px", sample: "قنوات التعلّم الثلاث" },
  { cls: "text-lg", label: "lg / 18px", sample: "منهجٌ تعليميٌّ حديث" },
  { cls: "text-base", label: "base / 16px", sample: "نصٌّ أساسيٌّ مقروء بوضوح" },
  { cls: "text-sm", label: "sm / 14px", sample: "تسميةٌ ثانوية" },
  { cls: "text-xs", label: "xs / 12px", sample: "تسميةٌ صغيرة" },
];

function Block({ title, desc, children, id }: { title: string; desc?: string; children: React.ReactNode; id?: string }) {
  return (
    <section id={id} className="space-y-4">
      <div>
        <h3 className="text-xl font-bold text-primary">{title}</h3>
        {desc && <p className="text-sm text-muted-foreground">{desc}</p>}
      </div>
      <Card className="p-6">{children}</Card>
    </section>
  );
}

export function DesignSystemShowcase() {
  const { lang } = useLanguage();

  return (
    <SectionShell tone="default" as="div" spacing="relaxed">
      <PageContainer className="space-y-12">
        {/* Header */}
        <div className="space-y-2">
          <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
            {lang === "ar" ? "داخلي · مرجع" : "Internal · Reference"}
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-primary">
            {lang === "ar" ? "نظام التصميم" : "Design System"}
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            {lang === "ar"
              ? "هذه الصفحة عقدُ التنفيذ للصفحات المستقبلية. كل عنصرٍ هنا يُعاد استخدامه في الصفحات القادمة."
              : "This page is the implementation contract for future pages. Every element here is reused in upcoming pages."}
          </p>
        </div>

        {/* Brand palette */}
        <Block title={lang === "ar" ? "الألوان الأساسية" : "Brand palette"} desc="Raw brand tokens (src/styles/tokens.css)">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {brandColors.map((c) => (
              <div key={c.token} className={`rounded-lg ${c.token} ${c.text} p-4 flex flex-col gap-1 aspect-square justify-end`}>
                <span className="text-xs font-bold">{c.name}</span>
                <span className="text-[10px] opacity-80 font-mono">{c.hex}</span>
              </div>
            ))}
          </div>
        </Block>

        {/* Semantic palette */}
        <Block title={lang === "ar" ? "الألوان الدلالية" : "Semantic palette"} desc="bg-primary · bg-cta · bg-accent · …">
          <div className="flex flex-wrap gap-3">
            {semanticColors.map((c) => (
              <div key={c.name} className={`rounded-lg ${c.token} ${c.fg} px-4 py-3 min-w-28 text-center`}>
                <div className="text-sm font-bold">{c.name}</div>
              </div>
            ))}
          </div>
        </Block>

        {/* Typography */}
        <Block title={lang === "ar" ? "الطباعة" : "Typography"} desc="Tajawal · Arabic-first">
          <div className="space-y-3">
            {typeScale.map((t) => (
              <div key={t.cls} className="flex items-baseline gap-4 flex-wrap">
                <span className={`font-extrabold text-primary ${t.cls}`}>{t.sample}</span>
                <span className="text-xs text-muted-foreground font-mono">{t.label}</span>
              </div>
            ))}
            <Separator />
            <p className="text-base text-foreground leading-relaxed">
              {lang === "ar"
                ? "هذا نصٌّ أساسيٌّ يوضّح ارتفاع السطر 1.7 ووضوح الخط العربي على الأحجام الصغيرة. الأرقام: 0123456789."
                : "Body copy demonstrating 1.7 line-height and Arabic clarity at small sizes. Digits: 0123456789."}
            </p>
          </div>
        </Block>

        {/* Spacing / radius / shadows */}
        <Block title={lang === "ar" ? "المسافات والانحناءات والظلال" : "Spacing · Radius · Shadow"}>
          <div className="space-y-6">
            <div className="flex flex-wrap items-end gap-2">
              {spacing.map((s) => (
                <div key={s} className="flex flex-col items-center gap-1">
                  <div className="bg-accent rounded-sm" style={{ width: s, height: s }} />
                  <span className="text-[10px] text-muted-foreground">{s}</span>
                </div>
              ))}
            </div>
            <Separator />
            <div className="flex flex-wrap items-center gap-4">
              {radii.map((r) => (
                <div key={r.name} className="flex flex-col items-center gap-1">
                  <div className={`size-14 bg-primary ${r.c}`} />
                  <span className="text-[10px] text-muted-foreground">{r.name}</span>
                </div>
              ))}
            </div>
            <Separator />
            <div className="flex flex-wrap items-center gap-4">
              {shadows.map((s) => (
                <div key={s.name} className="flex flex-col items-center gap-1">
                  <div className={`size-14 rounded-lg bg-card ${s.c}`} />
                  <span className="text-[10px] text-muted-foreground">{s.name}</span>
                </div>
              ))}
            </div>
          </div>
        </Block>

        {/* Buttons */}
        <Block title={lang === "ar" ? "الأزرار" : "Buttons"} desc="variants · sizes · states">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-3">
              <Button variant="default">تأكيد</Button>
              <Button variant="cta">احجز تجربة</Button>
              <Button variant="secondary">إلغاء</Button>
              <Button variant="outline">اعرف المزيد</Button>
              <Button variant="ghost">تخطّي</Button>
              <Button variant="link">رابط</Button>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button size="sm">صغير</Button>
              <Button size="default">افتراضي</Button>
              <Button size="lg">كبير</Button>
              <Button size="xl" variant="cta">حصة تجريبية</Button>
              <Button disabled>معطّل</Button>
            </div>
          </div>
        </Block>

        {/* Badges */}
        <Block title={lang === "ar" ? "الوسوم" : "Badges"}>
          <div className="flex flex-wrap gap-2">
            <Badge>افتراضي</Badge>
            <Badge variant="secondary">ثانوي</Badge>
            <Badge className="bg-brand-navy text-white">مؤجل</Badge>
            <Badge className="bg-brand-blue text-white">أرشيف</Badge>
            <Badge className="bg-cta text-cta-foreground">مسودة</Badge>
            <Badge className="bg-accent text-accent-foreground">المستوى 3</Badge>
          </div>
        </Block>

        {/* Cards */}
        <Block title={lang === "ar" ? "البطاقات" : "Cards"}>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { icon: BookOpen, title: "منهج", desc: "عشرة مستويات متدرّجة." },
              { icon: Calculator, title: "سوروبان", desc: "أداة الحساب الذهني." },
              { icon: Award, title: "نتائج", desc: "مهاراتٌ وثقةٌ وإتقان." },
            ].map((c, i) => (
              <Card key={i} className="p-6 space-y-3 hover:shadow-md transition-shadow">
                <c.icon className="size-8 text-accent" />
                <h4 className="font-bold text-primary">{c.title}</h4>
                <p className="text-sm text-muted-foreground">{c.desc}</p>
              </Card>
            ))}
          </div>
        </Block>

        {/* Form fields */}
        <Block title={lang === "ar" ? "حقول النماذج" : "Form fields"}>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="ds-name">{lang === "ar" ? "اسم الطفل" : "Child name"}</Label>
              <Input id="ds-name" placeholder={lang === "ar" ? "اكتب الاسم" : "Enter name"} />
            </div>
            <div className="space-y-2">
              <Label>{lang === "ar" ? "المستوى" : "Level"}</Label>
              <Select>
                <SelectTrigger><SelectValue placeholder={lang === "ar" ? "اختر المستوى" : "Select level"} /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">المستوى 1</SelectItem>
                  <SelectItem value="2">المستوى 2</SelectItem>
                  <SelectItem value="3">المستوى 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="ds-msg">{lang === "ar" ? "ملاحظات" : "Notes"}</Label>
              <Textarea id="ds-msg" placeholder={lang === "ar" ? "اكتب هنا…" : "Type here…"} />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="ds-consent" defaultChecked />
              <Label htmlFor="ds-consent" className="text-sm font-normal">{lang === "ar" ? "أوافق على الشروط" : "I agree"}</Label>
            </div>
            <div className="flex items-center gap-4">
              <RadioGroup defaultValue="a" className="flex gap-4">
                <div className="flex items-center gap-2"><RadioGroupItem id="ds-a" value="a" /><Label htmlFor="ds-a" className="text-sm font-normal">حضوري</Label></div>
                <div className="flex items-center gap-2"><RadioGroupItem id="ds-b" value="b" /><Label htmlFor="ds-b" className="text-sm font-normal">أونلاين</Label></div>
              </RadioGroup>
            </div>
          </div>
        </Block>

        {/* Accordion + Tabs */}
        <Block title={lang === "ar" ? "أكورديون وتبويبات" : "Accordion & Tabs"}>
          <div className="space-y-6">
            <Accordion type="single" collapsible>
              {faq.map((f, i) => (
                <AccordionItem key={i} value={`i-${i}`}>
                  <AccordionTrigger>{f.question[lang]}</AccordionTrigger>
                  <AccordionContent>{f.answer[lang]}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <Tabs defaultValue="tab1">
              <TabsList>
                <TabsTrigger value="tab1">{lang === "ar" ? "نظرة عامة" : "Overview"}</TabsTrigger>
                <TabsTrigger value="tab2">{lang === "ar" ? "التفاصيل" : "Details"}</TabsTrigger>
              </TabsList>
              <TabsContent value="tab1" className="text-sm text-muted-foreground p-4">
                {lang === "ar" ? "محتوى التبويب الأول." : "First tab content."}
              </TabsContent>
              <TabsContent value="tab2" className="text-sm text-muted-foreground p-4">
                {lang === "ar" ? "محتوى التبويب الثاني." : "Second tab content."}
              </TabsContent>
            </Tabs>
          </div>
        </Block>

        {/* Icons + Avatar + Progress + Tooltip */}
        <Block title={lang === "ar" ? "أيقونات وصور رمزية وتقدّم" : "Icons · Avatar · Progress"}>
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-4 text-accent">
              <BookOpen className="size-5" /><Calculator className="size-6" /><Award className="size-7" /><Users className="size-8" /><Sparkles className="size-10" />
            </div>
            <Separator />
            <div className="flex items-center gap-4">
              <Avatar><AvatarFallback className="bg-secondary text-primary font-bold">ع</AvatarFallback></Avatar>
              <Avatar><AvatarFallback className="bg-accent text-accent-foreground font-bold">م</AvatarFallback></Avatar>
            </div>
            <div className="space-y-1">
              <Label className="text-sm">مستوى التقدّم</Label>
              <Progress value={70} className="bg-secondary [&>div]:bg-accent" />
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild><Button variant="outline" size="sm">مرّر للمعلومة</Button></TooltipTrigger>
                <TooltipContent>تلميحٌ توضيحي</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </Block>

        {/* Stats */}
        <Block title={lang === "ar" ? "إحصاءات" : "Statistics"} desc="AnimatedCounter (count-up on viewport)">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {[
              { v: 95, s: "%" }, { v: 780, p: "+" }, { v: 10 }, { v: 3 },
            ].map((s, i) => (
              <div key={i} className="space-y-1">
                <div className="text-4xl font-extrabold text-primary tabular-nums">
                  <AnimatedCounter to={s.v} prefix={s.p} suffix={s.s} />
                </div>
                <div className="text-xs text-muted-foreground">{["رضا", "طالب", "مستويات", "فروع"][i]}</div>
              </div>
            ))}
          </div>
        </Block>

        {/* Motion presets */}
        <Block title={lang === "ar" ? "حركة Framer Motion" : "Framer Motion presets"} desc="reveal · stagger · hover · reduced-motion fallback">
          <div className="space-y-6">
            <AnimatedReveal variant="fadeUp">
              <Card className="p-6">
                <div className="flex items-center gap-3">
                  <Info className="size-6 text-accent" />
                  <p className="text-sm">عنصرٌ يظهر عند الدخول إلى المجال (fadeUp).</p>
                </div>
              </Card>
            </AnimatedReveal>
            <AnimatedStagger className="grid sm:grid-cols-3 gap-4">
              {["الأول", "الثاني", "الثالث"].map((t, i) => (
                <AnimatedStaggerItem key={i}>
                  <Card className="p-6 text-center font-bold text-primary">{t}</Card>
                </AnimatedStaggerItem>
              ))}
            </AnimatedStagger>
            <p className="text-xs text-muted-foreground flex items-center gap-2">
              <CheckCircle2 className="size-4 text-success" />
              {lang === "ar" ? "تفضّل تقليل الحركة: يظهر كل شيء فوراً في حالته النهائية." : "Reduced-motion: everything appears instantly in final state."}
            </p>
          </div>
        </Block>

        {/* States */}
        <Block title={lang === "ar" ? "حالات" : "States"}>
          <div className="flex flex-wrap gap-3 text-sm">
            <span className="inline-flex items-center gap-1.5 text-success"><CheckCircle2 className="size-4" /> نجاح</span>
            <span className="inline-flex items-center gap-1.5 text-warning"><AlertTriangle className="size-4" /> تحذير</span>
            <span className="inline-flex items-center gap-1.5 text-destructive"><AlertTriangle className="size-4" /> خطأ</span>
            <span className="inline-flex items-center gap-1.5 text-accent"><Info className="size-4" /> معلومة</span>
          </div>
        </Block>

        <Separator />
        <p className="text-xs text-muted-foreground text-center">
          {lang === "ar" ? "هذه الصفحة غير مُدرجة في التنقّل العام." : "This page is not included in public navigation."}
        </p>
      </PageContainer>
    </SectionShell>
  );
}
