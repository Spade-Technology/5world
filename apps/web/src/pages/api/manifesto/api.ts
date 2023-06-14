import { sqltag } from '@prisma/client/runtime'
import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '~/server/db'

export default async function getManifestoData(req: NextApiRequest, res: NextApiResponse) {
  const data: any[] = await prisma.$queryRaw(sqltag`
        SELECT 
          (SELECT COUNT(*) FROM "Signatures") as total,
          t."eoa", 
          t."signature", 
          t."createdAt"
        FROM (
          SELECT "eoa", "signature", "createdAt"
          FROM "Signatures"
          ORDER BY "createdAt" DESC
          LIMIT 10
        ) as t
      `)

  if (!data) return { notFound: true }

  // Constructing the result object
  const list = data.map(item => ({
    eoa: item.eoa,
    signature: item.signature,
    createdAt: item.createdAt.toString(),
  }))

  res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=86400')

  res.status(200).json({
    total: Number(data[0]?.total),
    list,
  })
}
