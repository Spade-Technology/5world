import { z } from 'zod'

import { createTRPCRouter, publicProcedure, protectedProcedure } from '~/server/api/trpc'
import RoundFactory from '~/abi/RoundFactory.json'
import RoundImplementation from '~/abi/RoundImplementation.json'
import { fetchTransaction, readContract, readContracts, waitForTransaction } from '@wagmi/core'
import { Address, decodeEventLog } from 'viem'
import { TRPCError } from '@trpc/server'
import { currentChainId, currentContracts } from '~/config/contracts'
import { log } from 'console'

export const grantRouter = createTRPCRouter({
  getGrants: publicProcedure.query(async ({ ctx: { prisma } }) => {
    let savedGrants = await prisma.grant.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: 10,
    })

    const latestGrant = await readContract({
      abi: RoundFactory as any,
      address: currentContracts.roundFactory as Address,
      functionName: 'latestRoundContract',
      args: [],
    })

    // if the latest grant is not saved, save it
    if ((latestGrant as any) !== '0x0000000000000000000000000000000000000000' && !savedGrants.find(grant => grant.address === (latestGrant as any))) {
      const latestGrantData = await readContract({
        abi: RoundImplementation as any,
        address: latestGrant as any,
        chainId: currentChainId,
        functionName: 'RoundInformation',
        args: [],
      })

      const RoundIPFS = await fetch('https://gateway.pinata.cloud/ipfs/' + (latestGrantData[9] as any).pointer)
      const roundIpfs = (await RoundIPFS.json()).content

      const new_el = await prisma.grant.create({
        data: {
          address: latestGrant as any,

          title: roundIpfs.name,
          description: roundIpfs.description,
          rules: roundIpfs.rules,

          token: roundIpfs.token,
          amount: BigInt(roundIpfs.amount),

          logo: roundIpfs.image,
          theme: roundIpfs.theme,

          roundPtr: (latestGrantData[9] as any).pointer,
          applicationsPtr: (latestGrantData[10] as any).pointer,
        },
      })

      savedGrants.unshift(new_el)
    }

    const savedGrantsMetaDataUnparsed = await readContracts({
      contracts: [
        ...savedGrants.map(grant => ({
          abi: RoundImplementation as any,
          address: grant.address as any,
          chainId: currentChainId,
          functionName: 'RoundInformation',
          args: [],
        })),
      ],
    })

    const savedGrantsMetaData = parseGrantMetata(savedGrantsMetaDataUnparsed)

    savedGrants = savedGrants.map((grant, i) => ({
      ...grant,
      ...savedGrantsMetaData[i],
    }))

    return savedGrants
  }),

  getGrant: publicProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .query(async ({ input: { id }, ctx: { prisma } }) => {
      const grant = await prisma.grant.findUnique({
        where: { id: id },
      })

      if (!grant) throw new Error('Grant not found')

      const grantDataUnParsed = await readContract({
        abi: RoundImplementation as any,
        address: grant.address as any,
        chainId: currentChainId,
        functionName: 'RoundInformation',
        args: [],
      })

      const grantData = parseGrantMetata([{ result: grantDataUnParsed }])

      const RoundIPFS = await fetch('https://gateway.pinata.cloud/ipfs/' + (grantDataUnParsed[9] as any).pointer)
      const roundIpfs = (await RoundIPFS.json()).content

      return {
        ...grant,
        ...roundIpfs,
        ...grantData[0],
      }
    }),

  generateIPFSHash: protectedProcedure
    .input(
      z.object({
        authorAddress: z.string(),
        name: z.string(),
        description: z.string(),
        address: z.string(),

        image: z.string(),
        theme: z.string(),

        socials: z.object({
          twitter: z.string().optional(),
          telegram: z.string().optional(),
          discord: z.string().optional(),
          github: z.string().optional(),
          website: z.string().optional(),
        }),
      }),
    )
    .mutation(async ({ input, ctx: { prisma } }) => {
      const ipfs = await fetch('https://api.pinata.cloud/pinning/pinJSONToIPFS', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + process.env.PINATA_API_JWT,
        },
        body: JSON.stringify({
          content: {
            external_url: 'https://vdao.app',
            ...input,
          },
        }),
      })

      return ipfs.json()
    }),
})

function parseGrantMetata(savedGrantsMetaDataUnparsed: ({ error?: Error; result?: undefined; status?: 'failure' } | { error?: undefined; result?: unknown[]; status?: 'success' })[]) {
  return savedGrantsMetaDataUnparsed.map((grant: any, i) => ({
    applicationsStartBlock: grant.result[0],
    applicationsEndBlock: grant.result[1],
    roundStartBlock: grant.result[2],
    roundEndBlock: grant.result[3],
    proposalCount: grant.result[4],
    totalQuadraticVotes: grant.result[7],
    state: grant.result[8],
  }))
}
