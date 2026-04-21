"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { AnimatePresence, motion } from "framer-motion";

interface Slide {
  id: number;
  brand: string;
  logo: string;
  title: string;
  subtitle: string;
  discount: number;
  endsAt: Date;
  ctaLabel: string;
  ctaHref: string;
  accent: string;
  bgFrom: string;
  bgTo: string;
  visual: string;
}

const now = new Date();
const addHours = (h: number) => new Date(now.getTime() + h * 3600000);

const SLIDES: Slide[] = [
  {
    id: 1,
    brand: "Trendyol",
    logo: "🛍️",
    title: "Büyük Efsane İndirimi",
    subtitle: "Milyonlarca üründe kaçırılmaz fırsatlar seni bekliyor",
    discount: 70,
    endsAt: addHours(11),
    ctaLabel: "Hemen Alışveriş Yap",
    ctaHref: "#",
    accent: "#F27A1A",
    bgFrom: "#F27A1A",
    bgTo: "#FF6B35",
    visual: "🛒",
  },
  {
    id: 2,
    brand: "Hepsiburada",
    logo: "🟠",
    title: "Teknoloji Festivali",
    subtitle: "Telefon, laptop, TV ve daha fazlasında süper fırsatlar",
    discount: 55,
    endsAt: addHours(7),
    ctaLabel: "Fırsatları Keşfet",
    ctaHref: "#",
    accent: "#FF6000",
    bgFrom: "#FF6000",
    bgTo: "#FF8C42",
    visual: "📱",
  },
  {
    id: 3,
    brand: "LC Waikiki",
    logo: "👕",
    title: "Yaz Sezonu Sonu",
    subtitle: "Tüm yazlık ürünlerde sezon sonu büyük indirim",
    discount: 60,
    endsAt: addHours(18),
    ctaLabel: "Koleksiyonu Gör",
    ctaHref: "#",
    accent: "#0057A8",
    bgFrom: "#0057A8",
    bgTo: "#1976D2",
    visual: "👗",
  },
  {
    id: 4,
    brand: "MediaMarkt",
    logo: "📺",
    title: "Kırmızı Fiyat Günleri",
    subtitle: "Elektronik ve beyaz eşyada yılın en büyük indirimi",
    discount: 45,
    endsAt: addHours(5),
    ctaLabel: "Ürünleri İncele",
    ctaHref: "#",
    accent: "#CC0000",
    bgFrom: "#CC0000",
    bgTo: "#E53935",
    visual: "🖥️",
  },
  {
    id: 5,
    brand: "Sephora",
    logo: "💄",
    title: "Güzellik Haftası",
    subtitle: "Parfüm, cilt bakımı ve makyajda özel fiyatlar",
    discount: 40,
    endsAt: addHours(14),
    ctaLabel: "Güzelliği Keşfet",
    ctaHref: "#",
    accent: "#1A1A2E",
    bgFrom: "#1A1A2E",
    bgTo: "#7C3AED",
    visual: "✨",
  },
];

const AUTO_PLAY_MS = 6000;

