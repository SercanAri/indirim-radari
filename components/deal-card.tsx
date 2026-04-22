import Image from "next/image";
import Link from "next/link";
import { Deal } from "@/types";
import BrandLogo from "./brand-logo";

interface DealCardProps {
  deal: Deal;
  variant?: "default" | "last-hours";
}

function formatPrice(price: number) {
  return price.toLocaleString("tr-TR") + " ₺";
}

export default function DealCard({ deal, variant = "default" }: DealCardProps) {
  const isLastHours = variant === "last-hours";
  const savings = deal.originalPrice - deal.salePrice;

  return (
    <article
      className={`group relative flex h-full flex-col rounded-2xl border overflow-hidden transition-all duration-150 hover:-translate-y-1 hover:shadow-xl active:translate-y-0 focus-within:ring-2 focus-within:ring-[var(--color-primary)]/40 ${
        isLastHours
          ? "border-[var(--color-danger)]/30 bg-[var(--background)] hover:border-[var(--color-danger)]/60"
          : "border-[var(--border)] bg-[var(--background)] hover:border-[var(--color-primary)]/40"
      }`}
    >
      {/* Overlay link — tüm kart clickable (iç butonlar z-10 ile üstte kalır) */}
      <Link
        href={`/kampanyalar#deal-${deal.id}`}
        className="absolute inset-0 z-0"
        aria-label={`${deal.brand} — ${deal.title}, %${deal.discount} indirim, ${savings.toLocaleString("tr-TR")} ₺ tasarruf`}
      />
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
            <BrandLogo
              name={deal.brand}
              logoUrl={deal.logoUrl}
              size={80}
              radius={16}
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
          <BrandLogo
            name={deal.brand}
            logoUrl={deal.logoUrl}
            size={20}
            radius={6}
            padding={2}
          />
          <span className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)] truncate">
            {deal.brand}
          </span>
        </div>

        <h3 className="text-sm font-semibold text-[var(--foreground)] leading-snug line-clamp-2">
          {deal.title}
        </h3>

        <div className="flex flex-col gap-0.5">
          <div className="flex items-baseline gap-2">
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
          <span
            className={`w-fit rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
              isLastHours
                ? "bg-[var(--color-danger)]/10 text-[var(--color-danger)]"
                : "bg-[var(--color-success)]/10 text-[var(--color-success)]"
            }`}
          >
            {formatPrice(savings)} tasarruf
          </span>
        </div>
      </div>
    </article>
  );
}
