import { Quote } from "lucide-react";

interface Testimonial {
  name: string;
  city: string;
  initials: string;
  avatarBg: string;
  quote: string;
  savings: string;
}

// Mock tanıklıklar — gerçek kullanıcı yorumu gelene kadar placeholder
const TESTIMONIALS: Testimonial[] = [
  {
    name: "Ayşe Y.",
    city: "İstanbul",
    initials: "AY",
    avatarBg: "bg-gradient-to-br from-[#f97316] to-[#ea580c]",
    quote:
      "Dyson saç bakım setini 6 aydır takip ediyordum. Alarm gelince anında sepete attım — 3.200 TL daha ucuza aldım.",
    savings: "3.200 ₺ tasarruf",
  },
  {
    name: "Mehmet K.",
    city: "Ankara",
    initials: "MK",
    avatarBg: "bg-gradient-to-br from-[#0ea5e9] to-[#0284c7]",
    quote:
      "Fiyat geçmişi grafiği hayat kurtarıyor. \"Efsane indirim\" dediği fiyat 3 ay önce zaten böyleydi — rozet uyardı, almadım.",
    savings: "Sahte indirimden kurtuldu",
  },
  {
    name: "Zeynep A.",
    city: "İzmir",
    initials: "ZA",
    avatarBg: "bg-gradient-to-br from-[#ec4899] to-[#db2777]",
    quote:
      "MacBook için üç marka birden takipte. Her gün ayrı siteye bakmak yorucuydu — tek ekran çok iyi geldi.",
    savings: "Haftada 2 saat kazandı",
  },
];

export default function Testimonials() {
  return (
    <section
      aria-labelledby="testimonials-heading"
      className="w-full bg-[var(--surface)] py-10 sm:py-14"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 2xl:max-w-[90rem]">
        <div className="mb-8 text-center sm:mb-10">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-primary)]">
            Kullanıcı sözü
          </p>
          <h2
            id="testimonials-heading"
            className="mt-2 text-2xl font-black text-[var(--foreground)] sm:text-3xl"
          >
            Radar açık tutanlar ne diyor?
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure
              key={t.name}
              className="flex flex-col gap-4 rounded-2xl border border-[var(--border)] bg-[var(--background)] p-5 transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md"
            >
              <Quote className="h-5 w-5 text-[var(--color-primary)]/40" aria-hidden="true" />
              <blockquote className="text-sm leading-relaxed text-[var(--foreground)]">
                {t.quote}
              </blockquote>
              <figcaption className="mt-auto flex items-center gap-3 border-t border-[var(--border)] pt-3">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-black text-white ${t.avatarBg}`}
                  aria-hidden="true"
                >
                  {t.initials}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-[var(--foreground)]">
                    {t.name}
                  </p>
                  <p className="truncate text-xs text-[var(--muted)]">{t.city}</p>
                </div>
                <span className="shrink-0 rounded-full bg-[var(--color-success)]/15 px-2 py-0.5 text-[10px] font-black uppercase tracking-wide text-[var(--color-success)]">
                  {t.savings}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
