"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { SectionHeading } from "./ui/SectionHeading";
import { showroomGallery } from "@/data/bikes";
import type { Locale } from "@/lib/locale";
import type { Dictionary } from "@/types/dictionary";
import { cn } from "@/lib/utils";

const SPAN_CLASSES: Record<string, string> = {
  big: "sm:col-span-2 sm:row-span-2",
  wide: "sm:col-span-2",
  tall: "sm:row-span-2",
};

export function Gallery({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const go = useCallback((delta: number) => {
    setOpenIndex((current) => {
      if (current === null) return current;
      return (current + delta + showroomGallery.length) % showroomGallery.length;
    });
  }, []);

  useEffect(() => {
    if (openIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenIndex(null);
      if (event.key === "ArrowRight") go(1);
      if (event.key === "ArrowLeft") go(-1);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [openIndex, go]);

  const active = openIndex === null ? null : showroomGallery[openIndex];

  return (
    <section id="gallery" className="py-24 bg-dark-card border-t border-white/5">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading title={dict.nav.gallery} subtitle={dict.bikes.subtitle} />

        <div className="grid auto-rows-[190px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[210px]">
          {showroomGallery.map((photo, idx) => (
            <motion.button
              key={photo.src}
              type="button"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: Math.min(idx, 8) * 0.06 }}
              onClick={() => setOpenIndex(idx)}
              aria-label={photo.alt[lang]}
              className={cn(
                "group relative overflow-hidden rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary",
                photo.span ? SPAN_CLASSES[photo.span] : ""
              )}
            >
              <Image
                src={photo.src}
                alt={photo.alt[lang]}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-dark/50 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                <span className="inline-flex items-center gap-2 rounded-full bg-primary/85 px-4 py-2 text-sm text-white">
                  <Expand className="h-4 w-4" />
                  {dict.bikes.viewImage}
                </span>
              </div>
            </motion.button>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href={`/${lang}/bikes`}
            className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-8 font-semibold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:bg-primary-dark active:scale-95"
          >
            {dict.bikes.viewAll}
          </Link>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label={active.alt[lang]}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm"
            onClick={() => setOpenIndex(null)}
          >
            <button
              type="button"
              aria-label={dict.bikes.close}
              className="absolute top-6 end-6 text-white transition-colors hover:text-primary"
              onClick={() => setOpenIndex(null)}
            >
              <X className="h-8 w-8" />
            </button>

            <motion.div
              initial={{ scale: 0.94 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.94 }}
              className="relative h-[78vh] w-full max-w-5xl"
              onClick={(event) => event.stopPropagation()}
            >
              <Image
                src={active.src}
                alt={active.alt[lang]}
                fill
                sizes="100vw"
                className="rounded-lg object-contain"
              />
            </motion.div>

            <div
              className="absolute bottom-8 flex items-center gap-4"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label={dict.bikes.previous}
                className="flex h-11 w-11 items-center justify-center rounded-full glass-button text-white"
              >
                <ChevronLeft className="h-5 w-5 rtl:rotate-180" />
              </button>
              <span className="numeric text-sm text-light-muted">
                {(openIndex ?? 0) + 1} / {showroomGallery.length}
              </span>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label={dict.bikes.next}
                className="flex h-11 w-11 items-center justify-center rounded-full glass-button text-white"
              >
                <ChevronRight className="h-5 w-5 rtl:rotate-180" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
