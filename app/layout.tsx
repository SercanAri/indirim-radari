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

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://indirim-radari-wsae.vercel.app";
const SITE_NAME = "indi.";
const DEFAULT_TITLE = "indi. — Radar açık, fiyatlar düşüyor";
const DEFAULT_DESCRIPTION =
  "200+ markanın indirimlerini tek ekranda takip et. Radar açık, fiyatlar düşüyor. Kaçırmadan önce haber veriyoruz.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: "%s — indi.",
  },
  description: DEFAULT_DESCRIPTION,
  keywords: [
    "indirim takibi",
    "fiyat takibi",
    "kampanya",
    "Türkiye indirim",
    "fiyat alarmı",
    "fiyat geçmişi",
    "Trendyol indirim",
    "Hepsiburada indirim",
  ],
  authors: [{ name: "indi." }],
  creator: "indi.",
  publisher: "indi.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    creator: "@indiradari",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Inline script runs before React hydration to prevent FOUC.
  // Reads persisted theme (or system preference) and sets <html class="dark"> early.
  const themeInitScript = `(function(){try{var t=localStorage.getItem('theme');if(!t)t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';if(t==='dark')document.documentElement.classList.add('dark');}catch(e){}})();`;

  // Schema.org — Organization + WebSite + SearchAction.
  // Google rich results için kritik; indirim siteleri için özellikle SearchAction.
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}/icon.svg`,
        slogan: "Radar açık, fiyatlar düşüyor.",
        areaServed: { "@type": "Country", name: "Türkiye" },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        description: DEFAULT_DESCRIPTION,
        publisher: { "@id": `${SITE_URL}/#organization` },
        inLanguage: "tr-TR",
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${SITE_URL}/kampanyalar?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };

  return (
    <html lang="tr" className={`${inter.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
