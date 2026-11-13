"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { Flame } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ProductGalleryProps {
  images: string[];
  name: string;
  isHotDeal?: boolean;
  discountPercent?: number;
  condition?: string;
}

export function ProductGallery({
  images,
  name,
  isHotDeal,
  discountPercent,
  condition,
}: ProductGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Guarantee 3 product image angles
  const displayImages = useMemo(() => {
    const list = [...(images || [])];
    const firstImg = list[0] || "/product-images/laptop-1.jpg";

    if (list.length >= 3) {
      return list.slice(0, 3);
    }

    const lowerName = name.toLowerCase();
    const isLaptop =
      firstImg.includes("laptop") ||
      lowerName.includes("macbook") ||
      lowerName.includes("laptop") ||
      lowerName.includes("thinkpad") ||
      lowerName.includes("xps") ||
      lowerName.includes("spectre") ||
      lowerName.includes("zephyrus");

    const isIphone =
      firstImg.includes("iphone") ||
      lowerName.includes("iphone") ||
      lowerName.includes("galaxy") ||
      lowerName.includes("pixel");

    const isAirpod =
      firstImg.includes("airpod") ||
      lowerName.includes("airpod") ||
      lowerName.includes("earpod");

    let pool: string[];
    if (isLaptop) {
      pool = [
        "/product-images/laptop-1.jpg",
        "/product-images/laptop-2.jpg",
        "/product-images/laptop-3.jpg",
        "/product-images/laptop-4.jpg",
        "/product-images/laptop-5.jpg",
      ];
    } else if (isAirpod) {
      pool = [
        "/product-images/airpod-1.jpg",
        "/product-images/airpod-2.jpg",
        "/product-images/airpod-3.jpg",
      ];
    } else if (isIphone) {
      pool = [
        "/product-images/iphone-1.jpg",
        "/product-images/iphone-2.jpg",
        "/product-images/iphone-3.jpg",
        "/product-images/iphone-4.jpg",
      ];
    } else {
      pool = [
        "/product-images/iphone-accesspries-1.jpg",
        "/product-images/airpod-1.jpg",
        "/product-images/airpod-2.jpg",
      ];
    }

    for (const pImg of pool) {
      if (!list.includes(pImg) && list.length < 3) {
        list.push(pImg);
      }
    }

    return list.slice(0, 3);
  }, [images, name]);

  const currentImage = displayImages[selectedImageIndex] || displayImages[0];

  return (
    <div className="space-y-4">
      {/* Main Image Frame */}
      <div className="relative w-full aspect-4/3 sm:aspect-16/11 rounded-3xl overflow-hidden bg-card border border-border p-4 sm:p-6 shadow-xs flex items-center justify-center group">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImage}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="relative w-full h-full rounded-2xl overflow-hidden"
          >
            <Image
              src={currentImage}
              alt={name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 600px"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </motion.div>
        </AnimatePresence>

        {/* Top Badges */}
        <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
          {isHotDeal && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-orange-light border border-brand-orange-border text-brand-orange-dark text-xs font-bold shadow-2xs">
              <Flame className="w-3.5 h-3.5 fill-brand-orange text-brand-orange" />
              Hot Deal
            </span>
          )}

          {discountPercent && discountPercent > 0 && (
            <span className="px-3 py-1 rounded-full bg-success-light border border-success/20 text-success text-xs font-bold shadow-2xs">
              -{discountPercent}% OFF
            </span>
          )}

          {condition && (
            <span className="px-3 py-1 rounded-full bg-brand-sand border border-brand-sand-border text-foreground text-xs font-semibold shadow-2xs">
              {condition}
            </span>
          )}
        </div>
      </div>

      {/* 3 Selectable Product Images (Replaces the Warranty/Delivery/Diagnostic Cards) */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-1">
        {displayImages.map((img, idx) => {
          const isSelected = selectedImageIndex === idx;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedImageIndex(idx)}
              className={`group relative aspect-4/3 sm:aspect-16/11 rounded-2xl overflow-hidden bg-card border-2 transition-all p-2 flex items-center justify-center cursor-pointer ${
                isSelected
                  ? "border-brand-green shadow-md ring-2 ring-brand-green/20 scale-[1.02]"
                  : "border-border hover:border-muted-foreground/40 opacity-75 hover:opacity-100 hover:shadow-xs"
              }`}
              aria-label={`Switch to product image ${idx + 1}`}
            >
              <div className="relative w-full h-full">
                <Image
                  src={img}
                  alt={`${name} preview ${idx + 1}`}
                  fill
                  sizes="(max-width: 1024px) 33vw, 200px"
                  className="object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Indicator Pill */}
              {isSelected && (
                <span className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-brand-green ring-2 ring-card" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

