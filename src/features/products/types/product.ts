export type ProductCategory = "laptops" | "smartphones" | "accessories";

export interface ProductSpec {
  [key: string]: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: ProductCategory;
  categoryLabel: string;
  brand: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  images: string[];
  description: string;
  shortDescription: string;
  specs: ProductSpec;
  inStock: boolean;
  stockCount: number;
  rating: number;
  reviewsCount: number;
  isFeatured?: boolean;
  isHotDeal?: boolean;
  condition?: "Brand New" | "Open Box" | "Certified Refurbished";
  tags?: string[];
  warranty?: string;
}

export interface ProductFilterState {
  category?: string;
  brand?: string;
  priceRange?: string;
  searchQuery?: string;
  sortBy?: "featured" | "price-asc" | "price-desc" | "name-asc" | "name-desc";
  inStockOnly?: boolean;
}

