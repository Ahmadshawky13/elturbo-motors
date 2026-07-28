import { getDictionary } from "@/config/dictionaries";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
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
  const { lang } = await params;
  const dict = await getDictionary(lang as 'ar' | 'en');

  return (
    <main className="min-h-screen relative overflow-hidden bg-dark selection:bg-primary/30 selection:text-white">
      <Navbar dict={dict} lang={lang} />
      <Hero dict={dict} />
      <About dict={dict} />
      <Gallery dict={dict} />
      <WhyChooseUs dict={dict} />
      <LocationMap dict={dict} />
      <ContactFooter dict={dict} />
      <FloatingButtons />
    </main>
  );
}
