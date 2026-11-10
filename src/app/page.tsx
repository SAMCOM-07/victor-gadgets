import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { mockProducts } from "@/features/products/data/products";
import {
  HeroSection,
  PopularCategories,
  WhyShopWithUs,
  WhyChooseUs,
  LatestInsights,
} from "@/features/home/components";
import { FeaturedProducts } from "@/features/products/components/FeaturedProducts";
import { BrandStrip } from "@/components/shared/BrandStrip";
// import { ContactBar } from "@/components/layout/ContactBar";

export const metadata: Metadata = {
  title: `${siteConfig.name} | Premium Laptops, iPhones & Laptop Repairs`,
  description:
    "Shop premium laptops, iPhones, and authentic electronics at Victor Gadgets. Certified laptop screen replacement, motherboard repairs, and express nationwide delivery.",
};

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      {/* 1. Hero Section ("Shop with Confidence") */}
      <HeroSection />

      {/* 2. Featured Products Section with Category Pills & Live Add to Cart */}
      <FeaturedProducts products={mockProducts} />

      {/* 3. Popular Categories Container with Stats */}
      <PopularCategories />

      {/* 4. Why Shop With Us Container with Value Props & Customer Metrics */}
      <WhyShopWithUs />

      {/* 5. Shop By Brands Strip */}
      <BrandStrip />

      {/* 6. Why Choose Us? Split Banner */}
      <WhyChooseUs />

      {/* 7. Latest Insights & Tech Guides */}
      <LatestInsights />

      {/* 8. Pre-footer Contact Information Bar */}
      {/* <ContactBar /> */}
    </div>
  );
}
