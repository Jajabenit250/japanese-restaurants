"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./theme-toggle";
import { cn } from "@/lib/utils";

/**
 * Header component with responsive navigation
 */
export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  
  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full bg-background/95 backdrop-blur transition-all",
        isScrolled && "border-b shadow-sm"
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-primary">JapaneseEats</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === "/" ? "text-foreground" : "text-muted-foreground"
              )}
            >
              Home
            </Link>
            <Link
              href="/restaurants"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === "/restaurants" || pathname.startsWith("/restaurants/")
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}
            >
              Restaurants
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center gap-2">
          <Link href="/favorites" passHref>
            <Button
              variant="outline"
              size="sm"
              className="hidden sm:flex items-center gap-1"
            >
              <Heart className="h-4 w-4" />
              <span>Favorites</span>
            </Button>
          </Link>
          
          <Link href="/favorites" passHref className="sm:hidden">
            <Button variant="ghost" size="icon">
              <Heart className="h-5 w-5" />
              <span className="sr-only">Favorites</span>
            </Button>
          </Link>
          
          <ThemeToggle />
          
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b">
          <nav className="container py-4 flex flex-col gap-4">
            <Link
              href="/"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === "/" ? "text-foreground" : "text-muted-foreground"
              )}
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/restaurants"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === "/restaurants" || pathname.startsWith("/restaurants/")
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}
              onClick={() => setMobileMenuOpen(false)}
            >
              Restaurants
            </Link>
            <Link
              href="/favorites"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === "/favorites" 
                  ? "text-foreground" 
                  : "text-muted-foreground"
              )}
              onClick={() => setMobileMenuOpen(false)}
            >
              Favorites
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
