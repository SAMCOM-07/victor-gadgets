"use client";

import { useState, useMemo } from "react";
import { Search, Filter, Wrench } from "lucide-react";
import { RepairService } from "@/features/services/types/service";
import { serviceCategoryFilters } from "@/features/services/data/services";
import { ServiceCard } from "./ServiceCard";

interface ServicesCatalogProps {
  initialServices: RepairService[];
}

export function ServicesCatalog({ initialServices }: ServicesCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredServices = useMemo(() => {
    return initialServices.filter((service) => {
      // Category match
      const matchesCategory =
        selectedCategory === "all" || service.category === selectedCategory;

      // Search match
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        service.title.toLowerCase().includes(query) ||
        service.description.toLowerCase().includes(query) ||
        service.features.some((f) => f.toLowerCase().includes(query)) ||
        service.supportedBrands.some((b) => b.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [initialServices, selectedCategory, searchQuery]);

  return (
    <div className="space-y-8">
      {/* Category Pills & Search Controls Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/80 pb-5">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {serviceCategoryFilters.map((tab) => {
            const isSelected = selectedCategory === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? "bg-brand-green text-white shadow-xs"
                    : "bg-muted/70 text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72 shrink-0">
          <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search service, issue, or brand..."
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-full bg-card border border-border focus:outline-none focus:border-brand-green text-foreground shadow-2xs"
          />
        </div>
      </div>

      {/* Services Grid */}
      {filteredServices.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredServices.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-card border border-border rounded-2xl p-8 space-y-4">
          <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center mx-auto text-muted-foreground">
            <Wrench className="w-6 h-6" />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-foreground">
            No matching services found
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto">
            We repair all laptops, MacBooks, and hardware faults. If your specific issue is not listed,
            chat directly with our lead technician on WhatsApp for custom troubleshooting.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory("all");
              setSearchQuery("");
            }}
            className="px-5 py-2 rounded-full bg-brand-green text-white text-xs sm:text-sm font-bold shadow-xs hover:bg-brand-green-hover transition-colors cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}

