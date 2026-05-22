"use client";

import Image from "next/image";
import { useLang } from "@/context/LangContext";

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className="bg-wood-dark py-12">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <Image
          src="/images/logo.jpeg"
          alt="Vikendica Vučetić"
          width={80}
          height={80}
          className="rounded-full mx-auto mb-4 border-2 border-white/15"
        />
        <p className="text-cream/70 text-sm mb-2">
          {t(
            "Zvorničko jezero — vaš odmor, naša gostoprimljivost",
            "Lake Zvornik — your vacation, our hospitality"
          )}
        </p>
        <p className="text-cream/35 text-xs mt-6">
          © 2026 Vikendica Vučetić.{" "}
          {t("Sva prava zadržana.", "All rights reserved.")}
        </p>
      </div>
    </footer>
  );
}
