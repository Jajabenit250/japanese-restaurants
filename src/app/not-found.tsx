"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

/**
 * Custom 404 Not Found page
 */
export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-[70vh]">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        
        <p className="text-muted-foreground mb-8">
          The page you are looking for might have been removed, had its 
          name changed, or is temporarily unavailable.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button
            variant="outline"
            onClick={() => window.history.back()}
          >
            Go Back
          </Button>
          
          <Link href="/" passHref>
            <Button>Return Home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
