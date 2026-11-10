import { Product } from "../../products/types/product";

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartCustomerInfo {
  fullName?: string;
  phone?: string;
  deliveryAddress?: string;
  notes?: string;
}

export interface CartStore {
  items: CartItem[];
  customerInfo: CartCustomerInfo;

  // Actions
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  incrementQuantity: (productId: string) => void;
  decrementQuantity: (productId: string) => void;
  clearCart: () => void;
  setCustomerInfo: (info: Partial<CartCustomerInfo>) => void;

  // Selectors / Computations
  getItemCount: () => number;
  getSubtotal: () => number;
  getTotal: () => number;

  // WhatsApp generator
  generateWhatsAppOrderUrl: (customNotes?: string) => string;
}

