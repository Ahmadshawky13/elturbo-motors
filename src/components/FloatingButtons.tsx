"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, MessageCircle } from "lucide-react";
import { whatsappHref } from "@/config/site";
import type { Dictionary } from "@/types/dictionary";

export function FloatingButtons({
  dict,
  /** Optional pre-filled WhatsApp message, e.g. an enquiry about one bike. */
  message,
}: {
  dict: Dictionary;
  message?: string;
}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-6 end-6 z-50 flex flex-col gap-4"
        >
          {/* WhatsApp Floating Button */}
          <a
            href={whatsappHref(message)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={dict.contact.whatsapp}
            className="w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg shadow-[#25D366]/30 hover:scale-110 transition-transform duration-300"
          >
            <MessageCircle className="w-8 h-8" />
          </a>

          {/* Scroll to Top Button */}
          <button
            onClick={scrollToTop}
            aria-label={dict.nav.home}
            className="w-14 h-14 bg-dark-card border border-white/10 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-white/10 hover:scale-110 transition-all duration-300 backdrop-blur-sm"
          >
            <ArrowUp className="w-6 h-6" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
