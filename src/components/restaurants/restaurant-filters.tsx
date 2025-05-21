"use client";

import { useCallback, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Check, ChevronDown, Filter, X } from "lucide-react";
import { Category } from "@prisma/client";
import { getCategoryText } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/**
 * Restaurant filter component
 */
export function RestaurantFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Get current filter values from URL
  const currentCategory = searchParams.get("category") || "";
  const currentCity = searchParams.get("city") || "";
  const currentFavorites = searchParams.get("isFavorite") === "true";
  
  // Local state for mobile filter drawer
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Check if any filter is active
  const hasActiveFilters = currentCategory || currentCity || currentFavorites;
  
  // Apply filters by updating URL
  const applyFilters = useCallback(
    (params: { category?: string; city?: string; isFavorite?: boolean }) => {
      const urlParams = new URLSearchParams(searchParams.toString());
      
      // Update parameters
      if (params.category) {
        urlParams.set("category", params.category);
      } else {
        urlParams.delete("category");
      }
      
      if (params.city) {
        urlParams.set("city", params.city);
      } else {
        urlParams.delete("city");
      }
      
      if (params.isFavorite) {
        urlParams.set("isFavorite", "true");
      } else {
        urlParams.delete("isFavorite");
      }
      
      router.push(`/restaurants?${urlParams.toString()}`);
    },
    [router, searchParams]
  );
  
  // Handle category change
  const handleCategoryChange = (value: string) => {
    applyFilters({
      category: value || undefined,
      city: currentCity || undefined,
      isFavorite: currentFavorites,
    });
  };
  
  // Handle city change
  const handleCityChange = (value: string) => {
    applyFilters({
      category: currentCategory || undefined,
      city: value || undefined,
      isFavorite: currentFavorites,
    });
  };
  
  // Handle favorites toggle
  const handleFavoritesChange = (checked: boolean) => {
    applyFilters({
      category: currentCategory || undefined,
      city: currentCity || undefined,
      isFavorite: checked,
    });
  };
  
  // Reset all filters
  const resetFilters = () => {
    router.push("/restaurants");
  };
  
  return (
    <div className="mb-8">
      {/* Mobile filters button */}
      <div className="flex md:hidden justify-between items-center mb-4">
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          <Filter className="h-4 w-4" />
          <span>Filters</span>
          {hasActiveFilters && (
            <span className="flex h-2 w-2 rounded-full bg-primary"></span>
          )}
        </Button>
        
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={resetFilters}
            className="text-muted-foreground"
          >
            Reset
          </Button>
        )}
      </div>
      
      {/* Desktop filters */}
      <div className={`md:flex items-end gap-4 ${isFilterOpen ? 'block' : 'hidden md:flex'}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
          <div className="space-y-2">
            <label htmlFor="category-filter" className="text-sm font-medium">
              Category
            </label>
            <Select
              value={currentCategory}
              onValueChange={handleCategoryChange}
            >
              <SelectTrigger id="category-filter">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Categories</SelectItem>
                {Object.values(Category).map((category) => (
                  <SelectItem key={category} value={category}>
                    {getCategoryText(category)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="city-filter" className="text-sm font-medium">
              City
            </label>
            <Select
              value={currentCity}
              onValueChange={handleCityChange}
            >
              <SelectTrigger id="city-filter">
                <SelectValue placeholder="All Cities" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Cities</SelectItem>
                <SelectItem value="tokyo">Tokyo</SelectItem>
                <SelectItem value="osaka">Osaka</SelectItem>
                <SelectItem value="kyoto">Kyoto</SelectItem>
                <SelectItem value="nagoya">Nagoya</SelectItem>
                <SelectItem value="fukuoka">Fukuoka</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center space-x-2 h-10 mt-auto">
            <Checkbox
              id="favorites-only"
              checked={currentFavorites}
              onCheckedChange={handleFavoritesChange}
            />
            <label
              htmlFor="favorites-only"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Favorites only
            </label>
          </div>
          
          {hasActiveFilters && (
            <div className="flex items-end h-10">
              <Button
                variant="outline"
                size="sm"
                onClick={resetFilters}
                className="hidden md:flex items-center gap-1"
              >
                <X className="h-4 w-4" />
                Reset filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
