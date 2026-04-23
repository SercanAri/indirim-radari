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
  title: "indi. — Radar açık, fiyatlar düşüyor",
  description:
    "200+ markanın indirimlerini tek ekranda takip et. Radar açık, fiyatlar düşüyor. Kaçırmadan önce haber veriyoruz.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Inline script runs before React hydration to prevent FOUC.
  // Reads persisted theme (or system preference) and sets <html class="dark"> early.
  const themeInitScript = `(function(){try{var t=localStorage.getItem('theme');if(!t)t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';if(t==='dark')document.documentElement.classList.add('dark');}catch(e){}})();`;

  return (
    <html lang="tr" className={`${inter.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
