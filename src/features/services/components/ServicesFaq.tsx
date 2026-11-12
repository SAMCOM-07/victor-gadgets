"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { SectionHeader } from "@/components/shared/SectionHeader";

export function ServicesFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Can I waybill my laptop or gadget from outside Lagos?",
      answer:
        "Yes! We receive devices daily from customers across all 36 Nigerian states (including Abuja, Port Harcourt, Ibadan, Kano, Enugu, and Benin City) via verified logistics hubs such as GIG Logistics, Peace Mass Transit, ABC Transport, or DHL. We confirm receipt via video inspection upon arrival.",
    },
    {
      question: "How long does the repair and diagnostic process take?",
      answer:
        "Screen replacements, battery swaps, and SSD/RAM upgrades are completed same-day (typically 1 to 4 hours). Component-level motherboard micro-soldering, liquid spill recovery, and complex chip repairs take between 24 and 72 hours for thorough diagnosis and burn-in stress testing.",
    },
    {
      question: "Is the diagnostic inspection free?",
      answer:
        "Diagnostic inspection is completely free whenever you proceed with the authorized repair. If you choose not to proceed after a complete microscopic disassembly and fault mapping, only a nominal lab bench fee applies.",
    },
    {
      question: "What kind of warranty is provided on repairs?",
      answer:
        "All motherboard repairs, screen replacements, and hardware repairs carry an official 90-day warranty certificate. High-speed SSD and RAM upgrades come with a full 1-year hardware replacement warranty.",
    },
    {
      question: "Are genuine original parts used for replacements?",
      answer:
        "Yes. We exclusively source OEM original-grade display panels, certified grade-A lithium-ion battery cells, and genuine power ICs. For Apple MacBooks, we retain TrueTone, color accuracy, and factory thermal parameters.",
    },
    {
      question: "Is my personal data and privacy protected during repair?",
      answer:
        "Absolutely. Data privacy is strictly protected. Our technicians work under CCTV in our ESD-safe lab. We never format, delete, or inspect personal customer files without your prior written authorization.",
    },
  ];

  const toggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Frequently Asked Questions"
        subtitle="Clear answers about our repair procedures, diagnostics, warranties, and nationwide waybills"
      />

      <div className="max-w-3xl mx-auto space-y-3 pt-2">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="bg-card border border-border rounded-2xl overflow-hidden transition-colors"
            >
              <button
                type="button"
                onClick={() => toggle(index)}
                className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-foreground hover:text-brand-green transition-colors cursor-pointer"
                aria-expanded={isOpen}
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform duration-200 ${
                    isOpen ? "rotate-180 text-brand-green" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-muted-foreground leading-relaxed border-t border-border/50 pt-3 font-normal">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}

