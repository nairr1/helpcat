import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const logsRouter = createTRPCRouter({
    getAll: publicProcedure
        .input(
            z.object({
                brand: z.string().min(1).max(280),
            })
        )
        .query(({ ctx, input }) => {
            return ctx.prisma.storeStatusLogs.findMany({
                where: {
                    brand: input.brand
                }
            });
        }),
});