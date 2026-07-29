"use client";

import { motion } from "framer-motion";
import {
  Cog,
  Gauge,
  Zap,
  Waves,
  Fuel,
  Weight,
  Timer,
  ArrowUpDown,
  Disc,
  Thermometer,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Bike } from "@/data/bikes";
import type { Locale } from "@/lib/locale";
import type { Dictionary } from "@/types/dictionary";

const SPEC_ORDER = [
  "engine",
  "power",
  "torque",
  "transmission",
  "fuel",
  "weight",
  "topSpeed",
  "seatHeight",
  "brakes",
  "cooling",
] as const;

const SPEC_ICONS: Record<(typeof SPEC_ORDER)[number], LucideIcon> = {
  engine: Cog,
  power: Zap,
  torque: Waves,
  transmission: Gauge,
  fuel: Fuel,
  weight: Weight,
  topSpeed: Timer,
  seatHeight: ArrowUpDown,
  brakes: Disc,
  cooling: Thermometer,
};

export function SpecSheet({
  bike,
  dict,
  lang,
}: {
  bike: Bike;
  dict: Dictionary;
  lang: Locale;
}) {
  return (
    <dl className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-dark-border bg-dark-border sm:grid-cols-2">
      {SPEC_ORDER.map((key, idx) => {
        const Icon = SPEC_ICONS[key];
        return (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.35, delay: Math.min(idx, 8) * 0.04 }}
            className="group flex items-start gap-4 bg-dark-card p-5 transition-colors duration-300 hover:bg-white/[0.04]"
          >
            <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-primary transition-colors group-hover:border-primary/40">
              <Icon className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <dt className="text-xs uppercase tracking-widest text-light-muted">
                {dict.bikes.specs[key]}
              </dt>
              <dd className="numeric mt-1 font-semibold text-white">
                {bike.specs[key][lang]}
              </dd>
            </div>
          </motion.div>
        );
      })}
    </dl>
  );
}
