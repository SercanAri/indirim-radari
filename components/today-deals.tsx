import { todayDeals } from "@/lib/mock-data";
import DealCard from "./deal-card";

export default function TodayDeals() {
  return (
    <section id="bugun" className="w-full py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[var(--foreground)]">
              Bugün Başlayanlar
            </h2>
            <p className="mt-0.5 text-sm text-[var(--muted)]">
              {todayDeals.length} kampanya aktif
            </p>
          </div>
          <a
            href="/bugun"
            className="text-sm font-semibold text-[var(--color-primary)] hover:underline"
          >
            Tümünü Gör →
          </a>
        </div>

        {/* Horizontal scroll */}
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 sm:-mx-6 sm:px-6">
          {todayDeals.map((deal) => (
            <DealCard key={deal.id} deal={deal} />
          ))}
        </div>
      </div>
    </section>
  );
}
