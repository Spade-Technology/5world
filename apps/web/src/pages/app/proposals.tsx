import { useState } from "react";
import Footer from "~/components/layout/footer";
import Header from "~/components/layout/header";
import Insights from "~/components/pages/app/proposals/insights";
import OperationalProposals from "~/components/pages/app/proposals/operationalProposals";
import CreateNewProposal from "~/components/pages/app/proposals/popups/createProposal";
import ProposalCards from "~/components/pages/app/proposals/proposalCards";

const Proposals = () => {
  const [openCreateProposal, setOpenCreateProposal] = useState(false);

  return (
    <>
      <Header web3 />

      <div className="w-full text-vdao-dark">
        <OperationalProposals setOpenCreateProposal={setOpenCreateProposal} />

        <ProposalCards />

        <Insights />

        {openCreateProposal && (
          <CreateNewProposal
            show={openCreateProposal}
            close={() => setOpenCreateProposal(false)}
          />
        )}
      </div>

      <Footer />
    </>
  );
};

export default Proposals;
