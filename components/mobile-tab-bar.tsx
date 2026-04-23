"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, LayoutGrid, Heart, User } from "lucide-react";

const TABS = [
  {
    label: "Keşfet",
    href: "/",
    icon: Compass,
    match: (p: string) => p === "/" || p.startsWith("/kampanyalar"),
  },
  {
    label: "Kategori",
    href: "/#kategoriler",
    icon: LayoutGrid,
    match: (p: string) => p.startsWith("/kategori"),
  },
  {
    label: "Favori",
    href: "/favorilerim",
    icon: Heart,
    match: (p: string) => p.startsWith("/favorilerim"),
  },
  {
    label: "Hesap",
    href: "/giris",
    icon: User,
    match: (p: string) => p.startsWith("/giris") || p.startsWith("/hesap"),
  },
];

export default function MobileTabBar() {
  const pathname = usePathname() || "/";

  // Giriş ekranında tab bar gizli — form odaklı, dikkat dağıtmasın
  if (pathname === "/giris") return null;

  return (
    <nav
      aria-label="Alt menü"
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-[var(--border)] bg-[var(--background)]/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md md:hidden"
    >
      <ul className="flex items-stretch">
        {TABS.map((tab) => {
          const active = tab.match(pathname);
          const Icon = tab.icon;
          return (
            <li key={tab.href} className="flex-1">
              <Link
                href={tab.href}
                aria-current={active ? "page" : undefined}
                className={`flex flex-col items-center gap-0.5 py-2.5 text-[10px] font-bold transition-colors active:scale-[0.96] ${
                  active
                    ? "text-[var(--color-primary)]"
                    : "text-[var(--muted)] hover:text-[var(--foreground)]"
                }`}
              >
                <Icon
                  className={`h-5 w-5 transition-transform ${active ? "scale-110" : ""}`}
                  aria-hidden="true"
                />
                {tab.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
