"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Bell, SlidersHorizontal, X } from "lucide-react";
import { todayDeals, lastHoursDeals, upcomingDeals } from "@/lib/mock-data";
import Header from "@/components/header";
import Footer from "@/components/footer";
import DealCard from "@/components/deal-card";
import Breadcrumb from "@/components/breadcrumb";

const ALL_DEALS = [...lastHoursDeals, ...todayDeals, ...upcomingDeals];

const CATEGORIES = ["Tümü", "Moda", "Elektronik", "Spor", "Güzellik", "Ev & Yaşam"] as const;
const STATUS_FILTERS = [
  { label: "Tümü", value: "tumu" as const },
  { label: "Son Saatler", value: "son-saatler" as const },
  { label: "Bugün", value: "bugun" as const },
  { label: "Yakında", value: "yakinda" as const },
];
const PRICE_RANGES = [
  { label: "Tümü", min: 0, max: Infinity },
  { label: "0-1.000 ₺", min: 0, max: 1000 },
  { label: "1.000-5.000 ₺", min: 1000, max: 5000 },
  { label: "5.000 ₺+", min: 5000, max: Infinity },
];
const SORT_OPTIONS = [
  { label: "En yüksek indirim", value: "discount-desc" },
  { label: "Fiyat: artan", value: "price-asc" },
  { label: "Fiyat: azalan", value: "price-desc" },
  { label: "Biten yakında", value: "ending-soon" },
  { label: "En yeni", value: "newest" },
];
const BADGE_FILTERS = [
  { label: "Gerçek İndirim", key: "real" },
  { label: "Yeni", key: "new" },
  { label: "Çok Satan", key: "hot" },
  { label: "Son Saatler", key: "last" },
  { label: "En Düşük Fiyat", key: "lowest" },
];

