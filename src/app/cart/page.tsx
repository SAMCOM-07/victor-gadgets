import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { CartView } from "@/features/cart/components";

export const metadata: Metadata = {
  title: `Shopping Cart | ${siteConfig.name}`,
  description:
    "Review your shopping cart and submit your direct order enquiry to Victor Gadgets via WhatsApp with fast delivery and warranty support.",
};

export default function CartPage() {
  return <CartView />;
}
