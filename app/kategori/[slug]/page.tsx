import Image from "next/image";
import Link from "next/link";
import { todayDeals, lastHoursDeals, upcomingDeals, categories } from "@/lib/mock-data";
import Header from "@/components/header";
import Footer from "@/components/footer";
import DealCard from "@/components/deal-card";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
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
  const Icon = ICON_MAP[cat.icon];

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero banner */}
        <section className="relative h-[260px] w-full overflow-hidden sm:h-[320px] lg:h-[380px]">
          <Image
            src={cat.imageUrl}
            alt={cat.name}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary)]/30 via-transparent to-transparent" />

          <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-8 sm:px-6 sm:pb-10 lg:pb-12">
            {/* Breadcrumb */}
            <nav className="mb-4 flex items-center gap-2 text-sm text-white/80">
              <Link href="/" className="hover:text-white transition-colors">Ana Sayfa</Link>
              <span className="text-white/50">/</span>
              <Link href="/kampanyalar" className="hover:text-white transition-colors">Kampanyalar</Link>
              <span className="text-white/50">/</span>
              <span className="font-medium text-white">{cat.name}</span>
            </nav>

            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md sm:h-16 sm:w-16">
                {Icon && <Icon className="h-7 w-7 text-white sm:h-8 sm:w-8" strokeWidth={1.75} />}
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                  {cat.name}
                </h1>
                <p className="mt-1 text-sm text-white/85 sm:text-base">
                  {cat.dealCount} aktif kampanya •{" "}
                  {filtered.length > 0 ? `${filtered.length} listelendi` : "Takibe al, bildirim gönderelim"}
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">

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
              <Link
                href="/kampanyalar"
                className="rounded-full bg-[var(--color-primary)] px-6 py-2 text-sm font-semibold text-white hover:bg-[var(--color-primary-hover)] transition-colors"
              >
                Tüm Kampanyalara Bak
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
