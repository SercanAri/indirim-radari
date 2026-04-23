import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Bell,
  CheckCircle2,
  Share2,
  TrendingDown,
  TrendingUp,
  MessageCircle,
} from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Breadcrumb from "@/components/breadcrumb";
import BrandLogo from "@/components/brand-logo";
import PriceHistoryChart from "@/components/price-history-chart";
import { PRODUCTS, findProduct } from "@/lib/price-history-data";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = findProduct(slug);
  if (!product) return { title: "Fiyat Geçmişi" };
  const current = product.history[product.history.length - 1].price;
  const description = `${product.name} için son 12 ay fiyat geçmişi, en düşük/yüksek analizi ve marka karşılaştırması. Şu an: ${current.toLocaleString("tr-TR")} ₺.`;
  return {
    title: `${product.name} Fiyat Geçmişi`,
    description,
    openGraph: {
      title: `${product.name} — 12 aylık fiyat geçmişi`,
      description,
      type: "article",
      images: [{ url: product.imageUrl, width: 800, height: 600, alt: product.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} — 12 aylık fiyat geçmişi`,
      description,
      images: [product.imageUrl],
    },
  };
}

function score(current: number, min: number, avg: number) {
  // Algoritma: şu anki fiyat min+%5 altındaysa AL, ortalamanın üstündeyse ALMA, aradaysa BEKLE.
  const nearMin = current <= min * 1.05;
  if (nearMin) {
    return {
      label: "AL",
      emoji: "🟢",
      color: "var(--color-success)",
      bg: "bg-[var(--color-success)]/15",
      text: "text-[var(--color-success)]",
      reason: "Son 12 ayın en düşük fiyatlarına yakın — fırsat.",
    };
  }
  if (current > avg) {
    return {
      label: "ALMA",
      emoji: "🔴",
      color: "var(--color-danger)",
      bg: "bg-[var(--color-danger)]/15",
      text: "text-[var(--color-danger)]",
      reason: "Ortalamanın üstünde. İndirime girmesini bekle.",
    };
  }
  return {
    label: "BEKLE",
    emoji: "🟡",
    color: "var(--color-accent)",
    bg: "bg-[var(--color-accent)]/15",
    text: "text-[var(--color-accent)]",
    reason: "Ortalamaya yakın. Alarm kur, daha iyisi gelebilir.",
  };
}

export default async function FiyatGecmisiPage({ params }: Props) {
  const { slug } = await params;
  const product = findProduct(slug);
  if (!product) notFound();

  const prices = product.history.map((h) => h.price);
  const current = prices[prices.length - 1];
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const avg = Math.round(prices.reduce((a, b) => a + b, 0) / prices.length);
  const sc = score(current, min, avg);
  const pctFromMax = Math.round(((max - current) / max) * 100);

  const shareText = `${product.name} şu an ${current.toLocaleString("tr-TR")} ₺ — 12 aylık fiyat geçmişi:`;
  const shareUrl = `https://indirim-radari-wsae.vercel.app/fiyat-gecmisi/${product.slug}`;

  // JSON-LD Product schema with price history highlight
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    brand: { "@type": "Brand", name: product.brand },
    category: product.category,
    image: product.imageUrl,
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "TRY",
      lowPrice: min.toString(),
      highPrice: max.toString(),
      offerCount: product.competitors.length,
    },
  };

  return (
    <>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="flex-1 py-8 sm:py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <Breadcrumb
            className="mb-5"
            items={[
              { label: "Ana Sayfa", href: "/" },
              { label: "Fiyat Geçmişi" },
              { label: product.name },
            ]}
          />

          {/* Product header */}
          <div className="mb-6 flex flex-col gap-5 rounded-3xl border border-[var(--border)] bg-[var(--background)] p-5 sm:flex-row sm:items-center sm:p-6">
            <div className="relative h-40 w-full shrink-0 overflow-hidden rounded-2xl bg-[var(--surface)] sm:h-32 sm:w-32">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 128px"
                priority
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <BrandLogo
                  name={product.brand}
                  logoUrl={`/brands/${product.brandSlug}.svg`}
                  size={24}
                  radius={6}
                />
                <span className="text-xs font-bold uppercase tracking-wide text-[var(--muted)]">
                  {product.brand} · {product.category}
                </span>
              </div>
              <h1 className="mt-1 text-2xl font-black leading-tight text-[var(--foreground)] sm:text-3xl">
                {product.name}
              </h1>
              <div className="mt-3 flex flex-wrap items-baseline gap-3">
                <span className="text-3xl font-black tabular-nums text-[var(--color-primary)]">
                  {current.toLocaleString("tr-TR")} ₺
                </span>
                <span className="text-sm text-[var(--muted)]">
                  Son 12 ayın en düşüğü{" "}
                  <span className="font-bold text-[var(--color-success)] tabular-nums">
                    {min.toLocaleString("tr-TR")} ₺
                  </span>
                </span>
              </div>
            </div>

            {/* Score badge */}
            <div
              className={`flex shrink-0 flex-col items-center gap-1 rounded-2xl px-5 py-4 ${sc.bg}`}
            >
              <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted)]">
                Şu an
              </span>
              <span className={`text-2xl font-black ${sc.text}`}>
                {sc.emoji} {sc.label}
              </span>
              <span className="max-w-[140px] text-center text-[11px] text-[var(--muted)]">
                {sc.reason}
              </span>
            </div>
          </div>

          {/* Stats row */}
          <div className="mb-6 grid grid-cols-3 gap-3 sm:gap-4">
            <StatCard
              icon={TrendingDown}
              label="En düşük"
              value={`${min.toLocaleString("tr-TR")} ₺`}
              color="success"
            />
            <StatCard
              icon={TrendingUp}
              label="En yüksek"
              value={`${max.toLocaleString("tr-TR")} ₺`}
              color="danger"
            />
            <StatCard
              icon={CheckCircle2}
              label="Ortalama"
              value={`${avg.toLocaleString("tr-TR")} ₺`}
              color="primary"
            />
          </div>

          {/* Chart */}
          <div className="mb-8">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-bold text-[var(--foreground)]">
                Son 12 ayın fiyat hikayesi
              </h2>
              <span className="text-xs text-[var(--muted)]">
                Zirveye göre %{pctFromMax} aşağıda
              </span>
            </div>
            <PriceHistoryChart history={product.history} currentPrice={current} />
          </div>

          {/* Marka karşılaştırma */}
          <div className="mb-8">
            <h2 className="mb-3 text-lg font-bold text-[var(--foreground)]">
              Aynı ürün, farklı markalar
            </h2>
            <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--background)]">
              {product.competitors
                .sort((a, b) => a.price - b.price)
                .map((c, i) => {
                  const isBest = i === 0;
                  return (
                    <div
                      key={c.brand}
                      className={`flex items-center justify-between gap-3 border-b border-[var(--border)] p-4 last:border-b-0 ${
                        isBest ? "bg-[var(--color-success)]/8" : ""
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <BrandLogo
                          name={c.brand}
                          logoUrl={`/brands/${c.logoSlug}.svg`}
                          size={32}
                          radius={8}
                        />
                        <div>
                          <p className="text-sm font-bold text-[var(--foreground)]">
                            {c.brand}
                          </p>
                          {isBest && (
                            <p className="text-[10px] font-bold uppercase tracking-wide text-[var(--color-success)]">
                              ✓ En uygun
                            </p>
                          )}
                        </div>
                      </div>
                      <span className="text-lg font-black tabular-nums text-[var(--foreground)]">
                        {c.price.toLocaleString("tr-TR")} ₺
                      </span>
                    </div>
                  );
                })}
            </div>
          </div>

          {/* Alarm CTA */}
          <div className="mb-8 rounded-3xl border border-[var(--color-primary)]/30 bg-gradient-to-br from-[var(--color-primary)]/8 via-[var(--surface)] to-[var(--color-accent)]/6 p-5 sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--color-primary)]/15 text-[var(--color-primary)]">
                <Bell className="h-5 w-5" aria-hidden="true" />
              </span>
              <div className="flex-1 min-w-0">
                <h2 className="text-base font-bold text-[var(--foreground)]">
                  Hedef fiyat belirle, radar açık kalsın
                </h2>
                <p className="mt-0.5 text-xs text-[var(--muted)]">
                  Fiyat hedefine düştüğünde e-posta ile haber veriyoruz.
                </p>
              </div>
              <form action="#" method="post" className="flex items-center gap-2">
                <input
                  type="number"
                  name="target"
                  placeholder={`${Math.round(min * 0.95).toLocaleString("tr-TR")}`}
                  aria-label="Hedef fiyat"
                  className="w-28 rounded-full border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm tabular-nums outline-none focus:border-[var(--color-primary)]"
                />
                <span className="text-sm font-bold text-[var(--muted)]">₺</span>
                <button
                  type="submit"
                  className="shrink-0 rounded-full bg-[var(--color-primary)] px-4 py-2 text-sm font-bold text-white shadow-sm transition-all duration-150 hover:bg-[var(--color-primary-hover)] active:scale-[0.97]"
                >
                  Alarm Kur
                </button>
              </form>
            </div>
          </div>

          {/* Paylaş */}
          <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-[var(--border)] bg-[var(--background)] p-4">
            <Share2 className="h-4 w-4 shrink-0 text-[var(--muted)]" aria-hidden="true" />
            <span className="text-sm font-semibold text-[var(--foreground)]">
              Bu sayfayı paylaş:
            </span>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] px-3 py-1.5 text-xs font-semibold text-[var(--foreground)] transition-all duration-150 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] active:scale-[0.97]"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              X
            </a>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] px-3 py-1.5 text-xs font-semibold text-[var(--foreground)] transition-all duration-150 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] active:scale-[0.97]"
            >
              <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
              WhatsApp
            </a>
          </div>

          {/* Diğer ürünler */}
          <div className="mt-10">
            <h2 className="mb-4 text-lg font-bold text-[var(--foreground)]">
              Diğer takip ettiğimiz ürünler
            </h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {PRODUCTS.filter((p) => p.slug !== product.slug).map((p) => {
                const pc = p.history[p.history.length - 1].price;
                return (
                  <Link
                    key={p.slug}
                    href={`/fiyat-gecmisi/${p.slug}`}
                    className="group flex flex-col gap-2 rounded-2xl border border-[var(--border)] bg-[var(--background)] p-4 transition-all duration-150 hover:-translate-y-0.5 hover:border-[var(--color-primary)]/40 hover:shadow-md"
                  >
                    <p className="text-[10px] font-bold uppercase tracking-wide text-[var(--muted)]">
                      {p.brand}
                    </p>
                    <p className="text-sm font-bold text-[var(--foreground)]">{p.name}</p>
                    <p className="text-base font-black tabular-nums text-[var(--color-primary)]">
                      {pc.toLocaleString("tr-TR")} ₺
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: typeof Bell;
  label: string;
  value: string;
  color: "success" | "danger" | "primary";
}) {
  const styles = {
    success: "bg-[var(--color-success)]/10 text-[var(--color-success)]",
    danger: "bg-[var(--color-danger)]/10 text-[var(--color-danger)]",
    primary: "bg-[var(--color-primary)]/10 text-[var(--color-primary)]",
  }[color];
  return (
    <div className="flex flex-col gap-1.5 rounded-2xl border border-[var(--border)] bg-[var(--background)] p-3 sm:p-4">
      <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${styles}`}>
        <Icon className="h-4 w-4" aria-hidden="true" />
      </span>
      <p className="text-[10px] font-bold uppercase tracking-wide text-[var(--muted)]">
        {label}
      </p>
      <p className="text-base font-black tabular-nums text-[var(--foreground)] sm:text-lg">
        {value}
      </p>
    </div>
  );
}
