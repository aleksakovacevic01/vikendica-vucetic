"use client";

import Image from "next/image";
import { useLang } from "@/context/LangContext";

export default function Hero() {
  const { t } = useLang();

  return (
    <section id="hero" className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Photo background */}
      <div className="absolute inset-0">
        <Image
          src="/images/exterior-wide.jpeg"
          alt="Vikendica Vučetić — Zvorničko jezero"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/45 to-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-6 max-w-3xl mx-auto">
        <Image
          src="/images/logo.jpeg"
          alt="Vikendica Vučetić"
          width={130}
          height={130}
          className="rounded-full mx-auto mb-8 border-2 border-white/25 shadow-2xl"
        />
        <h1
          className="font-serif text-5xl md:text-7xl font-bold leading-tight mb-5 drop-shadow-lg"
          dangerouslySetInnerHTML={{
            __html: t(
              "Odmor na vodi,<br/>u srcu prirode",
              "Waterfront escape,<br/>in the heart of nature"
            ),
          }}
        />
        <p className="text-lg md:text-xl font-light opacity-90 mb-10 tracking-wide">
          {t(
            "Vikendica Vučetić — Zvorničko jezero",
            "Vučetić Cabin — Lake Zvornik"
          )}
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <a
            href="#galerija"
            className="border-2 border-white/70 text-white hover:bg-white/15 hover:border-white font-bold uppercase text-sm tracking-wider px-8 py-3 rounded transition-all duration-200"
          >
            {t("Pogledaj galeriju", "View Gallery")}
          </a>
          <a
            href="#kontakt"
            className="bg-gold hover:bg-gold-dark text-white font-bold uppercase text-sm tracking-wider px-8 py-3 rounded transition-all duration-200 hover:-translate-y-0.5 shadow-lg"
          >
            {t("Rezervišite", "Book Now")}
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
        <div className="w-px h-12 bg-gradient-to-b from-white to-transparent animate-pulse" />
      </div>
    </section>
  );
}
