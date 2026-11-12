"use client";

import Link from "next/link";
import { ShoppingBag, ArrowRight, Laptop, Smartphone, Headphones, Shield } from "lucide-react";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function EmptyCart() {
  const quickLinks = [
    { label: "Computers & Laptops", href: "/products?category=laptops", icon: Laptop },
    { label: "iPhones & Smartphones", href: "/products?category=smartphones", icon: Smartphone },
    { label: "AirPods & Audio", href: "/products?category=accessories", icon: Headphones },
    { label: "Repair Services", href: "/services", icon: Shield },
  ];

  return (
    <div className="bg-card border border-border rounded-3xl p-8 sm:p-14 lg:p-16 flex flex-col items-center justify-center text-center shadow-xs max-w-2xl mx-auto my-8">
      {/* Icon Frame */}
      <div className="w-20 h-20 rounded-3xl bg-brand-sand border border-brand-sand-border flex items-center justify-center text-brand-orange mb-5 shadow-2xs">
        <ShoppingBag className="w-10 h-10" />
      </div>

      <h2 className="text-2xl sm:text-3xl font-black text-card-foreground tracking-tight">
        Your Cart is Empty
      </h2>

      <p className="mt-2.5 text-xs sm:text-sm text-muted-foreground max-w-md leading-relaxed font-normal">
        Looks like you haven&apos;t added any products to your shopping cart yet.
        Explore our wide range of premium laptops, certified iPhones, and
        accessories.
      </p>

      {/* Main CTA */}
      <div className="mt-7">
        <Link
          href="/products"
          className={cn(
            buttonVariants({ size: "lg" }),
            "rounded-full bg-brand-green hover:bg-brand-green-hover text-white text-sm font-semibold h-11 px-8 gap-2 shadow-xs cursor-pointer inline-flex items-center"
          )}
        >
          <span>Explore Products</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Quick Category Browse */}
      <div className="mt-10 pt-8 border-t border-border/60 w-full">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
          Popular Categories to Explore
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          {quickLinks.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.label}
                href={cat.href}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-border bg-muted/40 hover:bg-brand-sand hover:border-brand-green/30 text-xs font-semibold text-card-foreground hover:text-brand-green transition-colors"
              >
                <Icon className="w-3.5 h-3.5 text-muted-foreground" />
                <span>{cat.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

