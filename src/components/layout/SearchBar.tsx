"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export function SearchBar({ className = "" }: { className?: string }) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/products?search=${encodeURIComponent(query.trim())}`);
    } else {
      router.push("/products");
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className={`relative flex items-center w-full sm:max-w-sm ${className}`}
    >
      <div className="relative w-full">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for products...   Ctrl K"
          className="w-full h-10.5 pl-10 pr-4 text-xs sm:text-sm bg-brand-surface border border-input rounded-xl focus:outline-none focus:border-brand-green focus:bg-background transition-colors placeholder:text-muted-foreground text-foreground"
        />
      </div>
    </form>
  );
}
