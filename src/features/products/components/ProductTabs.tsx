"use client";

import { useState } from "react";
import { ShieldCheck, Truck, Cpu, FileText, CheckCircle2 } from "lucide-react";
import { Product } from "@/features/products/types/product";

interface ProductTabsProps {
  product: Product;
}

export function ProductTabs({ product }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "specs" | "warranty">("overview");

  const specsList = Object.entries(product.specs || {});

  return (
    <div className="bg-card border border-border rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xs">
      {/* Tab Navigation Pill Bar */}
      <div className="flex items-center gap-2 border-b border-border/80 pb-4 overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveTab("overview")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
            activeTab === "overview"
              ? "bg-brand-green text-white shadow-2xs"
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Product Overview</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("specs")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
            activeTab === "specs"
              ? "bg-brand-green text-white shadow-2xs"
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
          }`}
        >
          <Cpu className="w-4 h-4" />
          <span>Technical Specifications</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/20">
            {specsList.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("warranty")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
            activeTab === "warranty"
              ? "bg-brand-green text-white shadow-2xs"
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Warranty & Delivery</span>
        </button>
      </div>

      {/* Tab Contents */}
      <div className="pt-6">
        {/* 1. Overview */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-card-foreground">
                About this {product.categoryLabel || "Product"}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed font-normal">
                {product.description || product.shortDescription}
              </p>
            </div>

            {/* Tags / Features */}
            {product.tags && product.tags.length > 0 && (
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                  Key Features & Identifiers
                </h4>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted/60 text-xs font-medium text-foreground border border-border/50 capitalize"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-green" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* 2. Specs */}
        {activeTab === "specs" && (
          <div className="space-y-4">
            <h3 className="text-base sm:text-lg font-bold text-card-foreground">
              Technical Hardware Specifications
            </h3>

            {specsList.length > 0 ? (
              <div className="rounded-2xl border border-border overflow-hidden divide-y divide-border/60">
                {specsList.map(([key, value], idx) => (
                  <div
                    key={key}
                    className={`grid grid-cols-1 sm:grid-cols-3 p-3.5 sm:p-4 text-xs sm:text-sm ${
                      idx % 2 === 0 ? "bg-muted/20" : "bg-card"
                    }`}
                  >
                    <span className="font-semibold text-card-foreground sm:col-span-1">
                      {key}
                    </span>
                    <span className="text-muted-foreground sm:col-span-2 mt-0.5 sm:mt-0 font-normal">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs sm:text-sm text-muted-foreground">
                No specific hardware parameters provided for this item.
              </p>
            )}
          </div>
        )}

        {/* 3. Warranty & Delivery */}
        {activeTab === "warranty" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Warranty Card */}
              <div className="bg-brand-sand border border-brand-sand-border rounded-2xl p-5 space-y-2.5">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-brand-green" />
                  <h4 className="text-sm font-bold text-card-foreground">
                    Victor Gadgets Certified Warranty
                  </h4>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <strong>{product.warranty || "1 Year Tested Warranty"}</strong>:
                  All devices undergo stringent 30-point diagnostics by our certified
                  technicians before delivery. Covers motherboard integrity, battery
                  health, and core display components.
                </p>
              </div>

              {/* Delivery Card */}
              <div className="bg-brand-sand border border-brand-sand-border rounded-2xl p-5 space-y-2.5">
                <div className="flex items-center gap-2">
                  <Truck className="w-5 h-5 text-brand-green" />
                  <h4 className="text-sm font-bold text-card-foreground">
                    Nigeria Logistics & Delivery
                  </h4>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  • <strong>Lagos:</strong> Same-day dispatch within 2-4 hours.
                  <br />
                  • <strong>Interstate:</strong> Insured express waybill delivery
                  to all 36 states via trusted logistics partners (1-3 business days).
                  <br />
                  • <strong>Store Pickup:</strong> Free collection at our Ikeja electronics plaza.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

