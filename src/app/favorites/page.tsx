import { Metadata } from "next";
import { FavoritesClient } from "./client";

export const metadata: Metadata = {
  title: "My Favorites | Japanese Restaurants",
  description: "View and manage your favorite Japanese restaurants in one place.",
};

/**
 * Favorites page component
 */
export default function FavoritesPage() {
  return <FavoritesClient />;
}
