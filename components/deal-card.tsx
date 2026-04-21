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
          ? "border-[var(--color-danger)]/30 bg-[var(--color-danger)]/5 hover:border-[var(--color-danger)]/60"
          : "border-[var(--border)] bg-[var(--background)] hover:border-[var(--color-primary)]/40"
      }`}
    >
      {/* Image placeholder */}
      <div className="relative flex h-36 items-center justify-center bg-[var(--surface)] text-5xl">
        {deal.logo}
        <span
          className={`absolute right-2 top-2 rounded-full px-2 py-0.5 text-xs font-bold text-white ${
            isLastHours ? "bg-[var(--color-danger)]" : "bg-[var(--color-primary)]"
          }`}
        >
          %{deal.discount}
        </span>
        {deal.badge === "new" && (
          <span className="absolute left-2 top-2 rounded-full bg-[var(--color-success)] px-2 py-0.5 text-xs font-bold text-white">
            YENİ
          </span>
        )}
        {deal.badge === "hot" && (
          <span className="absolute left-2 top-2 rounded-full bg-[var(--color-accent)] px-2 py-0.5 text-xs font-bold text-white">
            🔥 SICAK
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-1.5 p-3">
        <span className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
          {deal.brand}
        </span>
        <h3 className="text-sm font-semibold text-[var(--foreground)] leading-snug line-clamp-2">
          {deal.title}
        </h3>
        <div className="mt-1 flex items-center gap-2">
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
