import type { Metadata } from "next";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Breadcrumb from "@/components/breadcrumb";
import LegalTLDR from "@/components/legal-tldr";

export const metadata: Metadata = {
  title: "Çerez Politikası",
  description: "indi. hangi çerezleri kullanıyor, neden ve nasıl yönetirsiniz — sade dille.",
};

const COOKIES = [
  {
    name: "indi_session",
    type: "Zorunlu",
    purpose: "Giriş durumunu hatırlamak için. Siz çıkış yaptığınızda silinir.",
    duration: "Oturum",
  },
  {
    name: "theme",
    type: "Tercih",
    purpose: "Açık/koyu mod tercihinizi saklar.",
    duration: "1 yıl",
  },
  {
    name: "indi_takip",
    type: "Fonksiyonel",
    purpose: "Takibe aldığınız markalar (giriş yapılmadan test için).",
    duration: "30 gün",
  },
];

export default function CerezPage() {
  return (
    <>
      <Header />
      <main className="flex-1 py-8 sm:py-12">
        <article className="mx-auto max-w-3xl px-4 sm:px-6">
          <Breadcrumb
            className="mb-5"
            items={[
              { label: "Ana Sayfa", href: "/" },
              { label: "Çerez Politikası" },
            ]}
          />

          <h1 className="text-2xl font-black text-[var(--foreground)] sm:text-3xl">
            Çerez Politikası
          </h1>
          <p className="mt-1.5 text-xs text-[var(--muted)]">Son güncelleme: 22 Nisan 2026</p>

          <LegalTLDR>
            Reklam çerezi kullanmıyoruz. Sadece oturum ve tercih çerezleri — siz
            kapattığınızda kaybolur.
          </LegalTLDR>

          <section className="prose-custom space-y-4 text-sm leading-relaxed text-[var(--foreground)]/90 sm:text-base">
            <h2 className="mt-6 text-lg font-bold text-[var(--foreground)]">Kullandığımız çerezler</h2>
            <div className="mt-3 overflow-hidden rounded-2xl border border-[var(--border)]">
              <table className="w-full text-left text-sm">
                <thead className="bg-[var(--surface)] text-[10px] uppercase tracking-wide text-[var(--muted)]">
                  <tr>
                    <th className="px-3 py-2 font-bold">İsim</th>
                    <th className="px-3 py-2 font-bold">Tür</th>
                    <th className="hidden px-3 py-2 font-bold sm:table-cell">Amaç</th>
                    <th className="px-3 py-2 font-bold">Süre</th>
                  </tr>
                </thead>
                <tbody>
                  {COOKIES.map((c) => (
                    <tr key={c.name} className="border-t border-[var(--border)]">
                      <td className="px-3 py-2 font-mono text-xs">{c.name}</td>
                      <td className="px-3 py-2">
                        <span className="rounded-full bg-[var(--color-primary)]/10 px-2 py-0.5 text-[10px] font-bold text-[var(--color-primary)]">
                          {c.type}
                        </span>
                      </td>
                      <td className="hidden px-3 py-2 text-xs text-[var(--muted)] sm:table-cell">
                        {c.purpose}
                      </td>
                      <td className="px-3 py-2 text-xs text-[var(--muted)]">{c.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2 className="mt-6 text-lg font-bold text-[var(--foreground)]">
              Üçüncü taraf çerezler
            </h2>
            <p className="text-[var(--muted)]">
              Reklam ağı çerezi, Google/Facebook pixel kullanmıyoruz. Sitemizde
              herhangi bir üçüncü taraf takip scripti yoktur.
            </p>

            <h2 className="mt-6 text-lg font-bold text-[var(--foreground)]">
              Çerezleri nasıl yönetirsiniz?
            </h2>
            <p className="text-[var(--muted)]">
              Tarayıcı ayarlarından tüm çerezleri silebilir veya engelleyebilirsiniz.
              Zorunlu çerezleri engellerseniz giriş yapma gibi temel işlevler
              çalışmaz.
            </p>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}
