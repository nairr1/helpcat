import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const logsRouter = createTRPCRouter({
    getAllByBrand: publicProcedure
        .input(
            z.object({
                brand: z.string().min(1).max(280),
            })
        )
        .query(({ ctx, input }) => {
            return ctx.prisma.ausMajorsStoreStatusLogs.findMany({
                select: {
                    storeId: true,
                    lastOnline: true,
                },
                where: {
                    brand: input.brand
                }
            });
        }),
    
    getAll: publicProcedure
        .query(({ ctx }) => {
            return ctx.prisma.ausMajorsStoreStatusLogs.findMany({
                where: {
                    openNow: true,
                    NOT: {
                        status: "Online"
                    }
                },
                orderBy: { brand: "asc" },
            });
        }),
});