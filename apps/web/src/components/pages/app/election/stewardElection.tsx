import Description from "~/components/misc/description";
import HowItWorks from "~/components/misc/howItWorks";

const StewardElection = () => {
  return (
    <section className="w-screen bg-vdao-deep">
      <Description
        invertColors={true}
        title={
          <div>
            GrantSteward
            <br />
            Election
          </div>
        }
        description={
          <div className="font-body text-[26px] font-medium">
            This page displays all the members who have put themselves forward
            to be Stewards for the next term, along with a link to their Steward
            Profile page.
          </div>
        }
      />

      <HowItWorks
        contents={[
          {
            heading: ["How it works"],
            content: (
              <div>
                To support a Steward, connect your wallet, enter the number of
                votes you wish to give then, and click vote.
                <br />
                <br />
                Steward permissions will be grantaed automatically at the end of
                the Grands round based on the 6 Stewards who got the most votes.
              </div>
            ),
          },
        ]}
        className="md:pb-[140px]"
      />
    </section>
  );
};

export default StewardElection;
