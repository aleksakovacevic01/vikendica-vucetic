"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import emailjs from "@emailjs/browser";
import { DayPicker } from "react-day-picker";
import { useLang } from "@/context/LangContext";

const EMAILJS_SERVICE_ID  = "service_lpcu56x";
const EMAILJS_TEMPLATE_ID = "template_gep1fy5";
const EMAILJS_PUBLIC_KEY  = "EGcv0kgUMCv9tfJgL";

const inputClass =
  "px-4 py-2.5 border-[1.5px] border-cream-dark rounded-lg bg-cream text-text placeholder:text-gray-400 focus:outline-none focus:border-gold transition-colors";

const fmt = (d: Date) =>
  d.toLocaleDateString("sr-Latn-RS", { day: "2-digit", month: "2-digit", year: "numeric" });

export default function Contact() {
  const { t } = useLang();
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [dateFrom, setDateFrom] = useState<Date | undefined>();
  const [dateTo, setDateTo] = useState<Date | undefined>();
  const [showFrom, setShowFrom] = useState(false);
  const [showTo, setShowTo] = useState(false);
  const fromRef = useRef<HTMLDivElement>(null);
  const toRef = useRef<HTMLDivElement>(null);

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (fromRef.current && !fromRef.current.contains(e.target as Node)) setShowFrom(false);
      if (toRef.current   && !toRef.current.contains(e.target as Node))   setShowTo(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const submit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name:  form.name,
          from_email: form.email,
          phone:      form.phone,
          dates:      dateFrom && dateTo
                        ? `${fmt(dateFrom)} – ${fmt(dateTo)}`
                        : t("Nije navedeno", "Not specified"),
          message:    form.message,
        },
        EMAILJS_PUBLIC_KEY
      );
      setStatus("success");
      setForm({ name: "", email: "", phone: "", message: "" });
      setDateFrom(undefined);
      setDateTo(undefined);
    } catch {
      setStatus("error");
    }
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <section id="kontakt" className="py-24 bg-cream">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="text-gold text-xs font-bold uppercase tracking-[0.15em] before:content-['—_'] mb-3 block">
            {t("Kontakt", "Contact")}
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-wood-dark mb-3">
            {t("Rezervišite vaš odmor", "Book your stay")}
          </h2>
          <p className="text-text-light max-w-md mx-auto">
            {t(
              "Pošaljite nam poruku i javićemo vam se u najkraćem roku.",
              "Send us a message and we'll get back to you as soon as possible."
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10">
          {/* Form */}
          <form onSubmit={submit} className="bg-white rounded-xl shadow-lg p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
              {/* Ime */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wide text-text">
                  {t("Ime i prezime", "Full name")}
                </label>
                <input
                  name="name" value={form.name} onChange={handle} required
                  placeholder={t("Marko Marković", "John Smith")}
                  className={inputClass}
                />
              </div>
              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wide text-text">
                  {t("Email adresa", "Email address")}
                </label>
                <input
                  type="email" name="email" value={form.email} onChange={handle} required
                  placeholder={t("marko@email.com", "john@email.com")}
                  className={inputClass}
                />
              </div>
              {/* Telefon */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wide text-text">
                  {t("Broj telefona", "Phone number")}
                </label>
                <input
                  type="tel" name="phone" value={form.phone} onChange={handle}
                  placeholder="+381 ..."
                  className={inputClass}
                />
              </div>

              {/* Datum dolaska */}
              <div className="flex flex-col gap-1.5 relative" ref={fromRef}>
                <label className="text-xs font-bold uppercase tracking-wide text-text">
                  {t("Datum dolaska", "Check-in")}
                </label>
                <button
                  type="button"
                  onClick={() => { setShowFrom((v) => !v); setShowTo(false); }}
                  className={`${inputClass} text-left flex items-center justify-between gap-2 w-full cursor-pointer`}
                >
                  <span className={dateFrom ? "text-text" : "text-gray-400"}>
                    {dateFrom ? fmt(dateFrom) : t("Odaberite datum...", "Select date...")}
                  </span>
                  <svg className="w-4 h-4 text-gold flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                </button>
                {showFrom && (
                  <div className="absolute top-full mt-1 z-50 bg-white rounded-xl shadow-2xl border border-cream-dark left-0">
                    <DayPicker
                      mode="single"
                      selected={dateFrom}
                      onSelect={(d) => { setDateFrom(d ?? undefined); setShowFrom(false); }}
                      disabled={{ before: today }}
                    />
                  </div>
                )}
              </div>

              {/* Datum odlaska */}
              <div className="flex flex-col gap-1.5 relative" ref={toRef}>
                <label className="text-xs font-bold uppercase tracking-wide text-text">
                  {t("Datum odlaska", "Check-out")}
                </label>
                <button
                  type="button"
                  onClick={() => { setShowTo((v) => !v); setShowFrom(false); }}
                  className={`${inputClass} text-left flex items-center justify-between gap-2 w-full cursor-pointer`}
                >
                  <span className={dateTo ? "text-text" : "text-gray-400"}>
                    {dateTo ? fmt(dateTo) : t("Odaberite datum...", "Select date...")}
                  </span>
                  <svg className="w-4 h-4 text-gold flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                </button>
                {showTo && (
                  <div className="absolute top-full mt-1 z-50 bg-white rounded-xl shadow-2xl border border-cream-dark right-0">
                    <DayPicker
                      mode="single"
                      selected={dateTo}
                      onSelect={(d) => { setDateTo(d ?? undefined); setShowTo(false); }}
                      disabled={{ before: dateFrom ?? today }}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Poruka */}
            <div className="flex flex-col gap-1.5 mb-6">
              <label className="text-xs font-bold uppercase tracking-wide text-text">
                {t("Poruka", "Message")}
              </label>
              <textarea
                name="message" value={form.message} onChange={handle} rows={5}
                placeholder={t("Vaša poruka...", "Your message...")}
                className={`${inputClass} resize-y`}
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full flex items-center justify-center gap-2 bg-gold hover:bg-gold-dark disabled:opacity-60 text-white font-bold uppercase text-sm tracking-wider py-3.5 rounded-lg transition-all duration-200 hover:-translate-y-0.5 shadow-md"
            >
              {status === "sending"
                ? t("Slanje...", "Sending...")
                : t("Pošaljite upit", "Send inquiry")}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>

            {status === "success" && (
              <p className="mt-4 text-center text-green text-sm font-medium">
                ✓ {t("Poruka je uspešno poslata! Javićemo vam se uskoro.", "Message sent successfully! We'll get back to you soon.")}
              </p>
            )}
            {status === "error" && (
              <p className="mt-4 text-center text-red-600 text-sm font-medium">
                ✗ {t("Greška pri slanju. Pokušajte ponovo.", "Error sending. Please try again.")}
              </p>
            )}
          </form>

          {/* Info */}
          <div className="flex flex-col gap-5">
            <div className="bg-wood-dark text-cream rounded-xl p-6">
              <h3 className="font-serif text-gold text-xl mb-5">Vikendica Vučetić</h3>
              <ul className="flex flex-col gap-4 text-sm">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  <span className="text-cream/80">
                    {t("Zvorničko jezero, Srbija", "Lake Zvornik, Serbia")}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 015.11 12.68a19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                  </svg>
                  <div className="flex flex-col gap-1">
                    <a href="tel:+381649916926" className="text-cream/80 hover:text-gold transition-colors">+381 64 991 6926</a>
                    <a href="tel:+381665435686" className="text-cream/80 hover:text-gold transition-colors">+381 66 543 5686</a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  <a href="mailto:vikendicavucetic@gmail.com" className="text-cream/80 hover:text-gold transition-colors break-all">
                    vikendicavucetic@gmail.com
                  </a>
                </li>
              </ul>
            </div>
            <div className="relative rounded-xl overflow-hidden aspect-[4/3] shadow-lg">
              <Image
                src="/images/drone-02.jpeg"
                alt="Vikendica Vučetić iz vazduha"
                fill
                className="object-cover"
                sizes="360px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
