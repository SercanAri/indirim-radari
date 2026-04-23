import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "indi. — Radar açık, fiyatlar düşüyor",
    short_name: "indi.",
    description:
      "200+ markanın indirimlerini tek ekranda takip et. Fiyat alarmı, canlı kampanya radarı, erken bildirim.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#e11d48",
    orientation: "portrait-primary",
    lang: "tr-TR",
    categories: ["shopping", "lifestyle", "finance"],
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "maskable" },
    ],
  };
}
