"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface SlideItem {
  src: string;
  alt: string;
  badge: string;
}

const slideshowImages: SlideItem[] = [
  {
    src: "/product-images/laptop-1.jpg",
    alt: "MacBook Pro 16-inch M3 Max",
    badge: "MacBook Pro M3 Max",
  },
  {
    src: "/product-images/iphone-1.jpg",
    alt: "iPhone 16 Pro Max Desert Titanium",
    badge: "iPhone 16 Pro Max Titanium",
  },
  {
    src: "/product-images/laptop-2.jpg",
    alt: "Dell XPS 15 OLED Touch",
    badge: "Dell XPS 15 OLED",
  },
  {
    src: "/product-images/iphone-2.jpg",
    alt: "iPhone 16 Pro Natural Titanium",
    badge: "iPhone 16 Pro Titanium",
  },
  {
    src: "/product-images/laptop-3.jpg",
    alt: "HP Spectre x360 2-in-1",
    badge: "HP Spectre x360 2-in-1",
  },
  {
    src: "/product-images/iphone-3.jpg",
    alt: "iPhone 16 Ultramarine Edition",
    badge: "iPhone 16 Ultramarine",
  },
  {
    src: "/product-images/laptop-4.jpg",
    alt: "Lenovo ThinkPad X1 Carbon Gen 12",
    badge: "ThinkPad X1 Carbon Gen 12",
  },
  {
    src: "/product-images/iphone-4.jpg",
    alt: "iPhone 15 Pro Max Blue Titanium",
    badge: "iPhone 15 Pro Max Titanium",
  },
  {
    src: "/product-images/laptop-5.jpg",
    alt: "ASUS ROG Zephyrus G16 Gaming",
    badge: "ASUS ROG Zephyrus G16",
  },
  {
    src: "/product-images/iphone-5.jpg",
    alt: "iPhone 15 Pro Space Black",
    badge: "iPhone 15 Pro Space Black",
  },
  {
    src: "/product-images/laptop-6.jpg",
    alt: "Apple MacBook Air 15-inch M3",
    badge: "MacBook Air 15-inch M3",
  },
  {
    src: "/product-images/iphone-6.jpg",
    alt: "iPhone 15 Pink Edition",
    badge: "iPhone 15 Pink Edition",
  },
  {
    src: "/product-images/laptop-7.jpg",
    alt: "Microsoft Surface Laptop 7 Copilot+",
    badge: "Surface Laptop 7 Copilot+",
  },
  {
    src: "/product-images/iphone-7.jpg",
    alt: "iPhone 14 Pro Max Deep Purple",
    badge: "iPhone 14 Pro Max",
  },
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

  const currentItem = slideshowImages[currentSlide] || slideshowImages[0];

  return (
    <section className="relative bg-brand-hero-bg pt-12 pb-10 sm:pt-16 sm:pb-14 lg:pt-20 lg:pb-16 overflow-hidden">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Text slides to the right accordingly */}
          <div className="lg:col-span-7 flex flex-col items-start text-left z-10 pb-4 lg:pb-0 overflow-hidden">
            <motion.div
              initial={{ opacity: 0, x: -35 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-green-light border border-brand-green/15 text-xs font-bold tracking-wider text-brand-green uppercase mb-3"
            >
              <ShieldCheck className="w-4 h-4 text-brand-green" />
              NIGERIA&apos;S TRUSTED TECH STORE • IKEJA, LAGOS
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, x: -35 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-6xl lg:text-7xl font-black text-foreground tracking-tight leading-[1.08] mt-2"
            >
              Genuine Gadgets, <br />
              Delivered Nationwide
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, x: -35 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl leading-relaxed font-normal"
            >
              Original brand-new and certified UK-used MacBooks, HP, Dell, iPhones, and authentic accessories. Fast same-day delivery across Lagos, secure interstate waybill to all 36 states, and tested warranty.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, x: -35 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
              className="mt-5 flex items-baseline gap-2 flex-wrap"
            >
              <span className="text-base sm:text-lg font-bold text-foreground">
                Affordable Gadgets
              </span>
              <span className="text-xs sm:text-sm font-semibold text-muted-foreground bg-muted/60 px-2.5 py-0.5 rounded-full">
                Same-Day Lagos Dispatch • Interstate Waybill
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -35 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 flex items-center gap-3 flex-wrap"
            >
              <Link
                href="/products"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "rounded-full bg-brand-green hover:bg-brand-green-hover text-white text-sm sm:text-base font-semibold h-12 px-8 shadow-xs transition-colors cursor-pointer inline-flex items-center gap-2.5"
                )}
              >
                Shop Now
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>

          {/* Right Column: Slideshow box slides to the left on page load */}
          <motion.div
            initial={{ opacity: 0, x: 45 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative flex items-center justify-center"
          >
            <div className="relative w-full max-w-125 group">
              {/* Subtle Ambient Glow */}
              <div className="absolute -inset-1 bg-linear-to-r from-brand-green/20 to-brand-orange/20 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition duration-500" />

              {/* Showcase Frame */}
              <div className="relative bg-card rounded-3xl p-3 sm:p-4 shadow-xl border border-border overflow-hidden">
                <div className="relative w-full h-80 sm:h-100 rounded-2xl overflow-hidden bg-black/95">
                  {slideshowImages.map((item, index) => (
                    <div
                      key={item.src}
                      className={cn(
                        "absolute inset-0 transition-opacity duration-700 ease-in-out",
                        index === currentSlide
                          ? "opacity-100 z-10"
                          : "opacity-0 z-0 pointer-events-none"
                      )}
                    >
                      <Image
                        src={item.src}
                        alt={item.alt}
                        fill
                        priority={index === 0 || index === 1}
                        sizes="(max-width: 1024px) 100vw, 480px"
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ))}

                  <div className="absolute inset-0 z-20 bg-linear-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

                  {/* Floating Verified Badge (Dynamic to Current Slide) */}
                  <div className="absolute bottom-3.5 left-3.5 right-3.5 z-30 flex items-center justify-between text-white text-xs font-semibold bg-black/80 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/10">
                    <span className="flex items-center gap-2 truncate">
                      <span className="w-2.5 h-2.5 rounded-full bg-indicator-live shrink-0 animate-pulse" />
                      <span className="truncate">{currentItem.badge}</span>
                    </span>
                    <span className="text-indicator-live font-bold shrink-0 ml-2">Tested with Warranty</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* 3 Slider Indicator Dots correlating with slideshow */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
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
