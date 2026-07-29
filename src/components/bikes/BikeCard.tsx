"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { formatPrice, type Bike } from "@/data/bikes";
import type { Locale } from "@/lib/locale";
import type { Dictionary } from "@/types/dictionary";
import { cn } from "@/lib/utils";

interface BikeCardProps {
  bike: Bike;
  dict: Dictionary;
  lang: Locale;
  index?: number;
  className?: string;
}

export function BikeCard({ bike, dict, lang, index = 0, className }: BikeCardProps) {
  const Arrow = lang === "ar" ? ArrowLeft : ArrowRight;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: Math.min(index, 5) * 0.08 }}
      className={cn("group relative", className)}
    >
      <Link
        href={`/${lang}/bikes/${bike.slug}`}
        className="block overflow-hidden rounded-2xl glass transition-colors duration-300 hover:border-primary/50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
      >
        <div className="relative aspect-4/3 overflow-hidden bg-dark">
          <Image
            src={bike.images[0]}
            alt={`${bike.brand} ${bike.model[lang]}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-t from-dark via-dark/20 to-transparent" />

          <span className="absolute top-4 start-4 rounded-full border border-white/20 bg-black/50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
            {dict.bikes.categories[bike.category]}
          </span>

          {/* Headline numbers sit on the image, aligned to the reading direction */}
          <div className="absolute bottom-4 start-4 end-4 flex items-end justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-widest text-light-muted">
                {bike.brand}
              </p>
              <h3 className="text-xl font-bold leading-tight text-white">
                {bike.model[lang]}
              </h3>
            </div>
            <div className="numeric shrink-0 text-end">
              <p className="text-2xl font-bold leading-none text-primary">
                {bike.highlights.horsepower}
              </p>
              <p className="text-[10px] uppercase tracking-widest text-light-muted">
                {dict.bikes.highlights.horsepowerUnit}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4 p-5">
          <p className="line-clamp-2 text-sm leading-relaxed text-light-muted">
            {bike.tagline[lang]}
          </p>

          <div className="flex items-end justify-between gap-3 border-t border-white/10 pt-4">
            <div>
              <p className="text-[11px] uppercase tracking-widest text-light-muted">
                {dict.bikes.startingFrom}
              </p>
              <p className="numeric text-lg font-bold text-white">
                {formatPrice(bike.price, lang)}
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-transform duration-300 group-hover:gap-2.5">
              {dict.bikes.viewDetails}
              <Arrow className="h-4 w-4" />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
