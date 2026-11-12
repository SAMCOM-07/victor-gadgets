"use client";

import { useState } from "react";
import { MessageCircle, Send, Laptop, Smartphone, AlertCircle, MapPin, CheckCircle } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/Button";

export function InstantDiagnosticForm() {
  const [deviceType, setDeviceType] = useState("Windows Laptop");
  const [deviceModel, setDeviceModel] = useState("");
  const [issueType, setIssueType] = useState("Won't Turn On / No Power");
  const [locationType, setLocationType] = useState("Lagos Walk-in (Ikeja Hub)");
  const [description, setDescription] = useState("");

  const handleSendWhatsAppEnquiry = (e: React.FormEvent) => {
    e.preventDefault();

    const phoneNumber = siteConfig.whatsapp.phoneNumber.replace(/[^0-9]/g, "");
    let message = `*INSTANT DIAGNOSTIC & REPAIR REQUEST*\n`;
    message += `*Victor Gadgets Ikeja Lab*\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━\n\n`;
    message += `Hello Victor Gadgets, I would like to book a diagnostic for my device:\n\n`;
    message += `• *Device Type:* ${deviceType}\n`;
    message += `• *Device Model:* ${deviceModel.trim() || "Not specified"}\n`;
    message += `• *Primary Issue:* ${issueType}\n`;
    message += `• *Dispatch/Location:* ${locationType}\n`;
    if (description.trim()) {
      message += `• *Issue Details:* ${description.trim()}\n`;
    }
    message += `\n━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `Please provide me with an estimated diagnostic assessment and drop-off or waybill instructions. Thank you!`;

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="bg-card border border-border rounded-3xl p-6 sm:p-10 shadow-xs">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-green-light border border-brand-green/20 text-brand-green text-xs font-bold">
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Fast Diagnostic Assessment</span>
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-foreground tracking-tight">
            Need a Quick Quote or Diagnostic?
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-lg mx-auto font-normal">
            Select your device type and issue below to start a direct consultation with our lead technician on WhatsApp.
          </p>
        </div>

        <form onSubmit={handleSendWhatsAppEnquiry} className="space-y-4 pt-2">
          {/* Row 1: Device Type & Model */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-foreground uppercase tracking-wider block mb-1.5">
                Device Category *
              </label>
              <select
                value={deviceType}
                onChange={(e) => setDeviceType(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-input text-xs sm:text-sm text-foreground focus:outline-none focus:border-brand-green cursor-pointer"
              >
                <option value="Windows Laptop (HP, Dell, Lenovo, ASUS)">Windows Laptop (HP, Dell, Lenovo, ASUS, etc.)</option>
                <option value="Apple MacBook (Pro / Air / Retina / M-Series)">Apple MacBook (Pro / Air / M-Series)</option>
                <option value="Apple iPhone">Apple iPhone</option>
                <option value="iPad / Tablet">iPad / Tablet</option>
                <option value="Desktop PC / All-in-One">Desktop PC / All-in-One</option>
                <option value="Other Electronics">Other Electronics</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-foreground uppercase tracking-wider block mb-1.5">
                Device Model *
              </label>
              <input
                type="text"
                required
                value={deviceModel}
                onChange={(e) => setDeviceModel(e.target.value)}
                placeholder="e.g. MacBook Pro M1 2020 or Dell XPS 15"
                className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-input text-xs sm:text-sm text-foreground focus:outline-none focus:border-brand-green"
              />
            </div>
          </div>

          {/* Row 2: Fault Type & Location Preference */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-foreground uppercase tracking-wider block mb-1.5">
                Primary Issue *
              </label>
              <select
                value={issueType}
                onChange={(e) => setIssueType(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-input text-xs sm:text-sm text-foreground focus:outline-none focus:border-brand-green cursor-pointer"
              >
                <option value="Won't Turn On / No Power">Won't Turn On / Dead Motherboard</option>
                <option value="Cracked Screen / Display Glitch">Cracked Screen / Broken Display</option>
                <option value="Water or Liquid Spill">Water or Liquid Spill Emergency</option>
                <option value="Battery Draining Fast / Won't Charge">Battery Drain / Charging Port Fault</option>
                <option value="Slow Speed / SSD & RAM Upgrade">Slow Performance / SSD & RAM Upgrade</option>
                <option value="Overheating & Fan Noise">Overheating & Loud Fan Noise</option>
                <option value="Keyboard / Trackpad Problem">Keyboard or Trackpad Problem</option>
                <option value="OS Bootloop / Software / BIOS Issue">OS Bootloop / BIOS / Data Recovery</option>
                <option value="Other Diagnostic Required">Other Diagnostic Required</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-foreground uppercase tracking-wider block mb-1.5">
                Drop-off or Waybill *
              </label>
              <select
                value={locationType}
                onChange={(e) => setLocationType(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-input text-xs sm:text-sm text-foreground focus:outline-none focus:border-brand-green cursor-pointer"
              >
                <option value="Lagos Walk-in (Ikeja Hub)">Lagos Walk-in (Ikeja Electronics Plaza)</option>
                <option value="Interstate Waybill (Outside Lagos)">Interstate Waybill (From other 36 States)</option>
                <option value="Lagos Dispatch Rider Pickup">Lagos Dispatch Rider Pickup</option>
              </select>
            </div>
          </div>

          {/* Row 3: Additional Notes */}
          <div>
            <label className="text-xs font-bold text-foreground uppercase tracking-wider block mb-1.5">
              Additional Details (Optional)
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tell us what happened (e.g. spilled juice yesterday, plugged in charger and sparked, etc.)"
              className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-input text-xs sm:text-sm text-foreground focus:outline-none focus:border-brand-green resize-none"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full h-12 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer active:scale-98"
          >
            <MessageCircle className="w-5 h-5 fill-white" />
            <span>Send Diagnostic Request via WhatsApp</span>
          </Button>

          <p className="text-[11px] text-center text-muted-foreground pt-1 font-normal">
            ⚡ Direct connection to our lead technician. No spam, immediate response during business hours.
          </p>
        </form>
      </div>
    </div>
  );
}

