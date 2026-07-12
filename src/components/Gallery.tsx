"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useLang } from "@/context/LangContext";

// Grid (4 kolone): drone(2×2) + 4×1 + grill(2×1) + 2×1 + 4×1 + 4×1 = 20 ćelija → 5 redova
const photos = [
  { src: "/images/drone-02.jpeg",          sr: "Pogled iz drona",    en: "Drone view",        span: "col-span-2 row-span-2" },
  { src: "/images/exterior-wide.jpeg",     sr: "Vikendica",          en: "The cabin",         span: "" },
  { src: "/images/dock-view.jpeg",         sr: "Pristanište",        en: "Dock",              span: "" },
  { src: "/images/exterior-deck.jpeg",     sr: "Terasa na vodi",     en: "Water terrace",     span: "" },
  { src: "/images/terrace-view.jpeg",      sr: "Pogled s terase",    en: "Terrace view",      span: "" },
  { src: "/images/grill.jpeg",             sr: "Roštilj paviljon",   en: "BBQ pavilion",      span: "col-span-2" },
  { src: "/images/interior-bar-clean.jpeg",sr: "Šank",               en: "Bar",               span: "" },
  { src: "/images/interior-living.jpeg",   sr: "Dnevni boravak",     en: "Living room",       span: "" },
  { src: "/images/bedroom-double.jpeg",    sr: "Soba — ugao 1",      en: "Bedroom — angle 1", span: "" },
  { src: "/images/bedroom-single.jpeg",    sr: "Soba — ugao 2",      en: "Bedroom — angle 2", span: "" },
  { src: "/images/interior-bar-wide.jpeg", sr: "Šank i boravak",     en: "Bar & lounge",      span: "" },
  { src: "/images/drone-01.jpeg",          sr: "Iz vazduha",         en: "From above",        span: "" },
  { src: "/images/bathroom.jpeg",          sr: "Kupatilo",           en: "Bathroom",          span: "" },
  { src: "/images/wc.jpeg",               sr: "WC",                 en: "WC",                span: "" },
  { src: "/images/drone-03.jpeg",          sr: "Imanje",             en: "The property",      span: "" },
  { src: "/images/interior-bar-lake.jpeg", sr: "Pogled na jezero",   en: "Lake view",         span: "" },
  { src: "/images/parking-overview.jpeg", sr: "Parking",            en: "Parking",           span: "" },
  { src: "/images/parking-entrance.jpeg", sr: "Ulaz u imanje",      en: "Property entrance", span: "" },
  { src: "/images/boat-shore.jpeg",       sr: "Čamci na obali",     en: "Boats at shore",    span: "" },
  { src: "/images/boat-sunset.jpeg",      sr: "Čamac pri zalasku",  en: "Boat at sunset",    span: "" },
];

const droneVideos = [
  { src: "/video/drone.mp4",    poster: "/images/drone-01.jpeg", sr: "Iz vazduha",           en: "From above" },
  { src: "/video/drone-02.mp4", poster: "/images/drone-02.jpeg", sr: "Pogled na imanje",     en: "Property view" },
  { src: "/video/drone-03.mp4", poster: "/images/drone-03.jpeg", sr: "Panorama jezera",      en: "Lake panorama" },
];

export default function Gallery() {
  const { lang, t } = useLang();
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const [videoIdx, setVideoIdx] = useState<number | null>(null);

  const open  = (i: number) => setLightboxIdx(i);
  const close = () => setLightboxIdx(null);
  const prev  = useCallback(() => setLightboxIdx((i) => (i! - 1 + photos.length) % photos.length), []);
  const next  = useCallback(() => setLightboxIdx((i) => (i! + 1) % photos.length), []);

  const openVideo  = (i: number) => setVideoIdx(i);
  const closeVideo = () => setVideoIdx(null);
  const prevVideo  = useCallback(() => setVideoIdx((i) => (i! - 1 + droneVideos.length) % droneVideos.length), []);
  const nextVideo  = useCallback(() => setVideoIdx((i) => (i! + 1) % droneVideos.length), []);

  useEffect(() => {
    if (lightboxIdx === null) return;
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
  }, [lightboxIdx, prev, next]);

  useEffect(() => {
    if (videoIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape")     closeVideo();
      if (e.key === "ArrowRight") nextVideo();
      if (e.key === "ArrowLeft")  prevVideo();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [videoIdx, prevVideo, nextVideo]);

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

        {/* Snimci iz drona */}
        <h3 className="text-center text-gold text-xs font-bold uppercase tracking-[0.15em] mb-6">
          {t("Snimci iz drona", "Drone footage")}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-14">
          {droneVideos.map((clip, i) => (
            <div
              key={clip.src}
              onClick={() => openVideo(i)}
              className="group relative cursor-pointer overflow-hidden rounded-xl shadow-lg aspect-[4/3]"
            >
              <video
                autoPlay
                muted
                loop
                playsInline
                poster={clip.poster}
                className="absolute inset-0 w-full h-full object-cover"
              >
                <source src={clip.src} type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-end p-3">
                <span className="text-white text-xs font-bold tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/40 px-2 py-1 rounded">
                  {clip[lang]}
                </span>
              </div>
            </div>
          ))}
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
          <button
            onClick={close}
            className="absolute top-5 right-5 text-white/70 hover:text-white text-3xl leading-none z-10"
          >
            ✕
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-6xl leading-none z-10 px-2"
          >
            ‹
          </button>
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
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-6xl leading-none z-10 px-2"
          >
            ›
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/50 text-sm">
            {lightboxIdx + 1} / {photos.length}
          </div>
        </div>
      )}

      {/* Video lightbox */}
      {videoIdx !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={closeVideo}
        >
          <button
            onClick={closeVideo}
            className="absolute top-5 right-5 text-white/70 hover:text-white text-3xl leading-none z-10"
          >
            ✕
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); prevVideo(); }}
            className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-6xl leading-none z-10 px-2"
          >
            ‹
          </button>
          <div
            className="relative max-w-[90vw] max-h-[88vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              key={droneVideos[videoIdx].src}
              autoPlay
              controls
              playsInline
              poster={droneVideos[videoIdx].poster}
              className="max-h-[88vh] max-w-[90vw] w-auto rounded"
            >
              <source src={droneVideos[videoIdx].src} type="video/mp4" />
            </video>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); nextVideo(); }}
            className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-6xl leading-none z-10 px-2"
          >
            ›
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/50 text-sm">
            {videoIdx + 1} / {droneVideos.length}
          </div>
        </div>
      )}
    </section>
  );
}
