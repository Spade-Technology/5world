import { z } from 'zod'

import { createTRPCRouter, publicProcedure, protectedProcedure } from '~/server/api/trpc'
import VDAOImplementation from '~/abi/VDAOImplementation.json'
import { fetchTransaction, waitForTransaction } from '@wagmi/core'
import { Address, decodeEventLog } from 'viem'
import { TRPCError } from '@trpc/server'
import contracts, { currentContracts } from '~/config/contracts'

const includeZod = z
  .object({
    pod: z.boolean().optional(),
    author: z.boolean().optional(),
  })
  .optional()

export const proposalRouter = createTRPCRouter({
  getProposal: publicProcedure
    .input(
      z.object({
        id: z.number(),
        include: includeZod,
      }),
    )
    .query(async ({ input: { id, include }, ctx: { prisma } }) => {
      const proposal = await prisma.proposal.findUnique({
        where: { id: id },
        include: include,
      })
      if (!proposal) throw new Error('Proposal not found')
      return proposal
    }),

  getProposals: publicProcedure
    .input(
      z.object({
        ids: z.array(z.number()).max(10, 'Too many ids').optional(),
        include: includeZod,
      }),
    )
    .query(async ({ input: { ids, include }, ctx: { prisma } }) => {
      const proposals = await prisma.proposal.findMany({
        ...(ids && { where: { id: { in: ids } } }),
        include: include,
        take: 10,
      })
      if (!proposals || proposals.length === 0) throw new Error('Proposals not found')
      return proposals
    }),

  createProposal: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
        picture: z.string().optional(),
        podId: z.number().optional(),
        transactionHash: z.string(),
        authorAddress: z.string(),
        include: includeZod,

        spells: z.array(z.string()).max(10, 'Too many spells'),
        spellValues: z.array(z.bigint()).max(10, 'Too many spell values'),
        spellCalldatas: z.array(z.string()).max(10, 'Too many spell calldatas'),
      }),
    )
    .mutation(
      async ({
        input: { podId, authorAddress, transactionHash, include, title, description, picture, spells, spellValues, spellCalldatas },
        ctx: {
          prisma,
          session: { address },
        },
      }) => {
        if (!address) throw new Error('User not found')

        const transaction = await waitForTransaction({ hash: transactionHash as Address })
        if (!transaction) throw new TRPCError({ code: 'NOT_FOUND', message: 'Transaction not found' })

        const logs = transaction.logs || []
        if (logs.length === 0 || !logs[0]?.topics) throw new TRPCError({ code: 'NOT_FOUND', message: 'Log not found' })

        const txEvent = decodeEventLog({
          abi: VDAOImplementation,
          eventName: 'ProposalCreated',
          topics: logs[0].topics,
          data: logs[0].data,
        })

        if (!txEvent) throw new TRPCError({ code: 'NOT_FOUND', message: 'Event not found' })
        if ((txEvent.args as any).description !== description) throw new TRPCError({ code: 'BAD_REQUEST', message: 'Description does not match' })
        if (
          !Object.values(currentContracts)
            .map(el => el.toLowerCase())
            .includes(transaction.to?.toLowerCase() as Address)
        )
          throw new TRPCError({ code: 'BAD_REQUEST', message: 'Transaction not sent to VDAO' })

        // all good
        const newProposal = await prisma.proposal.create({
          data: {
            id: Number((txEvent.args as any).id),
            title,
            description,
            picture,

            spells,
            spellValues,
            spellCalldatas,

            ...(podId && { pod: { connect: { id: podId } } }),

            author: { connect: { address: authorAddress } },
            transactionHash: transactionHash,

            createdBy: { connect: { address } },
            updatedBy: { connect: { address } },
          },
          include: include,
        })

        return newProposal
      },
    ),
})
