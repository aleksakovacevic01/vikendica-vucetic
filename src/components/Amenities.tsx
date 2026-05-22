"use client";

import Image from "next/image";
import { useLang } from "@/context/LangContext";

const cards = [
  {
    img: "/images/bedroom-double.jpeg",
    icon: "🛏",
    sr: { title: "Spavaće sobe", body: "Dvije prostrane sobe pod mansardnim krovom od punog drveta. Udobni kreveti za miran san uz zvuk jezera." },
    en: { title: "Bedrooms", body: "Two spacious rooms under a solid wood attic roof. Comfortable beds for a peaceful night's sleep by the lake." },
  },
  {
    img: "/images/interior-bar-wide.jpeg",
    icon: "🍺",
    sr: { title: "Dnevni boravak i šank", body: "Rustični šank sa bar stolicama, TV i pogledom na jezero — savršen za opuštanje u svakom dobu dana." },
    en: { title: "Living room & Bar", body: "Rustic bar with bar stools, TV, and a lake view — perfect for relaxing at any time of day." },
  },
  {
    img: "/images/grill.jpeg",
    icon: "🔥",
    sr: { title: "Roštilj paviljon", body: "Tradicionalni zidani roštilj s nadstrešnicom i sjedalima — idealan za ručkove i večere na svježem zraku." },
    en: { title: "BBQ Pavilion", body: "Traditional brick BBQ with a wooden shelter and seating — ideal for outdoor lunches and dinners." },
  },
  {
    img: "/images/dock-view.jpeg",
    icon: "⛵",
    sr: { title: "Terasa i pristanište", body: "Drvena terasa direktno nad vodom sa ležaljkama i privatom za čamac — jutarnja kafa, pecanje ili kupanje." },
    en: { title: "Terrace & Dock", body: "Wooden terrace directly over the water with sun loungers and a boat dock — morning coffee, fishing, or a swim." },
  },
  {
    img: "/images/exterior-deck.jpeg",
    icon: "🌊",
    sr: { title: "Zvorničko jezero", body: "Smješteni na obali Zvorničkog jezera, okruženi zelenim planinama — raj za ljubitelje prirode i mira." },
    en: { title: "Lake Zvornik", body: "Located on the shores of Lake Zvornik, surrounded by green mountains — paradise for nature lovers and peace seekers." },
  },
  {
    img: "/images/terrace-view.jpeg",
    icon: "🌿",
    sr: { title: "Vrt i okruženje", body: "Uređen zeleni vrt između vikendice i roštilj paviljona — prostor za igru, odmor i uživanje u prirodi." },
    en: { title: "Garden & Grounds", body: "A well-kept green garden between the cabin and the BBQ pavilion — space for play, rest, and enjoying nature." },
  },
];

export default function Amenities() {
  const { lang, t } = useLang();

  return (
    <section id="smestaj" className="py-24 bg-wood-dark">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="text-gold text-xs font-bold uppercase tracking-[0.15em] before:content-['—_'] mb-3 block">
            {t("Smeštaj i sadržaji", "Accommodation")}
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-cream">
            {t("Sve što vam treba", "Everything you need")}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cards.map((card, i) => (
            <div
              key={i}
              className="group bg-white/5 border border-white/8 rounded-xl overflow-hidden hover:-translate-y-1.5 hover:border-gold transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={card.img}
                  alt={card[lang].title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="p-5">
                <div className="text-3xl mb-3">{card.icon}</div>
                <h3 className="font-serif text-xl text-cream mb-2">{card[lang].title}</h3>
                <p className="text-cream/60 text-sm leading-relaxed">{card[lang].body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
