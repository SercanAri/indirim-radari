import Link from "next/link";
import { Search } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sayfa Bulunamadı — indi.",
};

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-[var(--background)] px-4 text-center">
      <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-[var(--surface)] text-[var(--color-primary)]">
        <Search className="h-10 w-10" />
      </div>
      <div>
        <p className="text-6xl font-bold text-[var(--color-primary)]">404</p>
        <h1 className="mt-2 text-xl font-bold text-[var(--foreground)]">
          Sayfa bulunamadı
        </h1>
        <p className="mt-1.5 max-w-xs text-sm text-[var(--muted)]">
          Bu sayfanın fiyatı da düştü — ortadan kayboldu.
          <br />
          Kampanyalar hâlâ burada, radarın kapanmadı.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/"
          className="rounded-full bg-[var(--color-primary)] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-primary-hover)]"
        >
          Ana Sayfaya Dön
        </Link>
        <Link
          href="/kampanyalar"
          className="rounded-full border border-[var(--border)] px-6 py-2.5 text-sm font-semibold text-[var(--foreground)] transition-colors hover:border-[var(--color-primary)]/40"
        >
          Kampanyalara Bak
        </Link>
      </div>
    </div>
  );
}
