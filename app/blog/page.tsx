import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Clock } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Breadcrumb from "@/components/breadcrumb";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Fiyat takibi, indirim analizleri, Black Friday rehberleri. indi. blog'da radar tutarken kazan.",
  openGraph: {
    title: "Blog — indi.",
    description:
      "Fiyat takibi, indirim analizleri, Black Friday rehberleri.",
    type: "website",
  },
};

// Planlanan içerikler — SEO odaklı, editoryel takvim iskeleti
const PLANNED = [
  {
    title: "iPhone fiyatı ne zaman düşer? 12 aylık fiyat analizi",
    category: "Fiyat Analizi",
    readTime: "6 dk",
    status: "Yakında",
  },
  {
    title: "Black Friday'de gerçekten ucuzlayan 10 ürün (ve 10 sahte indirim)",
    category: "Rehber",
    readTime: "9 dk",
    status: "Yakında",
  },
  {
    title: "Fiyat alarmı nasıl kurulur? 3 dakikada radar aç",
    category: "Nasıl Yapılır",
    readTime: "3 dk",
    status: "Yakında",
  },
  {
    title: "Sezon sonu indirimleri: ne zaman almalı, ne zaman beklemeli?",
    category: "Fiyat Analizi",
    readTime: "7 dk",
    status: "Yakında",
  },
  {
    title: "Elektronik marketlerde kampanya takvimi (yıllık)",
    category: "Rehber",
    readTime: "8 dk",
    status: "Yakında",
  },
  {
    title: "Sahte indirim nasıl tespit edilir? 4 işaret",
    category: "Rehber",
    readTime: "5 dk",
    status: "Yakında",
  },
];

export default function BlogPage() {
  return (
    <>
      <Header />
      <main className="flex-1 py-8 sm:py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <Breadcrumb
            className="mb-5"
            items={[
              { label: "Ana Sayfa", href: "/" },
              { label: "Blog" },
            ]}
          />

          <div className="mb-8">
            <h1 className="flex items-center gap-2.5 text-2xl font-black text-[var(--foreground)] sm:text-3xl">
              <BookOpen className="h-6 w-6 text-[var(--color-primary)]" />
              Blog
            </h1>
            <p className="mt-2 text-sm text-[var(--muted)] sm:text-base">
              Fiyat analizleri, alışveriş rehberleri, Türkiye pazarına özel indirim takvimleri.
            </p>
          </div>

          {/* Placeholder — "Yakında" listesi, editoryel takvim vurgusu */}
          <div className="mb-6 rounded-2xl border border-dashed border-[var(--border)] bg-[var(--surface)] p-5">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)]/15 text-[var(--color-primary)]">
                <Clock className="h-4 w-4" />
              </span>
              <div>
                <p className="text-sm font-semibold text-[var(--foreground)]">
                  İlk yazılarımız hazırlanıyor.
                </p>
                <p className="mt-0.5 text-xs text-[var(--muted)]">
                  Her pazartesi yeni içerik planlıyoruz. Haftalık bültene abone ol, kaçırma.
                </p>
              </div>
            </div>
          </div>

          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {PLANNED.map((post) => (
              <li key={post.title}>
                <article className="flex h-full flex-col gap-3 rounded-2xl border border-[var(--border)] bg-[var(--background)] p-4 transition-all duration-150 hover:-translate-y-0.5 hover:border-[var(--color-primary)]/30 hover:shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-[var(--color-primary)]/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[var(--color-primary)]">
                      {post.category}
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-wide text-[var(--muted)]">
                      {post.status}
                    </span>
                  </div>
                  <h2 className="flex-1 text-sm font-bold leading-snug text-[var(--foreground)]">
                    {post.title}
                  </h2>
                  <div className="flex items-center justify-between border-t border-[var(--border)] pt-3 text-[11px] text-[var(--muted)]">
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3 w-3" aria-hidden="true" />
                      {post.readTime} okuma
                    </span>
                    <span className="inline-flex items-center gap-1 font-semibold text-[var(--muted)]">
                      Hazırlanıyor
                    </span>
                  </div>
                </article>
              </li>
            ))}
          </ul>

          <div className="mt-8 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5 text-center sm:p-7">
            <p className="text-base font-bold text-[var(--foreground)]">
              Yayınlandığında haberin olsun
            </p>
            <p className="mt-1 text-sm text-[var(--muted)]">
              Haftalık bültende blog yazıları + o haftanın en iyi 10 indirimi.
            </p>
            <Link
              href="/#newsletter"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-[var(--color-primary)] px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-all duration-150 hover:bg-[var(--color-primary-hover)] hover:shadow-md active:scale-[0.97]"
            >
              Bültene abone ol
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
