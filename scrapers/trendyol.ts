/**
 * YASAL UYARI / LEGAL NOTICE
 * ─────────────────────────────────────────────────────────────────────────────
 * Bu scraper yalnızca kişisel/eğitim amaçlıdır.
 *
 * robots.txt Analizi (2025-04-21):
 *   - Engellenen: /flas-indirimler, /sr?, /pd/, query-string parametreleri
 *   - /sl/ (kampanya landing) ve /kampanyalar/ yolu açıkça engellenmemiş
 *   - robots.txt bir protokoldür, yasal güvence değildir
 *
 * Kullanmadan önce kontrol et:
 *   1. Trendyol Kullanım Şartları (trendyol.com/kullanim-kosullari)
 *   2. KVKK / GDPR uyumluluğu
 *   3. Ticari kullanım için Trendyol API veya resmi ortaklık programını tercih et
 *
 * Bu kodu ticari servisler için kullanmak, Trendyol'un ToS'unu ihlal edebilir.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { chromium, type Browser, type BrowserContext, type Page } from "playwright";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ScrapedCampaign {
  brandSlug: string;
  title: string;
  description: string | null;
  discountPercent: number | null;
  startDate: Date | null;
  endDate: Date | null;
  category: string | null;
  imageUrl: string | null;
  ctaUrl: string;
  sourceUrl: string;
  scrapedAt: Date;
}

interface ScrapeResult {
  success: boolean;
  campaigns: ScrapedCampaign[];
  error?: string;
}

// ─── Config ───────────────────────────────────────────────────────────────────

const CONFIG = {
  baseUrl: "https://www.trendyol.com",
  campaignPaths: [
    "/sl/trendyol-kampanyalari",
    "/kampanyalar",
  ],
  rateLimit: 2000,       // ms — istek başına minimum bekleme süresi
  maxRetries: 3,
  retryDelay: 5000,      // ms — retry öncesi bekleme (üstel büyür)
  timeout: 30000,        // ms — sayfa yüklenme zaman aşımı
  navigationTimeout: 45000,
} as const;

const USER_AGENTS = [
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4.1 Safari/605.1.15",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:125.0) Gecko/20100101 Firefox/125.0",
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function randomUserAgent(): string {
  return USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)];
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function jitter(base: number, factor = 0.3): number {
  return base + Math.floor(Math.random() * base * factor);
}

/** Metinden indirim yüzdesi çıkarır: "%40'a varan" veya "40%" → 40 */
function parseDiscountPercent(text: string): number | null {
  const match = text.match(/%\s*(\d+)|(\d+)\s*%/);
  if (match) return parseInt(match[1] ?? match[2], 10);
  return null;
}

/** Türkçe tarih metnini Date'e çevirir: "15 Mayıs 2025" → Date */
function parseTurkishDate(text: string): Date | null {
  const months: Record<string, number> = {
    ocak: 0, şubat: 1, mart: 2, nisan: 3, mayıs: 4, haziran: 5,
    temmuz: 6, ağustos: 7, eylül: 8, ekim: 9, kasım: 10, aralık: 11,
  };

  // "15 Mayıs 2025" veya "15.05.2025" formatları
  const longMatch = text.toLowerCase().match(/(\d{1,2})\s+([a-zğüşıöç]+)\s+(\d{4})/);
  if (longMatch) {
    const month = months[longMatch[2]];
    if (month !== undefined) {
      return new Date(parseInt(longMatch[3]), month, parseInt(longMatch[1]));
    }
  }

  const shortMatch = text.match(/(\d{1,2})\.(\d{2})\.(\d{4})/);
  if (shortMatch) {
    return new Date(
      parseInt(shortMatch[3]),
      parseInt(shortMatch[2]) - 1,
      parseInt(shortMatch[1])
    );
  }

  return null;
}

// ─── Browser factory ──────────────────────────────────────────────────────────

