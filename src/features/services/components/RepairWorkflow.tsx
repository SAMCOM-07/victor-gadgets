"use client";

import { MapPin, Cpu, CheckSquare, ShieldCheck, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { SectionHeader } from "@/components/shared/SectionHeader";

export function RepairWorkflow() {
  const steps = [
    {
      number: "01",
      icon: MapPin,
      title: "Walk-in or Waybill",
      subtitle: "Lagos Hub & 36 States",
      description:
        "Bring your device to our Ikeja Electronics Plaza hub, or waybill from anywhere in Nigeria using reputable logistics (GIG, Peace Mass, ABC, or courier).",
    },
    {
      number: "02",
      icon: Cpu,
      title: "Lab Diagnostic",
      subtitle: "Thermal & Micro-Soldering",
      description:
        "Our certified technicians inspect power rails, motherboard chips, and individual components under high-magnification microscopes to isolate root causes.",
    },
    {
      number: "03",
      icon: CheckSquare,
      title: "Transparent Quote",
      subtitle: "Zero Hidden Surprises",
      description:
        "We share photographic diagnostic proof, discuss genuine part options, and confirm your approval before any repair work begins.",
    },
    {
      number: "04",
      icon: ShieldCheck,
      title: "Testing & Return",
      subtitle: "90-Day Warranty Protected",
      description:
        "Every repaired device undergoes comprehensive thermal benchmarking, receives a 90-day warranty certificate, and is dispatched securely.",
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-muted/30 rounded-3xl p-6 sm:p-10 lg:p-12 border border-border/70">
      <SectionHeader
        title="How Our Repair & Waybill Service Works"
        subtitle="Transparent, reliable, and hassle-free electronics repairs for customers in Lagos and across Nigeria"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mt-10">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{
                duration: 0.45,
                delay: index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative bg-card border border-border rounded-2xl p-6 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between"
            >
              {/* Step indicator tag */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-black text-brand-green/30 tracking-tight">
                  {step.number}
                </span>
                <div className="w-10 h-10 rounded-xl bg-brand-green/10 text-brand-green flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
              </div>

              <div className="space-y-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block">
                  {step.subtitle}
                </span>
                <h3 className="text-base font-bold text-foreground">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed pt-1 font-normal">
                  {step.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

