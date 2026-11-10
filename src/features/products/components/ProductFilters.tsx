"use client";

import { useMemo } from "react";
import { RotateCcw, Filter, Check } from "lucide-react";
import { Product, ProductFilterState } from "@/features/products/types/product";

interface ProductFiltersProps {
  products: Product[];
  filters: ProductFilterState;
  onFilterChange: (filters: Partial<ProductFilterState>) => void;
  onResetFilters: () => void;
  className?: string;
}

export function ProductFilters({
  products,
  filters,
  onFilterChange,
  onResetFilters,
  className = "",
}: ProductFiltersProps) {
  // Compute category counts
  const categoryCounts = useMemo(() => {
    return {
      all: products.length,
      laptops: products.filter((p) => p.category === "laptops").length,
      smartphones: products.filter((p) => p.category === "smartphones").length,
      accessories: products.filter((p) => p.category === "accessories").length,
      pouches: products.filter(
        (p) =>
          p.tags?.some((t) =>
            ["case", "pouch", "screen protector", "9h glass", "tempered glass"].includes(t)
          ) ||
          p.categoryLabel.toLowerCase().includes("pouch") ||
          p.categoryLabel.toLowerCase().includes("screen")
      ).length,
      airpods: products.filter(
        (p) =>
          p.name.toLowerCase().includes("airpod") ||
          p.tags?.some((t) => t.includes("airpod"))
      ).length,
    };
  }, [products]);

  // Available brands and counts
  const brandCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    products.forEach((p) => {
      counts[p.brand] = (counts[p.brand] || 0) + 1;
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, [products]);

  // Price range options and counts
  const priceRangeOptions = useMemo(() => {
    return [
      { key: "all", label: "All Prices", count: products.length },
      { key: "under-100", label: "Under $100", count: products.filter((p) => p.price < 100).length },
      { key: "100-300", label: "$100 - $300", count: products.filter((p) => p.price >= 100 && p.price <= 300).length },
      { key: "300-700", label: "$300 - $700", count: products.filter((p) => p.price >= 300 && p.price <= 700).length },
      { key: "700-1500", label: "$700 - $1,500", count: products.filter((p) => p.price >= 700 && p.price <= 1500).length },
      { key: "over-1500", label: "Over $1,500", count: products.filter((p) => p.price > 1500).length },
    ];
  }, [products]);

  // Categories list
  const categoryOptions = [
    { key: "all", label: "All Categories", count: categoryCounts.all },
    { key: "laptops", label: "Computers & Laptops", count: categoryCounts.laptops },
    { key: "smartphones", label: "iPhones & Smartphones", count: categoryCounts.smartphones },
    { key: "pouches", label: "Pouches & Screen Protectors", count: categoryCounts.pouches },
    { key: "airpods", label: "AirPods & Earpods", count: categoryCounts.airpods },
    { key: "accessories", label: "Other Gadgets & Chargers", count: categoryCounts.accessories },
  ];

  // Active filter status
  const hasActiveFilters = Boolean(
    (filters.category && filters.category !== "all") ||
      (filters.brand && filters.brand !== "all") ||
      (filters.priceRange && filters.priceRange !== "all") ||
      filters.inStockOnly ||
      (filters.searchQuery && filters.searchQuery.trim() !== "")
  );

  return (
    <div
      className={`bg-card border border-border rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-2xs divide-y divide-border/60 ${className}`}
    >
      {/* Filters Title Bar */}
      <div className="pb-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-brand-green" />
          <h2 className="text-base font-bold text-card-foreground tracking-tight">
            Filters
          </h2>
        </div>

        {hasActiveFilters && (
          <button
            onClick={onResetFilters}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-green hover:underline cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            Reset All
          </button>
        )}
      </div>

      {/* 1. Categories Section */}
      <div className="py-5">
        <div className="flex items-center justify-between mb-3.5">
          <h3 className="text-sm font-bold text-card-foreground">Categories</h3>
          <span className="text-[11px] font-semibold text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
            {categoryOptions.length}
          </span>
        </div>

        <div className="space-y-1.5">
          {categoryOptions.map((cat) => {
            const isSelected =
              (!filters.category && cat.key === "all") ||
              filters.category === cat.key;

            return (
              <button
                key={cat.key}
                onClick={() =>
                  onFilterChange({
                    category: cat.key === "all" ? undefined : cat.key,
                  })
                }
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-left text-xs transition-colors cursor-pointer group ${
                  isSelected
                    ? "bg-brand-sand font-bold text-brand-green"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/40 font-medium"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                      isSelected
                        ? "border-brand-green bg-brand-green"
                        : "border-muted-foreground/40 group-hover:border-foreground"
                    }`}
                  >
                    {isSelected && (
                      <span className="w-1.5 h-1.5 rounded-full bg-white" />
                    )}
                  </div>
                  <span>{cat.label}</span>
                </div>
                <span className="text-[11px] opacity-75 font-normal">
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Brands Section */}
      <div className="py-5">
        <div className="flex items-center justify-between mb-3.5">
          <h3 className="text-sm font-bold text-card-foreground">Brands</h3>
          <span className="text-[11px] font-semibold text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
            {brandCounts.length}
          </span>
        </div>

        <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
          {/* All Brands Option */}
          <button
            onClick={() => onFilterChange({ brand: undefined })}
            className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-left text-xs transition-colors cursor-pointer group ${
              !filters.brand || filters.brand === "all"
                ? "bg-brand-sand font-bold text-brand-green"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/40 font-medium"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <div
                className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                  !filters.brand || filters.brand === "all"
                    ? "border-brand-green bg-brand-green"
                    : "border-muted-foreground/40 group-hover:border-foreground"
                }`}
              >
                {(!filters.brand || filters.brand === "all") && (
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                )}
              </div>
              <span>All Brands</span>
            </div>
            <span className="text-[11px] opacity-75 font-normal">
              {products.length}
            </span>
          </button>

          {/* Individual Brands */}
          {brandCounts.map(([brand, count]) => {
            const isSelected =
              filters.brand?.toLowerCase() === brand.toLowerCase();

            return (
              <button
                key={brand}
                onClick={() =>
                  onFilterChange({
                    brand: isSelected ? undefined : brand,
                  })
                }
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-left text-xs transition-colors cursor-pointer group ${
                  isSelected
                    ? "bg-brand-sand font-bold text-brand-green"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/40 font-medium"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                      isSelected
                        ? "border-brand-green bg-brand-green"
                        : "border-muted-foreground/40 group-hover:border-foreground"
                    }`}
                  >
                    {isSelected && (
                      <span className="w-1.5 h-1.5 rounded-full bg-white" />
                    )}
                  </div>
                  <span>{brand}</span>
                </div>
                <span className="text-[11px] opacity-75 font-normal">
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Price Range Section */}
      <div className="py-5">
        <div className="flex items-center justify-between mb-3.5">
          <h3 className="text-sm font-bold text-card-foreground">Price Range</h3>
          <span className="text-[11px] font-semibold text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
            {priceRangeOptions.length}
          </span>
        </div>

        <div className="space-y-1.5">
          {priceRangeOptions.map((range) => {
            const isSelected =
              (!filters.priceRange && range.key === "all") ||
              filters.priceRange === range.key;

            return (
              <button
                key={range.key}
                onClick={() =>
                  onFilterChange({
                    priceRange: range.key === "all" ? undefined : range.key,
                  })
                }
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-left text-xs transition-colors cursor-pointer group ${
                  isSelected
                    ? "bg-brand-sand font-bold text-brand-green"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/40 font-medium"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                      isSelected
                        ? "border-brand-green bg-brand-green"
                        : "border-muted-foreground/40 group-hover:border-foreground"
                    }`}
                  >
                    {isSelected && (
                      <span className="w-1.5 h-1.5 rounded-full bg-white" />
                    )}
                  </div>
                  <span>{range.label}</span>
                </div>
                <span className="text-[11px] opacity-75 font-normal">
                  {range.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. In Stock Filter */}
      <div className="pt-5">
        <label className="flex items-center gap-2.5 cursor-pointer text-xs font-semibold text-card-foreground select-none">
          <div
            onClick={() =>
              onFilterChange({ inStockOnly: !filters.inStockOnly })
            }
            className={`w-4.5 h-4.5 rounded-md border flex items-center justify-center transition-all ${
              filters.inStockOnly
                ? "bg-brand-green border-brand-green text-white"
                : "border-muted-foreground/40 bg-card hover:border-foreground"
            }`}
          >
            {filters.inStockOnly && <Check className="w-3.5 h-3.5 stroke-[3]" />}
          </div>
          <span
            onClick={() =>
              onFilterChange({ inStockOnly: !filters.inStockOnly })
            }
          >
            In-Stock Items Only
          </span>
        </label>
      </div>
    </div>
  );
}

