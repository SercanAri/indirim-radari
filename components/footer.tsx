import Link from "next/link";
import Logo from "./logo";

const footerLinks = {
  Platform: [
    { label: "Tüm Kampanyalar", href: "/kampanyalar" },
    { label: "Markalar", href: "/markalar" },
    { label: "Kategoriler", href: "/kampanyalar" },
    { label: "Giriş Yap", href: "/giris" },
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
            <p className="mt-3 text-sm text-[var(--muted)] max-w-xs leading-relaxed">
              Fiyatlar indi, sen de <span className="font-semibold text-[var(--color-accent)]">indi</span>&apos;yle indir. Türkiye&apos;nin büyük markalarındaki tüm kampanyaları tek ekranda yakala.
            </p>
            <div className="mt-4 flex gap-3">
              {["𝕏", "📘", "📸"].map((icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border)] text-sm hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
                >
                  {icon}
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

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-[var(--border)] pt-6 sm:flex-row">
          <p className="text-xs text-[var(--muted)]">
            © 2026 indi. — Cüzdanın seni seviyor.
          </p>
          <p className="text-xs text-[var(--muted)]">
            Türkiye&apos;den 🇹🇷 ile yapıldı
          </p>
        </div>
      </div>
    </footer>
  );
}
