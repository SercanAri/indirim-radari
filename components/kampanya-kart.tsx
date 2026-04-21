"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────

export type CardVariant = "aktif" | "yaklaşan" | "bitiyor";

export interface KampanyaKartProps {
  brand: string;
  logo: string;
  title: string;
  discountRate: number;
  startsAt: Date;
  endsAt: Date;
  category: string;
  imageUrl?: string;
  /** Otomatik hesaplanır; override etmek için kullan */
  variant?: CardVariant;
  /** Liste içinde sıra (stagger animasyonu için) */
  index?: number;
}

// ─── Variant helpers ──────────────────────────────────────────────────────────

function resolveVariant(startsAt: Date, endsAt: Date, override?: CardVariant): CardVariant {
  if (override) return override;
  const now = Date.now();
  if (startsAt.getTime() > now) return "yaklaşan";
  if (endsAt.getTime() - now < 4 * 3600_000) return "bitiyor";
  return "aktif";
}

const VARIANT_CONFIG = {
  aktif: {
    label: "Aktif",
    dotColor: "bg-emerald-500",
    ringColor: "ring-emerald-500/30",
    badgeClass: "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20",
    accentClass: "text-emerald-500",
    borderHover: "hover:border-emerald-500/40",
    shadow: "hover:shadow-emerald-500/10",
    progressColor: "bg-emerald-500",
  },
  "yaklaşan": {
    label: "Yakında",
    dotColor: "bg-blue-500",
    ringColor: "ring-blue-500/30",
    badgeClass: "bg-blue-500/10 text-blue-500 border border-blue-500/20",
    accentClass: "text-blue-500",
    borderHover: "hover:border-blue-500/40",
    shadow: "hover:shadow-blue-500/10",
    progressColor: "bg-blue-500",
  },
  bitiyor: {
    label: "Son Saatler",
    dotColor: "bg-[var(--color-danger)]",
    ringColor: "ring-[var(--color-danger)]/30",
    badgeClass: "bg-[var(--color-danger)]/10 text-[var(--color-danger)] border border-[var(--color-danger)]/20",
    accentClass: "text-[var(--color-danger)]",
    borderHover: "hover:border-[var(--color-danger)]/40",
    shadow: "hover:shadow-[var(--color-danger)]/10",
    progressColor: "bg-[var(--color-danger)]",
  },
} as const;

