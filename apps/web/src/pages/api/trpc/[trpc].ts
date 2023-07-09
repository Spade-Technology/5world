import { createNextApiHandler } from '@trpc/server/adapters/next'

import { env } from '~/env.mjs'
import { createTRPCContext } from '~/server/api/trpc'
import { appRouter } from '~/server/api/root'

// export API handler
export default createNextApiHandler({
  router: appRouter,
  createContext: createTRPCContext,
  onError:
    env.NODE_ENV === 'development'
      ? ({ path, error }) => {
          console.error(`❌ tRPC failed on ${path ?? '<no-path>'}: ${error.message}`)
        }
      : undefined,
  responseMeta(opts) {
    const { ctx, paths, errors, type } = opts

    // checking that no procedures errored
    const allOk = errors.length === 0

    // checking we're doing a query request
    const isQuery = type === 'query'

    // checking that all procedures are public
    const allPublic = ctx?.session?.user === undefined

    if (ctx?.res && allOk && isQuery) {
      // cache request for 1 day + revalidate once every second
      const ONE_DAY_IN_SECONDS = 60 * 60 * 24

      return {
        headers: {
          'cache-control': `s-maxage=10, stale-while-revalidate=${ONE_DAY_IN_SECONDS}`,
        },
      }
    }
    return {}
  },
})
