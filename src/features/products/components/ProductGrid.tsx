"use client";

import { motion } from "motion/react";
import { PackageOpen, RotateCcw } from "lucide-react";
import { Product } from "@/features/products/types/product";
import { ProductCard } from "@/components/shared/ProductCard";
import { Button } from "@/components/ui/Button";

interface ProductGridProps {
  products: Product[];
  onResetFilters?: () => void;
  className?: string;
}

export function ProductGrid({
  products,
  onResetFilters,
  className = "",
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full bg-card border border-border rounded-3xl p-10 sm:p-16 flex flex-col items-center justify-center text-center shadow-xs"
      >
        <div className="w-16 h-16 rounded-2xl bg-brand-sand flex items-center justify-center text-muted-foreground border border-brand-sand-border mb-4">
          <PackageOpen className="w-8 h-8 text-brand-orange" />
        </div>

        <h3 className="text-lg sm:text-xl font-bold text-card-foreground">
          No Products Found
        </h3>
        <p className="text-xs sm:text-sm text-muted-foreground max-w-md mt-1.5 leading-relaxed font-normal">
          We couldn&apos;t find any products matching your active filters. Try
          choosing a different category, adjusting your price range, or clearing
          your search query.
        </p>

        {onResetFilters && (
          <Button
            onClick={onResetFilters}
            className="mt-6 rounded-full h-10 px-6 text-xs sm:text-sm font-semibold bg-brand-green hover:bg-brand-green-hover text-white gap-2 shadow-xs cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            Reset All Filters
          </Button>
        )}
      </motion.div>
    );
  }

  return (
    <div
      className={`grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:grid-cols-5 gap-3 ${className}`}
    >
      {products.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.4,
            delay: Math.min(index * 0.04, 0.4),
            ease: [0.22, 1, 0.36, 1],
          }}
          className="h-full"
        >
          <ProductCard product={product} className="h-full" />
        </motion.div>
      ))}
    </div>
  );
}

