import { TRPCError } from '@trpc/server'
import { z } from 'zod'

import { createTRPCRouter, publicProcedure, protectedProcedure } from '~/server/api/trpc'

const includeZod = z
  .object({
    admins: z.boolean().optional(),
    members: z.boolean().optional(),
    discussions: z.boolean().optional(),
    proposals: z.boolean().optional(),
  })
  .optional()

export const podRouter = createTRPCRouter({
  getPod: publicProcedure
    .input(
      z.object({
        id: z.number(),
        include: includeZod,
      }),
    )
    .query(async ({ input: { id, include }, ctx: { prisma } }) => {
      const pod = await prisma.pod.findUnique({
        where: { id: id },
        include: include,
      })

      if (!pod) throw new TRPCError({ code: 'NOT_FOUND', message: 'Pod not found' })

      return pod
    }),

  getPods: publicProcedure
    .input(
      z.object({
        ids: z.array(z.number()).max(10, 'Too many ids').optional(),
        createdBy: z.string().optional(),
        include: includeZod,
      }),
    )
    .query(async ({ input: { ids, createdBy, include }, ctx: { prisma } }) => {
      const pods = await prisma.pod.findMany({
        ...(ids && ids.length > 0 && { where: { id: { in: ids } } }),
        ...(createdBy && { where: { createdBy: { address: createdBy } } }),
        include: include,
      })
      if (!pods) throw new Error('Pods not found')
      return pods
    }),

  // Add this to the existing podRouter
  createPod: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string(),
        members: z.array(z.string()),
        admins: z.array(z.string()),
        picture: z.string(),
      }),
    )
    .mutation(
      async ({
        input: { name, description, members, admins, picture },
        ctx: {
          prisma,
          session: { address },
        },
      }) => {
        if (!address) throw new TRPCError({ code: 'UNAUTHORIZED', message: 'User not found' })

        // Ensure admins are also members
        const allMembers = Array.from(new Set([...members, ...admins]))

        const newPod = await prisma.pod.create({
          data: {
            name,
            description,
            ,
            members: { connect: allMembers.map(address => ({ address })) },
            admins: { connect: admins.map(address => ({ address })) },
            createdBy: { connect: { address } },
            updatedBy: { connect: { address } },
          },
        })

        return newPod
      },
    ),

  editPod: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string().optional(),
        description: z.string().optional(),
        picture: z.string().optional(),
        members: z.array(z.string()).optional(),
        admins: z.array(z.string()).optional(),
        include: includeZod,
      }),
    )
    .mutation(
      async ({
        input: { id, name, description, picture, members, admins, include },
        ctx: {
          prisma,
          session: { address },
        },
      }) => {
        if (!address) throw new Error('User not found')

        // Check if the user is an admin of the pod
        const pod = await prisma.pod.findUnique({
          where: { id: id },
          include: { admins: true },
        })

        if (!pod) throw new Error('Pod not found')

        const isAdmin = pod.admins.some(admin => admin.address === address)

        if (!isAdmin) throw new Error('Only admins can edit the pod')

        // Ensure admins are also members
        const allMembers = members && admins ? Array.from(new Set([...members, ...admins])) : undefined

        const updateData: any = {
          name: name,
          description: description,
          picture: picture,
          updatedById: address,
        }

        if (allMembers) {
          updateData.members = {
            set: allMembers.map(address => ({ address })),
          }
        }

        if (admins) {
          updateData.admins = { set: admins.map(address => ({ address })) }
        }

        const updatedPod = await prisma.pod.update({
          where: { id: id },
          data: updateData,
          include: include,
        })

        return updatedPod
      },
    ),
})
