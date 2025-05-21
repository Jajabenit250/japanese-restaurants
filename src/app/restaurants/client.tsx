"use client";

import { Category } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import { RestaurantGrid } from "@/components/restaurants/restaurant-grid";
import { Button } from "@/components/ui/button";
import { api } from "@/app/_trpc/client";
import { getCategoryText } from "@/lib/utils";
import { RestaurantSearchAndFilter } from "@/components/restaurants/restaurant-search-filter";

/**
 * Client component for restaurants page with filtering
 */
export function RestaurantsClient() {
  // Get search params from the URL using the client-side hook
  const searchParams = useSearchParams();

  // Parse search params
  const category = searchParams?.get("category") as Category | undefined;
  const city = searchParams?.get("city") || undefined;
  const isFavorite = searchParams?.get("isFavorite") === "true";
  const searchQuery = searchParams?.get("search") || undefined;
  const pageParam = searchParams?.get("page");
  const page = pageParam ? parseInt(pageParam) : 1;

  // Fetch restaurants with filters
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    api.restaurant.getRestaurants.useInfiniteQuery(
      {
        category: category || undefined,
        city,
        isFavorite: isFavorite || undefined,
        search: searchQuery,
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

    if (searchQuery) {
      parts.push(`matching "${searchQuery}"`);
    }

    if (parts.length === 0) {
      return "All Japanese Restaurants";
    }

    return parts.join(" ");
  };

  const handleLoadMore = () => {
    fetchNextPage();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Results Count */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          {getFilterText()}
        </h1>
        <p className="text-muted-foreground">
          {data?.pages[0]?.meta.total || 0} restaurants available
        </p>
      </div>

      {/* Search & Filter UI */}
      <RestaurantSearchAndFilter />

      {/* Results Grid */}
      <RestaurantGrid restaurants={restaurants} isLoading={isLoading} />

      {/* Load More Button */}
      {hasNextPage && (
        <div className="mt-8 flex justify-center">
          <Button
            onClick={handleLoadMore}
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
