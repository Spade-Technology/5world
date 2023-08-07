import { z } from 'zod'
import { api } from '~/utils/api'
import { useSignMessage } from 'wagmi'
import { signMessage, writeContract } from '@wagmi/core'
import Vtoken from '~/abi/VToken.json'
import { currentContracts } from '~/config/contracts'
import { Address } from 'viem'
import { notification } from 'antd'

/* Steward schema */
interface StewardArgs {
  search?: string
}

/* ApplyToBeSteward schema */
interface ApplyToBeStewardSchema {
  address: string
}

/* Vote schema */
interface VoteSchema {
  voterAddress: string
  candidateAddress: string
  amount: number
}

interface DelegateSchema {
  delegatee: string
}

const stewardArgsSchema = z.object({
  search: z.string().optional(),
})

export const useStewardReads = api.steward.getStewards.useQuery

export const useElectionReads = api.steward.getElections.useQuery

export function useStewardRead(address: string) {
  const schema = z.object({ address: z.string() })
  schema.parse({ address })

  return api.steward.getSteward.useQuery({ address })
}

export function useApplyToBeSteward() {
  const mutation = api.steward.applyToBeSteward.useMutation()

  // more logic can be added. using mutate() from the script return values is deprecated.
  const applyToBeSteward = () =>
    mutation.mutateAsync(undefined, {
      onError: error => {
        notification.error({
          message: 'Error',
          description: error.message,
        })
      },
      onSuccess: () => {
        notification.success({
          message: 'Success',
          description: 'You have successfully applied to be a steward.',
        })
      },
    })

  return { applyToBeSteward, isLoading: mutation.isLoading, mutation }
}

export function useVote() {
  const voteSchema = z.object({
    voterAddress: z.string(),
    candidateAddress: z.string(),
    message: z.string(),
    amount: z.number(),
  })

  const mutation = api.steward.vote.useMutation()

  const vote = z
    .function()
    .args(voteSchema)
    .parse(async (values: VoteSchema) => {
      const message = `${values.voterAddress} is voting using ${values.amount}V for ${values.candidateAddress} as a steward. 
      
      
      
      
Metadata:${JSON.stringify({ voter: values.voterAddress, candidate: values.candidateAddress, amount: values.amount, date: new Date().toDateString() })}`

      const signature = await signMessage({
        message,
      })

      mutation
        .mutateAsync({ ...values, signature, message })
        .then(() => {
          notification.success({
            message: 'Success',
            description: 'You have successfully voted.',
          })
        })
        .catch(error => {
          notification.error({
            message: 'Error',
            description: error.message,
          })
        })
    })

  return { vote, mutation }
}

export function useDelegate() {
  const delegate = z
    .function()
    .args(
      z.object({
        delegatee: z.string(),
      }),
    )
    .parse(async (values: DelegateSchema) => {
      await writeContract({
        abi: Vtoken,
        address: currentContracts.vDao as Address,
        functionName: 'delegate',
        args: [values.delegatee],
      })
    })

  return { delegate }
}

export function useSteward(address: string, args: StewardArgs = {}) {
  const stewardRead = useStewardRead(address)
  const delegate = useDelegate()
  const vote = useVote()

  return { stewardRead, delegate, vote }
}

export default useSteward
