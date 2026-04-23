import { Mail, Send } from "lucide-react";

export default function NewsletterCTA() {
  return (
    <section
      aria-labelledby="newsletter-heading"
      className="w-full border-t border-[var(--border)] bg-[var(--background)] py-10 sm:py-14"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl border border-[var(--border)] bg-gradient-to-br from-[var(--color-primary)]/8 via-[var(--surface)] to-[var(--color-accent)]/6 p-6 sm:p-10">
          {/* Soft blob */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-[var(--color-primary)]/20 blur-3xl"
          />

          <div className="relative grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-primary)]/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-[var(--color-primary)]">
                <Mail className="h-3 w-3" />
                Haftalık bülten
              </span>
              <h2
                id="newsletter-heading"
                className="mt-3 text-2xl font-black text-[var(--foreground)] sm:text-3xl"
              >
                Bu haftanın en iyi 10 indirimi — her pazartesi
              </h2>
              <p className="mt-1.5 text-sm text-[var(--muted)]">
                Editör seçimi, sahte indirim yok. E-posta, spam değil.
              </p>
            </div>

            {/* Form — native HTML, JS olmadan submit edilebilir */}
            <form
              action="#"
              method="post"
              className="flex w-full flex-col gap-2 md:w-auto"
              aria-label="Newsletter abonelik formu"
            >
              <div className="flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--background)] px-4 py-1 shadow-sm focus-within:border-[var(--color-primary)] focus-within:shadow-md md:w-80">
                <Mail className="h-4 w-4 shrink-0 text-[var(--muted)]" aria-hidden="true" />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="ornek@email.com"
                  aria-label="E-posta adresi"
                  className="w-full bg-transparent py-2 text-sm text-[var(--foreground)] outline-none placeholder:text-[var(--muted)]"
                />
                <button
                  type="submit"
                  aria-label="Abone ol"
                  className="shrink-0 rounded-full bg-[var(--color-primary)] px-3 py-1.5 text-xs font-bold text-white shadow-sm transition-all duration-150 hover:bg-[var(--color-primary-hover)] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]/50"
                >
                  <Send className="h-3.5 w-3.5 md:hidden" aria-hidden="true" />
                  <span className="hidden md:inline">Abone Ol</span>
                </button>
              </div>
              <p className="text-center text-[11px] text-[var(--muted)] md:text-left">
                İstediğin zaman ayrıl. 47.280 aboneye katıl.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
