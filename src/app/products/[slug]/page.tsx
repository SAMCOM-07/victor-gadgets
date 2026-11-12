import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Star, Tag, Sparkles } from "lucide-react";
import { siteConfig } from "@/config/site";
import { mockProducts, getProductBySlug } from "@/features/products/data/products";
import {
  ProductGallery,
  ProductActions,
  ProductTabs,
  RelatedProducts,
} from "@/features/products/components";
import { formatPrice } from "@/lib/utils";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return mockProducts.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: `Product Not Found | ${siteConfig.name}`,
    };
  }

  const imageUrl = product.images?.[0] || "/product-images/laptop-1.jpg";

  return {
    title: `${product.name} | ${siteConfig.name}`,
    description: product.shortDescription || product.description,
    openGraph: {
      title: `${product.name} - ${formatPrice(product.price)}`,
      description: product.shortDescription,
      images: [{ url: imageUrl, alt: product.name }],
    },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="py-8 sm:py-12 bg-background min-h-screen">
      <div className="container space-y-10 sm:space-y-14">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-1.5 text-xs text-muted-foreground flex-wrap"
        >
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 shrink-0" />
          <Link
            href="/products"
            className="hover:text-foreground transition-colors"
          >
            Shop
          </Link>
          <ChevronRight className="w-3.5 h-3.5 shrink-0" />
          <Link
            href={`/products?category=${product.category}`}
            className="hover:text-foreground transition-colors capitalize"
          >
            {product.categoryLabel || product.category}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 shrink-0" />
          <span className="font-semibold text-foreground truncate max-w-xs sm:max-w-md">
            {product.name}
          </span>
        </nav>

        {/* 1. Main Product Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Product Gallery */}
          <div className="lg:col-span-7">
            <ProductGallery
              images={product.images}
              name={product.name}
              isHotDeal={product.isHotDeal}
              discountPercent={product.discountPercent}
              condition={product.condition}
            />
          </div>

          {/* Right Column: Product Info & Actions */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              {/* Brand & Category Label */}
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-green bg-brand-green-light px-3 py-1 rounded-full border border-brand-green/20">
                  {product.brand}
                </span>
                <span className="text-xs font-semibold text-muted-foreground">
                  {product.categoryLabel || product.category}
                </span>
              </div>

              {/* Product Title */}
              <h1 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight leading-snug">
                {product.name}
              </h1>

              {/* Rating & Reviews */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center text-rating-star">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < Math.floor(product.rating)
                          ? "fill-rating-star text-rating-star"
                          : "text-rating-star-empty fill-rating-star-empty"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs font-bold text-foreground">
                  {product.rating.toFixed(1)}
                </span>
                <span className="text-xs text-muted-foreground">
                  ({product.reviewsCount} customer reviews)
                </span>
              </div>
            </div>

            {/* Price Box */}
            <div className="bg-card border border-border rounded-2xl p-3.5 sm:p-4 shadow-2xs space-y-1.5">
              <div className="flex items-baseline gap-3 flex-wrap">
                <span className="text-2xl sm:text-3xl font-extrabold text-foreground">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-sm sm:text-base text-muted-foreground line-through font-medium">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                {product.discountPercent && product.discountPercent > 0 && (
                  <span className="text-xs font-bold text-success bg-success-light px-2.5 py-0.5 rounded-full border border-success/20">
                    Save {product.discountPercent}%
                  </span>
                )}
              </div>

              <p className="text-xs text-muted-foreground font-normal">
                Includes all diagnostic inspections. Express dispatch available from Ikeja, Lagos.
              </p>
            </div>

            {/* Short Description */}
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-normal">
              {product.shortDescription}
            </p>

            {/* Quick Specs Pills (e.g. Processor, RAM, Storage) */}
            {product.specs && (
              <div className="flex items-center gap-2 flex-wrap">
                {product.specs["Processor"] && (
                  <span className="text-[11px] font-semibold text-foreground bg-muted/60 px-3 py-1 rounded-full border border-border/50">
                    {product.specs["Processor"]}
                  </span>
                )}
                {product.specs["Memory"] && (
                  <span className="text-[11px] font-semibold text-foreground bg-muted/60 px-3 py-1 rounded-full border border-border/50">
                    {product.specs["Memory"]}
                  </span>
                )}
                {product.specs["Storage"] && (
                  <span className="text-[11px] font-semibold text-foreground bg-muted/60 px-3 py-1 rounded-full border border-border/50">
                    {product.specs["Storage"]}
                  </span>
                )}
              </div>
            )}

            {/* Purchase & WhatsApp Actions */}
            <ProductActions product={product} />
          </div>
        </div>

        {/* 2. Detailed Technical & Warranty Tabs */}
        <ProductTabs product={product} />

        {/* 3. Related Products Section */}
        <RelatedProducts
          currentProduct={product}
          allProducts={mockProducts}
        />
      </div>
    </div>
  );
}
