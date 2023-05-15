import { z } from 'zod'

import { createTRPCRouter, publicProcedure, protectedProcedure } from '~/server/api/trpc'

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
        addresses: z.array(z.string()).max(10, 'Too many addresses'),
        include: includeZod,
      }),
    )
    .query(async ({ input: { addresses, include }, ctx: { prisma } }) => {
      const users = await prisma.user.findMany({
        where: { address: { in: addresses } },
        include: include,
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
})
