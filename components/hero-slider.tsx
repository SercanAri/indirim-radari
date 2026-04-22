"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Bell } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { AnimatePresence, motion } from "framer-motion";
import BrandLogo from "./brand-logo";

interface Slide {
  id: number;
  brand: string;
  logoSlug: string;
  campaignName: string;
  urgency: string;
  fromPrice: number;
  discount: number;
  endsAt: Date;
  ctaLabel: string;
  ctaHref: string;
  accent: string;
  bgFrom: string;
  bgTo: string;
  imageUrl: string;
}

const now = new Date();
const addHours = (h: number) => new Date(now.getTime() + h * 3600000);

const SLIDES: Slide[] = [
  {
    id: 1,
    brand: "Trendyol",
    logoSlug: "trendyol",
    campaignName: "Efsane Hafta",
    urgency: "Bu fiyatlar ayda bir gelir — kaçırırsan 30 gün beklersin.",
    fromPrice: 149,
    discount: 70,
    endsAt: addHours(11),
    ctaLabel: "Hemen Sepete Koş",
    ctaHref: "#",
    accent: "#F27A1A",
    bgFrom: "#F27A1A",
    bgTo: "#FF6B35",
    imageUrl: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=900&h=900&fit=crop&q=85",
  },
  {
    id: 2,
    brand: "Hepsiburada",
    logoSlug: "hepsiburada",
    campaignName: "Teknoloji Festivali",
    urgency: "Elektronikte yılın sayılı kampanyalarından biri. Sonraki: Mayıs.",
    fromPrice: 499,
    discount: 55,
    endsAt: addHours(7),
    ctaLabel: "Fırsatları Tara",
    ctaHref: "#",
    accent: "#FF6000",
    bgFrom: "#FF6000",
    bgTo: "#FF8C42",
    imageUrl: "https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=900&h=900&fit=crop&q=85",
  },
  {
    id: 3,
    brand: "LC Waikiki",
    logoSlug: "lcwaikiki",
    campaignName: "Sezon Finali",
    urgency: "Stoklar sıfırlandığında aynı ürün bir daha gelmez.",
    fromPrice: 79,
    discount: 60,
    endsAt: addHours(18),
    ctaLabel: "Koleksiyonu Gez",
    ctaHref: "#",
    accent: "#0057A8",
    bgFrom: "#0057A8",
    bgTo: "#1976D2",
    imageUrl: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=900&h=900&fit=crop&q=85",
  },
  {
    id: 4,
    brand: "MediaMarkt",
    logoSlug: "mediamarkt",
    campaignName: "Kırmızı Fiyat Günleri",
    urgency: "Kırmızı Fiyat yılda sadece 2 kez — sonraki Kasım'da.",
    fromPrice: 1299,
    discount: 45,
    endsAt: addHours(5),
    ctaLabel: "Son 5 Saati Yakala",
    ctaHref: "#",
    accent: "#CC0000",
    bgFrom: "#CC0000",
    bgTo: "#E53935",
    imageUrl: "https://images.unsplash.com/photo-1593359677879-a4bb92f4834c?w=900&h=900&fit=crop&q=85",
  },
  {
    id: 5,
    brand: "Sephora",
    logoSlug: "sephora",
    campaignName: "Güzellik Haftası",
    urgency: "Aynı formül, sonraki indirim aylar sonra.",
    fromPrice: 249,
    discount: 40,
    endsAt: addHours(14),
    ctaLabel: "Güzelliğe Göz At",
    ctaHref: "#",
    accent: "#DB2777",
    bgFrom: "#500724",
    bgTo: "#DB2777",
    imageUrl: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=900&h=900&fit=crop&q=85",
  },
];

