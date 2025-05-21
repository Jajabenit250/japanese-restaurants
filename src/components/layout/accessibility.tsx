"use client";

import { useEffect, useRef } from "react";
import { setupKeyboardNavigation } from "@/lib/utils";

/**
 * Accessibility component to enhance keyboard navigation and screen reader support
 */
export function Accessibility() {
  const skipLinkRef = useRef<HTMLAnchorElement>(null);
  
  // Setup keyboard navigation for focus visibility
  useEffect(() => {
    const cleanup = setupKeyboardNavigation();
    return cleanup;
  }, []);
  
  return (
    <>
      <a
        ref={skipLinkRef}
        href="#main-content"
        className="skip-link"
      >
        Skip to content
      </a>
      
      {/* Screen reader announcements */}
      <div 
        className="sr-only" 
        aria-live="polite" 
        id="sr-announcements"
      />
    </>
  );
}
