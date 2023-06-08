import { User } from '@prisma/client'
import { Address } from 'viem'
import { z } from 'zod'

import { api } from '~/utils/api'
import { InferArgs, InferReturn } from '~/utils/type'

/* User schema */
interface UserInclude {
  podsAsMember?: boolean
  podsAsAdmin?: boolean
  proposals?: boolean
  guild?: boolean
  stewardVotesAsCandidate?: boolean
  stewardVotesAsVoter?: boolean
}

/* Edit user schema */
interface EditUserSchema {
  name?: string
  description?: string
  picture?: string
}

const userIncludeSchema = z.object({
  podsAsMember: z.boolean().optional(),
  podsAsAdmin: z.boolean().optional(),
  proposals: z.boolean().optional(),
  guild: z.boolean().optional(),
  stewardVotesAsCandidate: z.boolean().optional(),
  stewardVotesAsVoter: z.boolean().optional(),
})

export function useUserRead(...args: InferArgs<typeof api.user.getUser.useQuery>): { data: User & { guild?: { id: number; name: string } } } & InferReturn<typeof api.user.getUser.useQuery> {
  args[1] = {
    ...args[1],
    enabled: !!args[0].address,
    retry: false,
  }
  return api.user.getUser.useQuery(...args) as any
}

export const useUserReads = api.user.getUsers.useQuery

export function useEditUser(include: UserInclude = {}): {
  editUser: (values: EditUserSchema, include_override?: UserInclude) => void
  mutation: any
} {
  const editUserSchema = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    picture: z.string().optional(),
  })

  const mutation = api.user.editUser.useMutation()

  const editUser = z
    .function()
    .args(editUserSchema)
    .parse((values: EditUserSchema, include_override: UserInclude = {}) => {
      mutation.mutate({
        ...values,
        include: include_override ? include_override : include,
      })
    })

  return { editUser, mutation }
}

export function useUser(address: string, addresses: string[], search: string, include: UserInclude = {}) {
  const userRead = useUserRead({ address, include })
  const userReads = useUserReads({ addresses, include, search })

  return { userRead, userReads }
}

export default useUser