// ─── Countdown ────────────────────────────────────────────────────────────────

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calcTimeLeft(target: Date): TimeLeft {
  const diff = Math.max(0, target.getTime() - Date.now());
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000) / 60_000),
    seconds: Math.floor((diff % 60_000) / 1_000),
  };
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function FlipUnit({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <div className="relative h-7 w-6 overflow-hidden rounded bg-black/10 dark:bg-white/10">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={value}
            initial={{ y: "-100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="absolute inset-0 flex items-center justify-center text-xs font-bold tabular-nums"
          >
            {value}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="text-[9px] font-semibold uppercase tracking-wider text-[var(--muted)]">
        {label}
      </span>
    </div>
  );
}

function Countdown({ target, variant }: { target: Date; variant: "yaklaşan" | "bitiyor" }) {
  const [time, setTime] = useState<TimeLeft>(calcTimeLeft(target));

  useEffect(() => {
    const id = setInterval(() => setTime(calcTimeLeft(target)), 1_000);
    return () => clearInterval(id);
  }, [target]);

  const showDays = time.days > 0;

  return (
    <div className="flex items-end gap-1.5">
      {showDays && <FlipUnit value={pad(time.days)} label="gün" />}
      <FlipUnit value={pad(time.hours)} label="sa" />
      <span className="mb-[18px] text-xs font-bold text-[var(--muted)]">:</span>
      <FlipUnit value={pad(time.minutes)} label="dk" />
      <span className="mb-[18px] text-xs font-bold text-[var(--muted)]">:</span>
      <FlipUnit value={pad(time.seconds)} label="sn" />
    </div>
  );
}

// ─── Progress bar (aktif: gösterir bitiş zamanına göre) ───────────────────────

function DealProgress({
  startsAt,
  endsAt,
  colorClass,
}: {
  startsAt: Date;
  endsAt: Date;
  colorClass: string;
}) {
  const total = endsAt.getTime() - startsAt.getTime();
  const elapsed = Date.now() - startsAt.getTime();
  const pct = Math.min(100, Math.max(0, (elapsed / total) * 100));

  return (
    <div className="h-1 w-full overflow-hidden rounded-full bg-[var(--border)]">
      <div
        className={`h-full rounded-full ${colorClass}`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

// ─── Pulse dot ────────────────────────────────────────────────────────────────

function PulseDot({ colorClass }: { colorClass: string }) {
  return (
    <span className="relative flex h-2.5 w-2.5 shrink-0">
      <span
        className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-60 ${colorClass}`}
      />
      <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${colorClass}`} />
    </span>
  );
}

// ─── Card ─────────────────────────────────────────────────────────────────────

export default function KampanyaKart({
  brand,
  logo,
  title,
  discountRate,
  startsAt,
  endsAt,
  category,
  imageUrl,
  variant: variantProp,
  index = 0,
}: KampanyaKartProps) {
  const variant = resolveVariant(startsAt, endsAt, variantProp);
  const cfg = VARIANT_CONFIG[variant];

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.2, ease: "easeOut" } }}
      className={`
        group relative flex flex-col overflow-hidden rounded-2xl border border-[var(--border)]
        bg-[var(--background)] cursor-pointer
        shadow-sm hover:shadow-xl ${cfg.shadow}
        ${cfg.borderHover}
        transition-shadow duration-300
      `}
    >
      {/* Image area */}
      <div className="relative flex h-40 items-center justify-center bg-[var(--surface)] overflow-hidden">
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={imageUrl} alt={title} className="h-full w-full object-cover" />
        ) : (
          <span className="text-6xl select-none">{logo}</span>
        )}

        {/* Discount badge */}
        <span
          className={`absolute right-2.5 top-2.5 rounded-full px-2.5 py-1 text-xs font-bold text-white ring-2 ring-white/20 ${
            variant === "aktif"
              ? "bg-emerald-500"
              : variant === "yaklaşan"
              ? "bg-blue-500"
              : "bg-[var(--color-danger)]"
          }`}
        >
          %{discountRate}
        </span>

        {/* Category chip */}
        <span className="absolute left-2.5 bottom-2.5 rounded-full bg-black/40 backdrop-blur-sm px-2 py-0.5 text-[10px] font-semibold text-white">
          {category}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-3 p-4">
        {/* Brand + status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="text-lg leading-none">{logo}</span>
            <span className="text-xs font-bold uppercase tracking-wide text-[var(--muted)]">
              {brand}
            </span>
          </div>

          <span className={`flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-bold ${cfg.badgeClass}`}>
            <PulseDot colorClass={cfg.dotColor} />
            {cfg.label}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-sm font-semibold leading-snug text-[var(--foreground)] line-clamp-2">
          {title}
        </h3>

        {/* Variant-specific bottom area */}
        <div className="mt-auto flex flex-col gap-2.5">
          {variant === "aktif" && (
            <>
              <DealProgress startsAt={startsAt} endsAt={endsAt} colorClass={cfg.progressColor} />
              <div className="flex items-center justify-between text-xs text-[var(--muted)]">
                <span>Sürüyor</span>
                <span className={`font-semibold ${cfg.accentClass}`}>
                  {new Intl.DateTimeFormat("tr-TR", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }).format(endsAt)}&apos;de bitiyor
                </span>
              </div>
            </>
          )}

          {variant === "yaklaşan" && (
            <>
              <p className="text-[11px] text-[var(--muted)]">Başlamasına kalan:</p>
              <Countdown target={startsAt} variant="yaklaşan" />
              <button
                className={`mt-1 w-full rounded-full border py-1.5 text-xs font-semibold transition-colors ${cfg.badgeClass} hover:bg-blue-500 hover:text-white hover:border-blue-500`}
              >
                Bildirim Al
              </button>
            </>
          )}

          {variant === "bitiyor" && (
            <>
              <p className="text-[11px] font-semibold text-[var(--color-danger)]">
                ⚡ Bitmesine kalan:
              </p>
              <Countdown target={endsAt} variant="bitiyor" />
              <button
                className="mt-1 w-full rounded-full bg-[var(--color-danger)] py-1.5 text-xs font-bold text-white transition-opacity hover:opacity-90"
              >
                Hemen Al →
              </button>
            </>
          )}
        </div>
      </div>
    </motion.article>
  );
}
