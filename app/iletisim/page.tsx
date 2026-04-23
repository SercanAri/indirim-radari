import type { Metadata } from "next";
import { Building2, Mail, Newspaper, Send } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Breadcrumb from "@/components/breadcrumb";

export const metadata: Metadata = {
  title: "İletişim",
  description:
    "indi. ile iletişime geç. Genel sorular, marka ortaklığı veya basın talepleri için doğru kanal.",
};

const CHANNELS = [
  {
    icon: Mail,
    title: "Genel iletişim",
    desc: "Soru, öneri, geri bildirim için aşağıdaki form ya da e-posta.",
    email: "selam@indi.co",
    accent: "bg-[var(--color-primary)]/10 text-[var(--color-primary)]",
  },
  {
    icon: Building2,
    title: "Marka olarak listelenmek istiyorum",
    desc: "Kampanyalarınızı indi. radarına ekleyelim. Ürün ekibimiz 48 saat içinde döner.",
    email: "marka@indi.co",
    accent: "bg-[var(--color-accent)]/10 text-[var(--color-accent)]",
  },
  {
    icon: Newspaper,
    title: "Basın",
    desc: "Röportaj, basın açıklaması, medya kiti — doğrudan bu adrese.",
    email: "basin@indi.co",
    accent: "bg-[var(--color-success)]/10 text-[var(--color-success)]",
  },
];

export default function IletisimPage() {
  return (
    <>
      <Header />
      <main className="flex-1 py-8 sm:py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <Breadcrumb
            className="mb-5"
            items={[
              { label: "Ana Sayfa", href: "/" },
              { label: "İletişim" },
            ]}
          />

          <div className="mb-8">
            <h1 className="text-2xl font-black text-[var(--foreground)] sm:text-3xl">
              İletişim
            </h1>
            <p className="mt-2 text-sm text-[var(--muted)] sm:text-base">
              Hangi kanalı seçeceğinden emin değilsen en aşağıdaki forma yaz —
              doğru ekibe yönlendiririz.
            </p>
          </div>

          {/* 3 kanal CTA */}
          <div className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-3">
            {CHANNELS.map(({ icon: Icon, title, desc, email, accent }) => (
              <a
                key={email}
                href={`mailto:${email}`}
                className="group flex flex-col gap-3 rounded-2xl border border-[var(--border)] bg-[var(--background)] p-5 transition-all duration-150 hover:-translate-y-0.5 hover:border-[var(--color-primary)]/40 hover:shadow-md active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]/40"
              >
                <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${accent}`}>
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <h2 className="text-sm font-bold text-[var(--foreground)]">{title}</h2>
                  <p className="mt-1 text-xs text-[var(--muted)]">{desc}</p>
                </div>
                <span className="mt-auto text-xs font-semibold text-[var(--color-primary)]">
                  {email} →
                </span>
              </a>
            ))}
          </div>

          {/* Form */}
          <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-8">
            <h2 className="text-lg font-bold text-[var(--foreground)]">Ya da formla yaz</h2>
            <p className="mt-1 text-sm text-[var(--muted)]">
              Genellikle 24 saat içinde yanıtlıyoruz.
            </p>
            <form
              action="#"
              method="post"
              className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2"
              aria-label="İletişim formu"
            >
              <div className="flex flex-col gap-1.5 sm:col-span-1">
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
              <div className="flex flex-col gap-1.5 sm:col-span-1">
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
              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label htmlFor="topic" className="text-xs font-bold text-[var(--foreground)]">
                  Konu
                </label>
                <select
                  id="topic"
                  name="topic"
                  className="rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 py-2.5 text-sm outline-none transition-colors focus:border-[var(--color-primary)]"
                >
                  <option>Genel soru</option>
                  <option>Geri bildirim / öneri</option>
                  <option>Marka ortaklığı</option>
                  <option>Basın / medya</option>
                  <option>Hata bildirimi</option>
                </select>
              </div>
              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label htmlFor="message" className="text-xs font-bold text-[var(--foreground)]">
                  Mesaj
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 py-2.5 text-sm outline-none transition-colors focus:border-[var(--color-primary)]"
                />
              </div>
              <div className="sm:col-span-2">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--color-primary)] px-5 py-2.5 text-sm font-bold text-white shadow-md transition-all duration-150 hover:bg-[var(--color-primary-hover)] hover:shadow-lg active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]/50 focus-visible:ring-offset-2"
                >
                  <Send className="h-4 w-4" aria-hidden="true" />
                  Gönder
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
