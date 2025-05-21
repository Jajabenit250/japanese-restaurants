"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { Restaurant } from "@prisma/client";
import { formatNumber, getCategoryText } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { api } from "@/app/_trpc/client";

interface RestaurantCardProps {
  restaurant: Restaurant;
}

/**
 * Restaurant card component with favorite toggle
 */
export function RestaurantCard({ restaurant }: RestaurantCardProps) {
  const [isFavorite, setIsFavorite] = useState(restaurant.isFavorite);
  const utils = api.useContext();
  
  const { mutate: toggleFavorite, isLoading } = api.restaurant.toggleFavorite.useMutation({
    onMutate: async ({ id, isFavorite }) => {
      // Optimistic update
      setIsFavorite(isFavorite);
    },
    onSuccess: () => {
      // Invalidate cache to refresh data
      utils.restaurant.getRestaurants.invalidate();
    },
    onError: () => {
      // Revert on error
      setIsFavorite(restaurant.isFavorite);
    }
  });
  
  // Handle favorite toggle
  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isLoading) return;
    
    toggleFavorite({
      id: restaurant.id,
      isFavorite: !isFavorite,
    });
  };
  
  // Use working Unsplash image or fallback
  const imageUrl = restaurant.images[0] || "https://images.unsplash.com/photo-1617196034183-421b4917c92d?q=80&w=1887&auto=format&fit=crop";
  
  return (
    <Link href={`/restaurants/${restaurant.id}`} passHref>
      <Card className="restaurant-card">
        <CardHeader className="restaurant-image-container p-0">
          <div className="relative h-48 w-full">
            <img
              src={imageUrl}
              alt={restaurant.name}
              className="restaurant-image rounded-t-lg object-cover w-full h-full"
            />
            
            <button
              className={`favorite-button ${isFavorite ? 'favorite-active' : ''}`}
              onClick={handleToggleFavorite}
              disabled={isLoading}
              aria-label={isFavorite ? `Remove ${restaurant.name} from favorites` : `Add ${restaurant.name} to favorites`}
              aria-pressed={isFavorite}
            >
              <Heart className="h-5 w-5" fill={isFavorite ? "currentColor" : "none"} />
            </button>
            
            {restaurant.featured && (
              <div className="restaurant-featured">
                {restaurant.featured.text}
              </div>
            )}
          </div>
        </CardHeader>
        
        <CardContent className="restaurant-content">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              {getCategoryText(restaurant.category)}
            </span>
            <span className="text-sm font-medium text-primary">
              ¥{restaurant.price_range}
            </span>
          </div>
          
          <CardTitle className="restaurant-name">
            {restaurant.name}
          </CardTitle>
          
          <CardDescription className="restaurant-desc">
            {restaurant.desc}
          </CardDescription>
        </CardContent>
        
        <CardFooter className="restaurant-footer">
          <div className="flex items-center">
            <div className="flex items-center text-amber-500 mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="ml-1 text-sm font-semibold text-foreground">
                {restaurant.rating.toFixed(1)}
              </span>
            </div>
            <span className="text-xs text-muted-foreground">
              ({formatNumber(restaurant.rating_count)})
            </span>
          </div>
          
          <div className="text-xs bg-muted px-2 py-1 rounded capitalize">
            {restaurant.city}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
