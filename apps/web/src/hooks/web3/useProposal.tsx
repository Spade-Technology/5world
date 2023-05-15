import { z } from "zod";

import { api } from "~/utils/api";

/* Proposal schema */
interface ProposalInclude {
  pod?: boolean;
  author?: boolean;
}

export function useProposalRead(id: number, include: ProposalInclude = {}) {
  const schema = z.object({
    id: z.number(),
    include: z.object({
      pod: z.boolean().optional(),
      author: z.boolean().optional(),
    }),
  });
  schema.parse({ id, include });

  return api.proposal.getProposal.useQuery({ id, include });
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
  });
  schema.parse({ ids, include });

  return api.proposal.getProposals.useQuery({ ids, include });
}

export function useProposal(
  id: number,
  ids: number[],
  include: ProposalInclude = {}
) {
  const proposalRead = useProposalRead(id, include);
  const proposalReads = useProposalReads(ids, include);

  return { proposalRead, proposalReads };
}

export function useCreateProposal(): {
  createProposal: (values: {
    podId: number;
    authorId: string;
    include?: ProposalInclude;
  }) => void;
  mutation: any;
} {
  const createProposalSchema = z.object({
    podId: z.number(),
    authorId: z.string(),
    include: z
      .object({
        pod: z.boolean().optional(),
        author: z.boolean().optional(),
      })
      .optional(),
  });

  const mutation = api.proposal.createProposal.useMutation();

  const createProposal = z
    .function()
    .args(createProposalSchema)
    .parse(
      (values: {
        podId: number;
        authorId: string;
        include?: ProposalInclude;
      }) => {
        mutation.mutate(values);
      }
    );

  return { createProposal, mutation };
}
