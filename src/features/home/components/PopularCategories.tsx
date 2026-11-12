"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function PopularCategories() {
  const categories = [
    {
      title: "Computers",
      subtitle: "MacBooks, ThinkPads & High-Performance Laptops",
      badge: "Work & Creation",
      count: "24+ Models Available",
      image: "/product-images/laptop-1.jpg",
      href: "/products?category=laptops",
    },
    {
      title: "iPhones",
      subtitle: "Brand New & Certified Pre-Owned Apple Flagships",
      badge: "Apple Ecosystem",
      count: "100% Battery Health Inspected",
      image: "/product-images/iphone-1.jpg",
      href: "/products?category=smartphones",
    },
    {
      title: "iPhone Accessories",
      subtitle: "Impact-Resistant Cases, Leather Pouches & 9H Glass",
      badge: "Device Defense",
      count: "Fitted for All Generations",
      image: "/product-images/iphone-accesspries-1.jpg",
      href: "/products?category=accessories",
    },
    {
      title: "AirPods & Earpods",
      subtitle: "Spatial Audio, Active Noise Cancellation & Wired Pods",
      badge: "Pure Sound",
      count: "Original Apple Acoustics",
      image: "/product-images/airpod-1.jpg",
      href: "/products?category=airpods",
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-background">
      <div className="container">
        <SectionHeader
          title="Popular Categories"
          subtitle="Explore our most popular product categories and find what you need"
          actionText="Browse All Categories"
          actionHref="/products"
        />

        {/* Warm Container Box */}
        <div className="mt-10 bg-linear-to-b from-brand-sand-light to-brand-sand border border-brand-sand-border rounded-3xl p-6 sm:p-10 lg:p-12 shadow-xs">
          {/* Grid of 4 Category Cards (4 cols on desktop, 2 on tablet/mobile) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 sm:gap-6">
            {categories.map((cat, index) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -5, transition: { duration: 0.25 } }}
                className="group bg-card border border-border/80 rounded-3xl p-4 sm:p-5 flex flex-col justify-between shadow-xs hover:shadow-xl hover:border-brand-green/30 transition-shadow duration-300"
              >
                <div>
                  {/* Category Photographic Showcase */}
                  <div className="relative w-full h-48 sm:h-52 rounded-2xl overflow-hidden bg-brand-surface border border-border/40">
                    <Image
                      src={cat.image}
                      alt={cat.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/55 via-black/10 to-transparent pointer-events-none" />

                    {/* Warm Lifestyle Badge */}
                    <span className="absolute top-3 left-3 bg-card/90 backdrop-blur-xs text-foreground text-xs font-semibold px-3 py-1 rounded-full border border-border/60 shadow-xs flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-brand-orange" />
                      {cat.badge}
                    </span>
                  </div>

                  {/* Text Details */}
                  <div className="mt-4 px-1">
                    <Link href={cat.href} className="block">
                      <h3 className="text-base sm:text-lg font-bold text-card-foreground group-hover:text-brand-green transition-colors">
                        {cat.title}
                      </h3>
                    </Link>

                    <p className="text-xs sm:text-[13px] text-muted-foreground mt-1.5 font-normal leading-relaxed line-clamp-2">
                      {cat.subtitle}
                    </p>

                    <p className="text-xs font-semibold text-brand-green mt-3 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-green" />
                      {cat.count}
                    </p>
                  </div>
                </div>

                {/* Bottom Action Button */}
                <div className="mt-5 pt-3.5 border-t border-border/60">
                  <Link
                    href={cat.href}
                    className={cn(
                      buttonVariants({ variant: "outline", size: "sm" }),
                      "w-full h-10 rounded-full text-xs font-semibold border-border hover:border-brand-green hover:bg-brand-green hover:text-white transition-all justify-between px-4 group/btn cursor-pointer"
                    )}
                  >
                    <span>Explore {cat.title}</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom Stats Strip inside Container */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12 pt-8 border-t border-brand-sand-border flex flex-col items-center gap-6"
          >
            <div className="flex items-center justify-center gap-10 sm:gap-16 text-center">
              <div>
                <p className="text-3xl sm:text-4xl font-black text-foreground">
                  4+
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground font-medium mt-0.5">Core Categories</p>
              </div>
              <div>
                <p className="text-3xl sm:text-4xl font-black text-foreground">
                  1000+
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground font-medium mt-0.5">Products</p>
              </div>
              <div>
                <p className="text-3xl sm:text-4xl font-black text-foreground">
                  24/7
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground font-medium mt-0.5">Support</p>
              </div>
            </div>

            {/* Pill Button below stats */}
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-7 py-2.5 rounded-full bg-brand-sand-pill hover:bg-brand-sand-pill-hover border border-brand-sand-pill-border text-xs sm:text-sm font-semibold text-foreground shadow-2xs transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-brand-green" />
              Discover amazing products in every category
              <span className="w-1.5 h-1.5 rounded-full bg-brand-green" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
