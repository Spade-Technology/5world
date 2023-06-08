/** server/uploadthing.ts */
import type { NextApiRequest, NextApiResponse } from 'next'
import { createUploadthing, type FileRouter } from 'uploadthing/next-legacy'
import auth from '~/pages/api/auth/[...nextauth]'

const f = createUploadthing()

export const fileRouter = {
  imageUploader: f({ image: { maxFileSize: '8MB' } })
    .middleware(async (req, res) => {
      const user = await auth(req as NextApiRequest, res as NextApiResponse)
      if (!user) throw new Error('Unauthorized')

      return { userId: user.id }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log('Upload complete for userId:', metadata.userId)

      console.log('file url', file.url)
    }),
} satisfies FileRouter

export type fileRouter = typeof fileRouter
