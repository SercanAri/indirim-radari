import Link from "next/link";
import { Search } from "lucide-react";

const POPULAR = [
  { label: "Elektronik", q: "elektronik" },
  { label: "Moda", q: "moda" },
  { label: "Güzellik", q: "guzellik" },
  { label: "Spor", q: "spor" },
  { label: "Ev & Yaşam", q: "ev" },
];

export default function SearchHero() {
  return (
    <section
      aria-label="Kampanya arama"
      className="relative w-full overflow-hidden border-b border-[var(--border)] bg-[var(--surface)]"
    >
      {/* Soft ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 60% 80% at 50% 0%, var(--color-primary) 0%, transparent 60%)",
          opacity: 0.08,
        }}
      />

      <div className="relative mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="mb-5 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-primary)]">
            Ne Arıyorsun?
          </p>
          <h2 className="mt-2 text-2xl font-black text-[var(--foreground)] sm:text-3xl">
            200+ markada tek tıkla bul
          </h2>
          <p className="mt-1.5 text-sm text-[var(--muted)] sm:text-base">
            Ürün, marka veya kategori yaz — sana en iyi indirimi getirelim.
          </p>
        </div>

        {/* Native HTML form → /kampanyalar?q=X (SSR-safe, no JS needed) */}
        <form
          action="/kampanyalar"
          method="get"
          role="search"
          className="group mx-auto flex max-w-2xl items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--background)] p-1.5 shadow-lg transition-all focus-within:border-[var(--color-primary)] focus-within:shadow-xl focus-within:shadow-[var(--color-primary)]/10"
        >
          <span className="pl-4 text-[var(--muted)] group-focus-within:text-[var(--color-primary)]">
            <Search className="h-5 w-5" />
          </span>
          <input
            type="search"
            name="q"
            placeholder="Samsung telefon, LC Waikiki kot, parfüm..."
            aria-label="Kampanya ara"
            autoComplete="off"
            className="flex-1 bg-transparent py-3 text-sm text-[var(--foreground)] outline-none placeholder:text-[var(--muted)] sm:text-base"
          />
          <button
            type="submit"
            className="shrink-0 rounded-full bg-[var(--color-primary)] px-5 py-2.5 text-sm font-bold text-white shadow-md transition-all duration-150 hover:bg-[var(--color-primary-hover)] hover:shadow-lg active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] sm:px-6"
          >
            Ara
          </button>
        </form>

        {/* Popular chips */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs font-semibold text-[var(--muted)]">
            Popüler:
          </span>
          {POPULAR.map((chip) => (
            <Link
              key={chip.q}
              href={`/kampanyalar?q=${chip.q}`}
              className="rounded-full border border-[var(--border)] bg-[var(--background)] px-3 py-1 text-xs font-semibold text-[var(--foreground)] transition-all hover:-translate-y-0.5 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
            >
              {chip.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
