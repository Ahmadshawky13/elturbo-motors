"use client";

import { motion } from "framer-motion";
import { Button } from "./ui/Button";

export function Hero({ dict }: { dict: any }) {
  const handleScroll = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-dark/80 via-dark/50 to-dark z-10" />
        {/* Placeholder image for hero bg. You can replace this with an actual image or video */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105" 
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=2070&auto=format&fit=crop")' }}
        />
      </div>

      <div className="container relative z-20 mx-auto px-4 md:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto space-y-8"
        >
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-block mb-4"
          >
            <span className="px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-semibold tracking-wider">
              PREMIUM SHOWROOM
            </span>
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white">
            {dict.hero.title}
          </h1>
          
          <p className="text-xl md:text-2xl text-light-muted max-w-2xl mx-auto font-light">
            {dict.hero.subtitle}
          </p>
          
          <p className="text-base md:text-lg text-gray-400 max-w-3xl mx-auto">
            {dict.hero.description}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Button size="lg" className="w-full sm:w-auto" onClick={() => handleScroll('#contact')}>
              {dict.hero.ctaPrimary}
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto" onClick={() => handleScroll('#gallery')}>
              {dict.hero.ctaSecondary}
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
      >
        <div className="w-[30px] h-[50px] rounded-full border-2 border-white/30 flex justify-center p-2">
          <motion.div 
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-2 h-2 rounded-full bg-primary"
          />
        </div>
      </motion.div>
    </section>
  );
}
