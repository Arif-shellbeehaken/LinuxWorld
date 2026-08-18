import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility to merge Tailwind classes safely.
 * Industry standard pattern used by shadcn/ui.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format points with Bangla numerals if needed (simple version).
 */
export function formatPoints(points: number): string {
  return points.toLocaleString("bn-BD");
}

/**
 * Calculate level from total points.
 */
export function getLevel(points: number): { level: number; title: string; next: number } {
  if (points < 150) return { level: 1, title: "নবীন", next: 150 };
  if (points < 400) return { level: 2, title: "শিক্ষানবিশ", next: 400 };
  if (points < 800) return { level: 3, title: "মধ্যম", next: 800 };
  if (points < 1300) return { level: 4, title: "দক্ষ", next: 1300 };
  if (points < 2000) return { level: 5, title: "বিশেষজ্ঞ", next: 2000 };
  return { level: 6, title: "হিরো", next: Infinity };
}
