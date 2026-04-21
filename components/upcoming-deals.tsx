import Image from "next/image";
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
            href="/kampanyalar?filtre=yakinda"
            className="text-sm font-semibold text-[var(--color-primary)] hover:underline"
          >
            Tümünü Gör →
          </a>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {upcomingDeals.map((deal) => (
            <article
              key={deal.id}
              className="group flex flex-col gap-0 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--background)] transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:border-[var(--color-primary)]/40 cursor-pointer"
            >
              {/* Image */}
              <div className="relative h-36 w-full overflow-hidden bg-[var(--surface)]">
                <Image
                  src={deal.imageUrl}
                  alt={deal.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <span className="absolute right-2 top-2 rounded-full bg-[var(--color-accent)] px-2.5 py-0.5 text-xs font-bold text-white shadow">
                  %{deal.discount}
                </span>
              </div>

              <div className="flex flex-col gap-3 p-4">
                {/* Brand */}
                <div className="flex items-center gap-2">
                  <div className="relative h-6 w-6 overflow-hidden rounded-lg bg-white shadow-sm shrink-0">
                    <Image
                      src={deal.logoUrl}
                      alt={deal.brand}
                      fill
                      className="object-contain p-0.5"
                      unoptimized
                    />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wide text-[var(--muted)]">
                    {deal.brand}
                  </span>
                </div>

                <h3 className="text-sm font-semibold text-[var(--foreground)] line-clamp-2 leading-snug">
                  {deal.title}
                </h3>

                <div className="flex items-center gap-2">
                  <span className="text-base font-bold text-[var(--color-primary)]">
                    {formatPrice(deal.salePrice)}
                  </span>
                  <span className="text-xs text-[var(--muted)] line-through">
                    {formatPrice(deal.originalPrice)}
                  </span>
                </div>

                <div className="border-t border-[var(--border)] pt-3">
                  <p className="mb-1.5 text-[11px] text-[var(--muted)]">Başlamasına kalan:</p>
                  <Countdown targetDate={deal.startsAt} />
                </div>

                <button className="w-full rounded-full border border-[var(--color-primary)] py-1.5 text-xs font-semibold text-[var(--color-primary)] transition-colors hover:bg-[var(--color-primary)] hover:text-white">
                  Bildirim Al
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
