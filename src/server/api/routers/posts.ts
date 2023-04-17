import { z } from "zod";
import { clerkClient } from "@clerk/nextjs/server";
import type { User } from "@clerk/nextjs/dist/api";

import { createTRPCRouter, privateProcedure, publicProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";

const filterUserForClient = (user: User) => {
    return { 
        id: user.id, 
        firstName: user.firstName, 
        lastName: user.lastName, 
        profileImageUrl: user.profileImageUrl 
    };
};

export const postsRouter = createTRPCRouter({
    getLatest: publicProcedure.query(async ({ ctx }) => {
        const posts = await ctx.prisma.posts.findMany({
            take: 100,
            orderBy: [{ createdAt: "desc" }],
        });

        const users = (
            await clerkClient.users.getUserList({
                userId: posts.map((post) => post.authorId),
                limit: 100,
            })
        ).map(filterUserForClient);

        return posts.map((post) => {
            const author = users.find((user) => user.id === post.authorId);

            if (!author)
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "Author for post not found",
                });

            return {
                post,
                author: users.find((user) => user.id === post.authorId),
                updatedAuthor: users.find((user) => user.id === post.updatedAuthorId),
            };
        });
    }),

    getUserPosts: publicProcedure.query(async ({ ctx }) => {
        const posts = await ctx.prisma.posts.findMany({
            where: {
                authorId: ctx.userId || "",
            },
            orderBy: [{ createdAt: "desc" }],
        });

        const users = (
            await clerkClient.users.getUserList({
                userId: posts.map((post) => post.authorId),
                limit: 100,
            })
        ).map(filterUserForClient);

        return posts.map((post) => {
            const author = users.find((user) => user.id === post.authorId);

            if (!author)
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "Author for post not found",
                });

            return {
                post,
                author: users.find((user) => user.id === post.authorId),
                updatedAuthor: users.find((user) => user.id === post.updatedAuthorId),
            };
        });
    }),

    getAll: publicProcedure.query(async ({ ctx }) => {
        const posts = await ctx.prisma.posts.findMany({
            orderBy: [{ createdAt: "desc" }],
        });

        const users = (
            await clerkClient.users.getUserList({
                userId: posts.map((post) => post.authorId),
                limit: 100,
            })
        ).map(filterUserForClient);

        return posts.map((post) => {
            const author = users.find((user) => user.id === post.authorId);

            if (!author)
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "Author for post not found",
                });

            return {
                post,
                author: users.find((user) => user.id === post.authorId),
                updatedAuthor: users.find((user) => user.id === post.updatedAuthorId),
            };
        });
    }),

    create: privateProcedure
        .input(
            z.object({
                title: z.string().min(1).max(280),
                topic: z.string().min(1).max(280),
                content: z.string().min(1),
                link: z.string().min(0).max(280)
            }),
        )
        .mutation(async ({ ctx, input }) => {
            const authorId = ctx.userId;
            
            const createPost = await ctx.prisma.posts.create({
                data: {
                    authorId,
                    title: input.title,
                    topic: input.topic,
                    content: input.content,
                    link: input.link
                },
            });

            return createPost;
        }),

    update: privateProcedure
        .input(
            z.object({
                id: z.number().min(1),
                title: z.string().min(1).max(280),
                topic: z.string().min(1).max(280),
                content: z.string().min(1),
                link: z.string().min(0).max(280),
            }),
        )
        .mutation(async ({ ctx, input }) => {
            const updatedAuthorId = ctx.userId;
            
            const updatePost = await ctx.prisma.posts.update({
                where: {
                    id: input.id,
                },
                data: {
                    updatedAuthorId: updatedAuthorId,
                    title: input.title,
                    topic: input.topic,
                    content: input.content,
                    link: input.link,
                },
            });

            return updatePost;
        }),

    delete: privateProcedure
        .input(
            z.object({
                id: z.number().min(1),
            }),
        )
        .mutation(async ({ ctx, input }) => {
            const deletePost = await ctx.prisma.posts.delete({
                where: {
                    id: input.id,
                }
            });

            return deletePost;
        }),
});