import Image from "next/image";
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
    <section id="kategoriler" className="w-full bg-[var(--surface)] py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--foreground)]">
              Kategoriler
            </h2>
            <p className="mt-1 text-sm text-[var(--muted)]">
              İlgilendiğin kategoriye göz at
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {categories.map((cat) => {
            const Icon = ICON_MAP[cat.icon];
            return (
              <a
                key={cat.id}
                href={`/kategori/${cat.slug}`}
                className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--background)] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[var(--color-primary)]/10 hover:border-[var(--color-primary)]/40 sm:aspect-[5/6] lg:aspect-[4/5]"
              >
                <Image
                  src={cat.imageUrl}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />

                {/* Accent highlight on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary)]/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Glass icon badge */}
                <div className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-xl border border-white/20 bg-white/10 backdrop-blur-md transition-all duration-300 group-hover:bg-[var(--color-primary)] group-hover:border-[var(--color-primary)] sm:h-10 sm:w-10">
                  {Icon && <Icon className="h-4 w-4 text-white sm:h-5 sm:w-5" strokeWidth={2} />}
                </div>

                {/* Deal count pill */}
                <div className="absolute top-3 left-3 rounded-full border border-white/20 bg-black/30 px-2.5 py-1 backdrop-blur-md">
                  <span className="text-[10px] font-semibold text-white sm:text-xs">
                    {cat.dealCount} kampanya
                  </span>
                </div>

                {/* Title content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                  <h3 className="text-base font-bold text-white sm:text-lg">
                    {cat.name}
                  </h3>
                  <div className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-white/90 opacity-0 transition-all duration-300 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0">
                    <span>Keşfet</span>
                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
