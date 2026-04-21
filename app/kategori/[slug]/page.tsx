import { todayDeals, lastHoursDeals, upcomingDeals, categories } from "@/lib/mock-data";
import Header from "@/components/header";
import Footer from "@/components/footer";
import DealCard from "@/components/deal-card";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cat = categories.find((c) => c.slug === slug);
  if (!cat) return { title: "Kategori — İndirim Radarı" };
  return {
    title: `${cat.name} Kampanyaları — İndirim Radarı`,
    description: `${cat.name} kategorisindeki tüm aktif indirimleri ve kampanyaları keşfet.`,
  };
}

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const cat = categories.find((c) => c.slug === slug);
  if (!cat) notFound();

  const allDeals = [...lastHoursDeals, ...todayDeals, ...upcomingDeals];
  const filtered = allDeals.filter(
    (d) => d.category.toLowerCase() === cat.name.toLowerCase()
  );

  return (
    <>
      <Header />
      <main className="flex-1 py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-2 text-sm text-[var(--muted)]">
            <a href="/" className="hover:text-[var(--foreground)] transition-colors">Ana Sayfa</a>
            <span>/</span>
            <a href="/kampanyalar" className="hover:text-[var(--foreground)] transition-colors">Kampanyalar</a>
            <span>/</span>
            <span className="text-[var(--foreground)] font-medium">{cat.name}</span>
          </nav>

          {/* Header */}
          <div className="mb-8 flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
              <span className="text-2xl font-bold">{cat.dealCount}</span>
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[var(--foreground)]">
                {cat.name} Kampanyaları
              </h1>
              <p className="mt-0.5 text-sm text-[var(--muted)]">
                {filtered.length > 0 ? `${filtered.length} kampanya bulundu` : "Bu kategoride henüz kampanya yok"}
              </p>
            </div>
          </div>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {filtered.map((deal) => (
                <DealCard
                  key={deal.id}
                  deal={deal}
                  variant={deal.badge === "last" ? "last-hours" : "default"}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[var(--surface)] text-4xl">
                🔍
              </div>
              <p className="text-lg font-semibold text-[var(--foreground)]">
                Kampanya bulunamadı
              </p>
              <p className="text-sm text-[var(--muted)] max-w-xs">
                Bu kategoride şu an aktif kampanya yok. Takip ederek bildirim alabilirsin.
              </p>
              <a
                href="/kampanyalar"
                className="rounded-full bg-[var(--color-primary)] px-6 py-2 text-sm font-semibold text-white hover:bg-[var(--color-primary-hover)] transition-colors"
              >
                Tüm Kampanyalara Bak
              </a>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
