"use client";

import { motion } from "motion/react";
import { ShieldCheck, Truck, MessageCircle } from "lucide-react";

interface ShopHeaderProps {
  title?: string;
  subtitle?: string;
  category?: string;
}

export function ShopHeader({
  title = "Shop Products",
  subtitle,
  category,
}: ShopHeaderProps) {
  const dynamicSubtitle =
    subtitle ||
    "Discover certified UK/US-used and brand-new MacBooks, Windows laptops, factory-unlocked iPhones, and genuine accessories. Inspected by our Ikeja technicians with warranty.";

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-3xl bg-linear-to-br from-brand-sand via-brand-sand-light to-brand-sand dark:from-card dark:via-muted/30 dark:to-card border border-brand-sand-border dark:border-border p-6 sm:p-8 lg:p-10 shadow-xs"
    >
      {/* Subtle decorative glow in top-right */}
      <div className="absolute -top-16 -right-16 w-64 h-64 bg-brand-green/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 space-y-4 max-w-3xl">
        {/* Top Location & Certification Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-card dark:bg-muted border border-border text-[11px] sm:text-xs font-bold text-foreground shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
          <span className="text-brand-green font-extrabold">Ikeja Gadget Hub</span>
          <span className="text-muted-foreground">•</span>
          <span className="text-muted-foreground font-medium">100% Certified Devices</span>
        </div>

        {/* Banner Title */}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-foreground tracking-tight leading-tight">
          {title}
        </h1>

        {/* Banner Subtitle */}
        <p className="text-xs sm:text-sm lg:text-base text-muted-foreground leading-relaxed font-normal">
          {dynamicSubtitle}
        </p>

        {/* 3 Nigerian Trust & Dispatch Badges */}
        <div className="pt-2 flex items-center gap-2 sm:gap-3 flex-wrap">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-green-light border border-brand-green/20 text-brand-green text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Tested Warranty</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-sand-pill border border-brand-sand-pill-border text-foreground text-xs font-semibold">
            <Truck className="w-3.5 h-3.5 text-brand-orange" />
            <span>Lagos Dispatch & 36 States Waybill</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-card dark:bg-muted border border-border text-foreground text-xs font-semibold">
            <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
            <span>Instant WhatsApp Enquiry</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
