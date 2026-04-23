import Link from "next/link";
import { Bell, LineChart, ArrowLeftRight, ArrowRight } from "lucide-react";

// Inline SVG sparkline — 90 günlük fiyat trendi (mock, anlamlı şekil)
function MiniSparkline() {
  const points = [65, 58, 62, 55, 48, 52, 45, 38, 42, 35, 30];
  const w = 100;
  const h = 30;
  const step = w / (points.length - 1);
  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min;
  const path = points
    .map((p, i) => {
      const x = i * step;
      const y = h - ((p - min) / range) * h;
      return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");
  const lastX = (points.length - 1) * step;
  const lastY = h - ((points[points.length - 1] - min) / range) * h;

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className="h-8 w-full"
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="spark-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.3" />
          <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d={`${path} L ${lastX} ${h} L 0 ${h} Z`}
        fill="url(#spark-fill)"
      />
      <path
        d={path}
        fill="none"
        stroke="var(--color-primary)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx={lastX} cy={lastY} r="2" fill="var(--color-primary)" />
    </svg>
  );
}

// Karşılaştırma mock — aynı ürün farklı markalarda
const COMPARE = [
  { brand: "Trendyol", price: 48999, best: true },
  { brand: "Hepsiburada", price: 49499, best: false },
  { brand: "MediaMarkt", price: 49999, best: false },
];

function formatPrice(n: number) {
  return n.toLocaleString("tr-TR") + " ₺";
}

export default function RadarFeatures() {
  return (
    <section
      id="radar"
      aria-labelledby="radar-heading"
      className="w-full border-y border-[var(--border)] bg-[var(--background)] py-10 sm:py-14"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 2xl:max-w-[90rem]">
        <div className="mb-8 text-center sm:mb-10">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-primary)]">
            Radar ne yapar?
          </p>
          <h2
            id="radar-heading"
            className="mt-2 text-2xl font-black text-[var(--foreground)] sm:text-3xl"
          >
            Sadece vitrin değil — gerçek bir fiyat takip sistemi
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-[var(--muted)] sm:text-base">
            Alarm kur, fiyat geçmişini gör, markalar arası karşılaştır. Sahte indirimi sana biz söyleyelim.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* 1. Fiyat Alarmı */}
          <article className="group flex flex-col gap-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 transition-all duration-150 hover:-translate-y-0.5 hover:border-[var(--color-primary)]/40 hover:shadow-md">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                <Bell className="h-5 w-5" />
              </span>
              <h3 className="text-base font-bold text-[var(--foreground)]">
                Fiyat Alarmı
              </h3>
            </div>
            <p className="text-sm text-[var(--muted)]">
              Hedef fiyatını belirle, oraya düştüğünde e-posta ile haber veriyoruz.
            </p>
            {/* Mini demo — alarm formu görünümü */}
            <div className="mt-auto rounded-xl border border-[var(--border)] bg-[var(--background)] p-3">
              <p className="text-[10px] font-bold uppercase tracking-wide text-[var(--muted)]">
                Örnek alarm
              </p>
              <p className="mt-1 text-sm font-semibold text-[var(--foreground)]">
                iPhone 15 →{" "}
                <span className="text-[var(--color-primary)] tabular-nums">
                  45.000 ₺
                </span>
              </p>
              <p className="mt-0.5 text-[11px] text-[var(--muted)]">
                Şu an 48.999 ₺ · hedefe 3.999 ₺ kaldı
              </p>
            </div>
          </article>

          {/* 2. Fiyat Geçmişi */}
          <article className="group flex flex-col gap-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 transition-all duration-150 hover:-translate-y-0.5 hover:border-[var(--color-primary)]/40 hover:shadow-md">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                <LineChart className="h-5 w-5" />
              </span>
              <h3 className="text-base font-bold text-[var(--foreground)]">
                Fiyat Geçmişi
              </h3>
            </div>
            <p className="text-sm text-[var(--muted)]">
              Son 90 günde fiyat nasıl oynadı? Kampanya gerçekten fırsat mı, sahte indirim mi?
            </p>
            {/* Mini demo — sparkline */}
            <div className="mt-auto rounded-xl border border-[var(--border)] bg-[var(--background)] p-3">
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-bold uppercase tracking-wide text-[var(--muted)]">
                  Son 90 gün
                </p>
                <span className="rounded-full bg-[var(--color-success)]/15 px-1.5 py-0.5 text-[10px] font-bold text-[var(--color-success)]">
                  ↓ %38
                </span>
              </div>
              <MiniSparkline />
              <p className="mt-1 flex items-center justify-between text-[11px] text-[var(--muted)]">
                <span>Max: 3.899 ₺</span>
                <span className="font-bold text-[var(--color-primary)]">
                  Şimdi: 2.399 ₺
                </span>
              </p>
            </div>
          </article>

          {/* 3. Karşılaştırma */}
          <article className="group flex flex-col gap-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 transition-all duration-150 hover:-translate-y-0.5 hover:border-[var(--color-primary)]/40 hover:shadow-md">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                <ArrowLeftRight className="h-5 w-5" />
              </span>
              <h3 className="text-base font-bold text-[var(--foreground)]">
                Marka Karşılaştırması
              </h3>
            </div>
            <p className="text-sm text-[var(--muted)]">
              Aynı ürün farklı markalarda ne kadar? En uygun fiyatı biz bulalım.
            </p>
            {/* Mini demo — karşılaştırma tablosu */}
            <div className="mt-auto flex flex-col gap-1.5 rounded-xl border border-[var(--border)] bg-[var(--background)] p-3">
              <p className="text-[10px] font-bold uppercase tracking-wide text-[var(--muted)]">
                iPhone 15 · bugün
              </p>
              {COMPARE.map((c) => (
                <div
                  key={c.brand}
                  className={`flex items-center justify-between rounded-md px-2 py-1 text-xs ${
                    c.best
                      ? "bg-[var(--color-success)]/10 font-bold text-[var(--foreground)]"
                      : "text-[var(--muted)]"
                  }`}
                >
                  <span>
                    {c.brand}
                    {c.best && (
                      <span className="ml-1.5 text-[var(--color-success)]">
                        ✓ en uygun
                      </span>
                    )}
                  </span>
                  <span className="tabular-nums">{formatPrice(c.price)}</span>
                </div>
              ))}
            </div>
          </article>
        </div>

        {/* Alt CTA */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 text-center sm:flex-row">
          <Link
            href="/giris"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--color-primary)] px-6 py-3 text-sm font-bold text-white shadow-md transition-all duration-150 hover:bg-[var(--color-primary-hover)] hover:shadow-lg active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]/50 focus-visible:ring-offset-2"
          >
            Hesap oluştur, radar kur
            <ArrowRight className="h-4 w-4" />
          </Link>
          <span className="text-xs text-[var(--muted)]">
            Ücretsiz · 30 saniye · kart bilgisi istemiyoruz
          </span>
        </div>
      </div>
    </section>
  );
}
