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

export default function TodayDeals() {
  const [category, setCategory] = useState<Category>("Tümü");
  const [minDiscount, setMinDiscount] = useState(0);

  const filtered = useMemo(() => {
    return todayDeals.filter((d) => {
      const matchCat = category === "Tümü" || d.category === category;
      const matchDisc = d.discount >= minDiscount;
      return matchCat && matchDisc;
    });
  }, [category, minDiscount]);

  return (
    <section id="bugun" className="w-full py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
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
            className="mt-1 shrink-0 text-sm font-semibold text-[var(--color-primary)] hover:underline"
          >
            Tümünü Gör →
          </a>
        </div>

        {/* Filters */}
        <div className="mb-5 flex flex-col gap-3">
          {/* Category chips */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => {
              const active = cat === category;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition-all sm:text-sm ${
                    active
                      ? "bg-[var(--color-primary)] text-white shadow-md"
                      : "border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] hover:border-[var(--color-primary)]/50 hover:text-[var(--color-primary)]"
                  }`}
                  aria-pressed={active}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Min discount pills */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-wide text-[var(--muted)]">
              Min. indirim:
            </span>
            {MIN_DISCOUNTS.map((opt) => {
              const active = opt.value === minDiscount;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setMinDiscount(opt.value)}
                  className={`rounded-full px-3 py-1 text-[11px] font-bold transition-all sm:text-xs ${
                    active
                      ? "bg-[var(--color-accent)] text-white shadow-sm"
                      : "border border-[var(--border)] bg-[var(--background)] text-[var(--muted)] hover:border-[var(--color-accent)]/50 hover:text-[var(--color-accent)]"
                  }`}
                  aria-pressed={active}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Grid / scroll */}
        {filtered.length > 0 ? (
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 sm:-mx-6 sm:px-6">
            {filtered.map((deal) => (
              <DealCard key={deal.id} deal={deal} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-[var(--border)] bg-[var(--surface)] py-10 text-center">
            <p className="text-sm font-semibold text-[var(--foreground)]">
              Bu filtrelerle eşleşen kampanya yok.
            </p>
            <p className="mt-1 text-xs text-[var(--muted)]">
              Filtreleri gevşetmeyi dene.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
