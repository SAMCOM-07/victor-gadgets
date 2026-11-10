"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const slideshowImages = [
  "/product-images/laptop-1.jpg",
  "/product-images/laptop-2.jpg",
  "/product-images/laptop-3.jpg",
  "/product-images/laptop-4.jpg",
  "/product-images/laptop-5.jpg",
  "/product-images/laptop-6.jpg",
  "/product-images/laptop-7.jpg",
];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideshowImages.length);
    }, 3500);

    return () => clearInterval(timer);
  }, [currentSlide]);

  const visibleCount = 3;
  const windowStart = Math.min(
    Math.max(currentSlide - 1, 0),
    slideshowImages.length - visibleCount
  );
  const visibleIndices = Array.from(
    { length: visibleCount },
    (_, i) => windowStart + i
  );

  return (
    <section className="relative bg-brand-hero-bg pt-12 pb-10 sm:pt-16 sm:pb-14 lg:pt-20 lg:pb-16 overflow-hidden">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 flex flex-col items-start text-left z-10 pb-4 lg:pb-0"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-green-light border border-brand-green/15 text-xs font-bold tracking-wider text-brand-green uppercase mb-3"
            >
              <ShieldCheck className="w-4 h-4 text-brand-green" />
              WORLD-CLASS GADGETS & REPAIRS
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl sm:text-6xl lg:text-7xl font-black text-foreground tracking-tight leading-[1.08] mt-2"
            >
              Shop with <br />
              Confidence
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="mt-4 text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl leading-relaxed font-normal"
            >
              Premium laptops, certified iPhones, and high-performance electronics.
              Enjoy free express shipping on all orders over $100 and a 30-day
              hassle-free return policy.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="mt-5 flex items-baseline gap-2"
            >
              <span className="text-base sm:text-lg font-bold text-foreground">
                Starting from
              </span>
              <span className="text-lg sm:text-xl font-black text-brand-green">
                $20
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="mt-6"
            >
              <Link
                href="/products"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "rounded-full bg-brand-green hover:bg-brand-green-hover text-primary-foreground text-sm sm:text-base font-semibold h-12 px-8 shadow-xs transition-colors cursor-pointer inline-flex items-center gap-2.5"
                )}
              >
                Shop Now
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Column: Premium Laptop Showcase Banner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 relative flex items-center justify-center"
          >
            <div className="relative w-full max-w-125 group">
              {/* Subtle Ambient Glow */}
              <div className="absolute -inset-1 bg-linear-to-r from-brand-green/20 to-brand-orange/20 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition duration-500" />

              {/* Laptop Showcase Frame */}
              <div className="relative bg-card rounded-3xl p-3 sm:p-4 shadow-xl border border-border overflow-hidden">
                <div className="relative w-full h-80 sm:h-100 rounded-2xl overflow-hidden bg-black/95">
                  {slideshowImages.map((src, index) => (
                    <div
                      key={src}
                      className={cn(
                        "absolute inset-0 transition-opacity duration-700 ease-in-out",
                        index === currentSlide
                          ? "opacity-100 z-10"
                          : "opacity-0 z-0 pointer-events-none"
                      )}
                    >
                      <Image
                        src={src}
                        alt={`Premium Laptop ${index + 1} at Victor Gadgets`}
                        fill
                        priority={index === 0}
                        sizes="(max-width: 1024px) 100vw, 480px"
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ))}

                  <div className="absolute inset-0 z-20 bg-linear-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

                  {/* Floating Verified Badge */}
                  <div className="absolute bottom-3.5 left-3.5 right-3.5 z-30 flex items-center justify-between text-white text-xs font-semibold bg-black/80 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/10">
                    <span className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-indicator-live animate-pulse" />
                      MacBook Pro & Intel Core i9
                    </span>
                    <span className="text-indicator-live font-bold">100% Verified</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* 3 Slider Indicator Dots correlating with 7 slides */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 sm:mt-12 flex items-center justify-center gap-1.5"
        >
          {visibleIndices.map((slideIndex) => {
            const isActive = slideIndex === currentSlide;
            return (
              <button
                key={slideIndex}
                type="button"
                onClick={() => setCurrentSlide(slideIndex)}
                aria-label={`Go to slide ${slideIndex + 1}`}
                className="flex items-center justify-center h-6 p-1 focus:outline-none cursor-pointer transition-all duration-300"
              >
                {isActive ? (
                  <span className="w-4 h-4 rounded-full border-2 border-brand-green flex items-center justify-center transition-all duration-300">
                    <span className="w-2 h-2 rounded-full bg-brand-green" />
                  </span>
                ) : (
                  <span className="w-2 h-2 rounded-full bg-brand-hero-indicator hover:bg-brand-green/70 transition-colors duration-300" />
                )}
              </button>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
