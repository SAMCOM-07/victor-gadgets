"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, User } from "lucide-react";
import { SearchBar } from "./SearchBar";
import { CartBadge } from "./CartBadge";
import { MobileNav } from "./MobileNav";
import { ThemeToggle } from "@/components/theme";
import { siteConfig } from "@/config/site";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/DropdownMenu";

export function Header() {
  const pathname = usePathname();
  const [currentLanguage, setCurrentLanguage] = useState("EN");

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/products" },
    { label: "Services", href: "/services" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-background border-b border-border">
      <div className="container">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4 sm:gap-6">
          {/* Logo */}
          <Link
            href="/"
            className="font-extrabold text-lg sm:text-xl text-brand-green"
            aria-label="Victor Gadgets Home"
          >
            VG
          </Link>

          {/* Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm sm:text-base font-semibold">
            {navLinks.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname === item.href ||
                  (item.href !== "/" && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`relative py-1 transition-colors ${isActive
                    ? "text-brand-green font-bold"
                    : "text-muted-foreground hover:text-foreground font-medium"
                    }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-brand-green rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Search bar */}
          <div className="hidden md:flex flex-1 max-w-sm lg:max-w-md justify-center">
            <SearchBar />
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* EN dropdown using shadcn DropdownMenu */}
            <DropdownMenu>
              <DropdownMenuTrigger className="hidden sm:inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-foreground border border-border rounded-lg px-3 py-1.5 hover:border-muted-foreground focus:outline-none cursor-pointer">
                <span>{currentLanguage}</span>
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="text-xs sm:text-sm min-w-32.5">
                <DropdownMenuItem
                  onClick={() => setCurrentLanguage("EN")}
                  className="cursor-pointer"
                >
                  English (EN)
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setCurrentLanguage("FR")}
                  className="cursor-pointer"
                >
                  Français (FR)
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setCurrentLanguage("ES")}
                  className="cursor-pointer"
                >
                  Español (ES)
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Shopping Cart Badge with real Zustand store */}
            <CartBadge />

            {/* Dark / Light Theme Mode Switch */}
            <ThemeToggle />

            {/* User Profile using shadcn DropdownMenu */}
            <DropdownMenu>
              <DropdownMenuTrigger
                className="p-2 text-foreground hover:text-primary rounded-full hover:bg-muted transition-colors hidden sm:flex focus:outline-none cursor-pointer"
                aria-label="User Profile"
              >
                <User className="w-5 h-5" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52 text-xs sm:text-sm">
                <DropdownMenuItem className="cursor-pointer">
                  <Link href="/contact" className="w-full">
                    Contact & Support
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Link href="/services" className="w-full">
                    Repair Services
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <a
                    href={`https://wa.me/${siteConfig.whatsapp.phoneNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full"
                  >
                    WhatsApp Enquiries
                  </a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Navigation Toggle */}
            <MobileNav />
          </div>
        </div>

        {/* Mobile Search Bar Row */}
        <div className="pb-3 md:hidden">
          <SearchBar />
        </div>
      </div>
    </header>
  );
}
