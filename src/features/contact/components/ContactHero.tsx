"use client";

import { motion } from "motion/react";
import { Sparkles } from "lucide-react";

export function ContactHero() {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-linear-to-b from-[#185d38] via-[#12492c] to-[#0c351f] text-white p-8 sm:p-12 lg:p-16 text-center shadow-lg">
      {/* Decorative background glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-green/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto space-y-4">
        {/* Top Pill Tag */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-semibold backdrop-blur-xs shadow-2xs"
        >
          <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
          <span>We&apos;re Here to Help</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight"
        >
          Contact Us
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.15 }}
          className="text-xs sm:text-sm lg:text-base text-white/85 max-w-2xl mx-auto leading-relaxed font-normal"
        >
          Have questions about our laptops, iPhones, accessories, or repair services?
          We&apos;d love to hear from you. Our team is here to assist with product availability,
          warranty details, and nationwide delivery.
        </motion.p>
      </div>
    </div>
  );
}

