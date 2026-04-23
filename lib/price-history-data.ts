// Mock fiyat geçmişi — her ürün için 12 aylık veri noktası.
// Scraper altyapısı devreye girene kadar sabit seed.
// Noktalar günlük değil aylık; chart smooth curve ile bağlar.

export interface PricePoint {
  month: string; // "Ocak", "Şubat"...
  price: number;
}

export interface MarketPrice {
  brand: string;
  price: number;
  logoSlug: string;
}

export interface ProductHistory {
  slug: string;
  name: string;
  category: string;
  brand: string;
  brandSlug: string;
  imageUrl: string;
  history: PricePoint[];
  competitors: MarketPrice[];
}

const MONTHS = [
  "May",
  "Haz",
  "Tem",
  "Ağu",
  "Eyl",
  "Eki",
  "Kas",
  "Ara",
  "Oca",
  "Şub",
  "Mar",
  "Nis",
];

export const PRODUCTS: ProductHistory[] = [
  {
    slug: "iphone-15",
    name: "iPhone 15 128 GB",
    category: "Elektronik",
    brand: "Apple",
    brandSlug: "apple",
    imageUrl:
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&h=600&fit=crop&q=85",
    history: [
      { month: MONTHS[0], price: 54999 },
      { month: MONTHS[1], price: 53499 },
      { month: MONTHS[2], price: 52999 },
      { month: MONTHS[3], price: 54499 },
      { month: MONTHS[4], price: 52999 },
      { month: MONTHS[5], price: 50999 },
      { month: MONTHS[6], price: 48499 }, // Black Friday dip
      { month: MONTHS[7], price: 49999 },
      { month: MONTHS[8], price: 51499 },
      { month: MONTHS[9], price: 50499 },
      { month: MONTHS[10], price: 49999 },
      { month: MONTHS[11], price: 48999 },
    ],
    competitors: [
      { brand: "Trendyol", price: 48999, logoSlug: "trendyol" },
      { brand: "Hepsiburada", price: 49499, logoSlug: "hepsiburada" },
      { brand: "MediaMarkt", price: 49999, logoSlug: "mediamarkt" },
    ],
  },
  {
    slug: "dyson-v15",
    name: "Dyson V15 Detect",
    category: "Ev & Yaşam",
    brand: "Dyson",
    brandSlug: "dyson",
    imageUrl:
      "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=800&h=600&fit=crop&q=85",
    history: [
      { month: MONTHS[0], price: 12999 },
      { month: MONTHS[1], price: 12999 },
      { month: MONTHS[2], price: 11999 },
      { month: MONTHS[3], price: 12499 },
      { month: MONTHS[4], price: 11499 },
      { month: MONTHS[5], price: 9999 }, // Black Friday dip
      { month: MONTHS[6], price: 8990 },
      { month: MONTHS[7], price: 10499 },
      { month: MONTHS[8], price: 10999 },
      { month: MONTHS[9], price: 9999 },
      { month: MONTHS[10], price: 9499 },
      { month: MONTHS[11], price: 8400 }, // şimdi — 12 ayın en düşüğü
    ],
    competitors: [
      { brand: "Teknosa", price: 8400, logoSlug: "teknosa" },
      { brand: "Hepsiburada", price: 8790, logoSlug: "hepsiburada" },
      { brand: "Trendyol", price: 8990, logoSlug: "trendyol" },
    ],
  },
  {
    slug: "macbook-air-m3",
    name: "MacBook Air M3 13'",
    category: "Elektronik",
    brand: "Apple",
    brandSlug: "apple",
    imageUrl:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=600&fit=crop&q=85",
    history: [
      { month: MONTHS[0], price: 44999 },
      { month: MONTHS[1], price: 43999 },
      { month: MONTHS[2], price: 43499 },
      { month: MONTHS[3], price: 42999 },
      { month: MONTHS[4], price: 42499 },
      { month: MONTHS[5], price: 39999 }, // dip
      { month: MONTHS[6], price: 41499 },
      { month: MONTHS[7], price: 42999 },
      { month: MONTHS[8], price: 41999 },
      { month: MONTHS[9], price: 40999 },
      { month: MONTHS[10], price: 41499 },
      { month: MONTHS[11], price: 40499 },
    ],
    competitors: [
      { brand: "Apple", price: 40499, logoSlug: "apple" },
      { brand: "MediaMarkt", price: 41499, logoSlug: "mediamarkt" },
      { brand: "Teknosa", price: 42999, logoSlug: "teknosa" },
    ],
  },
];

export function findProduct(slug: string): ProductHistory | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}
