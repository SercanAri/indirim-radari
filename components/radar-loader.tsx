interface Props {
  size?: number;
  label?: string;
}

/**
 * CSS-only radar loading spinner — theme-aware, reduced-motion safe.
 * Hero'daki logo + brand kimliğiyle tutarlı "premium his".
 */
export default function RadarLoader({ size = 48, label }: Props) {
  return (
    <div
      role="status"
      aria-label={label || "Yükleniyor"}
      className="inline-flex flex-col items-center gap-2"
    >
      <div
        className="relative motion-safe:[animation:radar-sweep_2s_linear_infinite]"
        style={{ width: size, height: size }}
      >
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-full border-2 border-[var(--color-primary)]/20"
        />
        <span
          aria-hidden="true"
          className="absolute inset-[18%] rounded-full border-2 border-[var(--color-primary)]/30"
        />
        <span
          aria-hidden="true"
          className="absolute inset-[40%] rounded-full bg-[var(--color-primary)]"
        />
        {/* Sweep line — CSS conic-gradient half circle */}
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "conic-gradient(from 0deg, var(--color-primary) 0%, transparent 25%, transparent 100%)",
            mask: "radial-gradient(circle, transparent 18%, black 19%, black 100%)",
            WebkitMask:
              "radial-gradient(circle, transparent 18%, black 19%, black 100%)",
            opacity: 0.6,
          }}
        />
      </div>
      {label && (
        <span className="text-xs font-semibold text-[var(--muted)]">{label}</span>
      )}
    </div>
  );
}
