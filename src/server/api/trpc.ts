import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";
import { db } from "@/server/db";
import { randomUUID } from "crypto";

/**
 * Context type for tRPC procedures
 */
export interface CreateContextOptions {
  headers: Headers;
  requestId?: string;
}

/**
 * Creates context for tRPC procedures
 */
export function createInnerTRPCContext(opts: CreateContextOptions) {
  return {
    ...opts,
    db,
  };
}

/**
 * Creates context from API request
 */
export function createTRPCContext({
  req,
}: {
  req: Request;
}) {
  // Generate a unique request ID
  const requestId = randomUUID();

  return createInnerTRPCContext({
    headers: req.headers,
    requestId,
  });
}

/**
 * Initialize tRPC API
 */
const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

/**
 * Export tRPC router and procedure helpers
 */
export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;

/**
 * Request logger middleware
 */
const loggerMiddleware = t.middleware(async ({ path, type, next, ctx }) => {
  const start = Date.now();
  const result = await next();
  const durationMs = Date.now() - start;
  
  if (process.env.NODE_ENV === "development") {
    console.log(`[${ctx.requestId}] ${type} ${path} - ${durationMs}ms`);
  }
  
  return result;
});

/**
 * Public procedure with logging
 */
export const publicProcedureWithLogging = publicProcedure.use(loggerMiddleware);
