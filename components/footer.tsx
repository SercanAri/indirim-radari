import Link from "next/link";
import Logo from "./logo";

// Inline SVG paths (Simple Icons, CC0). Official brand marks → logodan tanınır.
const SOCIAL = [
  {
    name: "X",
    href: "https://x.com",
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
  {
    name: "Facebook",
    href: "https://facebook.com",
    path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
  },
  {
    name: "Instagram",
    href: "https://instagram.com",
    path: "M12 2.163c3.204 0 3.584.012 4.849.07 3.259.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.849.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
  },
];

const footerLinks = {
  Platform: [
    { label: "Tüm Kampanyalar", href: "/kampanyalar" },
    { label: "Markalar", href: "/markalar" },
    { label: "Fiyat Geçmişi", href: "/fiyat-gecmisi/iphone-15" },
    { label: "Favorilerim", href: "/favorilerim" },
    { label: "Hesabım", href: "/hesabim" },
  ],
  Şirket: [
    { label: "Hakkımızda", href: "/hakkimizda" },
    { label: "Blog", href: "/blog" },
    { label: "İletişim", href: "/iletisim" },
    { label: "Kariyer", href: "/kariyer" },
  ],
  Yasal: [
    { label: "Gizlilik Politikası", href: "/gizlilik" },
    { label: "Kullanım Koşulları", href: "/kullanim-kosullari" },
    { label: "Çerez Politikası", href: "/cerez" },
  ],
};

export default function Footer() {
  return (
    <footer className="w-full border-t border-[var(--border)] bg-[var(--background)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 sm:py-14">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <Link href="/" aria-label="indi anasayfa">
              <Logo size="md" />
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-[var(--muted)]">
              <span className="font-semibold text-[var(--foreground)]">
                Radar açık, fiyatlar düşüyor.
              </span>
              <br />
              200+ markanın indirimlerini tek ekranda takip et. Kaçırmadan önce.
            </p>
            <div className="mt-4 flex gap-3">
              {SOCIAL.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`indi. ${social.name} hesabı`}
                  className="group flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] text-[var(--muted)] transition-all hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)]/5 hover:text-[var(--color-primary)]"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-4 w-4 transition-transform group-hover:scale-110"
                    aria-hidden="true"
                  >
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
                {group}
              </h3>
              <ul className="flex flex-col gap-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-[var(--foreground)] hover:text-[var(--color-primary)] transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Şeffaflık — Türk kullanıcı affiliate konusunda şüpheci, açık konuş */}
        <div className="mt-10 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 text-xs leading-relaxed text-[var(--muted)] sm:p-5">
          <p className="font-semibold text-[var(--foreground)]">
            Şeffaflık notu
          </p>
          <p className="mt-1">
            Bazı kampanya linkleri affiliate (komisyonlu) olabilir. Sen tıkladığında marka bize küçük bir komisyon verir —{" "}
            <span className="font-semibold text-[var(--foreground)]">
              senin ödediğin fiyat değişmez.
            </span>{" "}
            Kampanya sıralamasını komisyon etkilemez; editör her zaman en düşük fiyatı işaretler.
          </p>
        </div>

        <div className="mt-6 flex flex-col items-center justify-between gap-3 border-t border-[var(--border)] pt-6 sm:flex-row">
          <p className="text-xs text-[var(--muted)]">
            © 2026 indi. — Radar açık, fiyatlar düşüyor.
          </p>
          <p className="text-xs text-[var(--muted)]">
            Türkiye&apos;de hazırlandı
          </p>
        </div>
      </div>
    </footer>
  );
}
