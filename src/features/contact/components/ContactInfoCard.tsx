"use client";

import { MapPin, Phone, Mail, Clock, MessageCircle, ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/site";

export function ContactInfoCard() {
  const contactDetails = [
    {
      icon: MapPin,
      title: "Visit Our Store",
      primary: siteConfig.contact.address.full,
      secondary: "In-store pickup & diagnostic walk-ins welcome",
    },
    {
      icon: Phone,
      title: "Call Us",
      primary: siteConfig.whatsapp.displayNumber || siteConfig.contact.phone,
      secondary: siteConfig.contact.phoneSecondary,
      href: `tel:${siteConfig.whatsapp.phoneNumber}`,
    },
    {
      icon: Mail,
      title: "Email Support",
      primary: siteConfig.contact.email,
      secondary: "We reply within 24 business hours",
      href: `mailto:${siteConfig.contact.email}`,
    },
    {
      icon: Clock,
      title: "Business Hours",
      primary: siteConfig.contact.workingHours.weekdays,
      secondary: `${siteConfig.contact.workingHours.saturday} • ${siteConfig.contact.workingHours.sunday}`,
    },
  ];

  return (
    <div className="bg-card border border-border rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xs space-y-7">
      <h2 className="text-lg sm:text-xl font-bold text-foreground tracking-tight">
        Contact Information
      </h2>

      <div className="space-y-6">
        {contactDetails.map((item, index) => {
          const Icon = item.icon;
          const ContentWrapper = item.href ? "a" : "div";

          return (
            <div key={index} className="flex items-start gap-4 group">
              <div className="w-10 h-10 rounded-xl bg-muted/60 border border-border/80 text-muted-foreground group-hover:text-brand-green group-hover:border-brand-green/30 flex items-center justify-center shrink-0 transition-colors mt-0.5">
                <Icon className="w-5 h-5" />
              </div>

              <div className="space-y-0.5 min-w-0">
                <h3 className="text-xs sm:text-sm font-bold text-foreground">
                  {item.title}
                </h3>
                {item.href ? (
                  <a
                    href={item.href}
                    className="text-xs sm:text-sm text-foreground/90 hover:text-brand-green transition-colors block font-medium"
                  >
                    {item.primary}
                  </a>
                ) : (
                  <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed font-normal">
                    {item.primary}
                  </p>
                )}
                {item.secondary && (
                  <p className="text-[11px] sm:text-xs text-muted-foreground leading-normal font-normal">
                    {item.secondary}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Response WhatsApp Box matching the design */}
      <div className="bg-brand-sand border border-brand-sand-border rounded-2xl p-4 sm:p-5 space-y-3">
        <div className="flex items-center gap-2">
          <MessageCircle className="w-4 h-4 text-brand-green shrink-0" />
          <h4 className="text-xs sm:text-sm font-bold text-foreground">
            Quick Response
          </h4>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed font-normal">
          We aim to respond to all website inquiries within 24 hours. For real-time stock confirmation
          and instant repair bookings, chat with us on WhatsApp.
        </p>

        <a
          href={`https://wa.me/${siteConfig.whatsapp.phoneNumber}?text=${encodeURIComponent(
            "Hello Victor Gadgets, I would like to make an enquiry about your products and services."
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs font-bold text-brand-green hover:underline cursor-pointer pt-1"
        >
          <span>Chat on WhatsApp Direct</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}

