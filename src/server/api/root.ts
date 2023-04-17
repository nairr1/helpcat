import { createTRPCRouter } from "~/server/api/trpc";
import { logsRouter } from "./routers/logs";
import { postsRouter } from "./routers/Posts";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
    logs: logsRouter,
    posts: postsRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
