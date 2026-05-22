import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-lato",
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
    <html lang="sr" className={`${playfair.variable} ${lato.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
