"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { ShoppingBag } from "lucide-react";
import { useCartStore } from "@/features/cart/store/cart-store";

const emptySubscribe = () => () => {};

export function CartBadge() {
  const isHydrated = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const items = useCartStore((state) => state.items);
  const count = isHydrated
    ? items.reduce((acc, item) => acc + item.quantity, 0)
    : 0;

  return (
    <Link
      href="/cart"
      prefetch={true}
      className="relative flex items-center justify-center p-2 rounded-full text-foreground hover:text-primary hover:bg-muted transition-colors cursor-pointer"
      aria-label={`Shopping cart with ${count} items`}
    >
      <ShoppingBag className="w-5 h-5" />
      {isHydrated && count > 0 && (
        <span className="absolute -top-0.5 -right-0.5 bg-brand-green text-primary-foreground text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-xs animate-in zoom-in-50">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </Link>
  );
}
