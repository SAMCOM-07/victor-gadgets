"use client";

import { useState } from "react";
import {
  MessageCircle,
  ShieldCheck,
  Truck,
  ArrowRight,
  MapPin,
  User,
  Phone,
  FileText,
} from "lucide-react";
import { useCartStore } from "@/features/cart/store/cart-store";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

export function OrderSummary() {
  const items = useCartStore((state) => state.items);
  const customerInfo = useCartStore((state) => state.customerInfo);
  const setCustomerInfo = useCartStore((state) => state.setCustomerInfo);
  const generateWhatsAppOrderUrl = useCartStore(
    (state) => state.generateWhatsAppOrderUrl
  );

  const [notes, setNotes] = useState(customerInfo.notes || "");
  const [isAddressExpanded, setIsAddressExpanded] = useState(false);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  // Compute total savings if items have originalPrice discounts
  const totalSavings = items.reduce((sum, item) => {
    if (
      item.product.originalPrice &&
      item.product.originalPrice > item.product.price
    ) {
      return (
        sum +
        (item.product.originalPrice - item.product.price) * item.quantity
      );
    }
    return sum;
  }, 0);

  const handleWhatsAppOrder = () => {
    const url = generateWhatsAppOrderUrl(notes);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="space-y-6">
      {/* 1. Optional Delivery Details Card */}
      <div className="bg-card border border-border rounded-2xl p-5 shadow-2xs">
        <div className="flex items-center justify-between pb-3 border-b border-border/60">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-brand-green" />
            <h3 className="text-sm font-bold text-card-foreground">
              Delivery Information
            </h3>
          </div>
          <button
            type="button"
            onClick={() => setIsAddressExpanded(!isAddressExpanded)}
            className="text-xs font-semibold text-brand-green hover:underline cursor-pointer"
          >
            {isAddressExpanded ? "Hide Details" : "Add Details"}
          </button>
        </div>

        {isAddressExpanded ? (
          <div className="mt-4 space-y-3">
            <div>
              <label className="text-[11px] font-semibold text-muted-foreground flex items-center gap-1.5 mb-1">
                <User className="w-3.5 h-3.5" /> Full Name
              </label>
              <input
                type="text"
                placeholder="e.g. Samuel Adebayo"
                value={customerInfo.fullName || ""}
                onChange={(e) => setCustomerInfo({ fullName: e.target.value })}
                className="w-full h-9 rounded-xl border border-input bg-background px-3 text-xs focus:outline-none focus:border-brand-green"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-muted-foreground flex items-center gap-1.5 mb-1">
                <Phone className="w-3.5 h-3.5" /> Phone Number
              </label>
              <input
                type="tel"
                placeholder="e.g. +234 801 234 5678"
                value={customerInfo.phone || ""}
                onChange={(e) => setCustomerInfo({ phone: e.target.value })}
                className="w-full h-9 rounded-xl border border-input bg-background px-3 text-xs focus:outline-none focus:border-brand-green"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-muted-foreground flex items-center gap-1.5 mb-1">
                <MapPin className="w-3.5 h-3.5" /> Delivery Address
              </label>
              <textarea
                placeholder="Street address, City, State"
                rows={2}
                value={customerInfo.deliveryAddress || ""}
                onChange={(e) =>
                  setCustomerInfo({ deliveryAddress: e.target.value })
                }
                className="w-full rounded-xl border border-input bg-background p-2.5 text-xs focus:outline-none focus:border-brand-green resize-none"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-muted-foreground flex items-center gap-1.5 mb-1">
                <FileText className="w-3.5 h-3.5" /> Order Notes (Optional)
              </label>
              <input
                type="text"
                placeholder="Special instructions or questions"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full h-9 rounded-xl border border-input bg-background px-3 text-xs focus:outline-none focus:border-brand-green"
              />
            </div>
          </div>
        ) : (
          <p className="text-xs text-muted-foreground mt-3 leading-relaxed font-normal">
            {customerInfo.fullName || customerInfo.deliveryAddress ? (
              <span className="font-medium text-foreground">
                Shipping to: {customerInfo.fullName || "Customer"} (
                {customerInfo.deliveryAddress || "Address provided"})
              </span>
            ) : (
              "Add your name & address to include them in your WhatsApp enquiry automatically."
            )}
          </p>
        )}
      </div>

      {/* 2. Order Summary Card */}
      <div className="bg-card border border-border rounded-2xl p-5 sm:p-6 shadow-2xs space-y-5">
        <h3 className="text-base font-bold text-card-foreground pb-3 border-b border-border/60">
          Order Summary
        </h3>

        {/* Pricing Rows */}
        <div className="space-y-3 text-xs sm:text-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">
              Subtotal ({itemCount} {itemCount === 1 ? "item" : "items"})
            </span>
            <span className="font-semibold text-card-foreground">
              {formatPrice(subtotal + totalSavings)}
            </span>
          </div>

          {totalSavings > 0 && (
            <div className="flex items-center justify-between text-success">
              <span>Promotional Discount</span>
              <span className="font-bold">-{formatPrice(totalSavings)}</span>
            </div>
          )}

          <div className="flex items-center justify-between">
            <span className="text-muted-foreground flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-brand-green" />
              Delivery
            </span>
            <span className="font-semibold text-brand-green bg-brand-green-light px-2.5 py-0.5 rounded-full text-xs">
              Free Express
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Estimated Tax</span>
            <span className="font-semibold text-card-foreground">$0.00</span>
          </div>

          <div className="pt-3 border-t border-border flex items-baseline justify-between">
            <div>
              <span className="text-sm sm:text-base font-bold text-card-foreground">
                Total
              </span>
              <p className="text-[11px] text-muted-foreground font-normal">
                Includes all discounts
              </p>
            </div>
            <span className="text-xl sm:text-2xl font-black text-brand-green">
              {formatPrice(subtotal)}
            </span>
          </div>
        </div>

        {/* Primary CTA: WhatsApp Order Enquiry */}
        <div className="pt-2">
          <Button
            onClick={handleWhatsAppOrder}
            disabled={items.length === 0}
            className="w-full h-12 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-sm flex items-center justify-center gap-2.5 shadow-sm transition-all cursor-pointer active:scale-98"
          >
            <MessageCircle className="w-5 h-5 fill-white" />
            <span>Order via WhatsApp</span>
            <ArrowRight className="w-4 h-4 ml-0.5" />
          </Button>

          <p className="text-[11px] text-muted-foreground text-center mt-2.5 leading-snug">
            Tap to open WhatsApp with your itemized enquiry ready to send.
          </p>
        </div>

        {/* Trust & Guarantee Box */}
        <div className="p-3.5 rounded-xl bg-brand-sand border border-brand-sand-border flex items-start gap-2.5 text-xs text-muted-foreground">
          <ShieldCheck className="w-4 h-4 text-brand-green shrink-0 mt-0.5" />
          <p className="leading-snug">
            <strong className="text-foreground">Certified Protection:</strong>{" "}
            All laptops and iPhones are inspected and backed by warranty. Orders
            are confirmed directly via WhatsApp.
          </p>
        </div>
      </div>
    </div>
  );
}

