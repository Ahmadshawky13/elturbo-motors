"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { Button } from "./ui/Button";

export function LocationMap({ dict }: { dict: any }) {
  return (
    <section className="py-24 bg-dark-card border-t border-white/5">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
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
            <p className="text-lg text-light-muted">
              {dict.contact.addressText}
            </p>
            <Button className="mt-4" onClick={() => window.open('https://maps.google.com', '_blank')}>
              Open in Google Maps
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full h-[400px] rounded-2xl overflow-hidden glass p-2"
          >
            {/* Embedded Google Maps with Dark mode filter (CSS inverted trick or styled iframe) */}
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110502.61185043644!2d31.24967!3d30.0444196!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583fa60b21beeb%3A0x79dfb296e8423bba!2sCairo%2C%20Cairo%20Governorate!5e0!3m2!1sen!2seg!4v1700000000000!5m2!1sen!2seg" 
              width="100%" 
              height="100%" 
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }} 
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
