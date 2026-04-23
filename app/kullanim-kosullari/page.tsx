import type { Metadata } from "next";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Breadcrumb from "@/components/breadcrumb";
import LegalTLDR from "@/components/legal-tldr";

export const metadata: Metadata = {
  title: "Kullanım Koşulları",
  description: "indi. kullanım koşulları — sade dille.",
};

export default function KullanimPage() {
  return (
    <>
      <Header />
      <main className="flex-1 py-8 sm:py-12">
        <article className="mx-auto max-w-3xl px-4 sm:px-6">
          <Breadcrumb
            className="mb-5"
            items={[
              { label: "Ana Sayfa", href: "/" },
              { label: "Kullanım Koşulları" },
            ]}
          />

          <h1 className="text-2xl font-black text-[var(--foreground)] sm:text-3xl">
            Kullanım Koşulları
          </h1>
          <p className="mt-1.5 text-xs text-[var(--muted)]">Son güncelleme: 22 Nisan 2026</p>

          <LegalTLDR>
            indi. bir karşılaştırma platformudur; satış yapmayız. Kampanya fiyatları
            markalardan alınır, anlık değişebilir. Satın almayı markanın sitesinde
            tamamlarsınız.
          </LegalTLDR>

          <section className="prose-custom space-y-4 text-sm leading-relaxed text-[var(--foreground)]/90 sm:text-base">
            <h2 className="mt-6 text-lg font-bold text-[var(--foreground)]">1. Hizmetin Tanımı</h2>
            <p className="text-[var(--muted)]">
              indi. Türkiye pazarındaki markaların kampanya ve fiyatlarını takip eden
              bir arayüzdür. Satın alma işlemi her zaman ilgili markanın sitesinde
              tamamlanır. Biz satıcı değiliz.
            </p>

            <h2 className="mt-6 text-lg font-bold text-[var(--foreground)]">2. Kullanıcı Hesabı</h2>
            <ul className="list-disc space-y-1 pl-5 text-[var(--muted)]">
              <li>18 yaşından büyük olmalısınız.</li>
              <li>Doğru ve güncel bilgi vermelisiniz.</li>
              <li>Şifrenizin güvenliğinden siz sorumlusunuz.</li>
            </ul>

            <h2 className="mt-6 text-lg font-bold text-[var(--foreground)]">3. Fiyat ve Ürün Bilgisi</h2>
            <p className="text-[var(--muted)]">
              Fiyatlar ve stok durumu markaların sitelerinden otomatik çekilir; anlık
              değişebilir. Biz doğruluk için azami çabayı gösteririz ama nihai fiyat
              markanın ödeme sayfasındaki fiyattır.
            </p>

            <h2 className="mt-6 text-lg font-bold text-[var(--foreground)]">4. Affiliate İlişkileri</h2>
            <p className="text-[var(--muted)]">
              Bazı kampanya linkleri komisyonludur. Sizin ödediğiniz fiyat değişmez.
              Kampanya sıralamasını komisyon etkilemez. Detay:{" "}
              <a className="font-semibold text-[var(--color-primary)] underline" href="/hakkimizda">
                Hakkımızda sayfası
              </a>
              .
            </p>

            <h2 className="mt-6 text-lg font-bold text-[var(--foreground)]">5. Yasak Kullanım</h2>
            <ul className="list-disc space-y-1 pl-5 text-[var(--muted)]">
              <li>Otomatize botlarla fiyat verisi çekmek.</li>
              <li>Platformu fiyat manipülasyonu için kullanmak.</li>
              <li>Başkasının hesabıyla giriş yapmak.</li>
            </ul>

            <h2 className="mt-6 text-lg font-bold text-[var(--foreground)]">6. Sorumluluk Sınırı</h2>
            <p className="text-[var(--muted)]">
              Satın alma kararınızın sorumluluğu size aittir. Markanın iade, kargo,
              garanti koşulları markanın kendi politikasıyla belirlenir. indi. bu
              süreçte aracı değildir.
            </p>

            <h2 className="mt-6 text-lg font-bold text-[var(--foreground)]">7. Hesabın Kapatılması</h2>
            <p className="text-[var(--muted)]">
              Hesabınızı istediğiniz an ayarlardan silebilirsiniz. Kötüye kullanım
              tespit edilirse hesapları askıya alma hakkımızı saklı tutarız.
            </p>

            <h2 className="mt-6 text-lg font-bold text-[var(--foreground)]">8. Uyuşmazlık ve Yetki</h2>
            <p className="text-[var(--muted)]">
              Bu koşullar Türkiye Cumhuriyeti hukukuna tabidir. Uyuşmazlıklarda
              İstanbul Mahkemeleri yetkilidir.
            </p>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}
