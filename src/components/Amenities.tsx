"use client";

import Image from "next/image";
import { useLang } from "@/context/LangContext";

const featuredCards = [
  {
    img: "/images/interior-sofa.jpeg",
    sr: "Dnevni boravak",
    en: "Living room",
    desc: { sr: "Sofa, šank, TV, klima", en: "Sofa, bar, TV, AC" },
  },
  {
    img: "/images/bedroom-double.jpeg",
    sr: "Spavaća soba",
    en: "Bedroom",
    desc: { sr: "3 ležaja, mansardni krov", en: "3 beds, attic roof" },
  },
  {
    img: "/images/exterior-deck.jpeg",
    sr: "Terasa na vodi",
    en: "Water terrace",
    desc: { sr: "Direktno iznad jezera", en: "Directly above the lake" },
  },
  {
    img: "/images/grill.jpeg",
    sr: "Roštilj paviljon",
    en: "BBQ pavilion",
    desc: { sr: "Zidani roštilj, sjedište", en: "Brick BBQ, seating" },
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
  { icon: "🎣", sr: "Oprema za pecanje",      en: "Fishing equipment" },
];

export default function Amenities() {
  const { lang, t } = useLang();

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
              className="group relative overflow-hidden rounded-xl aspect-[3/4] cursor-default"
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
          <h3 className="font-serif text-cream text-xl mb-6 flex items-center gap-3">
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
    </section>
  );
}
