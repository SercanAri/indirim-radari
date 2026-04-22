"use client";

import { useState } from "react";

interface MarqueeBrand {
  name: string;
  slug: string;
  /** Brand accent color — used when logo doesn't load */
  color: string;
}

const MARQUEE_BRANDS: MarqueeBrand[] = [
  { name: "Trendyol", slug: "trendyol", color: "#F27A1A" },
  { name: "Hepsiburada", slug: "hepsiburada", color: "#FF6000" },
  { name: "Nike", slug: "nike", color: "#111111" },
  { name: "Adidas", slug: "adidas", color: "#000000" },
  { name: "Zara", slug: "zara", color: "#000000" },
  { name: "LC Waikiki", slug: "lcwaikiki", color: "#0057A8" },
  { name: "H&M", slug: "hm", color: "#E50010" },
  { name: "MediaMarkt", slug: "mediamarkt", color: "#DF0000" },
  { name: "Teknosa", slug: "teknosa", color: "#005DAA" },
  { name: "Apple", slug: "apple", color: "#111111" },
  { name: "Samsung", slug: "samsung", color: "#1428A0" },
  { name: "Sephora", slug: "sephora", color: "#000000" },
  { name: "Mango", slug: "mango", color: "#000000" },
  { name: "Koton", slug: "koton", color: "#000000" },
  { name: "Boyner", slug: "boyner", color: "#E30613" },
  { name: "Dyson", slug: "dyson", color: "#111111" },
  { name: "Watsons", slug: "watsons", color: "#009A44" },
  { name: "Mavi", slug: "mavi", color: "#002D5B" },
  { name: "DeFacto", slug: "defacto", color: "#E30613" },
  { name: "Gratis", slug: "gratis", color: "#E6007E" },
];

function BrandChip({ brand }: { brand: MarqueeBrand }) {
  const [failed, setFailed] = useState(false);

  const initials = brand.name
    .split(/[\s&-]+/)
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <a
      href={`/marka/${brand.slug}`}
      title={brand.name}
      className="group flex h-16 shrink-0 items-center gap-3 rounded-2xl border border-[var(--border)] bg-[var(--background)] px-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--color-primary)]/50 hover:shadow-md sm:h-[72px] sm:gap-3.5 sm:px-5"
      aria-label={brand.name}
    >
      {/* Logo square */}
      <div
        className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white ring-1 ring-black/5 sm:h-11 sm:w-11"
        style={failed ? { background: brand.color } : undefined}
      >
        {!failed ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={`/brands/${brand.slug}.svg`}
            alt=""
            width={44}
            height={44}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-contain p-1.5"
            onError={() => setFailed(true)}
          />
        ) : (
          <span className="text-sm font-black text-white">{initials}</span>
        )}
      </div>

      {/* Brand name */}
      <span className="text-sm font-bold text-[var(--foreground)] transition-colors group-hover:text-[var(--color-primary)] sm:text-base">
        {brand.name}
      </span>
    </a>
  );
}

export default function BrandsMarquee() {
  // Duplicate for seamless loop
  const loop = [...MARQUEE_BRANDS, ...MARQUEE_BRANDS];

  return (
    <section className="relative w-full overflow-hidden border-y border-[var(--border)] bg-[var(--surface)] py-7 sm:py-9">
      {/* Header */}
      <div className="mx-auto mb-5 max-w-7xl px-4 sm:px-6">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-accent)] opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[var(--color-accent)]" />
            </span>
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--muted)] sm:text-sm">
              200+ Markada <span className="text-[var(--foreground)]">canlı</span> fiyat takibi
            </p>
          </div>
          <span className="hidden text-xs italic text-[var(--muted)] sm:block">
            &ldquo;Radar açık, cüzdanlar teyakkuzda.&rdquo;
          </span>
        </div>
      </div>

      {/* Marquee rail */}
      <div className="marquee-pause relative">
        {/* Edge fade masks */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-[var(--surface)] to-transparent sm:w-32" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-[var(--surface)] to-transparent sm:w-32" />

        <div className="animate-marquee flex gap-3 sm:gap-4">
          {loop.map((brand, i) => (
            <BrandChip key={`${brand.slug}-${i}`} brand={brand} />
          ))}
        </div>
      </div>
    </section>
  );
}
