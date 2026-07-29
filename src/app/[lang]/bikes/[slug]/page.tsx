import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, MessageCircle, Phone } from "lucide-react";

import { getDictionary } from "@/config/dictionaries";
import { telHref, whatsappHref } from "@/config/site";
import { bikes, formatPrice, getBike, getRelatedBikes } from "@/data/bikes";
import { isLocale, locales, type Locale } from "@/lib/locale";
import { Navbar } from "@/components/Navbar";
import { ContactFooter } from "@/components/ContactFooter";
import { FloatingButtons } from "@/components/FloatingButtons";
import { BikeGallery } from "@/components/bikes/BikeGallery";
import { BikeCard } from "@/components/bikes/BikeCard";
import { SpecSheet } from "@/components/bikes/SpecSheet";
import { StatStrip } from "@/components/bikes/StatStrip";
import { InstallmentCalculator } from "@/components/bikes/InstallmentCalculator";
import { Reveal } from "@/components/ui/Reveal";

type Params = Promise<{ lang: string; slug: string }>;

export function generateStaticParams() {
  return locales.flatMap((lang) =>
    bikes.map((bike) => ({ lang, slug: bike.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const bike = getBike(slug);
  if (!bike || !isLocale(lang)) return {};

  const title = `${bike.brand} ${bike.model[lang]} | El Turbo`;
  return {
    title,
    description: bike.tagline[lang],
    openGraph: {
      title,
      description: bike.description[lang],
      images: [bike.images[0]],
    },
  };
}

export default async function BikeDetailPage({ params }: { params: Params }) {
  const { lang: rawLang, slug } = await params;
  if (!isLocale(rawLang)) notFound();

  const lang: Locale = rawLang;
  const bike = getBike(slug);
  if (!bike) notFound();

  const dict = await getDictionary(lang);
  const related = getRelatedBikes(bike);
  const fullName = `${bike.brand} ${bike.model[lang]}`;
  const enquiryMessage = dict.bikes.cta.message.replace("{bike}", fullName);

  const stats = [
    {
      value: bike.highlights.displacement,
      unit: dict.bikes.highlights.displacementUnit,
      label: dict.bikes.highlights.displacement,
    },
    {
      value: bike.highlights.horsepower,
      unit: dict.bikes.highlights.horsepowerUnit,
      label: dict.bikes.highlights.horsepower,
    },
    {
      value: bike.highlights.zeroToHundred,
      unit: dict.bikes.highlights.zeroToHundredUnit,
      label: dict.bikes.highlights.zeroToHundred,
    },
  ];

  return (
    <main className="min-h-screen bg-dark selection:bg-primary/30 selection:text-white">
      <Navbar dict={dict} lang={lang} />

      {/* ── Cinematic header ─────────────────────────────────────────── */}
      <section className="relative flex min-h-[70vh] items-end overflow-hidden pt-28 pb-12">
        <Image
          src={bike.images[0]}
          alt={fullName}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-dark via-dark/80 to-dark/40" />
        <div className="absolute inset-0 bg-linear-to-r from-dark/80 via-transparent to-transparent" />

        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <Link
            href={`/${lang}/bikes`}
            className="inline-flex items-center gap-2 text-sm font-medium text-light-muted transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
            {dict.bikes.backToBikes}
          </Link>

          <div className="mt-6 max-w-3xl space-y-5">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
                {dict.bikes.categories[bike.category]}
              </span>
              <span className="numeric rounded-full border border-white/15 px-3 py-1 text-xs font-semibold text-light-muted">
                {dict.bikes.modelYear} {bike.year}
              </span>
            </div>

            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-light-muted">
                {bike.brand}
              </p>
              <h1 className="mt-2 text-4xl font-bold leading-tight tracking-tight text-white md:text-6xl lg:text-7xl">
                {bike.model[lang]}
              </h1>
            </div>

            <p className="text-xl text-light-muted md:text-2xl">
              {bike.tagline[lang]}
            </p>

            <div className="flex flex-wrap items-end gap-x-8 gap-y-4 pt-2">
              <div>
                <p className="text-xs uppercase tracking-widest text-light-muted">
                  {dict.bikes.startingFrom}
                </p>
                <p className="numeric text-3xl font-bold text-white md:text-4xl">
                  {formatPrice(bike.price, lang)}
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href={whatsappHref(enquiryMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-primary px-6 font-semibold text-white shadow-lg shadow-primary/25 transition-all duration-300 hover:bg-primary-dark active:scale-95"
                >
                  <MessageCircle className="h-5 w-5" />
                  {dict.bikes.cta.enquire}
                </a>
                <a
                  href={telHref}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-white/20 px-6 font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/10 active:scale-95"
                >
                  <Phone className="h-5 w-5" />
                  {dict.bikes.cta.call}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Headline numbers ─────────────────────────────────────────── */}
      <section className="container mx-auto -mt-8 px-4 md:px-6">
        <StatStrip stats={stats} />
      </section>

      {/* ── Gallery + overview ───────────────────────────────────────── */}
      <section className="container mx-auto px-4 py-16 md:px-6 md:py-24">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
          <Reveal>
            <BikeGallery
              images={bike.images}
              alt={fullName}
              labels={{
                expand: dict.bikes.viewImage,
                close: dict.bikes.close,
                previous: dict.bikes.previous,
                next: dict.bikes.next,
              }}
            />
          </Reveal>

          <div className="space-y-8">
            <Reveal delay={0.1}>
              <h2 className="text-2xl font-bold text-white md:text-3xl">
                {dict.bikes.overviewTitle}
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-light-muted">
                {bike.description[lang]}
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <h3 className="text-sm font-semibold uppercase tracking-widest text-light-muted">
                {dict.bikes.colorsTitle}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-3">
                {bike.colors.map((color) => (
                  <li
                    key={color.hex}
                    className="flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 py-1.5 pe-4 ps-1.5"
                  >
                    <span
                      className="h-7 w-7 rounded-full border border-white/20"
                      style={{ backgroundColor: color.hex }}
                      aria-hidden="true"
                    />
                    <span className="text-sm text-white">{color.name[lang]}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.2}>
              <InstallmentCalculator price={bike.price} dict={dict} lang={lang} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Specifications ───────────────────────────────────────────── */}
      <section className="relative border-y border-white/5 bg-dark-card py-16 md:py-24">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-60" />
        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <Reveal className="mb-10 max-w-2xl">
            <h2 className="text-3xl font-bold text-white md:text-4xl">
              {dict.bikes.specsTitle}
            </h2>
            <p className="mt-3 text-light-muted">{dict.bikes.specsSubtitle}</p>
            <div className="mt-6 h-1 w-20 rounded-full bg-primary" />
          </Reveal>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-14">
            <SpecSheet bike={bike} dict={dict} lang={lang} />

            <Reveal delay={0.1}>
              <h3 className="text-xl font-bold text-white">
                {dict.bikes.featuresTitle}
              </h3>
              <ul className="mt-6 space-y-3">
                {bike.features[lang].map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                      <Check className="h-3 w-3" />
                    </span>
                    <span className="text-light-muted">{feature}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Related bikes ────────────────────────────────────────────── */}
      {related.length > 0 && (
        <section className="container mx-auto px-4 py-16 md:px-6 md:py-24">
          <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-3xl font-bold text-white md:text-4xl">
              {dict.bikes.relatedTitle}
            </h2>
            <Link
              href={`/${lang}/bikes`}
              className="text-sm font-semibold text-primary hover:text-white"
            >
              {dict.bikes.viewAll}
            </Link>
          </Reveal>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item, idx) => (
              <BikeCard
                key={item.slug}
                bike={item}
                dict={dict}
                lang={lang}
                index={idx}
              />
            ))}
          </div>
        </section>
      )}

      <ContactFooter dict={dict} lang={lang} />
      <FloatingButtons dict={dict} message={enquiryMessage} />
    </main>
  );
}
