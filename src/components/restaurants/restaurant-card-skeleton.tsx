import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * Skeleton loading component for restaurant card
 */
export function RestaurantCardSkeleton() {
  return (
    <Card className="animate-pulse">
      <CardHeader>
        <Skeleton className="h-48 w-full rounded-t-lg" />
      </CardHeader>
      
      <CardContent>
        <div className="flex justify-between items-center mb-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-10" />
        </div>
        
        <Skeleton className="h-6 w-full mb-2" />
        <Skeleton className="h-6 w-3/4 mb-2" />
        
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-4/5 mb-4" />
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <Skeleton className="h-5 w-16" />
        <Skeleton className="h-5 w-14" />
      </CardFooter>
    </Card>
  );
}
