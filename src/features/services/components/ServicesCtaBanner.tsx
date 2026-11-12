"use client";

import Link from "next/link";
import { MessageCircle, ShoppingBag, ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/Button";

export function ServicesCtaBanner() {
  const whatsappUrl = `https://wa.me/${siteConfig.whatsapp.phoneNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
    `Hello Victor Gadgets, I would like to consult with a technician about a faulty device.`
  )}`;

  return (
    <div className="rounded-3xl bg-brand-sand border border-brand-sand-border p-8 sm:p-12 text-center shadow-xs">
      <div className="max-w-2xl mx-auto space-y-4">
        {/* Icon */}
        <div className="w-12 h-12 rounded-2xl bg-brand-green/10 text-brand-green flex items-center justify-center mx-auto">
          <MessageCircle className="w-6 h-6 fill-brand-green/20" />
        </div>

        {/* Title */}
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-foreground tracking-tight">
          Got a Faulty Device or Need Urgent Diagnostic?
        </h2>

        {/* Subtitle */}
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-normal max-w-lg mx-auto">
          Chat directly with our Ikeja technician lab for free troubleshooting advice,
          instant repair estimates, or drop-off and waybill coordination.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto h-11 sm:h-12 px-6 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs sm:text-sm font-bold inline-flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer active:scale-98"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Chat With Lead Tech on WhatsApp</span>
          </a>

          <Link
            href="/products"
            className="w-full sm:w-auto h-11 sm:h-12 px-6 rounded-full bg-card hover:bg-muted border border-border text-foreground text-xs sm:text-sm font-semibold inline-flex items-center justify-center gap-2 shadow-2xs transition-colors"
          >
            <ShoppingBag className="w-4 h-4 text-brand-green" />
            <span>Browse Gadgets Store</span>
            <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

