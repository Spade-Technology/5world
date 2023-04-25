import Description from "~/components/misc/description";
import HowItWorks from "~/components/misc/howItWorks";

const GrantsRound = () => {
  return (
    <section className="w-screen bg-vdao-deep">
      <Description
        invertColors={true}
        title={
          <div>
            Grants
            <br />
            Round
          </div>
        }
        description={
          <div className="font-body text-[26px] font-medium">
            Project funding decisions are made via a novel voting system known
            as{" "}
            <span className="font-body text-[26px] font-medium underline underline-offset-4">
              quadratic voting
            </span>{" "}
            This method has been described as an ‘
            <span className="font-body text-[26px] font-medium underline underline-offset-4">
              optimal kickstarter
            </span>
            ’, due to the way in which it channels funds to the projects with
            the highest levels of collective DAO member support.
          </div>
        }
      />

      <HowItWorks
        contents={[
          {
            heading: ["How it works"],
            content: (
              <div>
                This page contains details of the projects which have been
                selected to receive grants from the DAO following the
                application phase. DAO funding received by each proposal is
                proportionate to the number of votes received from within the
                community.
                <br />
                <br />
                To support a proposal, connect your wallet, enter the number of
                votes you wish to give the project, and click vote. Funds will
                be distributed automatically at the end of the Grands round.
              </div>
            ),
          },
        ]}
        className="md:pb-[140px]"
      />
    </section>
  );
};

export default GrantsRound;
