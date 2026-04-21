import KampanyaKart from "@/components/kampanya-kart";

const now = new Date();
const h = (n: number) => new Date(now.getTime() + n * 3_600_000);

const cards = [
  {
    brand: "Trendyol",
    logo: "🛍️",
    title: "Büyük Efsane — Tüm kategorilerde %70'e varan indirim",
    discountRate: 70,
    startsAt: h(-5),
    endsAt: h(20),
    category: "Genel",
  },
  {
    brand: "Hepsiburada",
    logo: "🟠",
    title: "Teknoloji Festivali — Telefon ve laptop fırsatları",
    discountRate: 55,
    startsAt: h(3),
    endsAt: h(48),
    category: "Elektronik",
  },
  {
    brand: "LC Waikiki",
    logo: "👕",
    title: "Yaz Sezonu Sonu — Tüm yazlıklarda son fırsatlar",
    discountRate: 60,
    startsAt: h(-24),
    endsAt: h(2),
    category: "Moda",
  },
  {
    brand: "MediaMarkt",
    logo: "📺",
    title: "Kırmızı Fiyat Günleri — Beyaz eşya kampanyası",
    discountRate: 45,
    startsAt: h(-10),
    endsAt: h(72),
    category: "Elektronik",
  },
  {
    brand: "Sephora",
    logo: "💄",
    title: "Güzellik Haftası — Parfüm ve cilt bakımında özel fiyatlar",
    discountRate: 40,
    startsAt: h(8),
    endsAt: h(96),
    category: "Güzellik",
  },
  {
    brand: "Nike",
    logo: "🏃",
    title: "Flash Sale — Yalnızca 3 saat geçerli süper fırsat",
    discountRate: 50,
    startsAt: h(-20),
    endsAt: h(1),
    category: "Spor",
  },
];

export default function DemoPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] p-6 sm:p-10">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-2 text-2xl font-bold text-[var(--foreground)]">
          KampanyaKart — 3 Variant Demo
        </h1>
        <p className="mb-8 text-sm text-[var(--muted)]">
          Variant otomatik hesaplanır: başlamadıysa{" "}
          <span className="font-semibold text-blue-500">yaklaşan</span>, son 4 saatteyse{" "}
          <span className="font-semibold text-red-500">bitiyor</span>, aksi halde{" "}
          <span className="font-semibold text-emerald-500">aktif</span>.
        </p>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, i) => (
            <KampanyaKart key={card.brand} {...card} index={i} />
          ))}
        </div>
      </div>
    </main>
  );
}
