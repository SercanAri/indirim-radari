"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "light" | "dark";

const getSnapshot = (): Theme =>
  document.documentElement.classList.contains("dark") ? "dark" : "light";

const getServerSnapshot = (): Theme => "light";

const subscribe = (callback: () => void) => {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  // Sync across tabs
  window.addEventListener("storage", callback);
  return () => {
    observer.disconnect();
    window.removeEventListener("storage", callback);
  };
};

export default function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const isDark = theme === "dark";

  const toggle = () => {
    const next: Theme = isDark ? "light" : "dark";
    document.documentElement.classList.toggle("dark", next === "dark");
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* storage blocked — DOM state still updates */
    }
  };

  const label = isDark ? "Gece Avı" : "Vitrin Açık";
  const nextLabel = isDark ? "Vitrin Açık" : "Gece Avı";
  const punchline = isDark
    ? "Fiyat avcıları karanlıkta çalışır"
    : "Cüzdan güneşte ısınır";

  return (
    <button
      type="button"
      onClick={toggle}
      title={`${punchline} — ${nextLabel}'na geç`}
      aria-label={`Tema değiştir, şu an: ${label}`}
      suppressHydrationWarning
      className="group relative flex h-9 shrink-0 items-center gap-1.5 overflow-hidden rounded-full border border-[var(--border)] bg-[var(--surface)] px-2.5 text-xs font-bold text-[var(--foreground)] shadow-sm transition-all duration-300 hover:border-[var(--color-primary)]/50 hover:shadow-md md:px-3"
    >
      <span className="relative flex h-4 w-4 items-center justify-center">
        <Sun
          className={`absolute h-4 w-4 transition-all duration-500 ${
            isDark
              ? "rotate-90 scale-0 opacity-0"
              : "rotate-0 scale-100 text-[var(--color-accent)] opacity-100"
          }`}
        />
        <Moon
          className={`absolute h-4 w-4 transition-all duration-500 ${
            isDark
              ? "rotate-0 scale-100 text-[var(--color-primary)] opacity-100"
              : "-rotate-90 scale-0 opacity-0"
          }`}
        />
      </span>
      <span className="hidden md:inline" suppressHydrationWarning>
        {label}
      </span>
      {/* Subtle price-tag glow on hover */}
      <span className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-[var(--color-accent)]/0 via-[var(--color-primary)]/10 to-[var(--color-accent)]/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </button>
  );
}
