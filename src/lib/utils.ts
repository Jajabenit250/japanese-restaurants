import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { Category } from "@prisma/client"

/**
 * Combines class names with Tailwind CSS classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Maps category enum values to human-readable text
 */
export const categoryDisplayText: Record<Category, string> = {
  [Category.SUSHI]: 'Sushi & Seafood',
  [Category.UNAGI]: 'Eel',
  [Category.TEMPURA]: 'Tempura',
  [Category.TONKATSU]: 'Tonkatsu & Kushikatsu',
  [Category.YAKITORI]: 'Yakitori & Skewers',
  [Category.SUKIYAKI]: 'Sukiyaki & Shabu-shabu',
  [Category.SOBA]: 'Soba & Udon',
  [Category.RAMEN]: 'Ramen & Tsukemen',
  [Category.YAKISOBA]: 'Yakisoba',
  [Category.OKONOMIYAKI]: 'Okonomiyaki & Takoyaki',
  [Category.DONBURI]: 'Rice Bowls',
  [Category.ODEN]: 'Oden',
  [Category.KAISEKI]: 'Kaiseki & Traditional Japanese Cuisine',
  [Category.HAMBAGU]: 'Hamburg Steak & Omurice',
  [Category.TEPPANYAKI]: 'Steak & Teppanyaki',
  [Category.CURRY]: 'Curry',
  [Category.YAKINIKU]: 'Yakiniku & Horumon',
  [Category.NABE]: 'Hot Pot',
  [Category.CAFE]: 'Cafe & Desserts',
  [Category.IZAKAYA]: 'Izakaya & Bars',
  [Category.OTHER]: 'Other Japanese Foods',
};

/**
 * Get the display text for a category
 */
export function getCategoryText(category: Category): string {
  return categoryDisplayText[category] || String(category);
}

/**
 * Format a number to a specific locale
 */
export function formatNumber(num: number, options?: Intl.NumberFormatOptions): string {
  return new Intl.NumberFormat('en-US', options).format(num);
}

/**
 * Utility to announce messages to screen readers
 */
export function announceToScreenReader(message: string): void {
  const announcer = document.getElementById('sr-announcements');
  if (announcer) {
    // Clear previous announcements
    announcer.textContent = '';
    
    // Set the new announcement after a small delay
    setTimeout(() => {
      announcer.textContent = message;
    }, 50);
  }
}

/**
 * Handle keyboard navigation for accessibility
 */
export function setupKeyboardNavigation(): void {
  const handleKeyDown = (e: KeyboardEvent) => {
    // Show focus outlines on Tab press
    if (e.key === 'Tab' && !e.altKey && !e.ctrlKey && !e.metaKey) {
      document.body.classList.add('user-is-tabbing');
    }
    
    // Hide focus outlines when using mouse
    if (e.key === 'MouseDown') {
      document.body.classList.remove('user-is-tabbing');
    }
  };
  
  window.addEventListener('keydown', handleKeyDown);
  
  // Cleanup
  return () => {
    window.removeEventListener('keydown', handleKeyDown);
  };
}
