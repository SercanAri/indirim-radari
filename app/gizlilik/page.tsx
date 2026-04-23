import type { Metadata } from "next";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Breadcrumb from "@/components/breadcrumb";
import LegalTLDR from "@/components/legal-tldr";

export const metadata: Metadata = {
  title: "Gizlilik Politikası",
  description: "indi. verilerinizi nasıl topluyor, saklıyor ve kullanıyor — sade dille.",
};

export default function GizlilikPage() {
  return (
    <>
      <Header />
      <main className="flex-1 py-8 sm:py-12">
        <article className="mx-auto max-w-3xl px-4 sm:px-6">
          <Breadcrumb
            className="mb-5"
            items={[
              { label: "Ana Sayfa", href: "/" },
              { label: "Gizlilik Politikası" },
            ]}
          />

          <h1 className="text-2xl font-black text-[var(--foreground)] sm:text-3xl">
            Gizlilik Politikası
          </h1>
          <p className="mt-1.5 text-xs text-[var(--muted)]">Son güncelleme: 22 Nisan 2026</p>

          <LegalTLDR>
            Verinizi satmıyoruz. Sadece takip ettiğiniz markalarda bildirim göndermek ve
            siteyi iyileştirmek için kullanıyoruz. Hesabınızı istediğiniz an silebilirsiniz.
          </LegalTLDR>

          <section className="prose-custom space-y-4 text-sm leading-relaxed text-[var(--foreground)]/90 sm:text-base">
            <h2 className="mt-6 text-lg font-bold text-[var(--foreground)]">1. Hangi verileri topluyoruz?</h2>
            <ul className="list-disc space-y-1 pl-5 text-[var(--muted)]">
              <li><span className="text-[var(--foreground)]">Hesap:</span> e-posta, şifre (hash&apos;lenmiş), ad (isteğe bağlı).</li>
              <li><span className="text-[var(--foreground)]">Tercih:</span> takip ettiğiniz markalar, kurduğunuz alarmlar, favori kategoriler.</li>
              <li><span className="text-[var(--foreground)]">Teknik:</span> tarayıcı, cihaz tipi, anonim sayfa görüntüleme.</li>
            </ul>

            <h2 className="mt-6 text-lg font-bold text-[var(--foreground)]">2. Ne için kullanıyoruz?</h2>
            <ul className="list-disc space-y-1 pl-5 text-[var(--muted)]">
              <li>Takip ettiğiniz markaların kampanyası başladığında size haber vermek.</li>
              <li>Kurduğunuz fiyat alarmı hedefe düştüğünde bildirim göndermek.</li>
              <li>Arayüzü iyileştirmek (toplu, anonim istatistiklerle).</li>
            </ul>

            <h2 className="mt-6 text-lg font-bold text-[var(--foreground)]">3. Kimlerle paylaşıyoruz?</h2>
            <p className="text-[var(--muted)]">
              Üçüncü taraf reklam ağlarıyla{" "}
              <span className="font-semibold text-[var(--foreground)]">paylaşmıyoruz</span>. Kullandığımız
              hizmet sağlayıcılar: barındırma (Vercel), veritabanı (Supabase), e-posta
              servisi. Hepsi KVKK uyumlu sözleşme çerçevesinde.
            </p>

            <h2 className="mt-6 text-lg font-bold text-[var(--foreground)]">4. Çerezler</h2>
            <p className="text-[var(--muted)]">
              Sadece oturum çerezleri kullanıyoruz. Detay için{" "}
              <a className="font-semibold text-[var(--color-primary)] underline" href="/cerez">
                Çerez Politikası
              </a>
              .
            </p>

            <h2 className="mt-6 text-lg font-bold text-[var(--foreground)]">5. Haklarınız (KVKK)</h2>
            <p className="text-[var(--muted)]">
              Verinize erişme, düzeltme, silme, işlemeyi durdurma hakkınız var.{" "}
              <a className="font-semibold text-[var(--color-primary)] underline" href="/iletisim">
                İletişim sayfasından
              </a>{" "}
              talebinizi iletebilirsiniz — 30 gün içinde yanıtlarız.
            </p>

            <h2 className="mt-6 text-lg font-bold text-[var(--foreground)]">6. Güvenlik</h2>
            <p className="text-[var(--muted)]">
              Şifreler bcrypt ile hash&apos;lenir. Trafik HTTPS üzerinden şifrelenir.
              Üçüncü taraf ödeme verisi tutmuyoruz.
            </p>

            <h2 className="mt-6 text-lg font-bold text-[var(--foreground)]">7. İletişim</h2>
            <p className="text-[var(--muted)]">
              Gizlilikle ilgili her türlü soru için:{" "}
              <a className="font-semibold text-[var(--color-primary)]" href="mailto:gizlilik@indi.co">
                gizlilik@indi.co
              </a>
            </p>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}
