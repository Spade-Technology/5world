import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

const includeZod = z
  .object({
    pod: z.boolean().optional(),
    author: z.boolean().optional(),
  })
  .optional();

export const proposalRouter = createTRPCRouter({
  getProposal: publicProcedure
    .input(
      z.object({
        id: z.number(),
        include: includeZod,
      })
    )
    .query(async ({ input: { id, include }, ctx: { prisma } }) => {
      const proposal = await prisma.proposal.findUnique({
        where: { id: id },
        "include: include,
      });
      if (!proposal) throw new Error("Proposal not found");
      return proposal;
    }),

  getProposals: publicProcedure
    .input(
      z.object({
        ids: z.array(z.number()).max(10, "Too many ids"),
        include: includeZod,
      })
    )
    .query(async ({ input: { ids, include }, ctx: { prisma } }) => {
      const proposals = await prisma.proposal.findMany({
        where: { id: { in: ids } },
        include: include,
      });
      if (!proposals || proposals.length === 0)
        throw new Error("Proposals not found");
      return proposals;
    }),

  createProposal: protectedProcedure
    .input(
      z.object({
        podId: z.number(),
        authorId: z.string(),
        include: includeZod,
      })
    )
    .mutation(
      async ({
        input: { podId, authorId, include },
        ctx: {
          prisma,
          session: { address },
        },
      }) => {
        if (!address) throw new Error("User not found");

        

        const newProposal = await prisma.proposal.create({
          data: {
            pod: { connect: { id: podId } },
            author: { connect: { address: authorId } },
            createdBy: { connect: { address } },
            updatedBy: { connect: { address } },
          },
          include: include,
        });

        return newProposal;
      }
    ),
});
