import { categories } from "@/lib/mock-data";

export default function CategoriesGrid() {
  return (
    <section id="kategoriler" className="w-full bg-[var(--surface)] py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-5">
          <h2 className="text-xl sm:text-2xl font-bold text-[var(--foreground)]">
            Kategoriler
          </h2>
          <p className="mt-0.5 text-sm text-[var(--muted)]">
            İlgilendiğin kategoriye göz at
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
          {categories.map((cat) => (
            <a
              key={cat.id}
              href={`/kategori/${cat.slug}`}
              className="group flex flex-col items-center gap-2 rounded-2xl border border-[var(--border)] bg-[var(--background)] p-4 text-center transition-all duration-200 hover:-translate-y-1 hover:border-[var(--color-primary)]/40 hover:shadow-md"
            >
              <span className="text-3xl">{cat.icon}</span>
              <span className="text-xs font-semibold text-[var(--foreground)] group-hover:text-[var(--color-primary)] transition-colors">
                {cat.name}
              </span>
              <span className="rounded-full bg-[var(--surface)] px-2 py-0.5 text-xs text-[var(--muted)]">
                {cat.dealCount} kampanya
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