async function createBrowserContext(browser: Browser): Promise<BrowserContext> {
  const context = await browser.newContext({
    userAgent: randomUserAgent(),
    viewport: { width: 1440, height: 900 },
    locale: "tr-TR",
    timezoneId: "Europe/Istanbul",
    extraHTTPHeaders: {
      "Accept-Language": "tr-TR,tr;q=0.9,en;q=0.8",
      "Accept": "text/html,application/xhtml+xml,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
    },
  });

  // Görselleri ve font'ları blokla — hız için
  await context.route(/\.(woff2?|ttf|otf|eot|svg)(\?.*)?$/, (route) => route.abort());
  await context.route(/\.(mp4|webm|ogg|mp3|wav)(\?.*)?$/, (route) => route.abort());

  return context;
}

// ─── DOM extraction ───────────────────────────────────────────────────────────

async function extractCampaignsFromPage(
  page: Page,
  sourceUrl: string
): Promise<ScrapedCampaign[]> {
  return page.evaluate(
    ({ sourceUrl, baseUrl }: { sourceUrl: string; baseUrl: string }) => {
      const campaigns: Array<{
        brandSlug: string;
        title: string;
        description: string | null;
        discountText: string;
        dateText: string;
        category: string | null;
        imageUrl: string | null;
        ctaUrl: string;
        sourceUrl: string;
      }> = [];

      // Olası kampanya kart selector'ları (Trendyol DOM değişebilir)
      const CARD_SELECTORS = [
        "[class*='campaign-card']",
        "[class*='campaignCard']",
        "[class*='kampanya']",
        "[data-testid*='campaign']",
        "[class*='promotion-card']",
        "[class*='promo-card']",
        "article[class*='card']",
      ];

      let cards: NodeListOf<Element> | Element[] = [];
      for (const sel of CARD_SELECTORS) {
        const found = document.querySelectorAll(sel);
        if (found.length > 0) {
          cards = found;
          break;
        }
      }

      // Fallback: <a> tag'ları içindeki kampanya link'lerini tara
      if ((cards as Element[]).length === 0) {
        cards = Array.from(document.querySelectorAll("a[href]")).filter((el) => {
          const href = (el as HTMLAnchorElement).href;
          return href.includes("/sl/") || href.includes("/kampanya");
        });
      }

      cards.forEach((card) => {
        const el = card as HTMLElement;

        const titleEl =
          el.querySelector("[class*='title'], [class*='Title'], h2, h3, h4") ??
          el.querySelector("span, p");
        const title = titleEl?.textContent?.trim() ?? "";
        if (!title || title.length < 3) return;

        const descEl = el.querySelector("[class*='desc'], [class*='Desc'], p");
        const description = descEl?.textContent?.trim() ?? null;

        // İndirim yüzdesi
        const discountEl = el.querySelector(
          "[class*='discount'], [class*='Discount'], [class*='percent'], [class*='indirim']"
        );
        const discountText = discountEl?.textContent?.trim() ?? el.textContent ?? "";

        // Tarih metni
        const dateEl = el.querySelector(
          "[class*='date'], [class*='Date'], [class*='tarih'], time"
        );
        const dateText = dateEl?.textContent?.trim() ?? "";

        // Görsel
        const imgEl = el.querySelector("img") as HTMLImageElement | null;
        const imageUrl =
          imgEl?.src ??
          imgEl?.getAttribute("data-src") ??
          imgEl?.getAttribute("data-lazy") ??
          null;

        // Kategori
        const catEl = el.querySelector(
          "[class*='category'], [class*='Category'], [class*='kategori']"
        );
        const category = catEl?.textContent?.trim() ?? null;

        // CTA URL
        const linkEl = el.closest("a") ?? el.querySelector("a");
        const rawHref = (linkEl as HTMLAnchorElement | null)?.href ?? "";
        const ctaUrl = rawHref.startsWith("http") ? rawHref : baseUrl + rawHref;

        if (!ctaUrl || ctaUrl === baseUrl) return;

        campaigns.push({
          brandSlug: "trendyol",
          title,
          description,
          discountText,
          dateText,
          category,
          imageUrl,
          ctaUrl,
          sourceUrl,
        });
      });

      return campaigns;
    },
    { sourceUrl, baseUrl: CONFIG.baseUrl }
  ).then((raw) =>
    raw.map((item) => ({
      brandSlug: item.brandSlug,
      title: item.title,
      description: item.description,
      discountPercent: parseDiscountPercent(item.discountText),
      startDate: parseTurkishDate(item.dateText),
      endDate: null,
      category: item.category,
      imageUrl: item.imageUrl,
      ctaUrl: item.ctaUrl,
      sourceUrl: item.sourceUrl,
      scrapedAt: new Date(),
    }))
  );
}

