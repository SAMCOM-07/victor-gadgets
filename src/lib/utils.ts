import { cn } from "cn";

export { cn };

/**
 * Format a number as currency (NGN default or custom currency)
 */
export function formatPrice(
  amount: number,
  options: {
    currency?: string;
    locale?: string;
    showDecimals?: boolean;
  } = {}
): string {
  const { currency = "NGN", locale = "en-NG", showDecimals = false } = options;

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: showDecimals ? 2 : 0,
    maximumFractionDigits: showDecimals ? 2 : 0,
  }).format(amount);
}

/**
 * Calculate percentage discount from original price
 */
export function calculateDiscountPercentage(price: number, originalPrice?: number): number {
  if (!originalPrice || originalPrice <= price) return 0;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}

/**
 * Truncate a text string to a max length with ellipsis
 */
export function truncate(str: string, length: number): string {
  if (!str || str.length <= length) return str;
  return `${str.slice(0, length).trim()}...`;
}

/**
 * Convert string to URL-friendly slug
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w-]+/g, "") // Remove all non-word chars
    .replace(/--+/g, "-"); // Replace multiple - with single -
}
