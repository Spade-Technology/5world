import { Pod, Proposal, User } from '@prisma/client'
import { z } from 'zod'

import { api } from '~/utils/api'
import { InferArgs, InferReturn } from '~/utils/type'

/* Pod schema */
interface PodInclude {
  admins?: boolean
  members?: boolean
  discussions?: boolean
  proposals?: boolean
}

interface PodQuery {
  id: number
  include?: PodInclude
}

/* Edit pod schema */
interface EditPodSchema {
  name?: string
  description?: string
  picture?: string
}

const podIncludeSchema = z.object({
  admins: z.boolean().optional(),
  members: z.boolean().optional(),
  discussions: z.boolean().optional(),
  proposals: z.boolean().optional(),
})

export type pod_type = Pod & { proposals?: Proposal[]; members?: User[]; admins?: User[] }

export function usePodRead(id: number, include: PodInclude = {}) {
  const schema = z.object({ id: z.number(), include: podIncludeSchema })
  schema.parse({ id, include })

  return api.pod.getPod.useQuery({ id, include })
}

export function usePodReads({ ids, createdBy, include = {} }: { ids?: number[]; include?: PodInclude; createdBy?: string }) {
  const query = api.pod.getPods.useQuery({ ids, include, createdBy })

  return {
    ...query,
    data: query.data as pod_type[],
  }
}

export function useCreatePod() {
  const mutation = api.pod.createPod.useMutation()

  // create a wrapper for mutation.mutate(args)
  const createPod = (...args: InferArgs<typeof mutation.mutate>) => {
    return mutation.mutate(...args)
  }

  return { createPod, mutation }
}

export function useEditPod(include: PodInclude = {}) {
  const editPodSchema = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    picture: z.string().optional(),
  })

  const mutation = api.pod.editPod.useMutation()

  const editPod = z
    .function()
    .args(editPodSchema)
    .parse((values: EditPodSchema, include_override: PodInclude = {}) => {
      mutation.mutate({
        ...values,
        include: include_override ? include_override : include,
      })
    })

  return { editPod, mutation }
}

export function usePod(id: number, ids: number[], include: PodInclude = {}) {
  const podRead = usePodRead(id, include)
  const podReads = usePodReads(ids, include)

  return { podRead, podReads }
}
