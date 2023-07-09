import { createTRPCRouter } from '~/server/api/trpc'
import { manifestoRouter } from '~/server/api/routers/manifesto'
import { userRouter } from './routers/user'
import { podRouter } from './routers/pod'
import { proposalRouter } from './routers/proposal'
import { stewardRouter } from './routers/stewards'
import { etherscanRouter } from './routers/etherscan'
import { tenderlyRouter } from './routers/tenderly'

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  manifesto: manifestoRouter,
  user: userRouter,
  pod: podRouter,
  proposal: proposalRouter,
  steward: stewardRouter,
  etherscan: etherscanRouter,
  tenderly: tenderlyRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
