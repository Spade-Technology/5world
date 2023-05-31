import { parseAbi } from 'viem'
import { z } from 'zod'
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc'

export type abiItem = {
  name: string
  type: string
  stateMutability: string
  payable: boolean
  inputs: {
    name: string
    type: string
    internalType: string
  }[]
  outputs?: {
    name: string
    type: string
    internalType: string
  }[]
  constant?: boolean
}

export const etherscanRouter = createTRPCRouter({
  getContractABI: publicProcedure
    .input(
      z.object({
        contractAddress: z.string(),
      }),
    )
    .query(async ({ input: { contractAddress } }) => {
      const etherscanAPIKey = process.env.ETHERSCAN_API_KEY
      const addr = `https://api.etherscan.io/api?module=contract&action=getabi&address=${contractAddress}&apikey=${etherscanAPIKey}`

      const response = await fetch(
        // https://api.etherscan.io/api?module=contract&action=getabi&address=0xBB9bc244D798123fDe783fCc1C72d3Bb8C189413&apikey=YourApiKeyToken
        `https://api.etherscan.io/api?module=contract&action=getabi&address=${contractAddress}&apikey=${etherscanAPIKey}`,
      )

      if (!response.ok) throw new Error('Failed to fetch ABI')
        
      const json = await response.json()
       
      if (json.status !== '1') throw new Error('Failed to get ABI from Etherscan')

      return JSON.parse(json.result) as abiItem[]
    }),
})
