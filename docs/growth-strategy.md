# Büyüme Stratejisi

Dönüşüm, retention, viral döngü ve affiliate ekseni için kısa yol haritası. Kodla yapılmayan ama ürün kararlarına yön veren başlıklar.

## 1. Editoryel Takvim (Newsletter + Blog)

Tek seferlik kampanya yerine **ritüel** kur.

| Gün | Kanal | İçerik |
|---|---|---|
| Pazartesi 09:00 | Newsletter | *"Bu haftanın en iyi 10 indirimi"* — editör seçimi, sahte indirim yok |
| Çarşamba | Instagram/Twitter | *"Bugünün en iyi indirimi"* — tek kart, gerçek fiyat geçmişi |
| Cuma | Newsletter | *"Bu hafta kaçırılmaması gerekenler"* — kategori bazında 3+3+3 |
| Ayda 1 | Blog | Fiyat analizi (örn. *"iPhone fiyatı ne zaman düşer?"*) |
| Sezon geçişi | Newsletter | *"Black Friday rehberi"*, *"Sezon sonu takvimi"* |

Tutarlılık > hacim. Kullanıcı pazartesi sabahını alışkanlık yapmalı.

## 2. Push Notification Politikası

**Agresif değil, değer odaklı.** Notifikasyon izni yanlış zamanda sorulursa reddedilir ve geri alınamaz.

- **Asla** sayfaya girer girmez sorma.
- **İzin iste** sadece: kullanıcı bir markayı/ürünü takibe aldığında → *"Fiyat düştüğünde bildirim almak ister misin?"*
- **Sıklık**: kullanıcı başına haftada max 2 push.
- **İçerik**: sadece (a) takip edilen ürünün fiyatı hedefe düştü, (b) takip edilen kampanya başladı. Haftalık bülten push olmaz.
- **Ayar paneli**: kullanıcı hangi tipi açık/kapalı kontrol edebilir.

Teknik: Web Push API (Service Worker) + `Notification.requestPermission()`. Backend: push token + kampanya change stream.

## 3. Referral Döngüsü

**"Arkadaşını davet et, ikiniz de premium alarm hakkı kazanın."**

- Her kullanıcıya unique URL: `indi.to/{slug}`
- Arkadaş tıklar → kayıt olur → her ikisinin de alarm limiti +5 olur (ücretsiz kullanıcı default 3 alarm).
- Ödül tanımı: *premium alarm* = fiyat değişikliğinde dakikalık bildirim (vs ücretsiz günlük batch).
- Viral katsayı hedefi: k = 0.4+ (her kullanıcı ortalama 0.4 yeni kullanıcı getirir).
- UI: Favorilerim sayfasında referral kartı (link + kopyala) — **iskelet hazır**.

## 4. Sosyal Medya

Site tonu ile uyumlu: *doğrudan, fayda-odaklı, ince espri, ünlem çöplüğü yok* (bkz. `docs/tone-of-voice.md`).

- **Instagram**: günlük 1 kart (fiyat geçmişi + gerçek indirim rozeti). Reel/video haftalık — *"bu fiyat sahte mi?"*.
- **Twitter/X**: kısa alert tweet'ler — *"Dyson V15 bugün son 90 günün en düşüğünde: 8.400₺ (önceki dip: 8.990₺)"*.
- **TikTok**: *"fiyat detektifi"* formatı — aynı ürünü 3 ayda izleme hikayesi.
- Bio'da tek link: `indi.co/radar` → newsletter kayıt sayfası.

## 5. Affiliate Program Seçimi

Gelir modeli netleşmeli — CPC yerine **CPA** tercihi (dönüşüm başına komisyon).

| Marka | Program | Not |
|---|---|---|
| Trendyol | Doğrudan (Gelir Ortağı) | Başvuru: Trendyol satıcı panel |
| Hepsiburada | Admitad | Türkiye'de yaygın, API'si güçlü |
| MediaMarkt | AWIN | Uluslararası ağ, tracking güvenilir |
| Teknosa | Admitad | |
| LC Waikiki | Direkt iletişim | Brand partnership ile özel CPA |
| Apple, Samsung | Genellikle yok | Trafik olarak agregatöre yönlendir |

**Şeffaflık zorunlu**: Footer'da affiliate notu aktif (*"senin ödediğin fiyat değişmez"*). Kullanıcı güvenini satmadan gelir modeli kur.

İlk aşama: 2-3 büyük marka ile başla (Trendyol + Hepsiburada + MediaMarkt). Dönüşüm verilerine göre genişle.

## 6. İçerik Pazarlaması (SEO)

Uzun vadeli organik trafik — haftalık 1-2 yazı. Hedef: *"[ürün] ne zaman indirime girer?"* gibi long-tail aramalar.

Örnek konu listesi (`/blog` iskelet sayfasında):

- iPhone fiyatı ne zaman düşer?
- Black Friday'de gerçekten ucuzlayan 10 ürün
- Sezon sonu indirim takvimi
- Elektronik marketlerde kampanya takvimi (yıllık)
- Sahte indirim nasıl tespit edilir?
- Fiyat alarmı nasıl kurulur?

Her yazıda bir *"radar aç"* CTA'sı. Blog → newsletter kayıt → takip → dönüşüm akışı.

## 7. Ölçümleme

Ana metrikler (haftalık takip):

- **Retention D1/D7/D30** — mobil odaklı (traffic %70+ mobile)
- **Alarm kurulum oranı** — kayıtlı kullanıcı / alarm kurmuş kullanıcı
- **Newsletter open rate** (hedef: %30+) ve CTR (%5+)
- **Affiliate dönüşüm oranı** — tıklama / satın alma
- **Viral katsayı** — referral ile gelen yeni kullanıcı / toplam yeni kullanıcı

Privacy-first analitik: Plausible veya Umami. Google Analytics/cookie banner gereksiz yük.
