import Link from "next/link";
import { Category } from "@prisma/client";
import { getCategoryText } from "@/lib/utils";

/**
 * Footer component
 */
export function Footer() {
  const popularCategories = [
    Category.SUSHI,
    Category.RAMEN,
    Category.TEMPURA,
    Category.YAKITORI,
  ];
  
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h2 className="text-xl font-bold mb-4">JapaneseEats</h2>
            <p className="text-gray-400 mb-4">
              Discover the finest Japanese cuisine across Japan. Find your next
              favorite restaurant with ease.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/restaurants"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Restaurants
                </Link>
              </li>
              <li>
                <Link
                  href="/categories"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  href="/favorites"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Favorites
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Popular Categories</h3>
            <ul className="space-y-2">
              {popularCategories.map((category) => (
                <li key={category}>
                  <Link
                    href={`/restaurants?category=${category}`}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {getCategoryText(category)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Popular Cities</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/restaurants?city=tokyo"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Tokyo
                </Link>
              </li>
              <li>
                <Link
                  href="/restaurants?city=osaka"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Osaka
                </Link>
              </li>
              <li>
                <Link
                  href="/restaurants?city=kyoto"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Kyoto
                </Link>
              </li>
              <li>
                <Link
                  href="/restaurants?city=fukuoka"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Fukuoka
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {currentYear} JapaneseEats. All rights reserved.
          </p>
          
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link
              href="/privacy"
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
