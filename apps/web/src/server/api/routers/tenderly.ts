import { parseAbi } from 'viem'
import { z } from 'zod'
import { createTRPCRouter, protectedProcedure, publicProcedure } from '~/server/api/trpc'

export const tenderlyRouter = createTRPCRouter({
  getContractABI: protectedProcedure
    .input(
      z.object({
        // ...
      }),
    )
    .query(async ({ input: {} }) => {}),
})
