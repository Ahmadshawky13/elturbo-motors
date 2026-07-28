import type { Metadata } from "next";
import { Inter, Cairo } from "next/font/google";
import "../globals.css";
import { ReactNode } from "react";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic"],
});

export const metadata: Metadata = {
  title: "El Turbo Showroom",
  description: "Your premier destination for the latest motorcycles and scooters",
};

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "ar" }];
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  const isRtl = lang === "ar";
  
  return (
    <html
      lang={lang}
      dir={isRtl ? "rtl" : "ltr"}
      className={`${inter.variable} ${cairo.variable} h-full antialiased`}
    >
      <body className={`min-h-full flex flex-col font-sans bg-dark text-light no-scrollbar ${isRtl ? 'font-arabic' : 'font-sans'}`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
