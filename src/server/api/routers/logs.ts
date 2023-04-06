import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const logsRouter = createTRPCRouter({
    getAll: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.storeStatusLogs.findMany();
    }),
});