"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { Category } from "@prisma/client";
import { Button } from "../ui/button";

// Map categories to simplified display groups
const CATEGORY_GROUPS = {
  "Ramen/Tsukemen": [Category.RAMEN, Category.YAKISOBA],
  "Tonkatsu/Kushikatsu": [Category.TONKATSU],
  "Soba/Udon": [Category.SOBA],
  "Okonomiyaki/Takoyaki": [Category.OKONOMIYAKI],
  "Sukiyaki/Shabu-shabu": [Category.SUKIYAKI],
  "Sushi & Seafood": [Category.SUSHI, Category.UNAGI],
  "Yakitori & Skewers": [Category.YAKITORI]
};

/**
 * Restaurant search and filter component
 */
export function RestaurantSearchAndFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(
    searchParams.get("category") || null
  );
  
  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  // Handle search submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const params = new URLSearchParams(searchParams.toString());
    
    if (searchQuery) {
      params.set("search", searchQuery);
    } else {
      params.delete("search");
    }
    
    router.push(`/restaurants?${params.toString()}`);
  };
  
  // Handle category filter click
  const handleCategoryClick = (categoryGroup: string | null) => {
    let params = new URLSearchParams(searchParams.toString());
    
    // If "entire" is clicked or the same category is clicked again, clear the category filter
    if (!categoryGroup || categoryGroup === activeCategory) {
      params.delete("category");
      setActiveCategory(null);
    } else {
      // For category groups, just use the first category in the group as the filter
      const categoriesInGroup = CATEGORY_GROUPS[categoryGroup as keyof typeof CATEGORY_GROUPS];
      if (categoriesInGroup && categoriesInGroup.length > 0) {
        params.set("category", categoriesInGroup[0]);
      } else {
        // For individual categories that don't have a group
        params.set("category", categoryGroup);
      }
      setActiveCategory(categoryGroup);
    }
    
    router.push(`/restaurants?${params.toString()}`);
  };
  
  // Update active category when URL changes
  useEffect(() => {
    const category = searchParams.get("category");
    
    if (category) {
      // Find which group this category belongs to
      for (const [groupName, categories] of Object.entries(CATEGORY_GROUPS)) {
        if (categories.includes(category as Category)) {
          setActiveCategory(groupName);
          return;
        }
      }
      setActiveCategory(category);
    } else {
      setActiveCategory(null);
    }
  }, [searchParams]);
  
  return (
    <div className="w-full mx-auto">
      {/* Search Box */}
      <form onSubmit={handleSearchSubmit} className="relative mb-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="w-full py-4 pl-12 pr-4 bg-white rounded-full shadow-md text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
            placeholder="Search for the name of the restaurant"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </form>
      
      {/* Category Filters */}
      <div className="flex flex-wrap gap-2 pb-2 overflow-x-auto">
        <Button
          onClick={() => handleCategoryClick(null)}
          className={`px-6 py-3 rounded-full text-sm font-medium transition-colors ${
            !activeCategory 
              ? "bg-gray-200 text-gray-800" 
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          entire
        </Button>
        
        {Object.keys(CATEGORY_GROUPS).map((groupName) => (
          <button
            key={groupName}
            onClick={() => handleCategoryClick(groupName)}
            className={`px-6 py-3 rounded-full text-sm font-medium transition-colors ${
              activeCategory === groupName
                ? "bg-gray-200 text-gray-800" 
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {groupName}
          </button>
        ))}
      </div>
    </div>
  );
}
