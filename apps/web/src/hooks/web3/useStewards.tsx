import { z } from 'zod'
import { api } from '~/utils/api'
import { useSignMessage } from 'wagmi'
import { signMessage, writeContract } from '@wagmi/core'
import Vtoken from '~/abi/VToken.json'
import { currentContracts } from '~/config/contracts'
import { Address } from 'viem'

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
}

interface DelegateSchema {
  delegatee: string
}

const stewardArgsSchema = z.object({
  search: z.string().optional(),
})

export function useStewardReads(args: StewardArgs = {}) {
  const schema = z.object({ args: stewardArgsSchema })
  schema.parse({ args })

  return api.steward.getStewards.useQuery(args)
}

export function useStewardRead(address: string) {
  const schema = z.object({ address: z.string() })
  schema.parse({ address })

  return api.steward.getSteward.useQuery({ address })
}

export function useApplyToBeSteward(): {
  applyToBeSteward: (values: ApplyToBeStewardSchema) => void
  mutation: any
} {
  const mutation = api.steward.applyToBeSteward.useMutation()

  // more logic can be added. using mutate() from the script return values is deprecated.
  const applyToBeSteward = () => {
    mutation.mutate()
  }

  return { applyToBeSteward, mutation }
}

export function useVote() {
  const voteSchema = z.object({
    voterAddress: z.string(),
    candidateAddress: z.string(),
    message: z.string(),
  })

  const mutation = api.steward.vote.useMutation()

  const vote = z
    .function()
    .args(voteSchema)
    .parse(async (values: VoteSchema) => {
      const message = `${values.voterAddress} is voting for ${values.candidateAddress} as a steward.`
      const signature = await signMessage({
        message,
      })

      mutation.mutate({ ...values, signature, message })
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
