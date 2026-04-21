import { lastHoursDeals } from "@/lib/mock-data";
import DealCard from "./deal-card";

export default function LastHours() {
  return (
    <section className="w-full py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
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
                Bu fırsatlar çok yakında bitiyor!
              </p>
            </div>
          </div>
          <a
            href="/son-saatler"
            className="text-sm font-semibold text-[var(--color-danger)] hover:underline"
          >
            Tümünü Gör →
          </a>
        </div>

        {/* Horizontal scroll */}
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 sm:-mx-6 sm:px-6">
          {lastHoursDeals.map((deal) => (
            <DealCard key={deal.id} deal={deal} variant="last-hours" />
          ))}
        </div>
      </div>
    </section>
  );
}
