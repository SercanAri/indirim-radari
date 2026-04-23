import type { Metadata } from "next";
import Link from "next/link";
import { Bell, LineChart, ArrowLeftRight, Radar, ShieldCheck } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Breadcrumb from "@/components/breadcrumb";

export const metadata: Metadata = {
  title: "Hakkımızda — indi.",
  description:
    "Türkiye'nin indirimlerini takip eden radar. Neden kurduk, neye inanıyoruz, nasıl çalışıyoruz.",
};

const VALUES = [
  {
    icon: ShieldCheck,
    title: "Sahte indirime karşı",
    body:
      "Kampanya fiyatı son 30 günün en uygunu değilse uyarıyoruz. Rozet yoksa dikkat et.",
  },
  {
    icon: Radar,
    title: "Radar açık 7/24",
    body:
      "200+ markayı dakikalık takip ederiz. Fiyat düştüğünde bilmek senin hakkın.",
  },
  {
    icon: Bell,
    title: "Bildirim, spam değil",
    body:
      "Sadece kurduğun alarm için haber veriyoruz. Haftalık bülten opsiyonel.",
  },
];

export default function HakkimizdaPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-[var(--border)] bg-gradient-to-br from-[var(--color-primary)]/8 via-[var(--surface)] to-[var(--color-accent)]/6">
          <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
            <Breadcrumb
              className="mb-5"
              items={[
                { label: "Ana Sayfa", href: "/" },
                { label: "Hakkımızda" },
              ]}
            />
            <h1 className="text-3xl font-black leading-tight text-[var(--foreground)] sm:text-4xl">
              Fiyatları takip etmek senin işin olmamalı.
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-[var(--muted)] sm:text-lg">
              indi. Türkiye&apos;nin büyük markalarını dakikalık takip eden bir
              radar. &ldquo;Son fırsat&rdquo; yazan her kampanya gerçekten
              fırsat mı? Bunun cevabını veren bir site istedik.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
          {/* Hikaye */}
          <article className="prose-custom">
            <h2 className="text-xl font-bold text-[var(--foreground)] sm:text-2xl">
              Neden kurduk
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[var(--foreground)]/90 sm:text-base">
              Türkiye&apos;de bir ürünün fiyat geçmişini bulmak zor. &ldquo;%70
              indirim&rdquo; yazan kampanyaların çoğu, 2 ay önceki zamlı fiyata
              göre hesaplanıyor. Kullanıcı gerçekten kazanmıyor — sadece daha
              hızlı satın alıyor.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[var(--foreground)]/90 sm:text-base">
              Bir ürünü 6 ay boyunca dört farklı sitede izledik. Ne zaman
              düşüyor, ne zaman tekrar yükseliyor, hangi kampanya sahte —
              elimizdeki tabloyu herkesin kullanabileceği hale getirmek
              istedik. indi. bu yüzden var.
            </p>

            <h2 className="mt-10 text-xl font-bold text-[var(--foreground)] sm:text-2xl">
              Neye inanıyoruz
            </h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-3">
              {VALUES.map(({ icon: Icon, title, body }) => (
                <li
                  key={title}
                  className="rounded-2xl border border-[var(--border)] bg-[var(--background)] p-4"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-3 text-sm font-bold text-[var(--foreground)]">
                    {title}
                  </h3>
                  <p className="mt-1 text-xs text-[var(--muted)]">{body}</p>
                </li>
              ))}
            </ul>

            <h2 className="mt-10 text-xl font-bold text-[var(--foreground)] sm:text-2xl">
              Nasıl çalışıyoruz
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[var(--foreground)]/90 sm:text-base">
              Her marka için bir scraper modülü, dakikalık fiyat çekimi,
              kampanya takvimi. Bir ürünün fiyatı değiştiğinde alarm kuran
              kullanıcılara e-posta gider. Kampanya başlangıcı yaklaşınca
              takipçilere önceden haber veririz. Basit bir kural: fiyat
              senin için düşüyorsa, sen bilmelisin.
            </p>

            <h2 className="mt-10 text-xl font-bold text-[var(--foreground)] sm:text-2xl">
              Radar nelerden oluşuyor
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div className="flex items-start gap-2.5 rounded-xl border border-[var(--border)] bg-[var(--background)] p-3">
                <Bell className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-primary)]" />
                <div>
                  <p className="text-sm font-bold text-[var(--foreground)]">
                    Fiyat alarmı
                  </p>
                  <p className="text-xs text-[var(--muted)]">
                    Hedef fiyata inince haber
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2.5 rounded-xl border border-[var(--border)] bg-[var(--background)] p-3">
                <LineChart className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-primary)]" />
                <div>
                  <p className="text-sm font-bold text-[var(--foreground)]">
                    90 günlük geçmiş
                  </p>
                  <p className="text-xs text-[var(--muted)]">
                    Gerçek indirim mi gör
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2.5 rounded-xl border border-[var(--border)] bg-[var(--background)] p-3">
                <ArrowLeftRight className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-primary)]" />
                <div>
                  <p className="text-sm font-bold text-[var(--foreground)]">
                    Marka karşılaştırma
                  </p>
                  <p className="text-xs text-[var(--muted)]">
                    En uygun yer burada
                  </p>
                </div>
              </div>
            </div>

            <h2 className="mt-10 text-xl font-bold text-[var(--foreground)] sm:text-2xl">
              Şeffaflık
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[var(--foreground)]/90 sm:text-base">
              Bazı kampanya linkleri affiliate (komisyonlu) olabilir — marka,
              bize küçük bir komisyon verir.{" "}
              <span className="font-semibold text-[var(--foreground)]">
                Senin ödediğin fiyat değişmez.
              </span>{" "}
              Kampanya sıralamasını komisyon etkilemez; editör her zaman en
              düşük fiyatı işaretler. Açık konuşmayı tercih ederiz.
            </p>
          </article>

          {/* CTA */}
          <div className="mt-10 flex flex-col items-center justify-center gap-3 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 text-center sm:flex-row sm:p-8">
            <div className="flex-1 text-left">
              <p className="text-base font-bold text-[var(--foreground)]">
                Radar kurmak 30 saniye sürer.
              </p>
              <p className="text-sm text-[var(--muted)]">
                Ücretsiz · kart bilgisi istemiyoruz · istediğin an çık.
              </p>
            </div>
            <Link
              href="/giris"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--color-primary)] px-5 py-2.5 text-sm font-bold text-white shadow-md transition-all duration-150 hover:bg-[var(--color-primary-hover)] hover:shadow-lg active:scale-[0.97]"
            >
              Hesap oluştur
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
