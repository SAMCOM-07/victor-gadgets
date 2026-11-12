"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ShoppingCart,
  CheckCircle2,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/Button";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="w-full bg-background border-t border-border pt-14 pb-8 text-foreground">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-12 border-b border-border/60">
          {/* Col 1: Brand & Bio (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <Link href="/" className="font-extrabold text-lg tracking-tight text-brand-green uppercase">
              VG
            </Link>

            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm font-normal">
              Discover amazing products at Victor Gadgets, your trusted online
              shopping destination for quality items and exceptional customer
              service.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-2.5 pt-2">
              <a
                href={siteConfig.social.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-border hover:border-brand-green hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                aria-label="WhatsApp"
              >
                <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.634.07-1.785-.403-1.425-.589-2.34-2.038-2.411-2.133-.071-.094-.576-.767-.576-1.464 0-.697.362-1.04.49-1.184.129-.144.281-.18.375-.18.093 0 .187.001.269.006.086.004.202-.033.315.24.118.283.404.986.44 1.058.036.073.06.157.012.253-.048.096-.072.156-.144.24-.072.084-.152.188-.217.253-.072.072-.147.151-.063.295.084.144.374.617.803.999.553.492 1.019.645 1.163.717.144.072.228.06.312-.036.084-.096.36-419.456-.563.096-.144.192-.12.324-.072.132.048.837.395.981.467.144.072.24.108.276.168.036.06.036.35-.108.755z" />
                </svg>
              </a>

              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-border hover:border-brand-green hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-border hover:border-brand-green hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.69 5H18V0h-3.808C10.597 0 9 1.583 9 4.615V8z" />
                </svg>
              </a>

              <a
                href={siteConfig.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-border hover:border-brand-green hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Twitter / X"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-bold uppercase tracking-wider text-foreground mb-4.5">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm text-muted-foreground font-normal">
              <li>
                <Link href="/" className="hover:text-brand-green transition-colors">
                  About us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-brand-green transition-colors">
                  Contact us
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-brand-green transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-brand-green transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-brand-green transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-brand-green transition-colors">
                  Help
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Categories (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-foreground mb-4.5">
              Categories
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm text-muted-foreground font-normal">
              <li>
                <Link
                  href="/products?category=smartphones"
                  className="hover:text-brand-green transition-colors"
                >
                  Mobiles
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=laptops"
                  className="hover:text-brand-green transition-colors"
                >
                  Laptops & Computers
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=smartphones"
                  className="hover:text-brand-green transition-colors"
                >
                  Smartphones
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="hover:text-brand-green transition-colors"
                >
                  Screen & Hardware Repairs
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="hover:text-brand-green transition-colors"
                >
                  Motherboard Services
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=accessories"
                  className="hover:text-brand-green transition-colors"
                >
                  Gadget Accessories
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-foreground mb-4.5">
              Newsletter
            </h4>
            <p className="text-sm text-muted-foreground mb-3.5 leading-relaxed font-normal">
              Subscribe to our newsletter to receive updates and exclusive offers.
            </p>

            {subscribed ? (
              <div className="flex items-center gap-2 p-3 bg-success-light text-success rounded-xl text-sm font-medium border border-success/30">
                <CheckCircle2 className="w-5 h-5 text-success shrink-0" />
                Thank you for subscribing!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-2.5">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-2.5 text-sm bg-background border border-input rounded-xl focus:outline-none focus:border-brand-green"
                />
                <Button
                  type="submit"
                  className="w-full h-10.5 bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-semibold rounded-xl transition-colors cursor-pointer"
                >
                  Subscribe
                </Button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-6 text-center text-xs text-muted-foreground font-normal">
          <p>© 2026 {siteConfig.name.toUpperCase()}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
