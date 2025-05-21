import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * Server-side environment variables schema
   */
  server: {
    DATABASE_URL: z.string().url().optional().default("postgresql://postgres:password@localhost:5433/japanese_restaurants"),
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  },

  /**
   * Client-side environment variables schema
   */
  client: {
    NEXT_PUBLIC_APP_URL: z.string().url().optional().default("http://localhost:3001"),
    NEXT_PUBLIC_APP_VERSION: z.string().min(1).default("1.0.0"),
  },

  /**
   * Runtime environment
   */
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_APP_VERSION: process.env.NEXT_PUBLIC_APP_VERSION || "1.0.0",
  },

  /**
   * Skip validation in client-side rendering
   */
  skipValidation: process.env.SKIP_ENV_VALIDATION === "true",
});