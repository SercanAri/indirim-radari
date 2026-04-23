import type { Metadata } from "next";
import Link from "next/link";
import { Bell, Heart, Mail, Rss, Settings, Smartphone, User } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Breadcrumb from "@/components/breadcrumb";

export const metadata: Metadata = {
  title: "Hesabım",
  description: "Akışın, alarmların, favorilerin ve ayarların tek ekranda.",
  robots: { index: false, follow: false },
};

// Mock kullanıcı verisi — backend gelene kadar görsel iskelet
const USER = {
  name: "Sercan",
  email: "sercan@ornek.com",
  memberSince: "Nisan 2026",
  stats: { follows: 0, alarms: 0, savings: 0 },
};

const TABS = [
  { id: "akis", label: "Akışım", icon: Rss },
  { id: "alarmlar", label: "Alarmlarım", icon: Bell },
  { id: "favoriler", label: "Favoriler", icon: Heart },
  { id: "ayarlar", label: "Profil & Ayarlar", icon: Settings },
];

export default function HesabimPage() {
  return (
    <>
      <Header />
      <main className="flex-1 py-8 sm:py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Breadcrumb
            className="mb-5"
            items={[{ label: "Ana Sayfa", href: "/" }, { label: "Hesabım" }]}
          />

          {/* Profil header */}
          <div className="mb-6 flex flex-col gap-4 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:flex-row sm:items-center sm:p-6">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--color-primary)] to-[#ff4778] text-xl font-black text-white">
              {USER.name[0]}
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-xl font-bold text-[var(--foreground)]">
                Merhaba, {USER.name}.
              </h1>
              <p className="text-sm text-[var(--muted)]">
                Üye: {USER.memberSince} · {USER.email}
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs sm:gap-4">
              <Stat label="Takip" value={USER.stats.follows} />
              <Stat label="Alarm" value={USER.stats.alarms} />
              <Stat label="Tasarruf" value={`${USER.stats.savings} ₺`} />
            </div>
          </div>

          {/* Tabs (pseudo — mevcut link'lerle gerçek route'a gitmiyor, section anchor) */}
          <nav aria-label="Hesap bölümleri" className="mb-8 border-b border-[var(--border)]">
            <ul className="flex gap-1 overflow-x-auto scrollbar-hide">
              {TABS.map((t, i) => {
                const Icon = t.icon;
                const active = i === 0;
                return (
                  <li key={t.id}>
                    <a
                      href={`#${t.id}`}
                      className={`inline-flex items-center gap-1.5 border-b-2 px-3 py-2.5 text-sm font-semibold transition-colors ${
                        active
                          ? "border-[var(--color-primary)] text-[var(--color-primary)]"
                          : "border-transparent text-[var(--muted)] hover:border-[var(--border)] hover:text-[var(--foreground)]"
                      }`}
                    >
                      <Icon className="h-4 w-4" aria-hidden="true" />
                      {t.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Akışım */}
          <Section id="akis" title="Akışım" description="Takip ettiğin markalardan en son kampanyalar.">
            <EmptyCard
              title="Akışın boş"
              body="Önce birkaç marka takibe al. Sonra kampanya başladığında buraya düşer."
              ctaLabel="Markaları Keşfet"
              ctaHref="/markalar"
            />
          </Section>

          {/* Alarmlar */}
          <Section id="alarmlar" title="Alarmlarım" description="Fiyat hedefleri — düştüğünde haber veriyoruz.">
            <EmptyCard
              title="Henüz alarm kurmadın"
              body='Bir ürün sayfasından "Bu fiyata düşerse haber ver" ile alarm kurabilirsin.'
              ctaLabel="Fiyat Geçmişine Bak"
              ctaHref="/fiyat-gecmisi/iphone-15"
            />
          </Section>

          {/* Favoriler */}
          <Section id="favoriler" title="Favoriler" description="Takip ettiğin kampanya ve markalar.">
            <EmptyCard
              title="Favori yok"
              body="Kampanya kartındaki kalp ikonuna tıklayarak buraya ekle."
              ctaLabel="Kampanyalara Git"
              ctaHref="/kampanyalar"
            />
          </Section>

          {/* Ayarlar */}
          <Section id="ayarlar" title="Profil & Ayarlar" description="Bildirim tercihi, hesap, veri.">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <SettingCard icon={Mail} title="E-posta bildirimi" status="Açık" />
              <SettingCard icon={Smartphone} title="Push bildirimi" status="Kapalı" />
              <SettingCard icon={Rss} title="Haftalık bülten" status="Açık" />
              <SettingCard icon={User} title="Hesabı sil" status="Talep et" danger />
            </div>
          </Section>
        </div>
      </main>
      <Footer />
    </>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex flex-col">
      <span className="text-[10px] font-bold uppercase tracking-wide text-[var(--muted)]">
        {label}
      </span>
      <span className="text-base font-black tabular-nums text-[var(--foreground)]">
        {value}
      </span>
    </div>
  );
}

function Section({
  id,
  title,
  description,
  children,
}: {
  id: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mb-10 scroll-mt-24">
      <div className="mb-3">
        <h2 className="text-lg font-bold text-[var(--foreground)]">{title}</h2>
        <p className="text-sm text-[var(--muted)]">{description}</p>
      </div>
      {children}
    </section>
  );
}

function EmptyCard({
  title,
  body,
  ctaLabel,
  ctaHref,
}: {
  title: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-[var(--border)] bg-[var(--surface)] p-6 text-center sm:p-8">
      <p className="text-sm font-bold text-[var(--foreground)]">{title}</p>
      <p className="mx-auto mt-1 max-w-md text-xs text-[var(--muted)]">{body}</p>
      <Link
        href={ctaHref}
        className="mt-4 inline-flex items-center gap-2 rounded-full bg-[var(--color-primary)] px-4 py-2 text-xs font-bold text-white shadow-sm transition-all duration-150 hover:bg-[var(--color-primary-hover)] active:scale-[0.97]"
      >
        {ctaLabel}
      </Link>
    </div>
  );
}

function SettingCard({
  icon: Icon,
  title,
  status,
  danger = false,
}: {
  icon: typeof Bell;
  title: string;
  status: string;
  danger?: boolean;
}) {
  return (
    <button
      type="button"
      className={`flex items-center justify-between gap-3 rounded-2xl border p-4 text-left transition-all duration-150 active:scale-[0.99] ${
        danger
          ? "border-[var(--color-danger)]/30 bg-[var(--color-danger)]/5 hover:border-[var(--color-danger)]/60"
          : "border-[var(--border)] bg-[var(--background)] hover:border-[var(--color-primary)]/40"
      }`}
    >
      <div className="flex items-center gap-3 min-w-0">
        <Icon
          className={`h-4 w-4 shrink-0 ${danger ? "text-[var(--color-danger)]" : "text-[var(--color-primary)]"}`}
          aria-hidden="true"
        />
        <span className="text-sm font-semibold text-[var(--foreground)]">{title}</span>
      </div>
      <span
        className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-bold ${
          danger
            ? "bg-[var(--color-danger)]/15 text-[var(--color-danger)]"
            : "bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
        }`}
      >
        {status}
      </span>
    </button>
  );
}
