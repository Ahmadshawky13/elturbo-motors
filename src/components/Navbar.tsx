"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { isLocale, type Locale } from "@/lib/locale";
import type { Dictionary } from "@/types/dictionary";

export function Navbar({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const isHome = pathname === `/${lang}`;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleLang = () => {
    const newLang: Locale = lang === "ar" ? "en" : "ar";
    // Swap only the locale segment so deep links (e.g. /ar/bikes/slug) survive
    const segments = pathname.split("/");
    if (isLocale(segments[1] ?? "")) {
      segments[1] = newLang;
    } else {
      segments.splice(1, 0, newLang);
    }
    router.push(segments.join("/") || `/${newLang}`);
  };

  /** Sections live on the home page; `bikes` is a route of its own. */
  const navLinks = [
    { name: dict.nav.home, hash: "#home" },
    { name: dict.nav.about, hash: "#about" },
    { name: dict.nav.bikes, href: `/${lang}/bikes` },
    { name: dict.nav.gallery, hash: "#gallery" },
    { name: dict.nav.whyUs, hash: "#why-us" },
    { name: dict.nav.contact, hash: "#contact" },
  ];

  const handleSectionClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    hash: string
  ) => {
    setIsMobileMenuOpen(false);

    // Off the home page the browser follows the link and lands on the anchor.
    if (!isHome) return;

    event.preventDefault();
    const element = document.querySelector(hash);
    if (!element) return;
    const top = element.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-dark/80 backdrop-blur-lg border-b border-white/10 shadow-lg py-4"
          : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link
          href={`/${lang}`}
          dir="ltr"
          className="text-2xl font-bold tracking-tighter text-white flex items-center gap-2"
        >
          <span className="text-primary">EL</span> TURBO
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.name}>
                {link.href ? (
                  <Link
                    href={link.href}
                    className={cn(
                      "text-sm font-medium transition-colors",
                      pathname.startsWith(link.href)
                        ? "text-primary"
                        : "text-light-muted hover:text-white"
                    )}
                  >
                    {link.name}
                  </Link>
                ) : (
                  <a
                    href={`/${lang}${link.hash}`}
                    onClick={(event) => handleSectionClick(event, link.hash!)}
                    className="text-sm font-medium text-light-muted hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                )}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4 border-s border-white/20 ps-4">
            <button
              onClick={toggleLang}
              className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors text-white"
            >
              <Globe className="w-4 h-4" />
              {dict.nav.switchLang}
            </button>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={dict.nav.menu}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-dark-card border-b border-white/10 overflow-hidden"
          >
            <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
              {navLinks.map((link) =>
                link.href ? (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-lg font-medium text-light-muted hover:text-white py-2"
                  >
                    {link.name}
                  </Link>
                ) : (
                  <a
                    key={link.name}
                    href={`/${lang}${link.hash}`}
                    onClick={(event) => handleSectionClick(event, link.hash!)}
                    className="text-lg font-medium text-light-muted hover:text-white py-2"
                  >
                    {link.name}
                  </a>
                )
              )}
              <hr className="border-white/10 my-2" />
              <button
                onClick={toggleLang}
                className="flex items-center gap-2 text-lg font-medium text-primary py-2"
              >
                <Globe className="w-5 h-5" />
                {dict.nav.switchLang}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
