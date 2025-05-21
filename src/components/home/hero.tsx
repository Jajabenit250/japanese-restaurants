"use client";

import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Hero section for homepage
 */
export function Hero() {
  const router = useRouter();
  
  const handleExploreClick = () => {
    router.push('/restaurants');
  };
  
  const handleFavoritesClick = () => {
    router.push('/favorites');
  };
  
  // Updated image URL that's known to work
  const heroImageUrl = "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=1887&auto=format&fit=crop";
  
  return (
    <section className="relative bg-gradient-to-r from-primary-600 to-primary-500 text-white py-20 md:py-32 overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Discover Authentic <span className="text-yellow-200">Japanese Cuisine</span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/90 max-w-lg">
              Explore Japan's finest restaurants with authentic dishes ranging from fresh sushi to comforting ramen, crispy tempura, and more.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                size="lg"
                onClick={handleExploreClick}
                className="bg-white text-primary-600 hover:bg-white/90 w-full sm:w-auto"
              >
                Explore Restaurants
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                onClick={handleFavoritesClick}
                className="border-white text-primary-600 hover:bg-white/10 w-full sm:w-auto"
              >
                View Favorites
              </Button>
            </div>
            
            <div className="grid grid-cols-3 gap-4 pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-200">1000+</div>
                <div className="text-sm text-primary-600/80">Restaurants</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-200">20+</div>
                <div className="text-sm text-primary-600/80">Categories</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-200">5+</div>
                <div className="text-sm text-white/80">Cities</div>
              </div>
            </div>
          </div>
          
          <div className="relative hidden md:block">
            <div className="relative rounded-lg overflow-hidden shadow-2xl">
              <img
                src={heroImageUrl}
                alt="Japanese cuisine"
                className="w-full h-[400px] object-cover"
              />
            </div>
            
            <div className="absolute -bottom-6 -left-6 bg-white rounded-lg p-4 shadow-lg text-gray-900">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-primary-100 rounded-full text-primary-600">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>
                  </svg>
                </div>
                <span className="font-medium">Authentic Cuisine</span>
              </div>
            </div>
            
            <div className="absolute -top-6 -right-6 bg-white rounded-lg p-4 shadow-lg text-gray-900">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-amber-100 rounded-full text-amber-600">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                </div>
                <span className="font-medium">Highly Rated</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute top-0 right-0 opacity-10">
        <svg width="600" height="600" viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="300" cy="300" r="300" fill="white" />
        </svg>
      </div>
      
      <div className="absolute bottom-0 left-0 opacity-10">
        <svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="200" cy="200" r="200" fill="white" />
        </svg>
      </div>
      
      {/* Wave decoration at bottom */}
      <div className="wave absolute bottom-0 left-0 w-full">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path
            fill="#f8fafc"
            fillOpacity="1"
            d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,218.7C672,235,768,245,864,234.7C960,224,1056,192,1152,181.3C1248,171,1344,181,1392,186.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>
  );
}
