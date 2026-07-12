import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import WhatsAppButton from "@/components/WhatsAppButton";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const lato = Lato({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vikendica Vučetić — Zvorničko jezero",
  description:
    "Autentična drvena vikendica direktno na obali Zvorničkog jezera. Terasa na vodi, roštilj paviljon, spavaće sobe i mir u srcu prirode.",
  openGraph: {
    title: "Vikendica Vučetić",
    description: "Odmor na vodi, u srcu prirode — Zvorničko jezero",
    images: ["/images/exterior-wide.jpeg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sr" className={`h-full antialiased ${playfair.variable} ${lato.variable}`}>
      <body className="min-h-full flex flex-col">
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