function formatTRY(n: number) {
  return n.toLocaleString("tr-TR") + " ₺";
}

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
      // Reset when this slide becomes inactive so it starts from 0 next time.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setWidth(0);
      startRef.current = null;
      pausedAtRef.current = 0;
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
        minHeight: "clamp(420px, 54vw, 540px)",
      }}
    >
      {/* Mobile background image (blurred, behind content) */}
      <div className="absolute inset-0 sm:hidden">
        <Image
          src={slide.imageUrl}
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-20"
          priority={slide.id === 1}
        />
      </div>

      {/* Background glow */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background: `radial-gradient(ellipse 80% 80% at 75% 50%, ${slide.accent}88, transparent)`,
        }}
      />

      {/* Content layer */}
      <div
        className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-start justify-center gap-0 px-6 py-10 sm:flex-row sm:items-center sm:px-10 sm:gap-10"
        style={{ minHeight: "clamp(420px, 54vw, 540px)" }}
      >
        {/* Left: content — hierarchy: brand+kampanya → discount+fiyat → countdown → urgency → CTAs */}
        <div className="flex flex-1 flex-col gap-4 sm:gap-5">
          {/* Brand + kampanya adı — en üst, primary tanım */}
          <div className="flex items-center gap-3">
            <BrandLogo
              name={slide.brand}
              logoUrl={`/brands/${slide.logoSlug}.svg`}
              size={40}
              radius={10}
              padding={5}
              className="shadow-lg"
            />
            <div className="flex min-w-0 flex-col">
              <span className="text-[11px] font-bold uppercase tracking-widest text-white/70">
                {slide.brand}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
                {slide.campaignName}
              </h2>
            </div>
          </div>

          {/* Discount + fromPrice — yan yana, ikisi de birincil bilgi */}
          <div className="flex flex-wrap items-end gap-x-5 gap-y-2">
            <div
              className="font-black leading-none text-white drop-shadow-lg"
              style={{ fontSize: "clamp(56px, 8vw, 76px)" }}
            >
              %{slide.discount}
              <span className="ml-2 text-2xl sm:text-3xl font-bold opacity-90 tracking-tight">
                İNDİRİM
              </span>
            </div>
            <div className="flex flex-col pb-1">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-white/60">
                Başlangıç
              </span>
              <span className="text-lg sm:text-xl font-bold text-white tabular-nums">
                {formatTRY(slide.fromPrice)}
              </span>
            </div>
          </div>

          {/* Countdown — prominent, bitiş zamanı "1 saniyede" anlaşılır */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/70">
              Kampanya bitimine
            </span>
            <SlideCountdown endsAt={slide.endsAt} />
          </div>

          {/* Urgency hook — slide-specific, kampanyanın neden kaçırılmayacağı */}
          <p className="max-w-md text-sm italic leading-snug text-white/85">
            ⚠ {slide.urgency}
          </p>

          {/* CTAs — primary + notify */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={slide.ctaHref}
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold shadow-lg transition-all hover:scale-105 hover:shadow-xl"
              style={{ color: slide.accent }}
            >
              {slide.ctaLabel}
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </a>
            <Link
              href={`/giris?takip=${slide.logoSlug}`}
              className="group inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-white/60 hover:bg-white/20"
            >
              <Bell className="h-4 w-4 transition-transform group-hover:scale-110 group-hover:rotate-12" />
              Takibe Al
            </Link>
          </div>
        </div>

        {/* Right: real photo visual (desktop) */}
        <div className="hidden sm:flex flex-1 items-center justify-center">
          <div className="relative">
            {/* Decorative floating discount badge */}
            <div
              className="absolute -top-4 -left-4 z-20 rotate-[-8deg] rounded-2xl bg-white px-4 py-2 shadow-2xl"
            >
              <div className="text-[10px] font-semibold uppercase tracking-widest text-[var(--muted)]">
                En Düşük
              </div>
              <div className="text-2xl font-black" style={{ color: slide.accent }}>
                %{slide.discount}
              </div>
            </div>

            {/* Main image — rounded card with inner glow */}
            <div
              className="relative overflow-hidden rounded-3xl border-4 border-white/20 shadow-2xl"
              style={{ width: 360, height: 360 }}
            >
              <Image
                src={slide.imageUrl}
                alt={`${slide.brand} ${slide.campaignName}`}
                fill
                sizes="360px"
                className="object-cover"
                priority={slide.id === 1}
              />
              {/* Color wash overlay */}
              <div
                className="absolute inset-0 mix-blend-multiply opacity-20"
                style={{ background: `linear-gradient(135deg, ${slide.bgFrom}, ${slide.bgTo})` }}
              />
              {/* Inner rim */}
              <div className="absolute inset-0 rounded-3xl shadow-[inset_0_0_60px_rgba(0,0,0,0.35)]" />
            </div>

            {/* Floating countdown badge */}
            <div className="absolute -bottom-4 -right-4 z-20 rotate-[6deg] rounded-2xl bg-black/80 backdrop-blur-md px-4 py-2.5 shadow-2xl border border-white/10">
              <div className="text-[10px] font-semibold uppercase tracking-widest text-white/60">
                🔥 Gözlem altında
              </div>
              <div className="text-sm font-bold text-white">
                Fiyatlar düşmeye devam
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
