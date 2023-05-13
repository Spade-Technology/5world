import { z } from "zod";

import { api } from "~/utils/api";

/* Pod schema */
interface PodInclude {
  admins?: boolean;
  members?: boolean;
  discussions?: boolean;
  proposals?: boolean;
}

interface PodQuery {
  id: number;
  include?: PodInclude;
}

/* Edit pod schema */
interface EditPodSchema {
  name?: string;
  description?: string;
  picture?: string;
}

const podIncludeSchema = z.object({
  admins: z.boolean().optional(),
  members: z.boolean().optional(),
  discussions: z.boolean().optional(),
  proposals: z.boolean().optional(),
});

export function usePodRead(id: number, include: PodInclude = {}) {
  const schema = z.object({ id: z.number(), include: podIncludeSchema });
  schema.parse({ id, include });

  return api.pod.getPod.useQuery({ id, include });
}

export function usePodReads(ids: number[], include: PodInclude = {}) {
  const schema = z.object({
    ids: z.array(z.number()),
    include: podIncludeSchema.optional(),
  });
  schema.parse({ ids, include });

  return api.pod.getPods.useQuery({ ids, include });
}

// Add this to the existing Pod hooks
interface CreatePodSchema {
  name: string;
  description: string;
  members: string[];
  admins: string[];
  picture?: string;
}

export function useCreatePod(): {
  createPod: (values: CreatePodSchema) => void;
  mutation: any;
} {
  const createPodSchema = z.object({
    name: z.string(),
    description: z.string(),
    members: z.array(z.string()),
    admins: z.array(z.string()),
    picture: z.string().optional(),
  });

  const mutation = api.pod.createPod.useMutation();

  const createPod = z
    .function()
    .args(createPodSchema)
    .parse((values: CreatePodSchema) => {
      mutation.mutate(values);
    });

  return { createPod, mutation };
}

export function useEditPod(include: PodInclude = {}): {
  editPod: (values: EditPodSchema, include_override?: PodInclude) => void;
  mutation: any;
} {
  const editPodSchema = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    picture: z.string().optional(),
  });

  const mutation = api.pod.editPod.useMutation();

  const editPod = z
    .function()
    .args(editPodSchema)
    .parse((values: EditPodSchema, include_override: PodInclude = {}) => {
      mutation.mutate({
        ...values,
        include: include_override ? include_override : include,
      });
    });

  return { editPod, mutation };
}

export function usePod(id: number, ids: number[], include: PodInclude = {}) {
  const podRead = usePodRead(id, include);
  const podReads = usePodReads(ids, include);

  return { podRead, podReads };
}
