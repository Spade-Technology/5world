import { Proposal } from '@prisma/client'
import { Address, useContractWrite } from 'wagmi'
import { z } from 'zod'

import { api } from '~/utils/api'
import { InferArgs, InferReturn } from '~/utils/type'

import VDAOImplementation from '~/abi/VDAOImplementation.json'
import { currentChainId, currentContracts } from '~/config/contracts'
import { waitForTransaction, writeContract } from '@wagmi/core'
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

export const useProposalReads = api.proposal.getProposals.useQuery

export function useProposal(id: number, ids: number[], include: ProposalInclude = {}) {
  const proposalRead = useProposalRead(id, include)
  const proposalReads = useProposalReads({ ids, include })

  return { proposalRead, proposalReads }
}

export function useProposalAction(id: number) {
  const [isLoading, setIsLoading] = useState(false)

  // @param support The support value for the vote. 0=against, 1=for, 2=abstain
  const castVote = async (support: number) => {
    setIsLoading(true)
    const tx = await writeContract({
      address: currentContracts.proxiedVDao as Address,
      abi: VDAOImplementation,
      functionName: 'castVote',
      chainId: currentChainId,
      args: [id, support],
    }).catch(error => {
      notification.error({
        message: 'Error casting vote',
        description: error.shortMessage,
      })
    })

    if (tx) {
      await waitForTransaction({ hash: tx.hash, timeout: 10000, chainId: currentChainId, confirmations: 1 })
      notification.success({
        message: 'Vote cast',
        description: 'Your vote has been cast',
      })
    }

    setIsLoading(false)
  }

  const voteFor = async () => await castVote(1)
  const voteAgainst = async () => await castVote(0)
  const voteAbstain = async () => await castVote(2)

  return { voteFor, voteAgainst, voteAbstain, isLoading }
}

export function useCreateProposal() {
  const createProposalMutation = api.proposal.createProposal.useMutation()

  const createGrantProposalMutation = api.proposal.createGrantProposal.useMutation()
  const generateGrantIPFSHash = api.proposal.generateIPFSHash.useMutation()

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
  }): Promise<({ data: Proposal & {} } & InferReturn<typeof createProposalMutation.mutate>) | void> => {
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
        args: [targets, values, calldatas, calldatas, description],
      })
    } catch (e) {
      setIsLoading(false)
      console.error(e)
      return notification.error({
        message: 'Error creating proposal',
        description: (e as any)?.shortMessage || 'Unknown error',
      })
    }

    // just being typesafe, quite painful to look at.
    const transactionHash = result.hash as string
    const new_args: InferArgs<typeof mutation.mutate> = [
      {
        title,
        description,

        spells: targets,
        spellValues: values,
        spellCalldatas: calldatas,

        authorAddress: authorAddress,
        transactionHash,
      },
    ]

    setIsLoading(false)

    return createProposalMutation.mutateAsync(...new_args).then(el => {
      notification.success({
        message: 'Proposal created',
        description: 'Your proposal has been created',
      })
      return el
    }) as any
  }

  const createGrantProposal = async ({
    authorAddress,
    description,
    title,

    grantTitle,
    grantDescription,
    grantRules,
    grantAmount,
    grantToken,
    grantImage,
    grantTheme,
  }: {
    authorAddress: string
    description: string
    title: string

    grantTitle: string
    grantDescription: string
    grantRules: string
    grantAmount: string
    grantToken: string
    grantImage: string
    grantTheme: string
  }) => {
    setIsLoading(true)

    const hash = await generateGrantIPFSHash
      .mutateAsync({
        name: grantTitle,
        description: grantDescription,
        rules: grantRules,
        amount: grantAmount,
        token: grantToken,
        image: grantImage,
        theme: grantTheme,
        authorAddress,
      })
      .catch(e => {
        setIsLoading(false)
        console.error(e)
        return notification.error({
          message: 'Error creating proposal',
          description: 'Failed to generate IPFS hash',
        })
      })

    console.log(hash)

    setIsLoading(false)
  }

  return {
    createProposal,
    createProposalMutation,
    createGrantProposal,
    generateGrantIPFSHash,
    isLoading: isLoading || createProposalMutation.isLoading || createGrantProposalMutation.isLoading || generateGrantIPFSHash.isLoading,
  }
}
