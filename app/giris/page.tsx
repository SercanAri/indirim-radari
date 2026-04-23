import type { Metadata } from "next";
import Link from "next/link";
import { Bell, Heart, LineChart, Mail, Lock, Eye, ArrowRight } from "lucide-react";
import Logo from "@/components/logo";

export const metadata: Metadata = {
  title: "Giriş Yap",
  description:
    "indi. hesabına giriş yap. Favori markalarını takip et, fiyat alarmı kur, kaçırmadan önce haber al.",
};

const REASONS = [
  { icon: Heart, text: "İlgilendiğin markaları takip et" },
  { icon: Bell, text: "Fiyat düşünce bildirim al" },
  { icon: LineChart, text: "Kişisel indirim akışı" },
];

function formatTakipLabel(slug: string): string {
  // "lcwaikiki" → "LC Waikiki", "trendyol" → "Trendyol"
  const map: Record<string, string> = {
    lcwaikiki: "LC Waikiki",
    hm: "H&M",
    mediamarkt: "MediaMarkt",
    defacto: "DeFacto",
  };
  if (map[slug]) return map[slug];
  if (/^\d+$/.test(slug)) return "Bu kampanyayı";
  return slug.charAt(0).toUpperCase() + slug.slice(1);
}

export default async function GirisPage({
  searchParams,
}: {
  searchParams: Promise<{ takip?: string }>;
}) {
  const { takip } = await searchParams;
  const takipLabel = takip ? formatTakipLabel(takip) : null;

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--background)] px-4 py-8">
      {/* Background decoration */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[var(--color-primary)]/10 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-[var(--color-accent)]/10 blur-3xl" />
      </div>

      <div className="relative w-full max-w-sm">
        {/* Logo */}
        <Link href="/" className="mb-8 flex items-center justify-center" aria-label="indi anasayfa">
          <Logo size="lg" />
        </Link>

        {/* Takip aktivasyon bandı */}
        {takipLabel && (
          <div className="mb-4 flex items-start gap-3 rounded-2xl border border-[var(--color-primary)]/30 bg-[var(--color-primary)]/8 p-3.5 text-left">
            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)]/15 text-[var(--color-primary)]">
              <Bell className="h-4 w-4" />
            </span>
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-wide text-[var(--color-primary)]">
                Takip için bir adım kaldı
              </p>
              <p className="mt-0.5 text-sm font-semibold leading-snug text-[var(--foreground)]">
                <span className="text-[var(--color-primary)]">{takipLabel}</span> kampanyası
                başladığı anda sana haber veriyoruz.
              </p>
            </div>
          </div>
        )}

        {/* Neden kayıt olmalıyım? — sadece takip link'inden gelmemişse göster */}
        {!takipLabel && (
          <div className="mb-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-3.5">
            <p className="text-[11px] font-bold uppercase tracking-widest text-[var(--color-primary)]">
              Neden kayıt olmalısın?
            </p>
            <ul className="mt-2 flex flex-col gap-1.5">
              {REASONS.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-2 text-sm text-[var(--foreground)]">
                  <Icon className="h-3.5 w-3.5 shrink-0 text-[var(--color-primary)]" aria-hidden="true" />
                  {text}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Card */}
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--background)] p-6 shadow-xl">
          <h1 className="mb-1 text-xl font-bold text-[var(--foreground)]">
            {takipLabel ? "Giriş yap, takibe al" : "Tekrar hoş geldin"}
          </h1>
          <p className="mb-6 text-sm text-[var(--muted)]">
            {takipLabel
              ? "Kampanya başladığında e-posta ile haber ver."
              : "Hesabına giriş yaparak kampanyaları takip et"}
          </p>

          <form className="flex flex-col gap-4">
            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[var(--foreground)]">
                E-posta
              </label>
              <div className="flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2.5 transition-colors focus-within:border-[var(--color-primary)]">
                <Mail className="h-4 w-4 shrink-0 text-[var(--muted)]" />
                <input
                  type="email"
                  placeholder="ornek@email.com"
                  className="w-full bg-transparent text-sm text-[var(--foreground)] outline-none placeholder:text-[var(--muted)]"
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-[var(--foreground)]">
                  Şifre
                </label>
                <Link href="/sifremi-unuttum" className="text-xs text-[var(--color-primary)] hover:underline">
                  Şifremi unuttum
                </Link>
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2.5 transition-colors focus-within:border-[var(--color-primary)]">
                <Lock className="h-4 w-4 shrink-0 text-[var(--muted)]" />
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-transparent text-sm text-[var(--foreground)] outline-none placeholder:text-[var(--muted)]"
                />
                <button type="button" className="text-[var(--muted)] hover:text-[var(--foreground)]">
                  <Eye className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="mt-1 flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--color-primary)] py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-primary-hover)]"
            >
              Giriş Yap
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          {/* Divider */}
          <div className="my-5 flex items-center gap-3">
            <div className="flex-1 border-t border-[var(--border)]" />
            <span className="text-xs text-[var(--muted)]">veya</span>
            <div className="flex-1 border-t border-[var(--border)]" />
          </div>

          {/* SSO placeholders — Google + Apple (iOS kullanıcıları şart) */}
          <div className="flex flex-col gap-2">
            <button
              type="button"
              className="flex w-full items-center justify-center gap-2.5 rounded-xl border border-[var(--border)] py-2.5 text-sm font-semibold text-[var(--foreground)] transition-all duration-150 hover:border-[var(--color-primary)]/40 hover:bg-[var(--surface)] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]/50"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Google ile devam et
            </button>
            <button
              type="button"
              className="flex w-full items-center justify-center gap-2.5 rounded-xl border border-[var(--border)] bg-[var(--foreground)] py-2.5 text-sm font-semibold text-[var(--background)] transition-all duration-150 hover:opacity-90 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--foreground)]/40"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
              </svg>
              Apple ile devam et
            </button>
          </div>
        </div>

        {/* Register link */}
        <p className="mt-5 text-center text-sm text-[var(--muted)]">
          Hesabın yok mu?{" "}
          <Link href="/kayit" className="font-semibold text-[var(--color-primary)] hover:underline">
            Ücretsiz kayıt ol
          </Link>
        </p>
      </div>
    </div>
  );
}
