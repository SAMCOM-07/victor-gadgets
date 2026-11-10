"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { SlidersHorizontal, LayoutGrid, Grid3X3, List } from "lucide-react";
import { motion } from "motion/react";
import { Product } from "@/types/product";
import { ProductCard } from "@/components/shared/ProductCard";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Button, buttonVariants } from "@/components/ui/Button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/Select";
import { cn } from "@/lib/utils";

interface FeaturedProductsProps {
  products: Product[];
}

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("default");

  const categories = [
    { id: "all", label: "All Gadgets" },
    { id: "laptops", label: "Laptops" },
    { id: "smartphones", label: "Smartphones" },
    { id: "accessories", label: "Accessories" },
    // { id: "others", label: "Others" },
  ];

  const sortOptions: Record<string, string> = {
    default: "Name (A-Z)",
    "price-low": "Price: Low to High",
    "price-high": "Price: High to Low",
  };

  const filteredProducts = useMemo(() => {
    const list =
      activeCategory === "all"
        ? [...products]
        : activeCategory === "others"
        ? products.filter((p) => p.category === "accessories")
        : products.filter((p) => p.category === activeCategory);

    if (sortBy === "price-low") {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === "default" || sortBy === "name-az") {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }

    return list;
  }, [products, activeCategory, sortBy]);

  return (
    <section className="py-16 sm:py-20 bg-background">
      <div className="container">
        {/* Section Header */}
        <SectionHeader
          title="Featured Products"
          subtitle="Discover our carefully curated selection of premium products"
        />

        {/* Category Pills & "See all" Button Row */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 overflow-x-auto max-w-full pb-2 sm:pb-0 scrollbar-none">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <Button
                  key={cat.id}
                  variant={isActive ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`rounded-full text-xs font-semibold p-4 whitespace-nowrap transition-colors cursor-pointer ${
                    isActive
                      ? "bg-brand-green hover:bg-brand-green-hover text-white shadow-xs"
                      : "bg-background border-border text-foreground hover:border-muted-foreground/30 hover:bg-muted"
                  }`}
                >
                  {cat.label}
                </Button>
              );
            })}
          </div>

          <Link
            href="/products"
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "rounded-full text-xs font-semibold border-border hover:border-muted-foreground/30 p-4 cursor-pointer inline-flex items-center"
            )}
          >
            See all
          </Link>
        </div>

        {/* Toolbar Strip: Grid Toggles, Filters & shadcn Select */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 py-3.5 border-y border-border/60 text-xs sm:text-sm text-muted-foreground">
          {/* Left: View toggles & Filters button */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <span className="text-xs font-semibold mr-1 text-foreground/80">View:</span>
              <button
                className="p-1.5 rounded text-brand-green hover:bg-muted transition-colors cursor-pointer"
                title="4 Column Grid"
                aria-label="4 Column Grid"
              >
                <LayoutGrid className="w-4.5 h-4.5" />
              </button>
              <button
                className="p-1.5 rounded text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
                title="3 Column Grid"
                aria-label="3 Column Grid"
              >
                <Grid3X3 className="w-4.5 h-4.5" />
              </button>
              <button
                className="p-1.5 rounded text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
                title="List View"
                aria-label="List View"
              >
                <List className="w-4.5 h-4.5" />
              </button>
            </div>

            <Button
              variant="outline"
              size="sm"
              className="rounded-full text-xs sm:text-sm font-medium border-border hover:border-muted-foreground/30 text-foreground h-9 px-4 gap-2 cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Filters
            </Button>
          </div>

          {/* Right: shadcn Select for Sort & Product count */}
          <div className="flex items-center gap-3">
            <Select
              items={sortOptions}
              value={sortBy}
              onValueChange={(val: string | null) => {
                if (val) setSortBy(val);
              }}
            >
              <SelectTrigger className="w-52 h-9 text-xs sm:text-sm bg-background border-border text-foreground cursor-pointer">
                <SelectValue placeholder="Sort by">
                  {(val: string | null) => (val && sortOptions[val]) || "Sort by"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="text-xs sm:text-sm">
                {Object.entries(sortOptions).map(([val, label]) => (
                  <SelectItem
                    key={val}
                    value={val}
                    className="text-xs sm:text-sm cursor-pointer"
                  >
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <span className="text-xs sm:text-sm text-muted-foreground font-medium px-3 py-1 rounded-md bg-muted">
              {filteredProducts.length} products
            </span>
          </div>
        </div>

        {/* Product Cards Grid (4 columns desktop, 2 tablet, 1 mobile) */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 sm:gap-4">
          {filteredProducts.slice(0, 12).map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{
                duration: 0.45,
                delay: (index % 4) * 0.07,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
