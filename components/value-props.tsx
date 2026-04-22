import { BarChart3, Bell, Zap } from "lucide-react";

const PROPS = [
  {
    icon: BarChart3,
    title: "200+ Marka",
    desc: "Tek ekranda karşılaştır",
  },
  {
    icon: Zap,
    title: "Canlı Fiyat",
    desc: "Gerçek zamanlı takip",
  },
  {
    icon: Bell,
    title: "Erken Bildirim",
    desc: "Kampanya başlamadan haber",
  },
];

export default function ValueProps() {
  return (
    <section
      aria-label="İndirim Radarı farkı"
      className="relative w-full border-b border-[var(--border)] bg-[var(--background)]"
    >
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 sm:py-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
          {/* Slogan */}
          <div className="shrink-0">
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-primary)]">
              İndirim Radarı farkı
            </p>
            <p className="mt-1 max-w-md text-sm font-semibold leading-snug text-[var(--foreground)] sm:text-base">
              200+ markayı tek ekranda karşılaştır,{" "}
              <span className="text-[var(--color-primary)]">en iyi fırsatı kaçırma.</span>
            </p>
          </div>

          {/* 3 fayda */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 lg:shrink-0">
            {PROPS.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="flex items-start gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2.5 sm:gap-2.5 sm:px-4 sm:py-3"
              >
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[var(--color-primary)]/10 text-[var(--color-primary)] sm:h-8 sm:w-8">
                  <Icon className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-xs font-bold text-[var(--foreground)] sm:text-sm">
                    {title}
                  </p>
                  <p className="truncate text-[10px] text-[var(--muted)] sm:text-xs">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
