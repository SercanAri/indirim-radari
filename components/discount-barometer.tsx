// İndirim barometresi — yarım daire gauge, SVG-only, server component.
// Haftalık değişen gösterge: bu hafta vs geçen hafta.

const THIS_WEEK = 32; // % piyasa ortalama indirim
const LAST_WEEK = 24;

function polar(angleDeg: number, r: number) {
  const rad = ((angleDeg - 180) * Math.PI) / 180;
  return { x: 100 + r * Math.cos(rad), y: 100 + r * Math.sin(rad) };
}

function describeArc(r: number, startDeg: number, endDeg: number) {
  const start = polar(startDeg, r);
  const end = polar(endDeg, r);
  const largeArc = endDeg - startDeg > 180 ? 1 : 0;
  return `M ${start.x.toFixed(1)} ${start.y.toFixed(1)} A ${r} ${r} 0 ${largeArc} 1 ${end.x.toFixed(1)} ${end.y.toFixed(1)}`;
}

export default function DiscountBarometer() {
  // 0-100 → 0-180 derece (yarım daire)
  const angle = (THIS_WEEK / 100) * 180;
  const diff = THIS_WEEK - LAST_WEEK;
  const sensitivity =
    diff > 0
      ? "Radar hassaslaşıyor"
      : diff < 0
      ? "Radar yumuşuyor"
      : "Radar stabil";

  return (
    <section
      aria-labelledby="barometer-heading"
      className="w-full border-t border-[var(--border)] bg-[var(--surface)] py-10 sm:py-14"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="mb-6 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-primary)]">
            İndirim barometresi
          </p>
          <h2
            id="barometer-heading"
            className="mt-2 text-2xl font-black text-[var(--foreground)] sm:text-3xl"
          >
            Bu hafta piyasa{" "}
            <span className="text-[var(--color-primary)]">%{THIS_WEEK}</span>{" "}
            daha indirimli
          </h2>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Geçen hafta %{LAST_WEEK}. {sensitivity}.
          </p>
        </div>

        <div className="flex justify-center">
          <div className="relative w-full max-w-md">
            <svg viewBox="0 0 200 120" className="h-full w-full" role="img" aria-label="İndirim gauge grafiği">
              <defs>
                <linearGradient id="gauge-fill" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="var(--color-success)" />
                  <stop offset="50%" stopColor="var(--color-accent)" />
                  <stop offset="100%" stopColor="var(--color-primary)" />
                </linearGradient>
              </defs>

              {/* Background track */}
              <path
                d={describeArc(80, 0, 180)}
                stroke="var(--border)"
                strokeWidth="14"
                fill="none"
                strokeLinecap="round"
              />

              {/* Value arc */}
              <path
                d={describeArc(80, 0, angle)}
                stroke="url(#gauge-fill)"
                strokeWidth="14"
                fill="none"
                strokeLinecap="round"
              />

              {/* Tick marks */}
              {[0, 25, 50, 75, 100].map((tick) => {
                const tickAngle = (tick / 100) * 180;
                const outer = polar(tickAngle, 92);
                const inner = polar(tickAngle, 84);
                return (
                  <line
                    key={tick}
                    x1={inner.x}
                    y1={inner.y}
                    x2={outer.x}
                    y2={outer.y}
                    stroke="var(--muted)"
                    strokeWidth="1.5"
                    opacity="0.4"
                  />
                );
              })}

              {/* Pointer */}
              <g transform={`rotate(${angle - 180} 100 100)`}>
                <line
                  x1="100"
                  y1="100"
                  x2="100"
                  y2="30"
                  stroke="var(--foreground)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <circle cx="100" cy="100" r="8" fill="var(--foreground)" />
                <circle cx="100" cy="100" r="4" fill="var(--color-primary)" />
              </g>

              {/* Labels */}
              <text x="12" y="118" className="fill-[var(--muted)] font-bold" fontSize="9">
                %0
              </text>
              <text
                x="188"
                y="118"
                textAnchor="end"
                className="fill-[var(--muted)] font-bold"
                fontSize="9"
              >
                %100
              </text>
            </svg>

            <div className="mt-2 text-center">
              <span className="text-5xl font-black tabular-nums text-[var(--foreground)]">
                %{THIS_WEEK}
              </span>
              <div
                className={`mt-1 inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold ${
                  diff > 0
                    ? "bg-[var(--color-success)]/10 text-[var(--color-success)]"
                    : "bg-[var(--color-muted)]/10 text-[var(--muted)]"
                }`}
              >
                {diff > 0 ? "↑" : diff < 0 ? "↓" : "→"} {Math.abs(diff)} puan /
                geçen hafta
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
