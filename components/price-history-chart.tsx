import type { PricePoint } from "@/lib/price-history-data";

interface Props {
  history: PricePoint[];
  currentPrice: number;
}

// Inline SVG line chart — responsive, theme-aware via CSS variables.
// Prod'da Recharts/Chart.js'e geçilebilir; şu an bağımlılık yok, bundle'a yük bindirmiyor.
export default function PriceHistoryChart({ history, currentPrice }: Props) {
  const w = 800;
  const h = 280;
  const padX = 48;
  const padY = 40;

  const prices = history.map((p) => p.price);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const range = max - min || 1;
  const stepX = (w - padX * 2) / (history.length - 1);

  const pointCoords = history.map((p, i) => ({
    x: padX + i * stepX,
    y: padY + (1 - (p.price - min) / range) * (h - padY * 2),
    price: p.price,
    month: p.month,
  }));

  const linePath = pointCoords
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(" ");

  const areaPath = `${linePath} L ${pointCoords[pointCoords.length - 1].x} ${h - padY} L ${pointCoords[0].x} ${h - padY} Z`;

  // Y ekseni için 4 grid çizgisi
  const gridLines = [0, 0.33, 0.66, 1].map((ratio) => ({
    y: padY + ratio * (h - padY * 2),
    value: Math.round(max - ratio * range),
  }));

  const minPoint = pointCoords.reduce((a, b) => (a.price < b.price ? a : b));
  const maxPoint = pointCoords.reduce((a, b) => (a.price > b.price ? a : b));
  const currentPoint = pointCoords[pointCoords.length - 1];

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--background)] p-4 sm:p-5">
      <svg
        viewBox={`0 0 ${w} ${h}`}
        className="h-64 w-full sm:h-72"
        preserveAspectRatio="none"
        role="img"
        aria-label="Son 12 ayın fiyat grafiği"
      >
        <defs>
          <linearGradient id="chart-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {gridLines.map((g) => (
          <g key={g.y}>
            <line
              x1={padX}
              y1={g.y}
              x2={w - padX}
              y2={g.y}
              stroke="var(--border)"
              strokeDasharray="2 4"
              strokeWidth={1}
            />
            <text
              x={padX - 8}
              y={g.y}
              textAnchor="end"
              dominantBaseline="middle"
              className="fill-[var(--muted)]"
              fontSize="11"
            >
              {g.value.toLocaleString("tr-TR")}
            </text>
          </g>
        ))}

        {/* Area fill */}
        <path d={areaPath} fill="url(#chart-area)" />

        {/* Line */}
        <path
          d={linePath}
          fill="none"
          stroke="var(--color-primary)"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Min marker — yeşil */}
        <g>
          <circle cx={minPoint.x} cy={minPoint.y} r={5} fill="var(--color-success)" stroke="var(--background)" strokeWidth={2} />
          <text
            x={minPoint.x}
            y={minPoint.y - 12}
            textAnchor="middle"
            className="fill-[var(--color-success)] font-bold"
            fontSize="11"
          >
            En düşük
          </text>
        </g>

        {/* Max marker — danger */}
        <g>
          <circle cx={maxPoint.x} cy={maxPoint.y} r={4} fill="var(--color-danger)" stroke="var(--background)" strokeWidth={2} />
          <text
            x={maxPoint.x}
            y={maxPoint.y - 10}
            textAnchor="middle"
            className="fill-[var(--color-danger)] font-bold"
            fontSize="10"
          >
            En yüksek
          </text>
        </g>

        {/* Current marker — primary, büyük */}
        <g>
          <circle cx={currentPoint.x} cy={currentPoint.y} r={7} fill="var(--color-primary)" stroke="var(--background)" strokeWidth={3} />
          <text
            x={currentPoint.x}
            y={currentPoint.y + 22}
            textAnchor="end"
            className="fill-[var(--foreground)] font-black"
            fontSize="12"
          >
            Şimdi · {currentPrice.toLocaleString("tr-TR")} ₺
          </text>
        </g>

        {/* X ekseni — ay etiketleri (sadece her 2 ayda bir) */}
        {pointCoords.map((p, i) =>
          i % 2 === 0 ? (
            <text
              key={p.month}
              x={p.x}
              y={h - 12}
              textAnchor="middle"
              className="fill-[var(--muted)]"
              fontSize="10"
            >
              {p.month}
            </text>
          ) : null
        )}
      </svg>
    </div>
  );
}
