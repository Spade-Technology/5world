import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '~/server/db'

export default async function getManifestoData(req: NextApiRequest, res: NextApiResponse) {
  // req.query = { account: string }

  console.log(req.query.eoa)

  const data: any[] = await prisma.$queryRaw`
        SELECT 
          (SELECT COUNT(*) FROM "Signatures") as total,
          (SELECT COUNT(*) FROM "Signatures" WHERE "eoa" = ${req.query.eoa}) as hasSigned,
          t."eoa", 
          t."signature", 
          t."createdAt"
        FROM (
          SELECT "eoa", "signature", "createdAt"
          FROM "Signatures"
          ORDER BY "createdAt" DESC
          LIMIT 10
        ) as t
      `

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
    hasSigned: data[0]?.hassigned > 0n,
  })
}
