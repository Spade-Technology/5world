import { z } from 'zod'
import { api } from '~/utils/api'
import { useSignMessage } from 'wagmi'

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

const stewardArgsSchema = z.object({
  search: z.string().optional(),
})

export function useStewardsRead(args: StewardArgs = {}) {
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

export function useVote(): {
  vote: (values: VoteSchema) => Promise<void>
  mutation: any
} {
  const voteSchema = z.object({
    voterAddress: z.string(),
    candidateAddress: z.string(),
    message: z.string(),
  })

  const { signMessage } = useSignMessage()
  const mutation = api.steward.vote.useMutation()

  const vote = z
    .function()
    .args(voteSchema)
    .parse(async (values: VoteSchema) => {
      const signature = await signMessage({
        message: `${values.voterAddress} is voting for ${values.candidateAddress} as a steward.`,
      })
      console.log(signature)
      mutation.mutate({ ...values, signature })
    })

  return { vote, mutation }
}

export function useSteward(address: string, args: StewardArgs = {}) {
  const stewardRead = useStewardRead(address)
  const stewardsRead = useStewardsRead(args)

  return { stewardRead, stewardsRead }
}

export default useSteward
