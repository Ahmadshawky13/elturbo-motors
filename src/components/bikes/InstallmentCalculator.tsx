"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { CreditCard, Info } from "lucide-react";
import { formatPrice } from "@/data/bikes";
import type { Locale } from "@/lib/locale";
import type { Dictionary } from "@/types/dictionary";
import { cn } from "@/lib/utils";

const DURATIONS = [12, 24, 36, 48, 60];
/** Indicative flat annual rate used for the estimate only. */
const ANNUAL_RATE = 0.24;

export function InstallmentCalculator({
  price,
  dict,
  lang,
}: {
  price: number;
  dict: Dictionary;
  lang: Locale;
}) {
  const [downPaymentPct, setDownPaymentPct] = useState(20);
  const [months, setMonths] = useState(24);

  const { financed, monthly } = useMemo(() => {
    const financedAmount = price * (1 - downPaymentPct / 100);
    // Flat-rate model: total interest spread evenly across the term.
    const interest = financedAmount * ANNUAL_RATE * (months / 12);
    return {
      financed: financedAmount,
      monthly: (financedAmount + interest) / months,
    };
  }, [price, downPaymentPct, months]);

  const numberLocale = lang === "ar" ? "ar-EG" : "en-EG";

  return (
    <div className="overflow-hidden rounded-2xl glass">
      <div className="flex items-start gap-4 border-b border-white/10 p-6">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <CreditCard className="h-5 w-5" />
        </span>
        <div>
          <h3 className="text-lg font-bold text-white">
            {dict.bikes.installments.title}
          </h3>
          <p className="mt-1 text-sm text-light-muted">
            {dict.bikes.installments.subtitle}
          </p>
        </div>
      </div>

      <div className="space-y-6 p-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label htmlFor="down-payment" className="text-sm font-medium text-white">
              {dict.bikes.installments.downPayment}
            </label>
            <span className="numeric text-sm font-bold text-primary">
              {new Intl.NumberFormat(numberLocale).format(downPaymentPct)}%
            </span>
          </div>
          <input
            id="down-payment"
            type="range"
            min={10}
            max={70}
            step={5}
            value={downPaymentPct}
            onChange={(event) => setDownPaymentPct(Number(event.target.value))}
            className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-primary"
          />
        </div>

        <div className="space-y-3">
          <p className="text-sm font-medium text-white">
            {dict.bikes.installments.duration}
          </p>
          <div className="flex flex-wrap gap-2">
            {DURATIONS.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setMonths(option)}
                aria-pressed={months === option}
                className={cn(
                  "numeric rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-300",
                  months === option
                    ? "border-primary bg-primary text-white shadow-lg shadow-primary/25"
                    : "border-white/15 text-light-muted hover:border-white/30 hover:text-white"
                )}
              >
                {new Intl.NumberFormat(numberLocale).format(option)}{" "}
                {dict.bikes.installments.months}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 rounded-xl border border-white/10 bg-black/30 p-5">
          <div>
            <p className="text-xs uppercase tracking-widest text-light-muted">
              {dict.bikes.installments.financed}
            </p>
            <p className="numeric mt-1 font-semibold text-white">
              {formatPrice(Math.round(financed), lang)}
            </p>
          </div>
          <div className="text-end">
            <p className="text-xs uppercase tracking-widest text-light-muted">
              {dict.bikes.installments.monthly}
            </p>
            <motion.p
              key={`${downPaymentPct}-${months}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="numeric mt-1 text-xl font-bold text-primary"
            >
              {formatPrice(Math.round(monthly), lang)}
            </motion.p>
          </div>
        </div>

        <p className="flex items-start gap-2 text-xs leading-relaxed text-light-muted">
          <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          {dict.bikes.installments.note}
        </p>
      </div>
    </div>
  );
}
