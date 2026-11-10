"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { SectionHeader } from "@/components/shared/SectionHeader";

export function LatestInsights() {
  const articles = [
    {
      title: "How to Choose the Right Laptop for Work and Creative Flow",
      category: "BUYING GUIDE",
      date: "February 19, 2026",
      image: "/repair-service-images/laptop-repair-3.jpg",
      href: "/services",
    },
    {
      title: "Signs Your Laptop Motherboard Needs Immediate Servicing",
      category: "MAINTENANCE",
      date: "October 8, 2026",
      image: "/repair-service-images/laptop-repair-2.jpg",
      href: "/services",
    },
    {
      title: "iPhone Battery Health Tips & Screen Replacement Guide",
      category: "TECH GUIDE",
      date: "September 19, 2026",
      image: "/repair-service-images/laptop-repair-7.jpg",
      href: "/services",
    },
    {
      title: "SSD & RAM Upgrades: Revive Your Sluggish Laptop Today",
      category: "HARDWARE",
      date: "October 8, 2026",
      image: "/repair-service-images/laptop-repair-6.jpg",
      href: "/services",
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-background">
      <div className="container">
        <SectionHeader
          title="Latest Blog Posts"
          subtitle="Stay updated with our latest insights, tips, and electronics repair news"
          actionText="View All Posts"
          actionHref="/services"
        />

        {/* 4 Cards Grid */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {articles.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="bg-card border border-brand-border-subtle rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between group"
            >
              <div>
                <div className="relative w-full h-48 sm:h-52 overflow-hidden bg-muted">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="p-5">
                  <span className="bg-brand-sand-pill text-brand-orange-dark text-xs font-bold px-2.5 py-1 rounded-md inline-block uppercase tracking-wider mb-2.5">
                    {item.category}
                  </span>

                  <div className="text-xs text-muted-foreground font-normal">
                    {item.date}
                  </div>

                  <Link href={item.href} className="block mt-1.5">
                    <h3 className="text-sm sm:text-base font-bold text-foreground group-hover:text-brand-green line-clamp-2 leading-snug transition-colors">
                      {item.title}
                    </h3>
                  </Link>
                </div>
              </div>

              <div className="p-5 pt-0">
                <Link
                  href={item.href}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-foreground hover:text-brand-green"
                >
                  Read More
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Discover Pill Button */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-10 text-center"
        >
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-7 py-2.5 rounded-full bg-brand-sand-pill border border-brand-sand-pill-border hover:bg-brand-sand-pill-hover text-xs sm:text-sm font-semibold text-foreground transition-colors"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-green" />
            Discover more insights and stories in our blog section
            <span className="w-1.5 h-1.5 rounded-full bg-brand-green" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
