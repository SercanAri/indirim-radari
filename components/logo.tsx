interface LogoProps {
  size?: "sm" | "md" | "lg";
  variant?: "default" | "light";
  className?: string;
}

const SIZES = {
  sm: { mark: "h-7 w-7", icon: "h-4 w-4", text: "text-lg", dot: "h-3 w-3 text-[6px]" },
  md: { mark: "h-9 w-9", icon: "h-5 w-5", text: "text-xl", dot: "h-3.5 w-3.5 text-[7px]" },
  lg: { mark: "h-12 w-12", icon: "h-6 w-6", text: "text-3xl", dot: "h-4 w-4 text-[8px]" },
};

export default function Logo({ size = "md", variant = "default", className = "" }: LogoProps) {
  const s = SIZES[size];
  const textClass = variant === "light" ? "text-white" : "text-[var(--foreground)]";

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Mark — gradient badge with down arrow + % dot */}
      <div className={`relative flex ${s.mark} items-center justify-center rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[#ff4778] shadow-md shadow-[var(--color-primary)]/30`}>
        <svg viewBox="0 0 24 24" className={`${s.icon} text-white`} fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 4v13" />
          <path d="M6 12l6 7 6-7" />
        </svg>
        <span className={`absolute -right-1 -top-1 flex ${s.dot} items-center justify-center rounded-full bg-[var(--color-accent)] font-black text-white ring-2 ring-[var(--background)]`}>
          %
        </span>
      </div>

      {/* Wordmark */}
      <span className={`font-black tracking-tight lowercase ${s.text} ${textClass}`}>
        indi
        <span className="text-[var(--color-accent)]">.</span>
      </span>
    </div>
  );
}
