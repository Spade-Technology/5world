import Footer from "~/components/layout/footer";
import Header from "~/components/layout/header";
import OperationalProposals from "~/components/pages/proposals/operationalProposals";

const Proposals = () => {
  return (
    <>
      <Header web3 />
      <OperationalProposals />
      <Footer />
    </>
  );
};

export default Proposals;
