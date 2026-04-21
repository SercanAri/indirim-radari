"use client";

import { useState } from "react";

const slides = [
  {
    id: 1,
    brand: "Nike",
    title: "Yaz Koleksiyonu",
    subtitle: "%40'a varan indirimler başladı",
    accent: "#7C3AED",
    emoji: "🏃",
  },
  {
    id: 2,
    brand: "Apple",
    title: "Back to School",
    subtitle: "MacBook, iPad ve aksesuarlarda fırsatlar",
    accent: "#FF6B35",
    emoji: "🍎",
  },
  {
    id: 3,
    brand: "Zara",
    title: "Sezon Sonu",
    subtitle: "2.000+ üründe %50'ye varan indirim",
    accent: "#10B981",
    emoji: "👗",
  },
];

export default function HeroSlider() {
  const [active, setActive] = useState(0);
  const slide = slides[active];

  return (
    <section className="w-full bg-[var(--surface)] overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8 sm:py-12">
        {/* Slide content */}
        <div
          className="relative rounded-2xl p-6 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 min-h-[220px] sm:min-h-[280px] overflow-hidden transition-all duration-300"
          style={{ background: `${slide.accent}18`, border: `1px solid ${slide.accent}30` }}
        >
          {/* Decorative blur */}
          <div
            className="absolute -right-16 -top-16 h-64 w-64 rounded-full opacity-20 blur-3xl"
            style={{ background: slide.accent }}
          />

          <div className="relative z-10 flex flex-col gap-3 max-w-lg">
            <span
              className="inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-semibold text-white"
              style={{ background: slide.accent }}
            >
              {slide.brand}
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold text-[var(--foreground)] leading-tight">
              {slide.title}
            </h2>
            <p className="text-base sm:text-lg text-[var(--muted)]">{slide.subtitle}</p>
            <a
              href="#"
              className="mt-2 inline-flex w-fit items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ background: slide.accent }}
            >
              Kampanyayı Gör
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          <div className="relative z-10 text-8xl sm:text-[140px] leading-none select-none">
            {slide.emoji}
          </div>
        </div>

        {/* Dots */}
        <div className="mt-4 flex items-center justify-center gap-2">
          {slides.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setActive(i)}
              className="h-2 rounded-full transition-all duration-300"
              style={{
                width: i === active ? "24px" : "8px",
                background: i === active ? slide.accent : "var(--border)",
              }}
              aria-label={`Slayt ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
