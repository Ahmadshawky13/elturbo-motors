"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "./ui/SectionHeading";

export function About({ dict }: { dict: any }) {
  return (
    <section id="about" className="py-24 bg-dark">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <SectionHeading title={dict.about.title} className="text-start mb-6" />
            <p className="text-lg text-light-muted leading-relaxed">
              {dict.about.description}
            </p>
            
            <div className="grid grid-cols-2 gap-6 pt-6">
              <div className="border-l-2 border-primary pl-4">
                <h4 className="text-3xl font-bold text-white mb-2">10+</h4>
                <p className="text-sm text-gray-400">Years of Experience</p>
              </div>
              <div className="border-l-2 border-primary pl-4">
                <h4 className="text-3xl font-bold text-white mb-2">500+</h4>
                <p className="text-sm text-gray-400">Happy Clients</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative h-[500px] w-full rounded-2xl overflow-hidden glass group"
          >
            {/* Image Placeholder */}
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=2070&auto=format&fit=crop")' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent opacity-60" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
