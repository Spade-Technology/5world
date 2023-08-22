import { Proposal } from '@prisma/client'
import { Address, useAccount, useBlockNumber } from 'wagmi'
import { z } from 'zod'

import { api } from '~/utils/api'
import { InferArgs, InferReturn } from '~/utils/type'

import { waitForTransaction, writeContract } from '@wagmi/core'
import { notification } from 'antd'
import { useState } from 'react'
import { encodeAbiParameters, encodePacked } from 'viem'
import RoundFactoryAbi from '~/abi/RoundFactory.json'
import VDAOImplementation from '~/abi/VDAOImplementation.json'
import { currentChainId, currentContracts } from '~/config/contracts'

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
  const castVote = async (support: number, callback?: (successful: boolean) => {}) => {
    setIsLoading(true)
    const tx = await writeContract({
      address: currentContracts.proxiedVDao as Address,
      abi: VDAOImplementation,
      functionName: 'castVote',
      chainId: currentChainId,
      args: [id, support],
    })
      .then(tx => {
        notification.info({
          message: 'Transaction sent',
          description: 'waiting for the transaction receipt. do not leave the page.',
        })

        return tx
      })
      .catch(error => {
        callback?.(false)
        notification.error({
          message: 'Error casting vote',
          description: error.shortMessage,
        })
      })
      .finally(() => {
        setIsLoading(false)
      })

    if (tx) {
      await waitForTransaction({ hash: tx.hash, timeout: currentContracts.blockTime * 1000 + 3000, chainId: currentChainId, confirmations: 1 })
      notification.success({
        message: 'Vote cast',
        description: 'Your vote has been cast',
      })
    }

    callback?.(true)
    setIsLoading(false)
  }

  const voteFor = async (callback?: (successful: boolean) => {}) => await castVote(1, callback)
  const voteAgainst = async (callback?: (successful: boolean) => {}) => await castVote(0, callback)
  const voteAbstain = async (callback?: (successful: boolean) => {}) => await castVote(2, callback)

  return { voteFor, voteAgainst, voteAbstain, isLoading }
}

