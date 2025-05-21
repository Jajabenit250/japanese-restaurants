import { TRPCError } from "@trpc/server";
import { createTRPCRouter, publicProcedureWithLogging } from "@/server/api/trpc";

/**
 * System router for health checks and status
 */
export const systemRouter = createTRPCRouter({
  health: publicProcedureWithLogging.query(async ({ ctx }) => {
    try {
      // Test database connection
      await ctx.db.$queryRaw`SELECT 1 as health`;
      
      return {
        status: "healthy",
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV,
        version: process.env.NEXT_PUBLIC_APP_VERSION || "1.0.0",
      };
    } catch (error) {
      console.error("Health check failed:", error);
      
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Database connection check failed",
      });
    }
  }),
  
  version: publicProcedureWithLogging.query(() => {
    return {
      version: process.env.NEXT_PUBLIC_APP_VERSION || "1.0.0",
      environment: process.env.NODE_ENV,
      apiVersion: "v1",
    };
  }),
});
