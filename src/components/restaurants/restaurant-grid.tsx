"use client";

import { RestaurantCard } from "./restaurant-card";
import { RestaurantCardSkeleton } from "./restaurant-card-skeleton";
import { Restaurant } from "@prisma/client";

interface RestaurantGridProps {
  restaurants: Restaurant[];
  isLoading?: boolean;
}

/**
 * Grid layout for restaurant cards
 */
export function RestaurantGrid({ restaurants, isLoading = false }: RestaurantGridProps) {
  if (isLoading) {
    return (
      <div className="restaurant-grid">
        {Array.from({ length: 8 }).map((_, i) => (
          <RestaurantCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (restaurants.length === 0) {
    return (
      <div className="text-center py-12 px-4 bg-muted/30 rounded-lg border border-muted">
        <h3 className="text-lg font-medium mb-2">No restaurants found</h3>
        <p className="text-muted-foreground">Try adjusting your filters to find what you're looking for.</p>
      </div>
    );
  }

  return (
    <div className="restaurant-grid">
      {restaurants.map((restaurant) => (
        <RestaurantCard key={restaurant.id} restaurant={restaurant} />
      ))}
    </div>
  );
}
