"use client";

import { useState } from "react";
import { MessageCircle, Send, CheckCircle2 } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/Button";

export function ContactForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("Product Enquiry");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim() || !message.trim()) {
      return;
    }

    const phoneNumber = siteConfig.whatsapp.phoneNumber.replace(/[^0-9]/g, "");
    let text = `*NEW CONTACT MESSAGE - ${siteConfig.name.toUpperCase()}*\n`;
    text += `━━━━━━━━━━━━━━━━━━━━━\n\n`;
    text += `Hello Victor Gadgets, I would like to get in touch:\n\n`;
    text += `• *Full Name:* ${fullName.trim()}\n`;
    text += `• *Email:* ${email.trim() || "Not provided"}\n`;
    text += `• *Phone:* ${phone.trim() || "Not provided"}\n`;
    text += `• *Subject:* ${subject}\n\n`;
    text += `*Message:*\n${message.trim()}\n\n`;
    text += `━━━━━━━━━━━━━━━━━━━━━\n`;
    text += `Looking forward to your response. Thank you!`;

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setIsSubmitted(true);
  };

  const handleStandardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !message.trim()) {
      return;
    }
    setIsSubmitted(true);
  };

  return (
    <div className="bg-card border border-border rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xs space-y-6">
      <div className="space-y-1">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
          Send us a Message
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground font-normal">
          Fill out the form below and we will get back to you promptly, or send directly to our WhatsApp.
        </p>
      </div>

      {isSubmitted ? (
        <div className="bg-success-light border border-success/30 rounded-2xl p-6 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-success text-white flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-success">Message Received!</h3>
          <p className="text-xs sm:text-sm text-foreground/80 max-w-md mx-auto leading-relaxed">
            Thank you for reaching out, <strong>{fullName}</strong>. A representative from our Ikeja store
            will reply to you shortly.
          </p>
          <button
            type="button"
            onClick={() => {
              setIsSubmitted(false);
              setMessage("");
            }}
            className="text-xs font-bold text-brand-green hover:underline cursor-pointer pt-2"
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleWhatsAppSubmit} className="space-y-4">
          {/* Row 1: Name & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-foreground uppercase tracking-wider block mb-1.5">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full h-11 px-3.5 rounded-xl bg-background border border-input text-xs sm:text-sm text-foreground focus:outline-none focus:border-brand-green transition-colors"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-foreground uppercase tracking-wider block mb-1.5">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                className="w-full h-11 px-3.5 rounded-xl bg-background border border-input text-xs sm:text-sm text-foreground focus:outline-none focus:border-brand-green transition-colors"
              />
            </div>
          </div>

          {/* Row 2: Phone & Subject */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-foreground uppercase tracking-wider block mb-1.5">
                Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. +234 801 234 5678"
                className="w-full h-11 px-3.5 rounded-xl bg-background border border-input text-xs sm:text-sm text-foreground focus:outline-none focus:border-brand-green transition-colors"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-foreground uppercase tracking-wider block mb-1.5">
                Subject *
              </label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full h-11 px-3.5 rounded-xl bg-background border border-input text-xs sm:text-sm text-foreground focus:outline-none focus:border-brand-green transition-colors cursor-pointer"
              >
                <option value="Product Enquiry">Product Enquiry (Laptops / iPhones)</option>
                <option value="Laptop Repair & Diagnostics">Laptop Repair & Diagnostics</option>
                <option value="Order & Waybill Status">Order & Waybill Status</option>
                <option value="Wholesale & Bulk Purchases">Wholesale & Bulk Purchases</option>
                <option value="General Question">General Question</option>
              </select>
            </div>
          </div>

          {/* Row 3: Message Textarea */}
          <div>
            <label className="text-xs font-bold text-foreground uppercase tracking-wider block mb-1.5">
              Message *
            </label>
            <textarea
              required
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Please provide detailed information about your inquiry..."
              className="w-full p-3.5 rounded-xl bg-background border border-input text-xs sm:text-sm text-foreground focus:outline-none focus:border-brand-green transition-colors resize-none"
            />
          </div>

          {/* Row 4: Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <Button
              type="submit"
              className="w-full sm:flex-1 h-11 sm:h-12 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer active:scale-98"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Send via WhatsApp Direct</span>
            </Button>

            <Button
              type="button"
              onClick={handleStandardSubmit}
              className="w-full sm:w-auto h-11 sm:h-12 px-6 rounded-full bg-card hover:bg-muted border border-border text-foreground font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-2xs transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4 text-brand-green" />
              <span>Send Message</span>
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}

