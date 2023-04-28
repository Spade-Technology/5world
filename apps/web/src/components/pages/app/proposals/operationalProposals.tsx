import Description from "~/components/misc/description";
import HowItWorks from "~/components/misc/howItWorks";

const OperationalProposals = () => {
  return (
    <section className="w-screen bg-vdao-deep">
      <Description
        invertColors={true}
        title={
          <div>
            Operational
            <br />
            Profile
          </div>
        }
        description={
          <div className="font-body text-[26px] font-medium">
            This page contains all formal on-chain proposals within the DAO,
            both active and inactive. Proposals are created by DAO stewards once
            a proposal received enough off-chain support in the discussion
            forum.
          </div>
        }
      />

      <HowItWorks
        contents={[
          {
            heading: "On-Chain Voting",
            content:
              "Any Core Member is able to cast their vote themselves or delegate their voting power to a Steward. To support the DAO’s mission of generating a broad, collective intelligence, all members of the DAO are encouraged to actively participate in the voting process via direct votes or delegation.",
          },
          {
            heading: "Quorum",
            content:
              "In order for a proposal to succeed in the on-chain voting phase, a minimum of 25% of the total number of DAO members must vote in favour of the vote. If the 25% quorum requirement is not met, the vote is not valid. It is the proposal creator’s responsibility to ensure they have solicited enough community support for the proposal to meet this minimum threshold.",
          },
          {
            heading: "Quota",
            content:
              "For a vote to move from the on-chain voting phase to the proposal enactment phase, 75% of the total votes cast must vote in favour of the proposal.",
          },
          {
            heading: "Proposal Enactment",
            content: (
              <div>
                When the proposal is created on chain, there is a 7 day cooling
                off period for the DAO community to review the upcoming vote.
                During this period, the DAO Guardians can veto any proposal
                which does not align with the DAOs core vision or mission.
                <br />
                <br />
                The minimum time required for a vote to progress from on-chain
                voting to full enactment is 14 days. The standard process time
                is 23 days.
              </div>
            ),
          },
        ]}
        className="md:pb-[140px]"
      />
    </section>
  );
};

export default OperationalProposals;
