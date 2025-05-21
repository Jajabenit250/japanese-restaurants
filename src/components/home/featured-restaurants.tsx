"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RestaurantGrid } from "@/components/restaurants/restaurant-grid";
import { api } from "@/app/_trpc/client";

/**
 * Featured restaurants section for homepage
 */
export function FeaturedRestaurants() {
  // Fetch top rated restaurants
  const { data, isLoading } = api.restaurant.getRestaurants.useQuery(
    { limit: 4 },
    { 
      staleTime: 1000 * 60 * 5 // 5 minutes
    }
  );
  
  return (
    <section id="featured-restaurants">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight mb-2">
            Featured Restaurants
          </h2>
          <p className="text-muted-foreground max-w-2xl">
            Discover our handpicked selection of the finest Japanese restaurants, 
            offering exceptional dining experiences across Japan.
          </p>
        </div>
        
        <Link href="/restaurants" passHref>
          <Button variant="link" className="mt-4 md:mt-0 text-primary flex items-center">
            View all restaurants
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </Link>
      </div>
      
      <RestaurantGrid 
        restaurants={data?.data || []} 
        isLoading={isLoading} 
      />
    </section>
  );
}
