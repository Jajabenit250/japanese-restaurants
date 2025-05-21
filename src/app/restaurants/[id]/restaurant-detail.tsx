"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Heart, MapPin, Star } from "lucide-react";
import { Restaurant } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { getCategoryText, formatNumber } from "@/lib/utils";
import { api } from "@/app/_trpc/client";
import { useToast } from "@/components/ui/use-toast";

interface RestaurantDetailProps {
  initialData: Restaurant;
}

/**
 * Restaurant detail component
 */
export function RestaurantDetail({ initialData }: RestaurantDetailProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isFavorite, setIsFavorite] = useState(initialData.isFavorite);
  
  // Fetch fresh data from API
  const { data: restaurant, isLoading } = api.restaurant.getById.useQuery(
    { id: initialData.id },
    {
      initialData: initialData,
      staleTime: 1000 * 60 * 5, // 5 minutes
    }
  );
  
  // Toggle favorite mutation
  const { mutate: toggleFavorite, isLoading: isTogglingFavorite } = 
    api.restaurant.toggleFavorite.useMutation({
      onSuccess: (data) => {
        setIsFavorite(data.isFavorite);
        toast({
          title: data.isFavorite 
            ? "Added to favorites" 
            : "Removed from favorites",
          description: data.isFavorite 
            ? `${data.name} has been added to your favorites.`
            : `${data.name} has been removed from your favorites.`,
        });
      },
      onError: () => {
        toast({
          title: "Error",
          description: "Failed to update favorite status. Please try again.",
          variant: "destructive",
        });
      }
    });
  
  // Handle favorite toggle
  const handleToggleFavorite = () => {
    if (isTogglingFavorite) return;
    
    toggleFavorite({
      id: restaurant.id,
      isFavorite: !isFavorite,
    });
  };
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 animate-pulse">
        <div className="h-6 w-32 bg-gray-200 rounded mb-4"></div>
        <div className="h-10 w-64 bg-gray-200 rounded mb-8"></div>
        <div className="h-96 bg-gray-200 rounded-lg mb-8"></div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-6 text-sm text-muted-foreground">
        <Link href="/restaurants" className="hover:text-primary transition-colors">
          Restaurants
        </Link>
        <span>/</span>
        <span className="font-medium text-foreground">{restaurant.name}</span>
      </div>
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between mb-8 gap-4">
        <div>
          <Button
            variant="ghost"
            size="sm"
            className="mb-2"
            onClick={() => router.back()}
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back
          </Button>
          
          <h1 className="text-3xl md:text-4xl font-bold">{restaurant.name}</h1>
          
          <div className="flex flex-wrap items-center gap-2 mt-2">
            <div className="flex items-center text-amber-500">
              <Star className="h-5 w-5 fill-current" />
              <span className="ml-1 font-semibold">{restaurant.rating.toFixed(1)}</span>
              <span className="text-sm text-muted-foreground ml-1">
                ({formatNumber(restaurant.rating_count)} reviews)
              </span>
            </div>
            
            <span className="text-muted-foreground">•</span>
            
            <span className="text-sm font-medium">
              {getCategoryText(restaurant.category)}
            </span>
            
            <span className="text-muted-foreground">•</span>
            
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
              <span className="text-sm capitalize">{restaurant.city}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-start">
          <Button
            variant={isFavorite ? "default" : "outline"}
            onClick={handleToggleFavorite}
            disabled={isTogglingFavorite}
            className={isFavorite ? "bg-favorite hover:bg-favorite/90" : ""}
          >
            <Heart className="mr-2 h-4 w-4" fill={isFavorite ? "white" : "none"} />
            {isFavorite ? "Favorited" : "Add to Favorites"}
          </Button>
        </div>
      </div>
      
      {/* Main content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          {/* Main image */}
          <div className="relative aspect-video rounded-lg overflow-hidden">
            <Image
              src={restaurant.images[0] || "/placeholder-restaurant.jpg"}
              alt={restaurant.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 66vw"
              priority
            />
            
            {restaurant.featured && (
              <div className="absolute bottom-4 left-4 bg-black/70 text-white text-sm py-1 px-3 rounded-full">
                {restaurant.featured.text}
              </div>
            )}
          </div>
          
          {/* Description */}
          <div>
            <h2 className="text-xl font-semibold mb-3">About</h2>
            <p className="text-muted-foreground leading-relaxed">
              {restaurant.desc}
            </p>
          </div>
          
          {/* Other images */}
          {restaurant.images.length > 1 && (
            <div>
              <h2 className="text-xl font-semibold mb-3">Photos</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {restaurant.images.slice(1).map((image, index) => (
                  <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                    <Image
                      src={image}
                      alt={`${restaurant.name} - Photo ${index + 2}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 20vw"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-muted rounded-lg p-6">
            <h3 className="font-semibold mb-4">Details</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Category</span>
                <span className="font-medium">{getCategoryText(restaurant.category)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-muted-foreground">City</span>
                <span className="font-medium capitalize">{restaurant.city}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-muted-foreground">Price Range</span>
                <span className="font-medium">¥{restaurant.price_range}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-muted-foreground">Rating</span>
                <span className="font-medium flex items-center">
                  <Star className="h-4 w-4 fill-amber-500 text-amber-500 mr-1" />
                  {restaurant.rating.toFixed(1)} ({formatNumber(restaurant.rating_count)})
                </span>
              </div>
            </div>
          </div>
          
          <div className="bg-muted rounded-lg p-6">
            <h3 className="font-semibold mb-4">Similar Restaurants</h3>
            <SimilarRestaurants 
              category={restaurant.category} 
              currentId={restaurant.id}
              city={restaurant.city}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Similar restaurants component
 */
function SimilarRestaurants({ 
  category,
  currentId,
  city
}: { 
  category: Category;
  currentId: string;
  city: string;
}) {
  const { data, isLoading } = api.restaurant.getRestaurants.useQuery(
    {
      category,
      city,
      limit: 3,
    },
    {
      staleTime: 1000 * 60 * 5, // 5 minutes
    }
  );
  
  const restaurants = data?.data.filter(r => r.id !== currentId) || [];
  
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="h-16 bg-gray-200 rounded mb-2"></div>
          </div>
        ))}
      </div>
    );
  }
  
  if (restaurants.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No similar restaurants found in this category.
      </p>
    );
  }
  
  return (
    <div className="space-y-4">
      {restaurants.map((restaurant) => (
        <Link
          key={restaurant.id}
          href={`/restaurants/${restaurant.id}`}
          className="flex items-center gap-3 group p-2 -mx-2 rounded-md hover:bg-background transition-colors"
        >
          <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
            <Image
              src={restaurant.images[0] || "/placeholder-restaurant.jpg"}
              alt={restaurant.name}
              fill
              className="object-cover"
              sizes="64px"
            />
          </div>
          
          <div>
            <h4 className="font-medium line-clamp-1 group-hover:text-primary transition-colors">
              {restaurant.name}
            </h4>
            <div className="flex items-center text-sm text-muted-foreground">
              <Star className="h-3 w-3 fill-amber-500 text-amber-500 mr-1" />
              {restaurant.rating.toFixed(1)}
              <span className="mx-1">•</span>
              <span className="capitalize">{restaurant.city}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