// ─── Flip digit ───────────────────────────────────────────────────────────────
function FlipDigit({ value }: { value: string }) {
  return (
    <div className="relative h-10 w-7 overflow-hidden rounded-md bg-black/30 backdrop-blur-sm border border-white/10">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          initial={{ y: "-100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="absolute inset-0 flex items-center justify-center text-lg font-bold text-white tabular-nums"
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

// ─── Countdown ────────────────────────────────────────────────────────────────
function SlideCountdown({ endsAt }: { endsAt: Date }) {
  const calc = () => {
    const diff = Math.max(0, endsAt.getTime() - Date.now());
    return {
      h: Math.floor(diff / 3600000),
      m: Math.floor((diff % 3600000) / 60000),
      s: Math.floor((diff % 60000) / 1000),
    };
  };

  const [time, setTime] = useState(calc);

  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endsAt]);

  const parts = [
    { label: "SA", digits: pad(time.h) },
    { label: "DK", digits: pad(time.m) },
    { label: "SN", digits: pad(time.s) },
  ];

  return (
    <div className="flex items-end gap-2">
      {parts.map(({ label, digits }, i) => (
        <div key={label} className="flex flex-col items-center gap-1">
          <div className="flex gap-0.5">
            <FlipDigit value={digits[0]} />
            <FlipDigit value={digits[1]} />
          </div>
          <span className="text-[10px] font-semibold tracking-widest text-white/50">
            {label}
          </span>
          {i < 2 && (
            <span className="absolute mt-1 text-white/60 font-bold text-base hidden" />
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Progress bar ─────────────────────────────────────────────────────────────
function ProgressBar({
  active,
  paused,
  duration,
  onComplete,
}: {
  active: boolean;
  paused: boolean;
  duration: number;
  onComplete: () => void;
}) {
  const [width, setWidth] = useState(0);
  const startRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const pausedAtRef = useRef<number>(0);

  useEffect(() => {
    if (!active) {
      setWidth(0);
      startRef.current = null;
      return;
    }

    if (paused) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      pausedAtRef.current = width;
      return;
    }

    const elapsed = (pausedAtRef.current / 100) * duration;

    const tick = (now: number) => {
      if (!startRef.current) startRef.current = now - elapsed;
      const progress = Math.min(((now - startRef.current) / duration) * 100, 100);
      setWidth(progress);
      if (progress < 100) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        onComplete();
      }
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, paused, duration]);

  return (
    <div className="h-0.5 w-full rounded-full bg-white/20">
      <div
        className="h-full rounded-full bg-white/80 transition-none"
        style={{ width: `${width}%` }}
      />
    </div>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────
export default function HeroSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selected, setSelected] = useState(0);
  const [paused, setPaused] = useState(false);

  const scrollTo = useCallback(
    (i: number) => emblaApi?.scrollTo(i),
    [emblaApi]
  );

  const advance = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi]);

  const slide = SLIDES[selected];

  return (
    <section
      className="w-full overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Embla viewport */}
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {SLIDES.map((s) => (
            <SlidePanel key={s.id} slide={s} />
          ))}
        </div>
      </div>

      {/* Controls */}
      <div
        className="relative px-4 py-4 sm:px-10"
        style={{ background: `linear-gradient(135deg, ${slide.bgFrom}22, ${slide.bgTo}18)` }}
      >
        <div className="mx-auto max-w-7xl">
          {/* Progress + dots row */}
          <div className="flex items-center gap-4">
            {SLIDES.map((s, i) => (
              <button
                key={s.id}
                onClick={() => scrollTo(i)}
                className="group flex flex-col gap-1.5 flex-1 min-w-0"
                aria-label={`${s.brand} slaytına git`}
              >
                <ProgressBar
                  active={i === selected}
                  paused={paused}
                  duration={AUTO_PLAY_MS}
                  onComplete={advance}
                />
                <span
                  className={`truncate text-xs font-semibold transition-colors ${
                    i === selected ? "text-[var(--foreground)]" : "text-[var(--muted)]"
                  }`}
                >
                  {s.brand}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Individual slide ─────────────────────────────────────────────────────────
function SlidePanel({ slide }: { slide: Slide }) {
  return (
    <div
      className="relative flex-[0_0_100%] min-w-0 overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${slide.bgFrom}dd, ${slide.bgTo}aa)`,
        minHeight: "clamp(360px, 50vw, 500px)",
      }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(ellipse 80% 80% at 70% 50%, ${slide.accent}88, transparent)`,
        }}
      />

      {/* Glassmorphism card (desktop) */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-start justify-center gap-0 px-6 py-10 sm:flex-row sm:items-center sm:px-10 sm:gap-8"
        style={{ minHeight: "clamp(360px, 50vw, 500px)" }}>

        {/* Left: content */}
        <div className="flex flex-1 flex-col gap-4 sm:gap-5">
          {/* Brand badge */}
          <div className="flex items-center gap-2">
            <span className="text-2xl">{slide.logo}</span>
            <span className="rounded-full bg-white/20 backdrop-blur-sm border border-white/20 px-3 py-1 text-xs font-bold text-white tracking-wide uppercase">
              {slide.brand}
            </span>
          </div>

          {/* Discount */}
          <div
            className="font-bold leading-none text-white"
            style={{ fontSize: "clamp(56px, 8vw, 72px)" }}
          >
            %{slide.discount}
            <span className="ml-2 text-2xl sm:text-4xl font-semibold opacity-80">İNDİRİM</span>
          </div>

          {/* Title + subtitle */}
          <div>
            <h2 className="text-xl sm:text-3xl font-bold text-white leading-tight">
              {slide.title}
            </h2>
            <p className="mt-1 text-sm sm:text-base text-white/70 max-w-sm">
              {slide.subtitle}
            </p>
          </div>

          {/* Countdown */}
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold uppercase tracking-widest text-white/50">
              Kampanya bitimine kalan
            </span>
            <SlideCountdown endsAt={slide.endsAt} />
          </div>

          {/* CTA */}
          <a
            href={slide.ctaHref}
            className="mt-1 inline-flex w-fit items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold transition-all hover:scale-105 hover:shadow-lg"
            style={{ color: slide.accent }}
          >
            {slide.ctaLabel}
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        {/* Right: visual */}
        <div className="hidden sm:flex flex-1 items-center justify-center">
          {/* Glassmorphism panel */}
          <div
            className="relative flex items-center justify-center rounded-3xl border border-white/20 bg-white/10 backdrop-blur-md p-10 shadow-2xl"
            style={{ width: 320, height: 320 }}
          >
            {/* Inner glow */}
            <div
              className="absolute inset-0 rounded-3xl opacity-40"
              style={{ background: `radial-gradient(circle at 50% 50%, ${slide.accent}66, transparent 70%)` }}
            />
            <span className="relative z-10 text-[140px] leading-none select-none drop-shadow-2xl">
              {slide.visual}
            </span>
          </div>
        </div>

        {/* Mobile visual (small, top-right corner) */}
        <div className="absolute right-4 top-4 text-6xl opacity-30 sm:hidden select-none">
          {slide.visual}
        </div>
      </div>
    </div>
  );
}
