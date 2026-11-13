"use client";

import {
  ShieldCheck,
  Truck,
  CreditCard,
  Headphones,
  RotateCcw,
  Award,
  Clock,
  Heart,
  Star,
} from "lucide-react";
import { motion } from "motion/react";
import { SectionHeader } from "@/components/shared/SectionHeader";

export function WhyShopWithUs() {
  const benefits = [
    {
      title: "Secure Shopping",
      description: "100% secure payment with SSL encryption",
      icon: ShieldCheck,
      iconClass: "bg-feature-blue-light text-feature-blue",
      barClass: "bg-feature-blue",
    },
    {
      title: "Nationwide Delivery",
      description: "Prompt Lagos delivery & 36 states waybill",
      icon: Truck,
      iconClass: "bg-feature-green-light text-feature-green",
      barClass: "bg-feature-green",
    },
    {
      title: "Easy Payments",
      description: "Multiple payment options available",
      icon: CreditCard,
      iconClass: "bg-feature-purple-light text-feature-purple",
      barClass: "bg-feature-purple",
    },
    {
      title: "24/7 Support",
      description: "Dedicated customer support anytime",
      icon: Headphones,
      iconClass: "bg-feature-orange-light text-feature-orange",
      barClass: "bg-feature-orange",
    },
    {
      title: "Easy Returns",
      description: "30-day hassle-free return policy",
      icon: RotateCcw,
      iconClass: "bg-feature-pink-light text-feature-pink",
      barClass: "bg-feature-pink",
    },
    {
      title: "Quality Assured",
      description: "100% authentic products guaranteed",
      icon: Award,
      iconClass: "bg-feature-amber-light text-feature-amber",
      barClass: "bg-feature-amber",
    },
    {
      title: "Fast Processing",
      description: "Orders processed within 24 hours",
      icon: Clock,
      iconClass: "bg-feature-indigo-light text-feature-indigo",
      barClass: "bg-feature-indigo",
    },
    {
      title: "Best Prices",
      description: "Competitive pricing with great deals",
      icon: Heart,
      iconClass: "bg-feature-rose-light text-feature-rose",
      barClass: "bg-feature-rose",
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-background">
      <div className="container">
        <SectionHeader
          title="WHY SHOP WITH US"
          subtitle="Experience the best online shopping with our commitment to quality, security, and exceptional service"
        />

        {/* Warm Container */}
        <div className="mt-10 bg-linear-to-b from-brand-sand-light to-brand-sand border border-brand-sand-border rounded-3xl p-6 sm:p-10 lg:p-12 shadow-xs">
          {/* 8 Feature Cards (4 across in 2 rows) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {benefits.map((b, index) => {
              const Icon = b.icon;
              return (
                <motion.div
                  key={b.title}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{
                    duration: 0.45,
                    delay: (index % 4) * 0.06 + Math.floor(index / 4) * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="bg-card border border-border rounded-2xl p-6 sm:p-7 flex flex-col items-center text-center justify-between shadow-xs hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-3.5 ${b.iconClass}`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>

                    <h4 className="text-sm sm:text-base font-bold text-card-foreground">
                      {b.title}
                    </h4>

                    <p className="text-xs sm:text-sm text-muted-foreground mt-1.5 font-normal leading-relaxed">
                      {b.description}
                    </p>
                  </div>

                  {/* Accent Progress Line */}
                  <div className="w-28 sm:w-32 h-1.5 bg-muted rounded-full mx-auto mt-5 overflow-hidden">
                    <div className={`w-1/2 h-full ${b.barClass} rounded-full`} />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom Stats: 4 Separate Rounded Cards */}
          <div className="mt-12 pt-8 border-t border-brand-sand-border grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {[
              { val: "50K+", label: "Happy Customers" },
              { val: "100K+", label: "Products Sold" },
              { val: "99%", label: "Satisfaction Rate" },
              { val: "24/7", label: "Customer Support" },
            ].map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{
                  duration: 0.45,
                  delay: idx * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="bg-card/80 border border-brand-sand-border rounded-2xl p-6 text-center shadow-2xs"
              >
                <p className="text-3xl sm:text-4xl font-black text-card-foreground">
                  {stat.val}
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Trust Banner Pill */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mt-8 text-center"
          >
            <div className="inline-flex items-center gap-2 px-7 py-2.5 rounded-full bg-brand-sand-pill border border-brand-sand-pill-border text-xs sm:text-sm font-semibold text-foreground shadow-2xs">
              <ShieldCheck className="w-4.5 h-4.5 text-brand-green" />
              <span>Trusted by thousands of satisfied customers worldwide</span>
              <div className="flex items-center text-rating-star">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-3.5 h-3.5 fill-rating-star text-rating-star"
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
