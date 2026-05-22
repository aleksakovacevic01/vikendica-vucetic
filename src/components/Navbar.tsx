"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useLang } from "@/context/LangContext";

const links = [
  { href: "#o-nama",   sr: "O nama",   en: "About" },
  { href: "#smestaj",  sr: "Smeštaj",  en: "Accommodation" },
  { href: "#galerija", sr: "Galerija", en: "Gallery" },
];

export default function Navbar() {
  const { lang, toggle, t } = useLang();
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => setMenuOpen(false);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 h-[72px] transition-all duration-300 ${
        scrolled || menuOpen
          ? "bg-wood-dark/97 shadow-lg backdrop-blur-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" onClick={close}>
          <Image
            src="/images/logo.jpeg"
            alt="Vikendica Vučetić"
            width={52}
            height={52}
            className="rounded-full border-2 border-white/20"
          />
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8 list-none">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-white/85 text-sm tracking-wide hover:text-gold transition-colors duration-200"
              >
                {t(l.sr, l.en)}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#kontakt"
              className="bg-gold hover:bg-gold-dark text-white text-sm font-bold uppercase tracking-wider px-5 py-2 rounded transition-all duration-200 hover:-translate-y-0.5"
            >
              {t("Rezervišite", "Book Now")}
            </a>
          </li>
        </ul>

        {/* Right controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggle}
            className="border border-white/40 text-white/85 hover:border-gold hover:text-gold text-xs font-bold tracking-widest px-3 py-1 rounded transition-colors duration-200"
          >
            {lang === "sr" ? "EN" : "SR"}
          </button>
          <button
            className="md:hidden flex flex-col gap-[5px] p-1"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Menu"
          >
            <span className={`block w-6 h-0.5 bg-white transition-all duration-200 ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all duration-200 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all duration-200 ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden bg-wood-dark/97 overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-80 py-3" : "max-h-0"
        }`}
      >
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            onClick={close}
            className="block px-6 py-3 text-white/85 hover:text-gold transition-colors"
          >
            {t(l.sr, l.en)}
          </a>
        ))}
        <a
          href="#kontakt"
          onClick={close}
          className="block mx-6 my-2 text-center bg-gold hover:bg-gold-dark text-white font-bold uppercase text-sm tracking-wider py-2 rounded transition-colors"
        >
          {t("Rezervišite", "Book Now")}
        </a>
      </div>
    </nav>
  );
}
