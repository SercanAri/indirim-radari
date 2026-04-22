import Image from "next/image";
import Link from "next/link";
import { Bell, Calendar } from "lucide-react";
import { upcomingDeals } from "@/lib/mock-data";
import BrandLogo from "./brand-logo";

function formatPrice(price: number) {
  return price.toLocaleString("tr-TR") + " ₺";
}

const dateFormatter = new Intl.DateTimeFormat("tr-TR", {
  month: "short",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

function formatStartsAt(target: Date): { absolute: string; relative: string } {
  const diff = target.getTime() - Date.now();
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);

  let relative: string;
  if (diff <= 0) relative = "Başladı";
  else if (days > 0) relative = `${days} gün sonra`;
  else if (hours > 0) relative = `${hours} sa ${mins} dk sonra`;
  else relative = `${mins} dk sonra`;

  return { absolute: dateFormatter.format(target), relative };
}

export default function UpcomingDeals() {
  return (
    <section id="yakinda" className="w-full bg-[var(--surface)] py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 2xl:max-w-[90rem]">
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
          {upcomingDeals.map((deal) => {
            const { absolute, relative } = formatStartsAt(deal.startsAt);
            return (
              <article
                key={deal.id}
                className="group relative flex flex-col gap-0 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--background)] transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:border-[var(--color-primary)]/40 focus-within:ring-2 focus-within:ring-[var(--color-primary)]/40"
              >
                {/* Overlay link — kart tümü tıklanabilir, iç Link z-10 ile üstte */}
                <Link
                  href={`/kampanyalar#deal-${deal.id}`}
                  className="absolute inset-0 z-0"
                  aria-label={`${deal.brand} — ${deal.title}, ${absolute} başlıyor`}
                />

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

                <div className="relative z-10 flex flex-col gap-3 p-4">
                  {/* Brand */}
                  <div className="flex items-center gap-2">
                    <BrandLogo
                      name={deal.brand}
                      logoUrl={deal.logoUrl}
                      size={24}
                      radius={6}
                      padding={3}
                    />
                    <span className="text-xs font-bold uppercase tracking-wide text-[var(--muted)]">
                      {deal.brand}
                    </span>
                  </div>

                  <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-[var(--foreground)]">
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

                  {/* Start date — absolute + relative */}
                  <div className="border-t border-[var(--border)] pt-3">
                    <div className="flex items-start gap-2">
                      <Calendar className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--muted)]" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-[var(--foreground)]">
                          {absolute}
                        </p>
                        <p className="text-[11px] font-semibold text-[var(--color-primary)]">
                          {relative} başlıyor
                        </p>
                      </div>
                    </div>
                  </div>

                  <Link
                    href={`/giris?takip=${deal.id}`}
                    className="group/btn relative z-10 inline-flex w-full items-center justify-center gap-1.5 rounded-full border border-[var(--color-primary)] py-1.5 text-xs font-semibold text-[var(--color-primary)] transition-colors hover:bg-[var(--color-primary)] hover:text-white"
                  >
                    <Bell className="h-3.5 w-3.5 transition-transform group-hover/btn:scale-110" />
                    Bildirim Al
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
