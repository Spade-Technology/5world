import { Proposal } from '@prisma/client'
import { Address, useContractWrite } from 'wagmi'
import { z } from 'zod'

import { api } from '~/utils/api'
import { InferArgs, InferReturn } from '~/utils/type'

import VDAOImplementation from '~/abi/VDAOImplementation.json'
import { currentContracts } from '~/config/contracts'
import { writeContract } from '@wagmi/core'
import { notification } from 'antd'
import { useState } from 'react'
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
  const [isLoading, setIsLoading] = useState(false)

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
  }): Promise<({ data: Proposal & {} } & InferReturn<typeof mutation.mutate>) | void> => {
    setIsLoading(true)
    // check that calldatas, targets, and values are all the same length
    if (calldatas.length !== targets.length || targets.length !== values.length) {
      setIsLoading(false)
      console.error('calldatas, targets, and values must all be the same length')
      return notification.error({
        message: 'Error creating proposal',
        description: 'Calldatas, targets, and values must all be the same length',
      })
    }

    let result
    try {
      result = await writeContract({
        address: currentContracts.proxiedVDao as Address,
        abi: VDAOImplementation,
        functionName: 'propose',
        args: [targets, values, [''], calldatas, description],
      })
    } catch (e) {
      setIsLoading(false)
      console.error(e)
      return notification.error({
        message: 'Error creating proposal',
        description: e?.shortMessage || 'Unknown error',
      })
    }

    // just being typesafe, quite painful to look at.
    const transactionHash = result.hash as string
    const new_args: InferArgs<typeof mutation.mutate> = [
      {
        title,
        description,

        authorAddress: authorAddress,
        transactionHash,
      },
    ]

    setIsLoading(false)

    return mutation.mutate(...new_args) as any
  }

  return { createProposal, mutation, isLoading: isLoading || mutation.isLoading }
}
