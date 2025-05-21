import { Metadata } from "next";
import { RestaurantsClient } from "./client";

export const metadata: Metadata = {
  title: "Japanese Restaurants | Browse All Restaurants",
  description: "Browse our curated selection of the finest Japanese restaurants. Filter by category, city, and more to find your perfect dining experience.",
};

interface RestaurantsPageProps {
  searchParams?: {
    category?: string;
    city?: string;
    isFavorite?: string;
    page?: string;
  };
}

/**
 * Restaurants listing page
 */
export default function RestaurantsPage({ searchParams }: RestaurantsPageProps) {
  // With Next.js app router, we should pass searchParams directly to the client
  // The client component will access the params using useSearchParams() hook
  return <RestaurantsClient />;
}