export function useCreateProposal() {
  const createProposalMutation = api.proposal.createProposal.useMutation()

  const createGrantProposalMutation = api.proposal.createGrantProposal.useMutation()
  const generateGrantIPFSHash = api.proposal.generateIPFSHash.useMutation()

  const [isLoading, setIsLoading] = useState(false)
  const { address } = useAccount()
  const { data, isLoading: isBlocksLoading } = useBlockNumber()

  const createProposal = async ({
    calldatas,
    targets,
    signatures,
    values,
    authorAddress,
    description,
    title,
    callback,
  }: {
    calldatas: string[]
    targets: string[]
    signatures: string[]
    values: bigint[]
    description: string
    title: string
    authorAddress: string
    callback?: (successful: boolean) => void
  }): Promise<({ data: Proposal & {} } & InferReturn<typeof createProposalMutation.mutate>) | void> => {
    setIsLoading(true)
    // check that calldatas, targets, and values are all the same length
    if (calldatas.length !== targets.length || targets.length !== values.length) {
      callback?.(false)
      setIsLoading(false)
      console.error('calldatas, targets, and values must all be the same length')
      return notification.error({
        message: 'Error creating proposal',
        description: 'Calldatas, targets, and values must all be the same length',
      })
    }

    let result
    console.log(signatures, calldatas)
    try {
      result = await writeContract({
        address: currentContracts.proxiedVDao as Address,
        abi: VDAOImplementation,
        functionName: 'propose',
        args: [targets, values, signatures, calldatas, description],
      }).then(tx => {
        notification.info({
          message: 'Transaction sent',
          description: 'waiting for the transaction receipt. do not leave the page.',
        })

        return tx
      })
    } catch (e) {
      callback?.(false)
      setIsLoading(false)
      return notification.error({
        message: 'Error creating proposal',
        description: (e as any)?.shortMessage || 'Unknown error',
      })
    }

    // just being typesafe, quite painful to look at.
    const transactionHash = result.hash as string
    const new_args: InferArgs<typeof createProposalMutation.mutate> = [
      {
        title,
        description,

        spells: targets,
        spellValues: values,
        spellSignatures: signatures,
        spellCalldatas: calldatas,

        authorAddress: authorAddress,
        transactionHash,
      },
    ]

    return createProposalMutation.mutateAsync(...new_args).then(el => {
      notification.success({
        message: 'Proposal created',
        description: 'Your proposal has been created',
      })
      return el
    }) as any

    callback?.(true)
    setIsLoading(false)
  }

  const createGrantProposal = async ({
    authorAddress,
    description,
    title,

    grantTitle,
    grantDate,
    grantDescription,
    grantRules,
    grantAmount,
    grantToken,
    grantImage,
    grantTheme,

    callback,
  }: {
    authorAddress: string
    description: string
    title: string

    grantTitle: string
    grantDate: Date
    grantDescription: string
    grantRules: string
    grantAmount: string
    grantToken: string
    grantImage: string
    grantTheme: string

    callback?: (successful: boolean) => void
  }) => {
    setIsLoading(true)

    const IPFSHash = await generateGrantIPFSHash
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
        callback?.(false)
        setIsLoading(false)
        console.error(e)
        return notification.error({
          message: 'Error creating proposal',
          description: 'Failed to generate IPFS hash',
        })
      })

    if (!grantDate) return notification.error({ message: 'Error', description: 'Please select a date', placement: 'bottomRight' })

    const spell = currentContracts?.roundFactory
    const abi = RoundFactoryAbi

    const functionName = 'create'
    const signature = 'create(bytes)'
    const signature_proposal = 'fundGrantRound(address,uint256)'

    const currentBlockTimeToNextBlock = currentContracts.blockTime
    const currentBlock = data

    // prod
    // const startApplicationBlock = (grantDate?.getTime() / 1000 - Date.now() / 1000) / currentBlockTimeToNextBlock + Number(currentBlock)
    // const endApplicationBlock = startApplicationBlock + (7 * 24 * 60 * 60) / currentBlockTimeToNextBlock
    // const startRoundBlock = endApplicationBlock
    // const endRoundBlock = startRoundBlock + (14 * 24 * 60 * 60) / currentBlockTimeToNextBlock

    // dev
    const startApplicationBlock = (grantDate?.getTime() / 1000 - Date.now() / 1000) / currentBlockTimeToNextBlock + Number(currentBlock)
    const endApplicationBlock = startApplicationBlock + (20 * 60) / currentBlockTimeToNextBlock
    const startRoundBlock = endApplicationBlock
    const endRoundBlock = startRoundBlock + (20 * 60) / currentBlockTimeToNextBlock

    const args = [
      [startApplicationBlock.toFixed(), endApplicationBlock.toFixed(), startRoundBlock.toFixed(), endRoundBlock.toFixed()],
      currentContracts.vDao,
      currentContracts.donationSBT,
      grantToken,
      grantAmount,
      [
        [0, IPFSHash.IpfsHash],
        [0, ''],
      ],
      [[address]],
    ]

    // encodeAbiParameters(types, values)
    const args_bytes = encodeAbiParameters(
      [
        {
          name: 'InitRoundTime',
          type: 'tuple',
          components: [
            { name: 'applicationsStartBlock', type: 'uint256' },
            { name: 'applicationsEndBlock', type: 'uint256' },
            { name: 'roundStartBlock', type: 'uint256' },
            { name: 'roundEndBlock', type: 'uint256' },
          ],
        },
        { name: 'vDao', type: 'address' },
        { name: 'donationSBT', type: 'address' },
        { name: 'token', type: 'address' },
        { name: 'matchingAmount', type: 'uint256' },
        {
          name: 'InitMetaPtr',
          type: 'tuple',
          components: [
            {
              name: 'roundMetaPtr',
              type: 'tuple',
              components: [
                { name: 'protocol', type: 'uint256' },
                { name: 'pointer', type: 'string' },
              ],
            },
            {
              name: 'applicationMetaPtr',
              type: 'tuple',
              components: [
                { name: 'protocol', type: 'uint256' },
                { name: 'pointer', type: 'string' },
              ],
            },
          ],
        },
        {
          name: 'InitRoles',
          type: 'tuple',
          components: [{ name: 'roundOperators', type: 'address[]' }],
        },
      ],
      args as any,
    )

    const callData = encodeAbiParameters(
      [
        {
          internalType: 'bytes',
          name: 'encodedParameters',
          type: 'bytes',
        },
      ],
      [args_bytes as any],
    )

    const funding_encoded_parameters = encodeAbiParameters(
      [
        {
          internalType: 'address',
          name: 'token_',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'amount_',
          type: 'uint256',
        },
      ],
      [grantToken as Address, BigInt(grantAmount)],
    )

    await writeContract({
      abi: VDAOImplementation,
      address: currentContracts.proxiedVDao as Address,
      functionName: 'propose',
      chainId: currentChainId,
      args: [[currentContracts.roundFactory, currentContracts.treasury], [0, 0], [signature, signature_proposal], [callData, funding_encoded_parameters], description],
    })
      .then(async res => {
        // just being typesafe, quite painful to look at.
        const transactionHash = res.hash as string

        notification.info({
          message: 'Waiting for confirmation',
          description: 'Waiting for confirmation of your transaction. do not leave the page.',
        })

        await waitForTransaction({ hash: res.hash, timeout: 10000, chainId: currentChainId, confirmations: 1 }).catch(err => {
          console.error("Couldn't confirm transaction", err)
        })

        const new_args: InferArgs<typeof createProposalMutation.mutate> = [
          {
            title,
            description,

            spells: [currentContracts.roundFactory, currentContracts.treasury],
            spellValues: [0n, 0n],
            spellSignatures: [signature, signature_proposal],
            spellCalldatas: [callData, funding_encoded_parameters],

            authorAddress: authorAddress,
            transactionHash,
            grant: true,
          },
        ]

        return createProposalMutation.mutateAsync(...new_args).then(el => {
          callback?.(false)
          setIsLoading(false)
          notification.success({
            message: 'Grant Proposal created',
            description: 'Your grant proposal has been created',
          })
          return el
        }) as any
      })
      .catch(err => {
        console.error(err)
        notification.error({ message: 'Error', description: err.shortMessage, placement: 'bottomRight' })
      })

    callback?.(true)
    setIsLoading(false)
  }

  return {
    createProposal,
    createProposalMutation,
    createGrantProposal,
    generateGrantIPFSHash,
    isLoading: isLoading || createProposalMutation.isLoading || createGrantProposalMutation.isLoading || generateGrantIPFSHash.isLoading || isBlocksLoading,
  }
}
