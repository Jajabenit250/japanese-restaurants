"use client";

import { Category } from "@prisma/client";
import { RestaurantFilters } from "@/components/restaurants/restaurant-filters";
import { RestaurantGrid } from "@/components/restaurants/restaurant-grid";
import { Button } from "@/components/ui/button";
import { api } from "@/app/_trpc/client";
import { getCategoryText } from "@/lib/utils";

interface RestaurantsClientProps {
  searchParams?: {
    category?: string;
    city?: string;
    isFavorite?: string;
    page?: string;
  };
}

/**
 * Client component for restaurants page with filtering
 */
export function RestaurantsClient({ searchParams }: RestaurantsClientProps) {
  // Parse search params
  const category = searchParams?.category as Category | undefined;
  const city = searchParams?.city;
  const isFavorite = searchParams?.isFavorite === "true";
  const page = searchParams?.page ? parseInt(searchParams.page) : 1;
  
  // Fetch restaurants with filters
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = 
    api.restaurant.getRestaurants.useInfiniteQuery(
      {
        category,
        city,
        isFavorite: isFavorite || undefined,
        limit: 12,
      },
      {
        getNextPageParam: (lastPage) => {
          if (lastPage.meta.page < lastPage.meta.totalPages) {
            return lastPage.meta.page + 1;
          }
          return undefined;
        },
        staleTime: 1000 * 60, // 1 minute
      }
    );
  
  // Flatten restaurant data from all pages
  const restaurants = data?.pages.flatMap((page) => page.data) || [];
  
  // Get count text based on filters
  const getFilterText = () => {
    const parts = [];
    
    if (category) {
      parts.push(getCategoryText(category));
    }
    
    if (city) {
      parts.push(`in ${city.charAt(0).toUpperCase() + city.slice(1)}`);
    }
    
    if (isFavorite) {
      parts.push("in your favorites");
    }
    
    if (parts.length === 0) {
      return "All Japanese Restaurants";
    }
    
    return parts.join(" ");
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          {getFilterText()}
        </h1>
        <p className="text-muted-foreground">
          {data?.pages[0]?.meta.total || 0} restaurants available
        </p>
      </div>
      
      <RestaurantFilters />
      
      <RestaurantGrid 
        restaurants={restaurants} 
        isLoading={isLoading} 
      />
      
      {hasNextPage && (
        <div className="mt-8 flex justify-center">
          <Button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            variant="outline"
            size="lg"
          >
            {isFetchingNextPage ? "Loading more..." : "Load More"}
          </Button>
        </div>
      )}
    </div>
  );
}
