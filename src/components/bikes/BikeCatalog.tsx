"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { bikes, categories, type BikeCategory } from "@/data/bikes";
import type { Locale } from "@/lib/locale";
import type { Dictionary } from "@/types/dictionary";
import { cn } from "@/lib/utils";
import { BikeCard } from "./BikeCard";

type Filter = BikeCategory | "all";

export function BikeCatalog({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const [filter, setFilter] = useState<Filter>("all");

  // Only show filters that actually have stock behind them
  const availableCategories = useMemo(
    () => categories.filter((c) => bikes.some((bike) => bike.category === c)),
    []
  );

  const visible = useMemo(
    () => (filter === "all" ? bikes : bikes.filter((bike) => bike.category === filter)),
    [filter]
  );

  const count =
    visible.length === 1
      ? dict.bikes.resultsOne
      : dict.bikes.resultsMany.replace("{count}", String(visible.length));

  return (
    <div className="space-y-10">
      <div className="flex flex-col items-center gap-6">
        <div
          className="no-scrollbar -mx-4 flex max-w-full gap-2 overflow-x-auto px-4 pb-1"
          role="tablist"
          aria-label={dict.bikes.title}
        >
          {(["all", ...availableCategories] as Filter[]).map((option) => {
            const isActive = option === filter;
            return (
              <button
                key={option}
                role="tab"
                aria-selected={isActive}
                onClick={() => setFilter(option)}
                className={cn(
                  "relative shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors duration-300",
                  isActive
                    ? "text-white"
                    : "text-light-muted hover:text-white"
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="catalog-filter-pill"
                    className="absolute inset-0 rounded-full bg-primary shadow-lg shadow-primary/25"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative z-10">
                  {option === "all" ? dict.bikes.all : dict.bikes.categories[option]}
                </span>
              </button>
            );
          })}
        </div>

        <p className="numeric text-sm text-light-muted" aria-live="polite">
          {count}
        </p>
      </div>

      <motion.div layout className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((bike, idx) => (
            <motion.div
              key={bike.slug}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25 }}
            >
              <BikeCard bike={bike} dict={dict} lang={lang} index={idx} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
