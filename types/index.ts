export interface Deal {
  id: string;
  brand: string;
  logo: string;
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

export interface Category {
  id: string;
  name: string;
  icon: string;
  dealCount: number;
  slug: string;
}

export interface NavLink {
  label: string;
  href: string;
}
