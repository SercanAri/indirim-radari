import RadarAnimation from "./radar-animation";

// Çalışan sayımı — deterministik (her dakika yeniden render olunca küçük oynama)
// Gerçek veri gelene kadar günün dakikası + sabit offset ile mock taze hissi.
function getScanningCount(): number {
  const minuteOfDay = Math.floor(Date.now() / 60000) % 1440;
  return 42 + (minuteOfDay % 17);
}

export default function RadarShowcase() {
  const count = getScanningCount();

  return (
    <section
      aria-labelledby="radar-showcase-heading"
      className="w-full border-y border-[var(--border)] bg-gradient-to-br from-[var(--surface)] via-[var(--background)] to-[var(--surface)] py-10 sm:py-14"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 sm:px-6 md:grid-cols-2 md:gap-12 2xl:max-w-[90rem]">
        {/* Radar animation */}
        <div className="flex justify-center md:justify-start">
          <RadarAnimation />
        </div>

        {/* Metin */}
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-primary)]">
            Canlı
          </p>
          <h2
            id="radar-showcase-heading"
            className="mt-2 text-2xl font-black text-[var(--foreground)] sm:text-3xl"
          >
            Radar şu an{" "}
            <span className="text-[var(--color-primary)] tabular-nums">{count}</span>{" "}
            kampanyayı tarıyor
          </h2>
          <p className="mt-2 max-w-md text-sm text-[var(--muted)] sm:text-base">
            200+ marka, dakikalık fiyat çekimi, erken bildirim. Sessiz
            yükselen bir fiyatı gözden kaçırmıyoruz — biz bakarız, sen
            bekle.
          </p>

          {/* Canlı istatistik şeridi */}
          <dl className="mt-5 grid grid-cols-3 gap-3 border-t border-[var(--border)] pt-4">
            <div>
              <dt className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted)]">
                Marka
              </dt>
              <dd className="mt-0.5 text-lg font-black tabular-nums text-[var(--foreground)]">
                247
              </dd>
            </div>
            <div>
              <dt className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted)]">
                Aktif Alarm
              </dt>
              <dd className="mt-0.5 text-lg font-black tabular-nums text-[var(--foreground)]">
                12.480
              </dd>
            </div>
            <div>
              <dt className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted)]">
                Bu ay tasarruf
              </dt>
              <dd className="mt-0.5 text-lg font-black tabular-nums text-[var(--foreground)]">
                4.2M ₺
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
