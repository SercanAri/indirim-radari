"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Heart, Search, User } from "lucide-react";
import { NavLink } from "@/types";
import Logo from "./logo";
import ThemeToggle from "./theme-toggle";

const navLinks: NavLink[] = [
  { label: "Kampanyalar", href: "/kampanyalar" },
  { label: "Markalar", href: "/markalar" },
  { label: "Kategoriler", href: "/#kategoriler" },
  { label: "Yakında", href: "/#yakinda" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [condensed, setCondensed] = useState(false);

  // Scroll'da header'ı küçült — sabit kalır, daha az yer kaplar
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setCondensed(window.scrollY > 60);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b border-[var(--border)] bg-[var(--background)]/90 backdrop-blur-md transition-[height,box-shadow] duration-200 ${
        condensed ? "h-12 shadow-sm" : "h-16"
      }`}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 2xl:max-w-[90rem]">
        {/* Logo + tagline */}
        <Link
          href="/"
          className="group flex shrink-0 items-center gap-3 transition-transform hover:scale-[1.02]"
          aria-label="indi. — Türkiye'nin İndirim Radarı"
        >
          <Logo size={condensed ? "sm" : "md"} />
          {!condensed && (
            <>
              <span className="hidden h-8 w-px bg-[var(--border)] lg:block" aria-hidden="true" />
              <span className="hidden text-xs font-semibold leading-tight text-[var(--muted)] lg:flex lg:flex-col">
                <span className="text-[10px] uppercase tracking-widest text-[var(--color-primary)]">
                  Türkiye&apos;nin
                </span>
                <span className="text-sm font-bold text-[var(--foreground)]">
                  İndirim Radarı
                </span>
              </span>
            </>
          )}
        </Link>

        {/* Desktop search — prominent, orta kısımda */}
        <form
          action="/kampanyalar"
          method="get"
          role="search"
          className={`group hidden flex-1 items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] text-sm text-[var(--muted)] transition-all focus-within:border-[var(--color-primary)] focus-within:bg-[var(--background)] focus-within:shadow-md focus-within:shadow-[var(--color-primary)]/10 sm:flex ${
            condensed ? "h-9 max-w-xl px-3" : "h-10 max-w-2xl px-4"
          }`}
        >
          <Search
            className="h-4 w-4 shrink-0 transition-colors group-focus-within:text-[var(--color-primary)]"
            aria-hidden="true"
          />
          <input
            type="search"
            name="q"
            placeholder="Marka, ürün, kampanya ara..."
            aria-label="Marka, ürün veya kampanya ara"
            autoComplete="off"
            className="w-full bg-transparent text-sm text-[var(--foreground)] outline-none placeholder:text-[var(--muted)]"
          />
          <button
            type="submit"
            aria-label="Ara"
            className="shrink-0 rounded-full bg-[var(--color-primary)] px-3 py-1 text-xs font-bold text-white transition-all duration-150 hover:bg-[var(--color-primary-hover)] active:scale-[0.97]"
          >
            Ara
          </button>
        </form>

        {/* Desktop nav — yoğun alanda minimal */}
        <nav className="hidden items-center gap-4 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right cluster */}
        <div className="flex shrink-0 items-center gap-2">
          <Link
            href="/favorilerim"
            aria-label="Favorilerim"
            className="hidden h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] text-[var(--muted)] transition-all duration-150 hover:border-[var(--color-primary)]/40 hover:text-[var(--color-primary)] active:scale-[0.95] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]/50 sm:flex"
          >
            <Heart className="h-4 w-4" />
          </Link>

          {!condensed && <ThemeToggle />}

          <Link
            href="/giris"
            className="hidden rounded-full bg-[var(--color-primary)] px-4 py-1.5 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-[var(--color-primary-hover)] hover:shadow-md active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] sm:inline-flex"
          >
            Giriş Yap
          </Link>

          {/* Mobile menu toggle */}
          <button
            className="rounded-full p-2 text-[var(--muted)] transition-colors hover:bg-[var(--surface)] active:scale-[0.95] lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Menüyü kapat" : "Menüyü aç"}
            aria-expanded={menuOpen}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu — arama → kategoriler → hesap */}
      {menuOpen && (
        <div className="border-t border-[var(--border)] bg-[var(--background)] lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6">
            {/* 1. Arama — en üstte */}
            <form
              action="/kampanyalar"
              method="get"
              role="search"
              className="flex items-center gap-2 rounded-full border border-[var(--color-primary)]/30 bg-[var(--surface)] px-3 py-2"
            >
              <Search className="h-4 w-4 shrink-0 text-[var(--muted)]" aria-hidden="true" />
              <input
                autoFocus
                type="search"
                name="q"
                placeholder="Marka, ürün, kampanya ara..."
                aria-label="Marka, ürün veya kampanya ara"
                className="w-full bg-transparent text-sm text-[var(--foreground)] outline-none placeholder:text-[var(--muted)]"
              />
              <button
                type="submit"
                className="shrink-0 rounded-full bg-[var(--color-primary)] px-3 py-1 text-xs font-bold text-white"
              >
                Ara
              </button>
            </form>

            {/* 2. Kategoriler / Navigasyon */}
            <nav className="flex flex-col gap-1">
              <p className="px-3 pt-1 text-[10px] font-bold uppercase tracking-widest text-[var(--muted)]">
                Keşfet
              </p>
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--surface)]"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* 3. Hesap */}
            <div className="flex flex-col gap-1 border-t border-[var(--border)] pt-3">
              <p className="px-3 pb-1 text-[10px] font-bold uppercase tracking-widest text-[var(--muted)]">
                Hesap
              </p>
              <Link
                href="/favorilerim"
                onClick={() => setMenuOpen(false)}
                className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--surface)]"
              >
                <Heart className="h-4 w-4 text-[var(--color-primary)]" />
                Favorilerim
              </Link>
              <Link
                href="/giris"
                onClick={() => setMenuOpen(false)}
                className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--surface)]"
              >
                <User className="h-4 w-4 text-[var(--color-primary)]" />
                Giriş Yap
              </Link>
              <div className="mt-2 px-3">
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
