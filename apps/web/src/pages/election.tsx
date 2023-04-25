import Footer from "~/components/layout/footer";
import Header from "~/components/layout/header";
import ElectionCards from "~/components/pages/election/electionCards";
import StewardElection from "~/components/pages/election/stewardElection";

const Election = () => {
  return (
    <>
      <Header web3 />
      <StewardElection />
      <ElectionCards />
      <Footer />
    </>
  );
};

export default Election;
