"use client";

import { motion } from "motion/react";

export function ContactFaq() {
  const faqs = [
    {
      question: "What are your Lagos delivery & nationwide waybill options?",
      answer:
        "We offer prompt same-day delivery across Lagos via verified dispatch riders, and fast, insured interstate waybills to all 36 states across Nigeria (including Abuja, Port Harcourt, Ibadan, Kano, and Enugu) via reputable logistics partners such as GIG Logistics, Peace Mass, or ABC Transport.",
    },
    {
      question: "How do I confirm device availability & place an order?",
      answer:
        "Simply add products to your cart and tap 'Order via WhatsApp', or send a direct message on WhatsApp. Our team confirms live stock availability, provides serial numbers/photos on request, and guides you through payment and dispatch.",
    },
    {
      question: "What warranty & testing guarantee do you provide?",
      answer:
        "Every single laptop and smartphone undergoes rigorous multi-point diagnostics (battery health, display TrueTone, logic board thermals, and ports). Brand new items include 1-year manufacturer warranty, and certified pre-owned gadgets include our 6-month Victor Gadgets warranty.",
    },
    {
      question: "Can I walk into your physical Ikeja store?",
      answer:
        "Yes! Our doors are open Monday through Saturday at Suite 14, Gadget Plaza, Electronics Hub, Ikeja, Lagos. You can inspect gadgets in person, test benchmark performance, or consult directly with our repair technicians.",
    },
  ];

  return (
    <section className="space-y-8 pt-4">
      <div className="text-center space-y-2 max-w-xl mx-auto">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-foreground tracking-tight">
          Frequently Asked Questions
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground font-normal">
          Find quick answers to common questions about our gadgets, delivery, and services.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{
              duration: 0.45,
              delay: index * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="bg-card border border-border rounded-2xl p-6 sm:p-7 shadow-2xs hover:shadow-xs transition-shadow space-y-2.5"
          >
            <h3 className="text-sm sm:text-base font-bold text-foreground">
              {faq.question}
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-normal">
              {faq.answer}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

