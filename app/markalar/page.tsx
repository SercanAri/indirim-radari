import Image from "next/image";
import { brands } from "@/lib/mock-data";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { ExternalLink, Tag } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Markalar — İndirim Radarı",
  description: "Tüm markaları takip et, kampanya başladığında anında haber al.",
};

export default function BrandsPage() {
  const grouped = brands.reduce<Record<string, typeof brands>>((acc, brand) => {
    if (!acc[brand.category]) acc[brand.category] = [];
    acc[brand.category].push(brand);
    return acc;
  }, {});

  return (
    <>
      <Header />
      <main className="flex-1 py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          {/* Page header */}
          <div className="mb-10">
            <h1 className="text-2xl sm:text-3xl font-bold text-[var(--foreground)]">
              Markalar
            </h1>
            <p className="mt-1.5 text-sm text-[var(--muted)]">
              {brands.length} marka takip ediliyor — kampanya başladığında bildirim al
            </p>
          </div>

          {/* Category groups */}
          {Object.entries(grouped).map(([category, categoryBrands]) => (
            <div key={category} className="mb-10">
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-[var(--muted)]">
                {category}
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {categoryBrands.map((brand) => (
                  <div
                    key={brand.id}
                    className="group flex flex-col gap-4 rounded-2xl border border-[var(--border)] bg-[var(--background)] p-5 transition-all duration-200 hover:-translate-y-1 hover:border-[var(--color-primary)]/40 hover:shadow-lg cursor-pointer"
                  >
                    {/* Logo + name */}
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-12 overflow-hidden rounded-xl bg-white shadow-sm shrink-0">
                        <Image
                          src={brand.logoUrl}
                          alt={brand.name}
                          fill
                          className="object-contain p-1.5"
                          unoptimized
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-[var(--foreground)] truncate">
                          {brand.name}
                        </p>
                        <p className="text-xs text-[var(--muted)] truncate">
                          {brand.description}
                        </p>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-xs text-[var(--muted)]">
                        <Tag className="h-3.5 w-3.5" />
                        {brand.dealCount} aktif kampanya
                      </span>
                      <a
                        href={brand.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs text-[var(--muted)] hover:text-[var(--color-primary)] transition-colors"
                      >
                        <ExternalLink className="h-3 w-3" />
                        Site
                      </a>
                    </div>

                    {/* Follow button */}
                    <button className="w-full rounded-full border border-[var(--color-primary)] py-1.5 text-xs font-semibold text-[var(--color-primary)] transition-colors hover:bg-[var(--color-primary)] hover:text-white">
                      Takip Et
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
