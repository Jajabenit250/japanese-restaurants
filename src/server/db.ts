import { PrismaClient } from "@prisma/client";

// Import env safely with a fallback
let envModule;
try {
  envModule = require("@/env.mjs");
} catch (error) {
  console.warn("Could not load env.mjs, using process.env directly");
  envModule = { env: { NODE_ENV: process.env.NODE_ENV || "development" } };
}

const { env } = envModule;

/**
 * Create a singleton PrismaClient instance
 */
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
