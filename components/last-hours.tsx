import { lastHoursDeals } from "@/lib/mock-data";
import DealCard from "./deal-card";

export default function LastHours() {
  return (
    <section className="w-full py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 2xl:max-w-[90rem]">
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-danger)] opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-[var(--color-danger)]" />
            </span>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[var(--foreground)]">
                Son Saatler
              </h2>
              <p className="mt-0.5 text-sm text-[var(--color-danger)]">
                Bu fırsatlar çok yakında bitiyor.
              </p>
            </div>
          </div>
          <a
            href="/son-saatler"
            className="text-sm font-semibold text-[var(--color-danger)] transition-colors hover:underline"
          >
            Tümünü Gör →
          </a>
        </div>

        {/* Mobile scroll, desktop grid (geniş ekran: 6 kolon) */}
        <div className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-4 scrollbar-hide sm:-mx-6 sm:px-6 md:mx-0 md:grid md:grid-cols-2 md:gap-4 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6">
          {lastHoursDeals.map((deal) => (
            <div key={deal.id} className="w-60 shrink-0 md:w-auto md:shrink">
              <DealCard deal={deal} variant="last-hours" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
