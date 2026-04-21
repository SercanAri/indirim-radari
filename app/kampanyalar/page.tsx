import { todayDeals, lastHoursDeals, upcomingDeals } from "@/lib/mock-data";
import Header from "@/components/header";
import Footer from "@/components/footer";
import DealCard from "@/components/deal-card";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tüm Kampanyalar — İndirim Radarı",
  description: "Aktif, yaklaşan ve biten kampanyaları filtrele.",
};

const allDeals = [
  ...lastHoursDeals,
  ...todayDeals,
  ...upcomingDeals,
];

const FILTERS = [
  { label: "Tümü", value: "tumu" },
  { label: "Son Saatler", value: "son-saatler" },
  { label: "Bugün", value: "bugun" },
  { label: "Yakında", value: "yakinda" },
];

const CATEGORIES = ["Tümü", "Moda", "Elektronik", "Spor", "Güzellik", "Ev & Yaşam"];

export default function KampanyalarPage() {
  return (
    <>
      <Header />
      <main className="flex-1 py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-[var(--foreground)]">
              Tüm Kampanyalar
            </h1>
            <p className="mt-1.5 text-sm text-[var(--muted)]">
              {allDeals.length} kampanya listeleniyor
            </p>
          </div>

          {/* Filters */}
          <div className="mb-6 flex flex-wrap gap-2">
            {FILTERS.map((f, i) => (
              <button
                key={f.value}
                className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
                  i === 0
                    ? "bg-[var(--color-primary)] text-white"
                    : "border border-[var(--border)] text-[var(--muted)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
                }`}
              >
                {f.label}
              </button>
            ))}
            <div className="ml-auto flex flex-wrap gap-2">
              {CATEGORIES.map((cat, i) => (
                <button
                  key={cat}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                    i === 0
                      ? "bg-[var(--surface)] text-[var(--foreground)] border border-[var(--border)]"
                      : "text-[var(--muted)] hover:text-[var(--foreground)]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Son saatler */}
          <div className="mb-10">
            <div className="mb-4 flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-danger)] opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[var(--color-danger)]" />
              </span>
              <h2 className="text-base font-bold text-[var(--foreground)]">Son Saatler</h2>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 sm:-mx-0 sm:px-0">
              {lastHoursDeals.map((deal) => (
                <DealCard key={deal.id} deal={deal} variant="last-hours" />
              ))}
            </div>
          </div>

          {/* Bugün */}
          <div className="mb-10">
            <h2 className="mb-4 text-base font-bold text-[var(--foreground)]">Bugün Başlayanlar</h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {todayDeals.map((deal) => (
                <DealCard key={deal.id} deal={deal} />
              ))}
            </div>
          </div>

          {/* Yakında */}
          <div>
            <h2 className="mb-4 text-base font-bold text-[var(--foreground)]">Yakında Başlayacak</h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {upcomingDeals.map((deal) => (
                <DealCard key={deal.id} deal={deal} />
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
