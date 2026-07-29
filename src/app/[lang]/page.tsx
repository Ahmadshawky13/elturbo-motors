import { notFound } from "next/navigation";
import { getDictionary } from "@/config/dictionaries";
import { isLocale, type Locale } from "@/lib/locale";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { FeaturedBikes } from "@/components/FeaturedBikes";
import { Gallery } from "@/components/Gallery";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { LocationMap } from "@/components/LocationMap";
import { ContactFooter } from "@/components/ContactFooter";
import { FloatingButtons } from "@/components/FloatingButtons";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  if (!isLocale(rawLang)) notFound();

  const lang: Locale = rawLang;
  const dict = await getDictionary(lang);

  return (
    <main className="min-h-screen relative overflow-hidden bg-dark selection:bg-primary/30 selection:text-white">
      <Navbar dict={dict} lang={lang} />
      <Hero dict={dict} />
      <About dict={dict} />
      <FeaturedBikes dict={dict} lang={lang} />
      <Gallery dict={dict} lang={lang} />
      <WhyChooseUs dict={dict} />
      <LocationMap dict={dict} />
      <ContactFooter dict={dict} lang={lang} />
      <FloatingButtons dict={dict} />
    </main>
  );
}
