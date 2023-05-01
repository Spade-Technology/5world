import Footer from "~/components/layout/footer";
import Header from "~/components/layout/header";
import Insights from "~/components/pages/app/proposals/insights";
import OperationalProposals from "~/components/pages/app/proposals/operationalProposals";
import ProposalCards from "~/components/pages/app/proposals/proposalCards";

const Proposals = () => {
  return (
    <>
      <Header web3 />

      <div className="w-full text-vdao-dark">
        <OperationalProposals />

        <ProposalCards />

        <Insights />
      </div>

      <Footer />
    </>
  );
};

export default Proposals;
