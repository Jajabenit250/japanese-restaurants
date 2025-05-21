"use client";

import Link from "next/link";
import { Category } from "@prisma/client";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getCategoryText } from "@/lib/utils";
import { api } from "@/app/_trpc/client";
import { Skeleton } from "@/components/ui/skeleton";

// Category images
const CATEGORY_IMAGES: Partial<Record<Category, string>> = {
  [Category.SUSHI]: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=1887&auto=format&fit=crop",
  [Category.RAMEN]: "https://images.unsplash.com/photo-1557872943-16a5ac26437e?q=80&w=1887&auto=format&fit=crop",
  [Category.TEMPURA]: "https://images.unsplash.com/photo-1628913510352-ec4e06804483?q=80&w=1887&auto=format&fit=crop",
  [Category.YAKITORI]: "https://images.unsplash.com/photo-1535666669445-e8c15cd2e7a9?q=80&w=1887&auto=format&fit=crop",
  [Category.NABE]: "https://images.unsplash.com/photo-1623341214825-9f4f963727da?q=80&w=1887&auto=format&fit=crop",
  [Category.SOBA]: "https://images.unsplash.com/photo-1617196034183-421b4917c92d?q=80&w=1887&auto=format&fit=crop",
  [Category.DONBURI]: "https://images.unsplash.com/photo-1585032226634-77be5269a2b1?q=80&w=1887&auto=format&fit=crop",
  [Category.YAKINIKU]: "https://images.unsplash.com/photo-1534604973900-c43ab4fdeeea?q=80&w=1887&auto=format&fit=crop",
  [Category.IZAKAYA]: "https://images.unsplash.com/photo-1584691515048-d4b6c73d1e8a?q=80&w=1887&auto=format&fit=crop",
  [Category.CURRY]: "https://images.unsplash.com/photo-1574484284002-952d92456975?q=80&w=1887&auto=format&fit=crop",
};

/**
 * Client component for categories page
 */
export function CategoriesClient() {
  // Fetch categories with counts
  const { data: categoryData, isLoading } = api.restaurant.getCategories.useQuery(
    undefined,
    { staleTime: 1000 * 60 * 5 } // 5 minutes
  );
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          Browse by Category
        </h1>
        <p className="text-muted-foreground max-w-3xl">
          Explore Japanese cuisine through our curated categories, from traditional 
          favorites like sushi and ramen to unique regional specialties.
        </p>
      </div>
      
      {isLoading ? (
        <CategorySkeleton />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryData?.map((item: any) => (
            <CategoryCard
              key={item.category}
              category={item.category as Category}
              count={Number(item.count) || 0}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * Category card component
 */
function CategoryCard({ category, count }: { category: Category; count: number }) {
  const image = CATEGORY_IMAGES[category] || "https://images.unsplash.com/photo-1617196034183-421b4917c92d?q=80&w=1887&auto=format&fit=crop";
  
  return (
    <Link
      href={`/restaurants?category=${category}`}
      className="group relative overflow-hidden rounded-lg h-64 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="absolute inset-0">
        <img
          src={image}
          alt={getCategoryText(category)}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <div className="mb-1 text-sm text-white/80">
          {count} {count === 1 ? 'restaurant' : 'restaurants'}
        </div>
        
        <h3 className="text-2xl font-semibold text-white mb-2">
          {getCategoryText(category)}
        </h3>
        
        <Button 
          variant="outline" 
          size="sm" 
          className="border-white text-white hover:bg-white/20 hover:text-white transition-colors"
        >
          <span>Browse</span>
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </Link>
  );
}

/**
 * Skeleton loading state for categories
 */
function CategorySkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="relative rounded-lg h-64 overflow-hidden">
          <Skeleton className="h-full w-full" />
        </div>
      ))}
    </div>
  );
}
