"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SectionHeading } from "./ui/SectionHeading";
import type { Dictionary } from "@/types/dictionary";
import type { Locale } from "@/lib/locale";

/** Partner brand data — order determines carousel sequence. */
const partners = [
  { name: "Benelli", logo: "/partners/benelli.png" },
  { name: "Bajaj", logo: "/partners/bajaj.png" },
  { name: "TVS", logo: "/partners/tvs.png" },
  { name: "SYM", logo: "/partners/sym.png" },
  { name: "Keeway", logo: "/partners/keeway.png" },
  { name: "Dayun", logo: "/partners/dayun.png" },
  { name: "Haojiang", logo: "/partners/haojiang.png" },
  { name: "Zontes", logo: "/partners/zontes.png" },
  { name: "Vigorey", logo: "/partners/vigorey.png" },
];

/**
 * Infinite auto-scrolling partner logo carousel.
 *
 * The trick: render the list twice side-by-side, then translate the whole
 * strip by -50% over the animation duration so it loops seamlessly.
 */
export function Gallery({ dict, lang }: { dict: Dictionary; lang?: Locale }) {
  // Duplicate logos for the seamless loop effect
  const logos = [...partners, ...partners];

  return (
    <section
      id="gallery"
      className="relative overflow-hidden border-t border-white/5 bg-dark-card py-24"
    >
      {/* Subtle background pattern */}
      <div className="pointer-events-none absolute inset-0 grid-pattern opacity-30" />

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <SectionHeading
          title={dict.partners.title}
          subtitle={dict.partners.subtitle}
        />

        {/* ── Carousel track ──────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative mt-4"
        >
          {/* Fade masks on the edges */}
          <div className="pointer-events-none absolute inset-y-0 start-0 z-10 w-20 bg-gradient-to-r from-dark-card to-transparent rtl:bg-gradient-to-l md:w-32" />
          <div className="pointer-events-none absolute inset-y-0 end-0 z-10 w-20 bg-gradient-to-l from-dark-card to-transparent rtl:bg-gradient-to-r md:w-32" />

          {/* Scrolling strip */}
          <div className="overflow-hidden">
            <div
              className="flex w-max animate-scroll-x gap-10 py-8 md:gap-16"
              style={{ "--scroll-speed": "35s" } as React.CSSProperties}
            >
              {logos.map((partner, idx) => (
                <div
                  key={`${partner.name}-${idx}`}
                  className="group flex h-24 w-36 shrink-0 items-center justify-center rounded-2xl border border-white/[0.06] bg-white/[0.03] p-4 transition-all duration-300 hover:border-primary/40 hover:bg-white/[0.07] hover:shadow-lg hover:shadow-primary/5 md:h-28 md:w-44 md:p-5"
                >
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={140}
                    height={80}
                    className="max-h-full w-auto object-contain opacity-90 transition-all duration-300 group-hover:opacity-100 group-hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
