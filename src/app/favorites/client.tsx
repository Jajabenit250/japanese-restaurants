"use client";

import Link from "next/link";
import { ArrowLeft, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RestaurantGrid } from "@/components/restaurants/restaurant-grid";
import { api } from "@/app/_trpc/client";

/**
 * Client component for favorites page
 */
export function FavoritesClient() {
  // Fetch favorite restaurants
  const { data, isLoading } = api.restaurant.getRestaurants.useQuery(
    { isFavorite: true, limit: 50 },
    { staleTime: 1000 * 60 } // 1 minute
  );
  
  const restaurants = data?.data || [];
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/" passHref>
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
        
        <h1 className="text-3xl font-bold tracking-tight mt-4 mb-2">
          My Favorite Restaurants
        </h1>
        <p className="text-muted-foreground">
          {restaurants.length} {restaurants.length === 1 ? 'restaurant' : 'restaurants'} saved to your favorites
        </p>
      </div>
      
      {!isLoading && restaurants.length === 0 ? (
        <EmptyFavorites />
      ) : (
        <RestaurantGrid 
          restaurants={restaurants} 
          isLoading={isLoading} 
        />
      )}
    </div>
  );
}

/**
 * Empty state when no favorites exist
 */
function EmptyFavorites() {
  return (
    <div className="text-center py-16 px-4">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
        <Heart className="h-8 w-8 text-muted-foreground" />
      </div>
      
      <h2 className="text-xl font-semibold mb-2">No favorites yet</h2>
      
      <p className="text-muted-foreground max-w-md mx-auto mb-6">
        You haven't added any restaurants to your favorites. Browse our restaurants 
        and click the heart icon to add them to your favorites.
      </p>
      
      <Link href="/restaurants" passHref>
        <Button>
          Browse Restaurants
        </Button>
      </Link>
    </div>
  );
}
