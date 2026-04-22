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
  badge?: "hot" | "new" | "last";
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
