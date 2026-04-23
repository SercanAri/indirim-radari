import type { Metadata } from "next";
import Link from "next/link";
import { Bell, Gift, Heart, Search } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Breadcrumb from "@/components/breadcrumb";

export const metadata: Metadata = {
  title: "Favorilerim — indi.",
  description: "Takip ettiğin markalar ve kampanyalar tek ekranda.",
};

export default function FavorilerimPage() {
  return (
    <>
      <Header />
      <main className="flex-1 py-8 sm:py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 2xl:max-w-6xl">
          <Breadcrumb
            className="mb-5"
            items={[
              { label: "Ana Sayfa", href: "/" },
              { label: "Favorilerim" },
            ]}
          />

          <div className="mb-6">
            <h1 className="flex items-center gap-2.5 text-2xl font-bold text-[var(--foreground)] sm:text-3xl">
              <Heart className="h-6 w-6 text-[var(--color-primary)]" />
              Favorilerim
            </h1>
            <p className="mt-1.5 text-sm text-[var(--muted)]">
              Takip ettiğin marka ve kampanyalar burada görünür.
            </p>
          </div>

          {/* Empty state — giriş yapılmamış veya hiç takip edilmemiş durum */}
          <div className="rounded-3xl border border-dashed border-[var(--border)] bg-[var(--surface)] p-8 text-center sm:p-12">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
              <Bell className="h-7 w-7" />
            </div>
            <h2 className="mt-4 text-lg font-bold text-[var(--foreground)] sm:text-xl">
              Henüz takip ettiğin kampanya yok
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-[var(--muted)]">
              Favori markalarını seç, kampanyaları takibe al. Başladıkları an haber veriyoruz — kaçırmak yok.
            </p>

            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/markalar"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--color-primary)] px-5 py-2.5 text-sm font-bold text-white shadow-md transition-all duration-150 hover:bg-[var(--color-primary-hover)] hover:shadow-lg active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]/50 focus-visible:ring-offset-2"
              >
                <Heart className="h-4 w-4" />
                Marka Takibe Al
              </Link>
              <Link
                href="/kampanyalar"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-5 py-2.5 text-sm font-semibold text-[var(--foreground)] transition-all duration-150 hover:border-[var(--color-primary)]/40 hover:text-[var(--color-primary)] active:scale-[0.97]"
              >
                <Search className="h-4 w-4" />
                Kampanyalara Göz At
              </Link>
            </div>
          </div>

          {/* Bilgi kutusu — giriş yapmayan kullanıcı için */}
          <div className="mt-6 flex items-start gap-3 rounded-2xl border border-[var(--border)] bg-[var(--background)] p-4">
            <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent)]/15 text-[var(--color-accent)]">
              ✓
            </span>
            <div className="flex-1 min-w-0 text-sm">
              <p className="font-semibold text-[var(--foreground)]">
                Giriş yapmadan da takibe alabilirsin.
              </p>
              <p className="mt-0.5 text-[var(--muted)]">
                E-posta ile bildirim kurulumu yeterli.{" "}
                <Link href="/giris" className="font-semibold text-[var(--color-primary)] hover:underline">
                  Giriş yap →
                </Link>
              </p>
            </div>
          </div>

          {/* Referral kartı — viral döngü iskeleti */}
          <div className="mt-6 overflow-hidden rounded-2xl border border-[var(--color-primary)]/30 bg-gradient-to-br from-[var(--color-primary)]/10 via-[var(--surface)] to-[var(--color-accent)]/8 p-5">
            <div className="flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--color-primary)]/15 text-[var(--color-primary)]">
                <Gift className="h-5 w-5" />
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-primary)]">
                  Arkadaşını davet et
                </p>
                <p className="mt-1 text-sm font-semibold leading-snug text-[var(--foreground)]">
                  Arkadaşın kayıt olduğunda{" "}
                  <span className="text-[var(--color-primary)]">ikiniz de ücretsiz premium alarm hakkı</span>{" "}
                  kazanıyorsunuz.
                </p>
              </div>
            </div>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center">
              <input
                readOnly
                value="indi.to/sercan-k9p4"
                aria-label="Davet linkin"
                className="flex-1 rounded-full border border-[var(--border)] bg-[var(--background)] px-4 py-2 text-sm font-mono text-[var(--foreground)] outline-none"
              />
              <button
                type="button"
                aria-label="Davet linkini kopyala"
                className="shrink-0 rounded-full bg-[var(--color-primary)] px-4 py-2 text-sm font-bold text-white transition-all duration-150 hover:bg-[var(--color-primary-hover)] active:scale-[0.97]"
              >
                Linki Kopyala
              </button>
            </div>
            <p className="mt-2 text-[11px] text-[var(--muted)]">
              0 arkadaş davet edildi · limit yok
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
