"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useLang } from "@/context/LangContext";

// Grid logika (4 kolone): drone(2×2)=4ć + 4×1ć + grill(2×1)=2ć + 2×1ć + 4×1ć + 4×1ć = 20ć → 5 čistih redova
const photos = [
  // Red 1-2: drone hero + 4 eksterijera
  { src: "/images/drone-02.jpeg",          sr: "Pogled iz drona",    en: "Drone view",        span: "col-span-2 row-span-2" },
  { src: "/images/exterior-wide.jpeg",     sr: "Vikendica",          en: "The cabin",         span: "" },
  { src: "/images/dock-view.jpeg",         sr: "Pristanište",        en: "Dock",              span: "" },
  { src: "/images/exterior-deck.jpeg",     sr: "Terasa na vodi",     en: "Water terrace",     span: "" },
  { src: "/images/terrace-view.jpeg",      sr: "Pogled s terase",    en: "Terrace view",      span: "" },
  // Red 3: roštilj (2ć) + 2 interijera
  { src: "/images/grill.jpeg",             sr: "Roštilj paviljon",   en: "BBQ pavilion",      span: "col-span-2" },
  { src: "/images/interior-bar-clean.jpeg",sr: "Šank",               en: "Bar",               span: "" },
  { src: "/images/interior-living.jpeg",   sr: "Dnevni boravak",     en: "Living room",       span: "" },
  // Red 4: sobe + eksterijeri
  { src: "/images/bedroom-double.jpeg",    sr: "Soba — ugao 1",      en: "Bedroom — angle 1", span: "" },
  { src: "/images/bedroom-single.jpeg",    sr: "Soba — ugao 2",      en: "Bedroom — angle 2", span: "" },
  { src: "/images/interior-bar-wide.jpeg", sr: "Šank i boravak",     en: "Bar & lounge",      span: "" },
  { src: "/images/drone-01.jpeg",          sr: "Iz vazduha",         en: "From above",        span: "" },
  // Red 5: kupatila + dron
  { src: "/images/bathroom.jpeg",          sr: "Kupatilo",           en: "Bathroom",          span: "" },
  { src: "/images/wc.jpeg",                 sr: "WC",                 en: "WC",                span: "" },
  { src: "/images/drone-03.jpeg",          sr: "Imanje",             en: "The property",      span: "" },
  { src: "/images/interior-bar-lake.jpeg",  sr: "Pogled na jezero",   en: "Lake view",         span: "" },
];

export default function Gallery() {
  const { lang, t } = useLang();
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const open  = (i: number) => setLightboxIdx(i);
  const close = () => setLightboxIdx(null);
  const prev  = useCallback(() => setLightboxIdx((i) => (i! - 1 + photos.length) % photos.length), []);
  const next  = useCallback(() => setLightboxIdx((i) => (i! + 1) % photos.length), []);

  useEffect(() => {
    if (lightboxIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape")      close();
      if (e.key === "ArrowRight")  next();
      if (e.key === "ArrowLeft")   prev();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightboxIdx, prev, next]);

  return (
    <section id="galerija" className="py-24 bg-cream-dark">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="text-gold text-xs font-bold uppercase tracking-[0.15em] before:content-['—_'] mb-3 block">
            {t("Galerija", "Gallery")}
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-wood-dark">
            {t("Pogledajte sami", "See for yourself")}
          </h2>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-1.5 px-1.5">
        {photos.map((photo, i) => (
          <div
            key={i}
            onClick={() => open(i)}
            className={`group relative cursor-pointer overflow-hidden rounded-sm ${photo.span} ${
              i === 0 ? "aspect-square" : i === 5 ? "aspect-[2/1]" : "aspect-[4/3]"
            }`}
          >
            <Image
              src={photo.src}
              alt={photo[lang]}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-end p-3">
              <span className="text-white text-xs font-bold tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/40 px-2 py-1 rounded">
                {photo[lang]}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxIdx !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={close}
        >
          {/* Close */}
          <button
            onClick={close}
            className="absolute top-5 right-5 text-white/70 hover:text-white text-3xl leading-none z-10"
          >
            ✕
          </button>
          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-6xl leading-none z-10 px-2"
          >
            ‹
          </button>
          {/* Image */}
          <div
            className="relative max-w-[90vw] max-h-[88vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={photos[lightboxIdx].src}
              alt={photos[lightboxIdx][lang]}
              width={1400}
              height={900}
              className="object-contain max-h-[88vh] w-auto rounded"
            />
          </div>
          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-6xl leading-none z-10 px-2"
          >
            ›
          </button>
          {/* Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/50 text-sm">
            {lightboxIdx + 1} / {photos.length}
          </div>
        </div>
      )}
    </section>
  );
}
