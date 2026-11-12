"use client";

import { Wrench, ShieldCheck, Clock, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";

export function ServicesHero() {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-linear-to-b from-[#185d38] via-[#12492c] to-[#0c351f] text-white p-6 sm:p-10 lg:p-14 text-center shadow-lg">
      {/* Decorative background glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-green/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto space-y-5 sm:space-y-6">
        {/* Top Pill Tag */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-semibold backdrop-blur-xs shadow-2xs"
        >
          <Wrench className="w-3.5 h-3.5 text-emerald-300" />
          <span>Victor Gadgets Diagnostic Lab • Ikeja Hub</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight max-w-3xl mx-auto"
        >
          Expert Laptop, MacBook & Gadget Services
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.15 }}
          className="text-xs sm:text-sm lg:text-base text-white/85 max-w-2xl mx-auto leading-relaxed font-normal"
        >
          Fast diagnosis, component-level motherboard repair, genuine display replacements,
          and high-speed SSD/RAM upgrades backed by our 90-day service warranty in Ikeja, Lagos.
        </motion.p>

        {/* 3 Counter / Stat Badges matching the design */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-3 gap-3 sm:gap-6 max-w-xl mx-auto pt-2"
        >
          <div className="bg-white/10 border border-white/15 rounded-2xl p-3 sm:p-4 text-center backdrop-blur-xs hover:bg-white/15 transition-colors">
            <p className="text-[11px] sm:text-xs text-white/70 font-medium">Devices Repaired</p>
            <p className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white mt-0.5">5,000+</p>
          </div>

          <div className="bg-white/10 border border-white/15 rounded-2xl p-3 sm:p-4 text-center backdrop-blur-xs hover:bg-white/15 transition-colors">
            <p className="text-[11px] sm:text-xs text-white/70 font-medium">Diagnostic Target</p>
            <p className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white mt-0.5">24–48h</p>
          </div>

          <div className="bg-white/10 border border-white/15 rounded-2xl p-3 sm:p-4 text-center backdrop-blur-xs hover:bg-white/15 transition-colors">
            <p className="text-[11px] sm:text-xs text-white/70 font-medium">Repair Warranty</p>
            <p className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white mt-0.5">90 Days</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

