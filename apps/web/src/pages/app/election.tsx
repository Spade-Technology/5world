import Page from "~/components/layout/page";
import ElectionCards from "~/components/pages/election/electionCards";
import StewardElection from "~/components/pages/election/stewardElection";

const Election = () => {
  return (
    <>
      <Page>
        <StewardElection />

        <ElectionCards />
      </Page>
    </>
  );
};

export default Election;
