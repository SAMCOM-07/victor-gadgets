"use client";

import { MapPin, Navigation, Car, ShieldCheck, MessageCircle, ExternalLink } from "lucide-react";
import { siteConfig } from "@/config/site";

export function LocationMap() {
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    siteConfig.contact.address.full
  )}`;

  return (
    <div className="bg-card border border-border rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xs space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border/60">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-green-light border border-brand-green/20 text-brand-green text-xs font-bold mb-2">
            <MapPin className="w-3.5 h-3.5" />
            <span>Physical Location & Diagnostic Hub</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-foreground tracking-tight">
            Visit Our Ikeja Tech Center
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            {siteConfig.contact.address.full}
          </p>
        </div>

        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-brand-green hover:bg-brand-green-hover text-white text-xs font-bold shadow-xs transition-colors cursor-pointer shrink-0"
        >
          <Navigation className="w-3.5 h-3.5" />
          <span>Get Directions</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* 3 Helpful Location Points */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
        <div className="bg-muted/40 border border-border/70 rounded-2xl p-4 space-y-1.5">
          <div className="w-8 h-8 rounded-lg bg-card border border-border flex items-center justify-center text-brand-green">
            <MapPin className="w-4 h-4" />
          </div>
          <h4 className="text-xs font-bold text-foreground">Prime Ikeja Location</h4>
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            Conveniently situated in Ikeja electronics hub, easily accessible from Awolowo Way and Allen Avenue.
          </p>
        </div>

        <div className="bg-muted/40 border border-border/70 rounded-2xl p-4 space-y-1.5">
          <div className="w-8 h-8 rounded-lg bg-card border border-border flex items-center justify-center text-brand-green">
            <Car className="w-4 h-4" />
          </div>
          <h4 className="text-xs font-bold text-foreground">Secure Customer Parking</h4>
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            Safe, guarded parking bays available within the plaza for all customer walk-in visits and pickups.
          </p>
        </div>

        <div className="bg-muted/40 border border-border/70 rounded-2xl p-4 space-y-1.5">
          <div className="w-8 h-8 rounded-lg bg-card border border-border flex items-center justify-center text-brand-green">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <h4 className="text-xs font-bold text-foreground">Interstate Waybill Desk</h4>
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            Dedicated team receiving, logging, and dispatching parcels from all 36 Nigerian states daily.
          </p>
        </div>
      </div>
    </div>
  );
}

