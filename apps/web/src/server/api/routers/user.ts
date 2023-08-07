import { TRPCError } from '@trpc/server'
import { z } from 'zod'

import { createTRPCRouter, publicProcedure, protectedProcedure } from '~/server/api/trpc'
import { verifySiweMessage } from '~/server/auth'

const includeZod = z
  .object({
    podsAsMember: z.boolean().optional(),
    podsAsAdmin: z.boolean().optional(),
    proposals: z.boolean().optional(),
    guild: z.boolean().optional(),
    stewardVotesAsCandidate: z.boolean().optional(),
    stewardVotesAsVoter: z.boolean().optional(),
  })
  .optional()

export const userRouter = createTRPCRouter({
  getUser: publicProcedure
    .input(
      z.object({
        address: z.string(),
        include: includeZod,
      }),
    )
    .query(async ({ input: { address, include }, ctx: { prisma } }) => {
      const user = await prisma.user.findUnique({
        where: { address: address },
        include: include,
      })

      if (!user) throw new Error('User not found')

      return user
    }),

  getUsers: publicProcedure
    .input(
      z.object({
        search: z.string().optional(),
        addresses: z.array(z.string()).max(10, 'Too many addresses').optional(),
        include: includeZod,
      }),
    )
    .query(async ({ input: { addresses, search, include }, ctx: { prisma } }) => {
      const users = await prisma.user.findMany({
        ...(addresses && addresses.length > 0 && { where: { address: { in: addresses } } }),
        ...(search && {
          where: {
            OR: [{ name: { contains: search } }, { address: { contains: search } }],
          },
        }),
        include: include,
        take: 10,
      })
      if (!users || users.length === 0) throw new Error('Users not found')
      return users
    }),

  editUser: protectedProcedure
    .input(
      z.object({
        name: z.string().optional(),
        description: z.string().optional(),
        picture: z.string().optional(),
        include: includeZod,
      }),
    )
    .mutation(
      async ({
        input: { name, description, picture, include },
        ctx: {
          prisma,
          session: { address },
        },
      }) => {
        // address is safe if it exists thansk to the protectedProcedure middleware
        if (!address) throw new Error('User not found')

        const updatedUser = await prisma.user.update({
          where: { address: address },
          data: { name: name, description: description, picture: picture },
          include: include,
        })

        return updatedUser
      },
    ),

  register: publicProcedure
    .input(
      z.object({
        address: z.string(),
        name: z.string(),
        description: z.string(),
        picture: z.string(),

        message: z.string(),
        signature: z.string(),
      }),
    )
    .mutation(async ({ input: { address, name, description, picture, message, signature }, ctx: { prisma, req } }) => {
      const siwe = await verifySiweMessage({ message, signature }, req)

      if (siwe && siwe.address !== address) return new TRPCError({ code: 'BAD_REQUEST', message: 'Invalid address' })

      // If the message is invalid, bad request
      if (!siwe) return new TRPCError({ code: 'BAD_REQUEST', message: 'Invalid message' })

      // Fetch user by address
      let user = await prisma.user.findUnique({
        where: { address: siwe.address },
      })

      // If user already exists, bad request
      if (user) return new TRPCError({ code: 'BAD_REQUEST', message: 'User already exists' })

      // Create the user
      user = await prisma.user.create({
        data: {
          address: siwe.address,
          name: name,
          description: description,
          picture: picture,
        },
      })
    }),
})
