import type { MetadataRoute } from "next";
import { categories } from "@/lib/mock-data";

const BASE = process.env.NEXT_PUBLIC_APP_URL || "https://indirim-radari-wsae.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE, priority: 1.0, changeFrequency: "hourly", lastModified: now },
    { url: `${BASE}/kampanyalar`, priority: 0.9, changeFrequency: "hourly", lastModified: now },
    { url: `${BASE}/markalar`, priority: 0.8, changeFrequency: "daily", lastModified: now },
    { url: `${BASE}/favorilerim`, priority: 0.6, changeFrequency: "daily", lastModified: now },
    { url: `${BASE}/hakkimizda`, priority: 0.5, changeFrequency: "monthly", lastModified: now },
    { url: `${BASE}/giris`, priority: 0.4, changeFrequency: "yearly", lastModified: now },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${BASE}/kategori/${c.slug}`,
    priority: 0.7,
    changeFrequency: "daily",
    lastModified: now,
  }));

  return [...staticRoutes, ...categoryRoutes];
}
