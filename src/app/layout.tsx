import type { Metadata } from "next";
import { Tajawal } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { LanguageProvider } from "@/components/layout/language-provider";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "برنامج الحساب الذهني | Mental Arithmetic Program",
    template: "%s | برنامج الحساب الذهني",
  },
  description:
    "برنامج الحساب الذهني (السوروبان) — منهج تعليمي حديث ينمّي مهارات الحساب الذهني لدى الأطفال من 7 إلى 12 عاماً. احجز حصة تجريبية مجانية.",
  keywords: [
    "الحساب الذهني",
    "السوروبان",
    "برنامج الحساب الذهني",
    "تعليم الأطفال",
    "اليمن",
    "Mental Arithmetic",
    "Soroban",
  ],
  authors: [{ name: "برنامج الحساب الذهني" }],
  icons: {
    icon: "/brand/favicon.svg",
  },
  openGraph: {
    title: "برنامج الحساب الذهني | Mental Arithmetic Program",
    description:
      "منهج تعليمي حديث يعتمد على السوروبان لتنمية مهارات الحساب الذهني لدى الأطفال.",
    type: "website",
    locale: "ar_YE",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body
        className={`${tajawal.variable} font-sans antialiased bg-background text-foreground min-h-screen flex flex-col`}
      >
        <LanguageProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:start-3 focus:z-toast focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:shadow-lg"
          >
            تخطَّ إلى المحتوى
          </a>
          <SiteHeader />
          <main id="main" className="flex-1">{children}</main>
          <SiteFooter />
          <Toaster />
        </LanguageProvider>
      </body>
    </html>
  );
}
