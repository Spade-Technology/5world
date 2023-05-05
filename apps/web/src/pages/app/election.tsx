import Footer from "~/components/layout/footer";
import Header from "~/components/layout/header";
import ElectionCards from "~/components/pages/app/election/electionCards";
import StewardElection from "~/components/pages/app/election/stewardElection";

const Election = () => {
  return (
    <>
      <Header web3 />

      <div className="w-full text-vdao-dark">
        <StewardElection />

        <ElectionCards />
      </div>

      <Footer />
    </>
  );
};

export default Election;
