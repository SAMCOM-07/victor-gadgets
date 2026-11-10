import { siteConfig } from "@/config/site";
import { CartCustomerInfo, CartItem } from "@/features/cart/types/cart";
import { formatPrice } from "@/lib/utils";

/**
 * Generates a clean, professionally formatted WhatsApp click-to-chat order URL.
 */
export function generateWhatsAppOrderUrl(
  items: CartItem[],
  customerInfo?: CartCustomerInfo,
  additionalNotes?: string
): string {
  const phoneNumber = siteConfig.whatsapp.phoneNumber.replace(/[^0-9]/g, "");

  if (items.length === 0) {
    const emptyMessage = encodeURIComponent(
      `Hello ${siteConfig.name}, I would like to make an enquiry about your products and services.`
    );
    return `https://wa.me/${phoneNumber}?text=${emptyMessage}`;
  }

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  let message = `*NEW ORDER ENQUIRY - ${siteConfig.name.toUpperCase()}*\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━\n\n`;

  message += `*Selected Products:*\n`;
  items.forEach((item, index) => {
    const itemTotal = item.product.price * item.quantity;
    message += `${index + 1}. *${item.product.name}*\n`;
    message += `   • Qty: ${item.quantity} × ${formatPrice(item.product.price)}\n`;
    message += `   • Item Total: ${formatPrice(itemTotal)}\n`;
    if (item.product.condition) {
      message += `   • Condition: ${item.product.condition}\n`;
    }
  });

  message += `\n━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `*Estimated Total: ${formatPrice(subtotal)}*\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━\n\n`;

  if (customerInfo?.fullName || customerInfo?.deliveryAddress) {
    message += `*Customer Details:*\n`;
    if (customerInfo.fullName) {
      message += `• Name: ${customerInfo.fullName}\n`;
    }
    if (customerInfo.phone) {
      message += `• Phone: ${customerInfo.phone}\n`;
    }
    if (customerInfo.deliveryAddress) {
      message += `• Delivery Address: ${customerInfo.deliveryAddress}\n`;
    }
    message += `\n`;
  }

  const notes = additionalNotes || customerInfo?.notes;
  if (notes) {
    message += `*Additional Notes:*\n${notes}\n\n`;
  }

  message += `Please confirm product availability and provide delivery details. Thank you!`;

  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
}

