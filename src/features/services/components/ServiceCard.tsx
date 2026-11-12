"use client";

import Image from "next/image";
import { Clock, ShieldCheck, MessageCircle, CheckCircle2, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { RepairService } from "@/features/services/types/service";
import { siteConfig } from "@/config/site";
import { formatPrice } from "@/lib/utils";

interface ServiceCardProps {
  service: RepairService;
  index: number;
  onSelectBooking?: (service: RepairService) => void;
}

export function ServiceCard({ service, index, onSelectBooking }: ServiceCardProps) {
  const handleWhatsAppBooking = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const phoneNumber = siteConfig.whatsapp.phoneNumber.replace(/[^0-9]/g, "");
    let message = `*REPAIR SERVICE ENQUIRY - ${siteConfig.name.toUpperCase()}*\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━\n\n`;
    message += `Hello Victor Gadgets, I would like to book or enquire about a repair service:\n\n`;
    message += `• *Service:* ${service.title}\n`;
    message += `• *Estimated Time:* ${service.estimatedTime}\n`;
    message += `• *Warranty:* ${service.warranty}\n`;
    message += `• *Starting Price:* ${formatPrice(service.startingPrice)}\n\n`;
    message += `• *My Device Brand/Model:* (Please enter device model here)\n`;
    message += `• *Fault Description:* (Briefly describe what happened)\n\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `Please confirm diagnostic availability at Ikeja hub or interstate waybill instructions. Thank you!`;

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{
        duration: 0.45,
        delay: (index % 3) * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="bg-card border border-border rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
    >
      <div>
        {/* Top Image Frame */}
        <div className="relative w-full h-48 sm:h-54 overflow-hidden bg-muted">
          <Image
            src={service.image}
            alt={service.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {/* Category Pill Tag */}
          <div className="absolute top-3 left-3 z-10">
            <span className="bg-brand-sand-pill/95 backdrop-blur-xs text-brand-orange-dark text-[11px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider shadow-2xs">
              {service.categoryLabel || service.category}
            </span>
          </div>

          {/* Warranty Badge */}
          <div className="absolute bottom-3 right-3 z-10">
            <span className="bg-card/90 backdrop-blur-xs text-foreground text-[11px] font-bold px-2.5 py-1 rounded-md border border-border shadow-2xs flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-green" />
              <span>{service.warranty}</span>
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 space-y-3.5">
          {/* Metadata Row: Estimated Time */}
          <div className="flex items-center gap-3 text-xs text-muted-foreground font-medium">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-muted-foreground" />
              <span>{service.estimatedTime}</span>
            </span>
            <span>•</span>
            <span className="text-brand-green font-semibold">Ikeja Lab Certified</span>
          </div>

          {/* Service Title */}
          <h3 className="text-base sm:text-lg font-bold text-foreground group-hover:text-brand-green line-clamp-2 leading-snug transition-colors">
            {service.title}
          </h3>

          {/* Short Description */}
          <p className="text-xs sm:text-sm text-muted-foreground line-clamp-3 leading-relaxed font-normal">
            {service.description}
          </p>

          {/* Key Checklist Features */}
          <div className="space-y-1.5 pt-1">
            {service.features.slice(0, 3).map((feat, fIdx) => (
              <div key={fIdx} className="flex items-start gap-2 text-xs text-foreground/90 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-green shrink-0 mt-0.5" />
                <span className="line-clamp-1">{feat}</span>
              </div>
            ))}
          </div>

          {/* Supported Brands Preview */}
          <div className="pt-2 border-t border-border/60 flex items-center gap-1.5 flex-wrap">
            <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">
              Models:
            </span>
            {service.supportedBrands.slice(0, 3).map((brand, bIdx) => (
              <span
                key={bIdx}
                className="text-[10px] font-semibold text-muted-foreground bg-muted/60 px-2 py-0.5 rounded"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Pricing & WhatsApp Booking Action */}
      <div className="p-5 sm:p-6 pt-0 border-t border-border/40 mt-4 space-y-3">
        <div className="flex items-baseline justify-between pt-3">
          <div>
            <span className="text-[11px] text-muted-foreground uppercase font-semibold block">
              Estimated From
            </span>
            <span className="text-lg font-extrabold text-foreground">
              {formatPrice(service.startingPrice)}
            </span>
          </div>
          <span className="text-[11px] text-muted-foreground italic">
            *Final quote after diagnostic
          </span>
        </div>

        {/* WhatsApp Button */}
        <button
          type="button"
          onClick={handleWhatsAppBooking}
          className="w-full h-10.5 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer active:scale-98"
        >
          <MessageCircle className="w-4 h-4 fill-white" />
          <span>Book Repair on WhatsApp</span>
          <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
        </button>
      </div>
    </motion.div>
  );
}

