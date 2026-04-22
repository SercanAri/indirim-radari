"use client";

import { useState } from "react";
import Link from "next/link";
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
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--border)] bg-[var(--background)]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Logo + tagline */}
        <Link
          href="/"
          className="group flex shrink-0 items-center gap-3 transition-transform hover:scale-[1.02]"
          aria-label="indi. — Türkiye'nin İndirim Radarı"
        >
          <Logo size="md" />
          <span className="hidden h-8 w-px bg-[var(--border)] lg:block" aria-hidden="true" />
          <span className="hidden text-xs font-semibold leading-tight text-[var(--muted)] lg:flex lg:flex-col">
            <span className="text-[10px] uppercase tracking-widest text-[var(--color-primary)]">
              Türkiye&apos;nin
            </span>
            <span className="text-sm font-bold text-[var(--foreground)]">
              İndirim Radarı
            </span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
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

        {/* Search + CTA */}
        <div className="flex items-center gap-3">
          {/* Search bar (desktop) */}
          <div className="hidden sm:flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-sm text-[var(--muted)] w-48 transition-all focus-within:w-64 focus-within:border-[var(--color-primary)]">
            <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
            <input
              type="text"
              placeholder="Marka/Ürün Ara"
              className="bg-transparent outline-none w-full text-[var(--foreground)] placeholder:text-[var(--muted)] text-sm"
            />
          </div>

          {/* Mobile search toggle */}
          <button
            className="sm:hidden rounded-full p-2 text-[var(--muted)] hover:bg-[var(--surface)]"
            onClick={() => setSearchOpen(!searchOpen)}
            aria-label="Arama"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
          </button>

          <ThemeToggle />

          <a
            href="/giris"
            className="rounded-full bg-[var(--color-primary)] px-4 py-1.5 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-[var(--color-primary-hover)] hover:shadow-md active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
          >
            Giriş Yap
          </a>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden rounded-full p-2 text-[var(--muted)] hover:bg-[var(--surface)]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menü"
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

      {/* Mobile search bar */}
      {searchOpen && (
        <div className="sm:hidden border-t border-[var(--border)] px-4 py-2">
          <div className="flex items-center gap-2 rounded-full border border-[var(--color-primary)] bg-[var(--surface)] px-3 py-2">
            <svg className="h-4 w-4 shrink-0 text-[var(--muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
            <input
              autoFocus
              type="text"
              placeholder="Marka/Ürün Ara"
              className="bg-transparent outline-none w-full text-sm text-[var(--foreground)] placeholder:text-[var(--muted)]"
            />
          </div>
        </div>
      )}

      {/* Mobile nav menu */}
      {menuOpen && (
        <nav className="md:hidden border-t border-[var(--border)] px-4 py-3 flex flex-col gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--surface)]"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
