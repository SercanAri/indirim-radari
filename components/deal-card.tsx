import Image from "next/image";
import { Deal } from "@/types";

interface DealCardProps {
  deal: Deal;
  variant?: "default" | "last-hours";
}

function formatPrice(price: number) {
  return price.toLocaleString("tr-TR") + " ₺";
}

export default function DealCard({ deal, variant = "default" }: DealCardProps) {
  const isLastHours = variant === "last-hours";

  return (
    <article
      className={`group flex flex-col rounded-2xl border overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-lg cursor-pointer shrink-0 w-56 sm:w-64 ${
        isLastHours
          ? "border-[var(--color-danger)]/30 bg-[var(--background)] hover:border-[var(--color-danger)]/60"
          : "border-[var(--border)] bg-[var(--background)] hover:border-[var(--color-primary)]/40"
      }`}
    >
      {/* Image */}
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
            <Image
              src={deal.logoUrl}
              alt={deal.brand}
              width={80}
              height={80}
              className="object-contain"
              unoptimized
            />
          </div>
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

        {/* Discount badge */}
        <span
          className={`absolute right-2 top-2 rounded-full px-2 py-0.5 text-xs font-bold text-white shadow ${
            isLastHours ? "bg-[var(--color-danger)]" : "bg-[var(--color-primary)]"
          }`}
        >
          %{deal.discount}
        </span>

        {/* Status badge */}
        {deal.badge === "new" && (
          <span className="absolute left-2 top-2 rounded-full bg-[var(--color-success)] px-2 py-0.5 text-xs font-bold text-white shadow">
            YENİ
          </span>
        )}
        {deal.badge === "hot" && (
          <span className="absolute left-2 top-2 rounded-full bg-[var(--color-accent)] px-2 py-0.5 text-xs font-bold text-white shadow">
            🔥 Çok Satan
          </span>
        )}
        {deal.badge === "last" && (
          <span className="absolute left-2 top-2 rounded-full bg-[var(--color-danger)] px-2 py-0.5 text-xs font-bold text-white shadow">
            ⏱ Son Saatler
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 p-3">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <div className="relative h-5 w-5 overflow-hidden rounded-md bg-white shadow-sm shrink-0">
            <Image
              src={deal.logoUrl}
              alt={deal.brand}
              fill
              className="object-contain p-0.5"
              unoptimized
            />
          </div>
          <span className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)] truncate">
            {deal.brand}
          </span>
        </div>

        <h3 className="text-sm font-semibold text-[var(--foreground)] leading-snug line-clamp-2">
          {deal.title}
        </h3>

        <div className="flex items-center gap-2">
          <span
            className={`text-base font-bold ${
              isLastHours ? "text-[var(--color-danger)]" : "text-[var(--color-primary)]"
            }`}
          >
            {formatPrice(deal.salePrice)}
          </span>
          <span className="text-xs text-[var(--muted)] line-through">
            {formatPrice(deal.originalPrice)}
          </span>
        </div>
      </div>
    </article>
  );
}
