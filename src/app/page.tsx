import { Hero } from "@/components/home/hero";
import { FeaturedRestaurants } from "@/components/home/featured-restaurants";
import { CategoryShowcase } from "@/components/home/category-showcase";

/**
 * Home page component
 */
export default function Home() {
  return (
    <>
      <Hero />
      <div className="container mx-auto px-4 py-12 space-y-20">
        <FeaturedRestaurants />
        <CategoryShowcase />
      </div>
    </>
  );
}
