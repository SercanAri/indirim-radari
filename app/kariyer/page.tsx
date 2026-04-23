import type { Metadata } from "next";
import { Briefcase, Sparkles } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Breadcrumb from "@/components/breadcrumb";

export const metadata: Metadata = {
  title: "Kariyer",
  description:
    "indi.'de çalışmak ister misin? Açık pozisyon yoksa bile iyi insanı kaçırmayız.",
};

const VALUES = [
  "Kullanıcıya dürüst — sahte indirimi söyleriz.",
  "Küçük takım, hızlı karar — komite yok.",
  "Remote-first, İstanbul'da ofis opsiyonel.",
  "Fiyat geçmişi kamu malıdır — ürünümüz de buna inanan insanla büyür.",
];

export default function KariyerPage() {
  return (
    <>
      <Header />
      <main className="flex-1 py-8 sm:py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Breadcrumb
            className="mb-5"
            items={[
              { label: "Ana Sayfa", href: "/" },
              { label: "Kariyer" },
            ]}
          />

          <div className="mb-8">
            <h1 className="flex items-center gap-2.5 text-2xl font-black text-[var(--foreground)] sm:text-3xl">
              <Briefcase className="h-6 w-6 text-[var(--color-primary)]" />
              Kariyer
            </h1>
            <p className="mt-2 text-sm text-[var(--muted)] sm:text-base">
              Türkiye&apos;nin indirim radarını kuruyoruz. Yolun başındayız.
            </p>
          </div>

          {/* Açık pozisyon durumu */}
          <div className="mb-8 flex items-start gap-3 rounded-2xl border border-dashed border-[var(--border)] bg-[var(--surface)] p-5">
            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)]/15 text-[var(--color-primary)]">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-bold text-[var(--foreground)]">
                Şu an açık pozisyonumuz yok.
              </p>
              <p className="mt-1 text-xs text-[var(--muted)]">
                Ama iyi insan geldiğinde kaçırmayız. Aşağıdaki formla kendini anlat —
                ekip büyüdüğünde ilk sana yazarız.
              </p>
            </div>
          </div>

          {/* Değerler */}
          <h2 className="mb-3 text-lg font-bold text-[var(--foreground)]">Nasıl çalışıyoruz</h2>
          <ul className="mb-10 grid gap-2.5">
            {VALUES.map((v) => (
              <li
                key={v}
                className="flex items-start gap-2.5 rounded-xl border border-[var(--border)] bg-[var(--background)] p-3"
              >
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-primary)]" />
                <span className="text-sm text-[var(--foreground)]">{v}</span>
              </li>
            ))}
          </ul>

          {/* Spekülatif başvuru formu */}
          <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-8">
            <h2 className="text-lg font-bold text-[var(--foreground)]">Spekülatif başvuru</h2>
            <p className="mt-1 text-sm text-[var(--muted)]">
              Hangi pozisyonda olursan ol, yazabilirsin. Formu doldur, biz sana ilk
              pozisyon açıldığında döneriz.
            </p>
            <form action="#" method="post" className="mt-6 flex flex-col gap-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-xs font-bold text-[var(--foreground)]">
                    Ad Soyad
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 py-2.5 text-sm outline-none transition-colors focus:border-[var(--color-primary)]"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-xs font-bold text-[var(--foreground)]">
                    E-posta
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 py-2.5 text-sm outline-none transition-colors focus:border-[var(--color-primary)]"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="role" className="text-xs font-bold text-[var(--foreground)]">
                  İlgilendiğin alan
                </label>
                <select
                  id="role"
                  name="role"
                  className="rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 py-2.5 text-sm outline-none transition-colors focus:border-[var(--color-primary)]"
                >
                  <option>Ürün / Tasarım</option>
                  <option>Frontend geliştirici</option>
                  <option>Backend / Scraper geliştirici</option>
                  <option>Veri / Analitik</option>
                  <option>Büyüme / Pazarlama</option>
                  <option>İçerik / Editoryel</option>
                  <option>Diğer</option>
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="links" className="text-xs font-bold text-[var(--foreground)]">
                  Linkler (CV, GitHub, portfolio — biri yeterli)
                </label>
                <input
                  id="links"
                  name="links"
                  type="text"
                  placeholder="https://..."
                  className="rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 py-2.5 text-sm outline-none transition-colors focus:border-[var(--color-primary)]"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="why" className="text-xs font-bold text-[var(--foreground)]">
                  Neden indi.?
                </label>
                <textarea
                  id="why"
                  name="why"
                  rows={4}
                  placeholder="3-4 cümle yeter. &quot;Ben kimim, niye buradayım.&quot;"
                  className="rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 py-2.5 text-sm outline-none transition-colors focus:border-[var(--color-primary)]"
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--color-primary)] px-5 py-2.5 text-sm font-bold text-white shadow-md transition-all duration-150 hover:bg-[var(--color-primary-hover)] hover:shadow-lg active:scale-[0.97]"
                >
                  Başvuruyu Gönder
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
