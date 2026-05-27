import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="sr" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;1,400&family=Lato:wght@300;400;700&subset=latin,latin-ext&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
