import { Product } from "@/features/products/types/product";
import { ProductCard } from "@/components/shared/ProductCard";
import { SectionHeader } from "@/components/shared/SectionHeader";

interface RelatedProductsProps {
  currentProduct: Product;
  allProducts: Product[];
}

export function RelatedProducts({
  currentProduct,
  allProducts,
}: RelatedProductsProps) {
  // Find related products matching category or brand, excluding current
  const related = allProducts
    .filter(
      (p) =>
        p.id !== currentProduct.id &&
        (p.category === currentProduct.category ||
          p.brand.toLowerCase() === currentProduct.brand.toLowerCase())
    )
    .slice(0, 4);

  if (related.length === 0) return null;

  return (
    <section className="pt-12 sm:pt-16 border-t border-border">
      <SectionHeader
        title="Related Products"
        subtitle="Discover complementary devices and popular items in this category"
        actionText="View Full Catalog"
        actionHref="/products"
      />

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {related.map((prod) => (
          <ProductCard key={prod.id} product={prod} />
        ))}
      </div>
    </section>
  );
}

