import type { Metadata } from "next";
import { Inter } from "next/font/google";
// Clash Display: public/fonts/ dizinine woff2 dosyalarını ekledikten sonra aşağıdaki bloğu aç
// import localFont from "next/font/local";
// const clashDisplay = localFont({
//   src: [
//     { path: "../public/fonts/ClashDisplay-Medium.woff2", weight: "500" },
//     { path: "../public/fonts/ClashDisplay-Semibold.woff2", weight: "600" },
//     { path: "../public/fonts/ClashDisplay-Bold.woff2", weight: "700" },
//   ],
//   variable: "--font-clash",
//   display: "swap",
//   fallback: ["system-ui", "sans-serif"],
// });
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "indi. — Fiyatlar İndi, Sen de İndir",
  description:
    "Türkiye'nin büyük markalarındaki indirimleri anında yakala. Kampanya başlamadan haber veren fiyat radarın.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
