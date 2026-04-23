import { Radar } from "lucide-react";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  variant?: "default" | "light";
  className?: string;
}

const SIZES = {
  sm: { mark: "h-7 w-7", icon: "h-4 w-4", text: "text-lg" },
  md: { mark: "h-9 w-9", icon: "h-5 w-5", text: "text-xl" },
  lg: { mark: "h-12 w-12", icon: "h-6 w-6", text: "text-3xl" },
};

export default function Logo({ size = "md", variant = "default", className = "" }: LogoProps) {
  const s = SIZES[size];
  const textClass = variant === "light" ? "text-white" : "text-[var(--foreground)]";

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Mark — radar badge, yavaş dalga efekti ile */}
      <div
        className={`relative flex ${s.mark} items-center justify-center rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[#ff4778] shadow-md shadow-[var(--color-primary)]/30`}
      >
        {/* Subtle radar pulse ring — reduced-motion'da görünmez, CSS @keyframes */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-xl ring-2 ring-[var(--color-primary)]/40 motion-safe:animate-ping"
          style={{ animationDuration: "2.5s" }}
        />
        <Radar className={`${s.icon} relative text-white`} strokeWidth={2.25} aria-hidden="true" />
      </div>

      {/* Wordmark */}
      <span className={`font-black tracking-tight lowercase ${s.text} ${textClass}`}>
        indi
        <span className="text-[var(--color-accent)]">.</span>
      </span>
    </div>
  );
}
