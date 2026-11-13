"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShoppingBag,
  ArrowLeft,
  Trash2,
} from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { motion } from "motion/react";
import { useCartStore } from "@/features/cart/store/cart-store";
import { CartItem } from "@/features/cart/types/cart";
import { CartItemCard } from "./CartItemCard";
import { OrderSummary } from "./OrderSummary";
import { EmptyCart } from "./EmptyCart";
import { ConfirmationModal } from "@/components/shared";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function CartView() {
  const [mounted, setMounted] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<CartItem | null>(null);
  const [isClearCartOpen, setIsClearCartOpen] = useState(false);

  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch while reading from localStorage
  if (!mounted) {
    return (
      <div className="py-16 sm:py-24 text-center">
        <div className="w-10 h-10 border-3 border-brand-green border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-xs sm:text-sm text-muted-foreground font-medium">
          Loading your cart...
        </p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="py-10 sm:py-16 bg-background">
        <div className="container">
          <EmptyCart />
        </div>
      </div>
    );
  }

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="py-8 sm:py-12 bg-background min-h-screen">
      <div className="container space-y-6 sm:space-y-8">
        {/* Breadcrumb Navigation */}
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink render={<Link href="/" />}>Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Cart</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Page Header */}
        <div className="flex items-center justify-between pb-2">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-brand-green-light border border-brand-green/20 flex items-center justify-center text-brand-green">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
                Shopping Cart
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                {itemCount} {itemCount === 1 ? "item" : "items"} selected for order enquiry
              </p>
            </div>
          </div>
        </div>

        {/* Main 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Cart Items List */}
          <div className="lg:col-span-8 space-y-4">
            <div className="space-y-3">
              {items.map((item, index) => (
                <motion.div
                  key={item.product.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.35,
                    delay: index * 0.05,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <CartItemCard
                    item={item}
                    onRemove={(targetItem) => setItemToDelete(targetItem)}
                  />
                </motion.div>
              ))}
            </div>

            {/* Cart Bottom Actions */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
              <Link
                href="/products"
                className={cn(
                  buttonVariants({ variant: "outline", size: "sm" }),
                  "w-full sm:w-auto rounded-full h-10 px-5 text-xs font-semibold gap-2 border-border cursor-pointer inline-flex items-center justify-center"
                )}
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Continue Shopping</span>
              </Link>

              <button
                type="button"
                onClick={() => setIsClearCartOpen(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-destructive px-4 py-2 rounded-full hover:bg-destructive/10 transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All Items</span>
              </button>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <aside className="lg:col-span-4 sticky top-24">
            <OrderSummary />
          </aside>
        </div>
      </div>

      {/* 1. Modal: Confirm Single Item Delete */}
      <ConfirmationModal
        isOpen={Boolean(itemToDelete)}
        onClose={() => setItemToDelete(null)}
        onConfirm={() => {
          if (itemToDelete) {
            removeItem(itemToDelete.product.id);
            setItemToDelete(null);
          }
        }}
        title="Remove Item?"
        confirmText="Remove"
        cancelText="Cancel"
        variant="danger"
        description={
          itemToDelete ? (
            <p>
              Remove <strong className="text-foreground">{itemToDelete.product.name}</strong> from your cart?
            </p>
          ) : null
        }
      />

      {/* 2. Modal: Confirm Clear All Items */}
      <ConfirmationModal
        isOpen={isClearCartOpen}
        onClose={() => setIsClearCartOpen(false)}
        onConfirm={() => {
          clearCart();
          setIsClearCartOpen(false);
        }}
        title="Clear Cart?"
        confirmText="Clear All"
        cancelText="Cancel"
        variant="danger"
        description="Are you sure you want to remove all items from your cart?"
      />
    </div>
  );
}

