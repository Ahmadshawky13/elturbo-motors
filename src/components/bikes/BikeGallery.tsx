"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface BikeGalleryProps {
  images: string[];
  alt: string;
  /** Localised labels for the gallery controls. */
  labels: {
    expand: string;
    close: string;
    previous: string;
    next: string;
  };
}

export function BikeGallery({ images, alt, labels }: BikeGalleryProps) {
  const [active, setActive] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const go = useCallback(
    (delta: number) => {
      setActive((current) => (current + delta + images.length) % images.length);
    },
    [images.length]
  );

  // Arrow keys move through the gallery while the lightbox is open; Escape closes it.
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
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
  }, [isOpen, go]);

  return (
    <div className="space-y-3">
      <div className="group relative aspect-4/3 w-full overflow-hidden rounded-2xl glass">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0"
          >
            <Image
              src={images[active]}
              alt={alt}
              fill
              priority={active === 0}
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>

        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-dark/70 via-transparent to-transparent" />

        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label={labels.expand}
          className="absolute top-4 end-4 flex h-10 w-10 items-center justify-center rounded-full glass-button text-white"
        >
          <Expand className="h-4 w-4" />
        </button>

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label={labels.previous}
              className="absolute top-1/2 start-4 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full glass-button text-white opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
            >
              <ChevronLeft className="h-5 w-5 rtl:rotate-180" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label={labels.next}
              className="absolute top-1/2 end-4 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full glass-button text-white opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
            >
              <ChevronRight className="h-5 w-5 rtl:rotate-180" />
            </button>
          </>
        )}

        <div className="numeric absolute bottom-4 start-4 rounded-full bg-black/50 px-3 py-1 text-xs text-white backdrop-blur-sm">
          {active + 1} / {images.length}
        </div>
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {images.map((src, idx) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(idx)}
              aria-label={`${alt} ${idx + 1}`}
              aria-current={idx === active}
              className={cn(
                "relative aspect-square overflow-hidden rounded-xl border transition-all duration-300",
                idx === active
                  ? "border-primary opacity-100"
                  : "border-white/10 opacity-60 hover:opacity-100"
              )}
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="120px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label={alt}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          >
            <button
              type="button"
              aria-label={labels.close}
              onClick={() => setIsOpen(false)}
              className="absolute top-6 end-6 text-white transition-colors hover:text-primary"
            >
              <X className="h-8 w-8" />
            </button>

            <motion.div
              initial={{ scale: 0.94 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.94 }}
              className="relative h-[80vh] w-full max-w-5xl"
              onClick={(event) => event.stopPropagation()}
            >
              <Image
                src={images[active]}
                alt={alt}
                fill
                sizes="100vw"
                className="rounded-xl object-contain"
              />
            </motion.div>

            {images.length > 1 && (
              <div
                className="absolute bottom-8 flex items-center gap-4"
                onClick={(event) => event.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label={labels.previous}
                  className="flex h-11 w-11 items-center justify-center rounded-full glass-button text-white"
                >
                  <ChevronLeft className="h-5 w-5 rtl:rotate-180" />
                </button>
                <span className="numeric text-sm text-light-muted">
                  {active + 1} / {images.length}
                </span>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label={labels.next}
                  className="flex h-11 w-11 items-center justify-center rounded-full glass-button text-white"
                >
                  <ChevronRight className="h-5 w-5 rtl:rotate-180" />
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
