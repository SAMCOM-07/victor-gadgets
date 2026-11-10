"use client";

import { useState, useMemo, useEffect, useTransition } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import {
  Filter,
  SlidersHorizontal,
  X,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import { Product, ProductFilterState } from "@/features/products/types/product";
import { filterAndSortProducts } from "@/features/products/utils/filters";
import { ShopHeader } from "./ShopHeader";
import { ProductFilters } from "./ProductFilters";
import { ProductGrid } from "./ProductGrid";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";

interface ShopContentProps {
  initialProducts: Product[];
}

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name-asc", label: "Name (A-Z)" },
  { value: "name-desc", label: "Name (Z-A)" },
];

export function ShopContent({ initialProducts }: ShopContentProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  // Read URL params
  const paramCategory = searchParams.get("category") || undefined;
  const paramBrand = searchParams.get("brand") || undefined;
  const paramPrice = searchParams.get("price") || undefined;
  const paramSearch = searchParams.get("search") || undefined;
  const paramSort =
    (searchParams.get("sort") as ProductFilterState["sortBy"]) || "featured";
  const paramInStock = searchParams.get("instock") === "true";

  // Filter State
  const [filters, setFilters] = useState<ProductFilterState>({
    category: paramCategory,
    brand: paramBrand,
    priceRange: paramPrice,
    searchQuery: paramSearch,
    sortBy: paramSort,
    inStockOnly: paramInStock,
  });

  // Sync state when URL params change externally (e.g. user clicks nav link or search)
  useEffect(() => {
    function doSth() {
      setFilters({
        category: searchParams.get("category") || undefined,
        brand: searchParams.get("brand") || undefined,
        priceRange: searchParams.get("price") || undefined,
        searchQuery: searchParams.get("search") || undefined,
        sortBy:
          (searchParams.get("sort") as ProductFilterState["sortBy"]) || "featured",
        inStockOnly: searchParams.get("instock") === "true",
      });
    }

    doSth();
  }, [searchParams]);

  // Mobile Drawer State
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Update URL helper
  const updateURL = (newFilters: ProductFilterState) => {
    const params = new URLSearchParams();
    if (newFilters.category && newFilters.category !== "all") {
      params.set("category", newFilters.category);
    }
    if (newFilters.brand && newFilters.brand !== "all") {
      params.set("brand", newFilters.brand);
    }
    if (newFilters.priceRange && newFilters.priceRange !== "all") {
      params.set("price", newFilters.priceRange);
    }
    if (newFilters.searchQuery && newFilters.searchQuery.trim() !== "") {
      params.set("search", newFilters.searchQuery.trim());
    }
    if (newFilters.sortBy && newFilters.sortBy !== "featured") {
      params.set("sort", newFilters.sortBy);
    }
    if (newFilters.inStockOnly) {
      params.set("instock", "true");
    }

    const queryStr = params.toString();
    startTransition(() => {
      router.replace(queryStr ? `${pathname}?${queryStr}` : pathname, {
        scroll: false,
      });
    });
  };

  const handleFilterChange = (partial: Partial<ProductFilterState>) => {
    const next = { ...filters, ...partial };
    setFilters(next);
    updateURL(next);
  };

  const handleResetFilters = () => {
    const next: ProductFilterState = {
      category: undefined,
      brand: undefined,
      priceRange: undefined,
      searchQuery: undefined,
      sortBy: "featured",
      inStockOnly: false,
    };
    setFilters(next);
    updateURL(next);
  };

  // Filtered and Sorted products
  const filteredProducts = useMemo(() => {
    return filterAndSortProducts(initialProducts, filters);
  }, [initialProducts, filters]);

  // Active filters count for badge
  const activeFilterCount = [
    Boolean(filters.category && filters.category !== "all"),
    Boolean(filters.brand && filters.brand !== "all"),
    Boolean(filters.priceRange && filters.priceRange !== "all"),
    Boolean(filters.inStockOnly),
    Boolean(filters.searchQuery && filters.searchQuery.trim() !== ""),
  ].filter(Boolean).length;

  // Human readable title
  const bannerTitle = useMemo(() => {
    if (filters.category === "laptops") return "Computers & Laptops";
    if (filters.category === "smartphones") return "iPhones & Smartphones";
    if (filters.category === "pouches") return "Pouches & Screen Protectors";
    if (filters.category === "airpods") return "AirPods & Earpods";
    if (filters.category === "accessories") return "Gadgets & Accessories";
    if (filters.brand) return `${filters.brand} Products`;
    return "Shop Products";
  }, [filters.category, filters.brand]);

  return (
    <div className="py-8 sm:py-12 bg-background min-h-screen">
      <div className="container space-y-8">
        {/* 1. Top Header Box */}
        <ShopHeader
          title={bannerTitle}
          subtitle="Discover amazing products tailored to your needs with certified quality and fast delivery"
        />

        {/* 2. Main Two-Column Layout */}
        <div className="flex flex-col lg:flex-row items-start gap-8">
          {/* Desktop Left Sidebar Filters */}
          <aside className="hidden lg:block w-72 xl:w-80 shrink-0 sticky top-24">
            <ProductFilters
              products={initialProducts}
              filters={filters}
              onFilterChange={handleFilterChange}
              onResetFilters={handleResetFilters}
            />
          </aside>

          {/* Right Main Content Area */}
          <main className="flex-1 w-full space-y-6">
            {/* Top Results & Sort Header Bar */}
            <div className="bg-card border border-border rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xs">
              <div>
                <p className="text-base sm:text-lg font-bold text-card-foreground">
                  {filteredProducts.length} Product(s) Found
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {activeFilterCount > 0
                    ? `Filtered by ${activeFilterCount} active criteria`
                    : "Showing all available products"}
                </p>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                {/* Mobile Filter Toggle Button */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsMobileFiltersOpen(true)}
                  className="lg:hidden h-10 rounded-full border-border bg-card px-4 text-xs font-semibold gap-2 cursor-pointer"
                >
                  <SlidersHorizontal className="w-4 h-4 text-brand-green" />
                  <span>Filters</span>
                  {activeFilterCount > 0 && (
                    <span className="w-5 h-5 rounded-full bg-brand-green text-white text-[10px] font-bold flex items-center justify-center">
                      {activeFilterCount}
                    </span>
                  )}
                </Button>

                {/* Sort Dropdown */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground hidden md:inline font-medium">
                    Sort:
                  </span>
                  <Select
                    items={sortOptions}
                    value={filters.sortBy || "featured"}
                    onValueChange={(val) => {
                      if (val) {
                        handleFilterChange({
                          sortBy: val as ProductFilterState["sortBy"],
                        });
                      }
                    }}
                  >
                    <SelectTrigger className="w-44 sm:w-48 h-10 rounded-full border-border bg-card text-xs font-semibold px-4 cursor-pointer">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {sortOptions.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Active Filters Pill Bar */}
            {activeFilterCount > 0 && (
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs text-muted-foreground font-semibold mr-1">
                  Active:
                </span>

                {filters.category && filters.category !== "all" && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-sand border border-brand-sand-border text-xs font-semibold text-brand-green">
                    <span>Category: {filters.category}</span>
                    <button
                      onClick={() => handleFilterChange({ category: undefined })}
                      className="hover:text-destructive cursor-pointer"
                      aria-label="Remove category filter"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                )}

                {filters.brand && filters.brand !== "all" && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-sand border border-brand-sand-border text-xs font-semibold text-brand-green">
                    <span>Brand: {filters.brand}</span>
                    <button
                      onClick={() => handleFilterChange({ brand: undefined })}
                      className="hover:text-destructive cursor-pointer"
                      aria-label="Remove brand filter"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                )}

                {filters.priceRange && filters.priceRange !== "all" && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-sand border border-brand-sand-border text-xs font-semibold text-brand-green">
                    <span>Price: {filters.priceRange}</span>
                    <button
                      onClick={() =>
                        handleFilterChange({ priceRange: undefined })
                      }
                      className="hover:text-destructive cursor-pointer"
                      aria-label="Remove price filter"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                )}

                {filters.inStockOnly && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-sand border border-brand-sand-border text-xs font-semibold text-brand-green">
                    <span>In-Stock Only</span>
                    <button
                      onClick={() => handleFilterChange({ inStockOnly: false })}
                      className="hover:text-destructive cursor-pointer"
                      aria-label="Remove in stock filter"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                )}

                {filters.searchQuery && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-sand border border-brand-sand-border text-xs font-semibold text-brand-green">
                    <span>Search: &ldquo;{filters.searchQuery}&rdquo;</span>
                    <button
                      onClick={() =>
                        handleFilterChange({ searchQuery: undefined })
                      }
                      className="hover:text-destructive cursor-pointer"
                      aria-label="Remove search query"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                )}

                <button
                  onClick={handleResetFilters}
                  className="text-xs font-semibold text-muted-foreground hover:text-brand-green hover:underline ml-2 cursor-pointer"
                >
                  Clear All
                </button>
              </div>
            )}

            {/* Products Grid */}
            <ProductGrid
              products={filteredProducts}
              onResetFilters={handleResetFilters}
            />
          </main>
        </div>
      </div>

      {/* Mobile Filters Slide-over Sheet */}
      {isMobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileFiltersOpen(false)}
          />

          {/* Drawer Panel */}
          <div className="fixed inset-y-0 right-0 max-w-full w-84 sm:w-96 bg-card border-l border-border shadow-2xl p-6 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-border">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-5 h-5 text-brand-green" />
                  <h3 className="text-base font-bold text-card-foreground">
                    Filter Products
                  </h3>
                </div>
                <button
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="p-1 rounded-full text-muted-foreground hover:text-foreground cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-4">
                <ProductFilters
                  products={initialProducts}
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onResetFilters={handleResetFilters}
                  className="border-0 shadow-none p-0"
                />
              </div>
            </div>

            <div className="pt-6 border-t border-border mt-6">
              <Button
                onClick={() => setIsMobileFiltersOpen(false)}
                className="w-full h-11 rounded-full bg-brand-green hover:bg-brand-green-hover text-white font-semibold cursor-pointer"
              >
                Show {filteredProducts.length} Product(s)
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

