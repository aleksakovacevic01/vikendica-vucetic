"use client";

import { createContext, useContext, useState } from "react";

type Lang = "sr" | "en";

type LangContextType = {
  lang: Lang;
  toggle: () => void;
  t: (sr: string, en: string) => string;
};

const LangContext = createContext<LangContextType>({
  lang: "sr",
  toggle: () => {},
  t: (sr) => sr,
});

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("sr");
  const toggle = () => setLang((l) => (l === "sr" ? "en" : "sr"));
  const t = (sr: string, en: string) => (lang === "sr" ? sr : en);

  return (
    <LangContext.Provider value={{ lang, toggle, t }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
