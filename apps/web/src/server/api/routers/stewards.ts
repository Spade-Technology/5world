import { z } from 'zod'

import { Sql, sqltag } from '@prisma/client/runtime'
import { Address, fetchBlockNumber, readContract } from '@wagmi/core'
import { verifyMessage } from 'viem'
import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc'

// src/abi/VDaoToken.json
import VDaoToken from '~/abi/VDaoToken.json'

import { TRPCError } from '@trpc/server'
import contracts from '~/config/contracts'
import { User } from '@prisma/client'

const VOTE_THRESHOLD = 1
const PAST_MONTHS = '6 MONTH'

export const stewardRouter = createTRPCRouter({
  getStewards: protectedProcedure
    .input(z.object({ search: z.string().optional() }))
    .query(async ({ input: { search }, ctx: { prisma } }) => {
      const searchQuery = search ? `${search}` : ''

      let stewards

      if (search) {
        stewards = await prisma.$queryRaw`
          SELECT "User".* 
          FROM "User" 
          -- include Guild
          LEFT JOIN "StewardVote" 
          ON "User".address = "StewardVote"."candidateAddress" 
          WHERE ( 
            "User".address LIKE ${search} OR 
            "User".name LIKE ${search} OR 
            "User".description LIKE ${search}
          ) 
          AND "StewardVote"."createdAt" >= (NOW() - INTERVAL '${PAST_MONTHS}')
          GROUP BY "User".address 
          
          -- HAVING COUNT("StewardVote"."id") >= ${VOTE_THRESHOLD}
          `
      } else {
        stewards = await prisma.$queryRaw`
          SELECT "User".* 
          FROM "User" 
          LEFT JOIN "StewardVote" 
          ON "User".address = "StewardVote"."candidateAddress"
          AND "StewardVote"."createdAt" >= (NOW() - INTERVAL '${PAST_MONTHS}')
          GROUP BY "User".address 
          -- HAVING COUNT("StewardVote"."id") >= ${VOTE_THRESHOLD}
          `
      }

      return stewards as User[]
    }),

  getSteward: protectedProcedure
    .input(z.object({ address: z.string() }))
    .query(async ({ input: { address }, ctx: { prisma } }) => {
      const steward = await prisma.user.findUnique({
        where: { address },
        include: {
          _count: {
            select: {
              createdPods: true,
              createdProposals: true,

              stewardVotesAsVoter: true,
              stewardVotesAsCandidate: true,

              podsAsAdmin: true,
              podsAsMember: true,
            },
          },
        },
      })
      return steward
    }),

  applyToBeSteward: protectedProcedure.mutation(
    async ({
      ctx: {
        prisma,
        session: { user, address },
      },
    }) => {
      if (!user || !address) throw new TRPCError({ code: 'UNAUTHORIZED', message: 'user not found' })

      const currentBlock = await fetchBlockNumber()

      if (!currentBlock) {
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'could not fetch current block' })
      }

      user = await prisma.user.update({
        where: { address },
        data: { stewardApplicationDate: new Date(), stewardApplicationBlock: currentBlock.toString() },
      })

      return user
    },
  ),

  vote: protectedProcedure
    .input(
      z.object({
        // voting
        voterAddress: z.string(),
        candidateAddress: z.string(),

        // signature
        signature: z.string(),
        message: z.string(),
      }),
    )
    .mutation(async ({ input: { voterAddress, candidateAddress, signature, message }, ctx: { prisma } }) => {
      // check if the message is valid
      if (!message.includes(`${voterAddress} is voting for ${candidateAddress} as a steward.`))
        throw new Error('Invalid message')

      // check if the signature is valid
      try {
        const valid = verifyMessage({ address: voterAddress as Address, message, signature: signature as any })
        if (!valid) throw new Error('Invalid signature')
      } catch (error) {
        throw new Error('Invalid signature')
      }

      // get closest block to current time
      const applyBlock = (await prisma.user.findUnique({ where: { address: candidateAddress } }))
        ?.stewardApplicationBlock

      if (!applyBlock)
        throw new TRPCError({ code: 'UNAUTHORIZED', message: "the candidate hasn't applied to be a steward" })

      const tokenAmountAtApplicationBlock = await readContract({
        address: contracts.sepolia.vDao as Address,
        abi: VDaoToken,
        functionName: 'getPriorBalance',
        args: [voterAddress, applyBlock],
      })

      if (!tokenAmountAtApplicationBlock)
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'you did not hold any tokens at the time of the candidate application',
        })

      const vote = await prisma.stewardVote.create({
        data: {
          voter: { connect: { address: voterAddress } },
          candidate: { connect: { address: candidateAddress } },
          tokenAmount: tokenAmountAtApplicationBlock as string,
        },
      })

      return vote
    }),
})
