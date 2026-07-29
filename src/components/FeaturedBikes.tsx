"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { getFeaturedBikes } from "@/data/bikes";
import type { Locale } from "@/lib/locale";
import type { Dictionary } from "@/types/dictionary";
import { BikeCard } from "./bikes/BikeCard";

export function FeaturedBikes({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const featured = getFeaturedBikes();
  const Arrow = lang === "ar" ? ArrowLeft : ArrowRight;

  return (
    <section
      id="bikes"
      className="relative overflow-hidden border-t border-white/5 bg-dark py-24"
    >
      <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end"
        >
          <div>
            <span className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
              {dict.bikes.eyebrow}
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-5xl">
              {dict.bikes.title}
            </h2>
            <p className="mt-4 max-w-xl text-lg text-light-muted">
              {dict.bikes.subtitle}
            </p>
          </div>

          <Link
            href={`/${lang}/bikes`}
            className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-white/15 px-6 py-3 font-semibold text-white transition-colors duration-300 hover:border-primary hover:text-primary"
          >
            {dict.bikes.viewAll}
            <Arrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((bike, idx) => (
            <BikeCard
              key={bike.slug}
              bike={bike}
              dict={dict}
              lang={lang}
              index={idx}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
