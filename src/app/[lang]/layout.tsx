import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "../globals.css";
import { ReactNode } from "react";
import { notFound } from "next/navigation";
import { isLocale, locales } from "@/lib/locale";
import { getDictionary } from "@/config/dictionaries";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  display: "swap",
});

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = await getDictionary(lang);

  return {
    title: {
      default: dict.hero.title,
      template: `%s | ${dict.hero.title}`,
    },
    description: dict.hero.description,
    alternates: {
      languages: {
        ar: "/ar",
        en: "/en",
      },
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const isRtl = lang === "ar";

  return (
    <html
      lang={lang}
      dir={isRtl ? "rtl" : "ltr"}
      className={`${cairo.variable} h-full antialiased`}
    >
      <body
        className="min-h-full flex flex-col font-sans bg-dark text-light no-scrollbar"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
