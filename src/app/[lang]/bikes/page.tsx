import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getDictionary } from "@/config/dictionaries";
import { isLocale, locales, type Locale } from "@/lib/locale";
import { Navbar } from "@/components/Navbar";
import { ContactFooter } from "@/components/ContactFooter";
import { FloatingButtons } from "@/components/FloatingButtons";
import { BikeCatalog } from "@/components/bikes/BikeCatalog";

type Params = Promise<{ lang: string }>;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = await getDictionary(lang);

  return {
    title: `${dict.bikes.title} | El Turbo`,
    description: dict.bikes.subtitle,
  };
}

export default async function BikesPage({ params }: { params: Params }) {
  const { lang: rawLang } = await params;
  if (!isLocale(rawLang)) notFound();

  const lang: Locale = rawLang;
  const dict = await getDictionary(lang);

  return (
    <main className="min-h-screen bg-dark selection:bg-primary/30 selection:text-white">
      <Navbar dict={dict} lang={lang} />

      <section className="relative overflow-hidden border-b border-white/5 pt-36 pb-16 md:pt-44 md:pb-20">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-50" />
        <div className="pointer-events-none absolute -top-32 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-primary/20 opacity-30 blur-[160px]" />

        <div className="container relative z-10 mx-auto px-4 text-center md:px-6">
          <span className="inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-semibold tracking-wider text-primary">
            {dict.bikes.eyebrow}
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-white md:text-6xl">
            {dict.bikes.title}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-light-muted">
            {dict.bikes.subtitle}
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-14 md:px-6 md:py-20">
        <BikeCatalog dict={dict} lang={lang} />
      </section>

      <ContactFooter dict={dict} lang={lang} />
      <FloatingButtons dict={dict} />
    </main>
  );
}
