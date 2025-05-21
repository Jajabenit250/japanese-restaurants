import { Metadata } from "next";
import { CategoriesClient } from "./client";

export const metadata: Metadata = {
  title: "Categories | Japanese Restaurants",
  description: "Browse Japanese restaurants by category, from sushi to ramen, yakitori, and more.",
};

/**
 * Categories page component
 */
export default function CategoriesPage() {
  return <CategoriesClient />;
}
