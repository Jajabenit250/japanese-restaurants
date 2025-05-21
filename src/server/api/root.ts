import { createTRPCRouter } from "@/server/api/trpc";
import { restaurantRouter } from "@/server/api/routers/restaurant";
import { systemRouter } from "@/server/api/routers/system";

/**
 * Main tRPC router exporting all routers
 */
export const appRouter = createTRPCRouter({
  restaurant: restaurantRouter,
  system: systemRouter,
});

export type AppRouter = typeof appRouter;
