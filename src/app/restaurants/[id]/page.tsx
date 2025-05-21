import { Metadata } from "next";
import { notFound } from "next/navigation";
import { db } from "@/server/db";
import { RestaurantDetail } from "./restaurant-detail";

interface RestaurantPageProps {
  params: {
    id: string;
  };
}

/**
 * Generate metadata for the restaurant page
 */
export async function generateMetadata({ params }: RestaurantPageProps): Promise<Metadata> {
  try {
    const restaurant = await db.restaurant.findUnique({
      where: { id: params.id, isActive: true },
    });
    
    if (!restaurant) {
      return {
        title: "Restaurant Not Found",
      };
    }
    
    return {
      title: `${restaurant.name} | Japanese Restaurant`,
      description: restaurant.desc,
    };
  } catch (error) {
    return {
      title: "Restaurant Details",
      description: "View details about this Japanese restaurant",
    };
  }
}

/**
 * Individual restaurant detail page
 */
export default async function RestaurantPage({ params }: RestaurantPageProps) {
  // Pre-fetch restaurant data for SEO
  try {
    const restaurant = await db.restaurant.findUnique({
      where: { id: params.id, isActive: true },
    });
    
    if (!restaurant) {
      notFound();
    }
    
    return <RestaurantDetail initialData={restaurant} />;
  } catch (error) {
    notFound();
  }
}
