import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import BrandLogo from "./brand-logo";

// Deterministik günlük seçim — gün numarasına göre rotate
// Scraper gelene kadar 3 mock ürün arasında dönüyor.
const PICKS = [
  {
    slug: "dyson-v15",
    name: "Dyson V15 Detect",
    brand: "Dyson",
    brandSlug: "dyson",
    yesterdayPrice: 10499,
    todayPrice: 8400,
    imageUrl:
      "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=800&h=600&fit=crop&q=85",
    reason: "Son 12 ayın en düşüğü",
  },
  {
    slug: "iphone-15",
    name: "iPhone 15 128 GB",
    brand: "Apple",
    brandSlug: "apple",
    yesterdayPrice: 50499,
    todayPrice: 48999,
    imageUrl:
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&h=600&fit=crop&q=85",
    reason: "Son 30 günde %8 düşüş",
  },
  {
    slug: "macbook-air-m3",
    name: "MacBook Air M3 13'",
    brand: "Apple",
    brandSlug: "apple",
    yesterdayPrice: 41499,
    todayPrice: 40499,
    imageUrl:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=600&fit=crop&q=85",
    reason: "Editör seçimi",
  },
];

function pickOfTheDay() {
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) /
      86400000
  );
  return PICKS[dayOfYear % PICKS.length];
}

function formatPrice(n: number) {
  return n.toLocaleString("tr-TR") + " ₺";
}

export default function DailyPick() {
  const pick = pickOfTheDay();
  const savings = pick.yesterdayPrice - pick.todayPrice;
  const pct = Math.round((savings / pick.yesterdayPrice) * 100);

  return (
    <section
      aria-labelledby="daily-pick-heading"
      className="w-full bg-[var(--background)] py-10 sm:py-14"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="mb-6 flex items-start justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-accent)]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[var(--color-accent)]">
              <Sparkles className="h-3 w-3" />
              Bugünün sürprizi
            </div>
            <h2
              id="daily-pick-heading"
              className="mt-2 text-2xl font-black text-[var(--foreground)] sm:text-3xl"
            >
              Bir ürün. Bir fiyat. Gece 00:00&apos;da yenilenir.
            </h2>
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl border border-[var(--border)] bg-gradient-to-br from-[var(--color-primary)]/5 via-[var(--surface)] to-[var(--color-accent)]/5">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr]">
            {/* Görsel */}
            <div className="relative aspect-[4/3] md:aspect-auto">
              <Image
                src={pick.imageUrl}
                alt={pick.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent md:bg-gradient-to-r" />
              <div className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-[var(--color-success)] px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wide text-white shadow-md">
                ✓ Bugün %{pct} düştü
              </div>
            </div>

            {/* İçerik */}
            <div className="flex flex-col gap-4 p-5 sm:p-8">
              <div className="flex items-center gap-2">
                <BrandLogo
                  name={pick.brand}
                  logoUrl={`/brands/${pick.brandSlug}.svg`}
                  size={28}
                  radius={6}
                />
                <span className="text-xs font-bold uppercase tracking-wide text-[var(--muted)]">
                  {pick.brand} · {pick.reason}
                </span>
              </div>

              <h3 className="text-xl font-bold leading-tight text-[var(--foreground)] sm:text-2xl">
                {pick.name}
              </h3>

              {/* Price drop — dün / bugün animasyonlu */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-baseline gap-2 text-sm">
                  <span className="font-semibold text-[var(--muted)]">Dün:</span>
                  <span className="tabular-nums text-[var(--muted)] line-through">
                    {formatPrice(pick.yesterdayPrice)}
                  </span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-xs font-bold uppercase tracking-wide text-[var(--color-primary)]">
                    Bugün
                  </span>
                  <span className="text-4xl font-black tabular-nums text-[var(--color-primary)] motion-safe:[animation:number-roll_0.8s_ease-out]">
                    {formatPrice(pick.todayPrice)}
                  </span>
                </div>
                <div className="mt-1 inline-flex w-fit items-center gap-1.5 rounded-full bg-[var(--color-success)]/12 px-2.5 py-0.5 text-xs font-black text-[var(--color-success)]">
                  <span className="tabular-nums">{formatPrice(savings)}</span>
                  <span className="uppercase tracking-wide">aniden düştü</span>
                </div>
              </div>

              <Link
                href={`/fiyat-gecmisi/${pick.slug}`}
                className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-[var(--color-primary)] px-5 py-2.5 text-sm font-bold text-white shadow-md transition-all duration-150 hover:bg-[var(--color-primary-hover)] hover:shadow-lg active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]/50 focus-visible:ring-offset-2"
              >
                Fiyat hikayesine bak
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
