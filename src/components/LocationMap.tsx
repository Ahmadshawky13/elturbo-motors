"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { site } from "@/config/site";
import type { Dictionary } from "@/types/dictionary";

export function LocationMap({ dict }: { dict: Dictionary }) {
  return (
    <section className="py-24 bg-dark-card border-t border-white/5">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/20 text-primary mb-2">
              <MapPin className="w-6 h-6" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white">
              {dict.contact.address}
            </h2>
            <p className="text-lg text-light-muted">{dict.contact.addressText}</p>
            <a
              href={site.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 font-semibold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:bg-primary-dark active:scale-95"
            >
              {dict.contact.openInMaps}
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full h-[400px] rounded-2xl overflow-hidden glass p-2"
          >
            {/* Embedded Google Maps, tinted to match the dark theme */}
            <iframe
              src={site.mapsEmbedUrl}
              title={dict.contact.address}
              width="100%"
              height="100%"
              style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
