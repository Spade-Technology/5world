import { z } from 'zod'

import { Address, fetchBlockNumber, readContract } from '@wagmi/core'
import { verifyMessage } from 'viem'
import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc'

// src/abi/VDaoToken.json
import VDaoToken from '~/abi/VDaoToken.json'

import { User } from '@prisma/client'
import { TRPCError } from '@trpc/server'
import dayjs from 'dayjs'
import contracts, { currentChainId } from '~/config/contracts'
import { ApplicationTime, StewardUnit, TotalCycleTime } from '~/utils/stewardsConfig'

const VOTE_THRESHOLD = 1
const PAST_MONTHS = '6 MONTH'

export const stewardRouter = createTRPCRouter({
  getStewards: protectedProcedure.input(z.object({ search: z.string().optional() })).query(async ({ input: { search }, ctx: { prisma } }) => {
    const users = await prisma.user.findMany({
      where: {
        stewardApplicationDate: {
          gte: dayjs().subtract(6, 'month').toDate(),
        },
        stewardVotesAsCandidate: {
          some: {
            createdAt: {
              gte: dayjs().subtract(6, 'month').toDate(),
            },
          },
        },
      },
      include: {
        stewardVotesAsCandidate: { where: { createdAt: { gte: dayjs().subtract(6, 'month').toDate() } }, select: { tokenAmount: true } },
      },
    })

    // get the 6 users with the most votes
    return users
      .map(_user => {
        const { stewardVotesAsCandidate, ...user } = _user
        return { ...user, stewardVotesAsCandidate, votes: stewardVotesAsCandidate.reduce((acc, vote) => acc + vote.tokenAmount, 0n) }
      })
      .sort((a, b) => Number(b.votes) - Number(a.votes))
      .slice(0, 6) as User[]
  }),

  getSteward: protectedProcedure.input(z.object({ address: z.string() })).query(async ({ input: { address }, ctx: { prisma } }) => {
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

      const currentBlock = await fetchBlockNumber({
        chainId: currentChainId,
      })

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
      const now = dayjs()

      const sinceStart = now.diff(dayjs().startOf('year'), StewardUnit)
      const cycle = sinceStart % TotalCycleTime.as(StewardUnit)

      if (cycle < ApplicationTime.as(StewardUnit)) {
        throw new TRPCError({ code: 'UNAUTHORIZED', message: 'voting is not open yet' })
      }

      // check if the message is valid
      if (!message.includes(voterAddress) || !message.includes(candidateAddress)) throw new Error('Invalid message')

      // check if the signature is valid
      try {
        const valid = verifyMessage({ address: voterAddress as Address, message, signature: signature as any })
        if (!valid) throw new Error('Invalid signature')
      } catch (error) {
        throw new Error('Invalid signature')
      }

      // get other votes from the same voter for this cycle and candidate
      const votes = await prisma.stewardVote.findMany({
        where: {
          voter: { address: voterAddress },
          candidate: { address: candidateAddress },
          createdAt: { gte: dayjs().subtract(6, 'month').toDate() },
        },
      })

      const newVoteAmount = BigInt(JSON.parse('{' + message.split('{')[1]).amount)
      const totalVoted = votes.reduce((acc, vote) => acc + vote.tokenAmount, 0n)

      // get closest block to current time
      const applyBlock = (await prisma.user.findUnique({ where: { address: candidateAddress } }))?.stewardApplicationBlock

      if (!applyBlock) throw new TRPCError({ code: 'UNAUTHORIZED', message: "the candidate hasn't applied to be a steward" })

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

      if (typeof tokenAmountAtApplicationBlock !== 'bigint') return new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'invalid token amount' })

      if (totalVoted + newVoteAmount > tokenAmountAtApplicationBlock)
        return new TRPCError({
          code: 'UNAUTHORIZED',
          message:
            "you cannot vote more than you hold, you've already voted " +
            totalVoted +
            ' (+' +
            newVoteAmount +
            ') but you only held ' +
            tokenAmountAtApplicationBlock +
            ' at the time of the candidate application',
        })

      const vote = await prisma.stewardVote.create({
        data: {
          voter: { connect: { address: voterAddress } },
          candidate: { connect: { address: candidateAddress } },
          tokenAmount: BigInt(JSON.parse('{' + message.split('{')[1]).amount),
        },
      })

      return vote
    }),

  getElections: protectedProcedure
    .input(
      z.object({
        search: z.string().optional(),
      }),
    )
    .query(async ({ input: { search }, ctx: { prisma } }) => {
      const sixMonthsAgo = dayjs().subtract(6, 'month').toDate()

      const users = await prisma.user.findMany({
        ...(search && { where: { address: { contains: search } } }),
        where: {
          stewardApplicationBlock: { not: null },
          stewardApplicationDate: { gte: sixMonthsAgo },
        },
        include: {
          _count: true,
          stewardVotesAsCandidate: true,
        },
        take: 10,
      })
      if (!users || users.length === 0) throw new TRPCError({ code: 'NOT_FOUND', message: 'no elections found' })
      return users
    }),
})
