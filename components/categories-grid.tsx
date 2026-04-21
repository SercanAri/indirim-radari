import { categories } from "@/lib/mock-data";
import {
  Shirt, Smartphone, Dumbbell, Sofa, Sparkles,
  BookOpen, Gamepad2, Plane,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  shirt: Shirt,
  smartphone: Smartphone,
  dumbbell: Dumbbell,
  sofa: Sofa,
  sparkles: Sparkles,
  "book-open": BookOpen,
  "gamepad-2": Gamepad2,
  plane: Plane,
};

export default function CategoriesGrid() {
  return (
    <section id="kategoriler" className="w-full bg-[var(--surface)] py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-[var(--foreground)]">
            Kategoriler
          </h2>
          <p className="mt-0.5 text-sm text-[var(--muted)]">
            İlgilendiğin kategoriye göz at
          </p>
        </div>

        <div className="grid grid-cols-4 gap-3 sm:grid-cols-4 lg:grid-cols-8">
          {categories.map((cat) => {
            const Icon = ICON_MAP[cat.icon];
            return (
              <a
                key={cat.id}
                href={`/kategori/${cat.slug}`}
                className="group flex flex-col items-center gap-2.5 rounded-2xl border border-[var(--border)] bg-[var(--background)] p-3 sm:p-4 text-center transition-all duration-200 hover:-translate-y-1 hover:border-[var(--color-primary)]/40 hover:shadow-md"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)] transition-colors group-hover:bg-[var(--color-primary)] group-hover:text-white">
                  {Icon && <Icon className="h-5 w-5" strokeWidth={1.75} />}
                </div>
                <span className="text-xs font-semibold text-[var(--foreground)] group-hover:text-[var(--color-primary)] transition-colors leading-tight">
                  {cat.name}
                </span>
                <span className="hidden sm:block rounded-full bg-[var(--surface)] px-2 py-0.5 text-[10px] text-[var(--muted)]">
                  {cat.dealCount} kampanya
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
