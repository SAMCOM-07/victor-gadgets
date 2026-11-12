"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { CartItem } from "@/features/cart/types/cart";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/features/cart/store/cart-store";

interface CartItemCardProps {
  item: CartItem;
  onRemove?: (item: CartItem) => void;
}

export function CartItemCard({ item, onRemove }: CartItemCardProps) {
  const { product, quantity } = item;
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  const handleRemoveClick = () => {
    if (onRemove) {
      onRemove(item);
    } else {
      removeItem(product.id);
    }
  };

  const maxStock = product.stockCount > 0 ? product.stockCount : 99;
  const imageUrl = product.images?.[0] || "/product-images/laptop-1.jpg";
  const itemTotal = product.price * quantity;

  return (
    <div className="bg-card border border-border rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xs hover:border-border/80 transition-colors">
      {/* Left: Thumbnail & Details */}
      <div className="flex items-start sm:items-center gap-4 w-full sm:w-auto">
        {/* Product Image Frame */}
        <Link
          href={`/products/${product.slug}`}
          className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-muted/40 shrink-0 border border-border/50 group"
        >
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            sizes="96px"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </Link>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <Link
            href={`/products/${product.slug}`}
            className="block text-sm sm:text-base font-bold text-card-foreground hover:text-brand-green line-clamp-1 transition-colors"
          >
            {product.name}
          </Link>

          {/* Badges / Meta */}
          <div className="flex items-center gap-2 mt-1.5 flex-wrap">
            <span className="text-[11px] font-semibold text-muted-foreground bg-muted/60 px-2.5 py-0.5 rounded-full border border-border/40">
              {product.categoryLabel || product.category}
            </span>
            {product.condition && (
              <span className="text-[11px] font-semibold text-brand-green bg-brand-green-light px-2.5 py-0.5 rounded-full border border-brand-green/20">
                {product.condition}
              </span>
            )}
          </div>

          {/* Stepper & Delete Button (Mobile & Desktop) */}
          <div className="flex items-center gap-3 mt-3">
            {/* Quantity Stepper */}
            <div className="inline-flex items-center rounded-lg border border-border bg-muted/30 p-0.5">
              <button
                type="button"
                onClick={() => updateQuantity(product.id, quantity - 1)}
                disabled={quantity <= 1}
                className="w-7 h-7 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-card disabled:opacity-35 disabled:cursor-not-allowed transition-colors cursor-pointer"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>

              <span className="w-8 text-center text-xs font-bold text-card-foreground select-none">
                {quantity}
              </span>

              <button
                type="button"
                onClick={() => updateQuantity(product.id, quantity + 1)}
                disabled={quantity >= maxStock}
                className="w-7 h-7 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-card disabled:opacity-35 disabled:cursor-not-allowed transition-colors cursor-pointer"
                aria-label="Increase quantity"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Remove / Trash Icon */}
            <button
              type="button"
              onClick={handleRemoveClick}
              className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors cursor-pointer"
              aria-label={`Remove ${product.name} from cart`}
              title="Remove item"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Right: Pricing */}
      <div className="w-full sm:w-auto flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 pt-2 sm:pt-0 border-border/50 shrink-0">
        <span className="text-xs text-muted-foreground sm:order-1">
          {formatPrice(product.price)}{" "}
          <span className="text-[11px] opacity-75">per item</span>
        </span>
        <span className="text-base sm:text-lg font-black text-card-foreground sm:order-2">
          {formatPrice(itemTotal)}
        </span>
      </div>
    </div>
  );
}

