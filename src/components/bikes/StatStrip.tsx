"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

interface Stat {
  value: string;
  unit: string;
  label: string;
}

/** Counts up to `target` once the strip scrolls into view. */
function useCountUp(target: number, decimals: number, active: boolean) {
  const [value, setValue] = useState(active ? target : 0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!active) return;
    if (prefersReducedMotion) {
      setValue(target);
      return;
    }

    let frame = 0;
    const duration = 900;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Number((target * eased).toFixed(decimals)));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, decimals, active, prefersReducedMotion]);

  return value;
}

function StatValue({ value, active }: { value: string; active: boolean }) {
  const decimals = value.includes(".") ? value.split(".")[1].length : 0;
  const numeric = Number(value);
  const counted = useCountUp(Number.isFinite(numeric) ? numeric : 0, decimals, active);

  if (!Number.isFinite(numeric)) return <>{value}</>;
  return <>{counted.toFixed(decimals)}</>;
}

export function StatStrip({ stats }: { stats: Stat[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div
      ref={ref}
      className="grid grid-cols-3 divide-x divide-white/10 overflow-hidden rounded-2xl glass rtl:divide-x-reverse"
    >
      {stats.map((stat, idx) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.4, delay: idx * 0.1 }}
          className="px-3 py-5 text-center sm:px-6 sm:py-6"
        >
          <p className="numeric text-2xl font-bold leading-none text-white sm:text-4xl">
            <StatValue value={stat.value} active={inView} />
            <span className="ms-1 text-sm font-medium text-primary sm:text-base">
              {stat.unit}
            </span>
          </p>
          <p className="mt-2 text-[10px] uppercase tracking-widest text-light-muted sm:text-xs">
            {stat.label}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
