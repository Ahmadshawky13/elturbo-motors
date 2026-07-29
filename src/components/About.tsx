"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SectionHeading } from "./ui/SectionHeading";
import type { Dictionary } from "@/types/dictionary";

const ABOUT_IMAGE =
  "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=85&w=1400&auto=format&fit=crop";

export function About({ dict }: { dict: Dictionary }) {
  const stats = [
    { value: "10+", label: dict.about.yearsLabel },
    { value: "500+", label: dict.about.clientsLabel },
  ];

  return (
    <section id="about" className="py-24 bg-dark">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <SectionHeading title={dict.about.title} className="text-start mb-6" />
            <p className="text-lg text-light-muted leading-relaxed">
              {dict.about.description}
            </p>

            <div className="grid grid-cols-2 gap-6 pt-6">
              {stats.map((stat) => (
                <div key={stat.label} className="border-s-2 border-primary ps-4">
                  <h4 className="numeric text-3xl font-bold text-white mb-2">
                    {stat.value}
                  </h4>
                  <p className="text-sm text-gray-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative h-[500px] w-full rounded-2xl overflow-hidden glass group"
          >
            <Image
              src={ABOUT_IMAGE}
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-dark via-transparent to-transparent opacity-60" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
