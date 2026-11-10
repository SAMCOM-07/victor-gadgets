"use client";

import Image from "next/image";
import { Truck, RotateCcw, Headphones, CheckCircle } from "lucide-react";
import { motion } from "motion/react";

export function WhyChooseUs() {
  const points = [
    {
      title: "Free Delivery",
      description: "Free shipping over $100",
      icon: Truck,
      iconClass: "bg-feature-blue-light text-feature-blue",
    },
    {
      title: "Free Return",
      description: "Money Back guarantee",
      icon: RotateCcw,
      iconClass: "bg-feature-green-light text-feature-green",
    },
    {
      title: "Customer Support",
      description: "Friendly 24/7 customer support",
      icon: Headphones,
      iconClass: "bg-feature-purple-light text-feature-purple",
    },
    {
      title: "Quality checked by our team",
      description: "Certified hardware diagnostics & testing",
      icon: CheckCircle,
      iconClass: "bg-feature-orange-light text-feature-orange",
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-background">
      <div className="container">
        <div className="bg-card border border-brand-border-subtle rounded-3xl p-8 sm:p-12 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-7 flex flex-col items-start"
            >
              <span className="text-xs font-semibold text-brand-orange-dark bg-brand-orange-light border border-brand-orange-border px-4 py-1.5 rounded-full uppercase tracking-wider">
                100+ trusted brands and counting
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight mt-3.5">
                Why Choose Us?
              </h2>

              <p className="mt-3 text-sm sm:text-base text-muted-foreground font-normal leading-relaxed">
                We provide the best electronics shopping and repair experience with certified technician service.
              </p>

              {/* 4 Points Grid (2x2) */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                {points.map((pt, index) => {
                  const Icon = pt.icon;
                  return (
                    <motion.div
                      key={pt.title}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.45,
                        delay: index * 0.08,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="flex items-start gap-4"
                    >
                      <div
                        className={`w-13 h-13 rounded-2xl flex items-center justify-center shrink-0 ${pt.iconClass}`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-sm sm:text-base font-bold text-foreground">
                          {pt.title}
                        </h4>
                        <p className="text-xs sm:text-sm text-muted-foreground mt-1 leading-snug font-normal">
                          {pt.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Right Graphic: Laptop Service & Tech Diagnostic Banner */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-5 relative flex items-center justify-center"
            >
              <div className="relative w-full max-w-lg aspect-16/10 rounded-2xl overflow-hidden shadow-md border border-border group">
                <Image
                  src="/repair-service-images/laptop-repair-1.jpg"
                  alt="Quality checked and certified by Victor Gadgets"
                  fill
                  sizes="(max-width: 1024px) 100vw, 480px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3.5 left-3.5 text-white text-xs font-semibold bg-foreground/80 backdrop-blur-xs px-3.5 py-1.5 rounded-lg border border-white/10">
                  Certified Diagnostic Lab
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
