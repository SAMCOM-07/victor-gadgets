"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import { siteConfig } from "@/config/site";
import { ThemeToggle } from "@/components/theme";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggle = () => setIsOpen((prev) => !prev);
  const close = () => setIsOpen(false);

  return (
    <div className="lg:hidden">
      <button
        onClick={toggle}
        className="p-2 text-foreground hover:text-primary rounded-lg transition-colors cursor-pointer"
        aria-label="Toggle navigation menu"
        aria-expanded={isOpen}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {isOpen && (
        <div className="fixed inset-0 top-16.25 z-50 bg-black/40 backdrop-blur-sm animate-in fade-in-20">
          <div className="bg-background border-b border-border px-6 py-6 shadow-xl flex flex-col gap-4">
            <nav className="flex flex-col gap-2">
              {siteConfig.navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={close}
                    className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-brand-green-light text-brand-green font-semibold"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center justify-between py-1.5 px-3 rounded-xl bg-muted/60 border border-border/60">
              <span className="text-xs font-semibold text-muted-foreground">Appearance</span>
              <ThemeToggle showLabel />
            </div>

            <div className="pt-3 border-t border-border/60 flex flex-col gap-3">
              <a
                href={`https://wa.me/${siteConfig.whatsapp.phoneNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-full bg-brand-green hover:bg-brand-green-hover text-white text-xs font-semibold shadow-xs transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Chat on WhatsApp
              </a>

              <a
                href={`tel:${siteConfig.contact.phone.replace(/[^0-9+]/g, "")}`}
                className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-full bg-muted hover:bg-muted/80 text-foreground text-xs font-medium transition-colors"
              >
                <Phone className="w-4 h-4" />
                {siteConfig.whatsapp.displayNumber || siteConfig.contact.phone}
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
