# İndirim Radarı — Proje Rehberi

## Proje Nedir
Türkiye pazarındaki büyük markaların indirim ve kampanyalarını takip eden web platformu. Kullanıcılar favori markalarını takip eder, kampanya başlamadan önce bildirim alır.

## Tech Stack
- **Framework:** Next.js 15 (App Router, Server Components)
- **Dil:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4 + shadcn/ui
- **Animasyon:** Framer Motion
- **Slider:** Embla Carousel
- **Database:** PostgreSQL (Supabase üzerinde)
- **ORM:** Prisma
- **Auth:** NextAuth.js
- **Deployment:** Vercel

## Tasarım Sistemi
- **Primary renk:** İndirim kırmızısı `#E11D48` (rose-600) — SALE klasiği, modern shade
- **Accent:** Mercan turuncusu `#FF6B35`
- **Success:** `#10B981`, **Danger:** `#EF4444`
- **Tipografi:** Başlıklar için Clash Display, body için Inter
- **Dark mode zorunlu**
- **Mobile-first** — her component önce 380px'de test edilmeli
- Yumuşak köşeler (12–16px), glassmorphism hero'da, mikro-animasyonlar

## Kod Kuralları
- Hiçbir zaman `any` tipi kullanma, her şey strict typed olmalı
- Server Components default, Client Components sadece gerektiğinde (`'use client'`)
- Component isimleri PascalCase, dosya isimleri kebab-case
- Tailwind utility class'ları kullan, inline style yazma
- Her component'in props'u için TypeScript interface tanımla
- Form validation için Zod kullan
- Türkçe metin içeriği UI'da, kod/değişken isimleri İngilizce

## Dil ve Ton
- UI'da tüm metinler **Türkçe**
- Ticari markaları doğru yaz (ikas lowercase 'i' ile)
- Tarih formatı: 15 Kasım 2026 (Türkçe locale)
- date-fns kütüphanesini `tr` locale ile kullan
- **Marka sesi rehberi:** `docs/tone-of-voice.md` — yeni metin yazmadan önce oku
- Ana slogan: *"Radar açık, fiyatlar düşüyor."*

## Klasör Yapısı

/app              → Next.js App Router sayfaları
/components       → Yeniden kullanılabilir UI bileşenleri
/components/ui    → shadcn/ui primitive'leri
/lib              → Yardımcı fonksiyonlar, util'ler
/lib/db           → Prisma client, database helpers
/scrapers         → Her marka için scraper modülü
/types            → Global TypeScript tipleri
/public           → Statik dosyalar (logolar, iconlar)
