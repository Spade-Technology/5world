import { Proposal } from '@prisma/client'
import { Address, useContractWrite } from 'wagmi'
import { z } from 'zod'

import { api } from '~/utils/api'
import { InferArgs, InferReturn } from '~/utils/type'

import VDAOImplementation from '~/abi/VDAOImplementation.json'
import { currentContracts } from '~/config/contracts'
import { writeContract } from '@wagmi/core'

/* Proposal schema */
interface ProposalInclude {
  pod?: boolean
  author?: boolean
}

export function useProposalRead(id: number, include: ProposalInclude = {}) {
  const schema = z.object({
    id: z.number(),
    include: z.object({
      pod: z.boolean().optional(),
      author: z.boolean().optional(),
    }),
  })
  schema.parse({ id, include })

  return api.proposal.getProposal.useQuery({ id, include })
}

export function useProposalReads(ids: number[], include: ProposalInclude = {}) {
  const schema = z.object({
    ids: z.array(z.number()),
    include: z
      .object({
        pod: z.boolean().optional(),
        author: z.boolean().optional(),
      })
      .optional(),
  })
  schema.parse({ ids, include })

  return api.proposal.getProposals.useQuery({ ids, include })
}

export function useProposal(id: number, ids: number[], include: ProposalInclude = {}) {
  const proposalRead = useProposalRead(id, include)
  const proposalReads = useProposalReads(ids, include)

  return { proposalRead, proposalReads }
}

export function useCreateProposal() {
  const mutation = api.proposal.createProposal.useMutation()

  const createProposal = async ({
    calldatas,
    targets,
    values,
    authorAddress,
    description,
    title,
  }: {
    calldatas: string[]
    targets: string[]
    values: bigint[]
    description: string
    title: string
    authorAddress: string
  }): Promise<{ data: Proposal & {} } & InferReturn<typeof mutation.mutate>> => {
    const result = await writeContract({
      address: currentContracts.vDAOImplementation as Address,
      abi: VDAOImplementation,
      functionName: 'propose',
      args: [targets, values, [], calldatas, description],
    })

    // just being typesafe, quite painful to look at.
    const transactionAddress = result.hash as string
    const new_args: InferArgs<typeof mutation.mutate> = [
      {
        authorAddress: authorAddress,
        transactionAddress,
      },
    ]

    return mutation.mutate(...new_args) as any
  }

  return { createProposal, mutation }
}
