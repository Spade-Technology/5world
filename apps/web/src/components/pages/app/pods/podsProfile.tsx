import Description from "~/components/misc/description";
import HowItWorks from "~/components/misc/howItWorks";

const PodsProfile = () => {
  return (
    <section className="w-screen bg-vdao-deep">
      <Description
        invertColors={true}
        title={
          <div>
            Pods
            <br />
            Profile
          </div>
        }
        description={
          <div className="font-body text-[26px] font-medium">
            As the smallest units of organisation within the DAO, Pods form
            around specific focus areas to achieve specific outcomes. These are
            spaces for discussion, collaboration and advancement of specific
            areas of work.
            <br />
            <br />
            They can be described as ‘two pizza teams’ - small autonomous teams
            that come together with a specific purpose and common objective, or
            to collaborate more informally. Pod size must not exceed ten
            members.
          </div>
        }
      />

      <HowItWorks
        contents={[
          {
            heading: ["How it works"],
            content: (
              <div>
                <div>
                  There are six steward positions (one from each guild and two
                  from the core DAO community) and each term lasts 180 days
                  before a new election.
                </div>
                <br />
                <div>
                  The primary role of the DAO Stewards is to support the growth
                  of the DAO and engage consistently in DAO voting via
                  delegation.
                </div>
                <br />
                <div>
                  This page provides details of each DAO steward and tracks
                  their contributions within the DAO over time.
                </div>
                <br />
                <div>
                  Members can also use the delegation facilitaty on this page to
                  enable Stewards to vote on their behalf.
                </div>
              </div>
            ),
          },
        ]}
        className="md:pb-[140px]"
      />
    </section>
  );
};

export default PodsProfile;
