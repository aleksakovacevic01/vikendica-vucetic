"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useLang } from "@/context/LangContext";

const featuredCards = [
  {
    img: "/images/interior-sofa.jpeg",
    sr: "Dnevni boravak",
    en: "Living room",
    desc: { sr: "Sofa, šank, TV, klima", en: "Sofa, bar, TV, AC" },
    photos: [
      "/images/interior-sofa.jpeg",
      "/images/interior-living.jpeg",
      "/images/interior-bar-clean.jpeg",
      "/images/interior-bar-wide.jpeg",
      "/images/interior-bar-lake.jpeg",
    ],
  },
  {
    img: "/images/bedroom-double.jpeg",
    sr: "Spavaća soba",
    en: "Bedroom",
    desc: { sr: "3 ležaja, mansardni krov", en: "3 beds, attic roof" },
    photos: [
      "/images/bedroom-double.jpeg",
      "/images/bedroom-single.jpeg",
      "/images/stairs.jpeg",
    ],
  },
  {
    img: "/images/exterior-deck.jpeg",
    sr: "Terasa na vodi",
    en: "Water terrace",
    desc: { sr: "Direktno iznad jezera", en: "Directly above the lake" },
    photos: [
      "/images/exterior-deck.jpeg",
      "/images/dock-view.jpeg",
      "/images/terrace-view.jpeg",
      "/images/terrace-dock.jpeg",
    ],
  },
  {
    img: "/images/grill.jpeg",
    sr: "Roštilj paviljon",
    en: "BBQ pavilion",
    desc: { sr: "Zidani roštilj", en: "Brick BBQ" },
    photos: [
      "/images/grill.jpeg",
      "/images/grill-wide.jpeg",
    ],
  },
];

const amenityList = [
  { icon: "🛏", sr: "Spavaća soba (3 ležaja)", en: "Bedroom (3 beds)" },
  { icon: "🍳", sr: "Kuhinja s pločom",       en: "Kitchen with hob" },
  { icon: "☕", sr: "Aparat za kafu",         en: "Coffee machine" },
  { icon: "❄️", sr: "Klima uređaj",           en: "Air conditioning" },
  { icon: "📺", sr: "Televizija",             en: "Television" },
  { icon: "🚿", sr: "Kupatilo",              en: "Bathroom" },
  { icon: "⛵", sr: "Privatni čamac",         en: "Private boat" },
  { icon: "🚗", sr: "Privatni parking",       en: "Private parking" },
  { icon: "🪑", sr: "Ležaljke",              en: "Sun loungers" },
  { icon: "📷", sr: "Sigurnosne kamere",      en: "Security cameras" },
  { icon: "🔥", sr: "Roštilj paviljon",       en: "BBQ pavilion" },
  { icon: "🌊", sr: "Direktan izlaz na vodu", en: "Direct water access" },
  { icon: "🏡", sr: "Natkrivena terasa",      en: "Covered terrace" },
  { icon: "📶", sr: "WiFi",                    en: "WiFi" },
];

export default function Amenities() {
  const { lang, t } = useLang();
  const [modal, setModal] = useState<{ cardIdx: number; photoIdx: number } | null>(null);

  const close = () => setModal(null);

  const prev = useCallback(() => {
    if (!modal) return;
    const total = featuredCards[modal.cardIdx].photos.length;
    setModal({ ...modal, photoIdx: (modal.photoIdx - 1 + total) % total });
  }, [modal]);

  const next = useCallback(() => {
    if (!modal) return;
    const total = featuredCards[modal.cardIdx].photos.length;
    setModal({ ...modal, photoIdx: (modal.photoIdx + 1) % total });
  }, [modal]);

  useEffect(() => {
    if (!modal) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape")     close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft")  prev();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [modal, prev, next]);

  return (
    <section id="smestaj" className="py-24 bg-wood-dark">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-gold text-xs font-bold uppercase tracking-[0.15em] before:content-['—_'] mb-3 block">
            {t("Smeštaj i sadržaji", "Accommodation")}
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-cream mb-4">
            {t("Sve što vam treba", "Everything you need")}
          </h2>
          <p className="text-cream/55 max-w-xl mx-auto text-sm leading-relaxed">
            {t(
              "Vikendica je potpuno opremljena — od kuhinje i klime do privatnog čamca i ležaljki na terasi iznad jezera.",
              "The cabin is fully equipped — from kitchen and AC to a private boat and sun loungers on the terrace above the lake."
            )}
          </p>
        </div>

        {/* 4 foto kartice */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-12">
          {featuredCards.map((card, i) => (
            <div
              key={i}
              onClick={() => setModal({ cardIdx: i, photoIdx: 0 })}
              className="group relative overflow-hidden rounded-xl aspect-[3/4] cursor-pointer"
            >
              <Image
                src={card.img}
                alt={card[lang]}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              {/* Text */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-gold text-xs font-bold uppercase tracking-widest mb-1">
                  {card.desc[lang]}
                </p>
                <h3 className="font-serif text-white text-lg font-semibold leading-tight">
                  {card[lang]}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Kompletna opremljenost */}
        <div className="border border-white/10 rounded-2xl p-6 md:p-8">
          <h3 className="font-serif text-cream text-xl mb-6 flex items-center justify-center gap-3">
            <span className="block w-8 h-px bg-gold" />
            {t("Kompletna opremljenost", "Full amenities")}
            <span className="block w-8 h-px bg-gold" />
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-0">
            {amenityList.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 py-3 border-b border-white/8 last:border-0"
              >
                <span className="text-xl flex-shrink-0">{item.icon}</span>
                <span className="text-cream/75 text-sm">
                  {t(item.sr, item.en)}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Modal */}
      {modal !== null && (() => {
        const card = featuredCards[modal.cardIdx];
        const photos = card.photos;
        return (
          <div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
            onClick={close}
          >
            <button
              onClick={close}
              className="absolute top-5 right-5 text-white/70 hover:text-white text-3xl leading-none z-10"
            >
              ✕
            </button>

            {/* Naslov */}
            <div className="absolute top-5 left-1/2 -translate-x-1/2 text-center z-10">
              <p className="text-gold text-xs font-bold uppercase tracking-widest">{card.desc[lang]}</p>
              <h3 className="font-serif text-white text-lg font-semibold">{card[lang]}</h3>
            </div>

            {photos.length > 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); prev(); }}
                className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-6xl leading-none z-10 px-2"
              >
                ‹
              </button>
            )}

            <div
              className="relative max-w-[90vw] max-h-[80vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={photos[modal.photoIdx]}
                alt={card[lang]}
                width={1400}
                height={900}
                className="object-contain max-h-[80vh] w-auto rounded"
              />
            </div>

            {photos.length > 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); next(); }}
                className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-6xl leading-none z-10 px-2"
              >
                ›
              </button>
            )}

            {/* Thumbnails */}
            {photos.length > 1 && (
              <div
                className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2"
                onClick={(e) => e.stopPropagation()}
              >
                {photos.map((src, idx) => (
                  <button
                    key={idx}
                    onClick={() => setModal({ ...modal, photoIdx: idx })}
                    className={`w-12 h-8 relative rounded overflow-hidden border-2 transition-colors ${
                      idx === modal.photoIdx ? "border-gold" : "border-white/20"
                    }`}
                  >
                    <Image src={src} alt="" fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        );
      })()}
    </section>
  );
}
