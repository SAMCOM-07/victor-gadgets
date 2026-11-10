"use client";

import { motion } from "motion/react";

interface ShopHeaderProps {
  title?: string;
  subtitle?: string;
}

export function ShopHeader({
  title = "Shop Products",
  subtitle = "Discover amazing products tailored to your needs",
}: ShopHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="w-full bg-card border border-border rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xs"
    >
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-card-foreground tracking-tight">
        {title}
      </h1>
      <p className="text-xs sm:text-sm lg:text-base text-muted-foreground mt-2 font-normal">
        {subtitle}
      </p>
    </motion.div>
  );
}

