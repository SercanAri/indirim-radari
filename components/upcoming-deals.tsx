import { upcomingDeals } from "@/lib/mock-data";
import Countdown from "./countdown";

function formatPrice(price: number) {
  return price.toLocaleString("tr-TR") + " ₺";
}

export default function UpcomingDeals() {
  return (
    <section id="yakinda" className="w-full bg-[var(--surface)] py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[var(--foreground)]">
              Yakında Başlayacak
            </h2>
            <p className="mt-0.5 text-sm text-[var(--muted)]">
              Kaçırmamak için takibe al
            </p>
          </div>
          <a
            href="/yakinda"
            className="text-sm font-semibold text-[var(--color-primary)] hover:underline"
          >
            Tümünü Gör →
          </a>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {upcomingDeals.map((deal) => (
            <article
              key={deal.id}
              className="group flex flex-col gap-3 rounded-2xl border border-[var(--border)] bg-[var(--background)] p-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:border-[var(--color-primary)]/40 cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <span className="text-3xl">{deal.logo}</span>
                <span className="rounded-full bg-[var(--color-accent)]/10 px-2.5 py-1 text-xs font-bold text-[var(--color-accent)]">
                  %{deal.discount} İndirim
                </span>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
                  {deal.brand}
                </p>
                <h3 className="mt-0.5 text-sm font-semibold text-[var(--foreground)] line-clamp-2">
                  {deal.title}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-base font-bold text-[var(--color-primary)]">
                  {formatPrice(deal.salePrice)}
                </span>
                <span className="text-xs text-[var(--muted)] line-through">
                  {formatPrice(deal.originalPrice)}
                </span>
              </div>

              <div className="border-t border-[var(--border)] pt-3">
                <p className="mb-1.5 text-xs text-[var(--muted)]">Başlamasına kalan:</p>
                <Countdown targetDate={deal.startsAt} />
              </div>

              <button className="mt-auto rounded-full border border-[var(--color-primary)] py-1.5 text-xs font-semibold text-[var(--color-primary)] transition-colors hover:bg-[var(--color-primary)] hover:text-white">
                Bildirim Al
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
