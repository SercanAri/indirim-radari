import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface Crumb {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: Crumb[];
  /** Koyu arka plan üzerinde kullanılıyorsa (hero içi vs.) */
  variant?: "default" | "onDark";
  className?: string;
}

export default function Breadcrumb({ items, variant = "default", className = "" }: BreadcrumbProps) {
  const onDark = variant === "onDark";
  const linkClass = onDark
    ? "text-white/80 hover:text-white"
    : "text-[var(--muted)] hover:text-[var(--color-primary)]";
  const currentClass = onDark ? "font-medium text-white" : "font-semibold text-[var(--foreground)]";
  const sepClass = onDark ? "text-white/40" : "text-[var(--muted)]";

  return (
    <nav aria-label="Sayfa konumu" className={`flex items-center gap-1.5 text-sm ${className}`}>
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={`${item.label}-${i}`} className="flex items-center gap-1.5">
              {item.href && !isLast ? (
                <Link href={item.href} className={`transition-colors ${linkClass}`}>
                  {item.label}
                </Link>
              ) : (
                <span className={currentClass} aria-current={isLast ? "page" : undefined}>
                  {item.label}
                </span>
              )}
              {!isLast && (
                <ChevronRight className={`h-3.5 w-3.5 ${sepClass}`} aria-hidden="true" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