export default function KampanyalarPage() {
  const [status, setStatus] = useState<typeof STATUS_FILTERS[number]["value"]>("tumu");
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("Tümü");
  const [minDiscount, setMinDiscount] = useState(10);
  const [priceIdx, setPriceIdx] = useState(0);
  const [brand, setBrand] = useState<string>("Tümü");
  const [activeBadges, setActiveBadges] = useState<Set<string>>(new Set());
  const [sort, setSort] = useState("discount-desc");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const brands = useMemo(() => {
    const uniq = Array.from(new Set(ALL_DEALS.map((d) => d.brand))).sort();
    return ["Tümü", ...uniq];
  }, []);

  const statusFiltered = useMemo(() => {
    if (status === "son-saatler") return lastHoursDeals;
    if (status === "bugun") return todayDeals;
    if (status === "yakinda") return upcomingDeals;
    return ALL_DEALS;
  }, [status]);

  const filtered = useMemo(() => {
    const priceRange = PRICE_RANGES[priceIdx];
    const result = statusFiltered.filter((d) => {
      if (category !== "Tümü" && d.category !== category) return false;
      if (d.discount < minDiscount) return false;
      if (d.salePrice < priceRange.min || d.salePrice >= priceRange.max) return false;
      if (brand !== "Tümü" && d.brand !== brand) return false;

      if (activeBadges.size > 0) {
        const hasBadge = Array.from(activeBadges).some((b) => {
          if (b === "real") {
            return d.price30dAgo !== undefined && d.salePrice <= d.price30dAgo;
          }
          return d.badge === b;
        });
        if (!hasBadge) return false;
      }

      return true;
    });

    return result.sort((a, b) => {
      if (sort === "discount-desc") return b.discount - a.discount;
      if (sort === "price-asc") return a.salePrice - b.salePrice;
      if (sort === "price-desc") return b.salePrice - a.salePrice;
      if (sort === "ending-soon") return a.endsAt.getTime() - b.endsAt.getTime();
      if (sort === "newest") return b.startsAt.getTime() - a.startsAt.getTime();
      return 0;
    });
  }, [statusFiltered, category, minDiscount, priceIdx, brand, activeBadges, sort]);

  const toggleBadge = (key: string) => {
    setActiveBadges((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const reset = () => {
    setStatus("tumu");
    setCategory("Tümü");
    setMinDiscount(10);
    setPriceIdx(0);
    setBrand("Tümü");
    setActiveBadges(new Set());
  };

  const filtersActive =
    status !== "tumu" ||
    category !== "Tümü" ||
    minDiscount !== 10 ||
    priceIdx !== 0 ||
    brand !== "Tümü" ||
    activeBadges.size > 0;

  return (
    <>
      <Header />
      <main className="flex-1 py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 2xl:max-w-[90rem]">
          <Breadcrumb
            className="mb-5"
            items={[{ label: "Ana Sayfa", href: "/" }, { label: "Kampanyalar" }]}
          />

          {/* Page header */}
          <div className="mb-6 flex items-end justify-between gap-3">
            <div>
              <h1 className="text-2xl font-black text-[var(--foreground)] sm:text-3xl">
                Tüm Kampanyalar
              </h1>
              <p className="mt-1 text-sm text-[var(--muted)]">
                {filtered.length} / {ALL_DEALS.length} kampanya listeleniyor
              </p>
            </div>
            {/* Mobile filter toggle */}
            <button
              type="button"
              onClick={() => setMobileFilterOpen((v) => !v)}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--background)] px-3 py-1.5 text-sm font-semibold text-[var(--foreground)] lg:hidden"
            >
              <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
              Filtrele
              {filtersActive && (
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[var(--color-primary)] text-[10px] font-black text-white">
                  •
                </span>
              )}
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">
            {/* Sidebar filters */}
            <aside
              className={`flex-col gap-4 ${mobileFilterOpen ? "fixed inset-0 z-50 overflow-y-auto bg-[var(--background)] p-4 sm:p-6" : "hidden"} lg:flex lg:static lg:z-auto lg:p-0`}
            >
              {mobileFilterOpen && (
                <div className="flex items-center justify-between lg:hidden">
                  <h2 className="text-lg font-bold text-[var(--foreground)]">Filtrele</h2>
                  <button
                    type="button"
                    onClick={() => setMobileFilterOpen(false)}
                    aria-label="Kapat"
                    className="rounded-full p-2 hover:bg-[var(--surface)]"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              )}

              <FilterGroup title="Durum">
                <div className="flex flex-wrap gap-2">
                  {STATUS_FILTERS.map((s) => (
                    <Chip
                      key={s.value}
                      active={status === s.value}
                      onClick={() => setStatus(s.value)}
                    >
                      {s.label}
                    </Chip>
                  ))}
                </div>
              </FilterGroup>

              <FilterGroup title="Kategori">
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map((c) => (
                    <Chip key={c} active={category === c} onClick={() => setCategory(c)}>
                      {c}
                    </Chip>
                  ))}
                </div>
              </FilterGroup>

              <FilterGroup title={`Min. indirim: %${minDiscount}`}>
                <input
                  type="range"
                  min={10}
                  max={90}
                  step={5}
                  value={minDiscount}
                  onChange={(e) => setMinDiscount(Number(e.target.value))}
                  aria-label="Minimum indirim"
                  className="w-full accent-[var(--color-primary)]"
                />
                <div className="flex justify-between text-[10px] font-semibold text-[var(--muted)]">
                  <span>%10</span>
                  <span>%50</span>
                  <span>%90</span>
                </div>
              </FilterGroup>

              <FilterGroup title="Fiyat aralığı">
                <div className="flex flex-wrap gap-2">
                  {PRICE_RANGES.map((r, i) => (
                    <Chip
                      key={r.label}
                      active={priceIdx === i}
                      onClick={() => setPriceIdx(i)}
                      variant="price"
                    >
                      {r.label}
                    </Chip>
                  ))}
                </div>
              </FilterGroup>

              <FilterGroup title="Marka">
                <div className="flex max-h-48 flex-col gap-1 overflow-y-auto">
                  {brands.map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setBrand(b)}
                      aria-pressed={brand === b}
                      className={`rounded-md px-2 py-1.5 text-left text-sm transition-colors ${
                        brand === b
                          ? "bg-[var(--color-primary)]/10 font-bold text-[var(--color-primary)]"
                          : "text-[var(--foreground)] hover:bg-[var(--surface)]"
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </FilterGroup>

              <FilterGroup title="Rozet">
                <div className="flex flex-wrap gap-2">
                  {BADGE_FILTERS.map((b) => (
                    <Chip
                      key={b.key}
                      active={activeBadges.has(b.key)}
                      onClick={() => toggleBadge(b.key)}
                      variant="badge"
                    >
                      {b.label}
                    </Chip>
                  ))}
                </div>
              </FilterGroup>

              {filtersActive && (
                <button
                  type="button"
                  onClick={reset}
                  className="rounded-full border border-[var(--color-danger)]/40 px-3 py-1.5 text-sm font-semibold text-[var(--color-danger)] hover:bg-[var(--color-danger)]/5"
                >
                  Filtreleri temizle
                </button>
              )}

              {mobileFilterOpen && (
                <button
                  type="button"
                  onClick={() => setMobileFilterOpen(false)}
                  className="mt-4 rounded-full bg-[var(--color-primary)] py-3 text-sm font-bold text-white lg:hidden"
                >
                  {filtered.length} kampanyayı göster
                </button>
              )}
            </aside>

            {/* Results */}
            <div>
              {/* Sort bar */}
              <div className="mb-4 flex items-center justify-between gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2 sm:px-4">
                <span className="text-xs font-semibold text-[var(--muted)]">
                  {filtered.length} sonuç
                </span>
                <label className="flex items-center gap-2 text-xs">
                  <span className="font-semibold text-[var(--muted)]">Sırala:</span>
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    aria-label="Sıralama"
                    className="rounded-md border border-[var(--border)] bg-[var(--background)] px-2 py-1 text-xs font-semibold text-[var(--foreground)] outline-none focus:border-[var(--color-primary)]"
                  >
                    {SORT_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              {filtered.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {filtered.map((deal) => (
                    <DealCard
                      key={deal.id}
                      deal={deal}
                      variant={deal.badge === "last" ? "last-hours" : "default"}
                    />
                  ))}
                </div>
              ) : (
                <div className="rounded-3xl border border-dashed border-[var(--border)] bg-[var(--surface)] p-8 text-center sm:p-12">
                  <p className="text-sm font-bold text-[var(--foreground)] sm:text-base">
                    Radar bu filtrelerde sessiz.
                  </p>
                  <p className="mx-auto mt-1 max-w-md text-xs text-[var(--muted)] sm:text-sm">
                    Filtreyi gevşet ya da yeni kampanya geldiğinde haber verelim.
                  </p>
                  <div className="mt-4 flex flex-col items-center justify-center gap-2 sm:flex-row">
                    <button
                      type="button"
                      onClick={reset}
                      className="rounded-full border border-[var(--border)] px-4 py-2 text-xs font-semibold text-[var(--foreground)] transition-colors hover:border-[var(--color-primary)]/40 hover:text-[var(--color-primary)]"
                    >
                      Filtreleri sıfırla
                    </button>
                    <Link
                      href="/giris"
                      className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-primary)] px-4 py-2 text-xs font-bold text-white transition-all duration-150 hover:bg-[var(--color-primary-hover)] active:scale-[0.97]"
                    >
                      <Bell className="h-3.5 w-3.5" />
                      Kampanya gelince haber ver
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function FilterGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2 border-b border-[var(--border)] pb-4 last:border-b-0">
      <h3 className="text-[11px] font-bold uppercase tracking-widest text-[var(--muted)]">
        {title}
      </h3>
      {children}
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
  variant = "default",
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  variant?: "default" | "price" | "badge";
}) {
  const activeClass =
    variant === "price"
      ? "bg-[var(--foreground)] text-[var(--background)]"
      : variant === "badge"
      ? "bg-[var(--color-accent)] text-white"
      : "bg-[var(--color-primary)] text-white";
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full px-3 py-1 text-[11px] font-bold transition-all duration-150 active:scale-95 sm:text-xs ${
        active
          ? activeClass + " shadow-sm"
          : "border border-[var(--border)] bg-[var(--background)] text-[var(--muted)] hover:border-[var(--color-primary)]/40 hover:text-[var(--foreground)]"
      }`}
    >
      {children}
    </button>
  );
}
