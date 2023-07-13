import { z } from 'zod'
import { currentChainId, currentContracts } from '~/config/contracts'
import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc'

export const tenderlyRouter = createTRPCRouter({
  simulateProposal: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        spell: z.number(),
      }),
    )
    .mutation(async ({ input: { id, spell }, ctx: { prisma } }) => {
      const { TENDERLY_USER, TENDERLY_PROJECT, TENDERLY_ACCESS_KEY, TENDERLY_TTL } = process.env
      const proposal = await prisma.proposal.findUnique({
        where: { id: id },
        include: { simulation: true },
      })

      if (!proposal) throw new Error('Proposal not found')

      const { simulation } = proposal

      const resp = await fetch(
        `https://api.tenderly.co/api/v1/account/${TENDERLY_USER}/project/${TENDERLY_PROJECT}/simulate`,
        // the transaction
        {
          method: 'POST',
          headers: { 'X-Access-Key': TENDERLY_ACCESS_KEY as string },

          body: JSON.stringify({
            /* Simulation Configuration */
            save: true, // if true simulation is saved and shows up in the dashboard
            save_if_fails: true, // if true, reverting simulations show up in the dashboard
            simulation_type: 'full', // full or quick (full is default)

            network_id: currentChainId, // network to simulate on

            /* Standard EVM Transaction object */
            from: currentContracts.timelock,
            to: proposal.spells[spell],
            input: proposal.spellCalldatas[spell],
            gas: 8000000,
            gas_price: 0,
            value: proposal.spellValues[spell]?.toString(),
          }),
        },
      )

      const url = 'https://dashboard.tenderly.co/' + TENDERLY_USER + '/' + TENDERLY_PROJECT + '/simulator/' + (await resp.json()).simulation.id

      if (!simulation || simulation.length === 0) {
        const simulate = proposal.spells.map((spell, spellIndex) => ({
          spellIndex,
          url: '',
          createdAt: new Date(0),
        }))
        console.log(simulate)
        await prisma.proposal.update({
          where: { id: id },
          data: {
            simulation: {
              createMany: {
                data: simulate,
              },
            },
          },
        })
      } else {
        await prisma.proposal.update({
          where: { id: id },

          data: {
            simulation: {
              updateMany: {
                where: { spellIndex: spell },
                data: { url: url, createdAt: new Date() },
              },
            },
          },
        })
      }
      return url
    }),
})
