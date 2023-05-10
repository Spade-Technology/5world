import Footer from "~/components/layout/footer";
import Header from "~/components/layout/header";
import Page from "~/components/layout/page";
import ElectionCards from "~/components/pages/app/election/electionCards";
import StewardElection from "~/components/pages/app/election/stewardElection";

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
