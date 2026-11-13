import { Product, ProductFilterState } from "@/features/products/types/product";

/**
 * Filter and sort products according to current filter state
 */
export function filterAndSortProducts(
  products: Product[],
  filters: ProductFilterState
): Product[] {
  let result = [...products];

  // Search query filter
  if (filters.searchQuery && filters.searchQuery.trim() !== "") {
    const q = filters.searchQuery.toLowerCase().trim();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.categoryLabel.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags?.some((tag) => tag.toLowerCase().includes(q))
    );
  }

  // Category filter
  if (filters.category && filters.category !== "all") {
    const cat = filters.category.toLowerCase();
    if (cat === "pouches" || cat === "pouches-screen-protectors") {
      result = result.filter(
        (p) =>
          p.tags?.some((t) =>
            ["case", "pouch", "screen protector", "9h glass", "tempered glass"].includes(t)
          ) ||
          p.categoryLabel.toLowerCase().includes("pouch") ||
          p.categoryLabel.toLowerCase().includes("screen")
      );
    } else if (cat === "airpods" || cat === "airpods-earpods" || cat === "audio") {
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes("airpod") ||
          p.tags?.some((t) => t.includes("airpod")) ||
          p.tags?.some((t) => t.includes("earbuds"))
      );
    } else {
      result = result.filter((p) => p.category.toLowerCase() === cat);
    }
  }

  // Brand filter
  if (filters.brand && filters.brand !== "all") {
    result = result.filter(
      (p) => p.brand.toLowerCase() === filters.brand?.toLowerCase()
    );
  }

  // Price range filter
  if (filters.priceRange && filters.priceRange !== "all") {
    switch (filters.priceRange) {
      case "under-100k":
      case "under-100":
        result = result.filter((p) => p.price < 100000);
        break;
      case "100k-500k":
      case "100-300":
        result = result.filter((p) => p.price >= 100000 && p.price <= 500000);
        break;
      case "500k-1500k":
      case "300-700":
        result = result.filter((p) => p.price >= 500000 && p.price <= 1500000);
        break;
      case "1500k-3000k":
      case "700-1500":
        result = result.filter((p) => p.price >= 1500000 && p.price <= 3000000);
        break;
      case "over-3000k":
      case "over-1500":
        result = result.filter((p) => p.price > 3000000);
        break;
    }
  }

  // In-stock only filter
  if (filters.inStockOnly) {
    result = result.filter((p) => p.inStock && p.stockCount > 0);
  }

  // Sorting
  if (filters.sortBy) {
    switch (filters.sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "featured":
      default:
        result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        break;
    }
  }

  return result;
}

