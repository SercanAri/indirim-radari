// Radar görseli — SVG dalgalar + dönen sweep line + rasgele marka ping'leri.
// Server component, JS sıfır. Sadece CSS keyframes (reduced-motion safe).

interface PingBrand {
  name: string;
  slug: string;
  // Radar dairesi içinde konum (%, center referans)
  x: number;
  y: number;
  // Ping animasyonu başlangıç gecikmesi
  delay: string;
}

const PINGS: PingBrand[] = [
  { name: "Nike", slug: "nike", x: 32, y: 24, delay: "0s" },
  { name: "Trendyol", slug: "trendyol", x: 70, y: 38, delay: "0.8s" },
  { name: "Apple", slug: "apple", x: 58, y: 68, delay: "1.6s" },
  { name: "Zara", slug: "zara", x: 22, y: 62, delay: "2.4s" },
  { name: "Sephora", slug: "sephora", x: 46, y: 45, delay: "3.2s" },
  { name: "Samsung", slug: "samsung", x: 76, y: 74, delay: "4s" },
];

export default function RadarAnimation() {
  return (
    <div className="relative flex aspect-square w-full max-w-sm items-center justify-center">
      {/* Concentric rings */}
      <div className="absolute inset-0 rounded-full border border-[var(--color-primary)]/15" />
      <div className="absolute inset-[12%] rounded-full border border-[var(--color-primary)]/20" />
      <div className="absolute inset-[30%] rounded-full border border-[var(--color-primary)]/30" />
      <div className="absolute inset-[50%] rounded-full border border-[var(--color-primary)]/40" />

      {/* Crosshair lines */}
      <div className="absolute left-1/2 top-0 h-full w-px bg-[var(--color-primary)]/10" />
      <div className="absolute top-1/2 left-0 h-px w-full bg-[var(--color-primary)]/10" />

      {/* Center dot */}
      <span
        aria-hidden="true"
        className="absolute h-2.5 w-2.5 rounded-full bg-[var(--color-primary)]"
      />

      {/* Sweep line — döner */}
      <div
        aria-hidden="true"
        className="absolute inset-0 motion-safe:[animation:radar-sweep_4s_linear_infinite]"
        style={{
          background:
            "conic-gradient(from 0deg, var(--color-primary) 0%, transparent 20%, transparent 100%)",
          mask: "radial-gradient(circle, transparent 4%, black 5%, black 100%)",
          WebkitMask:
            "radial-gradient(circle, transparent 4%, black 5%, black 100%)",
          opacity: 0.25,
          borderRadius: "50%",
        }}
      />

      {/* Brand pings */}
      {PINGS.map((p) => (
        <div
          key={p.slug}
          className="absolute flex items-center justify-center motion-safe:[animation:radar-ping_4s_ease-in-out_infinite]"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            animationDelay: p.delay,
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-lg ring-2 ring-[var(--color-primary)]/40 sm:h-11 sm:w-11">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/brands/${p.slug}.svg`}
              alt={p.name}
              width={32}
              height={32}
              className="h-full w-full object-contain p-1.5"
              loading="lazy"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
