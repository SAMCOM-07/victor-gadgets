export const siteConfig = {
  name: "Victor Gadgets",
  shortName: "Victor Gadgets",
  description:
    "Your trusted destination for premium laptops, iPhones, accessories, and expert laptop repair services.",
  tagline: "Quality Gadgets & Expert Repairs Delivered With Confidence",
  url: "https://victorgadgets.com",
  
  // WhatsApp Configuration for Direct Orders & Enquiries
  // Using international format without '+' or special characters for wa.me links
  whatsapp: {
    phoneNumber: "2348000000000", // Clearly identified placeholder per development rules
    displayNumber: "+234 800 000 0000",
    defaultMessage: "Hello Victor Gadgets! I am interested in placing an order or making an enquiry.",
  },

  // Contact Information
  contact: {
    phone: "+234 800 000 0000",
    phoneSecondary: "+234 811 111 1111",
    email: "contact@victorgadgets.com",
    supportEmail: "support@victorgadgets.com",
    address: {
      street: "Suite 14, Gadget Plaza, Electronics Hub",
      city: "Ikeja",
      state: "Lagos",
      country: "Nigeria",
      full: "Suite 14, Gadget Plaza, Electronics Hub, Ikeja, Lagos, Nigeria",
    },
    workingHours: {
      weekdays: "Monday - Friday: 9:00 AM - 6:00 PM",
      saturday: "Saturday: 10:00 AM - 5:00 PM",
      sunday: "Sunday: Closed",
    },
  },

  // Navigation Links
  navItems: [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/products" },
    { label: "Services & Repairs", href: "/services" },
    { label: "Contact", href: "/contact" },
  ],

  // Header Categories
  categories: [
    { label: "All Products", value: "all", href: "/products" },
    { label: "Laptops", value: "laptops", href: "/products?category=laptops" },
    { label: "Smartphones", value: "smartphones", href: "/products?category=smartphones" },
    { label: "Accessories", value: "accessories", href: "/products?category=accessories" },
    { label: "Repair Services", value: "repairs", href: "/services" },
  ],

  // Social Links
  social: {
    instagram: "https://instagram.com/victorgadgets",
    facebook: "https://facebook.com/victorgadgets",
    twitter: "https://x.com/victorgadgets",
    whatsapp: "https://wa.me/2348000000000",
  },

  // E-commerce display defaults
  currency: {
    code: "USD",
    symbol: "$",
  },
  
  shipping: {
    freeThreshold: 100,
    standardFee: 0,
    deliveryNote: "Nationwide Delivery Available Across Nigeria",
  },
};

export type SiteConfig = typeof siteConfig;

