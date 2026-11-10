import { Suspense } from "react";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { mockProducts } from "@/features/products/data/products";
import { ShopContent } from "@/features/products/components/ShopContent";

export const metadata: Metadata = {
  title: `Shop All Products | ${siteConfig.name}`,
  description:
    "Explore our complete collection of certified pre-owned and brand new Apple MacBooks, ThinkPads, iPhones, cases, and audio accessories with warranty.",
};

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="py-16 text-center text-muted-foreground font-medium">
          Loading catalog...
        </div>
      }
    >
      <ShopContent initialProducts={mockProducts} />
    </Suspense>
  );
}
