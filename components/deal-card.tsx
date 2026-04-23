import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, Eye, Heart, TrendingDown } from "lucide-react";
import { Deal } from "@/types";
import BrandLogo from "./brand-logo";

interface DealCardProps {
  deal: Deal;
  variant?: "default" | "last-hours";
}

function formatPrice(price: number) {
  return price.toLocaleString("tr-TR") + " ₺";
}

// Tutarlı 4-rozet sistemi — görsel gürültü olmasın
const BADGE_STYLES: Record<
  NonNullable<Deal["badge"]>,
  { label: string; className: string }
> = {
  new: {
    label: "YENİ",
    className: "bg-[var(--color-success)] text-white",
  },
  hot: {
    label: "ÇOK SATAN",
    className: "bg-[var(--color-accent)] text-white",
  },
  last: {
    label: "SON SAATLER",
    className: "bg-[var(--color-danger)] text-white",
  },
  lowest: {
    label: "EN DÜŞÜK FİYAT",
    className: "bg-[var(--foreground)] text-[var(--background)]",
  },
};

export default function DealCard({ deal, variant = "default" }: DealCardProps) {
  const isLastHours = variant === "last-hours";
  const savings = deal.originalPrice - deal.salePrice;
  const priceDropFromHistory =
    deal.price30dAgo !== undefined && deal.price30dAgo > deal.salePrice
      ? deal.price30dAgo - deal.salePrice
      : null;
  const badge = deal.badge ? BADGE_STYLES[deal.badge] : null;
  // "Gerçek indirim" — satış fiyatı son 30 gün fiyatının altında/eşit:
  // kampanya gerçekten son 30 günün en uygunu demektir (sahte indirim değil).
  const isRealDiscount =
    deal.price30dAgo !== undefined && deal.salePrice <= deal.price30dAgo;

  return (
    <article
      className={`group relative flex h-full flex-col rounded-2xl border overflow-hidden transition-all duration-150 hover:-translate-y-1 hover:shadow-xl active:translate-y-0 focus-within:ring-2 focus-within:ring-[var(--color-primary)]/40 ${
        isLastHours
          ? "border-[var(--color-danger)]/30 bg-[var(--background)] hover:border-[var(--color-danger)]/60"
          : "border-[var(--border)] bg-[var(--background)] hover:border-[var(--color-primary)]/40"
      }`}
    >
      {/* Overlay link — tüm kart clickable */}
      <Link
        href={`/kampanyalar#deal-${deal.id}`}
        className="absolute inset-0 z-0"
        aria-label={`${deal.brand} — ${deal.title}, %${deal.discount} indirim, ${savings.toLocaleString("tr-TR")} ₺ tasarruf`}
      />

      {/* Image + overlay badges */}
      <div className="relative h-36 w-full overflow-hidden bg-[var(--surface)]">
        {deal.imageUrl ? (
          <Image
            src={deal.imageUrl}
            alt={deal.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 224px, 256px"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <BrandLogo name={deal.brand} logoUrl={deal.logoUrl} size={80} radius={16} />
          </div>
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

        {/* Discount badge — sağ üst */}
        <span
          className={`absolute right-2 top-2 rounded-full px-2.5 py-0.5 text-xs font-black text-white shadow ${
            isLastHours ? "bg-[var(--color-danger)]" : "bg-[var(--color-primary)]"
          }`}
        >
          %{deal.discount}
        </span>

        {/* Status badge — sol üst, tek rozet */}
        {badge && (
          <span
            className={`absolute left-2 top-2 rounded-full px-2 py-0.5 text-[10px] font-black tracking-wide shadow ${badge.className}`}
          >
            {badge.label}
          </span>
        )}

        {/* Takip et (kalp) — hover'da görünür, z-10 ile overlay link'in üstünde */}
        <Link
          href={`/giris?takip=${deal.id}`}
          aria-label="Kampanyayı takibe al"
          className="absolute bottom-2 right-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-[var(--color-primary)] opacity-0 shadow-md backdrop-blur-sm transition-all duration-150 hover:scale-110 hover:bg-white active:scale-95 focus-visible:opacity-100 group-hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]/50"
        >
          <Heart className="h-4 w-4" />
        </Link>
      </div>

      {/* Content */}
      <div className="relative z-[1] flex flex-1 flex-col gap-2 p-3">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <BrandLogo name={deal.brand} logoUrl={deal.logoUrl} size={20} radius={6} padding={2} />
          <span className="truncate text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
            {deal.brand}
          </span>
        </div>

        <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-[var(--foreground)]">
          {deal.title}
        </h3>

        {/* Price block — kontrast artırıldı, tasarruf vurgulandı */}
        <div className="flex flex-col gap-1">
          <div className="flex items-baseline gap-2">
            <span
              className={`text-xl font-black tabular-nums ${
                isLastHours ? "text-[var(--color-danger)]" : "text-[var(--color-primary)]"
              }`}
            >
              {formatPrice(deal.salePrice)}
            </span>
            <span className="text-[11px] text-[var(--muted)]/70 line-through">
              {formatPrice(deal.originalPrice)}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            <span
              className={`rounded-md px-1.5 py-0.5 text-[10px] font-black uppercase tracking-wide ${
                isLastHours
                  ? "bg-[var(--color-danger)]/10 text-[var(--color-danger)]"
                  : "bg-[var(--color-success)]/10 text-[var(--color-success)]"
              }`}
            >
              {formatPrice(savings)} kazan
            </span>
            {isRealDiscount && (
              <span
                className="inline-flex items-center gap-1 rounded-md bg-[var(--color-success)]/15 px-1.5 py-0.5 text-[10px] font-black uppercase tracking-wide text-[var(--color-success)]"
                title="Son 30 günün en uygun fiyatı — sahte indirim değil"
              >
                <BadgeCheck className="h-3 w-3" />
                Gerçek İndirim
              </span>
            )}
          </div>
        </div>

        {/* Price history + watcher signals — sadece veri varsa göster */}
        {(priceDropFromHistory || deal.watchingNow) && (
          <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-[var(--border)] pt-2 text-[10px] text-[var(--muted)]">
            {priceDropFromHistory && (
              <span className="inline-flex items-center gap-1" title={`30 gün önce ${formatPrice(deal.price30dAgo!)} idi`}>
                <TrendingDown className="h-3 w-3 text-[var(--color-success)]" />
                30 gün öncesine göre{" "}
                <span className="font-bold text-[var(--foreground)]">
                  {formatPrice(priceDropFromHistory)}
                </span>{" "}
                düşüş
              </span>
            )}
            {deal.watchingNow && (
              <span className="inline-flex items-center gap-1">
                <Eye className="h-3 w-3" />
                <span className="font-bold text-[var(--foreground)] tabular-nums">
                  {deal.watchingNow}
                </span>{" "}
                kişi izliyor
              </span>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
