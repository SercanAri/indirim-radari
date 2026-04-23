export interface Deal {
  id: string;
  brand: string;
  logoUrl: string;
  title: string;
  discount: number;
  originalPrice: number;
  salePrice: number;
  endsAt: Date;
  startsAt: Date;
  category: string;
  imageUrl: string;
  /** Rozet: YENİ, ÇOK SATAN, SON SAATLER, EN DÜŞÜK FİYAT.
   * Tek kart tek rozet — görsel gürültü olmasın. */
  badge?: "new" | "hot" | "last" | "lowest";
  /** 30 gün önceki fiyat — fiyat geçmişi etiketi için. */
  price30dAgo?: number;
  /** Şu anda izleyen kullanıcı sayısı — güven sinyali (sadece aktif/sıcak kartlarda). */
  watchingNow?: number;
}

export interface Brand {
  id: string;
  slug: string;
  name: string;
  logoUrl: string;
  description: string;
  category: string;
  dealCount: number;
  websiteUrl: string;
  color: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  dealCount: number;
  slug: string;
  imageUrl: string;
}

export interface NavLink {
  label: string;
  href: string;
}
