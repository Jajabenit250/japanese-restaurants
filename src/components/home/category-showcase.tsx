"use client";

import Link from "next/link";
import { Category } from "@prisma/client";
import { getCategoryText } from "@/lib/utils";

// Popular categories with images
const POPULAR_CATEGORIES = [
  {
    category: Category.SUSHI,
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=1887&auto=format&fit=crop"
  },
  {
    category: Category.RAMEN,
    image: "https://images.unsplash.com/photo-1557872943-16a5ac26437e?q=80&w=1887&auto=format&fit=crop"
  },
  {
    category: Category.TEMPURA,
    image: "https://images.unsplash.com/photo-1628913510352-ec4e06804483?q=80&w=1887&auto=format&fit=crop"
  },
  {
    category: Category.YAKITORI,
    image: "https://images.unsplash.com/photo-1535666669445-e8c15cd2e7a9?q=80&w=1887&auto=format&fit=crop"
  },
  {
    category: Category.NABE,
    image: "https://images.unsplash.com/photo-1623341214825-9f4f963727da?q=80&w=1887&auto=format&fit=crop"
  },
  {
    category: Category.SOBA,
    image: "https://images.unsplash.com/photo-1617196034183-421b4917c92d?q=80&w=1887&auto=format&fit=crop"
  },
];

/**
 * Category showcase section for homepage
 */
export function CategoryShowcase() {
  return (
    <section id="categories">
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight mb-2">
          Browse by Category
        </h2>
        <p className="text-muted-foreground max-w-2xl">
          Explore Japanese cuisine through our curated categories, 
          from traditional favorites to unique regional specialties.
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {POPULAR_CATEGORIES.map(({ category, image }) => (
          <Link
            key={category}
            href={`/restaurants?category=${category}`}
            className="group relative overflow-hidden rounded-xl h-48 transition-all hover:shadow-lg"
          >
            <img
              src={image}
              alt={getCategoryText(category)}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="text-xl font-semibold text-white">
                {getCategoryText(category)}
              </h3>
              <div className="mt-1 inline-flex items-center text-sm text-white/90 group-hover:text-white transition-colors">
                <span>Explore</span>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 20 20" 
                  fill="currentColor" 
                  className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1"
                >
                  <path fillRule="evenodd" d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
