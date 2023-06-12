import { Address, verifyMessage } from 'viem'
import { z } from 'zod'

import { createTRPCRouter, publicProcedure, protectedProcedure } from '~/server/api/trpc'

export const manifestoRouter = createTRPCRouter({
  sign: protectedProcedure.input(z.object({ eoa: z.string(), signature: z.string(), message: z.string() })).mutation(async ({ input: { eoa, signature, message }, ctx: { prisma } }) => {
    if (!message.includes('I agree to the terms of the Manifesto of the VDAO Project.')) throw new Error('Invalid message')

    const valid = verifyMessage({ address: eoa as Address, message, signature: signature as Address })
    if (!valid) throw new Error('Invalid signature')

    await prisma.signatures.upsert({
      where: { eoa },
      update: { eoa, signature, message },
      create: { eoa, signature, message },
    })

    return {
      eoa,
      signature,
      message,
    }
  }),
})
