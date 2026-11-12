"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Flame, ShoppingBag, Heart, Minus, Plus } from "lucide-react";
import { Product } from "@/types/product";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/features/cart/store/cart-store";
import { Button } from "@/components/ui/Button";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className = "" }: ProductCardProps) {
  const [mounted, setMounted] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const cartItem = useCartStore((state) =>
    state.items.find((item) => item.product.id === product.id)
  );
  const inCartQuantity = cartItem?.quantity || 0;
  const addItem = useCartStore((state) => state.addItem);
  const incrementQuantity = useCartStore((state) => state.incrementQuantity);
  const decrementQuantity = useCartStore((state) => state.decrementQuantity);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
  };

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const imageUrl = product.images?.[0] || "/product-images/laptop-1.jpg";
  const maxStock = product.stockCount > 0 ? product.stockCount : 99;

  return (
    <div
      className={`group bg-card border border-border rounded-xl p-3.5 sm:p-4 flex flex-col justify-between hover:border-muted-foreground/30 hover:shadow-md transition-all duration-200 ${className}`}
    >
      <div>
        {/* Top Badges & Actions */}
        <div className="flex items-center justify-between gap-1 h-4">
          <div className="flex items-center gap-1.5">
            {product.isHotDeal ? (
              <span className="inline-flex items-center text-badge-deal">
                <Flame className="w-4 h-4 fill-badge-deal" />
              </span>
            ) : product.discountPercent && product.discountPercent > 0 ? (
              <span className="text-xs font-semibold text-badge-sale border border-badge-sale-border rounded-full px-2.5 py-0.5">
                Sale!
              </span>
            ) : null}
          </div>

          <button
            onClick={handleLike}
            className={`p-1.5 rounded-full transition-colors cursor-pointer ${
              isLiked
                ? "text-like-active"
                : "text-like-inactive hover:text-like-active"
            }`}
            aria-label="Save to wishlist"
          >
            <Heart
              className={`w-4 h-4 ${isLiked ? "fill-like-active text-like-active" : ""}`}
            />
          </button>
        </div>

        {/* Product Image */}
        <Link
          href={`/products/${product.slug}`}
          prefetch={true}
          className="relative block w-full h-32 sm:h-38 lg:h-48 bg-muted/40 rounded-md overflow-hidden my-3"
        >
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </Link>

        {/* Category Label */}
        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mt-1">
          {product.categoryLabel || product.category}
        </p>

        {/* Product Title */}
        <Link
          href={`/products/${product.slug}`}
          prefetch={true}
          className="block mt-1 focus:outline-none"
        >
          <h3 className="text-sm sm:text-base font-semibold text-card-foreground group-hover:text-brand-green line-clamp-1 leading-snug transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Rating Stars & Count */}
        <div className="flex items-center gap-1.5 mt-1">
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
          <span className="text-xs text-muted-foreground font-medium">
            {product.reviewsCount > 0 ? `(${product.reviewsCount})` : "No Reviews"}
          </span>
        </div>

        {/* Stock Status */}
        <p className="text-xs font-semibold text-success mt-1">
          In Stock: {product.stockCount}
        </p>
      </div>

      {/* Bottom: Price & Add to Cart button */}
      <div className="mt-4 pt-2 border-t border-border/60 flex flex-col gap-3">
        <div className="flex items-baseline gap-2 flex-wrap">
          <span className="text-sm font-extrabold text-card-foreground">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-muted-foreground line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
          {product.discountPercent && product.discountPercent > 0 && (
            <span className="text-xs font-bold text-success bg-success-light px-2 py-0.5 rounded">
              -{product.discountPercent}%
            </span>
          )}
        </div>

        {/* Add To Cart or Increment/Decrement Stepper */}
        {mounted && inCartQuantity > 0 ? (
          <div
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className="w-full h-10 sm:h-10.5 rounded-full border border-brand-green/40 bg-brand-sand-pill flex items-center justify-between p-1 shadow-2xs"
          >
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                decrementQuantity(product.id);
              }}
              className="w-8 h-8 rounded-full bg-card border border-border text-foreground hover:bg-destructive hover:text-white hover:border-destructive flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>

            <span className="text-xs font-bold text-foreground select-none flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-green" />
              <span>{inCartQuantity} in Cart</span>
            </span>

            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (inCartQuantity < maxStock) {
                  incrementQuantity(product.id);
                }
              }}
              disabled={inCartQuantity >= maxStock}
              className="w-8 h-8 rounded-full bg-brand-green text-white hover:bg-brand-green-hover disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-colors cursor-pointer shadow-2xs"
              aria-label="Increase quantity"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <Button
            onClick={handleAddToCart}
            className="w-full h-10 sm:h-10.5 rounded-full text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 bg-brand-green hover:bg-brand-green-hover text-white active:scale-98 shadow-xs cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Add To Cart</span>
          </Button>
        )}
      </div>
    </div>
  );
}
