"use client";

import { useLang } from "@/context/LangContext";

export default function About() {
  const { t } = useLang();

  return (
    <section id="o-nama" className="py-24 bg-cream">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Text */}
          <div>
            <span className="text-gold text-xs font-bold uppercase tracking-[0.15em] before:content-['—_'] mb-3 block">
              {t("O nama", "About us")}
            </span>
            <h2
              className="font-serif text-4xl md:text-5xl font-bold text-wood-dark leading-tight mb-6"
              dangerouslySetInnerHTML={{
                __html: t(
                  "Drvena vikendica<br/>direktno na vodi",
                  "A wooden cabin<br/>right on the water"
                ),
              }}
            />
            <p className="text-text-light leading-relaxed mb-5">
              {t(
                "Vikendica Vučetić je autentična drvena kuća smeštena direktno na obali Zvorničkog jezera. Okružena zelenilom i tišinom, savršena je za porodični odmor, ribolov, ili jednostavno beg od gradske vreve.",
                "Vučetić Cabin is an authentic wooden house nestled right on the shores of Lake Zvornik. Surrounded by greenery and silence, it is perfect for a family retreat, fishing, or simply escaping the noise of the city."
              )}
            </p>
            <p className="text-text-light leading-relaxed mb-8">
              {t(
                "Prostrana terasa iznad vode, rustični šank sa bar stolicama, udobne spavaće sobe i tradicionalni roštilj paviljon — sve što vam treba za nezaboravan boravak.",
                "A spacious terrace over the water, a rustic bar with bar stools, cozy bedrooms, and a traditional BBQ pavilion — everything you need for an unforgettable stay."
              )}
            </p>
            <a
              href="#kontakt"
              className="inline-block bg-gold hover:bg-gold-dark text-white font-bold uppercase text-sm tracking-wider px-8 py-3 rounded transition-all duration-200 hover:-translate-y-0.5 shadow-md"
            >
              {t("Pitajte za slobodne termine", "Check Availability")}
            </a>
          </div>

          {/* Video */}
          <div className="relative rounded-xl overflow-hidden shadow-2xl aspect-[4/5]">
            <video
              autoPlay
              muted
              loop
              playsInline
              poster="/images/exterior-wide.jpeg"
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src="/video/drone.mp4" type="video/mp4" />
            </video>
            <div className="absolute bottom-5 left-5 bg-gold text-white px-4 py-3 rounded-lg shadow-lg font-serif italic text-lg leading-snug">
              {t("Direktno\nna vodi", "Right on\nthe water").split("\n").map((line, i) => (
                <span key={i} className="block">{line}</span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
