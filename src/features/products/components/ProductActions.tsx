"use client";

import { useState, useEffect } from "react";
import {
  ShoppingBag,
  MessageCircle,
  Minus,
  Plus,
  Check,
  ArrowRight,
  MapPin,
} from "lucide-react";
import { Product } from "@/features/products/types/product";
import { useCartStore } from "@/features/cart/store/cart-store";
import { siteConfig } from "@/config/site";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

interface ProductActionsProps {
  product: Product;
}

export function ProductActions({ product }: ProductActionsProps) {
  const [quantity, setQuantity] = useState(1);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const cartItem = useCartStore((state) =>
    state.items.find((i) => i.product.id === product.id)
  );
  const inCartQuantity = cartItem?.quantity || 0;

  const addItem = useCartStore((state) => state.addItem);
  const incrementQuantity = useCartStore((state) => state.incrementQuantity);
  const decrementQuantity = useCartStore((state) => state.decrementQuantity);

  const maxStock = product.stockCount > 0 ? product.stockCount : 99;

  const handleAddToCart = () => {
    addItem(product, quantity);
  };

  const activeQuantity = mounted && inCartQuantity > 0 ? inCartQuantity : quantity;

  const handleWhatsAppEnquiry = () => {
    const phoneNumber = siteConfig.whatsapp.phoneNumber.replace(/[^0-9]/g, "");
    const totalPrice = formatPrice(product.price * activeQuantity);

    let message = `*PRODUCT ENQUIRY - ${siteConfig.name.toUpperCase()}*\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━\n\n`;
    message += `Hello Victor Gadgets, I would like to order/enquire about:\n\n`;
    message += `• *Product:* ${product.name}\n`;
    message += `• *Quantity:* ${activeQuantity}\n`;
    message += `• *Price:* ${formatPrice(product.price)} each\n`;
    message += `• *Total:* ${totalPrice}\n`;
    if (product.condition) {
      message += `• *Condition:* ${product.condition}\n`;
    }
    if (product.warranty) {
      message += `• *Warranty:* ${product.warranty}\n`;
    }
    message += `\n━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `Please confirm availability and dispatch options to my location. Thank you!`;

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="space-y-6 pt-4 border-t border-border/70">
      {/* Availability Status */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Availability:
        </span>
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indicator-live opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indicator-live" />
          </span>
          <span className="text-xs font-bold text-indicator-live">
            In Stock ({product.stockCount} units ready to ship)
          </span>
        </div>
      </div>

      {/* Quantity Stepper & Add to Cart Controls */}
      <div className="space-y-3">
        {mounted && inCartQuantity > 0 ? (
          <div className="w-full h-12 rounded-full border border-brand-green/40 bg-brand-sand-pill flex items-center justify-between px-3 text-xs sm:text-sm font-semibold shadow-2xs">
            <button
              type="button"
              onClick={() => decrementQuantity(product.id)}
              className="w-9 h-9 rounded-full bg-card border border-border text-foreground hover:bg-destructive hover:text-white hover:border-destructive flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Decrease quantity"
            >
              <Minus className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 font-bold text-foreground">
              <Check className="w-4 h-4 text-brand-green stroke-[3]" />
              <span>{inCartQuantity} in Cart</span>
              <span className="text-muted-foreground font-normal hidden sm:inline">
                ({formatPrice(product.price * inCartQuantity)})
              </span>
            </div>

            <button
              type="button"
              onClick={() => {
                if (inCartQuantity < maxStock) incrementQuantity(product.id);
              }}
              disabled={inCartQuantity >= maxStock}
              className="w-9 h-9 rounded-full bg-brand-green text-white hover:bg-brand-green-hover disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-colors cursor-pointer shadow-2xs"
              aria-label="Increase quantity"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            {/* Stepper */}
            <div className="flex items-center rounded-full border border-border bg-card p-1 shadow-2xs">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                disabled={quantity <= 1}
                className="w-9 h-9 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                aria-label="Decrease quantity"
              >
                <Minus className="w-4 h-4" />
              </button>

              <span className="w-12 text-center text-sm font-bold text-card-foreground select-none">
                {quantity}
              </span>

              <button
                type="button"
                onClick={() => setQuantity((q) => Math.min(maxStock, q + 1))}
                disabled={quantity >= maxStock}
                className="w-9 h-9 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                aria-label="Increase quantity"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Add to Cart Button */}
            <Button
              onClick={handleAddToCart}
              className="flex-1 h-11 sm:h-12 rounded-full font-bold text-xs sm:text-sm flex items-center justify-center gap-2 bg-brand-green hover:bg-brand-green-hover text-white active:scale-98 shadow-xs cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Cart ({formatPrice(product.price * quantity)})</span>
            </Button>
          </div>
        )}

        {/* WhatsApp Order Button */}
        <Button
          onClick={handleWhatsAppEnquiry}
          className="w-full h-11 sm:h-12 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2.5 shadow-xs transition-all cursor-pointer active:scale-98"
        >
          <MessageCircle className="w-5 h-5 fill-white" />
          <span>
            {mounted && inCartQuantity > 0
              ? `Order ${inCartQuantity} via WhatsApp Direct`
              : "Order via WhatsApp Direct"}
          </span>
          <ArrowRight className="w-4 h-4 ml-0.5" />
        </Button>
      </div>

      {/* Nigerian Dispatch & Verification Guarantee */}
      <div className="bg-brand-sand border border-brand-sand-border rounded-2xl p-4 text-xs text-muted-foreground space-y-2 shadow-2xs">
        <div className="flex items-center gap-2 font-semibold text-foreground">
          <MapPin className="w-4 h-4 text-brand-green shrink-0" />
          <span>Ikeja Hub Dispatch • Same-Day Lagos & Interstate Waybill</span>
        </div>
        <p className="leading-relaxed">
          Order online or send enquiry on WhatsApp. Device comes certified with
          warranty diagnostics from our Ikeja technician lab.
        </p>
      </div>
    </div>
  );
}

