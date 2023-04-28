import Footer from "~/components/layout/footer";
import Header from "~/components/layout/header";
import Page from "~/components/layout/page";
import OperationalProposals from "~/components/pages/proposals/operationalProposals";

const Proposals = () => {
  return (
    <>
      <Page>
        <OperationalProposals />
      </Page>
    </>
  );
};

export default Proposals;