// Inline CONFIG reference for page.evaluate (it runs in browser context)
const CONFIG_REF = CONFIG;

// ─── Core scrape with retry ───────────────────────────────────────────────────

async function scrapeUrlWithRetry(
  context: BrowserContext,
  url: string,
  attempt = 1
): Promise<ScrapedCampaign[]> {
  const page = await context.newPage();

  try {
    console.log(`[trendyol] Scrape: ${url} (deneme ${attempt}/${CONFIG_REF.maxRetries})`);

    await page.goto(url, {
      waitUntil: "domcontentloaded",
      timeout: CONFIG_REF.navigationTimeout,
    });

    // JS render bekle
    await page.waitForTimeout(2500);

    // Cookie consent kapat (varsa)
    const cookieBtn = page.locator(
      "button[class*='consent'], button[id*='cookie'], [class*='cookie-accept']"
    ).first();
    if (await cookieBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
      await cookieBtn.click();
      await page.waitForTimeout(500);
    }

    const campaigns = await extractCampaignsFromPage(page, url);
    console.log(`[trendyol] ${campaigns.length} kampanya bulundu: ${url}`);
    return campaigns;

  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(`[trendyol] Hata (deneme ${attempt}): ${message}`);

    if (attempt < CONFIG_REF.maxRetries) {
      const wait = jitter(CONFIG_REF.retryDelay * attempt);
      console.log(`[trendyol] ${wait}ms beklenip tekrar deneniyor...`);
      await delay(wait);
      await page.close();
      return scrapeUrlWithRetry(context, url, attempt + 1);
    }

    return [];
  } finally {
    await page.close().catch(() => undefined);
  }
}

// ─── Public API ───────────────────────────────────────────────────────────────

export async function scrapeTrendyol(): Promise<ScrapeResult> {
  let browser: Browser | null = null;
  let context: BrowserContext | null = null;

  try {
    browser = await chromium.launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-blink-features=AutomationControlled",
      ],
    });

    context = await createBrowserContext(browser);

    const allCampaigns: ScrapedCampaign[] = [];

    for (const path of CONFIG_REF.campaignPaths) {
      const url = `${CONFIG_REF.baseUrl}${path}`;
      const campaigns = await scrapeUrlWithRetry(context, url);
      allCampaigns.push(...campaigns);

      // Her istek sonrası rate limit uygula (son istek hariç)
      if (path !== CONFIG_REF.campaignPaths[CONFIG_REF.campaignPaths.length - 1]) {
        const wait = jitter(CONFIG_REF.rateLimit);
        console.log(`[trendyol] Rate limit: ${wait}ms bekleniyor...`);
        await delay(wait);
      }
    }

    // Yinelenen URL'leri temizle
    const seen = new Set<string>();
    const unique = allCampaigns.filter((c) => {
      if (seen.has(c.ctaUrl)) return false;
      seen.add(c.ctaUrl);
      return true;
    });

    console.log(`[trendyol] Toplam ${unique.length} benzersiz kampanya.`);
    return { success: true, campaigns: unique };

  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(`[trendyol] Kritik hata: ${message}`);
    return { success: false, campaigns: [], error: message };

  } finally {
    await context?.close().catch(() => undefined);
    await browser?.close().catch(() => undefined);
  }
}

// ─── CLI entry ────────────────────────────────────────────────────────────────

if (process.argv[1]?.endsWith("trendyol.ts") || process.argv[1]?.endsWith("trendyol.js")) {
  scrapeTrendyol().then((result) => {
    if (result.success) {
      console.log(JSON.stringify(result.campaigns, null, 2));
    } else {
      console.error("Scrape başarısız:", result.error);
      process.exit(1);
    }
  });
}
