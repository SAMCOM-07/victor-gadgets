"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { CartCustomerInfo, CartStore } from "@/features/cart/types/cart";
import { Product } from "@/features/products/types/product";
import { generateWhatsAppOrderUrl } from "../utils/whatsapp";

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      customerInfo: {},

      addItem: (product: Product, quantity = 1) => {
        if (quantity <= 0) return;

        set((state) => {
          const existingIndex = state.items.findIndex(
            (item) => item.product.id === product.id
          );

          if (existingIndex > -1) {
            const updatedItems = [...state.items];
            const newQty = updatedItems[existingIndex].quantity + quantity;
            const maxStock = product.stockCount > 0 ? product.stockCount : 99;
            updatedItems[existingIndex] = {
              ...updatedItems[existingIndex],
              quantity: Math.min(newQty, maxStock),
            };
            return { items: updatedItems };
          }

          return {
            items: [...state.items, { product, quantity: Math.max(1, quantity) }],
          };
        });
      },

      removeItem: (productId: string) => {
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== productId),
        }));
      },

      updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        set((state) => ({
          items: state.items.map((item) => {
            if (item.product.id === productId) {
              const maxStock = item.product.stockCount > 0 ? item.product.stockCount : 99;
              return {
                ...item,
                quantity: Math.min(Math.max(1, quantity), maxStock),
              };
            }
            return item;
          }),
        }));
      },

      incrementQuantity: (productId: string) => {
        const item = get().items.find((i) => i.product.id === productId);
        if (item) {
          get().updateQuantity(productId, item.quantity + 1);
        }
      },

      decrementQuantity: (productId: string) => {
        const item = get().items.find((i) => i.product.id === productId);
        if (item) {
          get().updateQuantity(productId, item.quantity - 1);
        }
      },

      clearCart: () => {
        set({ items: [] });
      },

      setCustomerInfo: (info: Partial<CartCustomerInfo>) => {
        set((state) => ({
          customerInfo: { ...state.customerInfo, ...info },
        }));
      },

      getItemCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getSubtotal: () => {
        return get().items.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0
        );
      },

      getTotal: () => {
        return get().getSubtotal();
      },

      generateWhatsAppOrderUrl: (customNotes?: string) => {
        const { items, customerInfo } = get();
        return generateWhatsAppOrderUrl(items, customerInfo, customNotes);
      },
    }),
    {
      name: "victor-gadgets-cart-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        items: state.items,
        customerInfo: state.customerInfo,
      }),
    }
  )
);

