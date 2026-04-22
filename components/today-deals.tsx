"use client";

import { useMemo, useState } from "react";
import { todayDeals } from "@/lib/mock-data";
import DealCard from "./deal-card";

const CATEGORIES = ["Tümü", "Moda", "Elektronik", "Spor", "Güzellik"] as const;
type Category = (typeof CATEGORIES)[number];

const MIN_DISCOUNTS = [
  { label: "Tümü", value: 0 },
  { label: "%30+", value: 30 },
  { label: "%50+", value: 50 },
  { label: "%70+", value: 70 },
] as const;

const PRICE_RANGES = [
  { label: "Tümü", min: 0, max: Infinity },
  { label: "0-1.000 ₺", min: 0, max: 1000 },
  { label: "1.000-5.000 ₺", min: 1000, max: 5000 },
  { label: "5.000 ₺+", min: 5000, max: Infinity },
] as const;

export default function TodayDeals() {
  const [category, setCategory] = useState<Category>("Tümü");
  const [minDiscount, setMinDiscount] = useState(0);
  const [priceRangeIdx, setPriceRangeIdx] = useState(0);
  const [brand, setBrand] = useState<string>("Tümü");

  const brands = useMemo(() => {
    const unique = Array.from(new Set(todayDeals.map((d) => d.brand))).sort();
    return ["Tümü", ...unique];
  }, []);

  const filtered = useMemo(() => {
    const range = PRICE_RANGES[priceRangeIdx];
    return todayDeals.filter((d) => {
      const matchCat = category === "Tümü" || d.category === category;
      const matchDisc = d.discount >= minDiscount;
      const matchPrice = d.salePrice >= range.min && d.salePrice < range.max;
      const matchBrand = brand === "Tümü" || d.brand === brand;
      return matchCat && matchDisc && matchPrice && matchBrand;
    });
  }, [category, minDiscount, priceRangeIdx, brand]);

  const resetFilters = () => {
    setCategory("Tümü");
    setMinDiscount(0);
    setPriceRangeIdx(0);
    setBrand("Tümü");
  };

  const filtersActive =
    category !== "Tümü" || minDiscount > 0 || priceRangeIdx > 0 || brand !== "Tümü";

  return (
    <section id="bugun" className="w-full py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 2xl:max-w-[90rem]">
        <div className="mb-5 flex items-start justify-between gap-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[var(--foreground)]">
              Bugün Başlayanlar
            </h2>
            <p className="mt-0.5 text-sm text-[var(--muted)]">
              {filtered.length} / {todayDeals.length} kampanya
            </p>
          </div>
          <a
            href="/bugun"
            className="mt-1 shrink-0 text-sm font-semibold text-[var(--color-primary)] transition-colors hover:underline"
          >
            Tümünü Gör →
          </a>
        </div>

        {/* Filter stack */}
        <div className="mb-5 flex flex-col gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-3 sm:p-4">
          {/* Row 1: Kategori (primary filter) */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wide text-[var(--muted)]">
              Kategori
            </span>
            {CATEGORIES.map((cat) => {
              const active = cat === category;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  aria-pressed={active}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition-all duration-150 active:scale-95 sm:text-sm ${
                    active
                      ? "bg-[var(--color-primary)] text-white shadow-md"
                      : "border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] hover:border-[var(--color-primary)]/50 hover:text-[var(--color-primary)]"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Row 2: Min indirim + Fiyat aralığı */}
          <div className="flex flex-col gap-3 border-t border-[var(--border)] pt-3 md:flex-row md:items-center md:gap-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wide text-[var(--muted)]">
                Min. indirim
              </span>
              {MIN_DISCOUNTS.map((opt) => {
                const active = opt.value === minDiscount;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setMinDiscount(opt.value)}
                    aria-pressed={active}
                    className={`rounded-full px-3 py-1 text-[11px] font-bold transition-all duration-150 active:scale-95 sm:text-xs ${
                      active
                        ? "bg-[var(--color-accent)] text-white shadow-sm"
                        : "border border-[var(--border)] bg-[var(--background)] text-[var(--muted)] hover:border-[var(--color-accent)]/50 hover:text-[var(--color-accent)]"
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wide text-[var(--muted)]">
                Fiyat
              </span>
              {PRICE_RANGES.map((range, i) => {
                const active = i === priceRangeIdx;
                return (
                  <button
                    key={range.label}
                    type="button"
                    onClick={() => setPriceRangeIdx(i)}
                    aria-pressed={active}
                    className={`rounded-full px-3 py-1 text-[11px] font-bold transition-all duration-150 active:scale-95 sm:text-xs ${
                      active
                        ? "bg-[var(--foreground)] text-[var(--background)] shadow-sm"
                        : "border border-[var(--border)] bg-[var(--background)] text-[var(--muted)] hover:border-[var(--foreground)]/30 hover:text-[var(--foreground)]"
                    }`}
                  >
                    {range.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Row 3: Marka (horizontal scroll on mobile) */}
          <div className="flex items-center gap-2 overflow-x-auto border-t border-[var(--border)] pt-3 scrollbar-hide">
            <span className="shrink-0 text-[11px] font-bold uppercase tracking-wide text-[var(--muted)]">
              Marka
            </span>
            <div className="flex gap-2">
              {brands.map((b) => {
                const active = b === brand;
                return (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setBrand(b)}
                    aria-pressed={active}
                    className={`shrink-0 rounded-full px-3 py-1 text-[11px] font-semibold transition-all duration-150 active:scale-95 sm:text-xs ${
                      active
                        ? "bg-[var(--color-primary)] text-white shadow-sm"
                        : "border border-[var(--border)] bg-[var(--background)] text-[var(--muted)] hover:border-[var(--color-primary)]/40 hover:text-[var(--foreground)]"
                    }`}
                  >
                    {b}
                  </button>
                );
              })}
            </div>
            {filtersActive && (
              <button
                type="button"
                onClick={resetFilters}
                className="ml-auto shrink-0 rounded-full px-3 py-1 text-[11px] font-semibold text-[var(--color-danger)] underline transition-colors hover:text-[var(--color-danger)]/80"
              >
                Filtreleri temizle
              </button>
            )}
          </div>
        </div>

        {/* Deals — mobile scroll, desktop grid (geniş ekranda 6 kol) */}
        {filtered.length > 0 ? (
          <div className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-4 scrollbar-hide sm:-mx-6 sm:px-6 md:mx-0 md:grid md:grid-cols-2 md:gap-4 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6">
            {filtered.map((deal) => (
              <div
                key={deal.id}
                className="w-60 shrink-0 md:w-auto md:shrink"
              >
                <DealCard deal={deal} />
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-[var(--border)] bg-[var(--surface)] py-10 text-center">
            <p className="text-sm font-semibold text-[var(--foreground)]">
              Bu filtrelerle eşleşen kampanya yok.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-2 text-xs font-semibold text-[var(--color-primary)] underline hover:text-[var(--color-primary-hover)]"
            >
              Filtreleri sıfırla
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
