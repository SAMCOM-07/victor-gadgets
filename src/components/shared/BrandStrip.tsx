"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { SectionHeader } from "./SectionHeader";

export function BrandStrip() {
  const brands = [
    { name: "Hi-Tech", query: "Hi-Tech", style: "font-sans font-bold tracking-tight text-foreground" },
    { name: "HP", query: "HP", style: "font-serif italic font-black text-foreground" },
    { name: "Apple", query: "Apple", style: "font-sans font-medium tracking-wide text-foreground" },
    { name: "A4TECH", query: "A4Tech", style: "font-mono font-bold tracking-wider text-muted-foreground" },
    { name: "HITACHI", query: "Hitachi", style: "font-sans font-black tracking-widest text-foreground" },
    { name: "HUAWEI", query: "Huawei", style: "font-sans font-extrabold tracking-wider text-foreground" },
    { name: "DELL", query: "Dell", style: "font-sans font-black tracking-tight text-foreground" },
    { name: "SONY", query: "Sony", style: "font-serif font-bold tracking-widest text-foreground" },
  ];

  return (
    <section className="py-16 sm:py-20 bg-background">
      <div className="container">
        <SectionHeader
          title="Shop By Brands"
          subtitle="Discover products from your favorite trusted brands"
          actionText="Explore All Brands"
          actionHref="/products"
          barColor="orange"
        />

        {/* Brands Card Container */}
        <div className="mt-8 p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-card to-brand-sand border border-brand-sand-border shadow-xs">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 items-center justify-items-center">
            {brands.map((b, index) => (
              <motion.div
                key={b.name}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.04,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="w-full"
              >
                <Link
                  href={`/products?brand=${encodeURIComponent(b.query)}`}
                  className="w-full h-20 sm:h-22 bg-card rounded-2xl border border-border shadow-2xs hover:shadow-md hover:border-muted-foreground/30 flex items-center justify-center p-3.5 text-center transition-all group"
                >
                  <span
                    className={`text-sm sm:text-base tracking-tight transition-transform group-hover:scale-105 ${b.style}`}
                  >
                    {b.name}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
