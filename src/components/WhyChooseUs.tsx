"use client";

import { motion } from "framer-motion";
import { CreditCard, Banknote, Clock } from "lucide-react";
import { SectionHeading } from "./ui/SectionHeading";
import type { Dictionary } from "@/types/dictionary";

export function WhyChooseUs({ dict }: { dict: Dictionary }) {
  const cards = [
    {
      icon: <CreditCard className="w-8 h-8 text-primary" />,
      title: dict.whyUs.installments.title,
      description: dict.whyUs.installments.description,
      tags: dict.whyUs.installments.companies,
    },
    {
      icon: <Banknote className="w-8 h-8 text-primary" />,
      title: dict.whyUs.cash.title,
      description: dict.whyUs.cash.description,
      tags: dict.whyUs.cash.companies,
    },
    {
      icon: <Clock className="w-8 h-8 text-primary" />,
      title: dict.whyUs.fastApproval.title,
      description: dict.whyUs.fastApproval.description,
      tags: null,
    },
  ];

  return (
    <section id="why-us" className="py-24 bg-dark">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading title={dict.whyUs.title} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {cards.map((card, idx) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="glass rounded-2xl p-8 hover:-translate-y-2 transition-transform duration-300 group"
            >
              <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-6 border border-white/10 group-hover:border-primary/50 transition-colors">
                {card.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{card.title}</h3>
              <p className="text-light-muted mb-8 leading-relaxed">
                {card.description}
              </p>

              {card.tags && (
                <div className="flex flex-wrap gap-2">
                  {card.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
