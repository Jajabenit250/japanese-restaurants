import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { createTRPCRouter, publicProcedureWithLogging } from "@/server/api/trpc";
import { Category } from "@prisma/client";
import { Prisma } from "@prisma/client";

/**
 * Restaurant router with all restaurant-related endpoints
 */
export const restaurantRouter = createTRPCRouter({
  // Get all restaurants with optional filtering
  getRestaurants: publicProcedureWithLogging
    .input(
      z.object({
        category: z.nativeEnum(Category).optional().nullable(),
        city: z.string().optional().nullable(),
        isFavorite: z.boolean().optional().nullable(),
        search: z.string().optional().nullable(),
        limit: z.number().min(1).max(100).default(10).optional(),
        page: z.number().min(1).default(1).optional(),
        cursor: z.string().optional().nullable(),
      }).optional(),
    )
    .query(async ({ ctx, input }) => {
      const limit = input?.limit ?? 10;
      const page = input?.page ?? 1;
      const skip = (page - 1) * limit;
      
      // Build query filter
      let where: Prisma.RestaurantWhereInput = {
        isActive: true,
        ...(input?.category ? { category: input.category } : {}),
        ...(input?.city ? { city: input.city } : {}),
        ...(input?.isFavorite !== undefined && input?.isFavorite !== null ? { isFavorite: input.isFavorite } : {}),
      };
      
      // Add search filter if provided
      if (input?.search) {
        where = {
          ...where,
          OR: [
            { name: { contains: input.search, mode: 'insensitive' } },
            { desc: { contains: input.search, mode: 'insensitive' } },
          ],
        };
      }
      
      try {
        // Execute query in parallel for better performance
        const [restaurants, totalCount] = await Promise.all([
          ctx.db.restaurant.findMany({
            where,
            take: limit,
            skip,
            orderBy: { rating: 'desc' },
          }),
          ctx.db.restaurant.count({ where }),
        ]);
        
        return {
          data: restaurants,
          meta: {
            total: totalCount,
            page,
            limit,
            totalPages: Math.ceil(totalCount / limit),
          }
        };
      } catch (error) {
        console.error("Error fetching restaurants:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch restaurants",
        });
      }
    }),
    
  // The rest of your router methods remain the same...
  getById: publicProcedureWithLogging
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      try {
        const restaurant = await ctx.db.restaurant.findUnique({
          where: { id: input.id, isActive: true },
        });
        
        if (!restaurant) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Restaurant not found",
          });
        }
        
        return restaurant;
      } catch (error) {
        if (error instanceof TRPCError) throw error;
        
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch restaurant",
        });
      }
    }),
    
  toggleFavorite: publicProcedureWithLogging
    .input(z.object({
      id: z.string().uuid(),
      isFavorite: z.boolean(),
    }))
    .mutation(async ({ ctx, input }) => {
      try {
        // Check if restaurant exists
        const restaurant = await ctx.db.restaurant.findUnique({
          where: { id: input.id, isActive: true },
        });
        
        if (!restaurant) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Restaurant not found",
          });
        }
        
        // Update favorite status
        const updatedRestaurant = await ctx.db.restaurant.update({
          where: { id: input.id },
          data: { isFavorite: input.isFavorite },
        });
        
        return updatedRestaurant;
      } catch (error) {
        if (error instanceof TRPCError) throw error;
        
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to update favorite status",
        });
      }
    }),
    
  getCategories: publicProcedureWithLogging.query(async ({ ctx }) => {
    try {
      const categoryData = await ctx.db.$queryRaw`
        SELECT 
          "category", 
          COUNT(*) as "count" 
        FROM "Restaurant" 
        WHERE "isActive" = true 
        GROUP BY "category" 
        ORDER BY "count" DESC
      `;
      
      return categoryData;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch categories",
      });
    }
  }),
  
  getCities: publicProcedureWithLogging.query(async ({ ctx }) => {
    try {
      const cityData = await ctx.db.$queryRaw`
        SELECT 
          "city", 
          COUNT(*) as "count" 
        FROM "Restaurant" 
        WHERE "isActive" = true 
        GROUP BY "city" 
        ORDER BY "count" DESC
      `;
      
      return cityData;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch cities",
      });
    }
  }),
});
