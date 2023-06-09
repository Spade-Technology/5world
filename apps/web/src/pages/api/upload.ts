import { createNextPageApiHandler } from 'uploadthing/next-legacy'

import { fileRouter } from '~/server/fileRouter'

const handler = createNextPageApiHandler({
  router: fileRouter,
})

export default handler
