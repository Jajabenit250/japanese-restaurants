"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * Error boundary catch-all component
 */
export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("App Error:", error);
  }, [error]);

  return (
    <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-[70vh]">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-destructive mb-4">Oops!</h1>
        <h2 className="text-2xl font-semibold mb-4">Something went wrong</h2>
        
        <p className="text-muted-foreground mb-8">
          We apologize for the inconvenience. The error has been logged and 
          we're working to fix the issue.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button
            variant="outline"
            onClick={reset}
          >
            Try Again
          </Button>
          
          <Link href="/" passHref>
            <Button>Return Home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
